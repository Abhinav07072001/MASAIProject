import useForm from "../hooks/useForm";

function LoginForm(){
    const {values, handleChange, resetForm}= useForm({
        username:"",
        password:"",
    });

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("✅ Form Submitted", values);
        resetForm();
    };
    return(
        <form onSubmit={handleSubmit} style={{margin:"20px"}}>
            <h2>Login Form</h2>
            <input type="text" 
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter Username"
            />
            <br />
            <br />

            <input type="text" 
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter password" 
            
            />
            <br />
            <br />

            <button type="submit">Login</button>
        </form>
    );
}
export default LoginForm;