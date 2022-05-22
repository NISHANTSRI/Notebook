import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const { showAlert } = props
    let history = useNavigate()
    const handleSubmit = async (e) => {
        const host = 'http://localhost:5000'
        e.preventDefault();
        if (credentials.cpassword === credentials.password) {
            const response = await fetch(`${host}/api/auth/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            const json = await response.json()
            console.log(json)
            if (json.success) {
                localStorage.setItem('token', json.authToken)
                showAlert("User Created Successfully", 'success')
                history('/')
            } else {
                //setcredentials({ name: '', email: '', password: '', cpassword: '' })
                showAlert("User Already Exist", 'warning')
            }
        } else {
            showAlert("Passwords Don't match", 'warning')
        }
    }
    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Name Here</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credentials.name} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="password" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' onChange={onChange} value={credentials.cpassword} id="cpassword" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup