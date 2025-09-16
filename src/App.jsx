import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Locations from './components/Locations'
import Performance from './components/Performance'
import Consumption from './components/Consumption'
import './App.css'

function Placeholder({ title, message }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  // derive active section from path (default to dashboard)
  const raw = location.pathname.replace(/^\/+/, '')
  const activeSection = raw === '' ? 'dashboard' : raw.split('/')[0]

  const handleSectionChange = (section) => {
    // navigate to the correct route; keep dashboard at "/dashboard"
    const path = section === 'dashboard' ? '/dashboard' : `/${section}`
    navigate(path)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/consumption" element={<Consumption />} />
            <Route path="/system" element={<Placeholder title="System Management" message="System management tools coming soon..." />} />
            <Route path="/energy-balance" element={<Placeholder title="Energy Balance" message="Energy balance analysis coming soon..." />} />
            <Route path="/guide" element={<Placeholder title="User Guide" message="User guide and documentation coming soon..." />} />
            <Route path="/settings" element={<Placeholder title="Settings" message="Application settings coming soon..." />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
