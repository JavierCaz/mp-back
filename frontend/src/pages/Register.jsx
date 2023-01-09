import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Snackbar, IconButton, Box, LinearProgress } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { register, reset } from "features/auth/authSlice"

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData
    
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            setOpen(true);
            setSnackMsg(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
        
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmint = (e) => {
        e.preventDefault()

        if(password !== password2){
            setOpen(true);
            setSnackMsg("Passwords do not match")
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
      );

      const loading = (
        <>
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        </>
      )

    return (
        <>
            <section className="form">
                {isLoading ? loading : ''}

                <form onSubmit={onSubmint}>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    value={name} 
                    placeholder="Enter your name" 
                    onChange={onChange} />
                    
                    <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={email} 
                    placeholder="Enter your email" 
                    onChange={onChange} />

                    <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password" 
                    value={password} 
                    placeholder="Enter your password" 
                    onChange={onChange} />

                    <input 
                    type="password" 
                    className="form-control" 
                    id="password2" 
                    name="password2" 
                    value={password2} 
                    placeholder="Confirm password" 
                    onChange={onChange} />

                    <button type="submit">Submit</button>
                </form>

                <div>
                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        message={snackMsg}
                        action={action}
                    />
                </div>
            </section>
        </>
    )
}

export default Register