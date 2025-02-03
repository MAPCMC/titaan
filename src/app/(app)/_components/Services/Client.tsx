"use client";

import * as React from "react";

import { Lexical } from "../Lexical";
import { Button } from "@/app/(app)/_components/Button";
import type {
  Filter,
  Service,
  ServiceSection,
  Form as FormType,
} from "@/payload-types";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "../../_helpers";
import { requiredPath } from "./requiredPath";
import { Triangle } from "../Triangle";
import { Form } from "@/app/(app)/_components/Form";
import { AnimatedExit } from "@/app/(app)/_components/AnimatedExit";
import { AutoFocus } from "../AutoFocus";
import { useIsInteracting } from "./_helpers/useIsInteracting";

interface ServicesProps {
  filters: Filter[];
  services: Service[];
  section: ServiceSection;
  anchor?: string;
}

export const ServicesClient: React.FC<ServicesProps> = ({
  filters,
  services,
  section,
  anchor,
}) => {
  const [selectedServices, setSelectedServices] = React.useState<number[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const interactingRef = React.useRef(null);
  const isInteracting = useIsInteracting(interactingRef);

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

  const filterOptions = () => {
    return Object.keys(entries).map((key: string, i: number) => {
      const filter = visibleFilters.find((filter) => {
        return filter.key === key;
      });
      const options = filter?.options
        ?.filter((option) => {
          return searchParams.has(key, option.value);
        })
        .map((option) => option.label);

      return options;
    });
  };

  return (
    <div className="relative" ref={interactingRef}>
      <Triangle
        orientation="down"
        className="bg-red-light h-full transition-[height_.5s_ease-in-out]"
        wrapperClassName="absolute -top-64 h-[calc(100%+26rem)] left-1/2 -translate-x-1/2 z-[-1]"
      />
      <section id={`${anchor}-filters`} className="relative">
        <div className="mx-auto mb-6 h-10 max-w-5xl px-4 text-right">
          <Button
            onClick={() => {
              setSelectedServices([]);
              router.push("?", { scroll: false });
              document.getElementById(`${anchor}`)?.scrollIntoView();
            }}
            variant="outline"
            shape="small"
            className={searchParams.size > 0 ? "inline" : "hidden"}
          >
            Filters verwijderen
          </Button>
        </div>
        {filters.map((filter, i) => {
          const lastFilter =
            visibleFilters[visibleFilters.length - 1].id === filter.id;

          if (
            lastFilter &&
            filter.level !== 1 &&
            isInteracting &&
            filteredServices.length > 3
          ) {
            return (
              <AutoFocus
                isVisible={true}
                key={filter.id}
                className={
                  "motion-translate-y-in-[2rem] mb-6 flex h-auto flex-wrap items-center justify-center gap-2"
                }
              >
                {filteredServices.length > 3 && (
                  <Triangle
                    orientation="right"
                    className="bg-red h-full"
                    wrapperClassName="absolute left-0 h-16 top-0 z-[-1] -motion-translate-x-in-100 motion-ease-spring-smooth"
                  />
                )}
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
              </AutoFocus>
            );
          }
          return (
            <div
              key={filter.id}
              className={cn(
                "motion-translate-y-in-[2rem] mb-6 flex h-auto flex-wrap items-center justify-center gap-2",
                {
                  "hidden h-0": !visibleFilters.find(
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
          <p className="h-small mx-auto max-w-5xl px-4 text-center">
            Selecteer meer velden voor gerichte informatie
          </p>
        )}
        {filteredServices.length === 0 && (
          <div className="motion-translate-y-in-[2rem] mx-auto max-w-5xl space-y-3 px-4 text-center">
            <p className="h-small">
              {"Oeps! geen scenario's met (al) deze criteria."}
            </p>
          </div>
        )}
      </section>

      <AutoFocus
        isVisible={filteredServices.length > 0 && filteredServices.length <= 3}
        id={`${anchor}-services`}
        className="motion-translate-y-in-[2rem] mb-12"
      >
        {selectedServices.length === 0 && (
          <Triangle
            orientation="right"
            className="bg-red h-full"
            wrapperClassName="absolute left-0 h-18 top-40 z-[-1] -motion-translate-x-in-100 motion-ease-spring-smooth"
          />
        )}
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
                className="border-foreground bg-background relative row-span-3 grid grid-rows-subgrid border p-4"
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
      </AutoFocus>

      <AnimatedExit
        asChild
        isVisible={filteredServices.length > 0 && selectedServices.length > 0}
        animationOut="motion-translate-y-out-[2rem] motion-opacity-out-0"
      >
        <AutoFocus
          isVisible={filteredServices.length > 0 && selectedServices.length > 0}
          focusProps={{ block: "start" }}
          as="section"
          id="diensten-contact"
          className="bg-red motion-translate-y-in-[2rem]"
        >
          <Triangle
            orientation="right"
            className="h-full bg-white"
            wrapperClassName="absolute left-0 h-18 top-20 z-[-1] -motion-translate-x-in-100 motion-ease-spring-smooth"
          />
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="h-large">Dit zoek ik</h2>
            <div className="grid min-h-[50vh] gap-3 md:grid-cols-3 md:gap-6">
              <div className="lexical border-foreground bg-background flex h-full flex-col items-start border p-4 md:col-start-3">
                <h3 className="h-small mb-6">Wat we weten</h3>
                <p>Over jou/jullie:</p>
                <ul>
                  {filterOptions().map((options, i) => {
                    if (!options) return null;
                    return (
                      <li key={i} className="list-inside list-[square]">
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
                <Button
                  onClick={() => {
                    setSelectedServices([]);
                    router.push("?", { scroll: false });
                    document.getElementById(`${anchor}`)?.scrollIntoView();
                  }}
                  variant="outline"
                  shape="skewed"
                  className="mt-auto w-auto"
                >
                  <span>Annuleren</span>
                </Button>
              </div>
              <div className="border-foreground bg-background border p-4 md:col-span-2 md:row-start-1">
                {section.form && typeof section.form === "object" && (
                  <Form
                    form={section.form as FormType}
                    services={filteredServices.filter((service) => {
                      return selectedServices.includes(service.id);
                    })}
                    filters={filterOptions()}
                  />
                )}
              </div>
            </div>
          </div>
        </AutoFocus>
      </AnimatedExit>
    </div>
  );
};
