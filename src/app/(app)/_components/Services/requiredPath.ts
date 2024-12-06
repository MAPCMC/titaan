import { Filter } from "@/payload-types";

export const requiredPath = (
  filter: Filter,
  filters: Filter[],
  activeValues: { [key: string]: Set<string> },
): boolean => {
  if (filter.level === 1) {
    return true;
  }

  if (filter.level === 2) {
    const parent = filters
      .filter((f) => f.level === 1)
      .find((f) => f.options?.find((op) => op.filters?.includes(filter.id)));
    const parentOption = parent?.options?.find((op) =>
      op.filters?.includes(filter.id),
    );

    if (!parent || !parentOption) return false;
    return activeValues[parent.key]?.has(parentOption.value);
  }

  if (filter.level === 3) {
    const parent = filters
      .filter((f) => f.level === 2)
      .find((f) => f.options?.find((op) => op.filters?.includes(filter.id)));
    const parentOption = parent?.options?.find((op) =>
      op.filters?.includes(filter.id),
    );

    if (!parent || !parentOption) return false;
    if (!activeValues[parent.key]?.has(parentOption.value)) return false;
    const parentofparent = filters
      .filter((f) => f.level === 1)
      .find((f) => f.options?.find((op) => op.filters?.includes(parent.id)));
    const parentofParentOption = parentofparent?.options?.find((op) =>
      op.filters?.includes(parent.id),
    );

    if (!parentofparent || !parentofParentOption) return false;
    return (
      activeValues[parent.key]?.has(parentOption.value) &&
      activeValues[parentofparent.key]?.has(parentofParentOption.value)
    );
  }

  return false;
};
