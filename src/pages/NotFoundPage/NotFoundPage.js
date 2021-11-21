import templateFunction from './NotFoundPage.hbs';
import '../../components/Button';
import styles from './NotFoundPage.css';

export const NotFoundPage = templateFunction({
  styles,
  title: '404',
  text: 'Кажется вы заблудились',
  buttonText: 'Домой',
  buttonHref: '/home',
});
