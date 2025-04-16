
import { Link } from "react-router-dom";
import { PiggyBank } from "lucide-react";
import { Button } from "./ui/button";

export function NavBar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PiggyBank className="h-8 w-8 text-financial-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">RetireWisePath</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/calculator">
              <Button variant="ghost">Calculator</Button>
            </Link>
            <Link to="/investments">
              <Button variant="ghost">Investments</Button>
            </Link>
            <Link to="/withdrawal">
              <Button variant="ghost">Withdrawal</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
