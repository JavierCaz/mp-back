import { useState, useEffect } from "react"
import { login, reset } from "features/auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { Snackbar, IconButton, Box, LinearProgress } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');

    const dispatch = useDispatch()

    const { isLoading, isError, message } = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmint = (e) => {
        e.preventDefault()

        const userData = {
            email, 
            password
        }

        dispatch(login(userData))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        if(isError){
            setOpen(true);
            setSnackMsg(message)
        }

        dispatch(reset())
        
    }, [isError, message, dispatch])

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

export default Login