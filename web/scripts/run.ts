import ronin from "ronin"
import * as models from "../schema/index"
const { add } = ronin({ models })

async function main() {
  const res = await add.user.to({
    email: "nikita@nikiv.dev",
    clerkId: "user_2Q5678901234567890123456",
    username: "nikiv",
  })
  console.log(res)
}

main()
