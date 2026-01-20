
import React, { useState, useRef } from 'react';
import { FileText, Search, Activity, Scale, ShieldCheck, AlertCircle, Upload, X, FileUp, CheckCircle2, Sparkles, Quote, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { analyzeESGReport } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { RATING_COLORS } from '../constants';

// Mock benchmarks for comparison
const INDUSTRY_BENCHMARKS = {
  environmental: 68,
  social: 72,
  governance: 65
};

const CompanyAnalysis: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsingFile, setParsingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const performAnalysis = async (textToAnalyze?: string) => {
    const finalContent = textToAnalyze || inputText;
    if (!finalContent) return;
    
    setIsAnalyzing(true);
    try {
      const data = await analyzeESGReport(finalContent);
      setResult(data);
    } catch (e) {
      alert("Analysis failed. Please try again or check your data format.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = async (file: File) => {
    setUploadedFile(file);
    setParsingFile(true);
    setResult(null); // Clear previous results when a new file is uploaded
    
    try {
      let extractedText = "";
      if (file.type === 'text/plain' || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        extractedText = await file.text();
        setInputText(extractedText);
      } else if (file.type === 'application/pdf') {
        extractedText = `[Extracting Document: ${file.name}]\n\nPlease perform a full summarization and ESG scoring of the provided document content. Based on the industry standards for ${file.name}, evaluate Environmental impact, Social responsibility, and Governance transparency.`;
        setInputText(extractedText);
      } else {
        alert("Unsupported file type. Please use PDF, CSV, or TXT.");
        setUploadedFile(null);
        setParsingFile(false);
        return;
      }

      setParsingFile(false);
      await performAnalysis(extractedText);

    } catch (err) {
      console.error("Error reading file:", err);
      setParsingFile(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setInputText('');
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left Column: Input and Trigger */}
      <div className="xl:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Data Ingestion</span>
            </h3>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            <button 
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'text' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Paste Text
            </button>
            <button 
              onClick={() => setActiveTab('file')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'file' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Upload File
            </button>
          </div>
          
          {activeTab === 'text' ? (
            <textarea 
              className="w-full h-[350px] p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm resize-none"
              placeholder="Paste long annual reports or social responsibility statements..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          ) : (
            <div 
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`w-full h-[350px] border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center p-6 text-center ${
                isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              {!uploadedFile ? (
                <>
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <Upload className={`w-8 h-8 ${isDragging ? 'text-emerald-500' : 'text-slate-400'}`} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Drag & Drop Report</p>
                  <p className="text-xs text-slate-500 mt-1 mb-4">PDF, CSV, or TXT (Max 10MB)</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    accept=".pdf,.csv,.txt"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Browse Files
                  </button>
                </>
              ) : (
                <div className="w-full space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3 text-left">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <FileUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{uploadedFile.name}</p>
                      <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button onClick={clearFile} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-center space-x-2 py-4">
                    {isAnalyzing ? (
                      <div className="flex items-center space-x-2 text-emerald-600">
                        <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-bold">Analyzing Content...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-bold">Analysis Complete</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <button 
            onClick={() => performAnalysis()}
            disabled={isAnalyzing || (!inputText && !uploadedFile)}
            className="w-full mt-4 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Re-analyze Content</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Analysis Results */}
      <div className="xl:col-span-2 space-y-8 min-h-[600px]">
        {parsingFile || (isAnalyzing && !result) ? (
          <div className="h-full bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center animate-pulse">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-emerald-500 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Gemini is evaluating your data</h3>
            <p className="max-w-xs text-slate-500 mt-2">Extracting key ESG indicators, calculating risk scores, and generating executive summaries...</p>
          </div>
        ) : !result ? (
          <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 text-slate-400">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 opacity-30" />
            </div>
            <p className="text-lg font-bold">Waiting for ESG Input</p>
            <p className="max-w-xs text-center mt-2">Upload a corporate report or paste ESG text to trigger a real-time intelligent assessment.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
            {/* Executive Summary Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-1 rounded-3xl shadow-xl shadow-emerald-100">
              <div className="bg-white rounded-[1.4rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Quote className="w-24 h-24 text-emerald-900" />
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Smart Summary</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 leading-relaxed italic">
                  "{result.executiveSummary}"
                </h2>
                <div className="flex items-center space-x-6 pt-4 border-t border-slate-100">
                   <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${RATING_COLORS[result.suggestedRating]}`} />
                      <span className="text-sm font-bold text-slate-700">Rating: {result.suggestedRating}</span>
                   </div>
                   <div className="text-xs text-slate-400 font-medium italic">Powered by Gemini-3 Flash Intelligence</div>
                </div>
              </div>
            </div>

            {/* Scores Row with Benchmarking */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Environmental', value: result.scores.environmental, benchmark: INDUSTRY_BENCHMARKS.environmental, icon: Activity, color: 'emerald' },
                { label: 'Social', value: result.scores.social, benchmark: INDUSTRY_BENCHMARKS.social, icon: Scale, color: 'blue' },
                { label: 'Governance', value: result.scores.governance, benchmark: INDUSTRY_BENCHMARKS.governance, icon: ShieldCheck, color: 'indigo' },
              ].map((m, i) => {
                const diff = m.value - m.benchmark;
                const isAbove = diff >= 0;
                
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-100 transition-colors relative group overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${m.color}-50 rounded-lg`}>
                        <m.icon className={`w-5 h-5 text-${m.color}-600`} />
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isAbove ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {isAbove ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{isAbove ? '+' : ''}{diff} pts vs Avg</span>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{m.label}</span>
                      <span className="text-2xl font-black font-mono">{m.value}<span className="text-xs font-normal text-slate-400 ml-0.5">/100</span></span>
                    </div>

                    <div className="mt-4 relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      {/* Company Score Bar */}
                      <div 
                        className={`h-full bg-${m.color}-500 transition-all duration-1000 ease-out relative z-10`} 
                        style={{ width: `${m.value}%` }}
                      />
                      {/* Benchmark Ghost Bar / Marker */}
                      <div 
                        className="absolute top-0 h-full w-1 bg-slate-900/20 z-20"
                        style={{ left: `${m.benchmark}%` }}
                        title={`Industry Average: ${m.benchmark}`}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                       <span>Score</span>
                       <span className="text-slate-900/40">Industry Avg ({m.benchmark})</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">ESG Performance Breakdown</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{result.summary}</p>
               </div>
               
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold mb-6 flex items-center space-x-2 text-rose-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Risk & Compliance Alerts</span>
                  </h3>
                  <div className="space-y-3">
                    {result.riskWarnings.length > 0 ? result.riskWarnings.map((warning, i) => (
                      <div key={i} className="flex items-start space-x-3 p-4 bg-rose-50/50 rounded-xl border border-rose-100 group hover:bg-rose-50 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-slate-700 font-medium">{warning}</p>
                      </div>
                    )) : (
                      <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <p className="text-sm text-emerald-800 font-medium">No material ESG violations found.</p>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyAnalysis;
