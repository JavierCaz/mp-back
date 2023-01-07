import { useState, useEffect } from "react"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { name, email, password, password2 } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmint = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <section className="form">
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
            </section>
        </>
    )
}

export default Login