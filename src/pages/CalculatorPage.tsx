
import { RetirementCalculator } from "@/components/Calculator/RetirementCalculator";
import { NavBar } from "@/components/NavBar";
import { Calculator } from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <main className="container mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Calculator size={28} className="text-financial-600" />
          </div>
          <h1 className="text-4xl font-bold text-financial-800 mb-2">Retirement Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plan your retirement by understanding how much you need to save monthly to reach your target corpus
          </p>
        </div>
        <RetirementCalculator />
      </main>
    </div>
  );
}
