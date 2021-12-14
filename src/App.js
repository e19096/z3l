import './App.css';
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        hello welcome
      </header>
      <nav
        style={{
          borderBottom: "solid 1px",
          padding: "1rem 0"
        }}
      >
        <Link to="/trucks">trucks</Link> |{" "}
        <Link to="/reservations">reservations</Link>
      </nav>
      <Outlet />
    </div>
  );
}
