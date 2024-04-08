export interface LogFormat {
  level: string;
  message: string;
  label?: string;
  timestamp?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
