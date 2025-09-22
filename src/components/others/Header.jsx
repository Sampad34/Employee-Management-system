import { useEffect, useState } from "react";

// Header component receives props from parent: App.jsx
const Header = (props) => {
  const { changeUser, userData, role } = props;

  // State to store the display name (either Admin or Employee first name)
  const [username, setUsername] = useState("");

  // When userData or role changes, update the username display
  useEffect(() => {
    if (role === "admin") {
      setUsername("Admin");
    } else if (role === "employee" && userData) {
      setUsername(userData.firstName || "Employee"); // fallback if no name
    } else {
      setUsername("");
    }
  }, [userData, role]);

  // Function to log out user
  const logOutUser = () => {
    // Clear local storage
    localStorage.setItem("loggedInUser", "");

    // Reset user in parent App component
    changeUser(null);

    // Optional: force reload if needed
    // window.location.reload();
  };

  // Render the header
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg ">
      {/* Welcome message */}
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-medium">Welcome</h1>
        <span className="text-2xl sm:text-3xl font-semibold block mt-1">
          {username} 👋
        </span>
      </div>

      {/* Logout button */}
      <button
        onClick={logOutUser}
        className="bg-blue-400 text-blue-600 hover:text-white hover:bg-blue-600 font-semibold px-6 py-2 rounded-full border-none outline-none cursor-pointer shadow-md transition-all duration-300 ease-in-out"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
