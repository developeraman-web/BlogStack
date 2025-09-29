export const deleteData = async (endpoint) => {
  const c = confirm("Are you sure you want to delete this?");
  if (c) {
    try {
      const res = await fetch(endpoint, {
        method: "delete",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
};
