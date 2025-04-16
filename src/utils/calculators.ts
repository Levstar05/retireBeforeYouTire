
/**
 * Calculate future value based on current savings, monthly contributions, and return rate.
 * @param currentSavings Current savings amount
 * @param monthlyContribution Monthly contribution amount
 * @param annualReturnRate Annual return rate (decimal, e.g., 0.08 for 8%)
 * @param years Number of years
 * @returns Projected future value
 */
export function calculateFutureValue(
  currentSavings: number,
  monthlyContribution: number,
  annualReturnRate: number,
  years: number
): number {
  // Monthly return rate
  const monthlyRate = annualReturnRate / 12;
  // Number of months
  const totalMonths = years * 12;
  
  // Calculate future value of current principal
  const futureValueOfPrincipal = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
  
  // Calculate future value of the stream of contributions
  let futureValueOfContributions = 0;
  if (monthlyRate > 0) {
    futureValueOfContributions = monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
  } else {
    // If interest rate is 0, simply multiply contribution by time
    futureValueOfContributions = monthlyContribution * totalMonths;
  }
  
  // Total future value
  return futureValueOfPrincipal + futureValueOfContributions;
}

/**
 * Calculate required monthly savings to reach a target amount.
 * @param currentSavings Current savings amount
 * @param targetAmount Target amount to reach
 * @param annualReturnRate Annual return rate (decimal, e.g., 0.08 for 8%)
 * @param years Number of years
 * @returns Required monthly savings
 */
export function calculateRequiredSaving(
  currentSavings: number,
  targetAmount: number,
  annualReturnRate: number,
  years: number
): number {
  // Monthly return rate
  const monthlyRate = annualReturnRate / 12;
  // Number of months
  const totalMonths = years * 12;
  
  // Future value of current principal
  const futureValueOfPrincipal = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
  
  // Amount needed from contributions
  const amountNeededFromContributions = targetAmount - futureValueOfPrincipal;
  
  // Calculate required monthly contribution
  let requiredMonthlyContribution = 0;
  if (monthlyRate > 0) {
    requiredMonthlyContribution = amountNeededFromContributions * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    // If interest rate is 0, simply divide by time
    requiredMonthlyContribution = amountNeededFromContributions / totalMonths;
  }
  
  return Math.max(0, requiredMonthlyContribution);
}

/**
 * Calculate the maximum sustainable withdrawal amount.
 * @param principal Total savings
 * @param withdrawalRate Annual withdrawal rate (decimal, e.g., 0.04 for 4%)
 * @param annualReturnRate Annual return rate (decimal, e.g., 0.07 for 7%)
 * @param inflationRate Annual inflation rate (decimal, e.g., 0.03 for 3%)
 * @param years Number of years
 * @returns Maximum sustainable monthly withdrawal
 */
export function calculateSustainableWithdrawal(
  principal: number,
  withdrawalRate: number,
  annualReturnRate: number,
  inflationRate: number,
  years: number
): number {
  // Initial annual withdrawal
  const initialAnnualWithdrawal = principal * withdrawalRate;
  
  // Convert to monthly
  const initialMonthlyWithdrawal = initialAnnualWithdrawal / 12;
  
  return initialMonthlyWithdrawal;
}
