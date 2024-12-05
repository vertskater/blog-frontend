import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "./useAuth.tsx";
import { useNavigate } from "react-router-dom";
import useApiKeys from "./useApiKeys.tsx";

import "../styles/AddComment.css";

export default function AddComment({ postId }: { postId: number }) {
  const [comment, setComment] = useState<string>("");
  const { jwt } = useAuth();
  const { apiKeys, getApiKeys } = useApiKeys();
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getApiKeys();
  }, [getApiKeys]);

  const handleValueChange = (value: string) => {
    setComment(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const keys = apiKeys.filter(
      (key) => key.status === "ACTIVE" && key.usageCount < 1001
    );
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": keys[0]?.key,
        Authorization: `${jwt}`,
      },
      body: JSON.stringify({ comment }),
    };
    const response = await fetch(
      `https://blog-api-production-2436.up.railway.app/blog/post/comment/${postId}`,
      options
    );
    if (!response.ok) {
      return setError(
        new Error("could not save new Comment, please try again")
      );
    }
    setComment("");
    navigate("/blog");
  };
  return (
    <>
      <div className="error">{error?.message}</div>
      <form className="add-comment" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="comment" className="comment-label">
          Add a Comment
        </label>
        <textarea
          name="comment"
          id="comment"
          className="comment-textarea"
          rows={10}
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => handleValueChange(e.target.value)}
        ></textarea>
        <button type="submit" className="comment-submit">
          Post Comment
        </button>
      </form>
    </>
  );
}
