type ObjectTypeDto = { [key: string]: string | number | unknown | Array<string> | Array<number> };

export interface DebounceFunction {
  (...args: string[] | ObjectTypeDto[] | number[]): void;
}

export {};