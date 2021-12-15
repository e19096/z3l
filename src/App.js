import './App.css';
import { Outlet, Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function App() {
  // const getCreds = async () => {
  //   var data = await Auth.currentSession();
  //   debugger
  //   localStorage.setItem('user', data.idToken.jwtToken);
  // }
  //
  // getCreds()

  return (
    <Authenticator loginMechanisms={['email']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
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
    </Authenticator>
  );
}

// export default withAuthenticator(App);

// export default function App() {
//   return (
//     <Authenticator loginMechanisms={['email']}>
//       {({ signOut, user }) => (
//         <main>
//           <h1>Hello {user.username}</h1>
//           <button onClick={signOut}>Sign out</button>
//         </main>
//       )}
//     </Authenticator>
//   );
// }
