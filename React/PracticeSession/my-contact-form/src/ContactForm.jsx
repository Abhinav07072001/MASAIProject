import { useState } from "react";

export default function ContactForm(){
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        message:""
    });

    const handleChange=(e)=>{
        const {name, value}=e.target;
        setFormData((prev)=> ({...prev, [name]: value}));
        
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("FormData", formData);
        // Here we can send formData to backend API

        // reset form fields
        setFormData({
            name:"",
            email:"",
            message:""
        });
    }

    return(
        <div  
        style={{textAlign:"center", border:"1px solid #ddd",
            padding:"5vh" , borderRadius:"4px"
        }}>
            <h2>Contact Form</h2>
            <form  onSubmit={handleSubmit } className="space-y-4 p-4 border rounded-lg w-96">
                <input type="text"
                name="name" 
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"

                />
                <br />
                <br />

                <input type="email" 
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                />
                <br />
                <br />

                <textarea name="message" 
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                />
                <br />
                <br />
                <button type="submit"
                className="w-full p-2 border rounded"
                >send</button>
            </form>
        </div>
    )
}