import templateFunction from './SignUpPage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './SignUpPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const SignUpPage = templateFunction({
  styles,
  title: 'Домашняя страница',
  text: 'Из хедера можно переключаться между компонентами',
});
