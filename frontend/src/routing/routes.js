const { Register, Login, Home } = require("pages");

export const authRoutes = ['home'] //Redirect to login if user is not authenticated
export const noAuthRoutes = ['login', 'signup'] //Redirect to home if user is authenticated

export const routes = {
    home: {
        name: 'Home',
        path: '/',
        element: <Home />
    },
    login: {
        name: 'Login',
        path: '/login',
        element: <Login />
    },
    signup: {
        name: 'Register',
        path: '/register',
        element: <Register />
    }
}

export const pages = [
    {
        name: 'Home',
        path: '/',
        element: <Home />
    },
    {
        name: 'Login',
        path: '/login',
        element: <Login />
    },
    {
        name: 'Register',
        path: '/register',
        element: <Register />
    },
]