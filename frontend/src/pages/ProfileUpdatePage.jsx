import ClipLoader from "react-spinners/ClipLoader";
import { useUser } from "../context/UserContext";
import { useUpdateUser } from "../hooks/useUpdateUser";
import "./ProfileUpdatePage.scss";
// import UploadWidget from "../components/UploadWidget";
import { useState } from "react";
import uploadImageCloudinary from "../utils/uploadCloudinary";

function ProfileUpdatePage() {
  const { user } = useUser();
  const { updatedUser, isUpdateUser } = useUpdateUser();
  const [avatar, setAvatar] = useState(user.avatar);
  console.log(avatar);

  const fileInputHandler = async (e) => {
    const file = e.target.files[0];

    const data = await uploadImageCloudinary(file);

    console.log(data);
    setAvatar(data.url);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);
    console.log(data);

    updatedUser({ userId: user.id, userData: { ...data, avatar }, avatar });
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={isUpdateUser}>
            {isUpdateUser ? (
              <ClipLoader color="white" size={20} />
            ) : (
              "Update profile"
            )}
          </button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar || user.avatar || "/avatar.png"}
          alt=""
          className="avatar"
        />
        <div className="upload ">
          <input
            type="file"
            name="photo"
            id="customFile"
            accept=".jpg,.png"
            onChange={fileInputHandler}
          />
          <label htmlFor="customFile">Upload a photo</label>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
