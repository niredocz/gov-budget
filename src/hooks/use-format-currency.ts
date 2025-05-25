export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatCurrencyLabel = (value: number) => {
  switch (true) {
    case value >= 1_000_000_000_000:
      return `Rp ${(value / 1_000_000_000_000).toFixed(0)} T`;
    case value >= 1_000_000_000:
      return `Rp ${(value / 1_000_000_000).toFixed(0)} M`;
    case value >= 1_000_000:
      return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
    case value >= 1_000:
      return `Rp ${(value / 1_000).toFixed(0)} Rb`;
    default:
      return `Rp ${value}`;
  }
}