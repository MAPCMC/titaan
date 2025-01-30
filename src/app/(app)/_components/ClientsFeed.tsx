"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
  usePrevNextButtons,
} from "@/app/(app)/_components/Carousel";
import { type Clients } from "@/payload-types";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

interface ClientsFeedProps {
  clients: Clients["list"];
}

const ensureLoop = (list: Clients["list"], cutoff: number) => {
  if (!list || !list.length) return [];

  if (list.length > cutoff) {
    return list;
  } else {
    return ensureLoop([...list, ...list], cutoff);
  }
};

export const ClientsFeed: React.FC<ClientsFeedProps> = ({ clients }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [clientList, setClientList] = React.useState<Clients["list"]>(
    ensureLoop(clients, 4),
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(api);

  const onButtonAutoplayClick = React.useCallback(
    (callback: () => void) => {
      const autoScroll = api?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [api],
  );

  if (!clients || !clients.length || !clientList || clientList.length <= 3)
    return null;

  return (
    <Carousel
      setApi={setApi}
      plugins={[
        AutoScroll({
          speed: 1,
          stopOnInteraction: true,
          playOnInit: true,
        }),
      ]}
      opts={{
        align: "start",
        slidesToScroll: "auto",
        loop: true,
      }}
      className="3xl:max-w-7xl mx-auto"
    >
      <CarouselContent>
        {clientList.map((client, index) => {
          if (!client) return null;
          return (
            <CarouselItem
              key={`${client.id}-${index}`}
              className="basis-1/2 py-4 md:basis-1/3 lg:basis-1/4"
            >
              <div className="grid place-items-center">
                {client.logo && typeof client.logo === "object" && (
                  <div className="relative z-0 col-start-1 row-start-1 aspect-3/2 max-h-32 w-full">
                    {client.logo.url && (
                      <Image
                        src={client.logo.url}
                        alt={client.companyName ?? "logo"}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                )}
                {client.companyName &&
                  (client.url ? (
                    <a
                      href={client.url}
                      target="_blank"
                      className="group z-10 col-start-1 row-start-1 grid h-full w-full place-items-center"
                    >
                      <span className="h-small text-background group-hover:bg-foreground group-focus:bg-background group-focus:text-foreground group-hover:group-focus:bg-foreground group-hover:group-focus:text-background hidden items-center justify-center p-3 px-10 py-2 group-hover:flex group-focus:flex max-md:min-h-12">
                        Naar {client.companyName}
                      </span>
                    </a>
                  ) : (
                    <p className="sr-only">{client.companyName}</p>
                  ))}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious
        className="border-none"
        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
        disabled={prevBtnDisabled}
      />
      <CarouselNext
        className="border-none"
        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
        disabled={nextBtnDisabled}
      />
    </Carousel>
  );
};
