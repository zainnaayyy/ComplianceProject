'use client';
import React from 'react';
import { Form, Input, Button, Card } from 'antd';

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Card className='shadow-sm bg-opacity-5 bg-white m-0 p-0'>
      <div className='flex'>
        <div className='md:w-1/2 flex justify-center items-center'>
          <img
            src='../../loginImage.jpg'
            alt='Login Image'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='md:w-1/2'>
          <div className='max-w-lg mx-auto'>
            <p className='text-cyan-500 text-lg mt-20 mb-8'>
              {' '}
              Your Admin Dashboard Awaits!
            </p>
            <Form
              name='loginForm'
              initialValues={{ remember: true }}
              autoComplete='off'
              onFinish={onFinish}
              className='max-w-md mx-auto'
            >
              <Form.Item
                name='username'
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input
                  placeholder='Username'
                  className='rounded-lg'
                  autoComplete='new-username'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  placeholder='Password'
                  className='rounded-lg'
                  autoComplete='new-password'
                />
              </Form.Item>
              <div className='flex justify-end mb-4'>
                <a href='#' className='text-cyan-500'>
                  Forgot Password?
                </a>
              </div>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='bg-cyan-500 border-cyan-500 rounded-lg w-full max-w-xs'
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoginPage;
