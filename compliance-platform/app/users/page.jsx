"use client";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaCheck, FaTrash, FaSquareXmark } from "react-icons/fa6";
// import Drawer from '@/components/Drawer';
import CustomDrawer from "@/components/Drawer";
import { actionAPI, useAuth, useSharedDispatcher, useSharedSelector } from "@/shared";

const Products = () => {
  const [form] = Form.useForm();
  const dispatcher = useSharedDispatcher();
  const { token } = useAuth()
  const { users, usersLoading, usersError, usersErrorMessage } = useSharedSelector((state) => state.UserData);
  const { sites, sitesLoading, sitesError, sitesErrorMessage } = useSharedSelector((state) => state.SiteData);
  const { LOBs, LOBsLoading, LOBsError, LOBsErrorMessage } = useSharedSelector((state) => state.LOBData);
  const [editingKey, setEditingKey] = useState("");
  const [usersArray, setUsersArray] = useState([]);
  const [statusArray, setStatusArray] = useState([]);
  const [sitesArray, setSitesArray] = useState([]);
  const [LOBsArray, setLOBsArray] = useState([]);
  const [lobDrawerVisible, setLobDrawerVisible] = useState(false);
  const [sitesDrawerVisible, setSitesDrawerVisible] = useState(false);

  useEffect(() => {
    if(token) {
      if(!users?.length) 
        dispatcher(actionAPI.getUsers(token))
      if(!sites?.length) 
        dispatcher(actionAPI.getSites(token))
      if(!LOBs?.length) 
        dispatcher(actionAPI.getLOBs(token))
    }
  }, [users, token, sites, LOBs])

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
    }, {});
  };

  useEffect(() => {
    if(users) {
      setUsersArray(users)
    }
      const statusOptions = [
        {
          label: 'Active',
          value: true
        },
        {
          label: 'In-Active',
          value: false
        },
    ]

    setStatusArray(statusOptions);

    if(sites) {
      const siteOptions = sites.map((site) => ({
          value: site._id,
          label: site.name,
        })
      );
      setSitesArray(siteOptions);
    }

    if(LOBs) {
      const lobOptions = LOBs.map((lob) => ({
          value: lob._id,
          label: lob.name,
        })
      );
    setLOBsArray(lobOptions);
    }
  }, [users, sites, LOBs]);

  const lobData = [
    { key: 1, name: 'LOB 1' },
    { key: 2, name: 'LOB 2' },
  ];

  const sitesData = [
    { key: 1, name: 'Site 1' },
    { key: 2, name: 'Site 2' },
  ];

  const showLobDrawer = () => {
    setLobDrawerVisible(true);
  };

  const closeLobDrawer = () => {
    setLobDrawerVisible(false);
  };

  const showSitesDrawer = () => {
    setSitesDrawerVisible(true);
  };

  const closeSitesDrawer = () => {
    setSitesDrawerVisible(false);
  };
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };
  
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...usersArray];
      const index = newData.findIndex((item) => key === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setUsersArray(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setUsersArray(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (record) => {
    const newData = usersArray.filter((item) => item.key !== record.key);
    setUsersArray(newData);
  };

  const columns = [
    {
      title: "Full Name",
      width: 125,
      dataIndex: "fullName",
      key: "name",
      // fixed: "left",
      editable: true,
    },
    {
      title: "LOB",
      width: 50,
      dataIndex: "LOB",
      key: "lob",
      // fixed: "left",
      editable: true,
      render: (id, record) => {
        const LOB = LOBs?.length && LOBs.find((val) => val._id === id)
      return LOB?.name
    }
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      width: 50,
      editable: true,
      render: (id, record) => {
          const site = sites?.length && sites.find((val) => val._id === id)
        return site?.name
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "3",
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
            className="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-info-100 text-info-500 border-info-100 dark:border-info-500 dark:text-info-500 border dark:bg-transparent font-medium"
            color="success"
          >
            Active
          </Tag>
        ) : (
          <Tag>In-Active</Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      // fixed: "right",
      width: 10,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Typography.Link
              onClick={() => save(record._id)}
            >
              <FaCheck className="w-6 h-6" />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>
                <FaSquareXmark className="w-6 h-6 text-red-700" />
              </a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              className="text-dark-primary-600"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <div>
                <FaPen className="w-6 h-6" />
              </div>
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <a className="">
                <FaTrash className="w-6 h-6 text-red-600" />
              </a>
            </Popconfirm>
            <Typography.Link
              onClick={() => console.log("view")}
            >
              <FaEye className="w-6 h-6" />
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
        inputType: (col.dataIndex === "status" || col.dataIndex === "LOB" || col.dataIndex === "site")? "select" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
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
      inputType === "select" ? (
        <Select
          allowClear
          showSearch
          filterOption={(val, option) => {
            if (option.label.toLowerCase().includes(val.toLowerCase()))
              return true;
          }}
          style={{
            width: "100%",
          }}
          placeholder={`Select ${dataIndex}`}
          options={dataIndex === 'site' ? sitesArray : dataIndex === 'LOB' ? LOBsArray : dataIndex === 'status' ? statusArray : null}
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

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl p-2">Users Table </div>
        <div className="flex">
          <div class="group/nui-input relative">
            <input
              id='ninja-input-93'
              type='text'
              class='nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-black dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded'
              placeholder='Filter users...'
              // value
            />

            <div class='h-10 w-10 dark:text-black text-muted-400 group-focus-within/nui-input:text-dark-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon h-[1.15rem] w-[1.15rem]"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </g>
              </svg>
            </div>
          </div>
          <div className="flex space-x-2 px-4">
            <button
              onClick={showLobDrawer}
              type="button"
              class="nui-focus border-muted-300 dark:border-muted-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              LOB
            </button>
            <button
              onClick={showSitesDrawer}
              type="button"
              class="nui-focus border-muted-300 dark:border-muted-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              SITES
            </button>
          </div>
          <CustomDrawer
            title="LOB"
            visible={lobDrawerVisible}
            onClose={closeLobDrawer}
            data={lobData}
          />
          <CustomDrawer
            title="SITES"
            visible={sitesDrawerVisible}
            onClose={closeSitesDrawer}
            data={sitesData}
          />
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
          rowClassName="editable-row"
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
      <div>
        <div>
          <div>
            <div class="mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
              <div class="flex w-full items-center gap-4 sm:w-auto">
                <div class="relative w-full sm:w-auto">
                  <div class='group/nui-input relative'>
                    <input
                      id='ninja-input-93'
                      type='text'
                      class='nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded'
                      placeholder='Filter users...'
                      value
                    />

                    <div class='h-10 w-10 text-muted-400 group-focus-within/nui-input:text-dark-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75'>
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
                </div>
              </div>
              <div class="flex w-full items-center justify-end gap-4 sm:w-auto">
                <div class="relative w-full sm:w-40">
                  <div class="group/nui-select relative">
                    <select
                      id="ninja-input-94"
                      class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer w-full cursor-pointer appearance-none border bg-white font-sans focus:shadow-lg px-2 pe-9 h-10 py-2 text-sm leading-5 px-3 pe-6 rounded px-3"
                    >
                      <option value="10">10 per page</option>
                      <option value="25">25 per page</option>
                      <option value="50">50 per page</option>
                      <option value="100">100 per page</option>
                    </select>

                    <div class="h-10 w-10 text-muted-400 pointer-events-none absolute end-0 top-0 flex items-center justify-center transition-transform duration-300 group-focus-within/nui-select:-rotate-180">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 9 12 15 18 9"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div class="w-full">
                  <div class="flex flex-col">
                    <div class="rounded-md border-muted-200 dark:border-muted-700 overflow-x-auto border">
                      <div class="inline-block min-w-full align-middle">
                        <div class="overflow-hidden">
                          <table class="divide-muted-200 dark:divide-muted-700 min-w-full table-fixed divide-y">
                            <thead>
                              <tr>
                                <th class="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase border-muted-200 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border-r bg-white px-4 py-5 p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-95"
                                          true-value="true"
                                          false-value="false"
                                          name="table-1-main"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </th>
                                <th class="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase border-muted-200 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border-r bg-white px-4 py-5">
                                  Collaborator
                                </th>
                                <th class="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase border-muted-200 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border-r bg-white px-4 py-5">
                                  Location
                                </th>
                                <th class="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase border-muted-200 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border-r bg-white px-4 py-5">
                                  Status
                                </th>
                                <th class="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase border-muted-200 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border-r bg-white px-4 py-5">
                                  Completed
                                </th>
                                <th class="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase border-muted-200 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border-r bg-white px-4 py-5">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody class="divide-muted-200 dark:divide-muted-700 dark:bg-muted-800 divide-y bg-white">
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-96"
                                          true-value="true"
                                          false-value="false"
                                          value="29"
                                          name="item-checkbox-29"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/22.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Miranda L.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Software Engineer
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  Berlin, Germany
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-info-100 text-info-500 border-info-100 dark:border-info-500 dark:text-info-500 border dark:bg-transparent font-medium">
                                    new
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        12%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-97"
                                          true-value="true"
                                          false-value="false"
                                          value="21"
                                          name="item-checkbox-21"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-yellow-400/20 text-yellow-400">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/21.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Elisabeth F.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Mobile Developer
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  London, UK
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-success-100 text-success-500 border-success-100 dark:border-success-500 dark:text-success-500 border dark:bg-transparent font-medium">
                                    available
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        49%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-98"
                                          true-value="true"
                                          false-value="false"
                                          value="8"
                                          name="item-checkbox-8"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-dark-primary-500/20 text-dark-primary-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/23.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Erik K.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Software Engineer
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  New York, NY
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-success-100 text-success-500 border-success-100 dark:border-success-500 dark:text-success-500 border dark:bg-transparent font-medium">
                                    available
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        61%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-99"
                                          true-value="true"
                                          false-value="false"
                                          value="7"
                                          name="item-checkbox-7"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-pink-500/20 text-pink-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/10.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Kendra W.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Software Engineer
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  San Diego, CA
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-success-100 text-success-500 border-success-100 dark:border-success-500 dark:text-success-500 border dark:bg-transparent font-medium">
                                    available
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        28%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-100"
                                          true-value="true"
                                          false-value="false"
                                          value="122"
                                          name="item-checkbox-122"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-rose-500/20 text-rose-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/16.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Hermann M.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Product Manager
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  San Diego, CA
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-warning-100  text-warning-500 border-warning-100 dark:border-warning-500 dark:text-warning-500 border dark:bg-transparent font-medium">
                                    busy
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        36%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-101"
                                          true-value="true"
                                          false-value="false"
                                          value="23"
                                          name="item-checkbox-23"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-dark-primary-500/20 text-dark-primary-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/11.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Dan B.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Project Manager
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  San Diego, CA
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-success-100 text-success-500 border-success-100 dark:border-success-500 dark:text-success-500 border dark:bg-transparent font-medium">
                                    available
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        71%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-102"
                                          true-value="true"
                                          false-value="false"
                                          value="37"
                                          name="item-checkbox-37"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-yellow-400/20 text-yellow-400">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/24.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Christina F.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Product Manager
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  Paris, France
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-success-100 text-success-500 border-success-100 dark:border-success-500 dark:text-success-500 border dark:bg-transparent font-medium">
                                    available
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        32%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-103"
                                          true-value="true"
                                          false-value="false"
                                          value="25"
                                          name="item-checkbox-25"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-lime-500/20 text-lime-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/25.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Melany W.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Web Developer
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  San Diego, CA
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-info-100 text-info-500 border-info-100 dark:border-info-500 dark:text-info-500 border dark:bg-transparent font-medium">
                                    new
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        49%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-104"
                                          true-value="true"
                                          false-value="false"
                                          value="39"
                                          name="item-checkbox-39"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-rose-500/20 text-rose-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/3.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Alejandro B.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Business Analyst
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  New York, NY
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-success-100 text-success-500 border-success-100 dark:border-success-500 dark:text-success-500 border dark:bg-transparent font-medium">
                                    available
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={58}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${58}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        58%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                              <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex items-start gap-1">
                                      <div class="rounded nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                                        <input
                                          id="ninja-input-105"
                                          true-value="true"
                                          false-value="false"
                                          value="19"
                                          name="item-checkbox-19"
                                          class="text-dark-primary-500 peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                                          type="checkbox"
                                        />
                                        <div class="rounded border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"></div>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 17 12"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                                          ></path>
                                        </svg>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M2 12h20"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div class="inline-flex flex-col"></div>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-rose-500/20 text-rose-500">
                                      <div class="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                        <img
                                          src="https://tairo.cssninja.io/img/avatars/19.svg"
                                          class="h-10 w-10 max-h-full max-w-full object-cover shadow-sm dark:border-transparent"
                                        />
                                      </div>
                                    </div>
                                    <div class="ms-3 leading-none">
                                      <h4 class="font-sans text-sm font-medium">
                                        Greta K.
                                      </h4>
                                      <p class="text-muted-400 font-sans text-xs">
                                        Sales Manager
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-500 dark:text-white p-4">
                                  Los Angeles, CA
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4 capitalize">
                                  <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-success-100 text-success-500 border-success-100 dark:border-success-500 dark:text-success-500 border dark:bg-transparent font-medium">
                                    available
                                  </span>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <div class="flex items-center">
                                    <div class="relative">
                                      <svg
                                        role="progressbar"
                                        aria-valuenow={90}
                                        aria-valuemax="100"
                                        className="block text-success-500"
                                        viewBox="0 0 45 45"
                                        width="50"
                                        height="50"
                                      >
                                        <circle
                                          className="text-muted-200 dark:text-muted-700 stroke-current"
                                          strokeWidth="1"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                        <circle
                                          className="stroke-current transition-all duration-500"
                                          strokeWidth="1"
                                          strokeDasharray={`${90}, 100`}
                                          strokeLinecap="round"
                                          fill="none"
                                          cx="50%"
                                          cy="50%"
                                          r="15.91549431"
                                        ></circle>
                                      </svg>
                                      <span class="absolute start-1/2 top-1/2 z-10 ms-0.5 -translate-x-1/2 -translate-y-1/2 font-sans text-[0.65rem] font-semibold">
                                        19%{" "}
                                      </span>
                                    </div>
                                    <span class="text-muted-400 font-sans text-xs">
                                      {" "}
                                      Tasks completed{" "}
                                    </span>
                                  </div>
                                </td>
                                <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-white p-4">
                                  <button
                                    type="button"
                                    class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
                                    muted
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-6">
                  <div class="inline-flex w-full flex-col md:flex-row md:justify-between">
                    <ul class="border-muted-200 bg-muted-100 dark:border-muted-600 dark:bg-muted-700 mb-4 inline-flex flex-wrap gap-2 border p-1 md:mb-0 md:gap-1 rounded-xl">
                      <li>
                        <a
                          aria-current="page"
                          href="table-list-1.html"
                          class="router-link-active router-link-exact-active flex h-10 w-10 items-center justify-center border font-sans text-sm transition-all duration-300 bg-dark-primary-500 border-dark-primary-500 shadow-dark-primary-500/50 dark:shadow-dark-primary-500/20 text-white shadow-sm rounded-xl"
                          tabindex="0"
                        >
                          1
                        </a>
                      </li>

                      <li>
                        <a
                          href="table-list-14658.html?page=2"
                          class="router-link-active router-link-exact-active flex h-10 w-10 items-center justify-center font-sans text-sm transition-all duration-300 dark:bg-muted-800 border-muted-200 dark:border-muted-700 hover:bg-muted-100 dark:hover:bg-muted-900 text-muted-500 hover:text-muted-700 dark:hover:text-muted-400 bg-white rounded-xl"
                          tabindex="0"
                        >
                          2
                        </a>
                      </li>

                      <li>
                        <a
                          aria-current="page"
                          href="table-list-19ba9.html?page=3"
                          class="router-link-active router-link-exact-active flex h-10 w-10 items-center justify-center font-sans text-sm transition-all duration-300 dark:bg-muted-800 border-muted-200 dark:border-muted-700 hover:bg-muted-100 dark:hover:bg-muted-900 text-muted-500 hover:text-muted-700 dark:hover:text-muted-400 bg-white rounded-xl"
                          tabindex="0"
                        >
                          3
                        </a>
                      </li>
                    </ul>
                    <div class="border-muted-200 bg-muted-100 dark:border-muted-600 dark:bg-muted-700 flex items-center justify-end gap-1 border p-1 rounded-xl">
                      <a
                        aria-current="page"
                        href="table-list-1.html"
                        class="router-link-active router-link-exact-active border-muted-200 text-muted-500 hover:bg-muted-100 hover:text-muted-700 dark:border-muted-700 dark:bg-muted-800 dark:hover:bg-muted-900 dark:hover:text-muted-400 flex h-10 w-full items-center justify-center bg-white font-sans text-sm transition-all duration-300 md:w-10 rounded-xl"
                        tabindex="0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="icon block h-4 w-4"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 18l-6-6 6-6"
                          />
                        </svg>
                      </a>
                      <a
                        aria-current="page"
                        href="table-list-14658.html?page=2"
                        class="router-link-active router-link-exact-active border-muted-200 text-muted-500 hover:bg-muted-100 hover:text-muted-700 dark:border-muted-700 dark:bg-muted-800 dark:hover:bg-muted-900 dark:hover:text-muted-400 flex h-10 w-full items-center justify-center bg-white font-sans text-sm transition-all duration-300 md:w-10 rounded-xl"
                        tabindex="0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="icon block h-4 w-4"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 18l6-6-6-6"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
