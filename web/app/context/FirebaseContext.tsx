// import { createContext, useContext, useState, useEffect } from "react"
// import type { User } from "firebase/auth"
// import { onAuthStateChanged } from "firebase/auth"
// import { auth } from "~/lib/firebase"

// type AuthContextType = {
//   user: User | null
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
// })

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user)
//       setLoading(false)
//     })

//     return () => unsubscribe()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
