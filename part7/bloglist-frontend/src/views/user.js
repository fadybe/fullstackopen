import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usersServices from "../services/user";

const UserView = () => {
  const id = useParams().id;

  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const fetchedProfile = await usersServices.getProfile(id);
    setProfile(fetchedProfile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    profile && (
      <div>
        <h1>{profile.name}</h1>
        <h2>Added blogs</h2>
        <ul>
          {profile.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default UserView;
