import React, {useState} from "react";
import { FirebaseError } from 'firebase/app';
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../firebase.tsx";
import {Form, Input, Switcher, Title, Wrapper, Error} from "../components/auth-components.tsx";
import GithubButton from "../components/github-btn.tsx";

export default function CreateAccount(){
    const navigate = useNavigate();

    const[ isLoading, setLoading ] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name, value}} = e;

        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || email === "" || password === "") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (e){
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        }finally {
            setLoading(false);
        }
    }

    return (
        <Wrapper>
            <Title>Login info X </Title>
            <Form onSubmit={onSubmit}>
                <Input name="email" value={email} placeholder="Email" type="email" onChange={onChange} required></Input>
                <Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} required></Input>
                <Input type="submit" value={isLoading ? "Loading..." : "Log in"}></Input>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an account?{" "}
                <Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
            <GithubButton></GithubButton>
        </Wrapper>
    );

}