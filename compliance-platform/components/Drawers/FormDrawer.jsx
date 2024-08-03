import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Card,
  Form,
  Input,
  Select,
  Row,
  Col,
  Divider,
  InputNumber,
  Checkbox,
  Popconfirm,
  message,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  actionAPI,
  url,
  useSharedDispatcher,
  useSharedSelector,
  isEmpty,
} from "@/shared";
import { FaPlus } from "react-icons/fa6";

const FormDrawer = ({
  open,
  setOpen,
  token,
  editableData,
  setEditableData,
}) => {
  const [form] = Form.useForm();
  const [valueOption, setValueOption] = useState([]);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatcher = useSharedDispatcher();
  const { LOBs, LOBsLoading, LOBsError, LOBsErrorMessage } = useSharedSelector(
    (state) => state.LOBData
  );
  const [LOBsArray, setLOBsArray] = useState([]);

  useEffect(() => {
    if (token) {
      if (!LOBs?.length) dispatcher(actionAPI.getLOBs(token));
    }
  }, [token]);

  useEffect(() => {
    if (LOBs) {
      const lobOptions = LOBs.map((lob) => ({
        value: lob._id,
        label: lob.name,
      }));
      setLOBsArray(lobOptions);
    }
  }, [LOBs]);

  const onClose = () => {
    setEditableData(null);
    form.resetFields();
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let values = await form.validateFields();
      if (editableData) values = { ...values, _id: editableData._id };
      const response = await fetch(
        url + (editableData ? "/editFormTemplate" : `/addForm`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      if (result?.success) {
        message.success(result.message);
        dispatcher(actionAPI.getFormTemplates(token));
        onClose();
      } else {
        message.error(result.message);
        dispatcher(actionAPI.gettingFormTemplateListFailed(result));
      }
      setLoading(false);
    } catch (error) {
      message.error("An error occurred while adding the user");
      dispatcher(actionAPI.gettingFormTemplateListFailed(error));
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Forms"
      placement="bottom"
      onClose={onClose}
      open={open}
      size="large"
      extra={
        <Button
          loading={loading}
          className="bg-dark-primary"
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      }
    >
      <Form
        // labelCol={{
        //   span: 12,
        // }}
        // wrapperCol={{
        //   span: 20,
        // }}
        form={form}
        layout="vertical"
        name="dynamic_form_complex"
        className="flex justify-center flex-col"
        autoComplete="off"
        initialValues={
          editableData
            ? editableData
            : {
                form: null,
                lob: [],
                flags: [null],
                value: [null],
                questions: [
                  {
                    option: [null],
                  },
                ],
                MCQs: [
                  {
                    option: [null],
                  },
                ],
              }
        }
        disabled={loading}
      >
        <fieldset className="p-2 rounded mb-4 w-1/2">
          <legend>Form Data</legend>
          <Form.Item label="Form Name">
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
          <Form.Item label="Value">
            <Form.List name={"value"}>
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
                              message: "Value is required",
                            },
                          ]}
                        >
                          <Input
                            onBlur={(e) => {
                              if (!isEmpty(e.target.value)) {
                                const options = form
                                  .getFieldValue("value")
                                  ?.map((value, i) => {
                                    return { label: value, value: value };
                                  });
                                setValueOption(options);
                              }
                            }}
                            allowClear
                            placeholder="Enter value..."
                          />
                        </Form.Item>
                      </Col>
                      <Col className="flex justify-center items-center">
                        <CloseOutlined
                          disabled={loading}
                          onClick={() => {
                            subOpt.remove(subField.name);
                            const options = form
                              .getFieldValue("value")
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
          </Form.Item>
        </fieldset>
        <fieldset className="p-2 border border-light-muted-300 rounded mb-4">
          <legend>Questions</legend>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field, f) => (
                  <Card
                    size="small"
                    title={`Question ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <Popconfirm
                        disabled={loading}
                        title="Sure to delete?"
                        onConfirm={() => {
                          remove(field.name);
                        }}
                      >
                        <a className="">
                          <CloseOutlined className="w-6 h-6 " />
                        </a>
                      </Popconfirm>
                    }
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name={[field.name, "question"]}
                          rules={[
                            {
                              required: isEmpty(
                                form.getFieldValue("MCQs")[0]?.question
                              )
                                ? true
                                : false,
                              message: "One or more questions are required.",
                            },
                          ]}
                          label="Question"
                        >
                          <Input allowClear />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, "quesDetails"]}
                          label="Question Details"
                        >
                          <Input.TextArea allowClear rows={6} />
                        </Form.Item>
                      </Col>
                      <Divider className="h-auto" type="vertical" />
                      <Col span={11}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item label="Value">
                              <Form.Item
                                name={[field.name, "qValue"]}
                                noStyle
                                rules={[
                                  {
                                    required: true,
                                    message: "Value is required.",
                                  },
                                ]}
                              >
                                <Select
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
                                  placeholder={`Select value...`}
                                  options={valueOption}
                                  // mode="tags"
                                />
                              </Form.Item>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Score">
                              <Form.Item
                                name={[field.name, "score"]}
                                noStyle
                                rules={[
                                  {
                                    required: form.getFieldValue("questions")[f]?.applicable ? false : true,
                                    message: "Score is required.",
                                  },
                                ]}
                              >
                                <InputNumber
                                  disabled={form.getFieldValue("questions")[f]?.applicable}
                                  onBlur={() =>
                                    setQuestion(form.getFieldValue("questions"))
                                  }
                                />
                              </Form.Item>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={24}>
                            <Form.Item label="Options">
                              <Form.List name={[field.name, "option"]}>
                                {(subFields, subOpt) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      rowGap: 16,
                                    }}
                                  >
                                    {subFields.map((subField, i) => (
                                      <Row key={i} gutter={16}>
                                        <Col span={8}>
                                          <Form.Item
                                            noStyle
                                            name={[subField.name, "optionText"]}
                                            rules={[
                                              {
                                                required: !isEmpty(
                                                  question[f]?.qValue
                                                )
                                                  ? true
                                                  : false,
                                                message:
                                                  "One or more options are required.",
                                              },
                                            ]}
                                          >
                                            <Input
                                              allowClear
                                              onChange={() =>
                                                setQuestion(
                                                  form.getFieldValue(
                                                    "questions"
                                                  )
                                                )
                                              }
                                              placeholder="Enter Option..."
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col>
                                          <Form.Item
                                            noStyle
                                            name={[
                                              subField.name,
                                              "optionScore",
                                            ]}
                                            rules={[
                                              {
                                                required: !isEmpty(
                                                  question[f]?.option[i]
                                                    ?.optionText
                                                )
                                                  ? form.getFieldValue("questions")[f]?.applicable ? false : true
                                                  : false,
                                                message:
                                                  "Score is mandatory for an option.",
                                              },
                                            ]}
                                          >
                                            <InputNumber
                                              disabled={form.getFieldValue("questions")[f]?.applicable}
                                              max={
                                                form.getFieldValue("questions")[f]?.applicable || question[f]?.score === 0 ? 0 : i === 0
                                                  ? question[f]?.score
                                                  : question[f]?.option[i - 1]
                                                      ?.optionScore - 1
                                              }
                                              min={
                                                form.getFieldValue("questions")[f]?.applicable || question[f]?.score === 0 ? 0 : isEmpty(
                                                  question[f]?.option[i + 1]
                                                    ?.optionScore
                                                )
                                                  ? 0
                                                  : question[f]?.option[i + 1]
                                                      ?.optionScore + 1
                                              }
                                              onChange={() => {
                                                setQuestion(
                                                  form.getFieldValue(
                                                    "questions"
                                                  )
                                                );
                                              }}
                                              onBlur={() =>
                                                setQuestion(
                                                  form.getFieldValue(
                                                    "questions"
                                                  )
                                                )
                                              }
                                            />
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
                                      className="w-2/6 bg-dark-primary"
                                      type="primary"
                                      onClick={() => subOpt.add()}
                                    >
                                      Add Option(s) & their Score
                                    </Button>
                                  </div>
                                )}
                              </Form.List>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Form.Item
                            name={[field.name, "applicable"]}
                            valuePropName="checked"
                            // rules={[
                            //   {
                            //     validator: (_, value) =>
                            //       value
                            //         ? Promise.resolve()
                            //         : Promise.reject(
                            //             new Error("Should accept agreement")
                            //           ),
                            //   },
                            // ]}
                          >
                            <Checkbox onChange={(e) => {
                              if(e.target.checked){
                                let resetScore = form.getFieldValue("questions")[f].option.map(val => {return{...val, optionScore:null}})
                                form.setFieldValue(["questions", f, "option"], resetScore)
                                form.setFieldValue(["questions", f, "score"], null)
                              }
                              setQuestion(form.getFieldValue("questions"))
                            }}>Not Applicable</Checkbox>
                          </Form.Item>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  icon={<FaPlus />}
                  type="primary"
                  onClick={() => add()}
                  className="mb-4 bg-dark-primary"
                >
                  Add Question(s)
                </Button>
              </div>
            )}
          </Form.List>
          <Form.List name="MCQs">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Multiple Choice Questions ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => {
                          remove(field.name);
                        }}
                      >
                        <a className="">
                          <CloseOutlined
                            disabled={loading}
                            className="w-6 h-6 "
                          />
                        </a>
                      </Popconfirm>
                    }
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name={[field.name, "question"]}
                          label="Question"
                          rules={[
                            {
                              required: isEmpty(question[0]?.question)
                                ? true
                                : false,
                              message: "One or more MCQs are required.",
                            },
                          ]}
                        >
                          <Input allowClear />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, "MCQDetails"]}
                          label="Question Details"
                        >
                          <Input.TextArea allowClear rows={6} />
                        </Form.Item>
                      </Col>
                      <Divider className="h-auto" type="vertical" />
                      <Col span={11}>
                        <Row gutter={16}>
                          <Col span={24}>
                            <Form.Item label="Options">
                              <Form.List name={[field.name, "option"]}>
                                {(subFields, subOpt) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      rowGap: 16,
                                    }}
                                  >
                                    {subFields.map((subField, i) => (
                                      <Row key={i} gutter={16}>
                                        <Col span={8}>
                                          <Form.Item
                                            noStyle
                                            name={[subField.name, "label"]}
                                          >
                                            <Input
                                              allowClear
                                              placeholder="Enter Option..."
                                            />
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
                                      className="w-2/6 bg-dark-primary"
                                      type="primary"
                                      onClick={() => subOpt.add()}
                                    >
                                      Add Option(s)
                                    </Button>
                                  </div>
                                )}
                              </Form.List>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  icon={<FaPlus />}
                  type="primary"
                  onClick={() => add()}
                  className="bg-dark-primary"
                >
                  Add Multiple Choice Question(s)
                </Button>
              </div>
            )}
          </Form.List>
        </fieldset>
      </Form>
    </Drawer>
  );
};
export default FormDrawer;
