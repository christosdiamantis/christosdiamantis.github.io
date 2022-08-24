import React from "react";
import { useParams } from "react-router";
import { Details, CoinChart } from "components";

export default function CoinDetails() {
  const { coin } = useParams();

  return (
    <div>
      <Details coin={coin} />
      <CoinChart coin={coin} />
    </div>
  );
}
