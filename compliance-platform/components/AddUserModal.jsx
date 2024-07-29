'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Form, Select } from 'antd';
import {
  useAuth,
  useSharedDispatcher,
  useSharedSelector,
  actionAPI,
  url,
} from '@/shared';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included

const AddUserModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const dispatcher = useSharedDispatcher();
  const { token } = useAuth();
  const { sites, sitesLoading } = useSharedSelector((state) => state.SiteData);
  const { LOBs, LOBsLoading } = useSharedSelector((state) => state.LOBData);
  const { Roles, RolesLoading } = useSharedSelector((state) => state.RolesData);

  const [sitesArray, setSitesArray] = useState([]);
  const [LOBsArray, setLOBsArray] = useState([]);

  useEffect(() => {
    if (token) {
      if (!sites?.length) dispatcher(actionAPI.getSites(token));
      if (!LOBs?.length) dispatcher(actionAPI.getLOBs(token));
      if (!Roles?.length) dispatcher(actionAPI.getRoles());
    }
  }, [token, sites, LOBs, Roles]);

  useEffect(() => {
    if (sites) {
      const siteOptions = sites.map((site) => ({
        value: site._id,
        label: site.name,
      }));
      setSitesArray(siteOptions);
    }
  }, [sites]);

  useEffect(() => {
    if (LOBs) {
      const lobOptions = LOBs.map((lob) => ({
        value: lob._id,
        label: lob.name,
      }));
      setLOBsArray(lobOptions);
    }
  }, [LOBs]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form Values:', values);

      const response = await fetch(url + '/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.success) {
        message.success('User added successfully!');
        setIsModalOpen(false);
        form.resetFields();
        console.log('Modal closed and form reset');
      } else {
        message.error(result.message || 'Failed to add user');
        console.error('Error:', result.message || 'Failed to add user');
      }
    } catch (error) {
      message.error('An error occurred while adding the user');
      console.error('Add User Error:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      //   title='Add New User'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Add User'
      cancelText='Cancel'
      width={800}
    >
      <div className='max-w-4xl mx-auto font-[sans-serif] p-6'>
        <div className='text-center mb-16'>
          <a href='javascript:void(0)'>
            <img
              src='https://readymadeui.com/readymadeui.svg'
              alt='logo'
              className='w-52 inline-block'
            />
          </a>
          <h3 className='text-gray-800 text-2xl font-semibold mt-6'>
            Add New User
          </h3>
        </div>

        <Form form={form} layout='vertical'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
            <Form.Item
              label='Full Name'
              name='fullName'
              rules={[
                { required: true, message: 'Please enter the Full name!' },
              ]}
            >
              <Input
                className='bg-gray-100 text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Enter Full name'
              />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please enter the email!' }]}
            >
              <Input
                className='bg-gray-100 text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all'
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
                className='bg-gray-100 text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all'
                placeholder='Enter password'
              />
            </Form.Item>

            <Form.Item
              label='Role'
              name='roleIds'
              rules={[{ required: true, message: 'Please select a role!' }]}
            >
              <Select
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
                className='bg-gray-100 text-gray-800 text-sm rounded-md focus:bg-transparent outline-blue-500 transition-all'
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
                className='bg-gray-100 text-gray-800 text-sm rounded-md focus:bg-transparent outline-blue-500 transition-all'
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
                className='bg-gray-100 text-gray-800 text-sm rounded-md focus:bg-transparent outline-blue-500 transition-all'
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
