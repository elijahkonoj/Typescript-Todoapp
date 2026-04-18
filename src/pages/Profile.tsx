import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;