import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => {
    return state.user;
  });
  console.log("this is the error", error);
  const [data, setData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setData({ ...data, avatar: downloadURL })
        );
      }
    );
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("this is the result ", result);
      if (result.success === false) {
        dispatch(updateUserFailure(result.message));
        return;
      }
      setUpdateSuccess(true);
      dispatch(updateUserSuccess(result));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value,
    });
    console.log(data);
  };
  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess(data));
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-white font-semibold text-center my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2"
          alt="profile"
        />
        <input
          type="text"
          onChange={handleOnChange}
          value={data.username}
          id="username"
          className="border p-2 rounded-lg"
        />
        <input
          type="email"
          onChange={handleOnChange}
          value={data.email}
          id="email"
          className="border p-2 rounded-lg"
        />
        <input
          type="password"
          onChange={handleOnChange}
          placeholder="password"
          id="password"
          className="border p-2 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue rounded-lg text-white p-2 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading" : "Update"}
        </button>
        <Link
          className="bg-orange-gradient rounded-lg text-white text-center p-2 hover:opacity-95 disabled:opacity-80"
          to="/create-listing"
        >
          <button>Create Listing</button>
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red cursor-pointer font-medium"
        >
          Delete Account
        </span>
        <span
          onClick={handleLogout}
          className="text-red cursor-pointer font-medium"
        >
          Sign out
        </span>
      </div>

      <p className="text-red mt-5">{error ? error : ""}</p>
      <p className="text-blue mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
}
