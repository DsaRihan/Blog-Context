import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Home from "./components/Header";
import BlogPage from "./components/Blogs";
import TagPage from "./components/Pagination";
import CataegoryPage from "./components/Pagination";  
import { Route, Routes, useLocation } from "react-router-dom";


export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);
  const [searchparams,setsearchparams]=searchparams();
  const location=useLocation();


  useEffect(() => {
    const page= searchparams.get("page") ?? 1;
    if(location.pathname.includes("tags")){
      // to show tags page
      const tag=location.pathname.split("/").at(-1).replaceAll("-","");
      fetchBlogPosts(Number(page),tag);
    }
    else if(location.pathname.includes("category")){
      const category=location.pathname.split("/").at(-1).replaceAll("-","");
      fetchBlogPosts(Number(page),category)
    } 
    else {
      fetchBlogPosts(Number(page))
    }
  }, [location.pathname,location.search]);

  return (
   <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blog/:blogid" element={<BlogPage/>}/>
      <Route path="/tags/:tag" element={<TagPage/>}/>
      <Route path="/categories/:category" element={<CataegoryPage/>}/>
   </Routes>
  );
}
