import React, { FC } from 'react';
import { Layout, Breadcrumb } from 'antd';
import SideMenu from './SideMenu';
import SideMenuJson from './SideMenuData.json';

const { Header, Content, Footer } = Layout;

interface IAppLayout {
  children: React.ReactNode
}

const AppLayout: FC<IAppLayout> = (prop: IAppLayout) => {
  const { children } = prop || {};
  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="app-logo">
          <img src="./favicon.ico" width={32} height={32} alt={""} />
          <span className="app-logo-text">Technical Sharing</span>
        </div>
      </Header>
      <SideMenu data={SideMenuJson} />
      <Layout className="site-layout">
        <Content className="site-content">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-content-layout">
            {children}
          </div>
        </Content>
        <Footer className="app-footer">Copyright 2021 - DG1-Ext</Footer>
      </Layout>
    </Layout>
  );
}

export default AppLayout;