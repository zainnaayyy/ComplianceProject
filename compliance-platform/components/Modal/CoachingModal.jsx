"use client";
import { useEffect, useState } from "react";
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
  Modal,
  Row,
  Select,
} from "antd";
import {
  useAuth,
  useSharedDispatcher,
  useSharedSelector,
  actionAPI,
  url,
} from "@/shared";
import "antd/dist/reset.css"; // Ensure Ant Design styles are included
import dayjs from "dayjs";

const CoachingModal = ({ editing, setEditing, isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const dispatcher = useSharedDispatcher();
  const { token } = useAuth();
  const { users, usersLoading, usersError, usersErrorMessage } =
    useSharedSelector((state) => state.UserData);
  const { coachingLookups, coachingLookupsLoading } = useSharedSelector(
    (state) => state.CoachingLookupsData
  );
  const [agentsArray, setAgentsArray] = useState([]);
  const [actionTakenArray, setActionTakenArray] = useState([]);
  const [behaviorTypeArray, setBehaviorTypeArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [coachabilityLevelArray, setCoachabilityLevelArray] = useState([]);
  const [coachingStatusArray, setCoachingStatusArray] = useState([]);
  const [employeeSatisfactionArray, setEmployeeSatisfactionArray] = useState(
    []
  );
  const [frequencyArray, setFrequencyArray] = useState([]);
  const [metricArray, setMetricArray] = useState([]);
  const [isAdditionalActions, setIsAdditionalActions] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!coachingLookups?.length && isModalOpen)
      dispatcher(actionAPI.getCoachingLookups(token));
    if (!users?.length && isModalOpen) dispatcher(actionAPI.getUsers(token));
  }, [isModalOpen]);

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
      const coachingStatusOptions = coachingLookups[0]?.coachingStatus.map(
        (val) => ({
          value: val._id,
          label: val.name,
        })
      );
      setCoachingStatusArray(coachingStatusOptions);
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
      const metricOptions = coachingLookups[0]?.metric.map((val) => ({
        value: val._id,
        label: val.name,
      }));
      setMetricArray(metricOptions);
    }
  }, [coachingLookups, users]);

  const handleOk = async () => {
    setLoading(true);
    try {
      let values = await form.validateFields();
      if (editing) values = { ...values, _id: editing._id };
      const response = await fetch(url + (editing ? "/editCoaching" : "/addCoaching"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result?.success) {
        message.success(result.message);
        dispatcher(actionAPI.getCoaching(token));
        setIsModalOpen(false);
        form.resetFields();
      } else {
        message.error(result.message);
      }
      setEditing("")
      setLoading(false);
    } catch (error) {
      message.error("An error occurred while adding the user");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  
  return (
    <Modal
      //   title='Add New User'
      open={isModalOpen}
      onCancel={handleCancel}
      cancelText="Cancel"
      width={1200}
      footer={[
        <Button
          key="submit"
          type="primary"
          className="bg-dark-primary"
          loading={loading}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <div className="max-w-full mx-auto font-[sans-serif] p-6]">
        <div className="text-center mb-10">
          <h3 className="text-gray-800 text-2xl font-semibold mt-6">
            {editing ? "Edit Coaching" : "Add Coaching"}
          </h3>
        </div>
        <Form
          // labelCol={{
          //   span: 12,
          // }}
          // wrapperCol={{
          //   span: 20,
          // }}
          form={form}
          layout="vertical"
          name="coachingForm"
          className="flex justify-center flex-col"
          autoComplete="off"
          initialValues={
            editing
              ? {
                ...editing,
                "coachingDate": dayjs(editing.coachingDate),
                "goalDate": dayjs(editing.goalDate)
              }
              : {}
          }
          disabled={loading}
        >
          <fieldset className="p-2 rounded mb-4">
            <legend>Coaching Data</legend>
            <Row gutter={[16, 24]} className="mb-4">
              <Col className="gutter-row" span={6}>
                <Form.Item label="Date">
                  <Form.Item
                    name="coachingDate"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Coaching Date is required",
                      },
                    ]}
                  >
                    <DatePicker className="py-2 text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded" />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="Agent">
                  <Form.Item
                    name="agent"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Agent is required",
                      },
                    ]}
                  >
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
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="Category">
                  <Form.Item
                    name="category"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Category is required",
                      },
                    ]}
                  >
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
                      placeholder={`Select category...`}
                      options={categoryArray}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="Frequency">
                  <Form.Item
                    name="frequency"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Frequency is required",
                      },
                    ]}
                  >
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
                      placeholder={`Select frequency...`}
                      options={frequencyArray}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="Action Taken">
                  <Form.Item
                    name="actionTaken"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Action taken is required",
                      },
                    ]}
                  >
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
                      placeholder={`Select action taken...`}
                      options={actionTakenArray}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
          </fieldset>
          <fieldset className="p-2 border border-light-muted-300 rounded mb-4">
            <legend>Results</legend>
            <Flex vertical gap={16}>
              <Col span={24}>
                <Form.Item label="Exceptional">
                  <Form.Item
                    name="exceptional"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Input is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      maxLength={100}
                      // onChange={onChange}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Development Needed">
                  <Form.Item
                    name="developmentNeeded"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Input is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      maxLength={100}
                      // onChange={onChange}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Underperformed">
                  <Form.Item
                    name="underPerformed"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Input is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      maxLength={100}
                      // onChange={onChange}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Flex>
          </fieldset>
          <fieldset className="p-2 border border-light-muted-300 rounded mb-4">
            <legend>Actions</legend>
            <Flex vertical gap={16}>
              <Col span={24}>
                <Form.Item label="Implementation Plan">
                  <Form.Item
                    name="implementationPlan"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Input is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      maxLength={100}
                      // onChange={onChange}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Checkbox
                onChange={(e) => setIsAdditionalActions(e.target.checked)}
              >
                Additional Actions
              </Checkbox>
              {isAdditionalActions ? (
                <>
                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item label="Metric">
                        <Form.Item
                          name="metric"
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Metric is required",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            className="text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded"
                            allowClear
                            showSearch
                            filterOption={(val, option) => {
                              if (
                                option.label
                                  .toLowerCase()
                                  .includes(val.toLowerCase())
                              )
                                return true;
                            }}
                            placeholder={`Select metric...`}
                            options={metricArray}
                          />
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Col className="flex flex-col" span={12}>
                      <Form.Item label="Actual Score">
                        <Form.Item
                          name="actualScore"
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Actual Score is required",
                            },
                          ]}
                        >
                          <InputNumber
                            size="large"
                            className="text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded"
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace("%", "")}
                            // onChange={onChange}
                          />
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item label="Target Goal">
                        <Form.Item
                          name="targetGoal"
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Target goal is required",
                            },
                          ]}
                        >
                          <InputNumber
                            size="large"
                            className="text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded"
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace("%", "")}
                            // onChange={onChange}
                          />
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <Form.Item label="Goal Date">
                        <Form.Item
                          name="goalDate"
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Goal date is required",
                            },
                          ]}
                        >
                          <DatePicker className="py-2 text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded" />
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : null}
            </Flex>
          </fieldset>
          <fieldset className="p-2 border border-light-muted-300 rounded mb-4">
            <Form.Item label="Comments">
              <Form.Item
                name="comments"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "comments are required",
                  },
                ]}
              >
                <Input.TextArea
                  maxLength={100}
                  // onChange={onChange}
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
            </Form.Item>
          </fieldset>
          <fieldset className="p-2 border border-light-muted-300 rounded mb-4">
            <Form.Item label="Commitments">
              <Form.Item
                name="commitments"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "commitments are required",
                  },
                ]}
              >
                <Input.TextArea
                  maxLength={100}
                  // onChange={onChange}
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
            </Form.Item>
          </fieldset>
          <fieldset className="p-2 rounded mb-4">
            <Row gutter={[16, 24]} className="mb-4">
              <Col className="gutter-row" span={6}>
                <Form.Item label="Behavior Type">
                  <Form.Item
                    name="behaviorType"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Behavior type is required",
                      },
                    ]}
                  >
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
                      placeholder={`Select behavior type...`}
                      options={behaviorTypeArray}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="Coachability Level">
                  <Form.Item
                    name="coachabilityLevel"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Coachability level is required",
                      },
                    ]}
                  >
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
                      placeholder={`Select Coachability level...`}
                      options={coachabilityLevelArray}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="Employee Satisfaction">
                  <Form.Item
                    name="employeeSatisfaction"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Employee Satisfaction is required",
                      },
                    ]}
                  >
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
                      placeholder={`Select Employee satisfaction...`}
                      options={employeeSatisfactionArray}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="Coaching Status">
                  <Form.Item
                    name="coachingStatus"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Coaching Status is required",
                      },
                    ]}
                  >
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
                      placeholder={`Select Coaching status...`}
                      options={coachingStatusArray}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
            {/* <Form.Item label="Form Name">
            <Form.Item
              name="form"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Form name is required",
                },
              ]}
            >
              <Input allowClear placeholder="Enter Form name..." />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Assigned To">
            <Form.Item
              name={"lob"}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Line of Business is required.",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                filterOption={(val, option) => {
                  if (option.label.toLowerCase().includes(val.toLowerCase()))
                    return true;
                }}
                placeholder={`Select Line of Business...`}
                options={LOBsArray}
                mode="multiple"
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Red Flags">
            <Form.List name={"flags"}>
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  {subFields.map((subField, i) => (
                    <Row key={i} gutter={[16, 0]}>
                      <Col span={23} key={subField.key}>
                        <Form.Item
                          noStyle
                          name={[subField.name]}
                          rules={[
                            {
                              required: true,
                              message: "Flags are required",
                            },
                          ]}
                        >
                          <Input allowClear placeholder="Enter flag..." />
                        </Form.Item>
                      </Col>
                      <Col className="flex justify-center items-center">
                        <CloseOutlined
                          disabled={loading}
                          onClick={() => {
                            subOpt.remove(subField.name);
                          }}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Button
                    icon={<FaPlus />}
                    className="w-1/4 bg-dark-primary"
                    type="primary"
                    onClick={() => subOpt.add()}
                  >
                    Add Flag(s)
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Group">
            <Form.List name={"group"}>
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  {subFields.map((subField, i) => (
                    <Row key={i} gutter={[16, 0]}>
                      <Col span={23} key={subField.key}>
                        <Form.Item
                          noStyle
                          name={[subField.name]}
                          rules={[
                            {
                              required: true,
                              message: "Group is required",
                            },
                          ]}
                        >
                          <Input
                            onBlur={(e) => {
                              if (!isEmpty(e.target.value)) {
                                const options = form
                                  .getFieldValue("group")
                                  ?.map((value, i) => {
                                    return { label: value, value: value };
                                  });
                                setValueOption(options);
                              }
                            }}
                            allowClear
                            placeholder="Enter group..."
                          />
                        </Form.Item>
                      </Col>
                      <Col className="flex justify-center items-center">
                        <CloseOutlined
                          disabled={loading}
                          onClick={() => {
                            subOpt.remove(subField.name);
                            const options = form
                              .getFieldValue("group")
                              ?.map((value, i) => {
                                return { label: value, value: value };
                              });
                            setValueOption(options);
                          }}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Button
                    icon={<FaPlus />}
                    className="w-1/4 bg-dark-primary"
                    type="primary"
                    onClick={() => subOpt.add()}
                  >
                    Add Value(s)
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item> */}
          </fieldset>
        </Form>
      </div>
    </Modal>
  );
};

export default CoachingModal;
