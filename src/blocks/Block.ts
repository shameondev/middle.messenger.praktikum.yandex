import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

export type Props = Record<string, any>;

type TMeta = {
  tagName: string;
  propsAndChildren?: Props;
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

  _id = '';

  eventBus: () => EventBus;

  props: Props;

  children: Record<string, any>;

  constructor(tagName = 'div', propsAndChildren: Props = {}) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      tagName,
      propsAndChildren,
    };

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, _id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // eslint-disable-next-line class-methods-use-this
  _getChildren(propsAndChildren: Props) {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
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
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
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

    this._element.innerHTML = '';
    this._element.appendChild(block.firstChild);

    this._addEvents();
  }

  render(): Node | void {}

  compile(
    template: HandlebarsTemplateDelegate,
    props: Props,
  ): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = template(propsAndStubs);
    console.log('Fragment content', fragment.content);

    Object.values(this.children).forEach((child) => {
      console.log('fragment.content:', fragment.content);
      console.log('fragment.innerHTML:', fragment.innerHTML);
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  getContent() {
    return this._element;
  }

  getId() {
    return this._id;
  }

  _makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
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
  _createDocumentElement(tagName: string): HTMLTemplateElement {
    const element = document.createElement(tagName);

    // if (this.props?.settings?.withInternalID) {
    //   element.setAttribute('data-id', this._id);
    // }

    return element;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
