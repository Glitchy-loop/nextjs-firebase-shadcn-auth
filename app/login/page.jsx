"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(email, password)

      toast.success("Account has been created successfully.", {
        // description: "Optional description here.",
        action: {
          label: "Close",
          onClick: () => console.log(" "),
        },
      })

      sessionStorage.setItem("user", true)
      setEmail("")
      setPassword("")

      router.push("/")
    } catch (err) {
      console.error(err)

      toast.error(`Error occured during login: ${err}`, {
        // description: "Optional description here.",
        action: {
          label: "Close",
          onClick: () => console.log(" "),
        },
      })
    }
  }

  return (
    <form className="flex w-full max-w-sm items-center space-x-2 flex-col">
      <div className="my-3">
        <Label htmlFor="email">Email</Label>
        <Input
          required
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-3">
        <Label htmlFor="password">Password</Label>
        <Input
          required
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={(e) => handleLogin(e)}>Login</Button>
    </form>
  )
}

export default Login
