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
import beforeChaosImage from "@/assets/before-chaos.jpg";
import afterAiFlowImage from "@/assets/after-ai-flow.jpg";
import { Navbar } from "@/components/layout/Navbar";

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
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
              Omni Channel Order Tracker
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              AI-powered tool that helps B2B companies collect, structure, and manage sales orders from multiple channels. Seamlessly integrates with Adobe Commerce for automated order processing.
            </p>
          </div>

          {/* Illustrations - Full Width */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Before Illustration */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border shadow-xl bg-card">
                <img 
                  src={beforeChaosImage} 
                  alt="Manual order processing chaos - people overwhelmed with emails, calls, and paperwork" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-semibold">
                    Manual multi-channel order chaos
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Overwhelmed teams managing emails, calls, and messages
                  </p>
                </div>
              </div>
            </div>

            {/* After Illustration */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border shadow-xl bg-card">
                <img 
                  src={afterAiFlowImage} 
                  alt="Streamlined AI automation - centralized system managing all order inputs" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-semibold">
                    AI-powered centralized processing
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Automated extraction and Adobe Commerce integration
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
                className="px-12 py-4 text-xl"
              >
                Get Started
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