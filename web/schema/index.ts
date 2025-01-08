import { link, model, string } from "ronin/schema"

export const UserModel = model({
  slug: "user",
  fields: {
    email: string({ unique: true }),
    username: string(),
  },
})

export const ProductModel = model({
  slug: "product",
  fields: {
    name: string(),
    description: string(),
    createdBy: link({
      target: "user",
    }),
  },
})
