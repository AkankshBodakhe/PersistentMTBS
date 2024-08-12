import React from 'react';
import { Link } from 'react-router-dom';
 // Import CSS file for custom styling

const HeaderComponent = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-blue">
        <div className="container">
          <Link to="/admin-dashboard" className="navbar-brand">Admin Dashboard</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/list-theatre" className="nav-link">Theatres</Link>
              </li>
              <li className="nav-item">
                <Link to="/list-auditoriums" className="nav-link">Auditoriums</Link>
              </li>
              <li className="nav-item">
                <Link to="/list-movie" className="nav-link">Movies</Link>
              </li>
              <li className="nav-item">
                <Link to="/list-screening" className="nav-link">Screenings</Link>
              </li>
              <li className="nav-item">
                <Link to="/list-booking" className="nav-link">Bookings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;

