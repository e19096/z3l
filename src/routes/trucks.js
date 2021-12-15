import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../constants';

export default function Trucks() {
  const [trucks, setTrucks] = useState([]);
  const [startDt, setStartDt] = useState('');
  const [endDt, setEndDt] = useState('');

  const fetchTrucks = (e) => {
    e.preventDefault();
    const query_params = new URLSearchParams({
      start_dt: new Date(startDt).toISOString(),
      end_dt: new Date(endDt).toISOString(),
    }).toString()

    fetch(`${BASE_URL}/trucks?${query_params}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        setTrucks(data.data || []); // TODO collapse by truck name
      })
      .catch((error) => {
        console.error('Error:', error); // TODO
      });
  };

  const reserveTruck = (e) => {
    const truckId = e.target.dataset.truckId;
    const query_params = new URLSearchParams({
      truck_id: truckId,
      start_dt: new Date(startDt).toISOString(),
      end_dt: new Date(endDt).toISOString(),
    }).toString()

    fetch(`${BASE_URL}/reservations?${query_params}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('userToken'),
      },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        alert(data.data);
        setTrucks([]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <main style={{ padding: "1rem 0" }}>
      <form>
        <div>
          <label>
            pick up: <input
              name="start_dt"
              type="datetime-local"
              value={startDt}
              onChange={(e) => setStartDt(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            drop off: <input
              name="end_dt"
              type="datetime-local"
              value={endDt}
              onChange={(e) => setEndDt(e.target.value)}
            />
          </label>
        </div>
        <button onClick={fetchTrucks}>See available trucks</button>
      </form>
      <TruckList trucks={trucks} handleClick={reserveTruck} />
      <ReservationsButton />
    </main>
  );
}

function TruckList({ trucks, handleClick }) {
  return (
    <div>
      {trucks.length > 0 && (
        <>
          <h2>Trucks</h2>
          {trucks.map(
            ([id, name]) => (<TruckItem key={id} id={id} name={name} handleClick={handleClick} />)
          )}
        </ >
      )}
    </div>
  );
}

function TruckItem({ id, name, handleClick }) {
  return (
    <div className="truck-info-container" style={{ padding: "1rem 0" }}>
      <div>{id}</div>
      <div>{name}</div>
      <button data-truck-id={id} onClick={handleClick}>reserve this truck</button>
    </div>
  );
}

function ReservationsButton() {
  let navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/reservations")} style={{ margin: "1rem 0" }}>
        See my reservations
      </button>
    </div>
  );
}

// TODO redux/middleware
// TODO error handling/user friendly msging/loading, empty states
// TODO validate params before calling api
