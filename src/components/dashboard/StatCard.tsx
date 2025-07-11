import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "default" | "water" | "success" | "warning" | "destructive";
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className,
  variant = "default" 
}: StatCardProps) {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "water":
        return "bg-gradient-water text-white shadow-glow border-primary/20";
      case "success":
        return "bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-elegant";
      case "warning":
        return "bg-gradient-to-br from-warning to-warning/80 text-warning-foreground shadow-elegant";
      case "destructive":
        return "bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground shadow-elegant";
      default:
        return "bg-gradient-card shadow-card hover:shadow-elegant transition-shadow";
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 hover:scale-[1.02]",
      getVariantStyles(variant),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          variant === "default" ? "text-muted-foreground" : "text-current opacity-90"
        )}>
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            variant === "default" 
              ? "bg-primary/10 text-primary" 
              : "bg-white/20 text-current"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className={cn(
              "text-2xl font-bold",
              variant === "default" ? "text-foreground" : "text-current"
            )}>
              {value}
            </div>
            {description && (
              <p className={cn(
                "text-xs mt-1",
                variant === "default" ? "text-muted-foreground" : "text-current opacity-75"
              )}>
                {description}
              </p>
            )}
          </div>
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              trend.isPositive 
                ? variant === "default" 
                  ? "text-success" 
                  : "text-green-200"
                : variant === "default"
                  ? "text-destructive"
                  : "text-red-200"
            )}>
              <span className="mr-1">
                {trend.isPositive ? "↑" : "↓"}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}