
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

interface RetirementChartProps {
  data: Array<{ age: number; balance: number }>;
  targetAmount: number;
}

export function RetirementChart({ data, targetAmount }: RetirementChartProps) {
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
            Balance: {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(payload[0].value)}
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
          label={{ value: 'Balance', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceLine y={targetAmount} stroke="#ff4d4f" strokeDasharray="3 3" label="Target" />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
