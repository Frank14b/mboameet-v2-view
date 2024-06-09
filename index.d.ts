import "react";

declare global {
	interface Window {
		opera: any;
		Worker: Worker;
	}
}

declare module "react" {
  interface HTMLAttributes<T> {
    onPointerEnterCapture?: (e: React.PointerEvent<T | null>) => void;
    onPointerLeaveCapture?: (e: React.PointerEvent<T | null>) => void;
  }
  
  interface RefAttributes<T> {
    onPointerEnterCapture?: (e: React.PointerEvent<T | null>) => void;
    onPointerLeaveCapture?: (e: React.PointerEvent<T | null>) => void;
  }
}

export {};