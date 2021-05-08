import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Breadcrumb from './Breadcrumb';
import SideMenu from './SideMenu';
import SideMenuJson from './SideMenuData.json';
import Logo from '../assets/logo.png';

const { Header, Content, Footer } = Layout;

interface IAppLayout {
    children: React.ReactNode;
}

const AppLayout: FC<IAppLayout> = (prop: IAppLayout) => {
    const { children } = prop || {};
    return (
        <Layout className="app-layout">
            <Header className="app-header">
                <div className="app-logo">
                    <Link to="/" className="app-logo-link">
                        <img src={Logo} width={32} height={32} alt={''} />
                        <span className="app-logo-text">Technical Sharing</span>
                    </Link>
                </div>
            </Header>
            <SideMenu data={SideMenuJson} />
            <Layout className="site-layout">
                <Content className="site-content">
                    <Breadcrumb />
                    <div className="site-content-layout">{children}</div>
                </Content>
                <Footer className="app-footer">Copyright 2021 - DG1-Ext</Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
