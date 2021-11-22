import './index.css';

import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';

// TODO: Подумать что делать с ужасной лапшой кода в CSS

document.addEventListener('DOMContentLoaded', () => {
  if (document.location.href.split('/')[3] === '') {
    document.body.innerHTML = HomePage;
  } else if (document.location.href.split('/')[3] === 'signup') {
    document.body.innerHTML = SignUpPage;
  } else if (document.location.href.split('/')[3] === 'login') {
    document.body.innerHTML = 'login';
  } else if (document.location.href.split('/')[3] === 'user') {
    document.body.innerHTML = 'user';
  } else if (document.location.href.split('/')[3] === '500') {
    document.body.innerHTML = ServerErrorPage;
  } else if (document.location.href.split('/')[3] === 'chat') {
    document.body.innerHTML = 'Чата пока нет';
  } else {
    document.body.innerHTML = NotFoundPage;
  }
});
