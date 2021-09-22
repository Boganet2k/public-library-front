import React, {FC, useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import {Layout, Menu, Breadcrumb, Row} from "antd";
import Navbar from "./components/Navbar";
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUser";

const { Header, Content, Footer } = Layout;

const App:FC = () => {

    const {setUser, setIsAuth} = useActions();

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username' || '')} as IUser)
            setIsAuth(true);
        }
    }, [])

  return (
    <Layout className="layout">
        <Navbar/>
        <Layout.Content style={{ padding: '0 50px' }}>

            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <AppRouter/>
        </Layout.Content>
    </Layout>
  );
};

export default App;
