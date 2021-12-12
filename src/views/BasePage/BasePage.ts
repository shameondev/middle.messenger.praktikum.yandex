import template from './BasePage.hbs';
import * as styles from './BasePage.css';
import Block, { Props } from '../../blocks/Block';
import Header from '../../components/Header';

export default class BasePage extends Block {
  constructor(props: Props) {
    super('div', { ...props });

    /*
     *  пытаюсь тут сохранить хедер внутри класса
     *  */
    this.children.header = new Header({});
  }

  render() {
    return this.compile(template, {
      body: this.props.body,
      title: this.props.title,
      styles,
    });
  }
}
