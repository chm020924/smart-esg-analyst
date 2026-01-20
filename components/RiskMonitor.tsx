
import React, { useState } from 'react';
import { ShieldAlert, Send, Info, ChevronDown, Trash2, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { monitorNewsImpact } from '../services/geminiService';
import { ESGDimension, NewsSentiment } from '../types';

const RiskMonitor: React.FC = () => {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alerts, setAlerts] = useState<NewsSentiment[]>([]);

  const handleAnalyze = async () => {
    if (!newsTitle || !newsSummary) return;
    setIsAnalyzing(true);
    try {
      const result = await monitorNewsImpact(newsTitle, newsSummary);
      const newAlert: NewsSentiment = {
        id: Math.random().toString(36).substr(2, 9),
        title: newsTitle,
        summary: newsSummary,
        dimension: result.dimension,
        impactScore: result.impact,
        source: 'AI Manual Entry',
        date: new Date().toLocaleDateString()
      };
      setAlerts([newAlert, ...alerts]);
      setNewsTitle('');
      setNewsSummary('');
    } catch (e) {
      alert("Analysis failed. Check console for details.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-rose-100 rounded-xl">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Intelligent Sentiment Monitor</h2>
            <p className="text-slate-500 text-sm">Paste corporate news to assess real-time ESG score impact.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">News Headline</label>
            <input 
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 border outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              placeholder="e.g., Global Energy Corp fined for hazardous waste violation..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Detailed Summary / Excerpt</label>
            <textarea 
              value={newsSummary}
              onChange={(e) => setNewsSummary(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 border outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none"
              placeholder="Provide the full text or key points of the report..."
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !newsTitle}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-slate-800 disabled:opacity-50 transition-all"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Gemini Analyzing...</span>
              </div>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Calculate ESG Deduction</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold px-2 flex items-center space-x-2">
          <span>Active Sentiment Feed</span>
          <span className="bg-rose-100 text-rose-600 text-xs px-2 py-0.5 rounded-full">{alerts.length}</span>
        </h3>
        
        {alerts.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No alerts analyzed yet.</p>
            <p className="text-sm">New detections will appear here automatically.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4 group">
              <div className={`p-4 rounded-xl ${alert.impactScore < 0 ? 'bg-rose-50' : 'bg-emerald-50'}`}>
                {alert.impactScore < 0 ? (
                  <ArrowDownRight className="w-6 h-6 text-rose-600" />
                ) : (
                  <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{alert.dimension}</span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">{alert.title}</h4>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-xl font-black ${alert.impactScore < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {alert.impactScore > 0 ? '+' : ''}{alert.impactScore}
                      </p>
                      <p className="text-xs text-slate-400">Score Impact</p>
                    </div>
                    <button 
                      onClick={() => removeAlert(alert.id)}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-slate-600 text-sm line-clamp-2">{alert.summary}</p>
                <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>Source: {alert.source}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{alert.date}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RiskMonitor;
