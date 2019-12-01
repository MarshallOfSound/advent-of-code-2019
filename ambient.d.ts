declare namespace NodeJS {
  interface Global {
    loadInput(): string;
  }
}

declare interface String {
    lines(): string[];
}