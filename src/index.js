import './index.css';
import { last } from './utils/last';

import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { LogInPage } from './pages/LogInPage';
import { ChatPage } from './pages/ChatPage';
import { UserPage } from './pages/UserPage';
import { ChangeUserDataPage } from './pages/ChangeUserDataPage';
import { ChangeUserPasswordPage } from './pages/ChangeUserPasswordPage';
import { LoggedOutPage } from './pages/LoggedOutPage';

// TODO: Подумать что делать с ужасной лапшой кода в CSS

// TODO: Компоненты вроде бы есть, но смысла от их переиспользоавния почти нет, надо рефачить
/* Вот допустим сейчас мне нужно поменять name в форме,
а я хожу по всему проекту, а не делаю это в одном месте */

document.addEventListener('DOMContentLoaded', () => {
  if (last(document.location.href.split('/')) === '') {
    document.body.innerHTML = HomePage;
  } else if (last(document.location.href.split('/')) === 'signup') {
    document.body.innerHTML = SignUpPage;
  } else if (last(document.location.href.split('/')) === 'login') {
    document.body.innerHTML = LogInPage;
  } else if (last(document.location.href.split('/')) === 'user') {
    document.body.innerHTML = UserPage;
  } else if (last(document.location.href.split('/')) === 'changedata') {
    document.body.innerHTML = ChangeUserDataPage;
  } else if (last(document.location.href.split('/')) === 'changepassword') {
    document.body.innerHTML = ChangeUserPasswordPage;
  } else if (last(document.location.href.split('/')) === 'logout') {
    document.body.innerHTML = LoggedOutPage;
  } else if (last(document.location.href.split('/')) === '500') {
    document.body.innerHTML = ServerErrorPage;
  } else if (last(document.location.href.split('/')) === 'chat') {
    document.body.innerHTML = ChatPage;
  } else {
    document.body.innerHTML = NotFoundPage;
  }
});
