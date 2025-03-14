import { Account, CoList, CoMap, Group, Profile, co } from "jazz-tools"

export class Link extends CoMap {
  url = co.string
  title = co.string
}
export const LinkCollection = CoList.Of(co.ref(Link))

export class AccountRoot extends CoMap {
  links = co.ref(LinkCollection)
  version = co.optional.number
}

export class UserProfile extends Profile {
  name = co.string

  static validate(data: { name?: string; other?: Record<string, unknown> }) {
    const errors: string[] = []
    if (!data.name?.trim()) {
      errors.push("Please enter a name")
    }
    return { errors }
  }
}

export class JazzAccount extends Account {
  profile = co.ref(UserProfile)
  root = co.ref(AccountRoot)
  async migrate(creationProps?: {
    name: string
    other?: Record<string, unknown>
  }) {
    if (this.root === undefined && creationProps) {
      await this.initialMigration(creationProps)
      return
    }
    // uncomment this to add migrations
    // const currentVersion = this.root?.version || 0;
    // if (currentVersion < 1) {
    //   await this.migrationV1();
    // }
  }

  private async initialMigration(creationProps: {
    name: string
    other?: Record<string, unknown>
  }) {
    const { name, other } = creationProps
    const profileErrors = UserProfile.validate({ name, ...other })
    if (profileErrors.errors.length > 0) {
      throw new Error(
        `Invalid profile data: ${profileErrors.errors.join(", ")}`,
      )
    }

    const publicGroup = Group.create({ owner: this })
    publicGroup.addMember("everyone", "reader")

    this.profile = UserProfile.create(
      { name, ...other },
      { owner: publicGroup },
    )

    const privateGroup = Group.create({ owner: this })

    // initialize root structure with version
    this.root = AccountRoot.create(
      {
        links: LinkCollection.create([], { owner: privateGroup }),
        version: 0,
      },
      { owner: this },
    )
  }
}
