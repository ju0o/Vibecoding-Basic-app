/**
 * Live sign-in provider availability for `ju0o-ec967`.
 *
 * Both flags are OFF as of 2026-08-28: reproduced live (real trusted click,
 * headless CDP against https://ju0o-ec967.web.app/login, no synthetic
 * `.click()`) that BOTH Google and GitHub sign-in immediately fail with
 * `Firebase: Error (auth/operation-not-allowed)` — the popup reaches
 * Firebase's own `/__/auth/handler` and closes itself before ever reaching
 * accounts.google.com or github.com. Per Firebase's documented error
 * semantics, `auth/operation-not-allowed` means the corresponding sign-in
 * method is not enabled in this project's Firebase Console under
 * Authentication → Sign-in method — not an authorized-domain or OAuth-app
 * misconfiguration (those surface as different error codes, or as a
 * provider-hosted error page, neither of which occurred here).
 *
 * Enabling a sign-in provider is a security-setting change and requires
 * Owner-privileged Firebase Console access; it is not performed by this
 * flag or by any automated Task. To restore a provider once the Owner has
 * enabled it in Console (for GitHub: also supplying a registered GitHub
 * OAuth App's Client ID/Secret there):
 *   1. Flip the corresponding flag below to `true`.
 *   2. Re-run the live reproduction (real trusted click, not `.click()`)
 *      against the deployed login page and confirm the popup completes
 *      instead of erroring.
 *   3. Deploy.
 *
 * See docs/product/ROADMAP_V2.md's long-unchecked
 * "Firebase Auth configured (Email/Google OAuth providers enabled)" item.
 */
export const AUTH_PROVIDERS_ENABLED = {
  google: false,
  github: false,
} as const
