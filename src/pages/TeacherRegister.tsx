import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Mail, User, Lock, School } from "lucide-react";

const TeacherRegister = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return email.endsWith("@schule.bayern.de");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate email domain
    if (!validateEmail(email)) {
      setError("Registrierung ist nur mit einer @schule.bayern.de E-Mail-Adresse möglich.");
      setLoading(false);
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      setLoading(false);
      return;
    }

    // Store user in localStorage
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    const newTeacher = {
      email,
      firstName,
      lastName,
      password
    };
    teachers.push(newTeacher);
    localStorage.setItem("teachers", JSON.stringify(teachers));

    setTimeout(() => {
      toast({
        title: "Registrierung erfolgreich",
        description: "Ihr Lehrer-Account wurde erfolgreich erstellt. Sie können sich nun anmelden.",
      });
      
      navigate("/teacher-login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <School className="h-8 w-8 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold">Lehrer-Registrierung</CardTitle>
          </div>
          <CardDescription>
            Registrieren Sie sich mit Ihrer @schule.bayern.de E-Mail-Adresse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Vorname</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Vorname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Nachname</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Passwort bestätigen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Registrierung läuft..." : "Registrieren"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Nur Lehrkräfte mit einer gültigen @schule.bayern.de E-Mail-Adresse können sich registrieren.</p>
            <div className="mt-2">
              <Button 
                variant="link" 
                onClick={() => navigate("/")}
                className="text-blue-600 hover:text-blue-700"
              >
                Zurück zur Startseite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherRegister;