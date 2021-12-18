import React from 'react'

function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const enhancedDispatch = React.useCallback(
    (thunkAction) => {
      if (typeof thunkAction === 'function') thunkAction(dispatch)
      else dispatch(thunkAction)
    },
    [dispatch]
  )

  return [state, enhancedDispatch]
}

export default useThunkReducer
