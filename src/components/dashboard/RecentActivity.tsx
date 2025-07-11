import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: Date;
  type: "payment" | "reading" | "registration" | "bill" | "system";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    user: "Jane Smith",
    action: "Payment received",
    target: "Invoice #INV-2024-001",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "payment"
  },
  {
    id: "2", 
    user: "John Clerk",
    action: "Meter reading entered",
    target: "Customer ID: C001",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "reading"
  },
  {
    id: "3",
    user: "Alice Admin",
    action: "New customer registered",
    target: "Mary Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: "registration"
  },
  {
    id: "4",
    user: "System",
    action: "Bill generated",
    target: "50 customers",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: "bill"
  },
  {
    id: "5",
    user: "Bob IT",
    action: "System backup completed",
    target: "Database",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    type: "system"
  }
];

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "payment":
      return "bg-success text-success-foreground";
    case "reading":
      return "bg-primary text-primary-foreground";
    case "registration":
      return "bg-accent text-accent-foreground";
    case "bill":
      return "bg-warning text-warning-foreground";
    case "system":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export function RecentActivity() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>
          Latest actions performed in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder-${activity.user.toLowerCase().replace(' ', '-')}.jpg`} />
                <AvatarFallback className="text-xs">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground truncate">
                    {activity.user}
                  </span>
                  <Badge className={`text-xs ${getActivityColor(activity.type)}`}>
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action} • {activity.target}
                </p>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}