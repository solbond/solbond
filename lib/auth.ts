import { betterAuth } from "better-auth"
import { ronin } from "@ronin/better-auth"

const auth = betterAuth({
  database: ronin(),
})
