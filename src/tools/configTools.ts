import { ReadProperty } from "@willieee802/ts-bacnet/lib/src/types";

const getNameFromInstance = (instance: number, bacnetReaderProperties: Record<string, ReadProperty>): string => {
    const filteredValues: string[] = Object.entries(bacnetReaderProperties)
        .filter(([_, value]) => value.objectId.instance === instance)
        .map(([key]) => key);
    if (filteredValues.length > 1) throw new Error(`Multiple configurations found for instance ${instance}`);
    return filteredValues[0];
};

export {
    getNameFromInstance
};