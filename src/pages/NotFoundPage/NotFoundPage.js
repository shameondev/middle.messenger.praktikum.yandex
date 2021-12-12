import { ErrorPage } from '../components/ErrorPage';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке

export const NotFoundPage = ErrorPage({
  title: '404',
  text: 'Кажется вы не туда нажали...',
  buttonText: 'Надо сюда...',
  buttonHref: '/',
});
