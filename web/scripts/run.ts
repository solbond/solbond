import db from "@/ronin/db"

async function main() {
  const users = await db.get.users()
  console.log(users)
}

main()
