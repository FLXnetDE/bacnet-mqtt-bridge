import { BACReadMultiple, BACValue, ReadProperty } from "@willieee802/ts-bacnet/lib/src/types";
import PublishableResult from "../types/PublishableResult";
import { PropertyIdentifier } from "@willieee802/ts-bacnet/lib/src/enum";
import { getNameFromInstance } from "./configTools";

/**
 * 
 * @param result 
 * @param bacnetReaderProperties 
 * @returns 
 */
const getPublishableResults = (result: BACReadMultiple, bacnetReaderProperties: Record<string, ReadProperty>): PublishableResult[] => {
    
    let publishableResults: PublishableResult[] = [];

    for (const valueGroup of result.values) {

        const instance: number = valueGroup.objectId.instance;
        const instanceName: string = getNameFromInstance(instance, bacnetReaderProperties)

        for (const value of valueGroup.values) {

            const propertyIdentifier: string = PropertyIdentifier[value.id];
            
            for (const subValue of value.value) {
                
                const dataValue: string | number = subValue.value;

                publishableResults.push({
                    topic: `${instanceName}/${propertyIdentifier.toString().toLowerCase()}`,
                    value: dataValue
                });

            }

        }

    }

    return publishableResults;
};

export {
    getPublishableResults
};