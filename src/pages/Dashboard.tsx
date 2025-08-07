import { StatsCard } from "@/components/dashboard/StatsCard";
import { OrderIngestCard } from "@/components/dashboard/OrderIngestCard";
import { InventoryAlertsCard } from "@/components/dashboard/InventoryAlertsCard";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Inbox,
  CheckCircle
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your omni-channel order processing and inventory status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Orders Today"
          value="47"
          change="12%"
          changeType="positive"
          icon={Inbox}
          description="vs yesterday"
          badge="Live"
          badgeVariant="success"
        />
        <StatsCard
          title="Processing Rate"
          value="94.2%"
          change="2.1%"
          changeType="positive"
          icon={CheckCircle}
          description="success rate"
        />
        <StatsCard
          title="Inventory Alerts"
          value="7"
          change="3"
          changeType="negative"
          icon={AlertTriangle}
          description="new alerts"
          badge="Action Required"
          badgeVariant="warning"
        />
        <StatsCard
          title="Revenue Today"
          value="$124,890"
          change="18.5%"
          changeType="positive"
          icon={DollarSign}
          description="vs yesterday"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <RecentOrdersTable />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <OrderIngestCard />
          <InventoryAlertsCard />
        </div>
      </div>
    </div>
  );
}