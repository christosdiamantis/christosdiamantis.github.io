import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html {
        background: ${({ theme }) => theme.background};
        font-size: 15px;
        margin: 0;
        padding: 0;
    }

    body{
        margin: 0;
        font-family: 'Sans-Serif', sans-serif;
        overflow-wrap: break-word;
        overflow-x:hidden;
        margin: 0;
        padding: 0;
    }
    
    .App {
        text-align: center;
    }`;
