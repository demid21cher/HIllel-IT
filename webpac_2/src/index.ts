import './styles/main.css';
import './styles/app.scss';
import './styles/component.less';
import _ from 'lodash';

import logoImg from './assets/images/logo.jpg';

interface UserConfig {
  title: string;
  version: number;
}

const config: UserConfig = {
  title: 'Webpack + TS + Babel + Preprocessors',
  version: 2.0,
};

const appDiv = document.getElementById('lodash-output');

if (appDiv) {
  const box = document.createElement('div');
  box.className = 'dynamic-box';
  box.innerText = `Конфіг: ${config.title} (v${config.version})`;
  appDiv.appendChild(box);
}

const imageContainer = document.getElementById('image-container');

if (imageContainer) {
  const img = document.createElement('img');
  img.src = logoImg;
  img.alt = 'Logo';
  img.className = 'main-image';

  imageContainer.appendChild(img);
}

console.log(_.join(['Webpack', 'успішно', 'налаштовано!'], ' '));
