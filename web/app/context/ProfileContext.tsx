import { createContext, useContext, useState, ReactNode } from "react"

export interface Product {
  id: number
  name: string
  price: number
  description: string
  sold: boolean
  link?: string
  image: string
  tags?: string[]
  quantity?: number
}

export interface Profile {
  id: string
  username: string
  name: string
  email: string
  rating: number
  avatar: string
  description: string
  products: Product[]
}

interface ProfileContextType {
  myProfile: Profile
  otherProfiles: Profile[]
  updateMyProfile: (profile: Partial<Profile>) => void
}

const defaultMyProfile: Profile = {
  id: "my-profile",
  username: "",
  name: "",
  email: "",
  rating: 0,
  avatar: "https://api.multiavatar.com/default.svg",
  description: "",
  products: [],
}

const defaultOtherProfiles: Profile[] = [
  {
    id: "john-doe",
    username: "JohnD",
    name: "John Doe",
    email: "john.doe@example.com",
    rating: 4.5,
    avatar: "https://api.multiavatar.com/JohnDoe.svg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    products: [
      {
        id: 1,
        name: "Premium Figma UI Kit",
        price: 100,
        sold: false,
        link: "/product",
        image: "https://robohash.org/nft-1484.png?set=set4&size=400x400",
        description: "A comprehensive UI kit for Figma.",
        tags: ["ui-kit", "figma", "design"],
        quantity: 1,
      },
    ],
  },
]

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [myProfile, setMyProfile] = useState<Profile>(defaultMyProfile)
  const [otherProfiles] = useState<Profile[]>(defaultOtherProfiles)

  const updateMyProfile = (updates: Partial<Profile>) => {
    setMyProfile((prev) => ({ ...prev, ...updates }))
  }

  return (
    <ProfileContext.Provider
      value={{ myProfile, otherProfiles, updateMyProfile }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfiles() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfileProvider")
  }
  return context
}
