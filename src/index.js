import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
// import Login from "./routes/login";
import Trucks from "./routes/trucks";
import Reservations from "./routes/reservations";
import './index.css';

import Amplify from 'aws-amplify';
Amplify.configure({
  Auth: {
    userPoolId: 'us-east-2_OfO9zaVMY',
    region: 'us-east-2',
    userPoolWebClientId: '28427m4ef9sv96kd3gatpdhsmo', // TODO env vars
  }
});

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/trucks" element={<Trucks />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p></p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
