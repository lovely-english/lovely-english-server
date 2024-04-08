/* eslint-disable @typescript-eslint/no-explicit-any */
export class CustomError extends Error {
  status!: number;
  message!: string;
  data?: undefined | Record<string, any>;

  constructor(status = 500, message: string, data: undefined | Record<string, any> = undefined) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
