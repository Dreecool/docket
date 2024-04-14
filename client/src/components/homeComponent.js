import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logoutUser } from '../actions/credentials';
//page
import AddTaskPage from './subComponents/addTask';
import NotificationPage from './subComponents/notification';
import InboxPage from './subComponents/inbox';
import TodayPage from './subComponents/today';
import UpcommingPage from './subComponents/upcomming';
import {
  UserOutlined,
  CalendarOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  PaperClipOutlined,
  CalendarFilled,
  UnorderedListOutlined,
  LoginOutlined,
  CalendarTwoTone
} from '@ant-design/icons';
const { Sider, Content } = Layout;

const HomeComponent = () => {

    const [collapsed, setCollapsed] = useState(true);
    const dispatch = useDispatch()
  
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
  
    const id = Cookies.get("userId");

    useEffect(() => {
      dispatch(getUser(id));
    }, []);
  
    const userName = useSelector((state) => state.User.responseData?.name);

    const userID = useSelector((state) => state.User.responseData?.ID);
    
    const handleLogout = () => {
      try {
        Cookies.remove('authToken');
        Cookies.remove('userId');
      } catch(error) {
        console.log(error)
      } finally {
        window.location.reload()
      }
     
    }
  
  
    const [task, setTask] = useState(false);
    const [notifation, setShowNotification] = useState(false)
    const [inbox, setShowInbox] = useState(false)
    const [today, setShowToday] = useState(true)
    const [upcomming, setShowUpcomming] = useState(false)
    const [showModal, setShowModal] = useState(true)
  
    const ShowTask = () => {
      setTask(true)
      setShowNotification(false)
      setShowInbox(false)
      setShowToday(false)
      setShowUpcomming(false)
      setShowModal(!showModal)
    }
  
    const ShowNotification = () => {
      setShowNotification(true)
      setTask(false)
      setShowInbox(false)
      setShowToday(false)
      setShowUpcomming(false)
    }

    const ShowInbox = () => {
      setShowInbox(true)
      setShowNotification(false)
      setTask(false)
      setShowToday(false)
      setShowUpcomming(false)
    }
  
    const ShowToday = () => {
      setShowInbox(false)
      setShowNotification(false)
      setTask(false)
      setShowToday(true)
      setShowUpcomming(false)
    }
  
    const ShowUpcomming = () => {
      setShowInbox(false)
      setShowNotification(false)
      setTask(false)
      setShowToday(false)
      setShowUpcomming(true)
    }

    return (
        <>
         <Layout style={{ minHeight: '100vh', background: '#fff' }}>

            <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} style={{ background: '#F5F5F5', borderRight: '1px solid rgba(0,0,0,0.2)', position: 'sticky', top: 0, height: '100vh' }}>
                <div className="logo" style={{ background: '#F5F5F5'}}  />
                  <div>
                    <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', alignItems: 'center', padding: '8px', cursor: 'pointer', color: 'black' }} onClick={toggleCollapsed}>
                        {collapsed ? '☰' : '✖'}
                    </div>
                  </div>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" style={{ background: '#F5F5F5', color: '#000', border: 'none' }}>
                  <Menu.Item key="0" icon={<UserOutlined />}>
                      {userName} 
                  </Menu.Item>
                  <Menu.Item key="1" icon={<UnorderedListOutlined />} onClick={ShowToday}>
                      Today
                  </Menu.Item>
                  <Menu.Item key="2" icon={<ArrowRightOutlined />} onClick={ShowUpcomming}>
                  Upcoming
                  </Menu.Item> 
                  <Menu.Item key="3" icon={<CalendarFilled />} onClick={ShowTask}>
                    Delayed Tasks
                  </Menu.Item> 
                  <Menu.Item key="4" icon={<PaperClipOutlined/>} onClick={ShowInbox}>
                      Sticky Wall
                  </Menu.Item>
                  <hr/> 
                  <Menu.Item key="10" icon={<LogoutOutlined />} onClick={handleLogout}>
                      Sign out
                  </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{background: 'white'}}>
                <Content style={{ margin: '16px' }}>
                <div style={{ padding: 24, minHeight: 360, background: 'white' }}>
                    {upcomming ? <div> <UpcommingPage/> </div> : null}  
                    {notifation ? <div> <NotificationPage/> </div> : null}
                    {task ? <div><AddTaskPage/></div> : null}
                    {inbox ? <div> <InboxPage/> </div> : null}
                    {today ? <div> <TodayPage/> </div> : null}
                </div>
                </Content>
            </Layout>
            </Layout>

    
        </>
    )
}

export default HomeComponent