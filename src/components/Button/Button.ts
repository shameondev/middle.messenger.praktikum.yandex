import template from './Button.hbs';
import * as styles from './Button.css';
import Block, { Props } from '../../blocks/Block';

export default class Button extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
