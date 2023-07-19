"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState("nothing");
  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logged out");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const response: any = await axios.get("/api/users/me");
    setUser(response.data.data._id);
    console.log(response.data.data._id);
  };

  return (
    <div className=' p-5'>
      <nav className=' flex justify-around h-10'>
        <ul className=' flex justify-around gap-52'>
          <li>Home</li>
          <li>Account</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button
          onClick={logOut}
          className='bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
        >
          Logout
        </button>
      </nav>
      <h1 className=' text-center text-2xl mt-10'>Profile page.</h1>
      <div className=' flex justify-center items-center min-h-screen flex-col gap-6'>
        <p>
          user authentication and authorization using Next js with app router
        </p>
        <h1 className=' text-red-600 font-extrabold text-3xl'>
          {user === "nothing" ? (
            "NOTHING..."
          ) : (
            <Link
              className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
              href={`/profile/${user}`}
            >
              ID: {user}
            </Link>
          )}
        </h1>
        <button
          onClick={getUserDetails}
          className='bg-blue-500 hover:bg-blue-700 text-white mt-10 font-bold py-2 px-4 rounded-full'
        >
          GetUserDetails
        </button>
      </div>
    </div>
  );
};

export default Profile;
