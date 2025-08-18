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
import beforeAiImage from "@/assets/before-ai.jpg";
import afterAiImage from "@/assets/after-ai.jpg";

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

          {/* Before/After Illustrations */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-center text-destructive">Before AI</h3>
              <div className="relative rounded-lg overflow-hidden border shadow-lg">
                <img 
                  src={beforeAiImage} 
                  alt="Chaotic manual order processing" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    Manual processing, overwhelmed staff, scattered data
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-center text-primary">After AI</h3>
              <div className="relative rounded-lg overflow-hidden border shadow-lg">
                <img 
                  src={afterAiImage} 
                  alt="Streamlined AI-powered order processing" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    Automated processing, AI extraction, streamlined workflow
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-card border hover:shadow-md transition-all duration-200"
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

          {/* CTA Buttons */}
          <div className="pt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/trigger-agent')}
                className="px-8 py-3 text-lg"
              >
                Launch Agent
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/fulfillment')}
                className="px-8 py-3 text-lg"
              >
                View Fulfillment List
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}