import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import Trucks from "./routes/trucks";
import Reservations from "./routes/reservations";
import './index.css';

// const rootElement = document.getElementById("root");
// render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="trucks" element={<Trucks />} />
//       <Route path="reservations" element={<Reservations />} />
//     </Routes>
//   </BrowserRouter>,
//   rootElement
// );

// import Amplify from 'aws-amplify';
// Amplify.configure({
//   Auth: {
//     userPoolId: 'XX-XXXXX_XXXXXX', //UserPool ID
//     region: 'XXXXXX',
//     userPoolWebClientId: 'XXXXXXXXXXXXXXX' //WebClientId
//   }
// });

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="trucks" element={<Trucks />} />
        <Route path="reservations" element={<Reservations />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
