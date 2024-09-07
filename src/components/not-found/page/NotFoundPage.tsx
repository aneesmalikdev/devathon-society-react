import { FunctionComponent } from "react";

interface NotFoundPageProps {}

const NotFoundPage: FunctionComponent<NotFoundPageProps> = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center min-h-[320px]">
      <p className="mt-[-8vh] font-bold text-[3.375rem]">
        4
        <span role="img" aria-label="Crying Face" className="text-[3.125rem]">
          😢
        </span>
        4
      </p>
      <p className="text-base leading-[1.5] my-[0.625rem]">Page not found.</p>
    </div>
  );
};

export default NotFoundPage;
