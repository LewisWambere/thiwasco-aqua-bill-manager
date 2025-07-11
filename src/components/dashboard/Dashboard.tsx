import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "./StatCard";
import { RecentActivity } from "./RecentActivity";
import { 
  Users, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp,
  Download,
  Filter,
  Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 45000, consumption: 12000, customers: 450 },
  { month: "Feb", revenue: 52000, consumption: 13500, customers: 465 },
  { month: "Mar", revenue: 48000, consumption: 12800, customers: 480 },
  { month: "Apr", revenue: 61000, consumption: 15200, customers: 495 },
  { month: "May", revenue: 55000, consumption: 14100, customers: 510 },
  { month: "Jun", revenue: 67000, consumption: 16800, customers: 525 },
];

const overdueData = [
  { zone: "Zone A", overdue: 25, total: 120 },
  { zone: "Zone B", overdue: 18, total: 95 },
  { zone: "Zone C", overdue: 32, total: 150 },
  { zone: "Zone D", overdue: 12, total: 80 },
];

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your water management system.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "This month"}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value="1,245"
          description="Active water connections"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
          variant="water"
        />
        <StatCard
          title="Monthly Revenue"
          value="KSh 2.4M"
          description="Current month collections"
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Pending Payments"
          value="87"
          description="Overdue bills this month"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 5, isPositive: false }}
          variant="warning"
        />
        <StatCard
          title="Water Usage"
          value="45,230L"
          description="Total consumption today"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
          variant="default"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Monthly revenue and water consumption patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Growth */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>
              New customer registrations over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Overdue by Zone */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Overdue Bills by Zone</CardTitle>
            <CardDescription>
              Distribution of pending payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={overdueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="overdue" fill="hsl(var(--warning))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used system functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <Users className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Add Customer</div>
                <div className="text-sm text-muted-foreground">Register new connection</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <TrendingUp className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Enter Reading</div>
                <div className="text-sm text-muted-foreground">Record meter data</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <CreditCard className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Process Payment</div>
                <div className="text-sm text-muted-foreground">Record customer payment</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <Download className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-muted-foreground">Export system data</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}