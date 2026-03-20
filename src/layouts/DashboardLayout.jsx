import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin_components/Sidebar';

/**
 * DashboardLayout
 *
 * Admin-only layout — no public Navbar/Footer.
 * Sidebar on the left, <Outlet /> renders the matched child route on the right.
 *
 * Routes should be nested under /admin in App.jsx:
 *
 *   <Route path="/admin" element={<DashboardLayout />}>
 *     <Route index element={<Overview />} />
 *     <Route path="applications" element={<Applications />} />
 *     ...
 *   </Route>
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">

      {/* ── Sidebar ── */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Content area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-sm shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-800 transition"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-gray-800 text-sm">Admin Panel</span>
        </header>

        {/* Page content — child routes render here */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
