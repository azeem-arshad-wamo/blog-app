import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Posts({ userComments, setUserActivity }) {
  const navigate = useNavigate();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  function handleClick(id) {
    navigate(`/posts/${id}`);
  }

  function handleEdit(comment) {
    setEditingCommentId(comment.id);
    setEditedText(comment.body);
  }

  function saveEdit(commentId) {
    const updatedComments = userComments.map((comment) =>
      comment.id === commentId ? { ...comment, body: editedText } : comment
    );

    setUserActivity((prev) => ({
      ...prev,
      comments: updatedComments,
    }));

    setEditingCommentId(null);
    setEditedText("");
  }

  function handleDelete(commentId) {
    const updatedComments = userComments.filter(
      (comment) => comment.id != commentId
    );
    setUserActivity((prev) => ({
      ...prev,
      comments: updatedComments,
    }));
  }

  return (
    <>
      <div id="dashCommentContainer">
        <div>
          <h1>User Comments</h1>
        </div>
        <div>
          {userComments && userComments.length > 0 ? (
            userComments.map((comment) => (
              <div
                onClick={() => handleClick(comment.postId)}
                className="dashComment"
                key={`${comment.postId}-${comment.id}`}
              >
                <div>
                  <p>
                    <b>Post Id: </b>
                    {comment.postId}
                  </p>
                </div>
                <div>
                  {editingCommentId === comment.id ? (
                    <div
                      className="commentEditDiv"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        <input
                          value={editedText}
                          className="commentEditInput"
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                      </div>
                      <div>
                        <button
                          className="commentEditButton"
                          onClick={() => saveEdit(comment.id)}
                        >
                          Save
                        </button>
                        <button
                          className="commentEditButton"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{comment.body}</p>
                  )}
                </div>

                <div className="iconDiv">
                  <FiEdit
                    size={20}
                    className="editIcon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(comment);
                    }}
                  />
                  <FiTrash2
                    size={20}
                    className="deleteIcon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(comment.id);
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <h2>There are no comments</h2>
          )}
        </div>
      </div>
    </>
  );
}
