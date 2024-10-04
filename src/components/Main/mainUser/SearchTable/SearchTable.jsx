import { Button, Form, Input, Table } from 'antd';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Thay 'your_token_key' bằng key mà bạn đã dùng để lưu token
                const response = await fetch('http://localhost:8080/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Thêm token vào header
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.result); // Giả sử bạn cần lấy dữ liệu từ trường 'result'
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

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
            name: '',
            email: '',
            phone: '',
        });
    };

    const handleReload = () => {
        window.location.reload(); // Reload trang
    };

    const handleAdd = () => {
        console.log('Add new data...');
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
            render: (gender) => (gender ? 'Male' : 'Female'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isOnline',
            key: 'isOnline',
            render: (isOnline) => (isOnline ? 'Online' : 'Offline'),
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

    const handleEdit = (record) => {
        console.log('Editing', record);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/users/id/${id}`, { method: 'DELETE' }); // Gọi API xóa người dùng theo ID
            const result = await response.json();
            console.log(result);

            setData(data.filter(item => item.id !== id)); // Xóa người dùng khỏi state sau khi xóa trên server
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <ul className='searchtable-container'>
                <li className='search-container'>
                    <h6>Tìm kiếm người dùng</h6>
                    <Form layout="inline">
                        <Form.Item>
                            <Input
                                name="username"
                                placeholder="Tên"
                                value={searchParams.name}
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
                                value={searchParams.phone}
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
                    dataSource={data} // Dữ liệu người dùng lấy từ API
                    rowKey="id" // Dùng id để định danh mỗi hàng trong bảng
                    pagination={{
                        pageSize: 3, // Số lượng bản ghi trên mỗi trang
                        showSizeChanger: true, // Cho phép người dùng thay đổi số lượng bản ghi/trang
                        pageSizeOptions: ['3', '5', '10'], // Các tùy chọn số lượng bản ghi trên mỗi trang
                    }}
                />
            </div>
        </div>
    );
}

export default SearchTable;
