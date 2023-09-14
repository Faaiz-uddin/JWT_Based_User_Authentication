// pages/Home.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import './globals.css';

const Home = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        //console.log("not cokkie set");
        router.push("/pages/login");
        return;
      }
      try {
        const token = cookies.token;
        //console.log("Token: " + token);
         // Server-side validation
        const response = await axios.post('http://localhost:4000/api/user',{
          headers: {
            'Content-Type': 'application/json',
          }
        },{ withCredentials: true });
        
        // console.log(response.status);
        //console.log(response.data);
        if (response.status == 200) {
          const  email  = response.data.email;
          const  fname  = response.data.fname;
          const  lname  = response.data.lname;
          const fullname=fname+" "+lname;
          setUsername(fullname);
        } else {
          destroyCookie(null, "token"); // Remove the token cookie
          router.push("/pages/login");
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
        destroyCookie(null, "token"); // Remove the token cookie
        router.push("/pages/login");
      }
    };

    verifyCookie();
  }, [cookies.token, router]);

  const Logout = () => {
    destroyCookie(null, "token"); // Remove the token cookie
    router.push("/pages/login");
  };

  return (
    <>
      <div className="container">
      
  
      
     

      { <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pages/about">About Us</Link>
        </li>
        <li>
          <Link href="/blog/blog">Blog Post</Link>
        </li>
        {/* <li>
          <Link href="/pages/login">Log In</Link>
        </li>
        <li>
          <Link href="/pages/signup">Sign Up</Link>
        </li> */}
      </ul> }
      <div className="homepage">
        <h4>
          Welcome <span><h2>{username}</h2></span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      </div>
      
    </>
  );
};

export default Home;
