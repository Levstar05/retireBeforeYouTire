
import { InvestmentRecommendations } from "@/components/Investments/InvestmentRecommendations";
import { NavBar } from "@/components/NavBar";
import { TrendingUp } from "lucide-react";

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <main className="container mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <TrendingUp size={28} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-financial-800 mb-2">Investment Recommendations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore smart investment options tailored to help you achieve your retirement goals
          </p>
        </div>
        <InvestmentRecommendations />
      </main>
    </div>
  );
}
