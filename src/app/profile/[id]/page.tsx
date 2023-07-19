import React from "react";

const userProfile = ({ params }: any) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <h1 className=' bg-orange-700 rounded p-8 font-extrabold'>
        <span className=' bg-black p-5 rounded hover:bg-orange-400'>
          UserId:
        </span>{" "}
        {params.id}
      </h1>
    </div>
  );
};

export default userProfile;
