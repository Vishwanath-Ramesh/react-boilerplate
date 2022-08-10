import React, { Reducer, ReducerState, ReducerWithoutAction } from 'react'

type State = {
  past: any[]
  present: any
  future: any[]
}

enum ActionType {
  UNDO,
  REDO,
}

type Action = {
  type: ActionType
}

const useTimetravel = (reducer: Function, initialState: any) => {
  const timeTravelData: State = {
    past: [],
    present: initialState,
    future: [],
  }

  function enhancedReducer(enhancedState: State, action: Action): State {
    switch (action.type) {
      case ActionType.UNDO:
        const [newPast, ...oldPast] = enhancedState.past

        return {
          ...enhancedState,
          past: oldPast,
          present: newPast,
          future: [enhancedState.present, ...enhancedState.future],
        }

      case ActionType.REDO:
        const [currentFuture, ...oldFuture] = enhancedState.future

        return {
          ...enhancedState,
          past: [enhancedState.present, ...enhancedState.past],
          present: currentFuture,
          future: oldFuture,
        }
      default:
        return {
          ...enhancedState,
          past: [enhancedState.present, ...enhancedState.past],
          present: reducer(enhancedState.present, action),
        }
    }
  }

  const [state, dispatch] = React.useReducer(enhancedReducer, timeTravelData)

  return [state.present, dispatch]
}

export default useTimetravel
