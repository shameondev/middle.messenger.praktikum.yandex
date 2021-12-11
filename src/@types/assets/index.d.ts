declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.hbs' {
  export default function templateFunction(
    context: Record<string, string>,
  ): string;
}
