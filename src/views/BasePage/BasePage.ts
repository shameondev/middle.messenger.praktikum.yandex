import template from './BasePage.hbs';
import * as styles from './BasePage.css';
import Block, { Props } from '../../blocks/Block';
import Header from '../../components/Header';

export default class BasePage extends Block {
  constructor(props: Props) {
    super('div', { ...props });
  }

  render() {
    this.children.header = new Header({});

    return this.compile(template, {
      body: this.props.body,
      styles,
    });
  }
}
