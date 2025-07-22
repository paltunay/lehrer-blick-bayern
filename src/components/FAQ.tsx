import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
    {
      question: "Wer steht hinter der Plattform?",
      answer: "Die Plattform wird als gemeinnütziges, unabhängiges Projekt ohne Regierungsbezug von der NGO Zukunft Digitale Bildung betrieben. Mehr Informationen finden sie auf https://zukunft-digitale-bildung.de/"
    },
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
      answer: "Wir möchten Ihnen eine Stimme geben. Deshalb wird Ihr Feedback wird gesammelt, analysiert und im Rahmen unserer Arbeit zur Verbesserung der digitalen Bildung als NGO verwendet."
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
      question: "An wen kann ich mich bei Problemen wenden?",
      answer: "Bei technischen Problemen oder Fragen zur Plattform wenden Sie sich an info@zukunft-digitale-bildung.de"
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