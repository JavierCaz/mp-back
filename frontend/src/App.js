import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link as PageLink } from 'react-router-dom'
import { useComposeProviders } from 'hooks'

import Layout from 'layout'
import { Hello, Home } from 'pages'
import { ScreenSizeContextProvider } from 'context/ScreenSizeContext'

const routes = {
  home: '/',
  hello: '/hello',
}

const routeName = {
  home: 'Home',
  hello: 'Hello page',
}

const routeElement = {
  home: <Home />,
  hello: <Hello />,
}

const App = () => {
  const pages = Object.keys(routes).map(route => <PageLink key={route} to={routes[route]}>{routeName[route]}</PageLink>)

  const RouterProviders = useComposeProviders(Router, Routes)
  const AppProviders = useComposeProviders(ScreenSizeContextProvider)

  return (
    <AppProviders>
      <RouterProviders>
        <Route path={`${routes.home}`} element={<Layout pages={pages} />}>
          {Object.keys(routeElement).map(route =>
            <Route key={route} path={routes[route]} element={routeElement[route]} />
          )}
        </Route>
      </RouterProviders>
    </AppProviders>
  )
}

export default App
