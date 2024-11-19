export default async function PageTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-wrap sm:grid sm:grid-cols-[auto_1fr] gap-4 mt-12">
      {title && (
        <h1 className="h-large max-w-4xl col-span-full">
          {title}
        </h1>
      )}
    </div>
  );
}
