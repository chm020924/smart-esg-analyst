
import React from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  Leaf, 
  Users, 
  Building2, 
  Search,
  LayoutDashboard,
  Settings
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Market Overview' },
    { id: 'analysis', icon: BarChart3, label: 'Company Analysis' },
    { id: 'sentiment', icon: ShieldAlert, label: 'Risk Monitor' },
    { id: 'reports', icon: Leaf, label: 'Green Portfolio' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">ESG Smart</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by ticker or company name..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg border-none focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right mr-4">
              <p className="text-sm font-semibold">Senior ESG Analyst</p>
              <p className="text-xs text-slate-500">Green Invest Fund</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img src="https://picsum.photos/40/40" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
