import React, {useState} from 'react';
import './css/LoginPage.css';
// import shoppingAnimation from '../assets/shopping.gif';
import Lottie from 'lottie-react';
import shoppingAnimation from '../assets/shopping.json';


function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '',confirm:''});
    const [error, setError] = useState('');

    const handlechange = e => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const { token } = await login({ email: form.email, password: form.password});
                setToken(token);
                window.location.href = '/products';
            } else {

                if (form.password !== form.confirm) {
                    throw new Error("Wrong Password");
                }
                await register({
                    name: form.name,
                    email: form.email,
                    password: form.password

                });
                setIsLogin(true);
            }

        }catch (err) {
            setError(err.response?.data?.message || err.message);


        }
    };


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(isLogin ? "Loggin in..." : "Registering...");
    // };


    return (
        <div className="login-wrapper">
            <div className="background-animation">
                {/* <img src{shoppingAnimation} alt="Shopping"/> */}
                <Lottie animationData={shoppingAnimation} loop={true}/>

            </div>

            <div className="login-box">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>

                <form onSubmit={handleSubmit}>
                    <input type="email" placeholeder="Email" required />
                    <input type="password" placeholeder="Password" required />

                    {!isLogin && <input type="password" placeholder="Confirm Password" required />}
                    
                    <button type="submit">{'isLogin' ? 'Login' : 'Register'}</button>


                </form>
                <div className="divider">OR</div>

                {/* GOOGLE LOGIN */}
                <button className="google-btn">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                </button>

                <p className="toggle">
                    {isLogin ? "Don't have an Account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? " Register here" : " Login Here"}

                    </span>
                </p>


            </div>
        </div>
    );


}

export default LoginPage; 