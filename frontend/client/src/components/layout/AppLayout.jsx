import React from 'react';
import Sidebar from './Sidebar';
import useAuth from '../../useAuth';

function AppLayout({ children }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container-fluid d-flex flex-column p-0 layout-viewport">
      <div className="row flex-grow-1 g-0 h-100 overflow-hidden">
        <Sidebar onLogout={handleLogout} />
        <main className="col-12 col-md-9 col-lg-10 p-4 bg-light d-flex flex-column overflow-auto main-scroll">
          {children}
        </main>
      </div>
      <footer className="border-top bg-white small text-center flex-shrink-0 footer-bar">
        &copy; {new Date().getFullYear()} Gym Tracker • <a href="#about">O projekcie</a>
      </footer>
    </div>
  );
}

export default AppLayout;
const layoutStyleId = 'layout-viewport-styles';
if (typeof document !== 'undefined' && !document.getElementById(layoutStyleId)) {
  const style = document.createElement('style');
  style.id = layoutStyleId;
  style.innerHTML = `
    .layout-viewport { height: 98vh; max-height: 98vh; }
    @media (max-height: 760px) { .layout-viewport { height: 95vh; max-height:95vh; } }
    .layout-viewport .main-scroll { scrollbar-width: thin; }
    .layout-viewport .main-scroll::-webkit-scrollbar { width: 8px; }
    .layout-viewport .main-scroll::-webkit-scrollbar-track { background: transparent; }
    .layout-viewport .main-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 4px; }
    .layout-viewport .main-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,.28); }
  .layout-viewport .footer-bar { font-size: 0.7rem; height:20px; display:flex; align-items:center; justify-content:center; line-height:1; padding:0; background:#fff; }
  @media (min-width: 992px) { .layout-viewport .footer-bar { font-size: 0.72rem; height:22px; } }
  `;
  document.head.appendChild(style);
}
