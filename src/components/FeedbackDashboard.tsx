
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, MapPin, AlertCircle, BarChart } from "lucide-react";

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
  pollResponses?: Record<string, string>;
}

const FeedbackDashboard = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem("teacherFeedback") || "[]");
    setFeedback(storedFeedback.reverse()); // Show newest first
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "dringend":
        return "bg-red-100 text-red-800 border-red-200";
      case "hoch":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "mittel":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "niedrig":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (feedback.length === 0) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="p-8 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Noch kein Feedback vorhanden</h3>
          <p className="text-gray-500">
            Sobald Feedback eingereicht wird, wird es hier angezeigt.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Eingegangenes Feedback</h2>
        <Badge variant="secondary" className="text-sm">
          {feedback.length} Rückmeldung{feedback.length !== 1 ? "en" : ""}
        </Badge>
      </div>

      {feedback.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{item.subject}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                  {item.district && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.district}</span>
                    </div>
                  )}
                  {item.school && (
                    <span className="text-gray-500">• {item.school}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className={getPriorityColor(item.priority)}>
                  {item.priority === "dringend" && <AlertCircle className="h-3 w-3 mr-1" />}
                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                </Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 leading-relaxed">{item.message}</p>
            
            {/* Poll Responses */}
            {item.pollResponses && Object.keys(item.pollResponses).length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Umfrageantworten</h4>
                </div>
                <div className="space-y-2">
                  {Object.entries(item.pollResponses).map(([questionId, response]) => {
                    const questionTitles: Record<string, string> = {
                      workload: "Arbeitsbelastung",
                      digitization: "Digitale Ausstattung", 
                      support: "Ministeriums-Unterstützung",
                      training: "Fortbildungsangebot"
                    };
                    return (
                      <div key={questionId} className="text-sm">
                        <span className="font-medium text-blue-700">
                          {questionTitles[questionId] || questionId}:
                        </span>
                        <span className="ml-2 text-blue-600">{response}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                {item.name && !item.anonymous ? (
                  <span>Von: {item.name}</span>
                ) : (
                  <span className="italic">Anonymes Feedback</span>
                )}
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {item.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackDashboard;
