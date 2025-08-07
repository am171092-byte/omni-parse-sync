import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Globe, 
  Upload,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const channels = [
  {
    name: "Email",
    icon: Mail,
    active: true,
    processed: 23,
    pending: 4,
    status: "processing"
  },
  {
    name: "WhatsApp",
    icon: MessageSquare,
    active: true,
    processed: 15,
    pending: 2,
    status: "active"
  },
  {
    name: "Phone",
    icon: Phone,
    active: true,
    processed: 8,
    pending: 1,
    status: "active"
  },
  {
    name: "Web Forms",
    icon: Globe,
    active: false,
    processed: 12,
    pending: 0,
    status: "inactive"
  }
];

export function OrderIngestCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Order Ingestion Channels</CardTitle>
          <Button size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Order
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const total = channel.processed + channel.pending;
          const progress = total > 0 ? (channel.processed / total) * 100 : 0;
          
          return (
            <div key={channel.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{channel.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {channel.processed} processed, {channel.pending} pending
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {channel.status === "processing" && (
                    <Clock className="h-4 w-4 text-warning" />
                  )}
                  {channel.status === "active" && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                  {channel.status === "inactive" && (
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Badge 
                    variant={
                      channel.status === "active" ? "success" : 
                      channel.status === "processing" ? "warning" : 
                      "secondary"
                    }
                    className="text-xs"
                  >
                    {channel.status}
                  </Badge>
                </div>
              </div>
              {total > 0 && (
                <Progress value={progress} className="h-2" />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}