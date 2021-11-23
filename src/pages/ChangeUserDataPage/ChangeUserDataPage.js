import templateFunction from './ChangeUserDataPage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './ChangeUserDataPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const ChangeUserDataPage = templateFunction({
  styles,
  title: 'Домашняя страница',
  text: 'Из хедера можно переключаться между компонентами',
});
