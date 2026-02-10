
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  CheckCircle, 
  DollarSign, 
  TrendingUp,
  Target,
  ArrowRight
} from 'lucide-react';
import Logo from './components/Logo';
import ResultCard from './components/ResultCard';
import { calculateGoals } from './utils/calculations';
import { CalculationInputs, PeriodResults } from './types';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    commissionPercent: 10,
    targetGain: 5000,
  });

  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly'>('monthly');

  const results: PeriodResults = useMemo(() => calculateGoals(inputs), [inputs]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numericValue = value ? parseInt(value, 10) / 100 : 0;
    setInputs(prev => ({ ...prev, targetGain: numericValue }));
  };

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setInputs(prev => ({ ...prev, commissionPercent: val }));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return Math.ceil(val);
  };

  const currentResults = activeTab === 'monthly' ? results.monthly : results.weekly;

  return (
    <div className="min-h-screen pb-12 px-4 md:px-8 bg-[#f8fafc]">
      <Logo />

      <main className="max-w-6xl mx-auto space-y-8">
        {/* Input Section */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#E3F1EA] rounded-lg">
              <Target className="w-5 h-5 text-[#2D5A43]" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Parâmetros da sua Meta</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 block">
                Meta de Ganho Desejada (Líquido)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="targetGain"
                  value={formatCurrency(inputs.targetGain)}
                  onChange={handleCurrencyChange}
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2D5A43]/20 focus:border-[#2D5A43] outline-none transition-all text-slate-700 font-semibold"
                />
              </div>
              <p className="text-xs text-slate-400">Valor líquido que você deseja receber.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 block">
                Percentual de Comissão (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="commissionPercent"
                  value={inputs.commissionPercent || ''}
                  onChange={handlePercentChange}
                  placeholder="Ex: 10"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2D5A43]/20 focus:border-[#2D5A43] outline-none transition-all text-slate-700 font-semibold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
              <p className="text-xs text-slate-400">Sua comissão sobre vendas de R$ 6.990,00.</p>
            </div>
          </div>
        </section>

        {/* Results Header with Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Resultado da Simulação</h3>
            <p className="text-slate-500">Planejamento baseado em ticket médio de R$ 6.990,00.</p>
          </div>
          
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex self-start md:self-auto">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'monthly' 
                ? 'bg-[#2D5A43] text-white shadow-lg shadow-emerald-900/20' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'weekly' 
                ? 'bg-[#2D5A43] text-white shadow-lg shadow-emerald-900/20' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Semanal
            </button>
          </div>
        </div>

        {/* Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResultCard 
            label="Leads Necessários"
            value={formatNumber(currentResults.leadsNeeded)}
            icon={<Users className="w-6 h-6" />}
            description="Leads necessários para atingir a meta."
          />
          <ResultCard 
            label="Reuniões a Marcar"
            value={formatNumber(currentResults.appointmentsNeeded)}
            icon={<Calendar className="w-6 h-6" />}
            description="Número de Visitas que deve agendar."
          />
          <ResultCard 
            label="Demonstrações Agendadas"
            value={formatNumber(currentResults.visitsNeeded)}
            icon={<Briefcase className="w-6 h-6" />}
            description="Quantidade necessária de Demonstrações Necessárias para atingir a meta."
          />
          <ResultCard 
            label="Pedidos (Vendas)"
            value={formatNumber(currentResults.salesNeeded)}
            icon={<CheckCircle className="w-6 h-6" />}
            description="Quantidade de Pedidos que devem ser Repassados."
          />
          <ResultCard 
            label="Ticket Médio"
            value={formatCurrency(currentResults.suggestedTicket)}
            icon={<DollarSign className="w-6 h-6" />}
            description="Valor unitário fixo por pedido."
          />
          <ResultCard 
            label="Faturamento Total"
            value={formatCurrency(currentResults.totalRevenue)}
            icon={<TrendingUp className="w-6 h-6" />}
            description="Volume bruto necessário para seu ganho."
          />
        </div>

        {/* conversion funnel visualization */}
        <div className="bg-[#2D5A43] rounded-3xl p-8 text-white overflow-hidden relative custom-shadow">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4 pointer-events-none">
            <Target size={300} />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-[#B0BFA8]" />
              Nova Lógica de Conversão Saúde Forever
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 bg-[#B0BFA8] rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-[#B0BFA8] uppercase tracking-wider mb-1">Cálculo de Pedidos</p>
                  <p className="text-slate-200">Pedidos = Faturamento Total / R$ 6.990,00.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-[#B0BFA8] rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-[#B0BFA8] uppercase tracking-wider mb-1">Demonstrações Agendadas</p>
                  <p className="text-slate-200">Demonstrações = Pedidos × 3.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-[#B0BFA8] rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-[#B0BFA8] uppercase tracking-wider mb-1">Visitas a Agendar & Leads</p>
                  <p className="text-slate-200">Agendar o dobro das demonstrações. Leads = Demonstrações × 10.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center text-slate-400 text-sm mt-12 pb-8">
          &copy; {new Date().getFullYear()} Saúde Forever - Planejamento Estratégico.
        </footer>
      </main>
    </div>
  );
};

export default App;
