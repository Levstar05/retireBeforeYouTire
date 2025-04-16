
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateFutureValue, calculateRequiredSaving } from "@/utils/calculators";
import { RetirementChart } from "./RetirementChart";
import { Separator } from "@/components/ui/separator";

interface RetirementResultsProps {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  targetAmount: number;
  annualReturnRate: number;
  inflationRate: number;
}

export function RetirementResults({
  currentAge,
  retirementAge,
  currentSavings,
  monthlyContribution,
  targetAmount,
  annualReturnRate,
  inflationRate
}: RetirementResultsProps) {
  const [projectedAmount, setProjectedAmount] = useState<number>(0);
  const [requiredMonthly, setRequiredMonthly] = useState<number>(0);
  const [shortfall, setShortfall] = useState<number>(0);
  const [isOnTrack, setIsOnTrack] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge;
    
    // Calculate projected savings at retirement
    const projected = calculateFutureValue(
      currentSavings,
      monthlyContribution,
      annualReturnRate / 100,
      yearsToRetirement
    );
    setProjectedAmount(projected);
    
    // Calculate required monthly savings
    const required = calculateRequiredSaving(
      currentSavings,
      targetAmount,
      annualReturnRate / 100,
      yearsToRetirement
    );
    setRequiredMonthly(required);
    
    // Calculate shortfall or surplus
    const diff = projected - targetAmount;
    setShortfall(diff);
    setIsOnTrack(diff >= 0);
    
    // Generate chart data
    const data = [];
    let balance = currentSavings;
    
    for (let year = 0; year <= yearsToRetirement; year++) {
      data.push({
        age: currentAge + year,
        balance: Math.round(balance),
      });
      
      // Calculate next year's balance with compound interest
      balance = balance * (1 + annualReturnRate / 100) + monthlyContribution * 12;
    }
    
    setChartData(data);
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, targetAmount, annualReturnRate]);
  
  // Format currency values
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(amount));
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-b-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`border-l-4 ${isOnTrack ? 'border-l-success-500' : 'border-l-destructive'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projected at Retirement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(projectedAmount)}</p>
            <p className={`text-sm ${isOnTrack ? 'text-success-600' : 'text-destructive'}`}>
              {isOnTrack ? 'On Track' : 'Not On Track'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-financial-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Required Monthly Saving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(requiredMonthly)}</p>
            <p className="text-sm text-muted-foreground">To reach target</p>
          </CardContent>
        </Card>
        
        <Card className={`border-l-4 ${isOnTrack ? 'border-l-success-500' : 'border-l-destructive'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isOnTrack ? 'Surplus' : 'Shortfall'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(Math.abs(shortfall))}</p>
            <p className={`text-sm ${isOnTrack ? 'text-success-600' : 'text-destructive'}`}>
              {isOnTrack ? 'Above Target' : 'Below Target'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-4">Retirement Growth Projection</h3>
        <div className="h-[300px]">
          <RetirementChart data={chartData} targetAmount={targetAmount} />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Retirement Advice</h3>
        <div className="space-y-4">
          {!isOnTrack && (
            <div className="text-destructive">
              <p className="font-medium">You're currently not on track to reach your retirement goal.</p>
              <p>Consider increasing your monthly contribution to {formatCurrency(requiredMonthly)} to reach your target.</p>
            </div>
          )}
          
          <div>
            <p className="font-medium">Investment Strategy</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Consider a diversified portfolio with {retirementAge - currentAge > 15 ? 'higher equity exposure' : 'balanced allocation'}</li>
              <li>Explore SIPs in index funds for long-term growth</li>
              <li>Review and rebalance your portfolio annually</li>
              <li>Consider tax-advantaged retirement accounts</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">Inflation Impact</p>
            <p className="text-muted-foreground">
              With {inflationRate}% inflation, your retirement target of {formatCurrency(targetAmount)} will be worth approximately {formatCurrency(targetAmount / Math.pow(1 + inflationRate / 100, retirementAge - currentAge))} in today's money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
