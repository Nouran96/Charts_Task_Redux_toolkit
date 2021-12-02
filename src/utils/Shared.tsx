/*
    Original Answer: https://stackoverflow.com/a/15524326
    @Description: Searches for a specific object in nested objects or arrays according to "objectId" key
    @Params: originalData => The original array or object to search in
             nodeId => the id to compare to objectId field
             dataToBeAdded => new data to be added ad children to found node
    @Returns: Modified original data
  */
export const getModifiedData = (
  originalData: any,
  nodeId: string,
  dataToBeAdded: any
) => {
  let result = null;
  const originalDataCopy = JSON.parse(JSON.stringify(originalData)); // Deep copy

  if (originalData instanceof Array) {
    for (let i = 0; i < originalDataCopy.length; i++) {
      result = getModifiedData(originalDataCopy[i], nodeId, dataToBeAdded);

      if (result) {
        originalDataCopy[i] = result;
      }
    }
  } else {
    for (let prop in originalDataCopy) {
      if (prop === "objectId") {
        if (originalDataCopy[prop] === getNodeId(nodeId)) {
          originalDataCopy.children = dataToBeAdded;
          return originalDataCopy;
        }
      }

      if (
        originalDataCopy[prop] instanceof Object ||
        originalDataCopy[prop] instanceof Array
      ) {
        result = getModifiedData(originalDataCopy[prop], nodeId, dataToBeAdded);
        if (result) {
          originalDataCopy[prop] = result;
          break;
        }
      }
    }
  }

  return originalDataCopy;
};

export const getNodeId = (customNodeId: string): string => {
  return customNodeId.split("_")[1];
};
