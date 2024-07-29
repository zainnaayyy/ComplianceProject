"use client";
import React, { useState } from "react";
import { Avatar, Button, Flex, Image, Modal, Upload, message } from "antd";
import { FaUpload } from "react-icons/fa6";
import {
  actionAPI,
  blobValidation,
  isEmpty,
  url,
  useSharedDispatcher,
} from "@/shared";

const ModalComponent = ({
  token,
  isModalOpen,
  setIsModalOpen,
  selectedUser,
}) => {
  const dispatcher = useSharedDispatcher();
  const [profile, setProfile] = useState(
    selectedUser.profileImage ? [{ url: selectedUser.profileImage }] : []
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(); //data:image/jpeg;base64,

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <FaUpload fontSize={32} />
    </button>
  );
  const handleFileChange = (file, onProgress, onSuccess, onError) => {
    setLoading(true);
    try {
      let reader = new FileReader();
      reader.onloadend = async () => {
        let validated = blobValidation(file, true);
        if (!validated?.success) {
          message.error(validated?.message);
          setProfile([{ url: selectedUser.profileImage }]);
          setImage("")
          setLoading(false);
          onError();
          return;
        }
        let FileName = file?.name;
        let uploadedDocument = {
          name: FileName,
          Base64Txt: reader?.result?.split(",")[1],
        };
        console.log("Uploaded document", uploadedDocument);
      };
      if (file) reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        setProfile([{ url: reader.result }]);
      });
      setLoading(false);
      onSuccess();
    } catch (e) {
      console.log("upload error", e);
      setLoading(false);
      onError();
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    console.log(file.url, ":::", file.preview);
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleUpdate = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      userId: selectedUser._id,
      profileImage: image,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url + "/addProfileImage", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          message.success(result?.message);
          dispatcher(actionAPI.getUsers(token));
        } else {
          message.error("An error occurred. Please try again!");
          setProfile([{ url: selectedUser.profileImage }]);
        }
        setImage("");
        setLoading(false);
      })
      .catch((error) => {
        message.error("An error occurred. Please try again!");
        setProfile([{ url: selectedUser.profileImage }]);
        setImage("");
        setLoading(false);
      });
  };

  const handleRemove = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const raw = JSON.stringify({
      userId: selectedUser._id,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(url + '/deleteProfileImage', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          message.success(result?.message);
          setProfile([]);
          setImage('');
          dispatcher(actionAPI.getUsers(token));
        } else {
          message.error('An error occurred. Please try again!');
        }
        setLoading(false);
      })
      .catch((error) => {
        message.error('An error occurred. Please try again!');
        setLoading(false);
      });
  };

  return (
    <Modal
      title='User Profile'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      width={600} // Increased modal width
      footer={[
        <Button
          hidden={isEmpty(image)}
          key='submit'
          type='primary'
          className='bg-dark-primary'
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>,
      ]}
    >
      <div className='flex flex-col items-center'>
        <Flex gap='middle' wrap>
          <Upload
            customRequest={({ file, onProgress, onSuccess, onError }) =>
              handleFileChange(file, onProgress, onSuccess, onError)
            }
            listType='picture-circle'
            onPreview={handlePreview}
            onRemove={handleRemove}
            className='mb-5'
            fileList={profile}
          >
            {!isEmpty(image) || profile?.length ? null : uploadButton}
          </Upload>
          {previewImage ? (
            <Image
              wrapperStyle={{
                display: 'none',
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          ) : null}
        </Flex>
        {selectedUser && (
          <div className='grid grid-cols-2 gap-14 content-center'>
            <div className='flex flex-col '>
              <span className=' text-lg font-bold text-gray-700'>
                Full Name
              </span>
              <span className='text-lg text-gray-900'>
                {selectedUser.fullName}
              </span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Email</span>
              <span className='text-lg text-gray-900'>
                {selectedUser.email}
              </span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>
                Line Of Business
              </span>
              <span className='text-lg text-gray-900'>{selectedUser.LOB}</span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Site</span>
              <span className='text-lg text-gray-900'>{selectedUser.site}</span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Status</span>
              <span
                className={`text-lg font-medium ${
                  selectedUser.status ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {selectedUser.status ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className='flex flex-col '>
              <span className='text-lg font-bold text-gray-700'>Role</span>
              {console.log(selectedUser.roles)}
              <span className='text-lg text-gray-900'>
                {selectedUser.roles.join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalComponent;
