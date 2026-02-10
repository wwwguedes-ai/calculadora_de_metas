// Configurações Fixas do Modelo Saúde Forever
const METRICS = {
  TICKET_MEDIO: 6990,
  WEEKS: 4
};

// Estado da Aplicação
let state = {
  gain: 5000,
  commission: 10,
  view: 'monthly'
};

// Elementos do DOM
const inputGain = document.getElementById('input-gain') as HTMLInputElement;
const inputComm = document.getElementById('input-commission') as HTMLInputElement;
const btnMonthly = document.getElementById('btn-monthly') as HTMLButtonElement;
const btnWeekly = document.getElementById('btn-weekly') as HTMLButtonElement;

const resLeads = document.getElementById('res-leads');
const resApps = document.getElementById('res-appointments');
const resVisits = document.getElementById('res-visits');
const resSales = document.getElementById('res-sales');
const resRevenue = document.getElementById('res-revenue');
const displayYear = document.getElementById('year');

// Utilitários
const toBRL = (val: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const toNum = (val: number) => Math.ceil(val).toLocaleString('pt-BR');

// Motor de Cálculo
const calculate = () => {
  const { gain, commission, view } = state;
  const perc = commission / 100 || 0.01;

  // Lógica Base (Mensal)
  let revenue = gain / perc;
  let sales = revenue / METRICS.TICKET_MEDIO;
  let visits = sales * 3;
  let apps = visits * 2;
  let leads = visits * 10;

  // Ajuste Semanal
  if (view === 'weekly') {
    revenue /= METRICS.WEEKS;
    sales /= METRICS.WEEKS;
    visits /= METRICS.WEEKS;
    apps /= METRICS.WEEKS;
    leads /= METRICS.WEEKS;
  }

  // Atualizar UI
  if (resRevenue) resRevenue.textContent = toBRL(revenue);
  if (resSales) resSales.textContent = toNum(sales);
  if (resVisits) resVisits.textContent = toNum(visits);
  if (resApps) resApps.textContent = toNum(apps);
  if (resLeads) resLeads.textContent = toNum(leads);
};

// Listeners de Input
inputGain.addEventListener('input', (e) => {
  const el = e.target as HTMLInputElement;
  let val = el.value.replace(/\D/g, "");
  const numericValue = val ? parseInt(val, 10) / 100 : 0;
  state.gain = numericValue;
  el.value = toBRL(numericValue);
  calculate();
});

inputComm.addEventListener('input', (e) => {
  const el = e.target as HTMLInputElement;
  state.commission = parseFloat(el.value) || 0;
  calculate();
});

// Troca de Abas
const setView = (v: string) => {
  state.view = v;
  if (v === 'monthly') {
    btnMonthly.className = "px-6 py-2 rounded-xl text-sm font-semibold transition-all tab-active";
    btnWeekly.className = "px-6 py-2 rounded-xl text-sm font-semibold transition-all tab-inactive";
  } else {
    btnWeekly.className = "px-6 py-2 rounded-xl text-sm font-semibold transition-all tab-active";
    btnMonthly.className = "px-6 py-2 rounded-xl text-sm font-semibold transition-all tab-inactive";
  }
  calculate();
};

btnMonthly.addEventListener('click', () => setView('monthly'));
btnWeekly.addEventListener('click', () => setView('weekly'));

// Inicialização
const init = () => {
  if (displayYear) displayYear.textContent = new Date().getFullYear().toString();
  
  // @ts-ignore
  if (window.lucide) window.lucide.createIcons();
  
  calculate();
};

document.addEventListener('DOMContentLoaded', init);
if (document.readyState !== 'loading') init();
