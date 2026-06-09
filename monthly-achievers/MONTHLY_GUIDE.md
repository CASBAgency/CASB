# Monthly Achievers - How to Add New Posters

## Folder Structure

Use one year folder, then one month folder:

```
monthly-achievers/
|-- monthly.html
|-- 2026.html
|-- 2025.html
|-- 2024.html
|-- 2026/
|   |-- JAN2026/
|   |-- FEB2026/
|   |-- MAR2026/
|   |-- APR2026/
|   `-- MAY2026/
|-- 2025/
|   |-- JAN2025/
|   `-- ... DEC2025/
`-- 2024/
    |-- JAN2024/
    `-- ... DEC2024/
```

## Add Posters

1. Put the poster images into the matching month folder.

Example:
`monthly-achievers/2026/JUN2026/`

2. Tell Codex to wire the new posters, or update the matching page manually:

- `monthly-achievers/monthly.html`
- `monthly-achievers/2026.html`, `2025.html`, or `2024.html`

3. Commit and push.

## Naming

Clear names are best, but the site can handle spaces. A tidy pattern is:

`JUN1.png`, `JUN2.png`, `JUN3.png`

## Current Note

The old flat poster folder has been retired. April 2026 now lives in:

`monthly-achievers/2026/APR2026/`