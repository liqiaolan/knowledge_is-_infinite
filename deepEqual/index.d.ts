type Param = string | number | boolean | unknown[] | Record<string, unknown>;

export declare const DeepEqual: (value: Param, other: Param) => boolean;
