import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import SystemStatus from './SystemStatus';
import EnergySourceChart from './EnergySourceChart';
import PowerGenerationChart from './PowerGenerationChart';
import { Zap, Sun, Wind, ChevronDown, Cloud } from 'lucide-react';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // Format time in Asia/Kolkata
  const formatKolkata = (epochSeconds) => {
    try {
      if (!epochSeconds) return '—';
      const date = new Date(epochSeconds * 1000);
      return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      }).format(date);
    } catch {
      return '—';
    }
  };

  // Fetch weather on mount
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoadingWeather(true);
        setWeatherError('');
        // ⚠️ Use your API key in .env file instead of hardcoding
        const url = `https://api.weatherapi.com/v1/current.json?key=da59bbee7a414beb97e63135251609&q=Bhubaneswar,Odisha&aqi=no`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        setWeather(data);
      
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
  }, []);

  // Weekly demo data
  const weeklyGeneration = [
    { day: 'Mon', solar: 145, wind: 52, weather: 'cloud' },
    { day: 'Tue', solar: 167, wind: 48, weather: 'cloud' },
    { day: 'Wed', solar: 189, wind: 45, weather: 'cloud' },
    { day: 'Thu', solar: 123, wind: 67, weather: 'wind' },
    { day: 'Fri', solar: 234, wind: 42, weather: 'sun' },
    { day: 'Sat', solar: 256, wind: 38, weather: 'sun' },
    { day: 'Sun', solar: 145, wind: 58, weather: 'wind' },
  ];

  // Weather icon helper
  const WeatherIcon = ({ type }) => {
    if (type === 'sun') return <Sun className="w-5 h-5 text-amber-500" />;
    if (type === 'wind') return <Wind className="w-5 h-5 text-blue-500" />;
    return <Cloud className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergySourceChart />
        <PowerGenerationChart />
      </div>

      {/* Weather + Weekly Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Weather & Weekly Generation
        </h3>

        {/* Quick Weather Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-500 uppercase">Temperature</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {loadingWeather
                ? '—'
                : weather?.current?.temp_c != null
                ? `${weather.current.temp_c}°C`
                : '—'}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-500 uppercase">Wind</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {loadingWeather
                ? '—'
                : weather?.current?.wind_kph != null
                ? `${weather.current.wind_kph} kph`
                : '—'}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-500 uppercase">Updated (Kolkata)</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {loadingWeather
                ? 'Loading...'
                : weather?.current?.last_updated_epoch
                ? `${formatKolkata(weather.current.last_updated_epoch)} (Asia/Kolkata)`
                : weather?.location?.localtime_epoch
                ? `${formatKolkata(weather.location.localtime_epoch)} (Asia/Kolkata)`
                : '—'}
            </p>
          </div>
        </div>

        {/* Weather Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {weather?.location
                  ? `${weather.location.name} Weather, ${weather.location.region}`
                  : 'Bhubaneswar Weather'}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {loadingWeather
                  ? 'Loading...'
                  : weatherError
                  ? weatherError
                  : `${weather?.current?.temp_c ?? '--'}°C, ${
                      weather?.current?.condition?.text ?? '—'
                    }`}
              </p>
            </div>
          </div>
          {weather?.current && (
            <div className="text-sm text-gray-600">
              Wind:{' '}
              <span className="font-medium text-gray-900">
                {weather?.current?.wind_kph ?? '--'} kph
              </span>{' '}
              · Humidity:{' '}
              <span className="font-medium text-gray-900">
                {weather?.current?.humidity ?? '--'}%
              </span>
            </div>
          )}
        </div>

        {/* Weekly Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {weeklyGeneration.map((d, idx) => (
            <div
              key={d.day}
              className={`rounded-xl border ${
                idx === 0
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-white'
              } p-4`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">{d.day}</span>
                <WeatherIcon type={d.weather} />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Solar:</span>{' '}
                  <span className="font-bold text-gray-900">{d.solar}MW</span>
                </div>
                <div className="text-sm text-gray-500">
                  <span>Wind:</span>{' '}
                  <span className="font-semibold text-gray-700">{d.wind}MW</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
