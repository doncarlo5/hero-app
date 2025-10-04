import { Route, Routes, Link } from "react-router-dom";
import UsersPage from "./pages/Users";
import SessionsPage from "./pages/Sessions";

function App() {
  return (
    <div className="p-4 space-y-4">
      <nav className="flex gap-4">
        <Link to="/users" className="text-blue-500">Users</Link>
        <Link to="/sessions" className="text-blue-500">Sessions</Link>
      </nav>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="*" element={<UsersPage />} />
      </Routes>
    </div>
  );
}

export default App;
