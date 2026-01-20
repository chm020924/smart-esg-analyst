
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CompanyAnalysis from './components/CompanyAnalysis';
import RiskMonitor from './components/RiskMonitor';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'analysis':
        return <CompanyAnalysis />;
      case 'sentiment':
        return <RiskMonitor />;
      case 'reports':
        return (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
               <span className="text-3xl">🌱</span>
            </div>
            <p className="font-bold text-lg">Portfolio Module Coming Soon</p>
            <p className="text-sm">We're building advanced aggregation features for institutional investors.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {activeView === 'dashboard' && 'Market ESG Intelligence'}
          {activeView === 'analysis' && 'Enterprise ESG Evaluation'}
          {activeView === 'sentiment' && 'Real-time Risk Monitoring'}
          {activeView === 'reports' && 'Green Asset Portfolio'}
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          {activeView === 'dashboard' && 'Aggregate view of industry-wide ESG performance and carbon metrics.'}
          {activeView === 'analysis' && 'Utilize Gemini NLP to extract and score corporate sustainability data.'}
          {activeView === 'sentiment' && 'Automatically detect and penalize scores based on negative news sentiment.'}
          {activeView === 'reports' && 'Track the aggregate ESG performance of your investment baskets.'}
        </p>
      </div>
      {renderView()}
    </Layout>
  );
};

export default App;
