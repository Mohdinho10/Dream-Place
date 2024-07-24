import ClipLoader from "react-spinners/ClipLoader";
import Chat from "../components/Chat";
import List from "../components/List";
import Loader from "../components/Loader";
import { useLogout } from "../hooks/useLogout";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useProfilePost } from "../hooks/useProfilePost";
import "./ProfilePage.scss";
import { useGetChats } from "../hooks/useGetChats";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";

function ProfilePage() {
  const { logout, isLogout } = useLogout();
  const { user } = useUser();
  const { isPending, profilePosts } = useProfilePost();
  const { isPending: isLoadingChats, chats, refetch } = useGetChats();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", () => {
        // Refetch chats when a new message is received
        refetch();
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, refetch]);

  return (
    <>
      {isPending && <Loader />}
      {!isPending && (
        <div className="profile-page">
          <div className="details">
            <div className="wrapper">
              <div className="title">
                <h1>User Information</h1>
                <Link to="/profile/update">
                  <button>Update Profile</button>
                </Link>
              </div>
              <div className="info">
                <span>
                  Avatar:
                  <img src={user.avatar || "/avatar.png"} alt="avatar" />
                </span>
                <span>
                  Username: <b>{user.username}</b>
                </span>
                <span>
                  E-mail: <b>{user.email}</b>
                </span>
                <button onClick={logout} disabled={isLogout}>
                  {isLogout ? <ClipLoader color="white" size={20} /> : "Logout"}
                </button>
              </div>
              <div className="title">
                <h1>My List</h1>
                <Link to="/addPost">
                  <button>Create New Post</button>
                </Link>
              </div>
              {<List posts={profilePosts?.userPosts} />}
              <div className="title">
                <h1>Saved List</h1>
              </div>
              {<List posts={profilePosts?.savedPosts} />}
            </div>
          </div>
          <div className="chat-container">
            <div className="wrapper">
              {!isLoadingChats && <Chat chats={chats} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
