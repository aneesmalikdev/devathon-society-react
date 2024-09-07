import { Modal, Form, Input, Select, DatePicker } from "antd";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { createUserProfile } from "../../../apis/auth/user";
import { useAuth } from "../../../context/authContext";

const { Option } = Select;

type Props = {
  showProfileModal: boolean;
  setShowProfileModal: (open: boolean) => void;
};

const ProfileModal = ({ showProfileModal, setShowProfileModal }: Props) => {
  const [form] = Form.useForm();
  const auth = useAuth()

  const handleOk = async () => {
    try {
      // Validate the form data
      const values = await form.validateFields();

      // Make API call to create profile
      const response = await createUserProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        houseNo: values.houseNo,
        streeNo: values.streeNo,
        gender: values.gender,
        phone: values.phone,
        dob: values.dob.format("YYYY-MM-DD"),
        email:auth?.currentUser?.email

      });

      console.log("Profile created:", response);

      // Close the modal on success
      setShowProfileModal(false);
    } catch (error) {
      console.error("Failed to create profile:", error);
      // Optionally, show error message to the user
    }
  };

  const handleCancel = () => {
    setShowProfileModal(false);
  };

  return (
    <div className="App">
      <Modal
        title="User Information"
        visible={showProfileModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" initialValues={{ gender: "male" }}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            label="House Number"
            name="houseNo"
            rules={[
              { required: true, message: "Please input your House Number!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="House Number" />
          </Form.Item>

          <Form.Item
            label="Street Number"
            name="streeNo"
            rules={[
              { required: true, message: "Please input your Street Number!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Street Number" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              { required: true, message: "Please select your date of birth!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileModal;
