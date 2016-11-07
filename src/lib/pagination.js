export const getPageInfo = (current, previous, params) => {
  const {start, length, limit, total} = current;
  const lastItem = start + length;
  const currentPage = Math.floor(start / (limit * 1.0)) + 1; // starts with 1
  const lastPage = Math.ceil(total / (limit * 1.0));
  return {
    total,
    length,
    limit,
    startItem: start,
    lastItem,
    currentPage,
    lastPage,
    furthestPage: Math.max(currentPage, previous.furthestPage || 0),
    furthestItem: Math.max(lastItem, previous.furthestItem || 0),
    ...params
  };
};

export const getPageDefaults = () => {
  return {
    current: 0,
    lastLoaded: 0,
    furthestPage: 0,
    furthestItem: 0
  };
};
