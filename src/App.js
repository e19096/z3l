import './App.css';
import { Outlet, Link } from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  localStorage.setItem('userToken', user.signInUserSession.idToken.jwtToken);

  return (
    <div className="App">
      <header className="App-header">
      hello welcome, {user.username}
      </header>
      <nav
        style={{
          borderBottom: "solid 1px",
          padding: "1rem 0"
        }}
      >
        <Link to="/trucks">
          trucks
        </Link> |{" "}
        <Link to="/reservations">
          reservations
        </Link> |{" "}
        <button onClick={signOut}>Sign out</button>
      </nav>
      <Outlet />
    </div>
  )
}

export default withAuthenticator(App);
