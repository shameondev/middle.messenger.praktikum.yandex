import './index.css';
import { last } from './utils/last';

import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';
import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';
import { ChatPage } from './pages/ChatPage';
import { UserPage } from './pages/UserPage';
import { ChangeUserDataPage } from './pages/ChangeUserDataPage';
import { ChangeUserPasswordPage } from './pages/ChangeUserPasswordPage';
import { LoggedOutPage } from './pages/LoggedOutPage';
import Block from './blocks/Block';
import { page } from './pages/HomePage/HomePage';
import { render } from './utils/renderDOM';
import { SignUpPage } from './pages/SignUpPage';

// TODO: Подумать что делать с ужасной лапшой кода в CSS

// TODO: Компоненты вроде бы есть, но смысла от их переиспользоавния почти нет, надо рефачить
/* Вот допустим сейчас мне нужно поменять name в форме,
а я хожу по всему проекту, а не делаю это в одном месте */
const isLocationMatches = (location: string): boolean =>
  last(window.location.href.split('/')) === location;

document.addEventListener('DOMContentLoaded', () => {
  const appContainer: HTMLElement | null = document.querySelector('#root');

  if (!appContainer) {
    return;
  }

  const renderComponent = (component: Block) => {
    appContainer.appendChild(component.getContent());
  };

  if (isLocationMatches('')) {
    renderComponent(page);
  } else if (isLocationMatches('signup')) {
    renderComponent(SignUpPage);
  } else if (isLocationMatches('login')) {
    document.body.innerHTML = LogInPage;
  } else if (isLocationMatches('user')) {
    document.body.innerHTML = UserPage;
  } else if (isLocationMatches('changedata')) {
    document.body.innerHTML = ChangeUserDataPage;
  } else if (isLocationMatches('changepassword')) {
    document.body.innerHTML = ChangeUserPasswordPage;
  } else if (isLocationMatches('logout')) {
    document.body.innerHTML = LoggedOutPage;
  } else if (isLocationMatches('500')) {
    appContainer.appendChild(ServerErrorPage.getContent());
  } else if (isLocationMatches('chat')) {
    appContainer.innerHTML = ChatPage;
  } else {
    renderComponent(NotFoundPage);
  }
});
