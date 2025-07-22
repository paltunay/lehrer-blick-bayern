import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
    {
      question: "Wer kann an der Feedback-Plattform teilnehmen?",
      answer: "Nur verifizierte Lehrkräfte mit einer @schule.bayern.de E-Mail-Adresse können an der Feedback-Plattform teilnehmen. Dies dient dazu, Missbrauch zu vermeiden und sicherzustellen, dass das Feedback von echten Lehrkräften kommt."
    },
    {
      question: "Ist mein Feedback wirklich anonym?",
      answer: "Ja, Sie können wählen, ob Sie Ihr Feedback anonym oder mit Ihren Kontaktdaten senden möchten. Bei anonymem Feedback werden keine persönlichen Daten gespeichert oder weitergegeben."
    },
    {
      question: "Was passiert mit meinem Feedback?",
      answer: "Ihr Feedback wird gesammelt, analysiert und direkt an das Bayerische Staatsministerium für Unterricht und Kultus weitergeleitet. Es fließt in die Entscheidungsfindung zur Verbesserung des Bildungssystems ein."
    },
    {
      question: "Warum ist eine Registrierung notwendig?",
      answer: "Die Registrierung mit einer @schule.bayern.de E-Mail-Adresse stellt sicher, dass nur echte Lehrkräfte teilnehmen. Dies erhöht die Glaubwürdigkeit und den Wert des gesammelten Feedbacks."
    },
    {
      question: "Zu welchen Themen kann ich Feedback geben?",
      answer: "Sie können Feedback zu allen Aspekten der Digitalisierung in Schulen und Unterricht geben, einschließlich digitaler Ausstattung, Lernplattformen, digitaler Lehrmethoden, Fortbildung und technischer Infrastruktur."
    },
    {
      question: "Wie wird mit meinen Daten umgegangen?",
      answer: "Alle Daten werden gemäß der DSGVO verarbeitet und gespeichert. Ihre Daten werden nur für die Bearbeitung und Weiterleitung Ihres Feedbacks verwendet und nicht an Dritte weitergegeben."
    },
    {
      question: "Kann ich mehrfach Feedback geben?",
      answer: "Ja, Sie können jederzeit neues Feedback geben. Jedes Feedback wird separat behandelt und weitergeleitet."
    },
    {
      question: "Erhalte ich eine Antwort auf mein Feedback?",
      answer: "Wenn Sie Ihre Kontaktdaten angeben, können Sie eine Rückmeldung erhalten. Bei anonymem Feedback ist dies nicht möglich. Allgemeine Entwicklungen werden jedoch über offizielle Kanäle kommuniziert."
    },
    {
      question: "Was sind die technischen Voraussetzungen?",
      answer: "Sie benötigen einen aktuellen Webbrowser und eine stabile Internetverbindung. Die Plattform funktioniert auf allen gängigen Geräten (Computer, Tablet, Smartphone)."
    },
    {
      question: "An wen kann ich mich bei Problemen wenden?",
      answer: "Bei technischen Problemen oder Fragen zur Plattform wenden Sie sich an das Bayerische Staatsministerium für Unterricht und Kultus oder nutzen Sie die entsprechenden Kontaktkanäle."
    }
  ];

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm border border-blue-100 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Häufig gestellte Fragen (FAQ)</h3>
      
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;