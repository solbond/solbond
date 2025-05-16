import { betterAuth } from "better-auth"
import { ronin } from "@ronin/better-auth"
import createSyntaxFactory from 'ronin';

const client = createSyntaxFactory({
  token: process.env.BLADE_APP_TOKEN,
})

export const auth = betterAuth({
  database: ronin(client),
})

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}