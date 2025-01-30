import { Lexical } from "@/app/(app)/_components/Lexical";
import React from "react";

import { Width } from "../Width";

export const Message: React.FC<{
  message?: Record<string, any>;
}> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <Lexical content={message} />}
    </Width>
  );
};
