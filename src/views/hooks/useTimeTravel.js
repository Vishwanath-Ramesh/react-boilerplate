import React from 'react'

const useTimetravel = (reducer, initialState) => {
  const timeTravelData = {
    past: [],
    present: initialState,
    future: [],
  }

  function enhancedReducer(enhancedState, action) {
    if (action.type === 'UNDO') {
      const [newPast, ...oldPast] = enhancedState.past

      return {
        ...enhancedState,
        past: oldPast,
        present: newPast,
        future: [enhancedState.present, ...enhancedState.future],
      }
    }
    if (action.type === 'REDO') {
      const [currentFuture, ...oldFuture] = enhancedState.future

      return {
        ...enhancedState,
        past: [enhancedState.present, ...enhancedState.past],
        present: currentFuture,
        future: oldFuture,
      }
    }
    return {
      ...enhancedState,
      past: [enhancedState.present, ...enhancedState.past],
      present: reducer(enhancedState.present, action),
    }
  }

  const [state, dispatch] = React.useReducer(enhancedReducer, timeTravelData)

  return [state.present, dispatch]
}

export default useTimetravel
