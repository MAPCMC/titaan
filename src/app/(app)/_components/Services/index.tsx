import React, { Suspense } from "react";

import type { ServiceSection } from "@/payload-types";
import { ServicesClient } from "./Client";
import { getCachedFilters } from "@/db/collections/Filters/utilities/getFilters";
import { getCachedServices } from "@/db/collections/Services/utilities/getServices";

interface Props {
  section: ServiceSection;
}

export const Services: React.FC<Props> = async ({ section }: Props) => {
  const services = await getCachedServices()();
  const filters = await getCachedFilters()();

  return (
    <Suspense>
      <ServicesClient services={services} filters={filters} section={section} />
    </Suspense>
  );
};
