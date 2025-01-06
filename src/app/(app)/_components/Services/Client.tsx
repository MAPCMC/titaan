"use client";

import * as React from "react";

import { Lexical } from "../Lexical";
import { Button } from "@/app/(app)/_components/Button";
import type { Filter, Service, ServiceSection } from "@/payload-types";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "../../_helpers";
import { requiredPath } from "./requiredPath";
import { Triangle } from "../Triangle";

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
  const [selectedServices, setSelectedServices] = React.useState<number[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const entries = Object.fromEntries(
    Array.from(searchParams.entries()).map(([key, value]) => [
      key,
      new Set([value]),
    ]),
  );

  const visibleFilters = filters.filter((filter) =>
    requiredPath(filter, filters, entries),
  );

  const filteredServices = services.filter((service) => {
    let allowedIds = services.map((service) => service.id);

    for (const key of searchParams.keys()) {
      const keyValues = searchParams.getAll(key) || [];

      keyValues.forEach((value) => {
        const filter = filters.find((f) => f.key === key);

        const newIds = filter
          ? ((filter?.options?.find((opt) => opt.value === value)
              ?.services as number[]) ?? [])
          : allowedIds;

        allowedIds = allowedIds.filter((id) => newIds.includes(id));
      });
    }

    return allowedIds.includes(service.id);
  });

  // remove filters that are active but invisible
  React.useEffect(() => {
    const invisibleEntries = Object.fromEntries(
      Array.from(searchParams.entries()).filter(([key, value]) => {
        const filter = filters.find((f) => f.key === key);
        return !filter || !requiredPath(filter, filters, entries);
      }),
    );

    if (Object.keys(invisibleEntries).length > 0) {
      const newParams = new URLSearchParams(searchParams);

      Object.keys(invisibleEntries).forEach((key) => {
        newParams.delete(key);
      });

      router.push(`?${newParams.toString()}`, {
        scroll: false,
      });
    }
  }, [searchParams, entries, filters, router]);

  const handleFilterClick = (key: string, value: string, multiple: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);

    setSelectedServices([]);

    if (newSearchParams.has(key, value)) {
      newSearchParams.delete(key, value);
    } else {
      if (multiple) {
        newSearchParams.append(key, value);
      } else {
        newSearchParams.set(key, value);
      }
    }

    const newEntries = Object.fromEntries(
      Array.from(newSearchParams.entries()).map(([key, value]) => [
        key,
        new Set([value]),
      ]),
    );

    newSearchParams.forEach((key) => {
      const filter = filters.find((f) => f.key === key);

      if (!filter || !requiredPath(filter, filters, newEntries)) {
        newSearchParams.delete(key);
      }
    });

    router.push(`?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const handleServiceClick = (serviceId: number) => {
    const newSelectedServices = selectedServices.includes(serviceId)
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];
    setSelectedServices(newSelectedServices);
  };

  return (
    <>
      <div className="relative">
        <div className="mx-auto mb-6 h-10 max-w-5xl px-4 text-right">
          <Button
            onClick={() => {
              setSelectedServices([]);
              router.push("?", { scroll: false });
            }}
            variant="outline"
            shape="small"
            className={searchParams.size > 0 ? "inline" : "hidden"}
          >
            Filters verwijderen
          </Button>
        </div>
        <Triangle
          orientation="down"
          className="bg-red-light"
          wrapperClassName="absolute -top-64 h-[calc(100%+26rem)] left-1/2 -translate-x-1/2 z-[-1]"
        />
        {filters.map((filter, i) => {
          return (
            <div
              key={filter.id}
              className={cn(
                "mb-6 flex h-auto flex-wrap items-center justify-center gap-2",
                {
                  "hidden h-0": !visibleFilters.find(
                    (vis) => vis.id === filter.id,
                  ),
                  "animate-in slide-in-from-bottom-8": visibleFilters.find(
                    (vis) => vis.id === filter.id,
                  ),
                },
              )}
            >
              {filter.options?.map((option, fi) => {
                const isSelected = (key: string, value: string) => {
                  return searchParams?.has(key, value);
                };
                return (
                  <div key={fi}>
                    <Button
                      variant={
                        isSelected(filter.key, option.value)
                          ? "selected"
                          : "outline"
                      }
                      key={fi}
                      shape="skewed"
                      onClick={() =>
                        handleFilterClick(
                          filter.key,
                          option.value,
                          filter.multiple,
                        )
                      }
                    >
                      <span className="block">{option.label}</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          );
        })}
        {filteredServices.length > 3 && (
          <p className="mx-auto max-w-5xl px-4 text-center">
            Selecteer meer velden voor gerichte informatie
          </p>
        )}
        {filteredServices.length === 0 && (
          <div className="mx-auto max-w-5xl space-y-3 px-4 text-center animate-in slide-in-from-bottom-8">
            <p className="h-small">
              {"Oeps! geen scenario's met (al) deze criteria."}
            </p>
          </div>
        )}
        {filteredServices.length > 0 && filteredServices.length <= 3 && (
          <div className="mb-12 animate-in slide-in-from-bottom-8">
            {section.resultsIntro && (
              <div className="mx-auto max-w-5xl px-4">
                <div>
                  <h2 className="h-small">
                    {`Relevante scenario's (${filteredServices.length})`}
                  </h2>
                  <Lexical content={section.resultsIntro} />
                </div>
              </div>
            )}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, i) => {
                return (
                  <article
                    className="relative row-span-3 grid grid-rows-subgrid border border-foreground bg-background p-4"
                    key={i}
                  >
                    <h3 className="h-small">{service.title}</h3>
                    {service.content && (
                      <div>
                        <Lexical content={service.content} />
                      </div>
                    )}
                    <Button
                      variant={
                        selectedServices.includes(service.id)
                          ? "selected"
                          : "outline"
                      }
                      shape="skewed"
                      className="mr-8"
                      onClick={() => handleServiceClick(service.id)}
                    >
                      <span>Dit zoek ik</span>
                    </Button>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {selectedServices.length > 0 && (
        <section className="bg-red animate-in slide-in-from-bottom-8">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="h-large">Gericht contact</h2>
            <div className="grid gap-3 md:grid-cols-3 md:gap-6">
              <div className="lexical border border-foreground bg-background p-4 md:col-start-3">
                <h3>Wat we weten</h3>
                <p>Over jou/jullie:</p>
                <ul>
                  {Object.keys(entries).map((key: string, i: number) => {
                    const filter = visibleFilters.find((filter) => {
                      return filter.key === key;
                    });
                    const options = filter?.options
                      ?.filter((option) => {
                        return searchParams.has(key, option.value);
                      })
                      .map((option) => option.label);

                    return (
                      <li
                        key={`${key}-${i}`}
                        className="list-inside list-[square]"
                      >
                        {options?.join("/")}
                      </li>
                    );
                  })}
                </ul>
                <p>Je kan hulp gebruiken bij:</p>
                <ul className="list-inside list-[square]">
                  {services
                    .filter((service) => {
                      return selectedServices.includes(service.id);
                    })
                    .map((service, i) => {
                      return <li key={i}>{service.title}</li>;
                    })}
                </ul>
              </div>
              <form className="border border-foreground bg-background p-4 md:col-span-2 md:row-start-1">
                <h3 className="h-small">Navragen beschikbaarheid</h3>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
