import React from 'react';
import { Button, Modal } from 'antd';

const ModalComponent = ({
  isModalOpen,
  handleOk,
  handleCancel,
  selectedUser,
}) => {
  return (
    <Modal
      title='User Profile'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600} // Increased modal width
    >
      <div className='flex flex-col items-center'>
        <img
          className='rounded-full w-48 h-48 mb-4'
          src='../icons/userImage.png'
          alt='User'
        />
        {selectedUser && (
          <div className='grid grid-cols-2 gap-14 content-center'>
            <div className='flex flex-col '>
              <span className=' text-lg font-bold text-gray-700'>
                Full Name
              </span>
              <span className='text-lg text-gray-900'>
                {selectedUser.fullName}
              </span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Email</span>
              <span className='text-lg text-gray-900'>
                {selectedUser.email}
              </span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>
                Line Of Business
              </span>
              <span className='text-lg text-gray-900'>{selectedUser.LOB}</span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Site</span>
              <span className='text-lg text-gray-900'>{selectedUser.site}</span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Status</span>
              <span
                className={`text-lg font-medium ${
                  selectedUser.status ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {selectedUser.status ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Role</span>
              <span className='text-lg text-gray-900'>Developer</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalComponent;
