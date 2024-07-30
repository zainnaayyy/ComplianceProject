import React, { useEffect, useState } from 'react';
import { Drawer, Table, Button, Modal, Input, Popconfirm } from 'antd';
import { MdDelete } from 'react-icons/md';
import { actionAPI, url, useSharedDispatcher, useSharedSelector } from '@/shared';

const LookupsDrawer = ({ title, visible, onClose, data, loading, token }) => {
  const dispatcher = useSharedDispatcher()
  const { sites, sitesLoading, sitesError, sitesErrorMessage } =
    useSharedSelector((state) => state.SiteData);
  const { LOBs, LOBsLoading, LOBsError, LOBsErrorMessage } = useSharedSelector(
    (state) => state.LOBData
  );
  const { Roles, RolesLoading, RolesError, RolesErrorMessage } =
    useSharedSelector((state) => state.RolesData);
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
      setTableData(title === 'Line of Business'
        ? LOBs
        : title === 'Sites'
        ? sites
        : title === 'Roles'
        ? Roles
        : []);
  }, [LOBs, sites, Roles]);

  const showAddModal = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    let endpoint = '';

    if (title === 'Line of Business') {
      endpoint = `${url}/addLOB`;
    } else if (title === 'Sites') {
      endpoint = `${url}/addSite`;
    } else if (title === 'Roles') {
      endpoint = `${url}/roles`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ensure you pass the token
        },
        body: JSON.stringify({ name: value }),
      });
      const result = await response.json();

      if (result.success) {
        if (title === 'Line of Business') dispatcher(actionAPI.getLOBs(token));
        if (title === 'Sites') dispatcher(actionAPI.getSites(token));
        if (title === 'Roles') dispatcher(actionAPI.getRoles(token));
        setTableData(title === 'Line of Business'
          ? LOBs
          : title === 'Sites'
          ? sites
          : title === 'Roles'
          ? Roles
          : []);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setModalVisible(false);
    setValue('');
  };

  const handleCancel = () => {
    setModalVisible(false);
    setValue('');
  };

  const handleDelete = async(id) => {
    setLoadingButton(true)
    let endpoint = '';

    if (title === 'Line of Business') {
      endpoint = `${url}/deleteLOB`;
    } else if (title === 'Sites') {
      endpoint = `${url}/deleteSite`;
    } else if (title === 'Roles') {
      endpoint = `${url}/deleteRoles`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ensure you pass the token
        },
        body: JSON.stringify({ id: id }),
      });
      const result = await response.json();

      if (result.success) {
        if (title === 'Line of Business') dispatcher(actionAPI.getLOBs(token));
        if (title === 'Sites') dispatcher(actionAPI.getSites(token));
        if (title === 'Roles') dispatcher(actionAPI.getRoles(token));
        setTableData(title === 'Line of Business'
          ? LOBs
          : title === 'Sites'
          ? sites
          : title === 'Roles'
          ? Roles
          : []);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoadingButton(false)
    setModalVisible(false);
    setValue('');
  };

  const onSearch = async(val) => {
    setLoadingButton(true)
    let endpoint = '';

    if (title === 'Line of Business') {
      endpoint = `${url}/searchLOB`;
    } else if (title === 'Sites') {
      endpoint = `${url}/searchSite`;
    } else if (title === 'Roles') {
      endpoint = `${url}/searchRoles`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ensure you pass the token
        },
        body: JSON.stringify({ name: val }),
      });
      const result = await response.json();

      if (result.success) {
        setTableData(title === 'Line of Business'
          ? result.lobs
          : title === 'Sites'
          ? result.sites
          : title === 'Roles'
          ? result.roles
          : []);
      } else {
        console.error('Error:', result);
      }
      setLoadingButton(false)
    } catch (error) {
      console.error('Error:', error);
      setLoadingButton(false)
    }
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
          onConfirm={() => handleDelete(record._id)}
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
      <div className='flex space-x-2'>
        <div class='group/nui-input relative'>
        <Input.Search
              allowClear
              placeholder={`Search ${title}...`}
              enterButton
              onPressEnter={(e) => onSearch(e.target.value)}
              disabled={loadingButton}
              onSearch={(val) => onSearch(val)}
              prefix={
                <div class='dark:text-black text-muted-400 group-focus-within/nui-input:text-dark-primary-500 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75'>
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
              }
              size='medium'
              className='text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded'
            />
          </div>
          <div>
            <Button
              disabled={loadingButton}
              className='nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary'
              type='primary'
              size='medium'
              onClick={() => showAddModal()}
            >
              Add {title}
            </Button>
          </div>
      </div>
      <Table
        loading={LOBsLoading || sitesLoading || RolesLoading || loadingButton}
        className='mt-5'
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />

      <Modal
        title='Add New Item'
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key='submit'
            type='primary'
            className='bg-dark-primary'
            loading={loadingButton}
            onClick={handleOk}
          >
            Save
          </Button>,
        ]}
      >
        <Input
          placeholder='Enter the name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal>
    </Drawer>
  );
};

export default LookupsDrawer;
