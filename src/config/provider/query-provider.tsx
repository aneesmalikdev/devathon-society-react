import { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AxiosError } from "axios";
import { message } from "antd";

interface Props {
  children: React.ReactNode;
}

const QueryProvider: FC<Props> = ({ children }) => {
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
              void message.error(
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
