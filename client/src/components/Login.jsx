import React, {useState} from 'react';
import {loginAction} from "../redux/actions/authAction";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    function handleChange(e){
        setUserInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    function handleLogin(e){
        e.preventDefault();
        setErrorMessage("")
        if(!userInfo.email || !userInfo.password){
            return;
        }
        dispatch(loginAction(userInfo)).unwrap().then((data)=>{
            navigate("/")
        }).catch(ex=>{
            setErrorMessage(ex.message)
        })
    }

    return (
        <div>
            <form className="max-w-sm card mt-10" onSubmit={handleLogin}>

                <h4 className="text-base font-medium text-center text-dark-900">Login Page</h4>

                {errorMessage && (
                    <div className="text-sm text-center text-red-500 bg-red-400/20 px-3 py-2 rounded-lg my-4">
                        {errorMessage}
                    </div>
                )}

                <div>
                    <label htmlFor="" className="font-medium text-sm my-2">Email</label>
                    <input
                        onChange={handleChange}
                        className="input"
                        name="email"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="font-medium text-sm my-2">Passord</label>
                    <input
                        onChange={handleChange}
                        className="input"
                        name="password"
                    />
                </div>
                <p className="text-sm py-4">Create new an account ? <Link className="text-blue-500" to="/register">Create</Link></p>
                <button type="submit" className="btn mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;