import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { MdOutlineHome } from "react-icons/md";
import { TbCategory, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RiBloggerLine } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { LuFolderDot } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetail,
  RouteCommentDetails,
  RouteIndex,
  RouteUsers,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  const user = useSelector((state) => state.user);
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    },
    []
  );
  useEffect(() => {}, []);
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className={"bg-white"}>
        <div className="h-12 relative w-auto">
          <Link className="w-auto" to={RouteIndex}>
            <img
              src={logo}
              alt="logo"
              className="h-full md:w-auto w-[150px] object-contain"
            />
          </Link>
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 px-2"
            onClick={toggleSidebar}
          >
            <ImCross size={15} />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className={"bg-white "}>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MdOutlineHome />

                <Link className="w-full" to="/">
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <RiBloggerLine />
                <Link className="w-full" to={RouteBlog}>
                  Blogs
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <TbCategory />
                <Link className="w-full" to={RouteCategoryDetail}>
                  Categories
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {user && user.isLoggedIn && (
              <>
                {user.user.role === "admin" && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <FaRegComments />
                        <Link className="w-full" to={RouteCommentDetails}>
                          Comments
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <LuUsers />
                        <Link className="w-full" to={RouteUsers}>
                          Users
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.category &&
              categoryData.category.length > 0 &&
              categoryData.category.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton>
                    <LuFolderDot />
                    <Link
                      className="w-full"
                      to={RouteBlogByCategory(category.slug)}
                    >
                      {category.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
