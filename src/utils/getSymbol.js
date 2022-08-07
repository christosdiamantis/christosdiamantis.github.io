const symbols = {
  usd: "$",
  eur: "€",
  gbp: "£",
  btc: "฿",
  eth: "Ξ",
};

export default function getSymbol(currency) {
  return symbols[currency] || currency.toUpperCase();
}
