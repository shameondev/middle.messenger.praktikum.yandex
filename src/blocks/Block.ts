import EventBus from './EventBus';

type Props = Record<string, any>;

type TMeta = {
  tagName: string;
  props?: Props;
};

export type NativeListenersMap = Partial<{
  [T in keyof HTMLElementEventMap]: (e: HTMLElementEventMap[T]) => void;
}>;

type EventName = 'INIT' | 'FLOW_CDM' | 'FLOW_CDU' | 'FLOW_RENDER';
type TEvents = Record<EventName, string>;

class Block {
  static EVENTS: TEvents = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  _element: HTMLElement;

  _meta: TMeta = {
    tagName: 'div',
  };

  private eventBus: () => EventBus;

  private props: Props;

  constructor(tagName = 'div', props: Props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(props: Props) {
    const response = this.componentDidUpdate(props);

    if (!response) {
      return;
    }
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(...props: Props[]) {
    console.log('props:', props);
    return true;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events as NativeListenersMap).forEach((eventName) => {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events as EventListenerOrEventListenerObject).forEach(
      (eventName) => {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        this._element?.removeEventListener(eventName, events[eventName]);
      },
    );
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    this._removeEvents();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._element.innerHTML = block;

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line class-methods-use-this
  render() {}

  getContent() {
    return this._element;
  }

  _makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error('нет доступа');
        } else {
          const value = target[prop] as string | (<T>(...args: [T]) => void);
          return typeof value === 'function' ? value.bind(target) : value;
        }
      },
      set(target, prop: string, val: string) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = val;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
