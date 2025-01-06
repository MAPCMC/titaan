import { Filter } from "@/payload-types";

export const requiredPath = (
  filter: Filter,
  filters: Filter[],
  activeValues: { [key: string]: Set<string> },
): boolean => {
  if (filter.level === 1) return true;

  const findParentChains = (currentFilter: Filter): Filter[][] => {
    const parents = filters.filter(
      (f) =>
        f.level === currentFilter.level - 1 &&
        f.options?.some((op) => op.filters?.includes(currentFilter.id)),
    );

    if (parents.length === 0) return [];

    return parents.flatMap((parent) => {
      const parentChains = findParentChains(parent);
      if (parentChains.length === 0) return [[parent]];
      return parentChains.map((chain) => [...chain, parent]);
    });
  };

  const parentChains = findParentChains(filter);

  if (!parentChains.some((chain) => chain.length === filter.level - 1))
    return false;

  return parentChains.some((parentChain) =>
    parentChain.every((parent) => {
      const parentOption = parent.options?.find(
        (op) =>
          op.filters?.includes(
            parentChain[parentChain.indexOf(parent) + 1]?.id || filter.id,
          ) && activeValues[parent.key]?.has(op.value),
      );
      return !!parentOption;
    }),
  );
};
