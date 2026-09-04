import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAddress } from "@/utils/formatAddress";
import type { Store } from "@cartzen/shared";

type Props = {
  storeDetails?: Store;
};

const StoreDetails = ({ storeDetails }: Props) => {
  if (!storeDetails) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ships From</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="font-medium">{storeDetails.name}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {formatAddress(storeDetails)}
        </p>
      </CardContent>
    </Card>
  );
};

export default StoreDetails;
