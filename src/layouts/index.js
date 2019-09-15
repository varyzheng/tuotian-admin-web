import { connect } from 'dva';
import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon, message
} from 'antd';
import router from 'umi/router';
import { pageError, breadMapping } from '@/utils/Constants'
import Cookie from '@/utils/Cookie'

const {
  Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends React.Component {

  constructor(props) {
    super(props)
    const pathname = props.location.pathname
    const arr = pathname.split('/')
    let breadFirst= '', breadSecond = '', activeKey = '';
    if (arr && arr.length) {
      if (arr[1]) {
        breadFirst = breadMapping[arr[1]]
      }
      if (arr[2]) {
        breadSecond = breadMapping[arr[2]]
        activeKey = arr[2]
      }
    }
    this.state = {
      collapsed: false,
      breadFirst,
      breadSecond,
      activeKey,
    };
    if (!Cookie.get('token') && pathname !== '/login') {
      router.push('/login');
    }
    const { dispatch } = props
    dispatch({
      type: 'initData/initPageData',
      payload: props.location,
    })
  }

  componentWillReceiveProps(props) {
    const pathname = props.location.pathname
    const arr = pathname.split('/')
    let breadFirst= '', breadSecond = '', activeKey = '';
    if (arr && arr.length) {
      if (arr[1]) {
        breadFirst = breadMapping[arr[1]]
      }
      if (arr[2]) {
        breadSecond = breadMapping[arr[2]]
        activeKey = arr[2]
      }
    }
    this.setState({
      breadFirst,
      breadSecond,
      activeKey,
    })
    const { dispatch } = props
    dispatch({
      type: 'initData/initPageData',
      payload: props.location,
    })
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  chooseModule = (val) => {
    if (val.keyPath && val.keyPath[1]) {
      router.push(`/${val.keyPath[1]}/${val.key}`);
      this.setState({ breadFirst: breadMapping[val.keyPath[1]], breadSecond: breadMapping[val.key], activeKey: val.key })
    } else {
      message.error(pageError);
    }
  }

  render () {
    return this.props.location.pathname !== '/login' ? (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultOpenKeys={['card', 'product', 'case', 'news']}
            onClick={this.chooseModule} defaultSelectedKeys={[this.state.activeKey]}
          >
            <SubMenu
              key="card"
              title={<span><Icon type="bg-colors" /><span>色卡管理</span></span>}
            >
              <Menu.Item key="add-color-type">添加色卡分类</Menu.Item>
              <Menu.Item key="color-type-list">色卡分类列表</Menu.Item>
              <Menu.Item key="add-color">添加色卡</Menu.Item>
              <Menu.Item key="color-list">色卡列表</Menu.Item>
            </SubMenu>
            <SubMenu
              key="product"
              title={<span><Icon type="hdd" /><span>产品管理</span></span>}
            >
              <Menu.Item key="add-product-type">添加产品分类</Menu.Item>
              <Menu.Item key="product-type-list">产品分类列表</Menu.Item>
              <Menu.Item key="add-product">添加产品</Menu.Item>
              <Menu.Item key="product-list">产品列表</Menu.Item>
            </SubMenu>
            <SubMenu
              key="case"
              title={<span><Icon type="trophy" /><span>案例管理</span></span>}
            >
              <Menu.Item key="add-case">添加案例</Menu.Item>
              <Menu.Item key="case-list">案例列表</Menu.Item>
            </SubMenu>
            {/* <SubMenu
              key="news"
              title={<span><Icon type="global" /><span>新闻中心</span></span>}
            >
              <Menu.Item key="add-news">添加新闻</Menu.Item>
              <Menu.Item key="news-list">新闻列表</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{this.state.breadFirst}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.breadSecond}</Breadcrumb.Item>
            </Breadcrumb>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            托田铝业 ©2019 Created by 匠杺印
          </Footer>
        </Layout>
      </Layout>
    ) : this.props.children
  }
}

const Connected = connect()(BasicLayout)
export default Connected;

