"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/users/login")
  }, [])

  return <h1 className="text-center">Welcome home !</h1>
}
