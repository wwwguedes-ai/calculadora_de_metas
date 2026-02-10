
export interface CalculationInputs {
  commissionPercent: number;
  targetGain: number;
}

export interface CalculationResults {
  totalRevenue: number;
  salesNeeded: number;
  visitsNeeded: number;
  appointmentsNeeded: number;
  leadsNeeded: number;
  suggestedTicket: number;
}

export interface PeriodResults {
  monthly: CalculationResults;
  weekly: CalculationResults;
}
