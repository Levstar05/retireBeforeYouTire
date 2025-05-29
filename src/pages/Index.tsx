import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PiggyBank, Calculator, TrendingUp, ArrowDownToLine, ChevronRight } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-financial-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 md:pr-10">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Retire <span className="bg-gradient-to-r from-financial-600 to-financial-500 bg-clip-text text-transparent">Before</span> You <span className="bg-gradient-to-r from-financial-600 to-financial-500 bg-clip-text text-transparent">Tire</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Plan your retirement with confidence. Our financial advisory platform helps you save smartly, invest wisely, and withdraw strategically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculator">
                  <Button className="bg-financial-600 hover:bg-financial-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-financial-200/50 transition-all duration-300 hover:translate-y-[-2px]">
                    Start Planning
                  </Button>
                </Link>
                <Link to="/investments">
                  <Button variant="outline" className="border-financial-600 text-financial-600 hover:bg-financial-50 px-8 py-6 text-lg rounded-full border-2 transition-all hover:translate-y-[-2px]">
                    Explore Investments
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-financial-400 to-financial-600 blur-xl opacity-75 animate-pulse"></div>
                <div className="relative bg-white p-10 rounded-full shadow-xl">
                  <PiggyBank size={200} className="text-financial-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How We Help You Retire With Confidence</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Comprehensive tools and advice to plan every aspect of your retirement journey</p>
          
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              title="Calculate Your Goals"
              description="Our retirement calculator helps you determine exactly how much you need to save monthly to reach your retirement goals."
              icon={<Calculator size={48} className="text-white" />}
              linkTo="/calculator"
              linkText="Use Calculator"
              color="from-blue-500 to-blue-700"
            />
            
            <FeatureCard 
              title="Smart Investment Advice"
              description="Get personalized recommendations on SIPs, mutual funds, and other investment options to grow your wealth effectively."
              icon={<TrendingUp size={48} className="text-white" />}
              linkTo="/investments" 
              linkText="View Investments"
              color="from-green-500 to-green-700"
            />
            
            <FeatureCard 
              title="Withdrawal Strategy"
              description="Plan how to withdraw your retirement savings sustainably to ensure your money lasts throughout your retirement years."
              icon={<ArrowDownToLine size={48} className="text-white" />}
              linkTo="/withdrawal"
              linkText="Plan Withdrawals"
              color="from-indigo-500 to-indigo-700"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials/Stats Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why People Trust Us</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
              <div className="w-20 h-20 bg-financial-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-financial-600">15%</span>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-2">Average Annual Returns</p>
              <p className="text-gray-600">From our recommended equity investments for long-term growth</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
              <div className="w-20 h-20 bg-financial-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-financial-600">₹5 Cr+</span>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-2">Average Retirement Corpus</p>
              <p className="text-gray-600">Our users are on track to build substantial retirement savings</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
              <div className="w-20 h-20 bg-financial-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-financial-600">30+</span>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-2">Years of Comfortable Retirement</p>
              <p className="text-gray-600">Sustainable withdrawals with our strategic planning approach</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-financial-600 to-financial-800 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Secure Your Financial Future?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">Start planning your retirement today and ensure financial independence for tomorrow.</p>
          <Link to="/calculator">
            <Button className="bg-white text-financial-600 hover:bg-gray-100 px-10 py-7 text-lg rounded-full shadow-lg shadow-financial-800/30 font-medium hover:translate-y-[-2px] transition-all duration-300">
              Start Your Retirement Plan Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-800 text-gray-300">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <PiggyBank className="h-10 w-10 text-financial-400 mr-3" />
              <span className="text-2xl font-semibold text-white">RetireBeforeYouTire</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <Link to="/calculator" className="hover:text-white hover:underline text-center md:text-left">Calculator</Link>
              <Link to="/investments" className="hover:text-white hover:underline text-center md:text-left">Investments</Link>
              <Link to="/withdrawal" className="hover:text-white hover:underline text-center md:text-left">Withdrawal</Link>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-10 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} RetireBeforeYouTire. All rights reserved.</p>
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
  color: string;
}

function FeatureCard({ title, description, icon, linkTo, linkText, color }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className={`bg-gradient-to-r ${color} p-6 flex justify-center`}>
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <CardHeader className="pb-2 pt-6">
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Link to={linkTo}>
          <Button className="bg-financial-50 text-financial-700 hover:bg-financial-100 hover:text-financial-800">
            {linkText} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
