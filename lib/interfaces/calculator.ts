export enum Actions {
  ADD_DIGIT = 'ADD_DIGIT',
  DELETE_DIGIT = 'DELETE_DIGIT',
  OPERATION = 'OPERATION',
  EVALUATE = 'EVALUATE',
  CLEAR = 'CLEAR',
}

export type KeyPress = {
  key: string;
  code: string;
};
