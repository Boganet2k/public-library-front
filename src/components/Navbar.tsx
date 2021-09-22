import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {RouteNames} from "../routs";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const { Header, Content, Footer } = Layout;

const Navbar:FC = () => {

    const router = useHistory()
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useActions()

    return (
        <Header>
            <Row justify="end">
                {
                    isAuth ?
                        <>
                            <div style={{color: 'white'}}>{user.username}</div>
                            <Menu theme="dark" mode="horizontal" selectable={false} style={{minWidth: '100px'}}>
                                <Menu.Item key={1} onClick={logout}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                        </>
                        :
                        <Menu theme="dark" mode="horizontal" selectable={false} style={{minWidth: '100px'}}>
                            <Menu.Item key={2} onClick={() => router.push(RouteNames.LOGIN)}>
                                Login
                            </Menu.Item>
                        </Menu>
                }
            </Row>
        </Header>
    );
};

export default Navbar;