import { useContext, useEffect, useState, useRef } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import pf from "./pf.gif";
function Profile() {
  const context = useContext(myContext);
  const { allNotes } = context;

  const [user, setUser] = useState([]);
  const [image, setImage] = useState('');
  const fileInputRef = useRef(null);

  const userData = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/auth/getuser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const userData = await res.json();
    // console.log(userData);
    setUser(userData);
  };

  useEffect(() => {
    userData();
  }, []);

  const imageUpdate = async (base64Image) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/auth/updateImage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const result = await res.json();
      if (res.ok) {
        userData(); // Fetch updated user data
      } else {
        console.error("Failed to update image", result);
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    const base64Image = reader.result;
    setImage(base64Image);
    imageUpdate(base64Image);
  };
  reader.readAsDataURL(selectedFile);

  reader.onerror = (error) => {
    console.log("ERROR:", error);
  };
};
  return (
    <Layout>
   
        <div className=" flex justify-center items-center w-[300px] h-[350px] mt-4 border-opacity-60 shadow-md border bg-[#f9f9f964] rounded-xl">
        <div className="mt-32 lg:mt-20 lg:mx-[30em]">
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
                        src={user.image || pf} 
                        alt="Profile Preview" 
                        onClick={() => fileInputRef.current.click()} 
                    />
                </div>
          <h1 className="text-center text-xl font-semibold mb-2">{user.name}</h1>
          <h1 className="text-center text-sm text-gray-600 mb-2">{user.email}</h1>
          <h1 className="text-center text-gray-700">
            Total Notes Created : {allNotes.length}
          </h1>
        </div>
      </div>
      
     
    </Layout>
  );
}

export default Profile;
