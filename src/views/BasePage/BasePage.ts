import template from './BasePage.hbs';
import * as styles from './BasePage.css';

// TODO: Подумать как инкапсулировать стили кнопки в самой кнопке

// export const ErrorPage = (context: Record<string, string>) =>
//   templateFunction({
//     styles,
//     ...context,
//   });

import Block, { Props } from '../../blocks/Block';
import { SignUpClass } from '../../pages/SignUpPage/SignUpPage';

export default class BasePage extends Block {
  constructor(props: Props) {
    super('div', { ...props });
  }

  render() {
    return this.compile(template, {
      header: this.props.header,
      body: this.props.body,
      styles,
    });
  }
}
