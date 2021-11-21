import templateFunction from './NotFoundPage.hbs';
import '../../components/Button';
import styles from './NotFoundPage.css';

export const NotFoundPage = templateFunction({
  styles,
  title: '404',
  text: 'Кажется вы не туда нажали...',
  buttonText: 'Надо сюда...',
  buttonHref: '/home',
});
