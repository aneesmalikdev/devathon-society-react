import { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useToast from "../hooks/toast";
import { AxiosError } from "axios";

interface Props {
  children: React.ReactNode;
}

const QueryProvider: FC<Props> = ({ children }) => {
  const { toast } = useToast();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
          mutations: {
            onError: (error: unknown) => {
              void toast.error(
                `Something went wrong: ${
                  (error as AxiosError<{ message: string }>)?.response?.data
                    .message || "unknown"
                }`
              );
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
