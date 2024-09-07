import { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useAuth } from "../../../context/authContext";
import { googleLogin } from "../../../apis/auth/firebaseAuth";

const { Title } = Typography;

const Login = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const user = await auth?.login(values.email, values.password);
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
            onClick={googleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Login with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
