import React from 'react';
import { Activity, Users, TrendingUp, PieChart, Settings, LogOut, Grid, RefreshCcw, ChevronDown } from 'lucide-react';
import { Outlet } from "react-router"
import {  Link, useLocation } from 'react-router-dom';

const Layout = ({children }) => {
    const location = useLocation();
    
    const navItems = [
      { icon: Grid, label: "Overview", path: "" },
      { icon: Activity, label: "Analytics", path: "analytics" },
      { icon: PieChart, label: "Reports", path: "reports" },
      { icon: Settings, label: "Settings", path: "settings" }
    ];
  
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold">SocialMetrics</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item, i) => (
              <Link 
                key={i}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
                  item.active ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                }`}
                to={`${item.path}`} 
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-6 left-6">
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800/50 rounded-lg">
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </div>
    
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Social Media Dashboard</h1>
                <p className="text-gray-500">View and analyze your social media performance</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                  <RefreshCcw size={20} />
                  <span>Refresh</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white">
                  <span>Last 30 Days</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
            
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
 
export default Layout;