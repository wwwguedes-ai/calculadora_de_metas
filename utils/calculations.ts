
import { CalculationInputs, CalculationResults, PeriodResults } from '../types';
import { FIXED_METRICS } from '../constants';

export const calculateGoals = (inputs: CalculationInputs): PeriodResults => {
  const { commissionPercent, targetGain } = inputs;
  
  const safeCommission = commissionPercent || 1;
  const ticketValue = FIXED_METRICS.FIXED_TICKET_VALUE;

  // Monthly Calculations
  // 1. Faturamento total para atingir o lucro desejado
  const monthlyRevenue = targetGain / (safeCommission / 100);
  
  // 2. Pedidos (Vendas) = Faturamento / 6.990,00
  const monthlySales = monthlyRevenue / ticketValue;
  
  // 3. Demonstrações Agendadas = Pedidos * 3
  const monthlyVisits = monthlySales * 3;
  
  // 4. Número de Visitas que deve agendar (Reuniões a Marcar) = Dobro das demonstrações (Visitas * 2)
  const monthlyAppointments = monthlyVisits * 2;
  
  // 5. Leads necessários = Demonstrações (Pedidos * 3) multiplicado por 10
  const monthlyLeads = monthlyVisits * 10;

  const monthly: CalculationResults = {
    totalRevenue: monthlyRevenue,
    salesNeeded: monthlySales,
    visitsNeeded: monthlyVisits,
    appointmentsNeeded: monthlyAppointments,
    leadsNeeded: monthlyLeads,
    suggestedTicket: ticketValue
  };

  // Weekly Calculations
  const weekly: CalculationResults = {
    totalRevenue: monthlyRevenue / FIXED_METRICS.WEEKS_PER_MONTH,
    salesNeeded: monthlySales / FIXED_METRICS.WEEKS_PER_MONTH,
    visitsNeeded: monthlyVisits / FIXED_METRICS.WEEKS_PER_MONTH,
    appointmentsNeeded: monthlyAppointments / FIXED_METRICS.WEEKS_PER_MONTH,
    leadsNeeded: monthlyLeads / FIXED_METRICS.WEEKS_PER_MONTH,
    suggestedTicket: ticketValue
  };

  return { monthly, weekly };
};
