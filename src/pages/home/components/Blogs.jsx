import { useNavigate } from "react-router-dom";

export default function Blogs({ blogs }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/posts/${id}`);
  }

  return (
    <>
      {blogs ? (
        <div id="blogGrid">
          {blogs.map((current) => (
            <div
              key={current.id}
              onClick={() => handleClick(current.id)}
              className="blogPost"
            >
              <div className="blogTitle">
                <h4>{current.title}</h4>
              </div>
              <div>
                <p>{current.body}</p>
              </div>
              <div>
                <p>User ID: {current.userId}</p>
                <p>Post ID: {current.id}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Nothing to show here</h1>
      )}
    </>
  );
}
