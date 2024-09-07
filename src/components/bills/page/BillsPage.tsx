import { FunctionComponent, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import BillsList from "../widgets/BillsList";
import GenerateBillModal from "../widgets/GenerateBillsModal";
import axiosClient from "../../../clients/axios-client";

interface BillsPageProps {}

const BillsPage: FunctionComponent<BillsPageProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bills, setBills] = useState<
    {
      residentName: string;
      type: string;
      amount: number;
      dueDate: string;
      status: string;
    }[]
  >([
    {
      residentName: "Zain",
      type: "gas",
      amount: 700,
      dueDate: "07-08-2024",
      status: "paid",
    },
  ]);

  async function handleGenerateBill(
    residentId: string,
    type: string,
    amount: number,
    dueDate: string
  ) {
    try {
      await axiosClient.post("/bills", { residentId, type, amount, dueDate });
      message.success("Bill Created!");
    } catch (error) {}
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-bold font-satoshi">Bills:</p>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Generate Bill
        </Button>
      </div>
      <BillsList bills={bills} />

      <GenerateBillModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddBill={handleGenerateBill}
      />
    </div>
  );
};

export default BillsPage;
