import template from './ErrorPage.hbs';
import * as styles from './ErrorPage.css';
import Block, { Props } from '../../../blocks/Block';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

// const header = new Header({});

// const button = new Button({
//   className: 'button',
//   child: 'Нажми сюда...',
//   buttonHref: '/',
// });

export default class ErrorPageTemplate extends Block {
  constructor(props: Props) {
    super('div', { ...props });
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      text: this.props.text,
      styles,
    });
  }
}
