import React, {FC} from 'react';
import {Col, Divider, Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {RouteNames} from "../routs";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const {Header} = Layout;

const Navbar:FC = () => {

    const router = useHistory()
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {sagaSignOut} = useActions()

    return (
        <Header>
            <Row>
                <Col span={8}>
                    <span><img src="/books-62px.png"/></span>
                    &nbsp;
                    <span style={{color: 'white', fontSize: 'large'}}>The Ilium City Public Library</span>
                </Col>
                <Col span={16} offset={0}>
                    <Row justify="end">
                        {
                            isAuth ?
                                <>
                                    <div style={{color: 'white'}}>{user.username}</div>
                                    <Menu theme="dark" mode="horizontal" selectable={false} style={{minWidth: '100px'}}>
                                        <Menu.Item key={1} onClick={() => sagaSignOut(user)}>
                                            Sign out
                                        </Menu.Item>
                                    </Menu>
                                </>
                                :
                                <Menu theme="dark" mode="horizontal" selectable={false} style={{minWidth: '100px'}}>
                                    <Menu.Item key={2} onClick={() => router.push(RouteNames.LOGIN)}>
                                        Sign in
                                    </Menu.Item>
                                </Menu>
                        }
                    </Row>
                </Col>
            </Row>
        </Header>
    );
};

export default Navbar;