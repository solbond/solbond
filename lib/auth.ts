import { betterAuth } from "better-auth"
import { ronin } from "@ronin/better-auth"

export const auth = betterAuth({
  database: ronin(),
})

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}