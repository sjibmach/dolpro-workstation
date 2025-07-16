export const sortBySortIndex = (
    array: { sortIndex?: number }[] | null | undefined
) => {
    if (!array) return null;
    return array.sort((a, b) => {
        // null should come last
        if (a.sortIndex === null) return 1;
        if (b.sortIndex === null) return -1;
        return (a.sortIndex ?? 0) - (b.sortIndex ?? 0);
    });
};
