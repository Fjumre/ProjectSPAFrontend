import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {


      --color-purple-50: #B695C0;
      --color-purple-100: #222211;
      --color-purple-200: #666f69;
      --color-purple-300: #123a45;
      --color-purple-400: #333d33;
      --color-purple-500: #209f54;


      --color-gray-300: #d4d4d4;
      --color-gray-400: #333645;
      --color-gray-500: #d4f5d4;


  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 55px;
  }

  body{

    font-family: 'Jersey 25', 'Regular 400' 
  }
`;

export default GlobalStyles;
