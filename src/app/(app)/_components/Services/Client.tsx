"use client";

import * as React from "react";

import { Lexical } from "../Lexical";
import { Button } from "@/app/(app)/_components/Button";
import { useSearchParams } from "next/navigation";
import type { Filter, Service, ServiceSection } from "@/payload-types";
import { extractExistingParams } from "./helpers";

interface ServicesProps {
  filters: Filter[];
  services: Service[];
  section: ServiceSection;
}

export const ServicesClient: React.FC<ServicesProps> = ({
  filters,
  services,
  section,
}) => {
  const searchParams = useSearchParams();

  const [selectedFilters, setSelectedFilters] = React.useState<{
    [key: string]: string[];
  }>(extractExistingParams(searchParams));
  const [filterLevel, setFilterLevel] = React.useState<number>(1);

  const activeFilters = filters.filter((filter) => filter.level <= filterLevel);

  const toggleFilter = (key: string, value: string, multiple: boolean) => {
    const currentValue = selectedFilters[key] || [];

    let newValue: string[];
    if (multiple) {
      newValue = currentValue.includes(value)
        ? currentValue.filter((v) => v !== value)
        : [...currentValue, value];
    } else {
      newValue = currentValue.includes(value) ? [] : [value];
    }

    if (newValue.length === 0) {
      delete selectedFilters[key];
    } else {
      selectedFilters[key] = newValue;
    }

    setSelectedFilters({ ...selectedFilters });
  };

  console.log("selected filters", selectedFilters);

  if (!services.length) return null;

  const filteredServices = services.filter((service) => {
    let allowedIds: number[] = [...services.map((service) => service.id)];

    // For each selected filter
    Object.entries(selectedFilters).forEach(([filterKey, selectedValues]) => {
      // Find the matching filter definition
      const filter = filters.find((f) => f.key === filterKey);
      if (!filter) return;

      // Get all service IDs from the selected options
      const optionServiceIds = selectedValues.flatMap((value) => {
        const option = filter.options?.find((opt) => opt.value === value);
        return (
          option?.services?.map((svc) =>
            typeof svc === "number" ? svc : svc.id,
          ) || []
        );
      });

      // Intersect with currently allowed IDs
      allowedIds = allowedIds.filter((id) => optionServiceIds.includes(id));
    });

    return allowedIds.includes(service.id);
  });

  return (
    <>
      {activeFilters.map((filter, ind) => {
        return (
          <div
            key={filter.id}
            className="my-8 flex flex-wrap items-center justify-center gap-2"
          >
            {filter.options?.map((option, fi) => {
              return (
                <Button
                  variant={
                    selectedFilters[filter.key]?.includes(option.value)
                      ? "selected"
                      : "outline"
                  }
                  key={fi}
                  shape="skewed"
                  onClick={() => {
                    toggleFilter(filter.key, option.value, filter.multiple);
                  }}
                >
                  <span className="block">{option.label}</span>
                </Button>
              );
            })}
          </div>
        );
      })}
      {filteredServices.length > 0 && filteredServices.length <= 3 && (
        <>
          {section.resultsIntro && (
            <div className="mx-auto max-w-5xl px-4">
              <div>
                <h2 className="h-small">
                  Relevante scenario's ({filteredServices.length})
                </h2>
                <Lexical content={section.resultsIntro} />
              </div>
            </div>
          )}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, i) => {
              return (
                <article
                  className="relative row-span-2 grid grid-rows-subgrid border border-foreground bg-background p-4"
                  key={i}
                >
                  <h3 className="h-small">{service.title}</h3>
                  {service.content && (
                    <div>
                      <Lexical content={service.content} />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
