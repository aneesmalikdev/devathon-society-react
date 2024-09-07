import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // Adjust the import path as needed

const { Title, Paragraph } = Typography;

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <>
          <Title level={3} className="text-center">
            verify you email
          </Title>
          <Paragraph className="text-center">
            You have registered, but please check your email to verify your
            account.
          </Paragraph>
          <div className="text-center">
            <Button type="primary" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
