import { Filter } from "@/payload-types";

export const requiredPath = (
  filter: Filter,
  filters: Filter[],
  activeValues: { [key: string]: Set<string> },
): boolean => {
  if (filter.level === 1) return true;

  const findParentChain = (currentFilter: Filter): Filter[] => {
    const parent = filters
      .filter((f) => f.level === currentFilter.level - 1)
      .find((f) =>
        f.options?.find((op) => op.filters?.includes(currentFilter.id)),
      );

    if (!parent) return [];

    const parentChain = findParentChain(parent);
    return [...parentChain, parent];
  };

  const parentChain = findParentChain(filter);
  if (parentChain.length !== filter.level - 1) return false;

  return parentChain.every((parent) => {
    const parentOption = parent.options?.find((op) =>
      op.filters?.includes(
        parentChain[parentChain.indexOf(parent) + 1]?.id || filter.id,
      ),
    );
    return parentOption && activeValues[parent.key]?.has(parentOption.value);
  });
};
