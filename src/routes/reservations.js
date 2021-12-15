import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { BASE_URL } from '../constants';

export default function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/reservations`, {
      headers: {
        Authorization: localStorage.getItem('user'),
      }
    })
      .then(resp => resp.json())
      .then(data => {
        // TODO catch 401 here
        console.log(data.data);
        setReservations(data.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      }); // TODO
  }, [])

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>My Reservations</h2>
      {reservations && reservations.map(
        ([startDt, endDt, truckName, truckId]) => (
          <ReservationItem
            key={`${truckId}-${startDt}`}
            startDt={startDt}
            endDt={endDt}
            truckName={truckName}
          />
        )
      )}
      <TrucksButton />
    </main>
  );
}

function ReservationItem({ startDt, endDt, truckName }) {
  return (
    <div className="reservation-item-container" style={{ padding: "1rem 0" }}>
      <div>{truckName}</div>
      <div>{new Date(startDt).toLocaleString()}</div>
      <div>{new Date(endDt).toLocaleString()}</div>
    </div>
  );
}

function TrucksButton() {
  let navigate = useNavigate();

  return (
    <button onClick={() => navigate("/trucks")}>
      Find a truck
    </button>
  );
}
