import templateFunction from './ChangeUserPasswordPage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './ChangeUserPasswordPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const ChangeUserPasswordPage = templateFunction({
  styles,
  title: 'Домашняя страница',
  text: 'Из хедера можно переключаться между компонентами',
});
