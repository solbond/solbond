import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { ErrorType } from "~/routes/_app/auth"

export default function SignUpCase({
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

  // const handleSignUp = () => {
  //   setError(null)

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(async (userCredential) => {
  //       const user = userCredential.user

  //       const res = await $createUser({
  //         data: {
  //           email: user.email as string,
  //           uid: user.uid,
  //         },
  //       })
  //       console.log(res, "res")

  //       sendEmailVerification(user)
  //         .then(async () => {
  //           setCurrentCase("link-sent")
  //         })
  //         .catch((error) => {
  //           setError({
  //             type: "other",
  //             message: "Failed to send verification email. Please try again.",
  //           })
  //           console.log(error.code, error.message)
  //         })
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code
  //       const errorMessage = error.message
  //       setError(getError(errorCode))
  //       console.log(errorCode, errorMessage)
  //     })
  // }

  const isFormFilled = email.trim() !== "" && password.trim() !== ""

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-[36px] font-bold">Sign Up</h1>
        <p className="text-sm text-gray-400">
          Create an account to get started
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

      <button
        // onClick={handleSignUp}
        onClick={() => {}}
        disabled={!isFormFilled}
        className={`w-full mt-4 font-bold p-3 rounded-xl transition-all duration-300
          ${
            isFormFilled
              ? "text-white bg-[var(--neon-cyan)] dark:text-black"
              : "bg-[var(--neon-cyan)] opacity-50 text-white cursor-not-allowed dark:text-black"
          }
        `}
      >
        Create Account
      </button>
      <div className="text-[14px] text-opacity-50 text-end mt-2">
        Already have an account?{" "}
        <span
          className="cursor-pointer font-semibold transition-all duration-300 hover:text-[var(--neon-cyan)] dark:hover:text-white"
          onClick={() => setCurrentCase("login")}
        >
          Log In
        </span>
      </div>
    </div>
  )
}
