
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackDashboard from "@/components/FeedbackDashboard";
import { MessageSquareText, BarChart3, Info, Shield, Users, Target } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("submit");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ihre Stimme für bessere Bildung in Bayern
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Als Lehrkraft kennen Sie die Herausforderungen des Schulalltags am besten. 
            Teilen Sie Ihr Feedback direkt mit dem Bayerischen Kultusministerium und 
            helfen Sie dabei, das Bildungssystem zu verbessern.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <Shield className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Sicher & Anonym</h3>
            <p className="text-gray-600 text-sm">
              Senden Sie Ihr Feedback anonym oder mit Ihren Kontaktdaten - Sie entscheiden.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <Target className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Direkte Weiterleitung</h3>
            <p className="text-gray-600 text-sm">
              Ihr Feedback erreicht direkt die zuständigen Stellen im Kultusministerium.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <Users className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Gemeinsam stark</h3>
            <p className="text-gray-600 text-sm">
              Ihre Erfahrungen fließen in wichtige bildungspolitische Entscheidungen ein.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="submit" className="flex items-center space-x-2">
                <MessageSquareText className="h-4 w-4" />
                <span>Feedback senden</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Übersicht</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>Informationen</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="submit" className="flex justify-center">
              <FeedbackForm />
            </TabsContent>

            <TabsContent value="dashboard" className="flex justify-center">
              <FeedbackDashboard />
            </TabsContent>

            <TabsContent value="info" className="flex justify-center">
              <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm border border-blue-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Über LehrerStimme Bayern</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Unser Ziel</h4>
                    <p className="text-gray-600">
                      Diese Plattform wurde entwickelt, um Lehrkräften in Bayern eine direkte Kommunikationsmöglichkeit 
                      mit dem Kultusministerium zu bieten. Ihre Erfahrungen und Vorschläge sind wertvoll für die 
                      Weiterentwicklung des bayerischen Bildungssystems.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Datenschutz</h4>
                    <p className="text-gray-600">
                      Wir nehmen den Schutz Ihrer Daten ernst. Sie können wählen, ob Sie Ihr Feedback anonym 
                      oder mit Ihren Kontaktdaten senden möchten. Alle Daten werden gemäß der DSGVO verarbeitet 
                      und nur für die Bearbeitung Ihres Feedbacks verwendet.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Kategorien</h4>
                    <p className="text-gray-600 mb-3">
                      Ihr Feedback wird nach folgenden Kategorien strukturiert:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Lehrplan und Curriculum</li>
                      <li>Arbeitsbedingungen</li>
                      <li>Ressourcen und Ausstattung</li>
                      <li>Digitalisierung</li>
                      <li>Inklusion und Förderung</li>
                      <li>Verwaltung und Bürokratie</li>
                      <li>Fortbildung und Entwicklung</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Kontakt</h4>
                    <p className="text-gray-600">
                      Bei Fragen zur Plattform oder zum Feedback-Prozess wenden Sie sich an das 
                      Bayerische Staatsministerium für Unterricht und Kultus.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-blue-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            © 2024 LehrerStimme Bayern - Eine Initiative für bessere Bildung
          </p>
          <p className="text-sm text-blue-200">
            Im Auftrag des Bayerischen Staatsministeriums für Unterricht und Kultus
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
