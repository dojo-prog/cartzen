export const formatAddress = (address: {
  address_line: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
}) =>
  [
    address.address_line,
    address.barangay,
    address.city,
    address.province,
    address.region,
  ]
    .filter(Boolean)
    .join(", ");
