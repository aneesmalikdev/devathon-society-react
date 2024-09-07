import { useState } from "react";
import { Modal, DatePicker, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function AddEventModal({
  isModalOpen,
  setIsModalOpen,
  handleAddResident,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleAddResident: (
    name: string,
    email: string,
    password: string,
    file: any
  ) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleOk = () => {
    console.log("Adding resident:", {
      name,
      email,
      password,
      image: (fileList[0] as any).originFileObj,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <>
      <Modal
        title="Add Resident"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="p-4"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <Input.Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent default upload behavior
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </div>
      </Modal>
    </>
  );
}

export default AddEventModal;
