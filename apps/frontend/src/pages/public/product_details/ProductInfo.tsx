type Props = {
  label: string;
  value: string;
};

const ProductInfo = ({ label, value }: Props) => {
  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
};

export default ProductInfo;
