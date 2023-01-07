import { useState, useEffect } from "react"

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
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
            </section>
        </>
    )
}

export default Register