import React, { useState } from "react";
import { useTheme } from "styled-components";
import * as S from "./Link.styles";

export default function Link({ url }) {
  const theme = useTheme();
  const [displayCopied, setDisplayCopied] = useState(false);

  function openInNewTab(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url);
    setDisplayCopied(true);
    setTimeout(() => {
      setDisplayCopied(false);
    }, 650);
  }

  return (
    <S.Link>
      {url && (
        <button onClick={() => openInNewTab(url)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12.862"
            height="12.862"
            viewBox="0 0 12.862 12.862"
          >
            <path
              id="Icon_awesome-link"
              data-name="Icon awesome-link"
              d="M8.2,4.657a3.816,3.816,0,0,1,.009,5.391l-.009.009L6.517,11.746a3.818,3.818,0,0,1-5.4-5.4l.932-.932a.4.4,0,0,1,.686.266A4.629,4.629,0,0,0,2.978,7a.4.4,0,0,1-.1.417l-.329.329A1.809,1.809,0,1,0,5.1,10.324L6.784,8.637a1.808,1.808,0,0,0,0-2.558,1.882,1.882,0,0,0-.26-.215.4.4,0,0,1-.175-.317A1,1,0,0,1,6.643,4.8l.529-.529a.4.4,0,0,1,.517-.043,3.83,3.83,0,0,1,.516.432Zm3.54-3.541a3.823,3.823,0,0,0-5.4,0L4.657,2.8l-.009.009a3.819,3.819,0,0,0,.525,5.823.4.4,0,0,0,.517-.043l.529-.529a1,1,0,0,0,.294-.749A.4.4,0,0,0,6.338,7a1.882,1.882,0,0,1-.26-.215,1.808,1.808,0,0,1,0-2.558L7.766,2.538a1.809,1.809,0,1,1,2.542,2.574l-.329.329a.4.4,0,0,0-.1.417,4.629,4.629,0,0,1,.243,1.324.4.4,0,0,0,.686.266l.932-.932a3.822,3.822,0,0,0,0-5.4Z"
              transform="translate(0)"
              fill={theme.color}
            />
          </svg>
        </button>
      )}
      <a href={url}>{url}</a>
      {!!url && (
        <button onClick={() => copyUrl(url)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22.126"
            height="22.126"
            viewBox="0 0 22.126 22.126"
          >
            <g
              id="Icon_feather-copy"
              data-name="Icon feather-copy"
              transform="translate(-2 -2)"
            >
              <path
                id="Path_2527"
                data-name="Path 2527"
                d="M15.513,13.5H24.57a2.013,2.013,0,0,1,2.013,2.013V24.57a2.013,2.013,0,0,1-2.013,2.013H15.513A2.013,2.013,0,0,1,13.5,24.57V15.513A2.013,2.013,0,0,1,15.513,13.5Z"
                transform="translate(-3.456 -3.456)"
                fill="none"
                stroke={theme.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                id="Path_2528"
                data-name="Path 2528"
                d="M6.019,16.082H5.013A2.013,2.013,0,0,1,3,14.07V5.013A2.013,2.013,0,0,1,5.013,3H14.07a2.013,2.013,0,0,1,2.013,2.013V6.019"
                transform="translate(0 0)"
                fill="none"
                stroke={theme.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </svg>
        </button>
      )}
      {displayCopied && <S.PopUp>Copied!</S.PopUp>}
    </S.Link>
  );
}
