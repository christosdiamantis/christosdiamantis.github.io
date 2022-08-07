import React from "react";
import { useTheme } from "styled-components";
import { PulseLoader } from "react-spinners";

export default function Loader() {
  const theme = useTheme();
  return (
    <div>
      <PulseLoader color={theme.color} />
    </div>
  );
}
