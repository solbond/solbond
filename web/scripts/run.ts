import ronin from "ronin"
import * as models from "../schema/index"

const { add, get } = ronin({ models })

async function main() {
  // const res = await add.user.to({
  //   email: "nikita@nikiv.de",
  //   clerkId: "user_2Q567890123456789012345",
  //   username: "nikiv",
  // })
  const users = await get.users()
  console.log(users)
  const user = await get.user.with({
    email: "nikita@nikiv.dev",
  })
  console.log(user)
}

main()
