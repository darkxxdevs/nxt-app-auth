"use client"
import React from "react"
import axios from "axios"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Profile = () => {
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

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get("/api/user/details/")
        router.push(`/users/profile/${response.data.userData._id}`)
      } catch (error: any) {
        console.error("error fetching user data ", error.message)
      }
    }

    getUserData()
  }, [])

  return (
    <div className="h-[70vh] w-[100vw] flex flex-col items-center justify-center">
      <div className="h-[100vh] w-[100vw] flex items-center text-2xl justify-center">
        Profile
        <span className="bg-orange-400 w-[100px] text-black font-bold flex items-center justify-center rounded-2xl p-5 m-2">
          page
        </span>
      </div>
      <button className="bg-white text-black p-5 rounded-lg " onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Profile
