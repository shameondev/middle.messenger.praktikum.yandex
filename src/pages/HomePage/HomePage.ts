import templateFunction from './HomePage.hbs';
import styles from './HomePage.css';
import Block, { Props } from '../../blocks/Block';
import Header from '../../components/Header';
import BasePage from '../../views/BasePage';

const header = new Header({});

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
  header,
  body: HomePageWithHeader,
});
