import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const ModalComponent = ({
  isModalOpen,
  handleOk,
  handleCancel,
  selectedUser,
}) => {
  return (
    <>
      <Modal
        title='User Profile'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='flex flex-col items-center'>
          <img
            className='rounded-full w-48 h-48 '
            src='../icons/userImage.png'
            alt='User'
          />
          {/* {selectedUser && (
            <div className='w-full mt-4 mb-4 space-y-3'>
              <div className='flex justify-between px-5 text-lg'>
                <span className='font-bold text-gray-800'>Full Name:</span>
                <span className='text-gray-800'>{selectedUser.fullName}</span>
              </div>
              <div className='flex justify-between px-5 text-lg'>
                <span className='font-bold text-gray-800'>Email:</span>
                <span className='text-gray-600'>{selectedUser.email}</span>
              </div>
              <div className='flex justify-between px-5 text-lg'>
                <span className='font-bold text-gray-800'>LOB:</span>
                <span className='text-gray-600'>{selectedUser.LOB}</span>
              </div>
              <div className='flex justify-between px-5 text-lg'>
                <span className='font-bold text-gray-800'>Site:</span>
                <span className='text-gray-600'>{selectedUser.site}</span>
              </div>
              <div className='flex justify-between px-5 text-lg'>
                <span className='font-bold text-gray-800'>Status:</span>
                <span
                  className={`font-medium ${
                    selectedUser.status ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {selectedUser.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          )} */}
          {selectedUser && (
            <div className='text-center space-y-3'>
              <p className='text-2xl font-bold text-gray-800'>
                {selectedUser.fullName}
              </p>
              <p className='text-lg text-gray-600'>{selectedUser.email}</p>
              <p className='text-lg text-gray-600'>{selectedUser.LOB}</p>
              <p className='text-lg text-gray-600'>{selectedUser.site}</p>
              <p
                className={`text-lg font-medium ${
                  selectedUser.status ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {selectedUser.status ? 'Active' : 'Inactive'}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ModalComponent;
