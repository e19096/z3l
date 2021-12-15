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
        <Link to="/trucks" state={{ userToken: user.signInUserSession.idToken.jwtToken }}>
          trucks
        </Link> |{" "}
        <Link to="/reservations" state={{ userToken: user.signInUserSession.idToken.jwtToken }}>
          reservations
        </Link> |{" "}
        <button onClick={signOut}>Sign out</button>
      </nav>
      <Outlet />
    </div>
  )

//   return (
//     <Authenticator loginMechanisms={['email']}>
//       {({ signOut, user }) => (
//         <main>
//           <h1>Hello {user.username}</h1>
//           <button onClick={signOut}>Sign out</button>
//         </main>
//       )}
//       <div className="App">
//         <header className="App-header">
//           hello welcome
//         </header>
//         <nav
//           style={{
//             borderBottom: "solid 1px",
//             padding: "1rem 0"
//           }}
//         >
//           <Link to="/trucks">trucks</Link> |{" "}
//           <Link to="/reservations">reservations</Link>
//         </nav>
//         <Outlet />
//       </div>
//     </Authenticator>
//   );
}

export default withAuthenticator(App);
