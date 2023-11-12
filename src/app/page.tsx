"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return <h1 className="text-center">Welcome home !</h1>
}
