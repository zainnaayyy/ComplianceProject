'use client';
import { useState } from 'react';
import { Button, Modal, Input, Form, Select, message } from 'antd';
import {
  useAuth,
  useSharedDispatcher,
  useSharedSelector,
  actionAPI,
  url,
} from '@/shared';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included

const AddUserModal = ({ isModalOpen, setIsModalOpen, sitesArray, LOBsArray }) => {
  const [form] = Form.useForm();
  const dispatcher = useSharedDispatcher();
  const { token } = useAuth();
  const { Roles, RolesLoading } = useSharedSelector((state) => state.RolesData);
  const [ loading, setLoading ] = useState(false)

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const response = await fetch(url + '/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result?.success) {
        message.success(result.message);
        dispatcher(actionAPI.getUsers(token))
        setIsModalOpen(false);
        form.resetFields();
      } else {
        message.error(result.message);
      }
      setLoading(false);
    } catch (error) {
      message.error('An error occurred while adding the user');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      //   title='Add New User'
      open={isModalOpen}
      onCancel={handleCancel}
      cancelText='Cancel'
      width={800}
      footer={[
        <Button
          key='submit'
          type='primary'
          className='bg-dark-primary'
          loading={loading}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <div className='max-w-4xl mx-auto font-[sans-serif] p-6'>
        <div className='text-center mb-10'>
          <h3 className='text-gray-800 text-2xl font-semibold mt-6'>
            Add New User
          </h3>
        </div>

        <Form
          disabled={loading}
          autoComplete='off'
          form={form}
          layout='vertical'
        >
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
            <Form.Item
              label='Full Name'
              name='fullName'
              rules={[
                { required: true, message: 'Please enter the Full name!' },
              ]}
            >
              <Input
                allowClear
                autoComplete='off'
                className='text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Enter Full name'
              />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please enter the email!' }]}
            >
              <Input
                allowClear
                autoComplete='new-email'
                className='text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Enter email'
              />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please enter the password!' },
              ]}
            >
              <Input.Password
                allowClear
                autoComplete='new-password'
                className='text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Enter password'
              />
            </Form.Item>

            <Form.Item
              label='Role'
              name='roleIds'
              rules={[{ required: true, message: 'Please select a role!' }]}
            >
              <Select
                allowClear
                mode='multiple'
                placeholder='Select Roles'
                options={Roles.map((role) => ({
                  label: role.name,
                  value: role._id,
                }))}
              />
            </Form.Item>

            <Form.Item
              label='Status'
              name='status'
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select
                allowClear
                className='text-gray-800 text-sm rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Select status'
                options={[
                  { value: true, label: 'Active' },
                  { value: false, label: 'Inactive' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label='Site'
              name='site'
              rules={[{ required: true, message: 'Please select a site!' }]}
            >
              <Select
                allowClear
                className='text-gray-800 text-sm rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Select site'
                options={sitesArray}
              />
            </Form.Item>

            <Form.Item
              label='LOB'
              name='LOB'
              rules={[{ required: true, message: 'Please select an LOB!' }]}
            >
              <Select
                allowClear
                className='text-gray-800 text-sm rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Select LOB'
                options={LOBsArray}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
