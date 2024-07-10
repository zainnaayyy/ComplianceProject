import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const CustomDrawer = ({ title, visible, onClose }) => {
  //   const [open, setOpen] = useState(false);
  //   const showDrawer = () => {
  //     setOpen(true);
  //   };
  //   const onClose = () => {
  //     setOpen(false);
  //   };
  return (
    <>
      {/* <Button type='primary' onClick={showDrawer}>
        Open
      </Button> */}
      {/* Drawer */}
      <Drawer title={title} onClose={onClose} open={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default CustomDrawer;
