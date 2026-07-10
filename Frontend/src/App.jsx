import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    number: "",
    email: "",
    gender: "",
  });

  // Sare users store karne ke liye
  const [users, setUsers] = useState([]);

  // Update ke liye id
  const [editId, setEditId] = useState(null);

  // ================= GET =================
  const getUsers = async () => {
    try {
      const res = await axios.get("https://ui-ux-78lx.onrender.com/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getUsers();
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE & UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `https://ui-ux-78lx.onrender.com/api/users${editId}`,
          formData
        );
        alert("User updated successfully");
        setEditId(null);
      } else {
        // CREATE
        await axios.post(
          "https://ui-ux-78lx.onrender.com/api/users",
          formData
        );
        alert("User created successfully");
      }

      // Form reset
      setFormData({
        name: "",
        password: "",
        number: "",
        email: "",
        gender: "",
      });

      getUsers();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // ================= DELETE =================
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://ui-ux-78lx.onrender.com/api/users${id}`);
      alert("User deleted successfully");
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const editUser = (user) => {
    setFormData({
      name: user.name,
      password: user.password,
      number: user.number,
      email: user.email,
      gender: user.gender,
    });

    setEditId(user._id);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-md mx-auto bg-slate-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl text-white text-center font-bold">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="text"
            name="number"
            placeholder="Enter Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-black p-3 rounded"
          >
            {editId ? "Update User" : "Create User"}
          </button>
        </form>
      </div>

      {/* ================= READ (GET) ================= */}
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-white text-2xl mb-4">All Users</h2>

        {users.map((user) => (
          <div
            key={user._id}
            className="bg-slate-800 text-white p-4 rounded-lg mb-4"
          >
            <p><b>Name:</b> {user.name}</p>
            <p><b>Password:</b> {user.password}</p>
            <p><b>Number:</b> {user.number}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Gender:</b> {user.gender}</p>

            <div className="mt-3 space-x-3">
              {/* UPDATE button */}
              <button
                onClick={() => editUser(user)}
                className="bg-yellow-500 text-black px-4 py-2 rounded"
              >
                Edit
              </button>

              {/* DELETE button */}
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}