import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Database, 
  BarChart, 
  Zap 
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Mail,
      text: "Extracts orders from emails and attachments"
    },
    {
      icon: MessageSquare,
      text: "Parses unstructured messages from WhatsApp or call transcripts"
    },
    {
      icon: Database,
      text: "Checks inventory and pricing in real time"
    },
    {
      icon: Zap,
      text: "Generates and publishes JSON to ERP systems"
    },
    {
      icon: BarChart,
      text: "Tracks inventory risks (stockouts, overstocks)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Omni Channel Order Tracker</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-foreground">
              Omni Channel Order Tracker
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              This AI-powered tool helps B2B companies collect, structure, and manage sales orders from multiple channels including Email, WhatsApp, and Phone calls. It extracts key order information and generates structured JSON for seamless ERP integration (SAP, Microsoft Dynamics, etc.). It also analyzes inventory risks based on order trends.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-card border"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-left">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg"
              onClick={() => navigate('/trigger-agent')}
              className="px-8 py-3 text-lg"
            >
              Launch Agent
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}