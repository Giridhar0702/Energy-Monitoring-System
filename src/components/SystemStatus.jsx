import React from 'react';
import { Shield, TrendingUp } from 'lucide-react';

const SystemStatus = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">System Status</h3>
        <Shield className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-2xl font-bold text-green-600">Active</span>
        </div>
        <p className="text-sm text-gray-500">active</p>
      </div>
      
      <div className="flex items-center space-x-1 text-sm">
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="text-green-600 font-medium">+18%</span>
      </div>
    </div>
  );
};

export default SystemStatus;


