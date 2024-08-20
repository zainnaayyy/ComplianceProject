"use client";
import React, { useEffect, useState } from "react";
import FormDrawer from "@/components/Drawers/FormDrawer";
import { Button, Card, Flex, Input, message, Typography } from "antd";
import { FaPen, FaTrash } from "react-icons/fa6";
import {
  actionAPI,
  url,
  useAuth,
  useSharedDispatcher,
  useSharedSelector,
} from "@/shared";

const FormTemplate = () => {
  const dispatcher = useSharedDispatcher();
  const { token } = useAuth();
  const {
    formTemplate,
    formTemplateLoading,
    formTemplateError,
    formTemplateErrorMessage,
  } = useSharedSelector((state) => state.FormTemplateData);

  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editableData, setEditableData] = useState(null);

  useEffect(() => {
    if (token) {
      if (!formTemplate?.length) dispatcher(actionAPI.getFormTemplates(token));
    }
  }, [token]);

  const onSearch = (val) => {
    setLoading(true);
    // dispatcher(actionAPI.gettingFormTemplateListLoading());
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      form: val,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url + "/searchFormTemplate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        dispatcher(
          actionAPI.gettingFormTemplateListSuccess(result.formTemplates)
        )
      })
      .catch((error) => {
        setLoading(false);
        dispatcher(actionAPI.gettingFormTemplateListFailed(error))
      });
  };

  const handleDelete = (id) => {
    dispatcher(actionAPI.gettingFormTemplateListLoading());
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

    fetch(url + '/deleteFormTemplate', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          message.success(result?.message);
          dispatcher(actionAPI.getFormTemplates(token));
        } else {
          message.error(result?.message);
        }
      })
      .catch((error) => {
        message.error('An error occurred. Please try again!');
      });
  };

  const onEdit = (val) => {
    setEditableData(val);
    setIsDrawerOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl p-2">Forms</div>
        <div className="flex pt-1">
          <div class="group/nui-input relative">
            <Input.Search
              allowClear
              placeholder="Search forms..."
              enterButton="Search"
              onPressEnter={(e) => onSearch(e.target.value)}
              onSearch={(val) => onSearch(val)}
              prefix={
                <div class="dark:text-black text-muted-400 group-focus-within/nui-input:text-dark-primary-500 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75">
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
              }
              size="large"
              className="text-dark-muted-600 placeholder:text-dark-muted-300 dark:text-black dark:placeholder:text-dark-muted-500 peer w-full font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 text-sm leading-5 rounded"
            />
          </div>
          <div className="flex space-x-2 px-4">
            <Button
              className="nui-focus border-dark-muted-300 dark:border-dark-muted-700 text-white focus:ring-4 focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-dark-primary-800 bg-dark-primary"
              type="primary"
              size="large"
              onClick={() => setIsDrawerOpen(true)}
            >
              Add Form
            </Button>
          </div>
        </div>
      </div>
      <Flex className="mt-4 gap-[80px]" vertical={false} wrap justify="flex-start">
        {formTemplate?.length
          ? formTemplate?.map((template, i) => {
              return (
                <Card
                  key={template._id}
                  loading={loading}
                  actions={[
                    <Typography.Link
                      disabled={loading}
                      onClick={() => onEdit(template)}
                    >
                      <FaPen
                        className="text-dark-primary hover:text-dark-primary-700"
                        key="edit"
                      />
                    </Typography.Link>,
                    <Typography.Link disabled={loading} onClick={() => handleDelete(template._id)}>
                      <FaTrash
                        className="text-red-600 hover:text-red-800"
                        key="delete"
                      />
                    </Typography.Link>,
                  ]}
                  style={{
                    minWidth: 300,
                  }}
                >
                  <Card.Meta
                    // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                    title={template.form}
                    // description={
                    //   <>
                    //     <p>This is the description</p>
                    //     <p>This is the description</p>
                    //   </>
                    // }
                  />
                </Card>
              );
            }) : formTemplateLoading ?
            <Card
                  loading={true}
                  actions={[
                    <Typography.Link
                      disabled={true}
                    >
                      <FaPen
                        className="text-dark-primary hover:text-dark-primary-700"
                        key="edit"
                      />
                    </Typography.Link>,
                    <Typography.Link disabled={true}>
                      <FaTrash
                        className="text-red-600 hover:text-red-800"
                        key="delete"
                      />
                    </Typography.Link>,
                  ]}
                  style={{
                    minWidth: 300,
                  }}
                >
                  <Card.Meta
                    // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                    title={"loading..."}
                    // description={
                    //   <>
                    //     <p>This is the description</p>
                    //     <p>This is the description</p>
                    //   </>
                    // }
                  />
                </Card> : <Typography.Paragraph strong className="text-center">No forms to show!</Typography.Paragraph>
          }
        {isDrawerOpen ? (
          <FormDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} token={token} editableData={editableData} setEditableData={setEditableData} />
        ) : null}
      </Flex>
    </div>
  );
};

export default FormTemplate;
