import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  RouteAddBlog,
  RouteAddCategory,
  RouteBlog,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteCategoryDetail,
  RouteCommentDetails,
  RouteEditBlog,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUsers,
} from "./helpers/RouteName";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddCategory from "./pages/category/AddCategory";
import CategoryDetail from "./pages/category/CategoryDetail";
import EditCategory from "./pages/category/EditCategory";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetail from "./pages/Blog/BlogDetail";
import SingleBlog from "./pages/SingleBlog";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResult from "./components/SearchResult";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import AuthRouteProtection from "./components/AuthRouteProtection";
import AuthRouteAdmin from "./components/AuthRouteAdmin";
import UserBlogDetail from "./pages/Blog/UserBlogDetail";
import { useSelector } from "react-redux";
import UserCategoryDetail from "./pages/category/UserCategoryDetail";
import EditBlog from "./pages/Blog/EditBlog";
import Index from "./pages/Index";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          <Route path={RouteBlogDetails()} element={<SingleBlog />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />

          <Route element={<AuthRouteProtection />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteAddBlog} element={<AddBlog />} />
            <Route path={RouteEditBlog()} element={<EditBlog />} />
            <Route
              path={RouteBlog}
              element={
                user && user.user.role === "admin" ? (
                  <BlogDetail />
                ) : (
                  <UserBlogDetail />
                )
              }
            />
            <Route
              path={RouteCategoryDetail}
              element={
                user && user.user.role === "admin" ? (
                  <CategoryDetail />
                ) : (
                  <UserCategoryDetail />
                )
              }
            />
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
          </Route>
          <Route element={<AuthRouteAdmin />}>
            <Route path={RouteCommentDetails} element={<Comments />} />
            <Route path={RouteUsers} element={<Users />} />
          </Route>
        </Route>
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
