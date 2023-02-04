export enum Actions {
  ADD_DIGIT = 'ADD_DIGIT',
  DELETE_DIGIT = 'DELETE_DIGIT',
  OPERATION = 'OPERATION',
  EVALUATE = 'EVALUATE',
  CLEAR = 'CLEAR',
}

export type State = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
};

export type KeyPress = {
  key: string;
  code: string;
};
