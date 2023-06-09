import React, {Fragment} from "react";
import { connect } from 'react-redux';
import Login from "./Login";
import {renderRoutes} from 'react-router-config';
import {
    Route,
    Link
} from 'react-router-dom';
import {
    UserOutlined,
    HomeFilled,
    LogoutOutlined,
    LayoutFilled,
    DollarCircleFilled,
    DatabaseFilled,
    FileSearchOutlined,
    FileTextFilled,
    CreditCardOutlined,
    DiffOutlined,
    BookOutlined,
    ContainerOutlined,
    AuditOutlined,
    CarryOutOutlined
} from '@ant-design/icons';
import {Layout, Menu, Tooltip, Button } from 'antd';
import * as actions from "../actions";
const {Header, Content, Sider} = Layout;
const reducer = ({ main }) => ({ main });


class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    async flush() {
        const result = await actions.flush();
    };
    render() {
        let { main:{user}, location, route: {routes} } = this.props;
        function setDefault(){
            let res = 'purchases';
            let a = location.pathname.split('/');
            switch(a[2]){
                case null: res = 'home'; break;
                case 'bundles': res = 'bundles'; break;
                case 'purchases': res = 'purchases'; break;
                case 'teachers': res = 'teachers'; break;
                case 'category': res = 'category'; break;
                case 'lessons': res = 'lessons'; break;
                // case 'tses':
                //     if(a[3] === 'food'){
                //         res = 'food'
                //     } else if(a[3] === 'category'){
                //         res = 'category'
                //     }
                //     break;
                default: res = 'home';
            }
            return res;
        }
        if (user === null || user === undefined || user === '') {
            return (
                <Fragment>
                    <Route exact path={'/admin/login'} component={Login}/>
                </Fragment>
            );
        } else {
            return (
                <Layout className='main-layout'>
                    <Sider
                        theme='light'
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={() => this.setState({collapsed: !this.state.collapsed})}
                    >
                        <div className="sider-logo">
                                {this.state.collapsed?
                                    <h3>OS</h3>
                                    :
                                    <h3>Odo Sury</h3>
                                }
                        </div>
                        <Menu theme="light" defaultSelectedKeys={[setDefault()]}  mode="inline">
                            {/*<Menu.Item key="home" icon={<HomeFilled />}>*/}
                            {/*    <Link to="/admin">*/}
                            {/*        <span>Нүүр</span>*/}
                            {/*    </Link>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="purchases" icon={<DollarCircleFilled />}>
                                <Link to="/admin">
                                    <span>Худалдан авалт</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="promoCodes" icon={<CreditCardOutlined />}>
                                <Link to="/admin/Promo">
                                    <span>Промо Код</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="partners" icon={<CreditCardOutlined />}>
                                <Link to="/admin/Partner">
                                    <span>Хамтрагч байгууллага</span>
                                </Link>
                            </Menu.Item>
                            {/*<Menu.Item key="teachers" icon={<UserOutlined />}>*/}
                            {/*    <Link to="/admin/teachers">*/}
                            {/*        <span>Багш</span>*/}
                            {/*    </Link>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key="users" icon={<UserOutlined />}>
                                <Link to="/admin/user">
                                    <span>Хэрэглэгч</span>
                                </Link>
                            </Menu.Item>
                            <Menu.SubMenu key="lesson" icon={<FileTextFilled />} title="Хичээлүүд">
                                <Menu.Item key="lessons" icon={<FileTextFilled />}>
                                    <Link to="/admin/lessons">
                                        <span>Хичээл</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="category" icon={<DatabaseFilled />}>
                                    <Link to="/admin/category">
                                        <span>Ангилал</span>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="audio" icon={<BookOutlined />} title="Сонсдог ном">
                                <Menu.Item key="audios" icon={<FileTextFilled />}>
                                    <Link to="/admin/audios">
                                        <span>Номнууд</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="audioCategory" icon={<DatabaseFilled />}>
                                    <Link to="/admin/audioCategory">
                                        <span>Ангилал</span>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="knowledge" icon={<FileSearchOutlined />} title="Танин мэдэхүй">
                                <Menu.Item key="knowledge" icon={<FileTextFilled />}>
                                    <Link to="/admin/knowledge">
                                        <span>Танин мэдэхүй</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="knowledgeCategory" icon={<DatabaseFilled />}>
                                    <Link to="/admin/knowledgeCategory">
                                        <span>Ангилал</span>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="teacherRequest" icon={<AuditOutlined />}>
                                <Link to="/admin/teacherRequest">
                                    <span>Багш хүсэлт</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="feedBack" icon={<ContainerOutlined />}>
                                <Link to="/admin/feedBack">
                                    <span>Санал хүсэлт</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="jobPost" icon={<CarryOutOutlined />}>
                                <Link to="/admin/jobpost">
                                    <span>Ажлын зар</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="test" icon={<DiffOutlined />}>
                                <Link to="/admin/test">
                                    <span>Шалгалт</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="bundles" icon={<LayoutFilled />}>
                                <Link to="/admin/bundles">
                                    <span>Багц</span>
                                </Link>
                            </Menu.Item>
                            <Button style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'block',
                            }} type={"primary"} onClick={() => this.flush()}>Cache цэвэрлэх</Button>
                        </Menu>
                        {/*<Button type="primary" onClick={() => this.toggleCollapsed()} style={{ marginBottom: 16, width: "100%"}}>*/}
                        {/*    {this.state.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}*/}
                        {/*</Button>*/}
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" >
                            <Tooltip placement="bottom" title='Гарах'>
                                <a href="/logout" className='logout-button'><LogoutOutlined /></a>
                            </Tooltip>
                        </Header>

                        <Content className='odoSury-content'>
                            {renderRoutes(routes)}
                        </Content>
                    </Layout>
                </Layout>
            );
        }
    }
}

export default  connect(reducer)(index);
