import Header from "@/components/Header";
import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col gap-5 items-center justify-center gap-4 p-24 ">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Error Page</h1>
        <p className="text-red-500">Something went wrong.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
