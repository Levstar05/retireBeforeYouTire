
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PiggyBank, Calculator, TrendingUp, ArrowDownToLine } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Retire <span className="text-financial-600">Wise</span> Path
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Plan your retirement with confidence. Our financial advisory platform helps you save smartly, invest wisely, and withdraw strategically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculator">
                  <Button className="bg-financial-600 hover:bg-financial-700 text-white px-8 py-6 text-lg">
                    Start Planning
                  </Button>
                </Link>
                <Link to="/investments">
                  <Button variant="outline" className="border-financial-600 text-financial-600 hover:bg-financial-50 px-8 py-6 text-lg">
                    Explore Investments
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-financial-400 to-financial-600 blur-lg opacity-75"></div>
                <div className="relative bg-white p-8 rounded-full shadow-lg">
                  <PiggyBank size={180} className="text-financial-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How We Help You Retire With Confidence</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Calculate Your Goals"
              description="Our retirement calculator helps you determine exactly how much you need to save monthly to reach your retirement goals."
              icon={<Calculator size={40} className="text-financial-600" />}
              linkTo="/calculator"
              linkText="Use Calculator"
            />
            
            <FeatureCard 
              title="Smart Investment Advice"
              description="Get personalized recommendations on SIPs, mutual funds, and other investment options to grow your wealth effectively."
              icon={<TrendingUp size={40} className="text-financial-600" />}
              linkTo="/investments" 
              linkText="View Investments"
            />
            
            <FeatureCard 
              title="Withdrawal Strategy"
              description="Plan how to withdraw your retirement savings sustainably to ensure your money lasts throughout your retirement years."
              icon={<ArrowDownToLine size={40} className="text-financial-600" />}
              linkTo="/withdrawal"
              linkText="Plan Withdrawals"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials/Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-5xl font-bold text-financial-600 mb-4">15%</h3>
              <p className="text-gray-600">Average annual returns from our recommended equity investments</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-5xl font-bold text-financial-600 mb-4">₹5 Cr+</h3>
              <p className="text-gray-600">Average retirement corpus our users are on track to build</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-5xl font-bold text-financial-600 mb-4">30+</h3>
              <p className="text-gray-600">Years of comfortable retirement with our withdrawal strategies</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-financial-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Financial Future?</h2>
          <p className="text-xl mb-8 opacity-90">Start planning your retirement today and ensure financial independence for tomorrow.</p>
          <Link to="/calculator">
            <Button className="bg-white text-financial-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Start Your Retirement Plan Now
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-800 text-gray-300">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <PiggyBank className="h-8 w-8 text-financial-400 mr-2" />
              <span className="text-xl font-semibold text-white">RetireWisePath</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link to="/calculator" className="hover:text-white">Calculator</Link>
              <Link to="/investments" className="hover:text-white">Investments</Link>
              <Link to="/withdrawal" className="hover:text-white">Withdrawal</Link>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} RetireWisePath. All rights reserved.</p>
            <p className="mt-2">This application is for informational purposes only and does not constitute financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  linkText: string;
}

function FeatureCard({ title, description, icon, linkTo, linkText }: FeatureCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to={linkTo}>
          <Button variant="ghost" className="text-financial-600 hover:text-financial-700 hover:bg-financial-50">
            {linkText} →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
