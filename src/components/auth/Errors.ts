export const Errors = {
  // Email/Password Authentication Errors
  "auth/email-already-exists": {
    type: "email",
    message: "This email is already registered",
  },
  "auth/email-already-in-use": {
    type: "email",
    message: "This email is already in use",
  },
  "auth/invalid-email": {
    type: "email",
    message: "Please enter a valid email address",
  },
  "auth/invalid-password": {
    type: "password",
    message: "Password must be at least 6 characters",
  },
  "auth/user-not-found": {
    type: "email",
    message: "No account found with this email",
  },
  "auth/wrong-password": { type: "password", message: "Incorrect password" },
  "auth/weak-password": {
    type: "password",
    message: "Password must be at least 6 characters",
  },
  "auth/missing-email": {
    type: "email",
    message: "Email is required",
  },
  "auth/missing-password": {
    type: "password",
    message: "Password is required",
  },

  // Account Status Errors
  "auth/user-disabled": {
    type: "other",
    message: "This account has been disabled",
  },
  "auth/operation-not-allowed": {
    type: "other",
    message: "This login method is not enabled",
  },

  // Network/Rate Limiting Errors
  "auth/too-many-requests": {
    type: "other",
    message: "Too many attempts. Please try again later",
  },
  "auth/network-request-failed": {
    type: "other",
    message: "Network error. Please check your connection",
  },

  // Token Errors
  "auth/invalid-credential": {
    type: "other",
    message: "Invalid login credentials",
  },
  "auth/invalid-verification-code": {
    type: "other",
    message: "Invalid verification code",
  },
  "auth/invalid-verification-id": {
    type: "other",
    message: "Invalid verification ID",
  },

  // Phone Auth Errors
  "auth/invalid-phone-number": {
    type: "other",
    message: "Please enter a valid phone number",
  },
  "auth/phone-number-already-exists": {
    type: "other",
    message: "This phone number is already registered",
  },

  // General Errors
  "auth/internal-error": {
    type: "other",
    message: "An error occurred. Please try again",
  },
  "auth/invalid-argument": {
    type: "other",
    message: "Invalid information provided",
  },
  "auth/invalid-display-name": {
    type: "other",
    message: "Please enter a valid display name",
  },
  "auth/unauthorized-domain": {
    type: "other",
    message: "This domain is not authorized",
  },

  // Default Error
  default: {
    type: "other",
    message: "An unexpected error occurred. Please try again",
  },
} as const

// Helper function to get error object
export const getError = (
  errorCode: string,
): { type: "email" | "password" | "other"; message: string } => {
  return (
    (
      Errors as Record<
        string,
        { type: "email" | "password" | "other"; message: string }
      >
    )[errorCode] || Errors.default
  )
}
