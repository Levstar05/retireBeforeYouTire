
import { WithdrawalPlanner } from "@/components/Withdrawal/WithdrawalPlanner";
import { NavBar } from "@/components/NavBar";
import { ArrowDownToLine } from "lucide-react";

export default function WithdrawalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <main className="container mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <ArrowDownToLine size={28} className="text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-financial-800 mb-2">Withdrawal Planner</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Strategize your retirement withdrawals to ensure your savings last throughout your retirement years
          </p>
        </div>
        <WithdrawalPlanner />
      </main>
    </div>
  );
}
