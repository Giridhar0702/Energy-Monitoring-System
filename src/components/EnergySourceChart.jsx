import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EnergySourceChart = () => {
  const data = {
    labels: ['Solar', 'Wind'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#F59E0B', '#3B82F6'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Energy Source Distribution</h3>
      
      <div className="relative h-48 mb-6">
        <Doughnut data={data} options={options} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Solar</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">65%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Wind</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">35%</span>
        </div>
      </div>
    </div>
  );
};

export default EnergySourceChart;


