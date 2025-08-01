import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import UserContextWrapper from "./Components/ContextAPI/UserContext.jsx";
import BlogContextWrapper from "./Components/ContextAPI/BlogContext.jsx";
import SingleBlogContextWrapper from "./Components/ContextAPI/SingleBlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextWrapper>
        <BlogContextWrapper>
          <SingleBlogContextWrapper>
            <App />
          </SingleBlogContextWrapper>
        </BlogContextWrapper>
      </UserContextWrapper>
    </BrowserRouter>
  </StrictMode>
);
