
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { WithdrawalChart } from "./WithdrawalChart";

export function WithdrawalPlanner() {
  const [retirementSavings, setRetirementSavings] = useState<number>(5000000);
  const [withdrawalRate, setWithdrawalRate] = useState<number>(4);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(40000);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [inflationRate, setInflationRate] = useState<number>(4);
  const [returnRate, setReturnRate] = useState<number>(6);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Calculate annual withdrawal amount
  const annualWithdrawal = retirementSavings * (withdrawalRate / 100);
  
  // Calculate monthly sustainable withdrawal
  const monthlySustainable = annualWithdrawal / 12;
  
  // Calculate if withdrawal exceeds expenses
  const isSustainable = monthlySustainable >= monthlyExpenses;
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-financial-700">Withdrawal Planner</CardTitle>
        <CardDescription className="text-center">
          Plan your retirement withdrawals to ensure your savings last
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="retirementSavings">Retirement Savings (₹)</Label>
            <Input
              id="retirementSavings"
              type="number"
              value={retirementSavings}
              onChange={(e) => setRetirementSavings(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
            <Input
              id="monthlyExpenses"
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="withdrawalRate">Annual Withdrawal Rate (%)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="withdrawalRate"
                min={2}
                max={10}
                step={0.1}
                value={[withdrawalRate]}
                onValueChange={(value) => setWithdrawalRate(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{withdrawalRate}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="retirementAge"
                min={45}
                max={75}
                step={1}
                value={[retirementAge]}
                onValueChange={(value) => setRetirementAge(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{retirementAge}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lifeExpectancy">Life Expectancy (Age)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="lifeExpectancy"
                min={retirementAge + 5}
                max={100}
                step={1}
                value={[lifeExpectancy]}
                onValueChange={(value) => setLifeExpectancy(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{lifeExpectancy}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="inflationRate"
                min={1}
                max={10}
                step={0.5}
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{inflationRate}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="returnRate">Annual Return Rate (%)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="returnRate"
                min={1}
                max={12}
                step={0.5}
                value={[returnRate]}
                onValueChange={(value) => setReturnRate(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{returnRate}%</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCalculate} 
          className="w-full bg-financial-600 hover:bg-financial-700 text-white"
        >
          Calculate Withdrawal Plan
        </Button>
      </CardFooter>
      
      {showResults && (
        <div className="space-y-6 p-6 bg-gray-50 rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={`border-l-4 ${isSustainable ? 'border-l-success-500' : 'border-l-destructive'}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Withdrawal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                  }).format(monthlySustainable)}
                </p>
                <p className={`text-sm ${isSustainable ? 'text-success-600' : 'text-destructive'}`}>
                  {isSustainable ? 'Sufficient for expenses' : 'Insufficient for expenses'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-financial-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{lifeExpectancy - retirementAge} years</p>
                <p className="text-sm text-muted-foreground">Until age {lifeExpectancy}</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-financial-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Annual Withdrawal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                  }).format(annualWithdrawal)}
                </p>
                <p className="text-sm text-muted-foreground">{withdrawalRate}% of savings</p>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Retirement Savings Projection</h3>
            <div className="h-[300px]">
              <WithdrawalChart 
                initialSavings={retirementSavings}
                withdrawalRate={withdrawalRate}
                inflationRate={inflationRate}
                returnRate={returnRate}
                retirementAge={retirementAge}
                lifeExpectancy={lifeExpectancy}
              />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Withdrawal Strategy Advice</h3>
            <div className="space-y-4">
              {!isSustainable && (
                <div className="text-destructive">
                  <p className="font-medium">Your withdrawal rate may be too high to sustain your expenses.</p>
                  <p>Consider reducing your monthly expenses or increasing your retirement savings.</p>
                </div>
              )}
              
              <div>
                <p className="font-medium">The 4% Rule</p>
                <p className="text-muted-foreground">
                  Many financial planners suggest withdrawing no more than 4% of your retirement savings annually,
                  adjusted for inflation each year. This strategy has historically provided a high probability of
                  your savings lasting 30+ years.
                </p>
              </div>
              
              <div>
                <p className="font-medium">Withdrawal Strategies</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Consider a bucket strategy - divide savings into short, medium, and long-term buckets</li>
                  <li>Adjust withdrawal rates during market downturns to preserve principal</li>
                  <li>Consider annuities for guaranteed income alongside flexible withdrawals</li>
                  <li>Explore systematic withdrawal plans (SWPs) from mutual funds for regular income</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium">Tax Optimization</p>
                <p className="text-muted-foreground">
                  Withdraw from taxable accounts first, followed by tax-deferred accounts.
                  This allows tax-advantaged accounts to continue growing tax-free for longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
