import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FeedbackDashboard from "@/components/FeedbackDashboard";
import FeedbackAISummary from "@/components/FeedbackAISummary";
import PollResults from "@/components/PollResults";
import { BarChart3, TrendingUp, LogOut, Users, MessageSquare, Brain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Backend = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("zdb_authenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("zdb_authenticated");
    localStorage.removeItem("zdb_user");
    toast({
      title: "Erfolgreich abgemeldet",
      description: "Sie wurden aus dem Backend-Bereich abgemeldet",
    });
    navigate("/");
  };

  const username = localStorage.getItem("zdb_user") || "Admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">ZDB Backend</h1>
              <p className="text-blue-100 text-sm">Feedback-Verwaltung für Zukunft Digitale Bildung</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-blue-100">Willkommen, {username}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Übersicht</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="ai-summary" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>KI-Analyse</span>
            </TabsTrigger>
            <TabsTrigger value="polls" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Umfrageergebnisse</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gesamtes Feedback</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">147</div>
                  <p className="text-xs text-muted-foreground">+12% gegenüber letztem Monat</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aktive Umfragen</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">2 neue diese Woche</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Teilnehmer</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+7% gegenüber letztem Monat</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Willkommen im ZDB Backend</CardTitle>
                <CardDescription>
                  Hier haben Sie Zugriff auf alle eingereichten Feedback-Beiträge und Umfrageergebnisse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Nutzen Sie die Tabs oben, um zwischen den verschiedenen Bereichen zu navigieren:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li><strong>Feedback:</strong> Detaillierte Übersicht aller eingereichten Feedback-Beiträge</li>
                  <li><strong>KI-Analyse:</strong> Intelligente Auswertung und Erkenntnisse aus dem Feedback</li>
                  <li><strong>Umfrageergebnisse:</strong> Visualisierung und Analyse der Umfragedaten</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackDashboard />
          </TabsContent>

          <TabsContent value="ai-summary">
            <FeedbackAISummary />
          </TabsContent>

          <TabsContent value="polls">
            <PollResults />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Backend;