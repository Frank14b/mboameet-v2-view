import "react";

declare global {
	interface Window {
		opera: any;
		Worker: Worker;
	}
}

declare module "react" {
  interface HTMLAttributes<T> {
    onPointerEnterCapture?: (e: React.PointerEvent<T>) => void;
    onPointerLeaveCapture?: (e: React.PointerEvent<T>) => void;
  }
  
  interface RefAttributes<T> {
    onPointerEnterCapture?: (e: React.PointerEvent<T>) => void;
    onPointerLeaveCapture?: (e: React.PointerEvent<T>) => void;
  }
}

type ObjectTypeDto = { [key: string]: string | number | unknown | Array<string> | Array<number> };

export interface DebounceFunction {
  (...args: string[] | ObjectTypeDto[] | number[]): void;
}

export {};