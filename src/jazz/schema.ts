import { Account, CoList, CoMap, Group, ID, Profile, co } from "jazz-tools"

export class Product extends CoMap {
  name = co.string
  description = co.string
  priceInCents = co.optional.number
  coverImageUrl = co.optional.string
  userComment = co.optional.string
}
export const ProductCollection = CoList.Of(co.ref(Product))

export class PublicProduct extends CoMap {
  name = co.string
  description = co.string
  priceInCents = co.number
  coverImageUrl = co.string
}
export const PublicProductCollection = CoList.Of(co.ref(PublicProduct))

export class AccountRoot extends CoMap {
  products = co.ref(ProductCollection)
  publicProducts = co.ref(PublicProductCollection)
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
  }

  private async initialMigration(creationProps: {
    name: string
    other?: Record<string, unknown>
  }) {
    const { name, other } = creationProps

    const adminAccount = (await Account.load(
      "co_zAsBcQzQzhcrK6TYhV7RmmGXZRD" as ID<Account>,
      this,
      {},
    )) as Account
    console.log(adminAccount, "admin")

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
    this.root = AccountRoot.create(
      {
        products: ProductCollection.create([], { owner: privateGroup }),
        publicProducts: PublicProductCollection.create([], {
          owner: publicGroup,
        }),
        version: 0,
      },
      { owner: this },
    )
    // TODO: not sure why breaks
    // privateGroup.addMember(adminAccount, "admin")
  }
}
