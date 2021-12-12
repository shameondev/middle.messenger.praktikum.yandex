import Block from '../blocks/Block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  // Можно завязаться на реализации вашего класса Block
  root?.appendChild(block.getContent());

  // block.componentDidMount();
}
