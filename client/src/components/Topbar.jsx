import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { IoSearch } from "react-icons/io5";
import {
  RouteAddBlog,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/user.png";
import { CgProfile } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { IoMenu } from "react-icons/io5";
import { useSidebar } from "./ui/sidebar";
export default function Topbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggleSearch, setToggleSearch] = useState(false);
  const { isMobile } = useSidebar();
  const handleLogout = async () => {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      showToast("success", data.message);
      dispatch(removeUser());
    } catch (error) {
      showToast("error", error.message);
    }
  };
  const handletoggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };
  useEffect(() => {
    if (!isMobile) {
      setToggleSearch(false);
    }
  }, [isMobile]);
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white md:px-5 px-3 border-b transition-all duration-600">
      <div className="">
        <div className="md:h-12 h-14 md:w-[120px] w-[70px]">
          <Link to={RouteIndex}>
            <img
              src={logo}
              alt="logo"
              className="h-full md:w-auto w-full object-contain"
            />
          </Link>
        </div>
      </div>

      <div className="md:w-[500px] w-[300px]">
        <div
          className={`md:block md:relative absolute top-16 w-full p-3 bg-white md:top-0 left-0 ${
            toggleSearch ? "block" : "hidden"
          }`}
        >
          <SearchBox />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={handletoggleSearch}
          className="md:hidden block"
          type="button"
        >
          <IoSearch size={25} />
        </button>
        <div onClick={toggleSidebar} className=" ml-2  md:hidden block">
          <IoMenu size={25} />
        </div>
        {user.isLoggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={"rounded-full cursor-pointer md:mx-0 mx-3"}
              >
                <Avatar>
                  <AvatarImage src={user.user.avatar || userIcon} />
                  <AvatarFallback>{"n"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{user.user.name}</p>
                  <p className="text-xs text-black/60">{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link className="w-full cursor-pointer" to={RouteProfile}>
                    <CgProfile />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className="w-full cursor-pointer" to={RouteAddBlog}>
                    <IoMdAdd />
                    Add Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <MdLogout className="text-red-500" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button className={"rounded-full"} asChild>
              <Link className="rounded-full" to={RouteSignIn}>
                <MdLogin />
                Sign in
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
