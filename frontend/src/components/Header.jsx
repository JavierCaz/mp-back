import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "features/auth/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { authRoutes, noAuthRoutes, routes } from "routing/routes"
import { useCallback, useMemo } from "react"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = useCallback(() => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }, [dispatch, navigate])

    const navLinks = useMemo(() => {
        if (user) {
            return [...authRoutes.map(routeName => 
                <Link key={routes[routeName].name} to={routes[routeName].path}>{routes[routeName].name}</Link>
            ),
            <button onClick={onLogout}>Logout</button>
            ]
        }

        return noAuthRoutes.map(routeName => 
            <Link key={routes[routeName].name} to={routes[routeName].path}>{routes[routeName].name}</Link>
        )
    }, [user, onLogout])

    return (
        <header>
            <nav style={{display:'grid', gridAutoFlow:'column', gap:'1em', justifyContent:'start', padding:'0.5em'}}>
                {navLinks}
            </nav>
        </header>
    )
}

export default Header
