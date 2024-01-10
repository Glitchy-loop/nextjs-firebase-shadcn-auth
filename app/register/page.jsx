"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { auth } from "@/app/firebase"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { Toaster, toast } from "sonner"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth)

  const handleRegistration = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(email, password)

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
    } catch (err) {
      console.log(err)
      toast.error(`Error occured during registration: ${err}`, {
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
          autoComplete="email"
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
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        disabled={!email || !password}
        onClick={(e) => handleRegistration(e)}
      >
        Register
      </Button>
    </form>
  )
}

export default Register
