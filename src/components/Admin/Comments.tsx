import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "../Classes/Post.tsx";
import Comment from "../Classes/Comment.tsx";
import "../../styles/Comments.css";

export default function Comments() {
  const data = useLoaderData() as {
    msg: string;
    posts: Post[];
    success: boolean;
  };

  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const comments = data.posts
      ?.map((post) => (post?.comments.length ? post?.comments : []))
      .flat();
    setComments(comments);
  }, [data.posts]);

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
          {comments?.map((comment) => (
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
