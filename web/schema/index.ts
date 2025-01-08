import { link, model, string, boolean, number } from "ronin/schema"

export const UserModel = model({
  slug: "user",
  fields: {
    email: string({ unique: true }),
    verified: boolean(),
    username: string(),
    description: string(),
    clerkId: string({ unique: true }),
  },
})

export const ProductModel = model({
  slug: "product",
  fields: {
    name: string(),
    description: string(),
    priceInUsd: number(),
    published: boolean(),
    approved: boolean(),
    featured: boolean(),
    createdBy: link({
      target: "user",
    }),
  },
})
