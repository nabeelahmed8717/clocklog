import { Avatar, Dropdown, Input, Select, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import Dots from "../../../../assets/icons/dots.png";
import changeGrid from "../../../../assets/icons/settings/projectandtasks/changeGrid.svg";
import Menu from "../../../../assets/icons/settings/projectandtasks/menu.svg";
import addTask from "../../../../assets/icons/settings/projectandtasks/addTask.svg";
import editIcon from "../../../../assets/icons/settings/projectandtasks/edit.svg";
import deleteIcon from "../../../../assets/icons/settings/projectandtasks/delete.svg";
import "./SelectedTasks.scss";
import { Kanban } from "./TeamSelectedForms/Kanban";
import deleteWhiteIcon from "../../../../assets/icons/settings/projectandtasks/deletewhite.svg";
import TasksSelectedStatus from "./TasksSelectedStatus";
import AddTaskModal from "./addTaskModal";
import managerImage from "../../../../assets/icons/settings/projectandtasks/managerImage.svg";
import {
  selectedTaskData,
  TasksDataType,
} from "../../../../mock/SettingProjectAndTasks";
import ProjectAndTaskDeleteModal from "../ProjectAndTasksModals/ProjectAndTaskDeleteModal";

import searchIconLow from "../../../../assets/icons/search.svg";

export const SelectedTasks = (props: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDeleteTasksOpen, setIsDeleteTasksOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("Select Status");
  const [IsShowMenu, setIsShowMenu] = useState(false);
  const [isEmployeeData, setIsEmployeeData] = useState("");
  const { role }: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const [tableData, setTableData] = useState(selectedTaskData);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);

  // const handleSelectChange = (value: string) => {
  //   setSelectedOption(value);
  // };
  const handleSelectChange = (value: any, selectedRecord: any) => {
    console.log('value', value);

    let temp = [...tableData]
    temp = temp.map((ele) => {
      if (ele.key == selectedRecord.key) {
        ele.status = value
      }
      return ele
    })
    setTableData(temp)
  }
  const options = [
    { value: "progress", label: "In Progress" },
    { value: "ToDo", label: "To Do" },
    { value: "review", label: "Review" },
    { value: "completed", label: "Completed" },
  ];



  const items: any = [
    {
      label: (
        <Space onClick={() => { setIsOpenModal(true); setIsEditModal(true) }}>
          <img src={editIcon} alt="" />
          <p>Edit</p>
        </Space>
      ),
      key: "1",
    },
    {
      label: (
        <Space onClick={() => setIsDeleteTasksOpen(true)}>
          <img src={deleteIcon} alt="" />
          <p>Delete</p>
        </Space>
      ),
      key: "2",
    },
  ];

  const columns: ColumnsType<TasksDataType> = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      render: (projectname) => (
        <span className="fs-14 fw-400 line-height-21 grey-color">
          {projectname}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <>
          <div className={`wrap-status ${record.status === 'ToDo' ? 'toDoStatus' : record.status === 'completed' ? 'completedStatus' : record.status === 'progress' ? 'progressStatus' : record.status === 'review' ? 'reviewStatus' : "ProductivityStatusTagged"}`}>
            <Select value={record.status || 'Select Status'} onChange={(value) => handleSelectChange(value, record)} placeholder="Select Status" >
              {options.map(option => (<Select.Option key={option.value} value={option.value} style={{ backgroundColor: option.value === 'ToDo' ? '#EBEAEA' : option.value === 'completed' ? '#D9FFDA' : option.value === 'progress' ? '#FFCBCB' : option.value === 'review' ? 'rgba(33, 204, 255, 0.25)' : "", borderRadius: '25px', width: 'fit-content', marginTop: "10px", color: option.value === 'Neutral' ? '#4E4B66' : option.value === 'Productive' ? '#0FBE16' : option.value === 'Unproductive' ? '#FF3737' : "" }}>
                {option.label}
              </Select.Option>))}
            </Select>
          </div>
        </>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      render: (assignee) => (
        <div>
          <Avatar.Group
            maxCount={2}
            maxPopoverTrigger="click"
            size="large"
            maxStyle={{
              color: "#3F4059",
              backgroundColor: "#E5E5E5",
              cursor: "pointer",
              border: "2px solid #FFFFFF",
            }}
          >
            <Avatar src={managerImage} />
            <Avatar src={managerImage} />
            <Tooltip title="Ant User" placement="top">
              <Avatar style={{ backgroundColor: "#87d068" }} />
            </Tooltip>
            <Avatar style={{ backgroundColor: "#1890ff" }} />
          </Avatar.Group>
        </div>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      render: (dueDate) => (
        <span className="fs-14 fw-400 line-height-21 grey-color">
          {dueDate}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
        >
          <Space>
            <div className="border-color cursor-pointer">
              <img src={Dots} alt="menu" />
            </div>
          </Space>
        </Dropdown>
      ),
    },
  ];
  const employeeColumns: ColumnsType<TasksDataType> = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      render: (projectname) => (
        <span className="fs-14 fw-400 line-height-21 grey-color">
          {projectname}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <>
          <div className={`wrap-status ${record.status === 'ToDo' ? 'toDoStatus' : record.status === 'completed' ? 'completedStatus' : record.status === 'progress' ? 'progressStatus' : record.status === 'review' ? 'reviewStatus' : "ProductivityStatusTagged"}`}>
            <Select value={record.status || 'Select Status'} onChange={(value) => handleSelectChange(value, record)} placeholder="Select Status" >
              {options.map(option => (<Select.Option key={option.value} value={option.value} style={{ backgroundColor: option.value === 'ToDo' ? '#EBEAEA' : option.value === 'completed' ? '#D9FFDA' : option.value === 'progress' ? '#FFCBCB' : option.value === 'review' ? 'rgba(33, 204, 255, 0.25)' : "", borderRadius: '25px', width: 'fit-content', marginTop: "10px", color: option.value === 'Neutral' ? '#4E4B66' : option.value === 'Productive' ? '#0FBE16' : option.value === 'Unproductive' ? '#FF3737' : "" }}>
                {option.label}
              </Select.Option>))}
            </Select>
          </div>
        </>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      render: (dueDate) => (
        <span className="fs-14 fw-400 line-height-21 grey-color">
          {dueDate}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
        >
          <Space>
            <div className="border-color cursor-pointer">
              <img src={Dots} alt="menu" />
            </div>
          </Space>
        </Dropdown>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 1;

  useEffect(() => {
    const absc = setInterval(() => {
      setIsEmployeeData(
        JSON.parse(localStorage.getItem("selectedEmployeeTasks") || "{}")
      );
    }, 100);
    return () => clearInterval(absc);
  }, [isEmployeeData]);

  return (
    <div>
      <div>
        {role === "Employee" && <h5 className="fs-20 fw-600 m-0 title-color" style={{ textAlign: "left", marginBottom: "15px" }}>Tasks</h5>}
        <div className="tasks-select-filter d-flex justify-between">
          <div className="d-flex align-items-center">
            <h5 className="fs-16 fw-600 line-height-24 grey-color m-0">
              {isEmployeeData ?? "Clocklog"}
            </h5>
            {!!hasSelected && (
              <div
                className="d-flex justify-center align-items-center"
                style={{
                  height: "30px",
                  width: "31px",
                  backgroundColor: "rgba(255, 77, 79, 0.8)",
                  borderRadius: "50%",
                  marginLeft: "15px",
                  cursor: "pointer"
                }}
                onClick={() => setIsDeleteTasksOpen(true)}
              >
                <img width={13} height={18} src={deleteWhiteIcon} alt="deleteWhiteIcon" />
              </div>
            )}
            <ProjectAndTaskDeleteModal
              isDeleteActiveOpen={isDeleteTasksOpen}
              setIsDeleteActiveOpen={setIsDeleteTasksOpen}
            />
          </div>

          <div className="wrap-tasks-selected d-flex align-items-center">
            <div
              className="d-flex align-items-center wrap-task-search cursor-pointer"
              style={{ gap: "11px" }}
            >
              <div>
                {!IsShowMenu && (
                  <span onClick={() => setIsShowMenu(true)}>
                    <Tooltip
                      placement="leftTop"
                      title="Kanban"
                      arrow={false}
                      overlayInnerStyle={{
                        backgroundColor: "#CDFFD7",
                        color: "#2A9D8F",
                        width: "auto",
                        borderRadius: "30px",
                        padding: "4px 17px",
                      }}
                    >
                      <img
                        src={changeGrid}
                        className="white-img-theme-class"
                        alt="changeGrid"
                      />
                    </Tooltip>
                  </span>
                )}
                {IsShowMenu && (
                  <span onClick={() => setIsShowMenu(false)}>
                    <Tooltip placement="leftTop" title="Menu">
                      <img
                        src={Menu}
                        alt="changeGrid"
                        className="white-img-theme-class"
                      />
                    </Tooltip>
                  </span>
                )}
              </div>

              <Input
                placeholder="Search Task"
                className="team-select-search  card-bg-color card-bg-3-border-color  custom-input-field"
                prefix={<img src={searchIconLow} />}
              />
            </div>
            <div
              className="d-flex align-items-center warp-selected"
              style={{ gap: "11px" }}
            >
              <TasksSelectedStatus />
              <button
                className="fs-16 fw-500 line-height-24 grey-color cursor-pointer d-flex align-items-center justify-between wrap-add-task ant-input-affix-wrapper card-bg-color card-bg-3-border-color  btn-theme-color"
                onClick={() => { setIsOpenModal(true); setIsEditModal(false) }}
              >
                <img src={addTask} alt="addTask" />
                Add Task
              </button>
              <AddTaskModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                title={isEditModal}
              />
            </div>
          </div>
        </div>

        {!IsShowMenu && (
          <div
            className="wrap-tasks-table"
          >
            <Table
              rowSelection={rowSelection}
              columns={(role === "Admin" || role === "Manager") ? columns : employeeColumns}
              className="ant-table-content wrapper-table"
              dataSource={selectedTaskData}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content", scrollToFirstRowOnChange: true }}
            />
          </div>
        )}
        {IsShowMenu && <Kanban setIsEditModal={() => { setIsOpenModal(true); setIsEditModal(true) }} />}
      </div>
    </div>
  );
};
