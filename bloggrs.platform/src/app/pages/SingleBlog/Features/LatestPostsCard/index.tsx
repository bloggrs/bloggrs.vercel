import * as React from 'react';
import { useEffect } from 'react';
import { usePostsSlice } from './slice';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, isPostsLoading } from './slice/selectors';

export const LatestPostsCard = () => {
  const dispatch = useDispatch();
  const { actions } = usePostsSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const posts = useSelector(getPosts);
  const loading = useSelector(isPostsLoading);
  useEffect(() => {
    dispatch(actions.loadPosts({ id: blog_id, pageSize: 3 }));
  }, []);
  if (loading) return <>'Loading...'</>;
  return <>
  {/* POSTS */}
<div className="mt-14">

<h2 className="text-2xl font-semibold text-slate-700 mb-6">
Recent Posts
</h2>

<div className="grid grid-cols-3 gap-6">

{posts?.map((post: any) => (
<div
key={post.id}
className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
>

<h3 className="text-lg font-bold text-slate-800 mb-2">
{post.title}
</h3>

<p
className="text-slate-500 text-sm mb-4"
dangerouslySetInnerHTML={{ __html: post.html_content }}
/>

<div className="flex justify-between text-sm text-slate-400">

<span>
{new Date(post.createdAt).toLocaleDateString()}
</span>

<span>
{post.status}
</span>

</div>

<div className="flex justify-between mt-4 text-sm">

<span>👍 {post.meta.likes_count}</span>

<span>💬 {post.meta.comments_count}</span>

<Link
to={`/posts/${post.slug}`}
className="text-orange-500 hover:underline"
>
Read
</Link>

</div>

</div>
))}

</div>

</div></>
};
