export const RouteIndex = "/";
export const RouteSignIn = "/sign-in";
export const RouteSignUp = "/sign-up";
export const RouteProfile = "/profile";
export const RouteCategoryDetail = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/category/edit/${category_id}`;
  }
  return `/category/edit/:category_id`;
};
export const RouteBlog = "/blog";
export const RouteAddBlog = "/blog/add";
export const RouteEditBlog = (blog_id) => {
  if (blog_id) {
    return `/blog/edit/${blog_id}`;
  }
  return `/blog/edit/:blog_id`;
};
export const RouteBlogDetails = (category, slug) => {
  if (!category || !slug) {
    return "/blog/:category/:slug";
  }
  return `/blog/${category}/${slug}`;
};
export const RouteBlogByCategory = (category) => {
  if (!category) {
    return "/blog/:category";
  }
  return `/blog/${category}`;
};
export const RouteSearch = (q) => {
  if (q) {
    return `/search?q=${q}`;
  }
  return `/search`;
};

export const RouteCommentDetails = "/comments";
export const RouteUsers = "/users";
