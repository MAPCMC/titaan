import React from "react";

import { CasesFeedClient } from "./Client";
import { Case } from "@/payload-types";

export const CasesFeed: React.FC<{ cases: Case[] }> = ({ cases }) => {
  return <CasesFeedClient cases={cases} />;
};
