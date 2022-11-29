export default interface IType {
  type: boolean;
  message: string | object;
}

export interface IError extends IType {
  error: number;
}
