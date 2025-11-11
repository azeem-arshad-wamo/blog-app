import { useContext } from "react";
import { UserActivityContext } from "../../providers/UserActivityProvider";
import Posts from "./components/Posts.jsx";
import Comments from "./components/Comments.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  const { UserActivity, setUserActivity } = useContext(UserActivityContext);

  return (
    <>
      <div id="dashboardContainer">
        <div>
          <Posts userPosts={UserActivity.posts} />
        </div>
        <div>
          <Comments userComments={UserActivity.comments} />
        </div>
      </div>
    </>
  );
}
