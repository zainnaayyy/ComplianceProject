'use client'
import FormDrawer from '@/components/Drawers/FormDrawer';
import MainForm from '@/components/Form';
import { Avatar, Card, Flex } from 'antd';
// import Form from '@/components/Form';
import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa6';

const page = () => {
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <Flex vertical={false} wrap gap={'large'} justify='flex-start'>
      <Card
        loading={loading}
        actions={[
          <FaPen onClick={() => setIsDrawerOpen(true)} className='text-dark-primary hover:text-dark-primary-700' key="edit" />,
          <FaTrash className='text-red-600 hover:text-red-800' key="setting" />,
        ]}
        style={{
          minWidth: 300,
        }}
      >
        <Card.Meta
          // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title="Form"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
      {
        isDrawerOpen ? 
        <FormDrawer 
          open={isDrawerOpen}
          setOpen={setIsDrawerOpen}
        /> 
        : null
      }
    </Flex>
  );
};

export default page;
