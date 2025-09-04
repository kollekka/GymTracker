import React from 'react';
import { NavLink } from 'react-router-dom';

const linkBase = 'nav-link text-light px-0 sidebar-link position-relative';
const getLinkClass = ({ isActive }) => `${linkBase} ${isActive ? 'active' : ''}`;

function Sidebar({ onLogout }) {
  return (
    <aside className="col-12 col-md-3 col-lg-2 border-end bg-dark text-light p-3 d-flex flex-column min-vh-100">
      <h5 className="text-uppercase fw-bold mb-3">Gym Tracker</h5>
      <nav className="nav flex-column small sidebar-nav">
        <NavLink className={getLinkClass} to="/home">Dashboard</NavLink>
        <NavLink className={getLinkClass} to="/plans">Twoje Plany</NavLink>
        <NavLink className={getLinkClass} to="/history">Historia</NavLink>
        <NavLink className={getLinkClass} to="/progress">Progres</NavLink>
        <NavLink className={getLinkClass} to="/exercises">Biblioteka Ćwiczeń</NavLink>
      </nav>
      <div className="mt-auto pt-4">
        <div className='nav flex-column mb-5 sidebar-nav'>
          <div className="nav flex-column mb-5 sidebar-nav">
            <NavLink className={getLinkClass} to="/settings">Ustawienia</NavLink>
            <button className="btn btn-outline-light w-100 btn-sm" onClick={onLogout}>Wyloguj</button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

const styleId = 'sidebar-anim-styles';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const style = document.createElement('style');
  style.id = styleId;
  style.innerHTML = `
    .sidebar-nav .sidebar-link {position:relative;transition:color .3s ease, background .45s ease, opacity .3s ease; padding:.65rem 1rem; margin:.25rem 0; display:flex; justify-content:center; align-items:center; border-radius:.5rem; font-size:.95rem; font-weight:500; letter-spacing:.3px; opacity:.9; overflow:hidden; z-index:0;}
    .sidebar-nav .sidebar-link::before {content:''; position:absolute; inset:0; background:linear-gradient(90deg,rgba(34,139,230,0.0),rgba(34,139,230,0.18) 55%,rgba(34,139,230,0.0)); background-size:0% 100%; background-repeat:no-repeat; transition:background-size .6s cubic-bezier(.6,.05,.25,.95); z-index:-1;}
    .sidebar-nav .sidebar-link::after {content:''; position:absolute; inset:0; background:linear-gradient(90deg,#228be6,#1c7ed6,#1864ab); opacity:0; transition:opacity .5s ease; z-index:-2;}
    .sidebar-nav .sidebar-link:hover::before, .sidebar-nav .sidebar-link.active::before {background-size:100% 100%;}
    .sidebar-nav .sidebar-link:hover::after {opacity:.28;}
    .sidebar-nav .sidebar-link.active::after {opacity:.45;}
    .sidebar-nav .sidebar-link:hover {opacity:1; color:#fff !important;}
    .sidebar-nav .sidebar-link.active {color:#fff !important; font-weight:600; opacity:1;}
    .sidebar-nav .sidebar-link:focus {outline:none; box-shadow:0 0 0 .12rem rgba(34,139,230,.35);} 
    .sidebar-nav .sidebar-link:active {filter:brightness(.93);} 
  `;
  document.head.appendChild(style);
}
