import { useState } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApiKey from "./Classes/ApiKey.tsx";
import "../styles/CreatePost.css";

export default function CreatePost({
  jwt,
  apiKeys,
}: {
  jwt: string | null;
  apiKeys: ApiKey[];
}) {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleSavePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keys = apiKeys.filter(
      (key) => key.status === "ACTIVE" && key.usageCount < 1001
    );
    if (keys.length === 0)
      return setError(
        new Error("no active api key found or usage limit exhausted")
      );
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": keys[0]?.key,
        Authorization: `${jwt}`,
      },
      body: JSON.stringify({ title, message }),
    };

    const response = await fetch(
      "https://blog-api-production-2436.up.railway.app/admin/post",
      options
    );
    if (response.ok) return navigate("/admin/posts");
    const errorMsg = await response.json();
    setError(new Error(errorMsg.msg));
  };

  return (
    <form className="create-post-form" onSubmit={(e) => handleSavePost(e)}>
      <h3>Create New Post</h3>
      <p style={{ color: "red" }}>{(error as Error)?.message}</p>
      <div className="form-group">
        <label htmlFor="title">Post Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter the title of your post"
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Text</label>
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={10}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Write your post content here..."
        />
      </div>
      <div className="form-actions">
        <input type="submit" value="Save Post" />
      </div>
    </form>
  );
}
