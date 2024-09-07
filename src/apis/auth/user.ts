import axiosClient from "../../clients/axios-client"


interface UserProfile {
  user: any;
  // Add other properties if they exist
}

export const me = async () => {
  const response = await axiosClient.get<UserProfile>("/users/me");
  console.log("res", response)
  return response;
};

export const createUserProfile = async (body:any): Promise<UserProfile> => {
  const response = await axiosClient.post<UserProfile>("/users", body);
  return response.data; // Since the interceptor returns `response.data`, this is the `UserProfile` type
};