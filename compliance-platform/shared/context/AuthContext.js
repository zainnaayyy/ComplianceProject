"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import { useRouter } from "next/navigation";
import { url } from "@/shared";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [isValidToken, setIsValidToken] = useState(() => (user ? true : false));

  useEffect(() => {
    let fiveMinutes = 1000 * 60 * 5;
    let interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, fiveMinutes);

    return () => clearInterval(interval);
  }, [token]);

  const router = useRouter();

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${url}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(data.user);
        return data;
      }
    } catch (error) {
      return false;
    }
  };

  const login = async (email, password) => {
    // Call API to verify login credentials
    const response = await fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",

      },
    });
    // .then((response) => response.json())
    // .then((result) => {
    //   setUser(result);
    //   navigate("/dashboard")
    //   return true;
    // })
    // .catch((error) => {return false});

    if (response.status === 200) {
      const data = await response.json();
      setToken(data.token);
      const result = await validateToken(data.token);
      if (result.success) {
        return result;
      }
    }
    return response.json();
  };

  const logout = async (token) => {
    const response = await fetch(`${url}/auth/logout/`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setIsValidToken(false);
      setToken(null);
      setUser(null);
      router.push("/");
    }
    return false;
  };

  const updateToken = async () => {
    console.info("Updating token");
    // const response = await fetch("https://back.iqbot.live/auth/token/refresh/", {
    //   method: "POST",
    //   body: JSON.stringify({ "refresh": token?.refresh }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // .then((response) => response.json())
    // .then((result) => {
    //   setUser(result);
    //   navigate("/dashboard")
    //   return true;
    // })
    // .catch((error) => {return false});
    // if(response) {
    //   let data = await response.json()
    //   setToken(data);
    //   const result = await validateToken(data);
    //   if (result) {
    //     setIsValidToken(true)
    //     // navigate("/dashboard")
    //     windows.reload()
    //     return true;
    //   }
    //   logout()
    // } else {
    //   logout()
    // }
  };

  return (
    <AuthContext.Provider
      value={{ token, isValidToken, setIsValidToken, user, login, logout, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
