import { link, model, string, boolean, number, blob, date } from "ronin/schema"

// user on website
export const UserModel = model({
  slug: "user",
  fields: {
    email: string({ unique: true, required: true }), // user is identified by unique email
    emailVerified: boolean(), // email is verified
    username: string({ unique: true, required: true }), // user needs unique username (just like X/GitHub), will be seen as solbond.co/<username>
    name: string(), // display name
    // TODO: can't do blob due to better auth working well with string, see where to store images..
    image: string(), // image
    // TODO: here temporarily until better auth supports reading ronin.updatedAt / ronin.createdAt
    createdAt: date(), // date user was created
    updatedAt: date(), // date user was updated
    verifiedCreator: boolean(), // user is a verified creator (more trust, means products can show in search/discover faster)
    bio: string(), // user bio
  },
})

// better auth session (for auth) (https://www.better-auth.com/docs/concepts/database#session)
export const SessionModel = model({
  slug: "session",
  fields: {
    userId: link({
      target: "user",
      required: true,
    }),
    token: string(), // token
    expiresAt: date(), // date token expires
    ipAddress: string(), // ip address of user
    userAgent: string(), // user agent of user
    // TODO: should be from ronin.
    createdAt: date(), // date session was created
    updatedAt: date(), // date session was updated
  },
})

// better auth account (for auth) (https://www.better-auth.com/docs/concepts/database#account)
export const AccountModel = model({
  slug: "account",
  fields: {
    userId: link({
      target: "user",
      required: true,
    }),
    accountId: string(), // account id
    providerId: string(), // provider id
    accessToken: string(), // access token
    refreshToken: string(), // refresh token
    accessTokenExpiresAt: date(), // access token expires
    refreshTokenExpiresAt: date(), // refresh token expires
    scope: string(), // scope
    idToken: string(), // id token
    password: string(), // password
    // TODO: should use ronin.
    createdAt: date(), // date account was created
    updatedAt: date(), // date account was updated
  },
})

// better auth verification (for auth) (https://www.better-auth.com/docs/concepts/database#verification)
export const VerificationModel = model({
  slug: "verification",
  fields: {
    identifier: string(), // identifier
    value: string(), // value
    // TODO: should use ronin.
    expiresAt: date(), // date token expires
    createdAt: date(), // date verification was created
    updatedAt: date(), // date verification was updated
  },
})

// product created by user
// product can be anything: app, tool, library, etc. (anything digital) (string or file(s))
export const ProductModel = model({
  slug: "product",
  fields: {
    name: string({ required: true }), // name of product
    url: string({ required: true, unique: true }), // custom url of product (if not set, will be generated from name by lowercase and dashes)
    description: string(), // description of product
    priceInUsd: number(), // price of product in USD TODO: prob best do it like https://docs.spherepay.co/api/price
    published: boolean(), // product is published so can be seen by everyone that has url of it
    approved: boolean(), // product is approved (nothing illigal) (can be found via search/explore)
    featured: boolean(), // product can appear on landing page TODO: maybe no need for this field, derive it in query
    // who created product, each product is created by 1 user
    createdBy: link({
      target: "user",
      required: true,
    }),
  },
})

// file that is part of product
export const FileModel = model({
  slug: "file",
  fields: {
    // which product is this file part of
    partOfProduct: link({
      target: "product",
      required: true,
    }),
    content: blob(), // file content
    name: string(), // name of file
    description: string(), // description of file
  },
})
