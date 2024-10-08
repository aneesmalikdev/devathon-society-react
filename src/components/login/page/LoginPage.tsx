import { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useAuth } from "../../../context/authContext";
import { googleLogin } from "../../../apis/auth/firebaseAuth";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../widgets/ProfileModal";
import { me } from "../../../apis/auth/user";

const { Title } = Typography;

const Login = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  useEffect(() => {
    if (auth?.currentUser) navigate("/dashboard");
  }, []);

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await auth?.login(values.email, values.password);
      const userProfile: any = await me();
      console.log("userPro:", userProfile);
      if (userProfile.user !== null) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
        setShowProfileModal(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8 shadow-lg bg-white" bordered={false}>
        <Title level={3} className="text-center mb-6">
          Login to Your Account
        </Title>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="flex items-center justify-center mt-4">
          <Button
            onClick={async () => {
              try {
                await googleLogin();
                navigate("/dashboard");
              } catch (error) {
                message.error("Google login failed. Please try again.");
              }
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Login with Google
          </Button>
        </div>
        <div className="text-center text-sm mt-2">
          <span>
            Not a Member:{" "}
            <a
              href="/register"
              className="text-black underline hover:underline"
            >
              Sign Up Now
            </a>
          </span>
        </div>
      </Card>
      {showProfileModal && (
        <ProfileModal
          showProfileModal={showProfileModal}
          setShowProfileModal={setShowProfileModal}
        />
      )}
    </div>
  );
};

export default Login;
