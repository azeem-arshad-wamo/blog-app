export default function Posts({ userPosts }) {
  function handleClick(postId) {
    console.log(`Post Id: ${postId}`);
  }

  return (
    <>
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
                <p>
                  <b>{post.title}</b>
                </p>
                <p>{post.body}</p>
              </div>
            ))
          ) : (
            <h2>There are no posts</h2>
          )}
        </div>
      </div>
    </>
  );
}
