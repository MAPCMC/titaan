import Link from "next/link";
import { Button } from "./_components/Button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="h-large">Not Found</h1>
      <p>De pagina is niet gevonden.</p>
      <Button shape="skewed" asChild className="mt-8">
        <Link href="/">
          <span>Naar de hoofdpagina</span>
        </Link>
      </Button>
    </main>
  );
}
