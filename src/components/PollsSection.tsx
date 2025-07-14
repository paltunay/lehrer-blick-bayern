import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Vote, BarChart3, Users } from "lucide-react";

interface PollData {
  pollResponses: Record<string, string>;
  anonymous: boolean;
}

const PollsSection = () => {
  const { toast } = useToast();
  const [pollData, setPollData] = useState<PollData>({
    pollResponses: {},
    anonymous: false,
  });

  const polls = [
    {
      id: "workload_2024",
      question: "Wie bewerten Sie Ihre aktuelle Arbeitsbelastung im Schuljahr 2024/25?",
      options: ["Deutlich zu niedrig", "Zu niedrig", "Angemessen", "Zu hoch", "Deutlich zu hoch"]
    },
    {
      id: "digital_equipment",
      question: "Wie bewerten Sie die digitale Ausstattung an Ihrer Schule?",
      options: ["Sehr gut", "Gut", "Ausreichend", "Mangelhaft", "Ungenügend"]
    },
    {
      id: "curriculum_changes",
      question: "Wie stehen Sie zu den geplanten Lehrplanänderungen?",
      options: ["Sehr positiv", "Positiv", "Neutral", "Negativ", "Sehr negativ"]
    },
    {
      id: "remote_teaching",
      question: "Wie bewerten Sie die Fortschritte beim digitalen Unterricht seit 2020?",
      options: ["Sehr große Fortschritte", "Große Fortschritte", "Moderate Fortschritte", "Geringe Fortschritte", "Keine Fortschritte"]
    },
    {
      id: "support_systems",
      question: "Welche Unterstützung benötigen Sie am dringendsten?",
      options: ["Mehr Personal", "Bessere Ausstattung", "Weniger Bürokratie", "Mehr Fortbildungen", "Höhere Bezahlung"]
    }
  ];

  const handlePollResponse = (pollId: string, value: string) => {
    setPollData({
      ...pollData,
      pollResponses: {
        ...pollData.pollResponses,
        [pollId]: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(pollData.pollResponses).length === 0) {
      toast({
        title: "Keine Antworten ausgewählt",
        description: "Bitte beantworten Sie mindestens eine Frage.",
        variant: "destructive",
      });
      return;
    }

    // Store poll responses in localStorage
    const existingPolls = JSON.parse(localStorage.getItem("pollResponses") || "[]");
    const newPollResponse = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      responses: pollData.pollResponses,
      anonymous: pollData.anonymous,
    };
    
    existingPolls.push(newPollResponse);
    localStorage.setItem("pollResponses", JSON.stringify(existingPolls));

    toast({
      title: "Umfrage erfolgreich übermittelt",
      description: "Vielen Dank für Ihre Teilnahme an der Umfrage!",
    });

    // Reset form
    setPollData({
      pollResponses: {},
      anonymous: false,
    });
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center space-x-2 text-green-800">
          <Vote className="h-5 w-5" />
          <span>Aktuelle Umfragen</span>
        </CardTitle>
        <p className="text-sm text-green-700 mt-2">
          Von Zukunft Digitale Bildung e.V. - Ihre Stimme für bessere Bildungspolitik
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Anonymous Option */}
          <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="poll-anonymous"
              checked={pollData.anonymous}
              onCheckedChange={(checked) =>
                setPollData({ ...pollData, anonymous: checked as boolean })
              }
            />
            <Label htmlFor="poll-anonymous" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Anonym teilnehmen</span>
            </Label>
          </div>

          {/* Poll Questions */}
          <div className="space-y-8">
            {polls.map((poll, index) => (
              <div key={poll.id} className="space-y-4 pb-6 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <Label className="text-base font-medium text-gray-900 leading-6">
                      {poll.question}
                    </Label>
                  </div>
                </div>
                <div className="ml-11">
                  <RadioGroup
                    value={pollData.pollResponses[poll.id] || ""}
                    onValueChange={(value) => handlePollResponse(poll.id, value)}
                    className="space-y-3"
                  >
                    {poll.options.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={option} 
                          id={`${poll.id}-${option}`} 
                        />
                        <Label 
                          htmlFor={`${poll.id}-${option}`}
                          className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <BarChart3 className="h-4 w-4" />
              <span>Ergebnisse werden anonymisiert ausgewertet</span>
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Vote className="h-4 w-4 mr-2" />
              Umfrage absenden
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PollsSection;