import { Reducer, useReducer } from 'react';
import { evaluate } from '../lib/utils/calculator-operations';

export enum Actions {
  ADD_DIGIT = 'ADD_DIGIT',
  DELETE_DIGIT = 'DELETE_DIGIT',
  OPERATION = 'OPERATION',
  EVALUATE = 'EVALUATE',
  CLEAR = 'CLEAR',
}

type State = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
};

const initState: State = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

const reducer: Reducer<State, { type: Actions; payload?: any }> = (state, { type, payload }) => {
  switch (type) {
    case Actions.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: payload.digit,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand?.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case Actions.OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };

    case Actions.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),
      };

    case Actions.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case Actions.CLEAR:
      return {
        ...state,
        currentOperand: null,
        previousOperand: null,
        operation: null,
      };
  }
};

const useCalculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initState);

  return { currentOperand, previousOperand, operation, dispatch };
};

export default useCalculator;
