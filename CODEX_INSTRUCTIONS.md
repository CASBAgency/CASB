# CASB Codex Instructions

## Z_Temp Upload Workflow

When the user asks to process files from `Z_Temp`, use `Z_Temp` as a temporary drop zone for new assets, photos, documents, or content that should be added to the CASB website.

Preferred folder:

`C:\Users\natsu\OneDrive\Documents\CASBWebsite\repo-work\Z_Temp`

If files are not found there, also check:

`C:\Users\natsu\OneDrive\Documents\CASBWebsite\Z_Temp`

Workflow:

1. Inspect all files in `Z_Temp` before moving or wiring anything.
2. Identify where each file belongs by comparing file names, image content, nearby folders, and existing page structure.
3. Place files into the correct repo location, such as:
   - `assets/` for shared assets
   - `assets/photos/team/` for team photos
   - `events/` and related event asset folders for event galleries
   - `achievements/` for award and achievement pages
   - `insights/` for article content and article assets
4. Rename files only when it improves consistency with the existing repo naming style.
5. Wire the new files into the correct HTML, CSS, or JS pages while preserving the current layout and logic.
6. Do not change unrelated copy, styling, behavior, page structure, or existing business logic unless the user specifically asks.
7. Check affected links, image paths, and obvious broken references before publishing.
8. If the user asks to publish, commit the completed changes and push directly to `main`.
9. Leave `Z_Temp` as a temporary drop zone; do not depend on files staying there for the live website.

