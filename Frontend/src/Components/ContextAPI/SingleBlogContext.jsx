import { createContext, useContext, useState } from "react";

const SingleBlogContext = createContext();

const SingleBlogContextWrapper = ({ children }) => {
  const [singleBlogData, setSingleBlogData] = useState(null);
  return (
    <SingleBlogContext.Provider value={{ singleBlogData, setSingleBlogData }}>
      {children}
    </SingleBlogContext.Provider>
  );
};

export const useSingleBlogContext = () => useContext(SingleBlogContext);
export default SingleBlogContextWrapper;
