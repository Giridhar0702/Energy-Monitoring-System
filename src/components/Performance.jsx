import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrendingUp, Calendar, Zap } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Performance = () => {
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Energy Generated (GWh)',
        data: [85, 92, 105, 118, 135, 142, 138, 145, 128, 115, 98, 88],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const efficiencyData = {
    labels: ['Solar Farm 1', 'Solar Farm 2', 'Wind Farm 1', 'Wind Farm 2', 'Wind Farm 3'],
    datasets: [
      {
        label: 'Efficiency %',
        data: [94, 91, 87, 89, 85],
        backgroundColor: ['#F59E0B', '#F59E0B', '#3B82F6', '#3B82F6', '#3B82F6'],
        borderRadius: 8,
      },
    ],
  };

  const detailedMetrics = [
    {
      site: 'Solar Farm Alpha',
      type: 'Solar',
      currentOutput: '2.1 MW',
      efficiency: '96%',
      capacityFactor: '84%',
      status: 'Optimal'
    },
    {
      site: 'Wind Farm Beta',
      type: 'Wind',
      currentOutput: '2.8 MW',
      efficiency: '89%',
      capacityFactor: '91%',
      status: 'Optimal'
    },
    {
      site: 'Hybrid Station Gamma',
      type: 'Hybrid',
      currentOutput: '1.5 MW',
      efficiency: '72%',
      capacityFactor: '68%',
      status: 'Suboptimal'
    }
  ];

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Analytics</h2>
        <p className="text-gray-600">Track energy generation performance and efficiency metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Average Efficiency</h3>
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">89.2</span>
            <span className="text-sm text-gray-500">%</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">+2.4%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Monthly Generation</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">145</span>
            <span className="text-sm text-gray-500">GWh</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">+5.1%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Uptime</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">98.7</span>
            <span className="text-sm text-gray-500">%</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">+0.3%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Energy Generation</h3>
          <div className="h-64">
            <Line data={monthlyData} options={lineOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Facility Efficiency</h3>
          <div className="h-64">
            <Bar data={efficiencyData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Performance Metrics */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200">
        <div className="px-6 pt-6">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Performance Metrics</h3>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Output</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity Factor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {detailedMetrics.map((row) => (
                <tr key={row.site} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.site}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.currentOutput}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.efficiency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.capacityFactor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.status === 'Optimal' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Optimal</span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Suboptimal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
};

export default Performance;


