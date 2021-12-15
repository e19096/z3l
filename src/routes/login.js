import { Auth } from 'aws-amplify';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getToken = async () => {
    var data = await Auth.currentSession()
    localStorage.setItem('user', data.idToken.jwtToken);
  }

  const handleLogin = () => {
    Auth.signIn(email, password)
      .then((result) => {
        getToken()
      }).catch((err) => {
        console.log(err); // TODO
      })
  }

  // const handleLogout = () => {
  //   Auth.signOut()
  //     .then((result) => {
  //
  //     }).catch((err) => {
  //       console.log(err); // TODO
  //     })
  // }

  return (
    <form>
      <label>
        Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase().trim())} />
      </label>
      <label>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value.toLowerCase().trim())} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
