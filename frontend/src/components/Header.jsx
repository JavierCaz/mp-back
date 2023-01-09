import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const Header = ({pages = []}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header>
            <nav style={{display:'grid', gridAutoFlow:'column', gap:'1em', justifyContent:'start', padding:'0.5em'}}>
                {user ? <button onClick={onLogout}>Logout</button> : pages}
            </nav>
        </header>
    )
}

export default Header
