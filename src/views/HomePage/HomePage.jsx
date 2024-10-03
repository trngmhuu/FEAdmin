import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { CircleLoader } from 'react-spinners';

function HomePage() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    }, [])


    return (
        <div className='homepage'>
            {
                loading ?
                    <CircleLoader color='#abdbe3' loading={loading} size={150} />
                    :
                    <div>
                        <Header />
                    </div>
            }
        </div>
    )
}

export default HomePage