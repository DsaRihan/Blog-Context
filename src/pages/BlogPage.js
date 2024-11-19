import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import BlogDetails from '../components/BlogDetails'

const BlogPage = () => {
    const [blog,setblog]=useState(null);
    const [relatedblog,setrelatedblog]=useState([]);
    const location=useLocation();
    const navigate=useNavigate();
    const blogId=location.pathname.split('/').at(-1);

    const {loading,setLoading}=useContext(AppContext);

    async function fetchrelatedblogs(){
        setLoading(true);
        let url=`${baseUrl}?blogId=${blogId}`
        try{
            const res=await fetch(url)
            const data=await res.json();
            setblog(data.blog)
            setrelatedblog(data.relatedblog)
        }
        catch(e){
            console.log("error occured")
            setblog(null)
            relatedblog([])
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(blogId){
            fetchrelatedblogs();
        }
    },[location.pathname])

  return (

    <div>
      <Header/>
      <div><button onClick={()=> navigate(-1)}>Back</button></div>
      {
        loading ? <p>loading</p> :
        blog ? (<div>
            <BlogDetails post={blog}/>
            <h2>Related Blogs</h2>
            {
                relatedblog.map((post)=>(
                    <div key={post.id}><BlogDetails post={post}/></div>
                ))
            }
            </div>) :
        (<p>No Blog Found</p>)
      }
    </div>
  )
}

export default BlogPage
