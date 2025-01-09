import { link, model, string, boolean, number, blob } from "ronin/schema"

// user on website
export const UserModel = model({
  slug: "user",
  fields: {
    email: string({ unique: true, required: true }), // user is identified by unique email
    username: string({ unique: true, required: true }), // user needs unique username (just like X/GitHub), will be seen as solbond.co/<username>
    verifiedCreator: boolean(), // user is a verified creator (more trust, means products can show in search/discover faster)
    bio: string(), // user bio
    jwtAccessToken: string(), // TODO: make work with openauth
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
