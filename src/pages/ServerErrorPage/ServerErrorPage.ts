import { ErrorPage } from '../components/ErrorPage';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке

export const ServerErrorPage = ErrorPage({
  title: '500',
  text: 'Мы уже фиксим',
  buttonText: 'Туда, где работает...',
  buttonHref: '/',
});
