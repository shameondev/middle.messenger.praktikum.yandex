import templateFunction from './LogInPage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './LogInPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const LogInPage = templateFunction({
  styles,
  title: 'Домашняя страница',
  text: 'Из хедера можно переключаться между компонентами',
});
