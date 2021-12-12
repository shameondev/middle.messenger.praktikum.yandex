import templateFunction from './UserPage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './UserPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const UserPage = templateFunction({
  styles,
  title: 'Домашняя страница',
  text: 'Из хедера можно переключаться между компонентами',
});
