import { FunctionComponent, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import AddResidentModal from "../widgets/AddResidentModal";
import ResidentsList from "../widgets/ResidentsList";

interface ResidentsPageProps {}

const ResidentsPage: FunctionComponent<ResidentsPageProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [residents, setResidents] = useState<any[]>([
    { name: "Zain", email: "hellozain@gmail.com", status: "active" },
  ]);

  function handleAddResident(
    name: string,
    email: string,
    password: string,
    file: any
  ) {
    setResidents([...residents, { name, email }]);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-bold font-satoshi">Residents:</p>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Resident
        </Button>
      </div>
      <ResidentsList residents={residents} />

      <AddResidentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddResident={handleAddResident}
      />
    </div>
  );
};

export default ResidentsPage;
