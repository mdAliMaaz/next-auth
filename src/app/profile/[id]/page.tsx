import React from "react";

const userProfile = ({ params }: any) => {
  return (
    <div>
      <h1>User{params.id}</h1>
    </div>
  );
};

export default userProfile;
