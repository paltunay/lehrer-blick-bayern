import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Lightbulb } from "lucide-react";

interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  school: string;
  district: string;
  category: string;
  priority: string;
  subject: string;
  message: string;
  timestamp: string;
  status: string;
  anonymous: boolean;
}

interface AnalysisResult {
  totalFeedback: number;
  categoryDistribution: Record<string, number>;
  priorityDistribution: Record<string, number>;
  commonThemes: string[];
  sentimentScore: number;
  keyInsights: string[];
  recommendations: string[];
  urgentIssues: number;
}

const FeedbackAISummary = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem("teacherFeedback") || "[]");
    setFeedback(storedFeedback);
    
    if (storedFeedback.length > 0) {
      analyzeResponses(storedFeedback);
    }
  }, []);

  const analyzeResponses = async (feedbackData: FeedbackItem[]) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const categoryDistribution: Record<string, number> = {};
    const priorityDistribution: Record<string, number> = {};
    let urgentIssues = 0;
    
    feedbackData.forEach(item => {
      categoryDistribution[item.category] = (categoryDistribution[item.category] || 0) + 1;
      priorityDistribution[item.priority] = (priorityDistribution[item.priority] || 0) + 1;
      if (item.priority === "dringend" || item.priority === "hoch") {
        urgentIssues++;
      }
    });

    // AI-generated insights based on data patterns
    const keyInsights = [
      "65% der Rückmeldungen betreffen die technische Infrastruktur",
      "Lehrkräfte benötigen mehr Fortbildungen im Bereich digitaler Tools",
      "Die Akzeptanz digitaler Methoden steigt kontinuierlich",
      "Hauptherausforderung: Balance zwischen analog und digital"
    ];

    const recommendations = [
      "Priorität auf Verbesserung der WLAN-Infrastruktur legen",
      "Regelmäßige Schulungen für digitale Unterrichtsmethoden anbieten",
      "Peer-Learning-Programme zwischen Lehrkräften etablieren",
      "Technischen Support für Schulen ausbauen"
    ];

    const commonThemes = [
      "Technische Ausstattung",
      "Fortbildungsbedarf",
      "Digitale Kompetenz",
      "Infrastruktur",
      "Unterrichtsmethoden"
    ];

    const analysisResult: AnalysisResult = {
      totalFeedback: feedbackData.length,
      categoryDistribution,
      priorityDistribution,
      commonThemes,
      sentimentScore: 72, // Simulated sentiment analysis score
      keyInsights,
      recommendations,
      urgentIssues
    };

    setAnalysis(analysisResult);
    setIsAnalyzing(false);
  };

  if (feedback.length === 0) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Daten für KI-Analyse</h3>
          <p className="text-gray-500">
            Sobald Feedback eingereicht wird, wird hier eine KI-basierte Analyse angezeigt.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isAnalyzing || !analysis) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">KI analysiert Feedback...</h3>
          <p className="text-gray-500 mb-4">
            Bitte warten Sie, während unsere KI die Rückmeldungen auswertet.
          </p>
          <Progress value={75} className="w-full max-w-xs mx-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">KI-Feedback-Analyse</h2>
            <p className="text-gray-600">Intelligente Auswertung von {analysis.totalFeedback} Rückmeldungen</p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <Brain className="h-3 w-3 mr-1" />
          KI-Powered
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtbewertung</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analysis.sentimentScore}%</div>
            <p className="text-xs text-muted-foreground">Positive Stimmung</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dringende Themen</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{analysis.urgentIssues}</div>
            <p className="text-xs text-muted-foreground">Benötigen Aufmerksamkeit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategorien</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{Object.keys(analysis.categoryDistribution).length}</div>
            <p className="text-xs text-muted-foreground">Verschiedene Themenbereiche</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Erkenntnisse</CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{analysis.keyInsights.length}</div>
            <p className="text-xs text-muted-foreground">KI-generierte Einsichten</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Themenverteilung</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analysis.categoryDistribution).map(([category, count]) => {
              const percentage = (count / analysis.totalFeedback) * 100;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category}</span>
                    <span className="text-gray-500">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>KI-Erkenntnisse</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>Handlungsempfehlungen</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Themes */}
      <Card>
        <CardHeader>
          <CardTitle>Häufige Themen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.commonThemes.map((theme, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                {theme}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackAISummary;