import { useState,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import pf from "./pf.gif";
function Signup() {

    //* creating three useState
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const fileInputRef = useRef(null);
    //* navigate
    const navigate = useNavigate();

    //* signup Handle Function
    const signupHandle = async () => {

        //* Send Data Through Api 
        const res = await fetch('http://localhost:4000/api/auth/signup', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({name,email,password,image})
        });

        //* receiving response 
        const signupData = await res.json();
        // console.log(signupData.success)

        //* condition
        if(signupData.error){
            toast.error(signupData.error)
        }else{
            toast.success(signupData.success)
            navigate('/login')
        }

        setName("");
        setEmail("");
        setPassword("");
        setImage("");
    }

    //converting to base64
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
       
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          //base64 encoded string
        };
        reader.readAsDataURL(selectedFile);
        
        reader.onerror= error=>{
        console.log("ERROR :", error);
        };
      };
   console.log("image",image);
    return (
        <div className=' flex justify-center items-center h-screen'>

            {/* main div  */}
            <div className='px-10 py-10 rounded-xl '>

                {/* Top Heading  */}
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Signup</h1>
                </div>

                {/* Input 1 Name  */}
                <div>
                <div className='mb-4 flex justify-center'>
                    <input 
                        type="file" 
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <img 
                        className="w-32 h-32 rounded-full object-cover cursor-pointer" 
                        src={image || pf} 
                        alt="Profile Preview" 
                        onClick={() => fileInputRef.current.click()} 
                    />
                </div>
                    
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name='name'
                        className=' bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Name'
                    />
                </div>

                {/* Input 2 Email  */}
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name='email'
                        className=' bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>

                {/* Input 3 Password  */}
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className='bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>

                {/* Button For Signup  */}
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signupHandle}
                        className=' bg-red-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>

                {/* Link For Login  */}
                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-green-700 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup