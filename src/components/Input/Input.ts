import template from './Input.hbs';
import * as styles from './Input.css';
import Block, { Props } from '../../blocks/Block';

type Validators = {
  empty: Function;
  email: Function;
  login: Function;
  first_name: Function;
  second_name: Function;
  password: Function;
  phone: Function;
};

const REGEX_RULES = {
  phone: new RegExp(/^[+]?[0-9]{10,15}$/),
  password: new RegExp(/^(?=.*\d)(?=.*[A-ZА-ЯË])(.{8,40})$/),
  name: new RegExp(/^[A-ZА-ЯË][a-zа-яё-]+$/),
  numbers: new RegExp(/^[0-9]*$/),
  latin: new RegExp(/^[a-zA-Z0-9_-]{3,20}$/),
  email: new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ),
};

const VALIDATORS: Validators = {
  empty: (value: string) =>
    value.trim().length <= 0 ? 'Поле не должно быть пустым' : '',
  email: (value: string) =>
    String(value).toLowerCase().match(REGEX_RULES.email)
      ? ''
      : 'Поле email введено с ошибками',
  login: (value: string) =>
    String(value).match(REGEX_RULES.numbers)
      ? 'Логин не может содержать только числа'
      : String(value).match(REGEX_RULES.latin)
      ? ''
      : 'Логин должен быть на латинском длиной от 3 до 20 символов.',
  first_name: (value: string) =>
    String(value).match(REGEX_RULES.name) ? '' : 'Имя введено с ошибками',
  second_name: (value: string) =>
    String(value).match(REGEX_RULES.name) ? '' : 'Фамилия введена с ошибками',
  password: (value: string) =>
    String(value).match(REGEX_RULES.password) ? '' : 'Пароль введен с ошибками',
  phone: (value: string) =>
    String(value).match(REGEX_RULES.phone) ? '' : 'Телефон введен с ошибками',
};

type InputProps = {
  type: string;
  name: string;
  label: string;
} & Props;

export default class Input extends Block {
  constructor(props: InputProps) {
    super('div', props);
  }

  onBlur(event: any) {
    this.validate(event.target.value);
  }

  setStorage(event: any) {
    sessionStorage.setItem(`${this.props.name}`, event.target.value);
  }

  get getStorageValue() {
    return sessionStorage.getItem(`${this.props.name}`);
  }

  validate(value: string) {
    const emptyMessage = VALIDATORS.empty(value);
    const validator = VALIDATORS[this.props.name];

    if (emptyMessage) {
      this.setProps({
        errorMessage: emptyMessage,
        value: this.getStorageValue,
      });
      return;
    }

    if (validator) {
      console.log('validator:', validator);
      const validatorMessage = validator(value);
      console.log('validatorMessage:', validatorMessage);
      this.setProps({
        errorMessage: validatorMessage,
        value: this.getStorageValue,
      });
      return;
    }

    this.setProps({ errorMessage: '', value: this.getStorageValue });
  }

  componentDidMount() {
    this._element.addEventListener('focusout', this.onBlur.bind(this), false);
    this._element.addEventListener('keyup', this.setStorage.bind(this), false);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
