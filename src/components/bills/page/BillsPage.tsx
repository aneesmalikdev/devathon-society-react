import { FunctionComponent, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import BillsList from "../widgets/BillsList";

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

  function handleAddResident(
    residentName: string,
    type: string,
    amount: number,
    dueDate: string,
    status: string
  ) {
    setBills([...bills, { residentName, type, amount, dueDate, status }]);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-bold font-satoshi">Residents:</p>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Generate Bill
        </Button>
      </div>
      <BillsList bills={bills} />

      {/* <GenerateBillModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddResident={handleAddResident}
      /> */}
    </div>
  );
};

export default BillsPage;
