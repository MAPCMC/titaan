"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/(app)/_components/Carousel";
import { type Case } from "@/payload-types";
import { Lexical } from "../Lexical";
import { Button } from "@/app/(app)/_components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

interface CasesFeedProps {
  cases: Case[];
}

export const CasesFeedClient: React.FC<CasesFeedProps> = ({ cases }) => {
  if (!cases || !cases.length) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
        loop: false,
      }}
      className="3xl:max-w-7xl mx-auto"
    >
      <CarouselContent className="grid auto-cols-[100%] grid-flow-col auto-rows-max md:auto-cols-[50%]">
        {cases.map((caseItem, i) => (
          <CarouselItem
            key={`case-${i}`}
            className="row-span-5 grid grid-rows-subgrid"
          >
            <article className="border-foreground bg-background relative row-span-5 grid grid-rows-subgrid border p-4">
              <h3 className="h-medium">{caseItem.title}</h3>
              <div className="mt-4">
                <Lexical content={caseItem.content} />
              </div>
              <p className="h-small">{caseItem.fullname}</p>
              <p className="pb-16 text-sm">{caseItem.position}</p>

              {caseItem.commentary && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      shape="skewed"
                      variant="outline"
                      className="mr-8 -ml-1"
                    >
                      <span>Suzanne over dit project</span>
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    sideOffset={8}
                    className="border-foreground bg-background w-[var(--radix-popover-trigger-width)] rounded-none border"
                  >
                    <Lexical content={caseItem.commentary} />
                    <PopoverClose className="text-sm first-letter:uppercase">
                      sluit
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              )}
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border-none" />
      <CarouselNext className="border-none" />
    </Carousel>
  );
};
