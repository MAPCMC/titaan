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

const ensureLoop = (list: any[], cutoff: number) => {
  if (!list || !list.length) return [];

  if (list.length > cutoff) {
    return list;
  } else {
    return ensureLoop([...list, ...list], cutoff);
  }
};

export const ClientsFeed: React.FC<ClientsFeedProps> = ({ clients }) => {
  const [api, setApi] = React.useState<CarouselApi>();

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

  // const toggleAutoplay = React.useCallback(() => {
  //   const autoScroll = api?.plugins()?.autoScroll;
  //   if (!autoScroll) return;

  //   const playOrStop = autoScroll.isPlaying()
  //     ? autoScroll.stop
  //     : autoScroll.play;
  //   playOrStop();
  // }, [api]);

  // React.useEffect(() => {
  //   const autoScroll = api?.plugins()?.autoScroll;
  //   if (!autoScroll) return;

  //   setIsPlaying(autoScroll.isPlaying());
  //   api
  //     .on("autoScroll:play", () => setIsPlaying(true))
  //     .on("autoScroll:stop", () => setIsPlaying(false))
  //     .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  // }, [api]);

  if (!clients || !clients.length) return null;
  const clientlist = ensureLoop(clients, 4);

  return (
    <Carousel
      setApi={setApi}
      plugins={[
        AutoScroll({
          speed: 1,
          stopOnInteraction: true,
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
        {clientlist.map((client, index) => {
          return (
            <CarouselItem
              key={`${client.id}-${index}`}
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
