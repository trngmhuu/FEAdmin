import { Tag, Button, Form, Input, Table, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import './searchTable.css';
import { DeleteFilled, EyeOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';

function SearchTable() {
    const [searchParams, setSearchParams] = useState({
        username: '',
        email: '',
        phoneNumber: '',
    });

    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Để hiển thị modal
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '', // Thêm trường password
        roles: [], // Thêm trường role với giá trị mặc định là 'user'
    });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value,
        });
    };

    const handleReset = () => {
        setSearchParams({
            username: '',
            email: '',
            phoneNumber: '',
        });
    };

    const handleReload = () => {
        fetchData();
    };

    const handleAdd = () => {
        setIsModalVisible(true); // Hiển thị modal khi nhấn nút thêm
    };

    const handleEdit = (record) => {
        console.log('Editing', record);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/users/id/${id}`, { method: 'DELETE' });
            const result = await response.json();
            console.log(result);
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleSaveNewUser = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:8080/users/adminCreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User added:', result);
                setIsModalVisible(false); // Ẩn modal sau khi thêm thành công
                fetchData(); // Cập nhật danh sách người dùng sau khi thêm thành công
                // Reset newUser state sau khi thêm thành công
                setNewUser({
                    username: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    roles: '', // Đặt giá trị mặc định cho role
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Họ tên',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => (gender ? 'Nam' : 'Nữ'),
        },
        {
            title: 'Trạng thái',
            key: 'isOnline',
            render: (_, { isOnline }) => (
                <Tag color={isOnline ? 'green' : 'volcano'}>
                    {isOnline ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Hiện thực',
            key: 'action',
            render: (text, record) => (
                <div className="action-buttons">
                    <Button type="link" onClick={() => handleEdit(record)}><EyeOutlined /></Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}><DeleteFilled /></Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <ul className='searchtable-container'>
                <li className='search-container'>
                    <h6>Tìm kiếm người dùng</h6>
                    <Form className="custom-inline-form" layout="inline">
                        <Form.Item>
                            <Input
                                name="username"
                                placeholder="Tên"
                                value={searchParams.username}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                name="email"
                                placeholder="Email"
                                value={searchParams.email}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                name="phoneNumber"
                                placeholder="Số điện thoại"
                                value={searchParams.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={handleReset}>
                                Xóa Trắng
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary">
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Form>
                </li>
            </ul>

            {/* Header của bảng */}
            <div className='table-header'>
                <h6>Bảng dữ liệu</h6>
                <div className='table-header-actions'>
                    <Button type="primary" onClick={handleAdd}>
                        <PlusCircleOutlined />
                    </Button>
                    <Button onClick={handleReload}>
                        <ReloadOutlined />
                    </Button>
                </div>
            </div>

            {/* Bảng dữ liệu với pagination */}
            <div className='table-container'>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={{
                        pageSize: 3,
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '5', '10'],
                    }}
                />
            </div>

            {/* Modal để thêm người dùng mới */}
            <Modal
                title="Thêm người dùng mới"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSaveNewUser}
            >
                <Form layout="vertical">
                    <Form.Item label="Email">
                        <Input
                            name="email"
                            value={newUser.email}
                            onChange={handleNewUserChange}
                        />
                    </Form.Item>
                    <Form.Item label="Tên">
                        <Input
                            name="username"
                            value={newUser.username}
                            onChange={handleNewUserChange}
                        />
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        <Input
                            name="phoneNumber"
                            value={newUser.phoneNumber}
                            onChange={handleNewUserChange}
                        />
                    </Form.Item>
                    <Form.Item label="Mật khẩu">
                        <Input
                            name="password"
                            type="password" // Ẩn mật khẩu
                            value={newUser.password}
                            onChange={handleNewUserChange}
                        />
                    </Form.Item>
                    <Form.Item label="Vai trò">
                        <select
                            name="roles"
                            value={newUser.roles}
                            onChange={(e) => setNewUser({ ...newUser, roles: [e.target.value] })}
                        >
                            <option value="USER">User</option>
                            <option value="EMPLOYEE">Employee</option>
                        </select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default SearchTable;
