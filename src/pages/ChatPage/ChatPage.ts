import templateFunction from './ChatPage.hbs';
import '../../components/Header';
import '../../components/Button';
import styles from './ChatPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const ChatPage = templateFunction({
  styles,
  title: 'Чат пока в разработке',
});
