import { NextRequest, NextResponse } from "next/server";

type UpstreamContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

function mapLevel(level: number): ContributionLevel {
  switch (level) {
    case 1:
      return "FIRST_QUARTILE";
    case 2:
      return "SECOND_QUARTILE";
    case 3:
      return "THIRD_QUARTILE";
    case 4:
      return "FOURTH_QUARTILE";
    default:
      return "NONE";
  }
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "GitHub username is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        next: { revalidate: 21600 },
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contribution data", upstreamStatus: response.status },
        { status: 502 }
      );
    }

    const upstream = await response.json();
    const raw: UpstreamContribution[] = Array.isArray(upstream.contributions)
      ? upstream.contributions
      : [];

    const days = raw
      .map((day) => ({
        date: day.date,
        contributionCount: Number(day.count) || 0,
        contributionLevel: mapLevel(Number(day.level)),
        color: "",
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const weeks: typeof days[] = [];
    let currentWeek: typeof days = [];

    for (const day of days) {
      const date = new Date(`${day.date}T00:00:00Z`);
      const weekday = date.getUTCDay();

      if (weekday === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(day);
    }

    if (currentWeek.length > 0) weeks.push(currentWeek);

    const totalContributions = days.reduce(
      (total, day) => total + day.contributionCount,
      0
    );

    return NextResponse.json({ contributions: weeks, totalContributions });
  } catch (error) {
    console.error("GitHub contribution API error:", error);
    return NextResponse.json(
      { error: "Unable to fetch GitHub contribution data" },
      { status: 500 }
    );
  }
}
