import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Send, Lock, User } from "lucide-react";
interface FeedbackData {
  name: string;
  email: string;
  school: string;
  district: string;
  category: string;
  priority: string;
  subject: string;
  message: string;
  anonymous: boolean;
}
const FeedbackForm = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    school: "",
    district: "",
    category: "",
    priority: "",
    subject: "",
    message: "",
    anonymous: false
  });
  const districts = ["Oberbayern", "Niederbayern", "Oberpfalz", "Oberfranken", "Mittelfranken", "Unterfranken", "Schwaben"];
  const categories = ["Digitale Infrastruktur und Technik", "Digitale Lernplattformen und Software", "Digitale Unterrichtsmethoden", "Digitale Medien und Ressourcen", "Digitale Bewertung und Prüfungen", "Digitale Fortbildung für Lehrkräfte", "Digitale Kommunikation und Zusammenarbeit", "Technischer Support und Wartung", "Datenschutz und Sicherheit", "Sonstiges zur Digitalisierung"];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.priority || !formData.subject || !formData.message) {
      toast({
        title: "Unvollständige Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    // Store feedback in localStorage for demo purposes
    const existingFeedback = JSON.parse(localStorage.getItem("teacherFeedback") || "[]");
    const newFeedback = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: "Eingereicht"
    };
    if (formData.anonymous) {
      newFeedback.name = "Anonym";
      newFeedback.email = "";
    }
    existingFeedback.push(newFeedback);
    localStorage.setItem("teacherFeedback", JSON.stringify(existingFeedback));
    toast({
      title: "Feedback erfolgreich gesendet",
      description: "Vielen Dank für Ihr Feedback. Es wurde an Zukunft Digitale Bildung weitergeleitet."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      school: "",
      district: "",
      category: "",
      priority: "",
      subject: "",
      message: "",
      anonymous: false
    });
  };
  return <Card className="w-full max-w-2xl">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Send className="h-5 w-5" />
          <span>Neues Feedback senden</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Anonymous Option */}
          <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
            <Checkbox id="anonymous" checked={formData.anonymous} onCheckedChange={checked => setFormData({
            ...formData,
            anonymous: checked as boolean
          })} />
            <Label htmlFor="anonymous" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Anonymes Feedback senden</span>
            </Label>
          </div>

          {/* Personal Information */}
          {!formData.anonymous && <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input id="name" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} placeholder="Ihr Name" />
                </div>
                <div>
                  <Label htmlFor="email">E-Mail (optional)</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} placeholder="ihre.email@schule.de" />
                </div>
              </div>
            </div>}

          {/* School Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="school">Schule (optional)</Label>
              <Input id="school" value={formData.school} onChange={e => setFormData({
              ...formData,
              school: e.target.value
            })} placeholder="Name Ihrer Schule" />
            </div>
            <div>
              <Label htmlFor="district">Regierungsbezirk</Label>
              <Select value={formData.district} onValueChange={value => setFormData({
              ...formData,
              district: value
            })}>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihren Bezirk" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(district => <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Feedback Details */}
          <div>
            <Label>Kategorie *</Label>
            <Select value={formData.category} onValueChange={value => setFormData({
            ...formData,
            category: value
          })}>
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie eine Kategorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priorität *</Label>
            <RadioGroup value={formData.priority} onValueChange={value => setFormData({
            ...formData,
            priority: value
          })} className="flex flex-col space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unterricht" id="unterricht" />
                <Label htmlFor="unterricht">Betrifft meinen Unterricht</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fach" id="fach" />
                <Label htmlFor="fach">Betrifft Unterricht meines Fachs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saemtlicher-unterricht" id="saemtlicher-unterricht" />
                <Label htmlFor="saemtlicher-unterricht">Betrifft sämtlichen Unterricht</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="schule" id="schule" />
                <Label htmlFor="schule">Betrifft meine Schule</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saemtliche-schulen" id="saemtliche-schulen" />
                <Label htmlFor="saemtliche-schulen">Betrifft sämtliche Schulen</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="subject">Betreff *</Label>
            <Input id="subject" value={formData.subject} onChange={e => setFormData({
            ...formData,
            subject: e.target.value
          })} placeholder="Kurze Zusammenfassung Ihres Feedbacks" required />
          </div>

          <div>
            <Label htmlFor="message">Nachricht *</Label>
            <Textarea id="message" value={formData.message} onChange={e => setFormData({
            ...formData,
            message: e.target.value
          })} placeholder="Beschreiben Sie Ihr Feedback detailliert..." className="min-h-32" required />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4 mr-2" />
            Feedback senden
          </Button>
        </form>
      </CardContent>
    </Card>;
};
export default FeedbackForm;