// import { createServerFn } from "@tanstack/start"
// import { create, get, set } from "ronin"

// export const $createUser = createServerFn({
//   method: "POST",
// })
//   .validator((data: { email: string; uid: string }) => {
//     if (!data.email) {
//       throw new Error("Email is required")
//     }
//     return data
//   })
//   .handler(async (ctx) => {
//     try {
//       const user = await create.user.with({
//         email: ctx.data.email,
//         firebaseUid: ctx.data.uid,
//       })
//       return user
//     } catch (error) {
//       throw new Error("Failed to create user")
//     }
//   })

// export const $verifyUser = createServerFn({
//   method: "POST",
// })
//   .validator((email: string) => {
//     return email
//   })
//   .handler(async (ctx) => {
//     try {
//       const user = await set.user({
//         with: {
//           email: ctx.data,
//         },
//         to: {
//           verified: true,
//         },
//       })
//       return user
//     } catch (error) {
//       throw new Error("Failed to verify user")
//     }
//   })

// export const $createProduct = createServerFn({
//   method: "POST",
// })
//   .validator((data: { form: ProductForm; sellerId: string }) => {
//     if (!data.sellerId) {
//       throw new Error("Seller ID is required")
//     }
//     return data
//   })
//   .handler(async (ctx) => {
//     console.log(ctx.data, "Wtffffffffff")

//     try {
//       const user = await get.user({
//         with: {
//           firebaseUid: ctx.data.sellerId,
//         },
//       })
//       const product = await create.product.with({
//         name: ctx.data.form.name,
//         description: ctx.data.form.description,
//         priceInUsd: ctx.data.form.price,
//         createdBy: user?.id,
//       })
//       return product
//     } catch (error) {
//       throw new Error("Failed to create product")
//     }
//   })

// // How to get all products query
// export const $getProducts = createServerFn({
//   method: "GET",
// }).handler(async () => {
//   const products = await get.product()
//   return products
// })
