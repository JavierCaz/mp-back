import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useComposeProviders } from 'hooks'

import { ScreenSizeContextProvider } from 'context/ScreenSizeContext'
import { authRoutes, noAuthRoutes, routes } from 'routing/routes'
import Layout from 'components/Layout'
import AuthRoute from 'routing/AuthRoute'
import NoAuthRoute from 'routing/NoAuthRoute'

const App = () => {
  const RouterProviders = useComposeProviders(Router, Routes)
  const AppProviders = useComposeProviders(ScreenSizeContextProvider)

  return (
    <AppProviders>
      <RouterProviders>
        <Route exact path='/' element={<Layout />}>
          {/* Protected routes, accessible with authentication */}
          <Route element={<AuthRoute />}>
            {authRoutes.map(routeName =>
              <Route key={routeName} path={routes[routeName].path} element={routes[routeName].element} />
            )}
          </Route>
          {/* Unprotected routes, accessible if not exists authentication */}
          <Route element={<NoAuthRoute />}>
            {noAuthRoutes.map(routeName =>
              <Route key={routeName} path={routes[routeName].path} element={routes[routeName].element} />
            )}
          </Route>
        </Route>
        {/* Not existing routes */}
        <Route path="*" element={<Navigate to={routes.home.path} replace />} />
      </RouterProviders>
    </AppProviders>
  )
}

export default App
