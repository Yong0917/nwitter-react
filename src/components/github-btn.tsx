import styled from "styled-components";
import {signInWithPopup, GithubAuthProvider} from "firebase/auth";
import {auth} from "../firebase.tsx";
import {useNavigate} from "react-router-dom";


const Button = styled.span`
  background-color: white;
  font-weight: 500;
  margin-top: 20px;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 25px;
`;


export default function GithubButton(){
    const navigate = useNavigate();

    const onClick = async () => {
        try{
            const provider = new GithubAuthProvider();
            // await signInWithRedirect(auth, provider); // 현재페이지에서 redirect
            await signInWithPopup(auth, provider);  // 팝업
            navigate("/");
        } catch (error){
            console.log(error);
        }
    };
    return (
      <Button onClick={onClick}>
          <Logo src="/github-logo.svg"/>
          Continue with Github
      </Button>
    );
}