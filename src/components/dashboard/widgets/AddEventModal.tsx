import { useState } from "react";
import { Modal, DatePicker, Input } from "antd";

function AddEventModal({
  isModalOpen,
  setIsModalOpen,
  handleAddEvent,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleAddEvent: (title: string, date: string) => void;
}) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(null);

  const handleOk = () => {
    console.log("Adding event:", { title: eventTitle, date: eventDate });
    if (eventTitle.trim().length && eventDate)
      handleAddEvent(eventTitle, eventDate);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Event"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="p-4"
      >
        <div className="mb-4">
          <label
            htmlFor="eventTitle"
            className="block text-gray-700 font-bold mb-2"
          >
            Title
          </label>
          <Input
            id="eventTitle"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Date
          </label>
          <DatePicker
            id="eventDate"
            value={eventDate}
            onChange={(date) => setEventDate(date)}
          />
        </div>
      </Modal>
    </>
  );
}

export default AddEventModal;
