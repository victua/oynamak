// Session cookie constants. Kept dependency-free so the Edge middleware can
// import them without pulling in firebase-admin (which is Node-only).

export const SESSION_COOKIE = '__session';

/** Firebase caps session cookies at 14 days. */
export const SESSION_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

/** Console routes that require an authenticated session. */
export const PROTECTED_PREFIXES = ['/ops'];

export function isProtectedPath(pathname: string) {
    return PROTECTED_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
}

/** Set by middleware so server layouts can recover the requested path. */
export const PATHNAME_HEADER = 'x-pathname';

/** Builds the login URL that returns the user to `pathname` afterwards. */
export function loginRedirect(pathname: string | null, fallback: string) {
    return `/login?next=${encodeURIComponent(pathname || fallback)}`;
}
