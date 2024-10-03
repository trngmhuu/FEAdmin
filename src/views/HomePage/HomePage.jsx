import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import './homePage.css'
import { CircleLoader } from 'react-spinners';
import SideBar from '../../components/SideBar/SideBar';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import MainDashboard from '../../components/Main/mainDashboard/MainDashboard';
import MainUser from '../../components/Main/mainUser/MainUser';
import MainTour from '../../components/Main/mainTour/MainTour';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


function HomePage() {
    const [loading, setLoading] = useState(false);
    const [activeComponent, setActiveComponent] = useState('dashboard');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    // Ánh xạ các component với tên
    const componentsMap = {
        dashboard: <MainDashboard />,
        user: <MainUser />,
        tour: <MainTour />,
        // Thêm các component khác vào đây
    };

    // Hàm để thay đổi component đang hiển thị
    const changeComponent = (component) => {
        setActiveComponent(component);
    };


    return (
        <div className='homePage'>
            {
                loading ?
                    <div className="loader-container">
                        <CircleLoader color='#33CCFF' loading={loading} size={150} />
                    </div>
                    :
                    <>
                        <Header />
                        <SideBar changeComponent={changeComponent} />
                        <TransitionGroup>
                            <CSSTransition
                                key={activeComponent}
                                timeout={300}
                                classNames="fade"
                            >
                                <div>{componentsMap[activeComponent]}</div>
                            </CSSTransition>
                        </TransitionGroup>
                    </>
            }
        </div>
    )
}

export default HomePage