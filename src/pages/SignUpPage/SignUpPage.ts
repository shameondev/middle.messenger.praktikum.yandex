import templateFunction from './SignUpPage.hbs';
import styles from './SignUpPage.css';
import Block, { Props } from '../../blocks/Block';
import BasePage from '../../views/BasePage';

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

const SignUpClassInstance = new SignUpClass({
  styles,
});

export const SignUpPage = new BasePage({ body: SignUpClassInstance });
