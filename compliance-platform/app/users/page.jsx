"use client";
import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaCheck, FaTrash, FaSquareXmark, FaFileImport, FaFileArrowUp, FaFileExport } from "react-icons/fa6";
import {
  actionAPI,
  blobValidation,
  isEmpty,
  url,
  useAuth,
  useSharedDispatcher,
  useSharedSelector,
} from "@/shared";
import ModalComponent from "@/components/ModalComponent";
import AddUserModal from '@/components/AddUserModal';
import * as XLSX from 'xlsx';

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
  const [rolesArray, setRolesArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      if (!users?.length) dispatcher(actionAPI.getUsers(token));
      if (!sites?.length) dispatcher(actionAPI.getSites(token));
      if (!LOBs?.length) dispatcher(actionAPI.getLOBs(token));
      if (!Roles?.length) dispatcher(actionAPI.getRoles());
    }
  }, [token]);

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

    if (Roles) {
      const roleOptions = Roles.map((role) => ({
        value: role._id,
        label: role.name,
      }));
      setRolesArray(roleOptions);
    }
  }, [users, sites, LOBs, Roles]);

  const isEditing = (record) => record === editingKey;
  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      setLoading(true);
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
          message.success(result?.message);
          dispatcher(actionAPI.getUsers(token))
          setEditingKey('');
        } else {
          console.error('Error updating user:', result.message);
          message.error(result?.message);
        }
      } else {
        newData.push(row);
        setUsersArray(newData);
        setEditingKey('');
      }
      setLoading(false);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const raw = JSON.stringify({
      id: id,
    });

    const requestOptions = {
      method: 'Delete',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(url + '/deleteUser', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          message.success(result?.message);
          dispatcher(actionAPI.getUsers(token));
        } else {
          message.error(result?.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        message.error('An error occurred. Please try again!');
        setLoading(false);
      });
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
        <Typography.Link disabled={editingKey !== ''} onClick={() => showModal(record)}>
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
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      width: 50,
      editable: true,
      render: (id, record) => {
        const selectedRoles = [];
        Roles?.length &&
          record.roles.forEach((role, index) => {
            const roles = Roles?.find((val) => val._id === role);
            if (roles) selectedRoles.push(roles.name);
          });
        return selectedRoles.join(', ');
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
            <Typography.Link disabled={loading} onClick={() => save(record._id)}>
              <FaCheck className='w-6 h-6' />
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <Typography.Link disabled={loading}>
                <FaSquareXmark className='w-6 h-6 text-red-600 hover:text-red-800' />
              </Typography.Link>
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
              onConfirm={() => handleDelete(record._id)}
            >
              <Typography.Link disabled={editingKey !== ''} className=''>
                <FaTrash className='w-6 h-6 text-red-600 hover:text-red-800' />
              </Typography.Link>
            </Popconfirm>
            <Typography.Link disabled={editingKey !== ''} onClick={() => showModal(record)}>
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
          col.dataIndex === 'site'||
          col.dataIndex === 'roles'
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
              : dataIndex === 'roles'
              ? rolesArray
              : null
          }
          mode={ dataIndex === 'roles' ? "multiple" : "" }
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

  const handleFileChange = async(file, onProgress, onSuccess, onError) => {
    try {
      var allowedTypes = /\.(xlsx)$/i
      if (!allowedTypes.test(file?.name)) {
        message.error('Allowed formats is XLSX only')
        onError();
        return;
      }
      else if (file.size > 10000000) {
        message.error('File size should be less than 10 mbs')
        onError();
        return;
      }
      setFile(file)
      onSuccess()
    } catch (e) {
      console.log('upload error', e);
      onError();
    }
  };

  const importUserData = async() => {
    // Read the file as an ArrayBuffer
    const buffer = await file.arrayBuffer();
  
    // Parse the buffer into a workbook
    const workbook = XLSX.read(buffer);

    // Get the first sheet's name
    const sheetName = workbook.SheetNames[0];

    // Get the worksheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Iterate through the JSON data and save each record to the database
    let i = 0;
    for (const record of jsonData) {
      let saved = await addRecordToDatabase(record);
      if(!saved) break
      setPercentage((++i / jsonData.length) * 100);
    }
    setLoading(false);
    setFile(null)
    setPercentage(0);
    dispatcher(actionAPI.getUsers(token));
  }

  const addRecordToDatabase = async (rec) => {
    setLoading(true);
    if (typeof rec.roleIds === 'string') {
      try {
          rec.roleIds = JSON.parse(rec.roleIds);
      } catch (error) {
          console.error('Error parsing roleIds:', error);
          message.error('Invalid roleIds format');
          setLoading(false);
          return false;
      }
    }
    try {
      const response = await fetch(url + '/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rec),
      });

      const result = await response.json();
      if (result?.success) {
        message.success(result.message);
        return true
      } else {
        message.error(result.message);
        return false
      }
    } catch (error) {
      message.error('An error occurred while adding the user');
      setLoading(false);
    }
  };

  async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
            throw new Error(`Error fetching data from ${apiUrl}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
  }

  async function downloadFiles() {
    setLoading(true);
      const lobsApiUrl = url+'/getAllLOBs';
      const sitesApiUrl = url+'/getAllSites';
      const rolesApiUrl = url+'/getAllRoles';

      const lobs = await fetchData(lobsApiUrl);
      const sites = await fetchData(sitesApiUrl);
      const roles = await fetchData(rolesApiUrl);
      setLoading(false);
      const data = [
          ['Category', 'ID', 'Name'], // Headers
          ...lobs.lobs.map(lob => ['LOB', lob._id, lob.name]),
          ...sites.sites.map(site => ['Site', site._id, site.name]),
          ...roles.roles.map(role => ['Role', role._id, role.name])
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

      const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      const blob = new Blob([s2ab(workbookBinary)], { type: 'application/octet-stream' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'lookupData.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const linkk = document.createElement('a');
      linkk.href = '/userData.xlsx';
      linkk.download = ('/userData.xlsx').split('/').pop(); // Use the file name as download name
      document.body.appendChild(linkk);
      linkk.click();
      document.body.removeChild(linkk);
  }

  function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
  }
  return (
    <div>
      <div className='flex justify-between'>
        <div className='text-3xl p-2'>Users Table </div>
        <div className='flex pt-1'>
          <div class='group/nui-input relative'>
            <Input.Search
              allowClear
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
          <div className='flex px-2'>
            <Button
              className='nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary'
              type='primary'
              size='large'
              onClick={() => setIsAddUserModalOpen(true)}
            >
              Add Users
            </Button>
          </div>
          <div className='flex'>
            <Button
              className='nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary'
              type='primary'
              size='large'
              icon={<FaFileExport />}
              disabled={loading}
              onClick={downloadFiles}
            >
              Download Template
            </Button>
          </div>
          <div className='flex'>
            <Upload name="upload" customRequest={({file, onProgress, onSuccess, onError}) => handleFileChange(file, onProgress, onSuccess, onError)} maxCount={1} fileList={!isEmpty(file) ? [file] : null} onRemove={() => setFile(null)}>
              <Button
                className='nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary'
                type='primary'
                size='large'
                icon={<FaFileArrowUp />}
                disabled={loading}
              >
                Upload CSV
              </Button>
            </Upload>
          </div>
          <div className='flex'>
            <Button
              className='nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary'
              type='primary'
              size='large'
              icon={<FaFileImport />}
              loading={loading}
              onClick={importUserData}
              disabled={!file}
            >
              Import{loading ? 'ing' : ' '}Users {loading ? percentage+'%' : ''}
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
          loading={usersLoading || sitesLoading || LOBsLoading || RolesLoading || loading}
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
          sitesArray={sitesArray}
          LOBsArray={LOBsArray}
        />
      )}
    </div>
  );
};

export default Users;
