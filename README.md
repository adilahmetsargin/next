# Next Role

A mobile-first workspace for discovering frontend jobs, tracking applications, and preparing tailored application documents.

Built with React, TypeScript, Vite, and Netlify Functions. Application data stays in the browser, and AI-assisted writing is optional.

## Features

- Job discovery from Himalayas, Remotive, and configurable Greenhouse boards.
- Rule-based matching with visible skill overlaps, gaps, and location considerations.
- Search, date filters, seniority controls, and saved jobs.
- Application tracking with status updates and notes.
- Manual job entry for listings found elsewhere.
- Editable cover letter templates and resume bullet prioritization without an API key.
- Optional Gemini integration for document rewriting.
- Client-side PDF and text exports.
- JSON backup and import for moving data between browsers.
- Responsive layouts and a web app manifest for home-screen installation.

## Getting started

### Requirements

- Node.js 22.13 or newer.
- npm.

```sh
npm ci
npm run dev
```

The development server runs at `http://127.0.0.1:5173`. Its middleware exposes the same handlers used by Netlify Functions.

### Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the application and local API handlers. |
| `npm test` | Run matching, data handling, and authorization tests. |
| `npm run build` | Type-check and create the production build. |
| `npm run preview` | Preview static build output; API handlers are not included. |

The Profile screen contains an editable base resume and matching preferences. The repository includes a generic profile template with no personal work history or contact information.

## Configuration

Copy `.env.example` to `.env` for local development. In production, configure variables in Netlify with Functions access and redeploy after changes.

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | For AI generation | Server-side Gemini API key. |
| `APP_ACCESS_TOKEN` | For AI generation | Private access code protecting the generation endpoint. |
| `GEMINI_MODEL` | No | GenerateContent model; defaults to `gemini-3.5-flash-lite`. |
| `HIMALAYAS_API_KEY` | No | Optional API key for higher provider quotas. |
| `GREENHOUSE_BOARDS` | No | Comma-separated board tokens, up to five; defaults to `lumimeds,onetrust`. |

### AI generation

Template mode works without external AI credentials. It creates cover letters from existing experience and reorders resume bullets by relevance without adding new claims.

AI generation becomes available when both `GEMINI_API_KEY` and `APP_ACCESS_TOKEN` are configured. The access token should be a strong random value of at least 32 characters. Enter that token in **Profile → Your AI access code**, then select **Tailor with AI** in Documents.

The provider API key stays on the server. The access code is stored only for the browser tab session. Neither secret should use a `VITE_` prefix, which would expose it to the client bundle.

AI requests send the candidate profile, resume, and selected job description to Google. Generated documents and explanatory notes are requested in English. Output requires review for factual accuracy. Provider availability, quotas, and charges depend on the configured account. The shared access code is intended for a personal deployment, not multi-user authentication.

## Deployment

The included `netlify.toml` defines the deployment settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Functions directory | `netlify/functions` |
| Node.js version | `22` |

Connect the repository through Netlify's Git integration with the base directory set to the repository root. Static-only deployment of `dist` does not include the job or AI handlers.

After deployment, supported mobile browsers can add the application to the home screen. Hosting usage and AI provider quotas are billed or limited independently.

## Job discovery and matching

### Sources

| Source | Coverage and behavior |
| --- | --- |
| [Himalayas](https://himalayas.app/api) | First 20 results for each US-filtered search: `frontend`, `react`, and `next.js`. Duplicate roles are merged and expired listings are excluded. Application links and attribution are preserved. |
| [Remotive](https://github.com/remotive-com/remote-jobs-api) | Software development feed filtered for relevant roles. Listings are delayed by 24 hours under the provider's terms. |
| [Greenhouse](https://developers.greenhouse.io/job-board.html) | Listings from configured company boards. Update timestamps are distinguished from publication dates. |
| Manual entry | Job descriptions pasted into the application. Arbitrary user-provided URLs are not fetched by the server. |

Listings refresh when the application opens or the tab becomes visible. Server responses use a six-hour cache through Netlify CDN and warm function memory. Multiple instances and cold starts can cause additional provider requests; larger deployments may require persistent caching.

The feed covers a subset of the market. Default matching focuses on US and worldwide location fields, with senior titles and known non-US locations hidden. Generic remote locations remain visible with an eligibility reminder. Listings without publication dates remain visible under date filters.

Scores are deterministic skill, experience, title, and location comparisons. They are not ATS scores or hiring probabilities. State restrictions, work authorization, salary, and listing availability must be verified on the source application page. Saved jobs remain in the tracker as historical records after a listing closes.

## Data storage and exports

Profiles, application records, notes, and documents are stored in browser localStorage. The server does not persist candidate profiles or application history. Device synchronization is not included; JSON export and import support manual transfers.

PDFs are generated as selectable text on the device using jsPDF. Longer documents may span multiple pages, and built-in font support is limited. Opening an application link does not change tracking status; submitted applications are marked manually.

The interface, date formatting, accessibility labels, server messages, and generated document notes use English. User-authored content and third-party job descriptions retain their original language.

### Repository hygiene

`.gitignore` excludes dependencies, build output, caches, environment secrets, credential files, personal documents, profile exports, and backups. Additional private files can be stored in `.private/`.

`package-lock.json`, `.env.example` with placeholder values, and application source files remain tracked. Ignore rules do not remove files already committed or erase historical copies.

## Project structure

```text
src/
  main.tsx          Application UI, tracking, document editor, and profile settings
  data.ts           Types, generic profile template, and storage helpers
  lib.js            Matching, normalization, URL validation, and template generation
  pdf.ts            Client-side document exports
  style.css         Responsive styles
netlify/functions/
  jobs.mjs          Provider aggregation, caching, and partial failure handling
  generate.mjs      Protected Gemini generation endpoint
  config.mjs        AI availability flag without secret values
tests/
  matching.test.mjs Matching, data handling, and authorization tests
```

## Limitations

- No background scanning, notifications, or automatic application submission.
- No accounts, database, or automatic cross-device synchronization.
- Provider coverage, classification, and availability can vary.
- AI output can contain mistakes and requires review.
- Live Gemini generation requires separate credentials; automated tests cover authorization and configuration failure paths without calling the provider.

## Additional documentation

- [Verification notes](VERIFICATION.md)
- [Netlify deployment documentation](https://docs.netlify.com/deploy/create-deploys/)
- [Gemini GenerateContent API](https://ai.google.dev/api/generate-content)
