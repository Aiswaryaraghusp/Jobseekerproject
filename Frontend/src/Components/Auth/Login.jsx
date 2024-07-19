import React from 'react'
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const {isAuthorized, setIsAuthorized,user,setUser} = useState(Context);

  const handleRegister = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post(
        "/api/v1/user/register",
      {email,password,role},
      {withCredentials:true,headers:{
        "Content-Type" : "application/json"
      }
    }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setRole("");
      setPassword("");
      setIsAuthorized(true);
    } catch(error){
      toast.error(error.response.data.message)
      console.log(error)
    }
  };

  if(isAuthorized){
    return <Navigate to={"/"} />;
  }
  return (
    <>
    <div className="authPage">
      <div className="container">
        <div className="header">
           <img src="/JobZeelogo.png" alt="logo"/>
           <h3>Login to your account</h3>
           </div>
           <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e)=> setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value='Job Seeker'>Job Seeker</option>

                </select>
                <FaRegUser/>
              </div>
            </div>
            

            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <MdOutlineMailOutline/>
              </div>
            </div>

            
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input type="number" value={number} onChange={(e)=> setPhone(e.target.value)}/>
                <FaphoneFlip/>
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input type="password" value={number} onChange={(e)=> setPhone(e.target.value)}/>
                <RiLock2Fill />
              </div>
            </div>
            <button onClick={handleLogin} type="submit">Login</button>
            <Link to={"/login"}>Register Now</Link>
           </form>
      </div>
     <div className="banner">
      <img src="/login.png" alt="register"/>
     </div>
    </div>
    </>
  )
};

export default Login