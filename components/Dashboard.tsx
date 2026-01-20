
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import { TrendingDown, TrendingUp, AlertTriangle, Globe2, Briefcase, Award } from 'lucide-react';
import { MOCK_COMPANIES, RATING_COLORS } from '../constants';

const Dashboard: React.FC = () => {
  const radarData = [
    { subject: 'Carbon Control', A: 120, B: 70, fullMark: 150 },
    { subject: 'Social Responsibility', A: 98, B: 130, fullMark: 150 },
    { subject: 'Board Ethics', A: 86, B: 130, fullMark: 150 },
    { subject: 'Labor Rights', A: 99, B: 100, fullMark: 150 },
    { subject: 'Waste Management', A: 85, B: 90, fullMark: 150 },
    { subject: 'Transparency', A: 65, B: 85, fullMark: 150 },
  ];

  // Prepare data for the Top 5 horizontal bar chart
  const top5Data = MOCK_COMPANIES
    .map(c => ({
      name: c.name,
      score: Math.round(Object.values(c.scores).reduce((a, b) => a + b, 0) / 3),
      rating: c.overallRating
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg Industry ESG', value: '72.4', icon: Globe2, color: 'text-blue-600', trend: '+2.4%' },
          { label: 'Carbon Intensity', value: '142.1', icon: TrendingDown, color: 'text-emerald-600', trend: '-12%' },
          { label: 'Active Alerts', value: '14', icon: AlertTriangle, color: 'text-amber-600', trend: 'High Priority' },
          { label: 'Assets Under Rating', value: '$1.4B', icon: Briefcase, color: 'text-indigo-600', trend: 'Global' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-100 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : stat.trend.startsWith('-') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart Section */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Market ESG Benchmark Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Radar name="Portfolio Avg" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Radar name="S&P 500 Avg" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Horizontal Bar Chart Section - Top 5 Performers */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold">Top 5 Performer Score Comparison</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={top5Data}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={110} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'ESG Score']}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24}>
                  {top5Data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#059669' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full Width Top Companies Table */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Investment Rating Registry</h3>
            <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">Live Market Data</span>
          </div>
          <button className="text-sm text-emerald-600 font-semibold hover:underline">Full Registry View</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-100">
                <th className="pb-4 font-semibold px-4">Company Entity</th>
                <th className="pb-4 font-semibold px-4">Sector</th>
                <th className="pb-4 font-semibold px-4">Carbon Trend</th>
                <th className="pb-4 font-semibold px-4 text-center">Avg. Score</th>
                <th className="pb-4 font-semibold px-4 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_COMPANIES.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-[10px] tracking-tighter">
                        {company.ticker}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{company.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{company.ticker}:NASDAQ</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-500 text-sm font-medium bg-slate-100 px-2 py-1 rounded-md">{company.industry}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1.5">
                      {company.carbonData.trend < 0 ? (
                        <TrendingDown className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-rose-500" />
                      )}
                      <span className={`text-sm font-bold ${company.carbonData.trend < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {company.carbonData.trend}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center space-x-1 bg-slate-50 px-3 py-1 rounded-full">
                       <span className="text-sm font-black text-slate-700">{Math.round(Object.values(company.scores).reduce((a, b) => a + b, 0) / 3)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-4 py-1.5 rounded-lg text-white text-xs font-black shadow-sm ${RATING_COLORS[company.overallRating]}`}>
                      {company.overallRating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
