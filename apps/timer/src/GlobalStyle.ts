import { createGlobalStyle } from 'styled-components';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      [key: string]: string;
    };
    breakpoint: {
      [key: string]: string;
    };
    border: string;
    shadow: string;
  }
}


export const GlobalStyle = createGlobalStyle`

html {
  box-sizing: border-box;
}

*, ::after, ::before {
  box-sizing: inherit;
}

body {
  background-color: #eee;
  max-width: 1400px;
  min-width: 320px;
  margin: 0 auto;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14 px;
}

button {
  cursor: pointer;
};

li {
  list-style: none;
};

a {
  text-decoration: none;
}`;
