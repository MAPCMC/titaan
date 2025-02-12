import React from "react";
import { User } from "lucide-react";

export const Avatar: React.FC = () => {
  return (
    <div>
      <User size={32} strokeWidth={2} absoluteStrokeWidth />
    </div>
  );
};
