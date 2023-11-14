"use client"
import axios from "axios"
import Link from "next/link"
import dynamic from "next/dynamic"
import { toast } from "react-toastify"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isvisible, setVisibility] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setVisibility(false)
  }, [])

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/user/signup", user)
      toast.success("Signup sucess!")
      router.push("/users/login")
    } catch (error: any) {
      console.log("Signup failed", error)
      toast.error("Error in creating accout!!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      {loading ? (
        <h1>processing.....</h1>
      ) : (
        <div className="card  w-[30%] h-[65%] p-3">
          <div className="title w-full text-center font-bold text-3xl mb-4">
            SIGNUP
          </div>
          <div className="field w-full flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="p-3 rounded-lg text-black outline-none"
              autoComplete="off"
            />
          </div>
          <div className="field w-full flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email address"
              className="p-3 rounded-lg text-black outline-none"
              autoComplete="off"
            />
          </div>
          <div className="field w-full flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <div className="pass flex items-center bg-white rounded-lg">
              <input
                type={isvisible ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="p-3 rounded-lg text-black w-[90%] outline-none bg-transparent"
                autoComplete="off"
              />
              {isvisible ? (
                <button
                  onClick={() => setVisibility(false)}
                  className="bg-transparent text-black rounded-md font-bold"
                >
                  <Eye />
                </button>
              ) : (
                <button
                  onClick={() => setVisibility(true)}
                  className="bg-transparent text-black rounded-md font-bold"
                >
                  <EyeOff />
                </button>
              )}
            </div>
          </div>
          <div>
            <span className="pt-5 text-sm mb-6">
              Already have an account?{" "}
              <Link href={"/users/login"} legacyBehavior passHref>
                <a className="text-zinc-400">Login instead</a>
              </Link>
            </span>
          </div>

          <div className="btn flex items-center w-full mt-[3%] justify-center">
            <button
              onClick={onSignup}
              className={`${
                buttonDisabled ? "line-through" : "no-underline"
              } bg-slate-400 rounded-md font-bold p-5 w-96`}
            >
              <span className="font-bold">sign up</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Signup), { ssr: false })
