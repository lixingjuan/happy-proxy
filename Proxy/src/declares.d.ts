export {};

declare global {
  interface Window {
    MonacoEnvironment: {
      getWorker: (a: any, b: any) => any;
    };
  }
}
