
import { MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">LehrerStimme Bayern</h1>
                <p className="text-blue-100 text-sm">Feedback-Plattform für Lehrkräfte</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 pl-6 border-l border-blue-400">
              <span className="text-blue-100 text-sm font-medium">Ein Service von:</span>
              <img 
                src="/lovable-uploads/c9ee70a6-5fa5-466b-97f7-51be52c56702.png" 
                alt="Zukunft Digitale Bildung Logo" 
                className="h-16 w-auto"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => window.location.href = '/teacher-register'}
                variant="outline"
                className="text-muted-foreground border-muted hover:bg-muted/20 bg-muted/10"
              >
                Teacher Registration
              </Button>
              <Button
                onClick={() => window.location.href = '/teacher-login'}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Teacher Login
              </Button>
              <Button
                onClick={() => window.location.href = '/login'}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                ZDB Login
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <Users className="h-4 w-4" />
              <span className="text-sm">Ihre Stimme zählt</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
