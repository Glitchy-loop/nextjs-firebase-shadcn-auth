"use client"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

const Home = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const userSession = sessionStorage.getItem("user")

  const handleLogout = () => {
    signOut(auth)
    sessionStorage.removeItem("user")

    toast.success("Logged out successfully.", {
      // description: "Optional description here.",
      action: {
        label: "Close",
        onClick: () => console.log(" "),
      },
    })
  }

  if (!user && !userSession) {
    router.push("/login")
  }

  return (
    <div className="pt-5 pb-5">
      {user && <div>Hello {user.displayName || user.email}</div>}
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  )
}

export default Home
