import templateFunction from './SignUpPage.hbs';
import styles from './SignUpPage.css';
import Block, { Props } from '../../blocks/Block';

class SignUpClass extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(templateFunction, {
      styles,
    });
  }
}

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке
export const SignUpPage = new SignUpClass({
  styles,
});
