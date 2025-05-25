
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface InvestmentOption {
  id: string;
  name: string;
  description: string;
  expectedReturn: string;
  riskLevel: "Very Low" | "Low" | "Moderate" | "High";
  suitability: string;
  advantages: string[];
  category: "mutual-funds" | "sip" | "other";
}

const investmentOptions: InvestmentOption[] = [
  {
    id: "index-funds",
    name: "Index Funds",
    description: "Low-cost funds that track market indices like Nifty 50",
    expectedReturn: "10-12%",
    riskLevel: "Moderate",
    suitability: "Long-term investors looking for market returns with minimal fees",
    advantages: [
      "Lower expense ratio than actively managed funds",
      "Broad market exposure",
      "Less portfolio turnover which can reduce taxes"
    ],
    category: "mutual-funds"
  },
  {
    id: "equity-mutual-funds",
    name: "Equity Mutual Funds",
    description: "Focus on stocks with potential for capital appreciation",
    expectedReturn: "12-15%",
    riskLevel: "High",
    suitability: "Investors with 7+ years horizon looking for growth",
    advantages: [
      "Higher potential returns over long term",
      "Professional fund management",
      "Multiple categories based on company size (large/mid/small cap)"
    ],
    category: "mutual-funds"
  },
  {
    id: "balanced-advantage-funds",
    name: "Balanced Advantage Funds",
    description: "Dynamic allocation between equity and debt based on market conditions",
    expectedReturn: "9-12%",
    riskLevel: "Moderate",
    suitability: "Investors looking for moderated returns with lower volatility",
    advantages: [
      "Built-in asset allocation strategy",
      "Professional managers handle market timing",
      "Tax efficiency compared to separate equity and debt investments"
    ],
    category: "mutual-funds"
  },
  {
    id: "debt-mutual-funds",
    name: "Debt Mutual Funds",
    description: "Fixed income instruments like government bonds and corporate debt",
    expectedReturn: "6-8%",
    riskLevel: "Low",
    suitability: "Conservative investors or those nearing retirement",
    advantages: [
      "Stable income generation",
      "Capital preservation focus",
      "Tax-efficient compared to bank fixed deposits over 3+ years"
    ],
    category: "mutual-funds"
  },
  {
    id: "ppf",
    name: "Public Provident Fund (PPF)",
    description: "Government-backed savings scheme with tax benefits",
    expectedReturn: "7-8%",
    riskLevel: "Very Low",
    suitability: "Conservative investors looking for tax benefits and guaranteed returns",
    advantages: [
      "Tax-free interest",
      "Section 80C tax deduction on investment",
      "Sovereign guarantee",
      "15-year lock-in with partial withdrawal option after 7 years"
    ],
    category: "other"
  },
  {
    id: "nps",
    name: "National Pension System (NPS)",
    description: "Government-sponsored pension program",
    expectedReturn: "8-10%",
    riskLevel: "Low",
    suitability: "Long-term retirement planning with tax benefits",
    advantages: [
      "Additional tax deduction under Section 80CCD(1B)",
      "Choice of asset allocation between equity, corporate debt, and government securities",
      "Low fund management charges",
      "Annuity option at retirement"
    ],
    category: "other"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property investments for rental income and capital appreciation",
    expectedReturn: "7-10%",
    riskLevel: "Moderate",
    suitability: "Investors looking for tangible assets and inflation hedge",
    advantages: [
      "Potential for rental income",
      "Long-term capital appreciation",
      "Hedge against inflation",
      "Can be leveraged through mortgage"
    ],
    category: "other"
  },
  {
    id: "gold",
    name: "Gold",
    description: "Investment in physical gold, gold ETFs, or sovereign gold bonds",
    expectedReturn: "6-8%",
    riskLevel: "Moderate",
    suitability: "Portfolio diversification and hedge against economic uncertainty",
    advantages: [
      "Store of value during economic crises",
      "Hedge against currency depreciation",
      "Low correlation with other asset classes",
      "Sovereign Gold Bonds offer additional interest"
    ],
    category: "other"
  }
];

export function InvestmentRecommendations() {
  const [riskTolerance, setRiskTolerance] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [bestFor, setBestFor] = useState<string>("");

  // Filter and sort investment options based on user selections
  const getFilteredAndSortedOptions = () => {
    let filtered = investmentOptions;

    // Filter by risk tolerance
    if (riskTolerance) {
      filtered = filtered.filter(option => {
        if (riskTolerance === "Low") return ["Very Low", "Low"].includes(option.riskLevel);
        if (riskTolerance === "Moderate") return ["Low", "Moderate"].includes(option.riskLevel);
        if (riskTolerance === "High") return ["Moderate", "High"].includes(option.riskLevel);
        return true;
      });
    }

    // Filter by expected return
    if (expectedReturn) {
      filtered = filtered.filter(option => option.expectedReturn === expectedReturn);
    }

    // Filter by suitability
    if (bestFor) {
      filtered = filtered.filter(option => 
        option.suitability.toLowerCase().includes(bestFor.toLowerCase())
      );
    }

    // Sort by recommendation score (prioritize based on filters)
    return filtered.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Score based on risk tolerance match
      if (riskTolerance) {
        if (riskTolerance === "Low" && ["Very Low", "Low"].includes(a.riskLevel)) scoreA += 3;
        if (riskTolerance === "Moderate" && a.riskLevel === "Moderate") scoreA += 3;
        if (riskTolerance === "High" && a.riskLevel === "High") scoreA += 3;
        
        if (riskTolerance === "Low" && ["Very Low", "Low"].includes(b.riskLevel)) scoreB += 3;
        if (riskTolerance === "Moderate" && b.riskLevel === "Moderate") scoreB += 3;
        if (riskTolerance === "High" && b.riskLevel === "High") scoreB += 3;
      }

      return scoreB - scoreA;
    });
  };

  const filteredOptions = getFilteredAndSortedOptions();

  // Get unique values for filters
  const uniqueReturns = [...new Set(investmentOptions.map(option => option.expectedReturn))];
  const uniqueSuitabilities = [
    "Conservative investors",
    "Long-term investors", 
    "Growth investors",
    "Retirement planning",
    "Tax benefits",
    "Inflation hedge"
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-financial-700">Investment Recommendations</CardTitle>
        <CardDescription className="text-center">
          Smart investment options to reach your retirement goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filter Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Filter Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">How much risk are you ready to take?</label>
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
              <label className="block text-sm font-medium mb-2">Expected Returns</label>
              <Select value={expectedReturn} onValueChange={setExpectedReturn}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expected return" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueReturns.map(returnRate => (
                    <SelectItem key={returnRate} value={returnRate}>{returnRate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Best For</label>
              <Select value={bestFor} onValueChange={setBestFor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select investor type" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueSuitabilities.map(suitability => (
                    <SelectItem key={suitability} value={suitability}>{suitability}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(riskTolerance || expectedReturn || bestFor) && (
            <div className="mt-4">
              <button 
                onClick={() => {
                  setRiskTolerance("");
                  setExpectedReturn("");
                  setBestFor("");
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
  );
}

interface InvestmentOptionCardProps {
  name: string;
  description: string;
  expectedReturn: string;
  riskLevel: string;
  suitability: string;
  advantages: string[];
}

function InvestmentOptionCard({
  name,
  description,
  expectedReturn,
  riskLevel,
  suitability,
  advantages
}: InvestmentOptionCardProps) {
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
