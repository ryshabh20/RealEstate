import React from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { useState } from "react";
import { OAuth } from "../components/OAuth";

export default function SignUp() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    console.log("handlechange");
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("this is the data that server sent for the client", data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-white text-3xl font-semibold text-white my-7 text-center">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-2 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-2 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-2 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue font-medium text-white p-3 rounded-lg uppercase hover:opacity-95% disabled:opacity-80"
        >
          {loading ? "Loading" : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-white">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-white">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-white mt-5">{error}</p>}
    </div>
  );
}
