const dictionary = {
  rank: "market_cap_rank",
  price: "current_price",
  change1h: "price_change_percentage_1h_in_currency",
  change24h: "price_change_percentage_24h_in_currency",
  change7d: "price_change_percentage_7d_in_currency",
};

export default function matchIDtoAPIName(id) {
  return dictionary[id];
}
