
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RetirementResults } from "./RetirementResults";

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentSavings, setCurrentSavings] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [targetAmount, setTargetAmount] = useState<number>(5000000);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(8);
  const [inflationRate, setInflationRate] = useState<number>(4);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-financial-700">Retirement Calculator</CardTitle>
        <CardDescription className="text-center">
          Plan your savings to achieve your retirement goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentAge">Current Age</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="currentAge"
                min={18}
                max={70}
                step={1}
                value={[currentAge]}
                onValueChange={(value) => setCurrentAge(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{currentAge}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="retirementAge"
                min={currentAge + 1}
                max={80}
                step={1}
                value={[retirementAge]}
                onValueChange={(value) => setRetirementAge(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{retirementAge}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentSavings">Current Savings (₹)</Label>
            <Input
              id="currentSavings"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount (₹)</Label>
            <Input
              id="targetAmount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution (₹)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="returnRate">Expected Annual Return (%)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="returnRate"
                min={1}
                max={20}
                step={0.5}
                value={[annualReturnRate]}
                onValueChange={(value) => setAnnualReturnRate(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{annualReturnRate}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
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
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCalculate} 
          className="w-full bg-financial-600 hover:bg-financial-700 text-white"
        >
          Calculate Retirement Plan
        </Button>
      </CardFooter>
      
      {showResults && (
        <RetirementResults 
          currentAge={currentAge}
          retirementAge={retirementAge}
          currentSavings={currentSavings}
          monthlyContribution={monthlyContribution}
          targetAmount={targetAmount}
          annualReturnRate={annualReturnRate}
          inflationRate={inflationRate}
        />
      )}
    </Card>
  );
}
