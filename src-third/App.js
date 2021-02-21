import React, { Fragment } from "react";
import { Route, Switch } from 'react-router-dom';
import { routes } from './router'
import './css/app.css'
import './css/com.css'
function App() {
  return <Fragment>
    <Switch>
      {routes.map((item, index) => {
        return <Route
          path={item.path}
          exact={item.exact}
          render={item.render}
          key={index}
        />
      })}
    </Switch>
  </Fragment >
}
export default App