import React, { Reducer } from 'react'

function useThunkReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: any
) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const enhancedDispatch = React.useCallback(
    (thunkAction: Function) => {
      if (typeof thunkAction === 'function') thunkAction(dispatch)
      else dispatch(thunkAction)
    },
    [dispatch]
  )

  return [state, enhancedDispatch]
}

export default useThunkReducer
