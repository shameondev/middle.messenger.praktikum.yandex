import templateFunction from './HomePage.hbs';
import styles from './HomePage.css';
import Block, { Props } from '../../blocks/Block';
import BasePage from '../../views/BasePage';
import { SignUpPage } from '../SignUpPage';

class HomePageClass extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(templateFunction, {
      title: this.props.title,
      text: this.props.text,
      styles,
    });
  }
}

export const HomePageWithHeader = new HomePageClass({
  title: 'Домашняя страница',
  text: 'Из хедера можно переключаться между компонентами',
});

export const page = new BasePage({
  body: HomePageWithHeader,
});
page.setProps({ body: SignUpPage });

/* Не понимаю, так вообще можно будеть делать?
   page будет базовой разметкой с хедером и там только в боди
   подставлять разные компоненты. Пока не работает.
   Помогите. Я туда иду?
 */
// setTimeout(() => {
//   page.setProps({ body: SignUpPage });
// }, 3000);
