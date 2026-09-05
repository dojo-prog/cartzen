type Props = {
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
};

const ContactItem = ({ icon: Icon, title, description, value }: Props) => {
  return (
    <div className="flex items-start gap-4 rounded-xl border bg-background p-4 transition-colors hover:bg-muted/30">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>

        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>

        <p className="mt-1 wrap-break-word text-sm font-medium">{value}</p>
      </div>
    </div>
  );
};
export default ContactItem;
