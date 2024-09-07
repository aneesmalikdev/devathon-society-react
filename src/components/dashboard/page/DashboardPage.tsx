import { FunctionComponent, useState } from "react";
import EventCalenderWidget from "../widgets/EventCalender";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import AddEventModal from "../widgets/AddEventModal";
import sampleEvents from "./sample.json";

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] =
    useState<{ date: string; title: string }[]>(sampleEvents);

  function handleAddEvent(title: string, date: string) {
    setEvents([...events, { title, date }]);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-bold font-satoshi">Event Calender:</p>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Event
        </Button>
      </div>
      <EventCalenderWidget events={events} />

      <AddEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default DashboardPage;
