import { get, add, remove } from "ronin"

await main()
console.log("✔️")

async function resetData() {
  await remove.users()
}

async function getUsers() {
  const users = await get.users()
  console.log(users)
}

async function createUser() {
  // @ts-ignore
  const user = await add.user.with({
    email: "nikita@nikiv.dev",
    username: "nikiv",
    createdAt: new Date(),
  })
  console.log(user)
}

async function main() {}

// const users = await get.users()
// console.log(users)
// await createUser()
// await resetData()
// await getUsers()
