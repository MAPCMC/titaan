import React from "react";

import { CasesFeedClient } from "./Client";
import { getCachedCases } from "@/db/collections/Cases/utilities/getActiveCases";

export const CasesFeed: React.FC = async () => {
  const cases = await getCachedCases()();

  return <CasesFeedClient cases={cases} />;
};
