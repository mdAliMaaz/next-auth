"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSighup = () => {
    console.log(user);
  };

  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='container mx-auto my-4 px-4 lg:px-20'>
          <div className='w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl'>
            <div className='flex'>
              <h1 className='font-bold uppercase text-5xl'>SignUp</h1>
            </div>

            <div className='grid grid-cols-1 gap-5 mt-5'>
              <input
                className='w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='username*'
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />

              <input
                className='w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                type='email'
                placeholder='Email*'
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />

              <input
                className='w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                type='password'
                placeholder='password*'
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className='my-5'>
              <button
                className='uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline'
                onClick={onSighup}
              >
                Signup
              </button>
            </div>
            <Link className='underline my-5 text-sm' href={"/login"}>
              already have an account ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
