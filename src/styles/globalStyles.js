import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {


      --color-purple-50: #B695C0;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
  }

  body{

    font-family: 'Jersey 25', 'Regular 400' 
  }
`;

export default GlobalStyles;
