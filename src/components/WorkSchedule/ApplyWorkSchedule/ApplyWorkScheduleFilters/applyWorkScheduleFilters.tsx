import { useState } from "react";
import { Col, Input, Row } from "antd";
import SearchIcon from "../../../../assets/icons/search-icon.svg"
import MoveSelectedUser from "./moveSelectedUser";
import SelectStatus from "./selectStatus";
import SelectUserFilter from "./selectUser";
import AddModal from "../addModal/addModal";
import "./applyWorkScheduleFilters.scss";

const ApplyWorkScheduleFilters = (props: any) => {
  const { setIsSelectedUser, isSelectedUser, setIsActionType  } = props;
  const [isAddModal, setIsAddModal] = useState(false);

  const { role }: any = JSON.parse(localStorage.getItem("UserData") || "{}");

  return (
    <div className="gripper-main-filters">
      <Row style={{ gap: "10px" }} className="apply-work-shedule-filters w-100">
        {role === 'Employee' ? (
          <>
            <Col xs={24} md={24} lg={5} className="select-status">
              <SelectStatus />
            </Col>
          </>
        ) : (
          <>
            <Col xs={24} md={24} lg={5} className="select-users">
              <SelectUserFilter />
            </Col>
            <Col xs={24} md={24} lg={5} className="select-status">
              <SelectStatus />
            </Col>
            <Col xs={24} md={24} lg={5} className="select-status">
              <MoveSelectedUser isSelectedUser={isSelectedUser} />
            </Col>
            <Col xs={24} md={24} lg={5} className="select-status">
              <div
                className="apply-work-schedule-btn border-radius-6 fs-14 fw-500 grey-color d-flex align-center cursor-pointer "
                onClick={() => {setIsAddModal(true); setIsActionType('add') }}
              >
                Apply Work Schedule
              </div>
            </Col>
          </>
        )}
      </Row>
      {role !== 'Employee' && (
        <Input
          className="search-input custom-input-field"
          placeholder="Search Schedule"
          prefix={<img src={SearchIcon} alt="searchIcon" />}
          style={{ height: "40px" }}
        />
      )}
      <AddModal isAddModal={isAddModal} setIsAddModal={setIsAddModal} />
    </div>
  );
};

export default ApplyWorkScheduleFilters;
