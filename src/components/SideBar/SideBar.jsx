import React from 'react'
import './sideBar.css'

function SideBar({ changeComponent }) {
    return (
        <aside id='sidebar' className='sidebar'>
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link"
                        onClick={() => changeComponent('dashboard')}>
                        <i className="bi bi-grid"></i>
                        <span>Tổng quan</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapse"
                        href="#"
                    >
                        <i class="bi bi-clipboard2-data-fill"></i>
                        <span>Thống Kê</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id="components-nav"
                        className="nav-content collapse"
                        data-bs-parent="#sidebar-nav"
                    >
                        <li>
                            <a href="#">
                                <i className="bi bi-circle"></i>
                                <span>Doanh thu</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="bi bi-circle"></i>
                                <span>Thống kê</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className='nav-heading'>Quản lý</li>

                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        onClick={() => changeComponent('user')}
                    >
                        <i class="bi bi-people-fill"></i>
                        <span>Quản lý người dùng</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        onClick={() => changeComponent('tour')}
                    >
                        <i class="bi bi-airplane-fill"></i>
                        <span>Quản lý Tour</span>
                    </a>
                </li>

            </ul>
        </aside>
    )
}

export default SideBar