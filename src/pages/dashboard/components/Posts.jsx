import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../../providers/PostProvider.jsx";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Posts({ userPosts, setUserActivity }) {
  const navigate = useNavigate();
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const { posts, setPosts } = useContext(PostContext);
  const [editedBody, setEditedBody] = useState("");

  function handleClick(postId) {
    navigate(`/posts/${postId}`);
  }

  function handleEdit(post) {
    setEditingPostId(post.id);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  }

  function saveEdit(postId) {
    const updatedPosts = userPosts.map((post) =>
      post.id === postId
        ? { ...post, title: editedTitle, body: editedBody }
        : post
    );

    setUserActivity((prev) => ({
      ...prev,
      posts: updatedPosts,
    }));

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, title: editedTitle, body: editedBody }
          : post
      )
    );

    setEditingPostId(null);
    setEditedTitle("");
    setEditedBody("");
  }

  function handleDelete(postId) {
    const updatedPosts = userPosts.filter((post) => post.id !== postId);

    setUserActivity((prev) => ({
      ...prev,
      posts: updatedPosts,
    }));

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }

  return (
    <div id="dashPostContainer">
      <div>
        <h1>User Posts</h1>
      </div>
      <div>
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div
              onClick={() => handleClick(post.id)}
              className="dashPost"
              key={post.id}
            >
              {editingPostId === post.id ? (
                <div
                  className="postEditDiv"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="postEditInput"
                      placeholder="Edit title"
                    />
                  </div>
                  <div>
                    <textarea
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      className="postEditInput"
                      placeholder="Edit body"
                    />
                  </div>
                  <div>
                    <button
                      className="postEditButton"
                      onClick={() => saveEdit(post.id)}
                    >
                      Save
                    </button>
                    <button
                      className="postEditButton"
                      onClick={() => setEditingPostId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <b>{post.title}</b>
                  </p>
                  <p>{post.body}</p>
                </div>
              )}

              <div className="iconDiv">
                <FiEdit
                  size={20}
                  className="editIcon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(post);
                  }}
                />
                <FiTrash2
                  size={20}
                  className="deleteIcon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <h2>There are no posts</h2>
        )}
      </div>
    </div>
  );
}
