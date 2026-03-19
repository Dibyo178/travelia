import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/blogs').then(res => setBlogs(res.data));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
            {blogs.map(blog => (
                <div key={blog.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                    <div className="p-5">
                        <h3 className="font-bold text-xl text-slate-900">{blog.title}</h3>
                        <p className="text-slate-500 text-sm mt-2">{blog.content.substring(0, 100)}...</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default BlogList;