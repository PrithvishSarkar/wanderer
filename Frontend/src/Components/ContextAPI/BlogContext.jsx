import { createContext, useState, useContext } from "react";

const BlogContext = createContext();

const BlogContextWrapper = ({ children }) => {
  const [blogData, setBlogData] = useState(null);
  return (
    <BlogContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
export default BlogContextWrapper;
