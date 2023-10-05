import Header from "@/components/Header";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col gap-5 items-center justify-center gap-4 p-24 ">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">404 page not found</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
