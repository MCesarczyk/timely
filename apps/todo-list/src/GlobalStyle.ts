import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

html {
  box-sizing: border-box;
}

*, ::after, ::before {
  box-sizing: inherit;
}

body {
  background-color: #eee;
  max-width: 1024px;
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
