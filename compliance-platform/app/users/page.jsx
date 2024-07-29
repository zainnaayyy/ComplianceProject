"use client";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaCheck, FaTrash, FaSquareXmark } from "react-icons/fa6";
import {
  actionAPI,
  url,
  useAuth,
  useSharedDispatcher,
  useSharedSelector,
} from "@/shared";
import ModalComponent from "@/components/ModalComponent";
import AddUserModal from '@/components/AddUserModal';

const Users = () => {
  const [form] = Form.useForm();
  const dispatcher = useSharedDispatcher();
  const { token } = useAuth();
  const { users, usersLoading, usersError, usersErrorMessage } =
    useSharedSelector((state) => state.UserData);
  const { sites, sitesLoading, sitesError, sitesErrorMessage } =
    useSharedSelector((state) => state.SiteData);
  const { LOBs, LOBsLoading, LOBsError, LOBsErrorMessage } = useSharedSelector(
    (state) => state.LOBData
  );
  const { Roles, RolesLoading, RolesError, RolesErrorMessage } =
    useSharedSelector((state) => state.RolesData);
  const [editingKey, setEditingKey] = useState('');
  const [usersArray, setUsersArray] = useState([]);
  const [statusArray, setStatusArray] = useState([
    {
      label: 'Active',
      value: true,
    },
    {
      label: 'In-Active',
      value: false,
    },
  ]);
  const [sitesArray, setSitesArray] = useState([]);
  const [LOBsArray, setLOBsArray] = useState([]);
  const [lobDrawerVisible, setLobDrawerVisible] = useState(false);
  const [sitesDrawerVisible, setSitesDrawerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      if (!users?.length) dispatcher(actionAPI.getUsers(token));
      if (!sites?.length) dispatcher(actionAPI.getSites(token));
      if (!LOBs?.length) dispatcher(actionAPI.getLOBs(token));
      if (!Roles?.length) dispatcher(actionAPI.getRoles());
    }
  }, [users, token, sites, LOBs]);

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  useEffect(() => {
    if (users) {
      setUsersArray(users);
    }

    if (sites) {
      const siteOptions = sites.map((site) => ({
        value: site._id,
        label: site.name,
      }));
      setSitesArray(siteOptions);
    }

    if (LOBs) {
      const lobOptions = LOBs.map((lob) => ({
        value: lob._id,
        label: lob.name,
      }));
      setLOBsArray(lobOptions);
    }
  }, [users, sites, LOBs]);

  const isEditing = (record) => record === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
      roles: record.roles.map((role) => role._id), // Ensure roles are set correctly
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...usersArray];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        const updatedUser = { ...item, ...row };

        // Make the API call to update the user
        const response = await fetch(`${url}/editUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        });

        const result = await response.json();

        if (result.success) {
          newData.splice(index, 1, result.user);
          setUsersArray(newData);
          setEditingKey('');
        } else {
          console.error('Error updating user:', result.message);
        }
      } else {
        newData.push(row);
        setUsersArray(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (record) => {
    const newData = usersArray.filter((item) => item.key !== record.key);
    setUsersArray(newData);
  };

  const columns = [
    {
      title: 'Full Name',
      width: 125,
      dataIndex: 'fullName',
      key: 'name',
      // fixed: "left",
      editable: true,
      render: (text, record) => (
        <Typography.Link onClick={() => showModal(record)}>
          {text}
        </Typography.Link>
      ),
    },
    {
      title: 'LOB',
      width: 50,
      dataIndex: 'LOB',
      key: 'lob',
      // fixed: "left",
      editable: true,
      render: (id, record) => {
        const LOB = LOBs?.length && LOBs.find((val) => val._id === id);
        return LOB?.name;
      },
    },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 50,
      editable: true,
      render: (id, record) => {
        const site = sites?.length && sites.find((val) => val._id === id);
        return site?.name;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 20,
      editable: true,
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (val, record) => {
        return val ? (
          <Tag
            className='inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-info-100 text-info-500 border-info-100 dark:border-info-500 dark:text-info-500 border font-medium'
            color='success'
          >
            Active
          </Tag>
        ) : (
          <Tag className='inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-info-100 text-info-500 border-info-100 dark:border-info-500 dark:text-info-500 border font-medium'>
            In-Active
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      // fixed: "right",
      width: 10,
      render: (_, record) => {
        const editable = isEditing(record._id);
        return editable ? (
          <Space>
            <Typography.Link onClick={() => save(record._id)}>
              <FaCheck className='w-6 h-6' />
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>
                <FaSquareXmark className='w-6 h-6 text-red-600 hover:text-red-800' />
              </a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              className='text-dark-primary-600'
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              <div>
                <FaPen className='w-6 h-6' />
              </div>
            </Typography.Link>
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => handleDelete(record)}
            >
              <a className=''>
                <FaTrash className='w-6 h-6 text-red-600 hover:text-red-800' />
              </a>
            </Popconfirm>
            <Typography.Link onClick={() => showModal(record)}>
              <FaEye className='w-6 h-6' />
            </Typography.Link>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'status' ||
          col.dataIndex === 'LOB' ||
          col.dataIndex === 'site'
            ? 'select'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record._id),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === 'select' ? (
        <Select
          allowClear
          showSearch
          filterOption={(val, option) => {
            if (option.label.toLowerCase().includes(val.toLowerCase()))
              return true;
          }}
          style={{
            width: '100%',
          }}
          placeholder={`Select ${dataIndex}`}
          options={
            dataIndex === 'site'
              ? sitesArray
              : dataIndex === 'LOB'
              ? LOBsArray
              : dataIndex === 'status'
              ? statusArray
              : null
          }
        />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const onSearch = (val) => {
    dispatcher(actionAPI.gettingUserListLoading());
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const raw = JSON.stringify({
      search: val,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(url + '/searchUsers', requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatcher(actionAPI.gettingUserListSuccess(result.users))
      )
      .catch((error) => dispatcher(actionAPI.gettingUserListFailed(error)));
  };

  const showModal = (record) => {
    const selectedLOB =
      LOBs?.length && LOBs.find((val) => val._id === record.LOB);
    const selectedSite =
      sites?.length && sites.find((val) => val._id === record.site);
    const selectedRoles = [];
    Roles?.length &&
      record.roles.forEach((role, index) => {
        const roles = Roles?.find((val) => val._id === role);
        if (roles) selectedRoles.push(roles.name);
      });

    setSelectedUser({
      ...record,
      LOB: selectedLOB?.name || record.LOB,
      site: selectedSite?.name || record.site,
      roles: selectedRoles || record.role,
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div className='text-3xl p-2'>Users Table </div>
        <div className='flex'>
          <div class='group/nui-input relative'>
            <Input.Search
              placeholder='Search users...'
              enterButton='Search'
              onPressEnter={(e) => onSearch(e.target.value)}
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
              size='large'
              className='text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded'
            />
          </div>
          <div className='flex space-x-2 px-4'>
            <Button
              className='nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary'
              type='primary'
              size='large'
              onClick={() => setIsAddUserModalOpen(true)}
            >
              Add Users
            </Button>
          </div>
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          columns={mergedColumns}
          dataSource={usersArray}
          rowClassName='editable-row'
          // scroll={{
          //   x: 1500,
          //   y: 300,
          // }}
          loading={usersLoading || sitesLoading || LOBsLoading}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      {isModalOpen ? (
        <ModalComponent
          token={token}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedUser={selectedUser}
        />
      ) : null}
      {isAddUserModalOpen && (
        <AddUserModal
          isModalOpen={isAddUserModalOpen}
          setIsModalOpen={setIsAddUserModalOpen}
        />
      )}
    </div>
  );
};

export default Users;
