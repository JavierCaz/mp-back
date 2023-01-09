import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useComposeProviders } from 'hooks'

import Header from 'components/Header'
import { Home, Login, Register } from 'pages'
import { ScreenSizeContextProvider } from 'context/ScreenSizeContext'

const pages = [
  {
    name: 'Home',
    route: '/', 
    element: <Home />
  },
  {
    name: 'Login',
    route: '/login',
    element: <Login />
  },
  {
    name: 'Register',
    route: '/register', 
    element: <Register />
  },
]

const App = () => {
  const links = pages.map(page => <Link key={page.name} to={page.route}>{page.name}</Link>)

  // const RouterProviders = useComposeProviders(Router, Routes)
  const AppProviders = useComposeProviders(ScreenSizeContextProvider)

  return (
    <AppProviders>
      <Router>
        <Header pages={links} />
        <Routes>
          {pages.map(page => <Route key={page.name} path={page.route} element={page.element} />)}
        </Routes>
      </Router>
    </AppProviders>
  )
}

export default App
