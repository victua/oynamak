// Firebase auth errors surface as `auth/<code>` with developer-facing text.
// Map the ones users actually hit onto something actionable.
//
// Note: this Firebase project's auth pool is shared across every product on
// `tungacoke`, so an email can already exist here without ever having used
// Oynamak — hence the explicit nudge on `email-already-in-use`.

const MESSAGES: Record<string, string> = {
    'auth/email-already-in-use':
        'That email already has an account on this Firebase project. Use "Sign in" instead of "Sign up".',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/invalid-login-credentials': 'Incorrect email or password.',
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/user-not-found': 'Incorrect email or password.',
    'auth/invalid-email': 'That email address is not valid.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/missing-password': 'Enter a password.',
    'auth/user-disabled': 'This account has been disabled. Contact an administrator.',
    'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
    'auth/popup-closed-by-user': 'Sign-in window was closed before completing.',
    'auth/popup-blocked': 'Your browser blocked the sign-in popup. Allow popups and retry.',
    'auth/unauthorized-domain':
        'This domain is not authorized for sign-in. Add it under Firebase Authentication → Settings → Authorized domains.',
    'auth/operation-not-allowed': 'That sign-in method is not enabled for this project.',
};

export function authErrorMessage(error: unknown): string {
    const code = (error as { code?: string })?.code;
    if (code && MESSAGES[code]) return MESSAGES[code];
    const message = (error as { message?: string })?.message;
    return message ?? 'Something went wrong. Please try again.';
}
