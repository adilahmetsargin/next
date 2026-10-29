# Verification

## Original functionality checks

- Matching, location eligibility, safe URLs, HTML cleanup, deduplication, preservation of existing resume claims, and AI authorization are covered by automated tests.
- The live jobs handler returned responses from Himalayas, Remotive, and two configured Greenhouse boards. Results vary with source availability and publication dates.
- The interface was checked at a 390 px mobile viewport with no horizontal overflow. Mobile navigation, job details, bookmarking, cover letter templates, and resume bullet reordering were exercised in the browser.
- Both document types were downloaded through the interface. The sample PDF files were single-page documents with selectable text and were visually inspected.
- The final clean browser load had no new console errors.

## English-language update

- Interface copy, accessibility labels, notifications, confirmations, date formatting, source explanations, server errors, and template notes were translated into English.
- The AI instruction now explicitly requests explanatory notes in English as well as the generated document.
- HTML language and application metadata are set to English.
- README and verification documentation are in English.
- Existing user-authored content and third-party job descriptions are preserved.
- TypeScript compilation, production build, and automated tests are rerun after the update.

## Verification limits

Live Gemini generation has not been tested because no API key was provided. Authorization and configuration failure paths are tested. No deployment has been made or verified in the user's Netlify account.
