import templateFunction from './ErrorPage.hbs';
import '../../../components/Button';
import '../../../components/Header';
import styles from './ErrorPage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке

export const ErrorPage = (context) =>
  templateFunction({
    styles,
    ...context,
  });
