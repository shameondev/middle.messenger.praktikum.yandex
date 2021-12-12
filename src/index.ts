import './index.css';
import { last } from './utils/last';

import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';
import { LogInPage } from './pages/LogInPage';
import { ChatPage } from './pages/ChatPage';
import { UserPage } from './pages/UserPage';
import { ChangeUserDataPage } from './pages/ChangeUserDataPage';
import { ChangeUserPasswordPage } from './pages/ChangeUserPasswordPage';
import { LoggedOutPage } from './pages/LoggedOutPage';
import Block from './blocks/Block';
import { page } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';

const isLocationMatches = (location: string): boolean =>
  last(window.location.href.split('/')) === location;

/*
 * помогите с архитектурой, я совсем увяз и не знаю куда идти :(
 * чувстую что сейчас я неправильно везде использую классы.
 * но пока не могу решить проблему с ререндером компонентов в body у компонента BasePage.
 *  */

document.addEventListener('DOMContentLoaded', () => {
  const appContainer: HTMLElement | null = document.querySelector('#root');

  if (!appContainer) {
    return;
  }

  const renderComponent = (component: Block) => {
    console.log('component.getContent():', component);
    appContainer.appendChild(component.getContent());
  };

  if (isLocationMatches('')) {
    renderComponent(page);
  } else if (isLocationMatches('signup')) {
    // тут не рендерится хедер, хотя я пытался использовать basePage
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
