import {auth} from "../firebase.tsx";
import {useNavigate} from "react-router-dom";


export default function Home(){
    const navigate = useNavigate();
    const logOut = () => {
        auth.signOut()
        navigate("/login")
    }
    return(
        <h1>
            <button onClick={logOut}>Log out</button>
        </h1>
    );
}