
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, AlertTriangle } from "lucide-react";

interface InvestmentOption {
  id: string;
  name: string;
  description: string;
  expectedReturn: string;
  riskLevel: "Low" | "Moderate" | "High";
  suitability: string;
  advantages: string[];
  category: "mutual-funds" | "sip" | "other";
  source: string;
}

const investmentOptions: InvestmentOption[] = [
  {
    id: "debt-mutual-funds",
    name: "Debt Mutual Funds",
    description: "Fixed income instruments like government bonds and corporate debt",
    expectedReturn: "6%–8%",
    riskLevel: "Low",
    suitability: "Conservative investors or those nearing retirement",
    advantages: [
      "Stable income generation",
      "Capital preservation focus",
      "Tax-efficient compared to bank fixed deposits over 3+ years"
    ],
    category: "mutual-funds",
    source: "AMFI India"
  },
  {
    id: "ppf",
    name: "Public Provident Fund (PPF)",
    description: "Government-backed savings scheme with tax benefits",
    expectedReturn: "7.1%",
    riskLevel: "Low",
    suitability: "Conservative investors looking for tax benefits and guaranteed returns",
    advantages: [
      "Tax-free interest",
      "Section 80C tax deduction on investment",
      "Sovereign guarantee",
      "15-year lock-in with partial withdrawal option after 7 years"
    ],
    category: "other",
    source: "India Post"
  },
  {
    id: "nps",
    name: "National Pension System (NPS)",
    description: "Government-sponsored pension program",
    expectedReturn: "8%–10%",
    riskLevel: "Moderate",
    suitability: "Long-term retirement planning with tax benefits",
    advantages: [
      "Additional tax deduction under Section 80CCD(1B)",
      "Choice of asset allocation between equity, corporate debt, and government securities",
      "Low fund management charges",
      "Annuity option at retirement"
    ],
    category: "other",
    source: "NPS Trust"
  },
  {
    id: "balanced-advantage-funds",
    name: "Balanced Advantage Funds",
    description: "Dynamic allocation between equity and debt based on market conditions",
    expectedReturn: "9%–11%",
    riskLevel: "Moderate",
    suitability: "Investors looking for moderated returns with lower volatility",
    advantages: [
      "Built-in asset allocation strategy",
      "Professional managers handle market timing",
      "Tax efficiency compared to separate equity and debt investments"
    ],
    category: "mutual-funds",
    source: "AMFI India"
  },
  {
    id: "equity-mutual-funds",
    name: "Equity Mutual Funds",
    description: "Focus on stocks with potential for capital appreciation",
    expectedReturn: "12%–13%",
    riskLevel: "High",
    suitability: "Investors with 7+ years horizon looking for growth",
    advantages: [
      "Higher potential returns over long term",
      "Professional fund management",
      "Multiple categories based on company size (large/mid/small cap)"
    ],
    category: "mutual-funds",
    source: "Value Research Online"
  },
  {
    id: "index-funds",
    name: "Index Funds",
    description: "Low-cost funds that track market indices like Nifty 50",
    expectedReturn: "12%–13%",
    riskLevel: "High",
    suitability: "Long-term investors looking for market returns with minimal fees",
    advantages: [
      "Lower expense ratio than actively managed funds",
      "Broad market exposure",
      "Less portfolio turnover which can reduce taxes"
    ],
    category: "mutual-funds",
    source: "Value Research Online"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property investments for rental income and capital appreciation",
    expectedReturn: "8%–12%",
    riskLevel: "High",
    suitability: "Investors looking for tangible assets and inflation hedge",
    advantages: [
      "Potential for rental income",
      "Long-term capital appreciation",
      "Hedge against inflation",
      "Can be leveraged through mortgage"
    ],
    category: "other",
    source: "Market Estimates"
  },
  {
    id: "gold",
    name: "Gold",
    description: "Investment in physical gold, gold ETFs, or sovereign gold bonds",
    expectedReturn: "7%–9%",
    riskLevel: "Moderate",
    suitability: "Portfolio diversification and hedge against economic uncertainty",
    advantages: [
      "Store of value during economic crises",
      "Hedge against currency depreciation",
      "Low correlation with other asset classes",
      "Sovereign Gold Bonds offer additional interest"
    ],
    category: "other",
    source: "RBI trends and long-term gold ETF data"
  }
];

export function InvestmentRecommendations() {
  const [riskTolerance, setRiskTolerance] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");

  // Filter and sort investment options based on user selections
  const getFilteredAndSortedOptions = () => {
    let filtered = investmentOptions;

    // Filter by risk tolerance
    if (riskTolerance) {
      filtered = filtered.filter(option => {
        if (riskTolerance === "Low") return option.riskLevel === "Low";
        if (riskTolerance === "Moderate") return option.riskLevel === "Moderate";
        if (riskTolerance === "High") return option.riskLevel === "High";
        return true;
      });
    }

    // Filter by expected return
    if (expectedReturn) {
      filtered = filtered.filter(option => option.expectedReturn === expectedReturn);
    }

    // Sort by recommendation score (prioritize based on filters)
    return filtered.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Score based on risk tolerance match
      if (riskTolerance) {
        if (riskTolerance === "Low" && a.riskLevel === "Low") scoreA += 3;
        if (riskTolerance === "Moderate" && a.riskLevel === "Moderate") scoreA += 3;
        if (riskTolerance === "High" && a.riskLevel === "High") scoreA += 3;
        
        if (riskTolerance === "Low" && b.riskLevel === "Low") scoreB += 3;
        if (riskTolerance === "Moderate" && b.riskLevel === "Moderate") scoreB += 3;
        if (riskTolerance === "High" && b.riskLevel === "High") scoreB += 3;
      }

      return scoreB - scoreA;
    });
  };

  const filteredOptions = getFilteredAndSortedOptions();

  // Get unique values for filters
  const uniqueReturns = [...new Set(investmentOptions.map(option => option.expectedReturn))];

  return (
    <TooltipProvider>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-financial-700">Investment Recommendations</CardTitle>
          <CardDescription className="text-center">
            Smart investment options to reach your retirement goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* SEBI Disclaimer */}
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm text-yellow-800">
              <strong>⚠️ Disclaimer:</strong> This tool is intended for educational and informational purposes only. 
              Return estimates and risk classifications are based on historical data from public and SEBI-recognized sources 
              (AMFI, Value Research Online, India Post, NPS Trust). This does not constitute investment advice. 
              Please consult a SEBI-registered financial advisor before making investment decisions.
            </AlertDescription>
          </Alert>

          {/* Filter Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Filter Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium">How much risk are you ready to take?</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        <strong>Low:</strong> PPF, Debt Mutual Funds<br/>
                        <strong>Moderate:</strong> NPS, Balanced Advantage Funds, Gold<br/>
                        <strong>High:</strong> Equity Mutual Funds, Index Funds, Real Estate
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium">Expected Returns (Annualized)</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Returns based on historical data from SEBI-recognized sources including AMFI, 
                        Value Research Online, India Post, and NPS Trust
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={expectedReturn} onValueChange={setExpectedReturn}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expected return" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueReturns.sort((a, b) => {
                      // Sort by the first number in the range
                      const aNum = parseFloat(a.split('%')[0]);
                      const bNum = parseFloat(b.split('%')[0]);
                      return aNum - bNum;
                    }).map(returnRate => (
                      <SelectItem key={returnRate} value={returnRate}>{returnRate}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(riskTolerance || expectedReturn) && (
              <div className="mt-4">
                <button 
                  onClick={() => {
                    setRiskTolerance("");
                    setExpectedReturn("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          <Tabs defaultValue="recommendations">
            <TabsList className="w-full grid grid-cols-1 mb-6">
              <TabsTrigger value="recommendations">Personalized Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="space-y-4">
              {filteredOptions.length > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-muted-foreground">
                      Showing {filteredOptions.length} investment option(s) based on your preferences
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredOptions.map((option, index) => (
                      <div key={option.id}>
                        <div className="flex items-center gap-2 mb-2">
                          {index === 0 && (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Most Recommended
                            </Badge>
                          )}
                          {index === filteredOptions.length - 1 && filteredOptions.length > 1 && (
                            <Badge variant="outline">
                              Least Recommended
                            </Badge>
                          )}
                        </div>
                        <InvestmentOptionCard {...option} />
                        {index < filteredOptions.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No investment options match your current filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

interface InvestmentOptionCardProps {
  name: string;
  description: string;
  expectedReturn: string;
  riskLevel: string;
  suitability: string;
  advantages: string[];
  source: string;
}

function InvestmentOptionCard({
  name,
  description,
  expectedReturn,
  riskLevel,
  suitability,
  advantages,
  source
}: InvestmentOptionCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="font-medium text-financial-700">{name}</h4>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-gray-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Source: {source}</p>
          </TooltipContent>
        </Tooltip>
      </div>
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
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          <strong>Data Source:</strong> {source}
        </p>
      </div>
    </div>
  );
}
