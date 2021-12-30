import templateFunction from './SignUpPage.hbs';
import styles from './SignUpPage.css';
import Block, { Props } from '../../blocks/Block';
import BasePage from '../../views/BasePage';
import Input from '../../components/Input';

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

export const SignUpClassInstance = new SignUpClass({
  styles,
  emailInput: new Input({
    type: 'email',
    name: 'email',
    label: 'Почта',
  }),
  loginInput: new Input({
    type: 'text',
    name: 'login',
    label: 'Логин',
  }),
  firstNameInput: new Input({
    type: 'text',
    name: 'first_name',
    label: 'Имя',
  }),
  secondNameInput: new Input({
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
  }),
  passwordInput: new Input({
    type: 'password',
    name: 'password',
    label: 'Пароль',
  }),
  phoneInput: new Input({
    type: 'tel',
    name: 'phone',
    label: 'Телефон',
  }),
});

export const SignUpPage = new BasePage({ body: SignUpClassInstance });
