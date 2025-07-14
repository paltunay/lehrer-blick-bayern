import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Users, TrendingUp } from "lucide-react";

interface PollResponse {
  id: number;
  timestamp: string;
  responses: Record<string, string>;
  anonymous: boolean;
}

interface PollStats {
  [questionId: string]: {
    [option: string]: number;
  };
}

const PollResults = () => {
  const [pollResponses, setPollResponses] = useState<PollResponse[]>([]);
  const [pollStats, setPollStats] = useState<PollStats>({});

  const pollQuestions = {
    workload_2024: {
      title: "Arbeitsbelastung Schuljahr 2024/25",
      options: ["Deutlich zu niedrig", "Zu niedrig", "Angemessen", "Zu hoch", "Deutlich zu hoch"]
    },
    digital_equipment: {
      title: "Digitale Ausstattung der Schule",
      options: ["Sehr gut", "Gut", "Ausreichend", "Mangelhaft", "Ungenügend"]
    },
    curriculum_changes: {
      title: "Geplante Lehrplanänderungen",
      options: ["Sehr positiv", "Positiv", "Neutral", "Negativ", "Sehr negativ"]
    },
    remote_teaching: {
      title: "Fortschritte digitaler Unterricht",
      options: ["Sehr große Fortschritte", "Große Fortschritte", "Moderate Fortschritte", "Geringe Fortschritte", "Keine Fortschritte"]
    },
    support_systems: {
      title: "Dringendste Unterstützung",
      options: ["Mehr Personal", "Bessere Ausstattung", "Weniger Bürokratie", "Mehr Fortbildungen", "Höhere Bezahlung"]
    }
  };

  useEffect(() => {
    const storedResponses = JSON.parse(localStorage.getItem("pollResponses") || "[]");
    setPollResponses(storedResponses);

    // Calculate statistics
    const stats: PollStats = {};
    
    Object.keys(pollQuestions).forEach(questionId => {
      stats[questionId] = {};
      pollQuestions[questionId as keyof typeof pollQuestions].options.forEach(option => {
        stats[questionId][option] = 0;
      });
    });

    storedResponses.forEach((response: PollResponse) => {
      Object.entries(response.responses).forEach(([questionId, answer]) => {
        if (stats[questionId] && stats[questionId][answer] !== undefined) {
          stats[questionId][answer]++;
        }
      });
    });

    setPollStats(stats);
  }, []);

  const getPercentage = (questionId: string, option: string, total: number) => {
    if (total === 0) return 0;
    return Math.round((pollStats[questionId]?.[option] || 0) / total * 100);
  };

  const getTotalResponses = (questionId: string) => {
    return Object.values(pollStats[questionId] || {}).reduce((sum, count) => sum + count, 0);
  };

  const getProgressColor = (percentage: number, isPositive: boolean = true) => {
    if (isPositive) {
      if (percentage >= 60) return "bg-green-500";
      if (percentage >= 30) return "bg-yellow-500";
      return "bg-red-500";
    } else {
      if (percentage >= 60) return "bg-red-500";
      if (percentage >= 30) return "bg-yellow-500";
      return "bg-green-500";
    }
  };

  if (pollResponses.length === 0) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Umfrageergebnisse</h3>
          <p className="text-gray-500">
            Sobald Umfragen beantwortet werden, erscheinen hier die Ergebnisse.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Umfrageergebnisse</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{pollResponses.length} Teilnahmen</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>Live-Ergebnisse</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(pollQuestions).map(([questionId, question]) => {
          const totalResponses = getTotalResponses(questionId);
          
          return (
            <Card key={questionId} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">{question.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  {totalResponses} Antwort{totalResponses !== 1 ? "en" : ""}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {question.options.map((option) => {
                  const count = pollStats[questionId]?.[option] || 0;
                  const percentage = getPercentage(questionId, option, totalResponses);
                  
                  return (
                    <div key={option} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">{option}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">{count}</span>
                          <span className="text-gray-400">({percentage}%)</span>
                        </div>
                      </div>
                      <Progress 
                        value={percentage} 
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Über diese Umfrage</h3>
              <p className="text-sm text-blue-700 mt-1">
                Diese Umfrage wird von Zukunft Digitale Bildung e.V. durchgeführt, um die Situation 
                von Lehrkräften in Bayern zu erfassen und politische Empfehlungen zu entwickeln. 
                Alle Antworten werden anonymisiert ausgewertet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PollResults;