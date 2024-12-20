"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { login } from "./actions"

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined)

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-2 mt-12">
      {/* Email */}
      <div className="flex flex-col gap-1">
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="border border-black rounded-md px-2 py-1"
          defaultValue={state?.email || ""}
        />
        {state?.errors?.email && <p className="text-sm text-red">{state.errors.email}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="border border-black rounded-md px-2 py-1"
        />
        {state?.errors?.password && <p className="text-sm text-red">{state.errors.password}</p>}
      </div>

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type="submit"
      className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-all duration-200 disabled:bg-gray-600"
    >
      {pending ? "..." : "Login"}
    </button>
  )
}
