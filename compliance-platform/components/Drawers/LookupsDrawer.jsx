import React, { useEffect, useState } from 'react';
import { Drawer, Table, Button, Modal, Input, Popconfirm } from 'antd';
import { MdDelete } from 'react-icons/md';

const LookupsDrawer = ({ title, visible, onClose, data, loading }) => {
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  
  useEffect(() => {
    if(data?.length) {
      console.log(data)
      setTableData(data)
    }
  }, [data])
  const showAddModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setTableData([...tableData, { key: tableData.length + 1, name: newName }]);
    setModalVisible(false);
    setNewName('');
  };

  const handleCancel = () => {
    setModalVisible(false);
    setNewName('');
  };

  const handleDelete = (key) => {
    setTableData(tableData.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title='Sure to delete?'
          onConfirm={() => handleDelete(record.key)}
        >
          <a className=''>
            <MdDelete className='w-6 h-6 text-red-600 hover:text-red-800' />
          </a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Drawer title={title} onClose={onClose} open={visible}>
      <div className='flex space-x-5'>
        <div class='group/nui-input relative'>
          <input
            id='ninja-input-93'
            type='text'
            class='nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded'
            placeholder={`Filter ${title}...`}
          />

          <div class='h-10 w-10 text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='icon h-[1.15rem] w-[1.15rem]'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
            >
              <g
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='M21 21l-4.35-4.35' />
              </g>
            </svg>
          </div>
        </div>
        <div>
          <button
            onClick={showAddModal}
            type='button'
            class='nui-focus border-muted-300 dark:border-muted-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Add New
          </button>
        </div>
      </div>
      <Table
        loading={loading}
        className='mt-5'
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />

      <Modal
        title='Add New Item'
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder='Enter the name'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </Modal>
    </Drawer>
  );
};

export default LookupsDrawer;
