
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export function InvestmentRecommendations() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-financial-700">Investment Recommendations</CardTitle>
        <CardDescription className="text-center">
          Smart investment options to reach your retirement goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mutual-funds">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
            <TabsTrigger value="sip">SIPs</TabsTrigger>
            <TabsTrigger value="other">Other Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mutual-funds" className="space-y-4">
            <h3 className="text-lg font-medium">Recommended Mutual Funds</h3>
            <p className="text-muted-foreground">
              Mutual funds pool money from many investors to purchase securities, providing diversification and professional management.
            </p>
            
            <div className="space-y-4 mt-6">
              <InvestmentOption 
                name="Index Funds" 
                description="Low-cost funds that track market indices like Nifty 50"
                expectedReturn="10-12%"
                riskLevel="Moderate"
                suitability="Long-term investors looking for market returns with minimal fees"
                advantages={[
                  "Lower expense ratio than actively managed funds",
                  "Broad market exposure",
                  "Less portfolio turnover which can reduce taxes"
                ]}
              />
              
              <Separator />
              
              <InvestmentOption 
                name="Equity Mutual Funds" 
                description="Focus on stocks with potential for capital appreciation"
                expectedReturn="12-15%"
                riskLevel="High"
                suitability="Investors with 7+ years horizon looking for growth"
                advantages={[
                  "Higher potential returns over long term",
                  "Professional fund management",
                  "Multiple categories based on company size (large/mid/small cap)"
                ]}
              />
              
              <Separator />
              
              <InvestmentOption 
                name="Balanced Advantage Funds" 
                description="Dynamic allocation between equity and debt based on market conditions"
                expectedReturn="9-12%"
                riskLevel="Moderate"
                suitability="Investors looking for moderated returns with lower volatility"
                advantages={[
                  "Built-in asset allocation strategy",
                  "Professional managers handle market timing",
                  "Tax efficiency compared to separate equity and debt investments"
                ]}
              />
              
              <Separator />
              
              <InvestmentOption 
                name="Debt Mutual Funds" 
                description="Fixed income instruments like government bonds and corporate debt"
                expectedReturn="6-8%"
                riskLevel="Low to Moderate"
                suitability="Conservative investors or those nearing retirement"
                advantages={[
                  "Stable income generation",
                  "Capital preservation focus",
                  "Tax-efficient compared to bank fixed deposits over 3+ years"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="sip" className="space-y-4">
            <h3 className="text-lg font-medium">Systematic Investment Plans (SIPs)</h3>
            <p className="text-muted-foreground">
              SIPs allow you to invest regularly in mutual funds, benefiting from rupee cost averaging and compounding.
            </p>
            
            <div className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Benefits of SIPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Disciplined investing with fixed monthly contributions</li>
                    <li>Rupee cost averaging - buying more units when prices are low</li>
                    <li>Start with as little as ₹500 per month</li>
                    <li>Reduces the impact of market volatility over time</li>
                    <li>Power of compounding works effectively</li>
                    <li>Can be stopped or modified at any time without penalties</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SIP Strategy for Retirement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">Early Career (25-35 years)</h4>
                    <p className="text-muted-foreground">
                      Allocate 70-80% to equity funds through SIPs to maximize growth. Focus on index funds and diversified equity funds.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Mid-Career (35-45 years)</h4>
                    <p className="text-muted-foreground">
                      Maintain 60-70% equity exposure with the rest in debt funds. Consider adding balanced advantage funds to your SIP portfolio.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Pre-Retirement (45-55 years)</h4>
                    <p className="text-muted-foreground">
                      Gradually shift to 50-60% equity and increase debt allocation for stability. Consider large-cap focused funds for equity exposure.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Near Retirement (55+ years)</h4>
                    <p className="text-muted-foreground">
                      Reduce equity to 30-40% and focus on capital preservation with debt funds and liquid assets in your SIP allocation.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SIP Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you invest ₹10,000 monthly for 20 years at an average return of 12%:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Investment</p>
                      <p className="text-xl font-bold">₹24,00,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                      <p className="text-xl font-bold text-success-600">₹95,35,860</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            <h3 className="text-lg font-medium">Other Investment Options</h3>
            <p className="text-muted-foreground">
              Diversify your retirement portfolio with these additional investment vehicles.
            </p>
            
            <div className="space-y-4 mt-6">
              <InvestmentOption 
                name="Public Provident Fund (PPF)" 
                description="Government-backed savings scheme with tax benefits"
                expectedReturn="7-8%"
                riskLevel="Very Low"
                suitability="Conservative investors looking for tax benefits and guaranteed returns"
                advantages={[
                  "Tax-free interest",
                  "Section 80C tax deduction on investment",
                  "Sovereign guarantee",
                  "15-year lock-in with partial withdrawal option after 7 years"
                ]}
              />
              
              <Separator />
              
              <InvestmentOption 
                name="National Pension System (NPS)" 
                description="Government-sponsored pension program"
                expectedReturn="8-10%"
                riskLevel="Low to Moderate"
                suitability="Long-term retirement planning with tax benefits"
                advantages={[
                  "Additional tax deduction under Section 80CCD(1B)",
                  "Choice of asset allocation between equity, corporate debt, and government securities",
                  "Low fund management charges",
                  "Annuity option at retirement"
                ]}
              />
              
              <Separator />
              
              <InvestmentOption 
                name="Real Estate" 
                description="Property investments for rental income and capital appreciation"
                expectedReturn="7-10%"
                riskLevel="Moderate to High"
                suitability="Investors looking for tangible assets and inflation hedge"
                advantages={[
                  "Potential for rental income",
                  "Long-term capital appreciation",
                  "Hedge against inflation",
                  "Can be leveraged through mortgage"
                ]}
              />
              
              <Separator />
              
              <InvestmentOption 
                name="Gold" 
                description="Investment in physical gold, gold ETFs, or sovereign gold bonds"
                expectedReturn="6-8%"
                riskLevel="Moderate"
                suitability="Portfolio diversification and hedge against economic uncertainty"
                advantages={[
                  "Store of value during economic crises",
                  "Hedge against currency depreciation",
                  "Low correlation with other asset classes",
                  "Sovereign Gold Bonds offer additional interest"
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface InvestmentOptionProps {
  name: string;
  description: string;
  expectedReturn: string;
  riskLevel: string;
  suitability: string;
  advantages: string[];
}

function InvestmentOption({
  name,
  description,
  expectedReturn,
  riskLevel,
  suitability,
  advantages
}: InvestmentOptionProps) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h4 className="font-medium text-financial-700">{name}</h4>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <p className="text-xs text-muted-foreground">Expected Return</p>
          <p className="font-medium">{expectedReturn}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Risk Level</p>
          <p className="font-medium">{riskLevel}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Best For</p>
          <p className="font-medium text-sm">{suitability}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-xs text-muted-foreground">Key Advantages</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          {advantages.map((advantage, index) => (
            <li key={index} className="text-sm">{advantage}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
