import { useEffect, useState } from "react";
import Post from "./Classes/Post.tsx";
import { useLoaderData } from "react-router-dom";
import Comment from "./Classes/Comment.tsx";

import "../styles/Blog.css";

export default function Blog() {
  /* const { apiKeys, getApiKeys } = useApiKeys();
  const { jwt } = useAuth();*/
  const data = useLoaderData() as {
    success: boolean;
    posts: Post[];
    msg: string;
  };
  const [posts, setPosts] = useState<Post[] | []>([]);

  useEffect(() => {
    setPosts(data.posts?.filter((post) => post.published));
    /* (async () => {
      await getApiKeys();
    })();*/
  }, [data]);

  return (
    <>
      <h1 className="blog-title">Blog</h1>
      {posts?.map((post) => {
        return (
          <aside key={post.id} className="post-container">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            {post.comments.length > 0 && (
              <>
                <h3 className="comments-title">Comments</h3>
                <div className="comments-container">
                  {post.comments?.map((comment: Comment) => {
                    return (
                      <span key={comment.id} className="comment">
                        {comment.content}
                      </span>
                    );
                  })}
                </div>
              </>
            )}
          </aside>
        );
      })}
    </>
  );
}
