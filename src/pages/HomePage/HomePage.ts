import templateFunction from './HomePage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './HomePage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const HomePage = templateFunction({
  styles,
  title: 'Домашняя страница',
  text: 'Из хедера можно переключаться между компонентами',
});
