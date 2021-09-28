import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {IUser} from "../models/IUser";

const LoginForm: FC = () => {

    const MODE_TYPE = Object.freeze({
        SIGN_IN:   Symbol("SIGN_IN"),
        SIGN_UP:  Symbol("SIGN_UP")
    });

    const [mode, setMode] = useState(MODE_TYPE.SIGN_IN)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [localError, setLocalError] = useState('')
    const {isLoading, error} = useTypedSelector(state => state.auth)

    const {sagaSignUp, sagaSignIn} = useActions()

    let isSignIn = MODE_TYPE.SIGN_IN.toString() === mode.toString();

    const submit = () => {

        setLocalError("");

        if (isSignIn) {
            sagaSignIn({username: username, password: password} as IUser);
        } else {

            if (password === repassword) {
                sagaSignUp({username: username, password: password} as IUser);
            } else {
                setLocalError("Your password and confirmation password do not match");
            }
        }
    }

    const switchMode = () => {
        if (isSignIn) {
            setMode(MODE_TYPE.SIGN_UP);
        } else {
            setMode(MODE_TYPE.SIGN_IN);
        }
    }

    let submitButton = <Button type="primary" htmlType="submit" loading={isLoading}>
            {isSignIn ? "Sign in" : "Sign up"}
        </Button>;
    let switchLink = <a onClick={switchMode}>
            {isSignIn ? "Sign up" : "Sign in"}
        </a>;

    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            {localError && <div style={{color: 'red'}}>
                {localError}
            </div>}
            <Form.Item
                label="Login"
                name="username"
                rules={[rules.required("Please enter email!")]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required("Please enter password")]}
            >
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={"password"}
                />
            </Form.Item>

            <Form.Item
                label="Repassword"
                name="repassword"
                rules={!isSignIn ? [rules.required("Please enter repassword")] : []}
                hidden={isSignIn}
            >
                <Input
                    value={repassword}
                    onChange={e => setRepassword(e.target.value)}
                    type={"password"}
                />
            </Form.Item>

            <Form.Item>
                {submitButton}
                &nbsp;
                {switchLink}

            </Form.Item>
        </Form>
    );
};

export default LoginForm;
