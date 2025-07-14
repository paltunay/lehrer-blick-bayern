import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, School } from "lucide-react";

interface Teacher {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with test user if not exists
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    const testUserExists = teachers.some((teacher: Teacher) => teacher.email === "testuser@schule.bayern.de");
    
    if (!testUserExists) {
      const testUser: Teacher = {
        email: "testuser@schule.bayern.de",
        firstName: "Test",
        lastName: "User",
        password: "password"
      };
      teachers.push(testUser);
      localStorage.setItem("teachers", JSON.stringify(teachers));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Get registered teachers from localStorage
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    const teacher = teachers.find((t: Teacher) => t.email === email && t.password === password);

    if (teacher) {
      // Store login state in localStorage
      localStorage.setItem("teacher_authenticated", "true");
      localStorage.setItem("teacher_user", JSON.stringify(teacher));
      
      toast({
        title: "Erfolgreich angemeldet",
        description: `Willkommen, ${teacher.firstName} ${teacher.lastName}!`,
      });
      
      navigate("/");
    } else {
      setError("Ungültige Anmeldedaten. Bitte überprüfen Sie Ihre E-Mail-Adresse und Ihr Passwort.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <School className="h-8 w-8 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold">Lehrer-Anmeldung</CardTitle>
          </div>
          <CardDescription>
            Melden Sie sich mit Ihren Lehrer-Zugangsdaten an
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@schule.bayern.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Passwort eingeben"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Anmelden..." : "Anmelden"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Noch kein Account?</p>
            <div className="mt-2">
              <Button 
                variant="link" 
                onClick={() => navigate("/teacher-register")}
                className="text-blue-600 hover:text-blue-700"
              >
                Jetzt registrieren
              </Button>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">Test-Anmeldedaten:</p>
              <p>E-Mail: <code className="bg-gray-200 px-1 rounded">testuser@schule.bayern.de</code></p>
              <p>Passwort: <code className="bg-gray-200 px-1 rounded">password</code></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherLogin;