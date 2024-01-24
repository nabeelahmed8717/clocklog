import { Modal } from 'antd';
import React, { useState } from 'react'
import { AddTasks } from './TeamSelectedForms/AddTask/AddTasks';

const AddTaskModal = ({ isOpenModal, setIsOpenModal,title }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div>
      <Modal
        title={title ? "Edit Task" : "Add Task"}
        open={isOpenModal}
        onOk={() => setIsOpenModal(false)}
        onCancel={() => setIsOpenModal(false)}
        width={810}
        okText="Save"
        wrapClassName='modal-theme'
      >
        <AddTasks />
      </Modal>
    </div>
  )
}

export default AddTaskModal