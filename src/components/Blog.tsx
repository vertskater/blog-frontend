import { useEffect, useState } from "react";
import Post from "./Classes/Post.tsx";
import { useLoaderData } from "react-router-dom";
import Comment from "./Classes/Comment.tsx";
import AddComment from "./AddComment.tsx";

import "../styles/Blog.css";

export default function Blog() {
  const data = useLoaderData() as {
    success: boolean;
    posts: Post[];
    msg: string;
  };
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);

  useEffect(() => {
    setPosts(data.posts?.filter((post) => post.published));
  }, [data]);

  const showAddComment = (postId: number) => {
    setIsVisible(true);
    setPostId(postId);
  };
  const handleClose = () => {
    setIsVisible(false);
    setPostId(0);
  };

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
            <button
              className="create-new-comment"
              onClick={() => showAddComment(post.id)}
            >
              Add Comment
            </button>
            {isVisible && postId === post.id && (
              <span className="close-comment" onClick={() => handleClose()}>
                close
              </span>
            )}
            {isVisible && postId === post.id && <AddComment postId={postId} />}
          </aside>
        );
      })}
    </>
  );
}
