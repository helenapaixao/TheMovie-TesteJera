import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
}

img {
     height: 60px;
 }

body {
    background: #972D07;
    -webkit-font-smoothing: antiased;

}


body, input, button {
    font-family: 'Ubuntu', sans-serif;
    font-size: 16px;
    font-weight: normal;
    color: #ffffff;

}


h1,h2,h3,h4,h5,h6, strong {
    font-weight: 500;
}

button {
    cursor: pointer;
    border: 0;
    font-weight: bold;
    border-radius: 50px;
}



`;
