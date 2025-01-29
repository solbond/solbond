import { get, add, remove } from "ronin"

async function main() {
  // await run()
  // await createUser()
  // await resetData()
  await getUsers()
}

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
  })
  console.log(user)
}

async function run() {}

await main()
console.log("done")
