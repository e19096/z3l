import React from 'react';
import { useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { BASE_URL } from '../constants';

class Trucks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start_dt: '',
      end_dt: '',
      start_dt_iso: '',
      end_dt_iso: '',
      trucks: [],
    };
  }

  fetchTrucks = () => {
    const { start_dt_iso, end_dt_iso } = this.state;
    const query_params = new URLSearchParams({
      start_dt: start_dt_iso,
      end_dt: end_dt_iso,
    }).toString()

    fetch(`${BASE_URL}/trucks?${query_params}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        this.setState({ trucks: data.data || [] }); // TODO collapse by truck name
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleChange = (e) => {
    const dt_iso = new Date(e.target.value).toISOString();
    this.setState({
      [e.target.name]: e.target.value,
      [`${e.target.name}_iso`]: dt_iso,
    });
  }

  reserveTruck = (e) => {
    const truckId = e.target.dataset.truckId;
    const { start_dt_iso, end_dt_iso } = this.state;
    const query_params = new URLSearchParams({
      truck_id: truckId,
      start_dt: start_dt_iso,
      end_dt: end_dt_iso,
    }).toString()

    fetch(`${BASE_URL}/reservations?${query_params}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('user'),
      },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        alert(data.data);
        this.setState({ trucks: [] });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <div>
          <label>
            pick up: <input
              name="start_dt"
              type="datetime-local"
              value={this.state.start_dt}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            drop off: <input
              name="end_dt"
              type="datetime-local"
              value={this.state.end_dt}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button onClick={this.fetchTrucks}>See available trucks</button>
        {this.state.trucks.length > 0 && (
          <div>
            <h2>Trucks</h2>
            {this.state.trucks.map(
              ([id, name]) => (<Truck key={id} id={id} name={name} handleClick={this.reserveTruck} />)
            )}
          </div>
        )}
        <div>
          <ReservationsButton />
        </div>
      </main>
    );
  }
}

function Truck({ id, name, handleClick }) {
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
    <button onClick={() => navigate("/reservations")} style={{ margin: "1rem 0" }}>
      See my reservations
    </button>
  );
}

export default Trucks;

// TODO redux/middleware
// TODO error handling/user friendly msging/loading, empty states
// TODO validate params before calling api
