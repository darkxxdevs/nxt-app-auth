"use client"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

function Reset() {
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [token, setToken] = useState("")

  const router = useRouter()

  useEffect(() => {
    setToken(window.location.search.split("=")[1])
  }, [])

  const resetPassword = async () => {
    try {
      if (password1.length > 0 && password1 === password2) {
        setLoading(true)
        const response = await axios.post("/api/user/resetpass", {
          token: token,
          password: password1,
        })
        toast.success("password reset successfully!")
        console.log(response)

        router.push("/users/login")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setDisabled(password1.length === 0 || password2.length === 0)
  }, [password1, password2])

  return (
    <div className="page flex items-center justify-center h-[100vh] w-full">
      {loading ? (
        "processing..."
      ) : (
        <div className="card h-[40%] rounded-2xl border-[#3f3e3edd]  w-[30%] border-2 p-3 flex flex-col items-center">
          <h2 className="title font-bold">RECOVERY</h2>
          <div className="form h-[90%] w-full p-6 flex-col gap-4 flex">
            <label htmlFor="email">Enter new password:</label>
            <input
              type="password"
              placeholder="enter new password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="text-black p-4 outline-none rounded-2xl"
            />
            <label htmlFor="email">confirm new password: </label>
            <input
              type="password"
              placeholder="confirm new password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="text-black p-4 outline-none rounded-2xl"
            />
          </div>

          <button
            onClick={resetPassword}
            className={`align-middle mb-10 bg-slate-300 w-[70%] text-black p-5 rounded-2xl font-bold ${
              loading || disabled ? "line-through" : ""
            }`}
            disabled={disabled}
          >
            reset password
          </button>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Reset), { ssr: false })
