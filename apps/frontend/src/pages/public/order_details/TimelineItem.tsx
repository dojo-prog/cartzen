import { formatDateTime } from "@/utils/formatDateTime";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

type Props = {
  label: string;
  date: string | null;
  completed: boolean;
  cancelled?: boolean;
};

const TimelineItem = ({ label, date, completed, cancelled = false }: Props) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
          cancelled
            ? "bg-destructive/10 text-destructive"
            : completed
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {cancelled ? (
          <XCircle className="size-4" />
        ) : completed ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <Clock3 className="size-4" />
        )}
      </div>

      <div className="min-w-0">
        <p className={completed ? "font-medium" : "text-muted-foreground"}>
          {label}
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {date ? formatDateTime(date) : "Not completed"}
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;
