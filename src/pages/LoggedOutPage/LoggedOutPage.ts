import templateFunction from './LoggedOutPage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './LoggedOutPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const LoggedOutPage = templateFunction({
  styles,
  title: 'Вы вышли из аккаунта.',
});
