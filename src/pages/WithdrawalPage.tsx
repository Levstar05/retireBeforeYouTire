
import { WithdrawalPlanner } from "@/components/Withdrawal/WithdrawalPlanner";
import { NavBar } from "@/components/NavBar";

export default function WithdrawalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-financial-800">Withdrawal Planner</h1>
        <WithdrawalPlanner />
      </main>
    </div>
  );
}
