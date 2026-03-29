import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");

    navigate("/login");
  };

  return <button className="Logout-Button" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;