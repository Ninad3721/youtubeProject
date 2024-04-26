import { useState, useEffect } from "react";

const AuthState = ({ children }) => {
  const signup = async (email, password) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };
};
