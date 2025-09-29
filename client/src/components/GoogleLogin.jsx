import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex } from "@/helpers/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
export default function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const googleResponse = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = googleResponse.user;
    const values = {
      name: displayName,
      email,
      avatar: photoURL,
    };
    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      dispatch(setUser(data.user));
      showToast("success", data.message);
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <Button variant={"outline"} className={"w-full"} onClick={handleLogin}>
      <FcGoogle />
      continue with Google
    </Button>
  );
}
