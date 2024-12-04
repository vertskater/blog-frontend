import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Post from "../Classes/Post.tsx";
import { useAuth } from "../useAuth.tsx";
import "../../styles/Posts.css";

export default function Posts() {
  const { jwt } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const data = useLoaderData() as {
    success: boolean;
    posts: Post[];
    msg: string;
  };
  const [posts, setPosts] = useState<Post[]>(data.posts);

  useEffect(() => {
    setPosts(data.posts);
  }, [data.posts]);

  const handlePublish = async (
    e: React.MouseEvent<HTMLButtonElement>,
    post: Post
  ) => {
    e.preventDefault();
    const status = !post.published;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
      body: JSON.stringify({ postId: post.id, isPublished: status }),
    };

    const response = await fetch(
      "https://blog-api-production-2436.up.railway.app/admin/post/published",
      options
    );

    if (response.ok) {
      setPosts((prevPosts: Post[]): Post[] =>
        prevPosts.map(
          (p: Post): Post =>
            p.id === post.id ? ({ ...p, published: status } as Post) : p
        )
      );

      setSuccess("Status successfully changes");
      setError(null);
    } else {
      const error = await response.json();
      setError(new Error(error.msg));
      setSuccess("");
    }
  };

  return (
    <>
      <h2>Posts</h2>
      <p>{error?.message}</p>
      <p>{success}</p>
      <button
        className="create-new"
        onClick={() => navigate("/admin/posts/new")}
      >
        Create new Post
      </button>
      <div className="table-container">
        <table className="posts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Published</th>
              <th>Author ID</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: Post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  {post.published ? "Yes" : "No"}
                  <button onClick={(e) => handlePublish(e, post)}>
                    {post.published ? "unpublish" : "publish"}
                  </button>
                </td>
                <td>{post.authorId}</td>
                <td>{new Date(post.createdAt).toLocaleString()}</td>
                <td>
                  {post.updatedAt
                    ? new Date(post.updatedAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
