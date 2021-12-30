declare module '*.css' {
  const styles: string;
  export default styles;
}

declare module '*.hbs' {
  export default function templateFunction(
    context: Record<string, string>,
  ): string;
}
