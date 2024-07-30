import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Tooltip,
  Select,
  Row,
  Col,
  Divider,
  InputNumber,
  Checkbox,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSharedSelector } from "@/shared";
import { FaPlus } from "react-icons/fa6";

const FormDrawer = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const { LOBs, LOBsLoading, LOBsError, LOBsErrorMessage } = useSharedSelector(
    (state) => state.LOBData
  );
  const [LOBsArray, setLOBsArray] = useState([]);

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
    setOpen(false);
  };
  return (
    <Drawer
      title="Forms"
      placement="bottom"
      onClose={onClose}
      open={open}
      size="large"
      extra={
        <Button className="bg-dark-primary" type="primary" htmlType="submit">
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
        initialValues={{
          form: null,
          lob: [],
          flags: [null],
          value: [null],
          questions: [{
            option: [null]
          }],
          MCQs: [{
            option: [null]
          }],
        }}
      >
        <fieldset className="p-2 border border-light-muted-300 rounded mb-4 w-1/2">
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
                placeholder={`Enter Line of Business...`}
                options={LOBsArray}
                mode="tags"
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
                          <Input allowClear placeholder="Enter value..." />
                        </Form.Item>
                      </Col>
                      <Col className="flex justify-center items-center">
                        <CloseOutlined
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
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Question ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name={[field.name, "question"]}
                          label="Question"
                        >
                          <Input allowClear />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, "bio"]}
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
                                  options={[{label: "zain", value: 1}]}
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
                                    required: true,
                                    message: "Score is required.",
                                  },
                                ]}
                              >
                                <InputNumber />
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
                                          >
                                            <Input allowClear placeholder="Enter Option..." />
                                          </Form.Item>
                                        </Col>
                                        <Col>
                                          <Form.Item
                                            noStyle
                                            name={[
                                              subField.name,
                                              "optionScore",
                                            ]}
                                          >
                                            <InputNumber />
                                          </Form.Item>
                                        </Col>
                                        <Col className="flex justify-center items-center">
                                          <CloseOutlined
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
                            <Checkbox>Not Applicable</Checkbox>
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
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name={[field.name, "question"]}
                          label="Question"
                        >
                          <Input allowClear />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, "bio"]}
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
                                            <Input allowClear placeholder="Enter Option..." />
                                          </Form.Item>
                                        </Col>
                                        <Col className="flex justify-center items-center">
                                          <CloseOutlined
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

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default FormDrawer;
