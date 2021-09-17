import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { ConvertScreen } from './Components/ConvertScreen'
import { VideoSelectView } from './Components/VideoSelectView'
import { store } from './store'

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/convert" component={ConvertScreen} />
          <Route path="/" exact component={VideoSelectView} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
