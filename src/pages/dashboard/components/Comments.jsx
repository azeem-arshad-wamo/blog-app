import { useNavigate } from "react-router-dom";

export default function Posts({ userComments }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/posts/${id}`);
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
                  <p>{comment.body}</p>
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
