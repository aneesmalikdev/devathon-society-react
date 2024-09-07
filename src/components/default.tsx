import { FunctionComponent, ReactNode, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface DefaultComponentProps {}

const fallbackRender: (props: FallbackProps) => ReactNode = ({
  error,
  resetErrorBoundary,
}: {
  error: Record<"message", string>;
  resetErrorBoundary: FallbackProps["resetErrorBoundary"];
}) => {
  return (
    <div role="alert">
      <span>Something went wrong:</span>
      <pre className="text-red-500">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const DefaultComponent: FunctionComponent<DefaultComponentProps> = () => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <span>Loading...</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
};

export default DefaultComponent;
