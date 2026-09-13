AYAN PORTFOLIO — MOBILE COMPATIBILITY PASS

Replace the files in your existing portfolio-v1 project with the files in this archive, preserving the folders.

Main targets:
- 360 / 375 / 390 / 430px phones
- tablet widths
- short landscape phone viewports
- touch/coarse-pointer interactions

Changes include:
- global horizontal-overflow guard and mobile scroll behavior
- fluid hero typography + safer fixed navigation
- mobile Scroll Choreography geometry
- mobile-safe Selected Work flip cards
- touch-safe Project Lab / Collection Surfer
- touch-pan particle typography with lower mobile canvas cost
- tap-to-expand skills
- horizontally scrollable GitHub calendar
- tighter mobile orbital timeline geometry
- fluid contact portal
- touch-enabled Letter Cascade + Text Repel
- footer email typo corrected to match the Contact section

After replacing files:
1. Stop the dev server.
2. Delete .next.
3. Run npm run dev.
4. Test at 360, 390, 430, 768, and 1024px widths.

No desktop section was intentionally redesigned; mobile behavior was added around the existing desktop experience.
