import React from 'react'
import ErrorBoundary from '../views/pages/ErrorBoundary/ErrorBoundary'

import Routes from '../views/Routes/Routes'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </div>
  )
}

export default App
