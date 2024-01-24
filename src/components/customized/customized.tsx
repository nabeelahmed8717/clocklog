import React, { useState } from "react"
import { customizedMockData, employeeInformationData, exportMockData, productivityMockData, timeFormatMockData, timeTrackedData } from "../../mock/customizedMockData"
import './customized.scss';
import { Checkbox, Select, Space } from "antd";
import CSV from "../../assets/icons/csv.png";
import XLS from "../../assets/icons/xls.png";
import PDF from "../../assets/icons/Pdf.png";

const Customized = () => {
  const [customizedFilter, setCustomizedFilter] = useState<any>({
    information: [],
    timeTracked: [],
    timeFormat: [],
    productivity: [],
    idleTime: [],
    export: []
  })
  const customizeHandleChange = (value: any, type: string) => {
    setCustomizedFilter({ ...customizedFilter, [type]: value })
  }
  const items = [
    {
      label: (
        <Space>          
          <img src={XLS} alt="XLS" className="white-img-theme-class cursor-pointer" /> XLS
        </Space>),
      key: "0",
    },
    {
      label: (
        <Space>          
          <img src={CSV} alt="CSV" className="white-img-theme-class cursor-pointer" /> CSV
        </Space>),
      key: "1",
    },
    {
      label: (
        <Space>          
          <img src={PDF} alt="PDF" className="white-img-theme-class cursor-pointer" /> PDF
        </Space>),
      key: "3",
    },
  ];

  return (
    <>
      <div className='customized-wrapper  border-radius-8 w-100 main-bg-color'>
        <div className='profile-information-wrap'>
          <h2 className="title-color fs-16 line-height-24 fw-500 m-0">Employee Information</h2>
          <div className="profile-information-checkbox">
            <Checkbox.Group className="title-color" options={employeeInformationData} onChange={(val) => customizeHandleChange(val, 'information')} defaultValue={['Name']} />
          </div>
        </div>
        <div className='time-tracked-wrap'>
          <h2 className="title-color fs-16 line-height-24 fw-500 m-0">Time Tracked</h2>
          <div className="time-tracked-checkbox w-100">
            <Checkbox.Group options={timeTrackedData} onChange={(val) => customizeHandleChange(val, 'timeTracked')} />
          </div>
        </div>
        <div className='time-format-wrap'>
          <h2 className="title-color fs-14 line-height-20 fw-400 m-0">Time Format</h2>
          <div className="time-format-select w-100">
            <Select
              size="large"
              className="select-input-theme"
              popupClassName="select-theme"
              labelInValue
              style={{ width: "100%", maxWidth: "400px", }}
              defaultValue={{ value: 'Select', label: 'Select' }}
              onChange={(val) => customizeHandleChange(val?.value, 'timeFormat')}
              options={timeFormatMockData}

            />
          </div>
        </div>
        <div className='productivity-format-wrap'>
          <h2 className="title-color fs-16 line-height-24 fw-500 m-0">Productivity</h2>
          <div className="productivity-checkbox w-100">
            <Checkbox.Group options={productivityMockData} onChange={(val) => customizeHandleChange(val, 'productivity')} />
          </div>
        </div>
        <div className='idle-time-wrap'>
          <h2 className="title-color fs-16 line-height-24 fw-500 m-0">Idle Time</h2>
          <div className="idle-time w-100">
            <Checkbox.Group options={customizedMockData} onChange={(val) => customizeHandleChange(val, 'idleTime')} />
          </div>
        </div>
        <div className='export-wrap'>
          <h2 className="title-color fs-14 line-height-24 fw-400 m-0">Export</h2>
          <div className="export w-100">
            <Select
              size="large"
              className="select-input-theme"
              popupClassName="select-theme"
              labelInValue
              style={{ width: "100%", maxWidth: "400px", }}
              defaultValue={{ value: 'Select', label: 'Select' }}
              onChange={(val) => customizeHandleChange(val?.value, 'export')}
              options={items}
            />
          </div>
        </div>
        <div className="export-btn">
          <button type="button" className="text-white fs-16 fw-500 cursor-pointer border-radius-8 fw-500">Export Custom Report</button>
        </div>
      </div>
    </>
  )
}

export default Customized