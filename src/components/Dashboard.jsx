import React from 'react';
import StatCard from './StatCard';
import SystemStatus from './SystemStatus';
import EnergySourceChart from './EnergySourceChart';
import PowerGenerationChart from './PowerGenerationChart';
import { Zap, Sun, Wind, ChevronDown } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Power Generation Overview</h2>
        <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
          <span className="text-sm text-gray-600">All Systems</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Generation"
          value="1,247"
          unit="MW"
          change="+8.3%"
          isPositive={true}
          icon={<Zap className="w-5 h-5" />}
        />
        <StatCard
          title="Solar Power"
          value="812"
          unit="MW"
          change="+12.1%"
          isPositive={true}
          icon={<Sun className="w-5 h-5" />}
        />
        <StatCard
          title="Wind Power"
          value="435"
          unit="MW"
          change="+5.7%"
          isPositive={true}
          icon={<Wind className="w-5 h-5" />}
        />
        <SystemStatus />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergySourceChart />
        <PowerGenerationChart />
      </div>
    </div>
  );
};

export default Dashboard;


