import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {


                const res = await axios.get(`${BASE_URL}/api/blogs/${id}`);
                setBlog(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog details:", err);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="py-20 text-center font-bold">Loading Story...</div>;
    if (!blog) return <div className="py-20 text-center font-bold">Blog not found!</div>;

    return (
        <main className="bg-white min-h-screen">
            {/* Header Section */}
            <section className="py-20 bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-6 lg:px-20 max-w-5xl text-center">
                    <Link to="/blog" className="text-orange-500 font-black text-xs uppercase tracking-widest mb-8 inline-block hover:gap-3 transition-all">
                        ← Back to Blogs
                    </Link>
                    <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-slate-400 text-sm font-bold uppercase tracking-tighter">
                        <span>By Admin</span>
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 container mx-auto px-6 lg:px-20 max-w-5xl">
                {/* Full Image */}
                <div className="rounded-[40px] overflow-hidden shadow-2xl mb-16 h-[500px]">
                    <img
                        src={`${BASE_URL}/Uploads/Blog/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed font-medium italic">

                    <p className="mb-8">{blog.content}</p>
                </div>
            </section>
        </main>
    );
};

export default BlogDetails;