import * as React from 'react';
import { useEffect } from 'react';
import { useBlogSlice } from './slice';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog, isBlogLoading } from './slice/selectors';

export const BlogOverviewCard = () => {
  const dispatch = useDispatch();
  const { actions } = useBlogSlice();
  const params: any = useParams();
  const { blog_id } = params;

  const blog = useSelector(getBlog);
  const loading = useSelector(isBlogLoading);

  useEffect(() => {
    dispatch(actions.loadBlog({ id: blog_id }));
  }, [blog_id]);

  if (loading || !blog) return <>Loading...</>;

  return (
    <>
      <div className="ml-32 max-w-7xl py-12 px-10">

        <h1 className="text-4xl font-semibold text-slate-700 mb-10">
          {blog.name} Dashboard
        </h1>

        {/* BLOG CARD */}
        <div className="bg-white rounded-xl shadow-md p-8 flex items-center space-x-6">

          <img
            className="w-32 h-32 rounded-lg object-cover"
            src={blog.logo_url}
            alt={blog.name}
          />

          <div>

            <h2 className="text-3xl font-bold text-slate-800">
              {blog.name}
            </h2>

            <p className="text-slate-500 mt-2">
              {blog.description}
            </p>

            <p className="text-sm text-slate-400 mt-2">
              Created: {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-5 flex space-x-4">

              <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full">
                Manage Blog
              </button>

              <Link to={`${window.location.pathname}/posts`}>
                <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-full">
                  Posts
                </button>
              </Link>

              <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-full">
                Settings
              </button>

            </div>
          </div>
        </div>

        {/* BLOG META */}
        <div className="grid grid-cols-3 gap-6 mt-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-slate-500 text-sm">Blog ID</h3>
            <p className="text-2xl font-semibold text-slate-700">
              {blog.id}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-slate-500 text-sm">Theme</h3>
            <p className="text-2xl font-semibold text-slate-700">
              {blog.BlogThemeId}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-slate-500 text-sm">Category</h3>
            <p className="text-2xl font-semibold text-slate-700">
              {blog.BlogCategoryId}
            </p>
          </div>

        </div>

      </div>
    </>
  );
};