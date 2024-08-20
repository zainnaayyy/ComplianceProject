"use client";

import CoachingModal from "@/components/Modal/CoachingModal";
import { actionAPI, isEmpty, url, useAuth, useSharedDispatcher, useSharedSelector } from "@/shared";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { FaCheck, FaPen, FaRegFolderOpen, FaSquareXmark, FaTrash } from "react-icons/fa6";

const CoachingPage = () => {
  const dispatcher = useSharedDispatcher();
  const { token } = useAuth();
  const [form] = Form.useForm();
  const { coachingLookups, coachingLookupsLoading } = useSharedSelector(
    (state) => state.CoachingLookupsData
  );
  const {
    coaching,
    coachingLoading,
    coachingError,
    coachingErrorMessage,
  } = useSharedSelector((state) => state.CoachingData);
  const { users, usersLoading, usersError, usersErrorMessage } =
    useSharedSelector((state) => state.UserData);
  const [agent, setAgent] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState('');
  const [isCoachingModalOpen, setIsCoachingModalOpen] = useState(false);
  const [agentsArray, setAgentsArray] = useState([]);
  const [actionTakenArray, setActionTakenArray] = useState([]);
  const [behaviorTypeArray, setBehaviorTypeArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [coachabilityLevelArray, setCoachabilityLevelArray] = useState([]);
  const [employeeSatisfactionArray, setEmployeeSatisfactionArray] = useState(
    []
  );
  const [frequencyArray, setFrequencyArray] = useState([]);

  useEffect(() => {
    if (token) {
    if (!coachingLookups?.length)
      dispatcher(actionAPI.getCoachingLookups(token));
    if (!users?.length) dispatcher(actionAPI.getUsers(token));
      if (!coaching?.length) dispatcher(actionAPI.getCoaching(token));
    }
    
    return () => {
      dispatcher(actionAPI.gettingCoachingLookupListClear());
    };
  }, [token]);

  useEffect(() => {
    if (users.length) {
      let agents = users.filter((user) =>
        user.roles?.includes("669e2eca6994209138ff28f6")
      );
      if (agents.length) {
        const agentOptions = agents.map((val) => ({
          value: val._id,
          label: val.fullName,
        }));
        setAgentsArray(agentOptions);
      }
    }
    
    if (coachingLookups.length) {
      const actionTakenOptions = coachingLookups[0]?.actionTaken.map((val) => ({
        value: val._id,
        label: val.name,
      }));
      setActionTakenArray(actionTakenOptions);
      const behaviorTypeOptions = coachingLookups[0]?.behaviorType.map(
        (val) => ({
          value: val._id,
          label: val.name,
        })
      );
      setBehaviorTypeArray(behaviorTypeOptions);
      const categoryOptions = coachingLookups[0]?.category.map((val) => ({
        value: val._id,
        label: val.name,
      }));
      setCategoryArray(categoryOptions);
      const coachabilityLevelOptions =
        coachingLookups[0]?.coachabilityLevel.map((val) => ({
          value: val._id,
          label: val.name,
        }));
      setCoachabilityLevelArray(coachabilityLevelOptions);
      const employeeSatisfactionOptions =
        coachingLookups[0]?.employeeSatisfaction.map((val) => ({
          value: val._id,
          label: val.name,
        }));
      setEmployeeSatisfactionArray(employeeSatisfactionOptions);
      const frequencyOptions = coachingLookups[0]?.frequency.map((val) => ({
        value: val._id,
        label: val.name,
      }));
      setFrequencyArray(frequencyOptions);
    }
  }, [coachingLookups, users]);

  const isEditing = (record) => record === editing._id;
  const edit = (record) => {
    setEditing(record);
  };

  const cancel = () => {
    setEditing("");
  };

  const columns = [
    // {
    //   title: 'Coaching id',
    //   width: 125,
    //   dataIndex: 'coachingId',
    //   key: 'coachingId',
    //   // fixed: "left",
    //   editable: true,
    // },
    {
      title: 'Agent',
      width: 150,
      dataIndex: 'agent',
      key: 'agent',
      // fixed: "left",
      editable: true,
      render: (id, record) => {
        const agent = users?.length && users.find((val) => val._id === id);
        return agent?.fullName;
      },
    },
    {
      title: 'Category',
      width: 50,
      dataIndex: 'category',
      key: 'category',
      // fixed: "left",
      editable: true,
      render: (id, record) => {
        const category = categoryArray?.length && categoryArray.find((val) => val.value === id);
        return category?.label;
      },
    },
    {
      title: 'Frequency',
      width: 50,
      dataIndex: 'frequency',
      key: 'frequency',
      // fixed: "left",
      editable: true,
      render: (id, record) => {
        const frequency = frequencyArray?.length && frequencyArray.find((val) => val.value === id);
        return frequency?.label;
      },
    },
    {
      title: 'Action taken',
      width: 50,
      dataIndex: 'actionTaken',
      key: 'actionTaken',
      // fixed: "left",
      editable: true,
      render: (id, record) => {
        const actionTaken = actionTakenArray?.length && actionTakenArray.find((val) => val.value === id);
        return actionTaken?.label;
      },
    },
    {
      title: 'Behavior Type',
      dataIndex: 'behaviorType',
      key: 'behaviorType',
      width: 50,
      editable: true,
      render: (id, record) => {
        const behaviorType = behaviorTypeArray?.length && behaviorTypeArray.find((val) => val.value === id);
        return behaviorType?.label;
      },
    },
    {
      title: 'Coachability Level',
      dataIndex: 'coachabilityLevel',
      key: 'coachabilityLevel',
      width: 50,
      editable: true,
      render: (id, record) => {
        const coachabilityLevel = coachabilityLevelArray?.length && coachabilityLevelArray.find((val) => val.value === id);
        return coachabilityLevel?.label;
      },
    },
    {
      title: 'Employee Satisfaction',
      dataIndex: 'employeeSatisfaction',
      key: 'employeeSatisfaction',
      width: 150,
      editable: true,
      render: (id, record) => {
        const employeeSatisfaction = employeeSatisfactionArray?.length && employeeSatisfactionArray.find((val) => val.value === id);
        return employeeSatisfaction?.label;
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
            <Typography.Link disabled={loading} onClick={() => setIsCoachingModalOpen(true)}>
              <FaRegFolderOpen className='w-6 h-6' />
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
              disabled={editing !== ''}
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
              <Typography.Link disabled={editing !== ''} className=''>
                <FaTrash className='w-6 h-6 text-red-600 hover:text-red-800' />
              </Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onSearch = () => {
    setLoading(true);
    // dispatcher(actionAPI.gettingFormTemplateListLoading());
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({ 
      agent: agent, 
      startDate: startDate, 
      endDate: endDate 
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url + "/searchCoaching", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        dispatcher(
          actionAPI.gettingCoachingListSuccess(result.coaching)
        )
      })
      .catch((error) => {
        setLoading(false);
        dispatcher(actionAPI.gettingCoachingListFailed(error))
      });
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

    fetch(url + '/deleteCoaching', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          message.success(result?.message);
          dispatcher(actionAPI.getCoaching(token));
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

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="text-3xl p-2">Coaching</div>
        <div className="flex pt-1">
          <div className="w-full px-4">
            <DatePicker.RangePicker 
            width={100}
            allowClear
            onChange={(date, dateString) => {
              if(date?.length){
                setStartDate(date[0])
                setEndDate(date[1]);
              } else {
                setStartDate("")
                setEndDate("");
              }
            }}
            size="large"/>
          </div>
          <div className="group/nui-input relative w-full">
          <Select
            size="large"
            className="text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded"
            allowClear
            showSearch
            filterOption={(val, option) => {
              if (
                option.label.toLowerCase().includes(val.toLowerCase())
              )
                return true;
            }}
            placeholder={`Select agent...`}
            options={agentsArray}
            onChange={(val) => setAgent(val)}
            mode="multiple"
          />
          </div>
          <div className="flex pl-4">
            <Button
                className="nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary"
                type="primary"
                size="large"
                onClick={() => onSearch()}
              >
                Search
              </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              className="nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary"
              type="primary"
              size="large"
              onClick={() => setIsCoachingModalOpen(true)}
            >
              Add Coaching
            </Button>
          </div>
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          bordered
          columns={columns}
          dataSource={coaching}
          rowClassName='editable-row'
          // scroll={{
          //   x: 1500,
          //   y: 300,
          // }}
          loading={coachingLoading}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      {isCoachingModalOpen && (
        <CoachingModal
          editing={editing}
          setEditing={setEditing}
          isModalOpen={isCoachingModalOpen}
          setIsModalOpen={setIsCoachingModalOpen}
        />
      )}
    </div>
  );
};

export default CoachingPage;
