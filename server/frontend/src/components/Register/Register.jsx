import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch(window.location.origin + "/djangoapp/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div className="register_container">
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <div><label>Username</label>
          <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} /></div>
        <div><label>First Name</label>
          <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} /></div>
        <div><label>Last Name</label>
          <input type="text" placeholder="Last Name" onChange={(e) => setlastName(e.target.value)} /></div>
        <div><label>Email</label>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /></div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
