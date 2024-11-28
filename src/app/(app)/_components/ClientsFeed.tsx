"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/(app)/_components/Carousel";
import { type Clients } from "@/payload-types";
import Image from "next/image";

interface ClientsFeedProps {
  clients: Clients["list"];
}

export const ClientsFeed: React.FC<ClientsFeedProps> = ({ clients }) => {
  if (!clients || !clients.length) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
        loop: true,
      }}
    >
      <CarouselContent>
        {clients.map((client, index) => {
          return (
            <CarouselItem
              key={client.id || index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 py-4"
            >
              <div className="flex items-center">
                {client.logo && (
                  <div className="relative aspect-[3/2] w-full max-h-32">
                    <Image
                      src={
                        typeof client.logo === "number"
                          ? ""
                          : client.logo.url || ""
                      }
                      alt={client.companyName || "logo"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {client.companyName &&
                  (client.url ? (
                    <a href={client.url} target="_blank">
                      Naar {client.companyName}
                    </a>
                  ) : (
                    <p className="sr-only">{client.companyName}</p>
                  ))}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="border-none" />
      <CarouselNext className="border-none" />
    </Carousel>
  );
};
