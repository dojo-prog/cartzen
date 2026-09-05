import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import React from "react";

const StatusCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Products" value={"0"} icon={Package} />

      <StatCard label="Active Products" value="112" icon={Package} />

      <StatCard label="Out of Stock" value="8" icon={Package} />

      <StatCard label="Featured" value="24" icon={Package} />
    </div>
  );
};

type StatCardProps = {
  label: string;
  value: string;
  icon: React.ElementType;
};

const StatCard = ({ label, value, icon: Icon }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCards;
