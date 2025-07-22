import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
const Header = () => {
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [teacherUser, setTeacherUser] = useState<any>(null);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Check if teacher is logged in
    const teacherAuthenticated = localStorage.getItem("teacher_authenticated") === "true";
    const teacherUserData = localStorage.getItem("teacher_user");
    if (teacherAuthenticated && teacherUserData) {
      setIsTeacherLoggedIn(true);
      setTeacherUser(JSON.parse(teacherUserData));
    }
  }, []);
  const handleTeacherLogout = () => {
    localStorage.removeItem("teacher_authenticated");
    localStorage.removeItem("teacher_user");
    setIsTeacherLoggedIn(false);
    setTeacherUser(null);

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("teacherAuthChanged"));
    toast({
      title: "Erfolgreich abgemeldet",
      description: "Sie wurden als Lehrkraft abgemeldet"
    });
    navigate("/");
  };
  return <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">LehrerStimme Bayern</h1>
                <p className="text-blue-100 text-sm">Unabhängige Feedback-Plattform für Lehrkräfte</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 pl-6 border-l border-blue-400">
              <span className="text-blue-100 text-sm font-medium">Ein Service von:</span>
              <img src="/lovable-uploads/c9ee70a6-5fa5-466b-97f7-51be52c56702.png" alt="Zukunft Digitale Bildung Logo" className="h-16 w-auto" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isTeacherLoggedIn ? <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Angemeldet als:</p>
                  <p className="font-medium">{teacherUser?.firstName} {teacherUser?.lastName}</p>
                </div>
                <Button onClick={handleTeacherLogout} variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div> : <div className="flex items-center space-x-2">
                <Button onClick={() => window.location.href = '/teacher-register'} variant="outline" className="border-muted text-[blue-60] text-slate-50 bg-slate-950 hover:bg-slate-800">
                  Teacher Registration
                </Button>
                <Button onClick={() => window.location.href = '/teacher-login'} variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  Teacher Login
                </Button>
              </div>}
            <div className="flex items-center space-x-2 text-blue-100">
              <Users className="h-4 w-4" />
              <span className="text-sm">Ihre Stimme zählt</span>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;