import React from 'react'

const BlogDetails = ({post}) => {
  return (
    <div>
       <div key={post.id} className="w-11/12 max-w-2xl mx-auto">
            <p className="font-bold text-lg">{post.title}</p>
            <p className="text-sm my-1">
              By <span className="italic">{post.author}</span> on{" "}
              <span className="font-semibold underline cursor-pointer">{post.category}</span>
            </p>
            <p className="text-sm">Posted On {post.date}</p>
            <p className="mt-4 mb-2">{post.content}</p>
            <div className="flex flex-wrap gap-x-2 items-center">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold underline text-blue-700 cursor-pointer">{`#${tag}`}</span>
              ))}
            </div>
          </div>
    </div>
  )
}

export default BlogDetails