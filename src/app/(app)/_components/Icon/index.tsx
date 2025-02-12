import React from "react";
import Image from "next/image";

export const Icon: React.FC = () => {
  return (
    <div>
      <Image src="/icon.svg" width={60} height={60} alt="Titaan" />
    </div>
  );
};
