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
import Autoplay from "embla-carousel-autoplay";

interface ClientsFeedProps {
  clients: Clients["list"];
}

export const ClientsFeed: React.FC<ClientsFeedProps> = ({ clients }) => {
  if (!clients || !clients.length) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      opts={{
        align: "start",
        slidesToScroll: "auto",
        loop: true,
      }}
      className="mx-auto 3xl:max-w-7xl"
    >
      <CarouselContent>
        {clients.map((client, index) => {
          return (
            <CarouselItem
              key={client.id || index}
              className="basis-1/2 py-4 md:basis-1/3 lg:basis-1/4"
            >
              <div className="flex items-center">
                {client.logo && (
                  <div className="relative aspect-[3/2] max-h-32 w-full">
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
