import template from './Header.hbs';
import * as styles from './Header.css';
import Block, { Props } from '../../blocks/Block';

export default class Header extends Block {
  constructor(props: Props) {
    super('header', props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
