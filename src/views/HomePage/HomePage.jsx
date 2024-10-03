import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import './homePage.css'
import { CircleLoader } from 'react-spinners';
import SideBar from '../../components/SideBar/SideBar';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Main from '../../components/Main/Main';

function HomePage() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])


    return (
        <div className='homePage'>
            {
                loading ?
                    <CircleLoader color='#abdbe3' loading={loading} size={150} />
                    :
                    <>
                        <Header />
                        <SideBar />
                        <Main />
                    </>
            }
        </div>
    )
}

export default HomePage