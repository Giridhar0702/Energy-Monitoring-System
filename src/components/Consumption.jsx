import React from 'react'
import { Zap, TrendingUp, Scale, Activity, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const Consumption = () => {
  const consumptionMetrics = [
    {
      title: 'Current Load',
      value: '2,847',
      unit: 'MW',
      change: '+5.2%',
      icon: Zap,
      changeColor: 'text-green-600'
    },
    {
      title: 'Peak Demand',
      value: '3,456',
      unit: 'MW',
      change: '',
      icon: TrendingUp,
      changeColor: ''
    },
    {
      title: 'Grid Balance',
      value: '-127',
      unit: 'MW',
      change: 'active',
      icon: Scale,
      changeColor: 'text-green-600',
      isNegative: true
    },
    {
      title: 'Load Factor',
      value: '78.5',
      unit: '%',
      change: '+2.1%',
      icon: Activity,
      changeColor: 'text-green-600'
    }
  ]

  const consumptionAlerts = [
    {
      type: 'error',
      title: 'High Demand Alert',
      description: 'Peak demand approaching 95% capacity',
      time: '5 minutes ago',
      icon: AlertCircle
    },
    {
      type: 'warning',
      title: 'Load Imbalance',
      description: 'Grid importing 150MW excess power',
      time: '12 minutes ago',
      icon: AlertTriangle
    },
    {
      type: 'info',
      title: 'Consumption Forecast',
      description: 'Expected 20% increase in evening peak',
      time: '1 hour ago',
      icon: Info
    }
  ]

  const timeData = [
    { time: '00:00', consumption: 95, demand: 110, grid: 15 },
    { time: '04:00', consumption: 85, demand: 95, grid: 10 },
    { time: '08:00', consumption: 140, demand: 160, grid: 20 },
    { time: '12:00', consumption: 180, demand: 200, grid: 20 },
    { time: '16:00', consumption: 160, demand: 180, grid: 20 },
    { time: '20:00', consumption: 140, demand: 160, grid: 20 },
    { time: '24:00', consumption: 110, demand: 130, grid: 20 }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Consumption Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>24h</option>
              <option>7d</option>
              <option>30d</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Consumers</option>
              <option>Industrial</option>
              <option>Residential</option>
            </select>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Generate Report
        </button>
      </div>

      {/* Consumption Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {consumptionMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{metric.title}</p>
                  <div className="flex items-baseline">
                    <p className={`text-2xl font-bold ${metric.isNegative ? 'text-green-600' : 'text-gray-900'}`}>
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-500 ml-1">{metric.unit}</p>
                  </div>
                  {metric.change && (
                    <div className="flex items-center mt-2">
                      {metric.change === 'active' ? (
                        <span className="text-sm font-medium text-green-600">{metric.change}</span>
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className={`text-sm font-medium ml-1 ${metric.changeColor}`}>{metric.change}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg ml-4">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Consumption Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Real-time Consumption vs Demand</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Consumption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Grid</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <svg className="w-full h-80" viewBox="0 0 700 320">
              <defs>
                <linearGradient id="consumptionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                </linearGradient>
                <linearGradient id="demandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              {[0, 50, 100, 150, 200, 250].map((y) => (
                <line key={y} x1="60" y1={260 - y} x2="640" y2={260 - y} stroke="#f3f4f6" strokeWidth="1"/>
              ))}
              {[0, 50, 100, 150, 200, 250].map((value) => (
                <text key={value} x="55" y={265 - value} textAnchor="end" className="text-xs fill-gray-500">
                  {value}
                </text>
              ))}
              {timeData.map((item, i) => (
                <text key={item.time} x={80 + (i * 85)} y="285" textAnchor="middle" className="text-xs fill-gray-500">
                  {item.time}
                </text>
              ))}
              <path
                d={`M 80 ${260 - timeData[0].consumption} ${timeData.map((item, i) => `L ${80 + (i * 85)} ${260 - item.consumption}`).join(' ')} L 590 260 L 80 260 Z`}
                fill="url(#consumptionGradient)"
              />
              <path
                d={`M 80 ${260 - timeData[0].demand} ${timeData.map((item, i) => `L ${80 + (i * 85)} ${260 - item.demand}`).join(' ')} L 590 260 L 80 260 Z`}
                fill="url(#demandGradient)"
              />
              <path
                d={`M 80 ${260 - timeData[0].consumption} ${timeData.map((item, i) => `L ${80 + (i * 85)} ${260 - item.consumption}`).join(' ')}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              <path
                d={`M 80 ${260 - timeData[0].demand} ${timeData.map((item, i) => `L ${80 + (i * 85)} ${260 - item.demand}`).join(' ')}`}
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
              />
              <path
                d={`M 80 ${260 - timeData[0].grid} ${timeData.map((item, i) => `L ${80 + (i * 85)} ${260 - item.grid}`).join(' ')}`}
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>

        {/* Consumption Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Consumption Alerts</h3>
          <div className="space-y-4">
            {consumptionAlerts.map((alert, index) => {
              const Icon = alert.icon
              const alertColors = {
                error: 'bg-red-50 border-red-200 text-red-800',
                warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                info: 'bg-blue-50 border-blue-200 text-blue-800'
              }
              const iconColors = {
                error: 'text-red-500',
                warning: 'text-yellow-500',
                info: 'text-blue-500'
              }
              return (
                <div key={index} className={`p-4 rounded-lg border ${alertColors[alert.type]}`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${iconColors[alert.type]}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-sm opacity-80 mt-1">{alert.description}</p>
                      <p className="text-xs opacity-60 mt-2">{alert.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consumption


