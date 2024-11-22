import ApiKey from "../Classes/ApiKey.tsx";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "../Classes/Post.tsx";
import "../../styles/Comments.css";
import Comment from "../Classes/Comment.tsx";

export async function loader(jwt: string | null, apiKeys: ApiKey[]) {
  const keys = apiKeys.filter(
    (key) => key.status === "ACTIVE" && key.usageCount < 1001
  );
  if (keys.length === 0)
    return { msg: "no active api key found or usage limit exhausted" };
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": keys[0]?.key,
      Authorization: `${jwt}`,
    },
  };
  const response = await fetch(
    "https://blog-api-production-2436.up.railway.app/admin/posts/comments",
    options
  );
  return await response.json();
}

export default function Comments() {
  const data = useLoaderData() as {
    msg: string;
    posts: Post;
    success: boolean;
  };
  console.log(data.posts);
  const [comments, setComments] = useState<Post[]>([]);
  useEffect(() => {
    setComments((data.posts as Post[]) || []);
  }, [data.posts?.comments]);
  return (
    <div className="table-container">
      <h2>Comments</h2>
      <table className="comments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Post ID</th>
            <th>Author ID</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.content}</td>
              <td>{comment.postId}</td>
              <td>{comment.authorId}</td>
              <td>{new Date(comment.createdAt).toLocaleString()}</td>
              <td>
                {comment.updatedAt
                  ? new Date(comment.updatedAt).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
