
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface WithdrawalChartProps {
  initialSavings: number;
  withdrawalRate: number;
  inflationRate: number;
  returnRate: number;
  retirementAge: number;
  lifeExpectancy: number;
}

export function WithdrawalChart({
  initialSavings,
  withdrawalRate,
  inflationRate,
  returnRate,
  retirementAge,
  lifeExpectancy
}: WithdrawalChartProps) {
  // Generate projection data
  const generateProjectionData = () => {
    const data = [];
    const years = lifeExpectancy - retirementAge;
    
    let currentSavings = initialSavings;
    let currentWithdrawal = initialSavings * (withdrawalRate / 100);
    
    for (let year = 0; year <= years; year++) {
      data.push({
        age: retirementAge + year,
        savings: Math.max(0, Math.round(currentSavings)),
        withdrawal: Math.round(currentWithdrawal),
      });
      
      // Calculate next year's numbers
      // Withdraw at beginning of year
      currentSavings -= currentWithdrawal;
      
      // Apply investment returns
      currentSavings = currentSavings * (1 + returnRate / 100);
      
      // Increase withdrawal for next year due to inflation
      currentWithdrawal = currentWithdrawal * (1 + inflationRate / 100);
    }
    
    return data;
  };

  const data = generateProjectionData();
  
  // Format currency values for tooltip and axis
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md border rounded">
          <p className="font-medium">Age: {label}</p>
          <p className="text-financial-600">
            Savings: {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(payload[0].value)}
          </p>
          <p className="text-financial-800">
            Withdrawal: {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="age" 
          label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis 
          tickFormatter={formatCurrency} 
          label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="savings"
          name="Remaining Savings"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="withdrawal"
          name="Annual Withdrawal"
          stroke="#16a34a"
          strokeDasharray="5 5"
          dot={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
