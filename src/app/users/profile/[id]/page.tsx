import React from "react"

interface ProfilePageProps {
  id: string
}

const Profile: React.FC<ProfilePageProps> = ({ params }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      UserID :{" "}
      <span className="bg-orange-400 w-[80px] text-black font-bold rounded-2xl p-5">
        {params.id}
      </span>
    </div>
  )
}

export default Profile
