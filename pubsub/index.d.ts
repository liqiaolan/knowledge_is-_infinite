export declare const publish: (
  event: string,
  data: unknown
) => void;
export declare const subscribe: (
    event: string,
    callback: (data?: unknown) => void
  ) => void;
  