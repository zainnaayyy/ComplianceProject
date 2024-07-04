'use client';
import React from 'react';
import { Button, Form, Input, InputNumber, Radio } from 'antd';

const layout = {
  labelCol: {
    span: 24, // Full width for label
    labelAlign: 'top',
  },
  wrapperCol: {
    span: 24, // Full width for input
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

const App = () => (
  <Form
    {...layout}
    name='nest-messages'
    onFinish={onFinish}
    style={{
      maxWidth: 400,
      padding: '0px',
      //   margin: '10px',
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label='Name'
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label='Email'
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'age']}
      label='Age'
      rules={[
        {
          type: 'number',
          min: 0,
          max: 99,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item name='radio-group' label='Gender'>
      <Radio.Group>
        <Radio value='a'>Male</Radio>
        <Radio value='b'>Female</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item name={['user', 'website']} label='Website'>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'introduction']} label='Introduction'>
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 0, // No offset for button
      }}
    >
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;
