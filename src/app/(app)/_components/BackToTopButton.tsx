"use client";

import { Button } from "@/app/(app)/_components/Button";

export const BackToTopButton = () => {
  const handleClick = () => {
    const body = document.getElementById("body");
    const topLink = document.getElementById("homeLink");

    if (body) {
      body.scrollIntoView();
      topLink?.focus();
    }
  };

  return (
    <Button
      variant="link"
      className="flex w-full justify-start"
      onClick={handleClick}
    >
      <span className="first-letter:uppercase">Terug naar boven</span>
    </Button>
  );
};
