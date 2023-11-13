"use client"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.get("/api/user/logout")
      console.log("logged out")
      router.push("/users/login")
    } catch (error: any) {
      console.log("Error :", error)
    }
  }

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
      <h1 className="text-center">Welcome home !</h1>
      <button
        className="bg-white p-4 rounded-2xl text-black font-bold mt-4"
        onClick={logout}
      >
        logout
      </button>
    </div>
  )
}
