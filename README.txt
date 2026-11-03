BALENZQ SOLUTIONS — WEBSITE V15 DESIGN REFRESH + LIVE ENQUIRY FORM

This package contains the refreshed five-page static website:
- index.html
- about.html
- services.html
- expertise.html
- contact.html
- styles.css
- script.js
- assets/logo-light.png and assets/logo-dark.png

DESIGN UPDATE
- Refined enterprise-style layout inspired by the supplied Auratech service-card reference.
- Teal brand accent, clean light/dark themes, soft textured backgrounds and restrained contrast.
- Compact sticky navigation with active-page highlight and subtle scroll state.
- Interactive service cards with gentle lift, slight scale, soft shadow and pointer response.
- Scroll reveal animations with reduced-motion accessibility support.
- Detailed multi-column footer with navigation and all service links.
- Responsive layouts for desktop, tablet and mobile.

PREVIEW
Extract the ZIP and open index.html in a browser. For best results, use a local web server or upload the folder to your hosting provider.

ENQUIRY FORM (configured)
- contact.html posts to a Google Apps Script web app (data-endpoint attribute on the form).
- Each enquiry is saved to a Google Sheet ("Enquiries" tab) and posted to Slack.
- The Slack webhook is stored only in Apps Script > Project Settings > Script Properties
  as SLACK_WEBHOOK_URL. Never put it in any website file.
- The form has a hidden spam-trap field, a consent checkbox and an on-page thank-you/error message.
- script.js and styles.css are linked with ?v=3. Raise the number whenever either file changes
  so visitors do not keep a cached copy.

BEFORE / AFTER GO-LIVE CHECKS
- Confirm the official business email and phone/WhatsApp, and update the contact details.
- Add privacy policy and terms pages and link them from the footer and the form consent line.
- Verify domain DNS and HTTPS for balenzq.in.
- Replace the generic Instagram link with the real profile URL if it is still present.

Deployed via GitHub Pages. Upload the files in this folder to the repository root;
the assets folder (logo-light.png, logo-dark.png) is not part of this package and stays as it is.
