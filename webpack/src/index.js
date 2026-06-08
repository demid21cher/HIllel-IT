import './styles/main.css';
import logoImg from './assets/images/logo.jpg';
import _ from 'lodash';

const imgContainer = document.getElementById('image-container');
const myLogo = new Image();
myLogo.src = logoImg;
myLogo.alt = 'Webpack Logo';
imgContainer.appendChild(myLogo);

const lodashOutput = document.getElementById('lodash-output');
const words = _.join(['Оптимізація', 'бібліотек', 'працює!'], ' ');
lodashOutput.textContent = words;
