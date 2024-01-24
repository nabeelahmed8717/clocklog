import { useState } from "react";
import { Dropdown, MenuProps, Radio, RadioChangeEvent, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./selectSchedule.scss";

const SelectSchedule = (props:any) => {
    const { handleAddModal } = props;
  const [value, setValue] = useState("");

  const [isMoveSelectedUserModal, setIsMoveSelectedUserModal] = useState(false);

  const handelMoveSelectedUser = (e: any) => {
    setValue(e.target.value);
    handleAddModal(e.target.value, 'selectSchedule')
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <Radio.Group onChange={handelMoveSelectedUser} value={value}>
          <Space direction="vertical">
            <Radio value="Morning">Morning</Radio>
            <Radio value="Evening">Evening</Radio>
            <Radio value="Night">Night</Radio>
          </Space>
        </Radio.Group>
      ),
      key: "1",
    },
  ];

  return (
    <div className="select-schedule-wrapper">
      <Dropdown menu={{ items }} trigger={["click"]} className="cursor-pointer">
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          style={{ height: "37px" }}
          className="select-dropdown-btn fs-14 fw-400 border-radius-4"
        >
          <Space>
            Select
            <DownOutlined />
          </Space>
        </div>
      </Dropdown>
      {/* <MoveUserModal
        initialState={isMoveSelectedUserModal}
        setState={setIsMoveSelectedUserModal}
        selectedTime={value}
      /> */}
    </div>
  );
};

export default SelectSchedule;
