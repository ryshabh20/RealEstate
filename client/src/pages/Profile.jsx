import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const { currentUser } = useSelector((state) => {
    return state.user;
  });
  const [data, setData] = useState({
    username: currentUser.username,
    email: currentUser.email,
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
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/user/update/${currentUser.id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);
  };
  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    console.log(data);
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
          className="bg-blue rounded-lg text-white p-2 hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
        <button className="bg-orange-gradient rounded-lg text-white p-2 hover:opacity-95 disabled:opacity-80">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red cursor-pointer font-medium">
          Delete Account
        </span>
        <span className="text-red cursor-pointer font-medium">Sign out</span>
      </div>
    </div>
  );
}
