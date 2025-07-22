import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";
import PollsSection from "@/components/PollsSection";
import FAQ from "@/components/FAQ";
import { MessageSquareText, Info, Shield, Users, Target, Vote, Home as HomeIcon, AlertCircle, HelpCircle } from "lucide-react";
const Home = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [teacherUser, setTeacherUser] = useState<any>(null);
  useEffect(() => {
    // Check if teacher is logged in
    const checkTeacherAuth = () => {
      const teacherAuthenticated = localStorage.getItem("teacher_authenticated") === "true";
      const teacherUserData = localStorage.getItem("teacher_user");
      if (teacherAuthenticated && teacherUserData) {
        setIsTeacherLoggedIn(true);
        setTeacherUser(JSON.parse(teacherUserData));
      } else {
        setIsTeacherLoggedIn(false);
        setTeacherUser(null);
      }
    };

    // Initial check
    checkTeacherAuth();

    // Listen for storage changes (when logout happens from header)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "teacher_authenticated" || e.key === "teacher_user") {
        checkTeacherAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events (for same-tab changes)
    const handleAuthChange = () => checkTeacherAuth();
    window.addEventListener("teacherAuthChanged", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("teacherAuthChanged", handleAuthChange);
    };
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Wir verstärken Ihre Stimme für bessere Bildung in Bayern</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Als Lehrkraft erleben Sie die Chancen und Herausforderungen digitaler Bildung direkt. Teilen Sie Ihr Feedback direkt mit uns und helfen Sie dabei, das Bildungssystem zu verbessern.</p>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="home" className="flex items-center space-x-2">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center space-x-2">
                <MessageSquareText className="h-4 w-4" />
                <span>Feedback geben</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>Informationen</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="flex justify-center">
              <div className="w-full max-w-4xl">
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
                    <h3 className="font-semibold text-gray-900 mb-2">Direkte Einflussnahme</h3>
                    <p className="text-gray-600 text-sm">Wir sammeln Ihr Feedback, um direkt Einfluss auf die Digitalpolitik im bayerischen Schulsystem zu nehmen

                  </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                    <Users className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Gemeinsam stark</h3>
                    <p className="text-gray-600 text-sm">Wir vertreten Ihre Vorschläge, um gemeinsam eine digitalere und bessere Bildungslandschaft in Bayern zu schaffen</p>
                  </div>
                </div>

                {/* Welcome Content */}
                <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Willkommen bei LehrerStimme Bayern
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Diese Plattform wurde entwickelt, um Lehrkräften in Bayern eine direkte 
                    Kommunikationsmöglichkeit mit dem Kultusministerium zu bieten.
                  </p>
                  <Button onClick={() => {
                  if (isTeacherLoggedIn) {
                    setActiveTab("feedback");
                  } else {
                    window.location.href = '/teacher-login';
                  }
                }} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {isTeacherLoggedIn ? 'Feedback geben' : 'Anmelden für Feedback'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="flex justify-center">
              <div className="w-full max-w-4xl">
                {!isTeacherLoggedIn ? <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-8 text-center">
                    <AlertCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Wir müssen sicherstellen, dass Sie eine Lehrkraft sind</h3>
                    <p className="text-gray-600 mb-6">Um Missbrauch zu vermeiden dürfen nur verifizierte Lehrkräfte mit einer @schule.bayern.de E-Mail-Adresse an der Feedback-Plattform teilnehmen. Wir bitten um Verständnis.</p>
                    <div className="flex justify-center space-x-4">
                      <Button onClick={() => window.location.href = '/teacher-login'} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Anmelden
                      </Button>
                      <Button onClick={() => window.location.href = '/teacher-register'} variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                        Registrieren
                      </Button>
                    </div>
                  </div> : <div>
                    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4 mb-6">
                      <p className="text-green-600 font-medium">
                        Willkommen, {teacherUser?.firstName} {teacherUser?.lastName}! 
                        Sie sind als Lehrkraft angemeldet.
                      </p>
                    </div>
                    <Tabs defaultValue="text" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="text">Feedback senden</TabsTrigger>
                        <TabsTrigger value="polls">Umfragen</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="text">
                        <FeedbackForm />
                      </TabsContent>
                      
                      <TabsContent value="polls">
                        <PollsSection />
                      </TabsContent>
                    </Tabs>
                  </div>}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="flex justify-center">
              <FAQ />
            </TabsContent>

            <TabsContent value="info" className="flex justify-center">
              <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm border border-blue-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Über LehrerStimme Bayern</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Unser Ziel</h4>
                    <p className="text-gray-600">LehrerStimme Bayern ist eine unabhängige Plattform, die von der gemeinnützigen Organisation Zukunft Digitale Bildung betrieben wird. Unser Ziel ist es, Lehrkräften in Bayern eine Stimme zu geben – direkt, unkompliziert und vertraulich.



Wir möchten Lehrkräften die Möglichkeit bieten, ihre Erfahrungen und Perspektiven zur aktuellen Bildungssituation mitzuteilen. Das Feedback kann von Politik und Verwaltung – etwa dem Bayerischen Kultusministerium – freiwillig genutzt werden, ist aber nicht Teil eines offiziellen Beteiligungsverfahrens.</p>
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
          <p className="text-sm text-blue-200">Im Auftrag von Zukunft Digitale Bildung</p>
          <div className="mt-4">
            <Button onClick={() => window.location.href = '/login'} variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              ZDB Login
            </Button>
          </div>
        </div>
      </footer>
    </div>;
};
export default Home;