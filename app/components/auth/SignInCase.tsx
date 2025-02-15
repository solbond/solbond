import { useRouter } from "@tanstack/react-router"
// import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "~/lib/firebase"
import { ErrorType } from "~/routes/_app/auth"
import { getError } from "./Errors"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function SignInCase({
  setCurrentCase,
}: {
  setCurrentCase: (
    currentCase:
      | "signup"
      | "login"
      | "link-sent"
      | "verified"
      | "forgot-password",
  ) => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<ErrorType>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSignIn = () => {
    setError(null)
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user
    //     router.navigate({ to: "/" })
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code
    //     setError(getError(errorCode))
    //     console.log(errorCode, error.message)
    //   })
  }

  const isFormFilled = email.trim() !== "" && password.trim() !== ""

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-[36px] font-bold">Log In</h1>
        <p className="text-sm text-gray-400">
          Sign in to your account to continue
        </p>
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={`w-full p-2 outline-hidden bg-gray-100 dark:bg-inherit dark:border dark:border-[var(--neon-cyan)] dark:backdrop-blur-xs text-black dark:text-white rounded-md transition-all duration-300
          ${
            error?.type === "email"
              ? "border-red-500"
              : "dark:border-[var(--neon-cyan)]/50 dark:focus:border-[var(--neon-cyan)] dark:hover:border-[var(--neon-cyan)]"
          }`}
      />
      {error?.type === "email" && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
      <div className="relative mt-2">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`w-full p-2 outline-hidden bg-gray-100 dark:bg-inherit dark:border dark:border-[var(--neon-cyan)] dark:backdrop-blur-xs text-black ${showPassword ? "dark:text-white" : "dark:text-[var(--neon-cyan)]"} rounded-md transition-all duration-300
            ${
              error?.type === "password"
                ? "border-red-500"
                : "dark:border-[var(--neon-cyan)]/50 dark:focus:border-[var(--neon-cyan)] dark:hover:border-[var(--neon-cyan)]"
            }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[var(--neon-cyan)] hover:text-gray-700 dark:hover:text-[var(--neon-cyan)] transition-colors"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {error?.type === "password" && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
      {error?.type === "other" && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
      <p
        onClick={() => setCurrentCase("forgot-password")}
        className="text-[12px] text-gray-500 mt-1 cursor-pointer hover:text-[var(--neon-cyan)] transition-colors"
      >
        Forgot password?
      </p>
      <button
        onClick={handleSignIn}
        disabled={!isFormFilled}
        className={`w-full mt-4 font-bold p-3 rounded-xl transition-all duration-300
              ${
                isFormFilled
                  ? "text-white bg-[var(--neon-cyan)] dark:text-black"
                  : "bg-[var(--neon-cyan)] opacity-50 text-white cursor-not-allowed dark:text-black"
              }
        `}
      >
        Log In
      </button>
      <div className="text-[14px] text-opacity-50 text-end mt-2">
        Don't have an account?{" "}
        <span
          className="cursor-pointer font-semibold transition-all duration-300 hover:text-[var(--neon-cyan)] dark:hover:text-white"
          onClick={() => setCurrentCase("signup")}
        >
          Sign Up
        </span>
      </div>
    </div>
  )
}
