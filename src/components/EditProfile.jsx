

import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      toast.success("Profile Updated Successfully!");
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center my-10 px-4 gap-8">
      {/* Edit Form */}
      <div className="card bg-base-300 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4 text-2xl font-semibold">
            Edit Profile
          </h2>

          {/* First Name & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4 my-2">
            <label className="form-control w-full sm:w-1/2">
              <span className="label-text">First Name</span>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full sm:w-1/2">
              <span className="label-text">Last Name</span>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          {/* Photo URL and Upload */}
          <div className="form-control w-full my-4">
            <span className="label-text mb-1">Profile Picture</span>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full mb-2"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <div className="text-center text-gray-500 font-semibold mb-2">OR</div>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
            />
          </div>

          {/* Age & Gender */}
          <div className="flex flex-col sm:flex-row items-end gap-4 my-2">
            <label className="form-control w-full sm:w-1/2">
              <span className="label-text">Age</span>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full sm:w-1/2">
              <span className="label-text">Gender</span>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </label>
          </div>

          {/* About */}
          <label className="form-control w-full my-2">
            <span className="label-text">About</span>
            <textarea
              value={about}
              className="textarea textarea-bordered w-full"
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
            ></textarea>
          </label>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary px-8" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* User Preview Card */}
      <div className="w-full max-w-md">
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
    </div>
  );
};

export default EditProfile;
