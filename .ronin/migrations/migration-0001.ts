import { create } from "ronin";

export default () => [
  create.model({
    slug: "user",
    fields: {
      email: { required: true, unique: true, type: "string" },
      emailVerified: { required: true, type: "boolean" },
      image: { type: "blob" },
      name: { required: true, type: "string" },
    },
  }),
  create.model({
    slug: "account",
    pluralSlug: "accounts",
    fields: {
      accessToken: { type: "string" },
      accessTokenExpiresAt: { type: "date" },
      accountId: { required: true, type: "string" },
      idToken: { type: "string" },
      password: { type: "string" },
      providerId: { required: true, type: "string" },
      refreshToken: { type: "string" },
      refreshTokenExpiresAt: { type: "date" },
      scope: { type: "string" },
      user: { required: true, target: "user", type: "link" },
    },
  }),
  create.model({
    slug: "session",
    fields: {
      expiresAt: { required: true, type: "date" },
      ipAddress: { type: "string" },
      token: { required: true, unique: true, type: "string" },
      user: { required: true, target: "user", type: "link" },
      userAgent: { type: "string" },
    },
  }),
  create.model({
    slug: "verification",
    pluralSlug: "verifications",
    fields: {
      expiresAt: { required: true, type: "date" },
      identifier: { required: true, type: "string" },
      value: { required: true, type: "string" },
    },
  }),
];
