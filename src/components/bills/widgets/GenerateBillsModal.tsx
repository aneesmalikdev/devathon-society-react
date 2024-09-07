import { useEffect, useState } from "react";
import { Modal, DatePicker, Input, Upload, InputNumber, Select } from "antd";
import axiosClient from "../../../clients/axios-client";

const { Option } = Select;
function GenerateBillModal({
  isModalOpen,
  setIsModalOpen,
  handleAddBill,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleAddBill: (
    residentId: string,
    type: string,
    amount: number,
    dueDate: string
  ) => void;
}) {
  const [selectedResident, setSelectedResident] = useState(null);
  const [billType, setBillType] = useState(null);
  const [amount, setAmount] = useState(0);
  const [dueDate, setDueDate] = useState(null);
  const [residents, setResidents] = useState<any[]>([]);

  useEffect(() => {
    async function getResidents() {
      const res = await axiosClient.get("/users");
      console.log(res);

      setResidents((res as any).users);
    }
    getResidents();
  }, []);

  console.log(residents);

  const handleOk = () => {
    if (selectedResident && billType && amount && dueDate)
      handleAddBill(selectedResident, billType, amount, dueDate);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Generate Bill"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="p-4"
      >
        <div className="mb-4">
          <label
            htmlFor="resident"
            className="block text-gray-700 font-bold mb-2"
          >
            Resident
          </label>
          <Select
            id="resident"
            value={selectedResident}
            onChange={setSelectedResident}
            style={{ width: "100%" }}
          >
            {residents.map((resident) => (
              <Option key={resident.id} value={resident.id}>
                {resident.firstName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Type
          </label>
          <Select
            id="type"
            value={billType}
            onChange={setBillType}
            style={{ width: "100%" }}
          >
            <Option value="gas">Gas</Option>
            <Option value="electricity">Electricity</Option>
            <Option value="water">Water</Option>
          </Select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Amount
          </label>
          <InputNumber
            id="amount"
            value={amount}
            onChange={(value) => value && setAmount(value)}
            style={{ width: "100%" }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Due Date
          </label>
          <DatePicker
            id="dueDate"
            value={dueDate}
            onChange={setDueDate}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
    </>
  );
}

export default GenerateBillModal;
