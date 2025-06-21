import Client from "@willieee802/ts-bacnet";
import { BacnetError } from "@willieee802/ts-bacnet/lib/src/client";
import { BACReadMultiple, ReadProperty } from "@willieee802/ts-bacnet/lib/src/types";
import BacnetReaderConfig from "./BacnetReaderConfig";

class BacnetReader {

    private bacnetReaderConfig: BacnetReaderConfig;

    private bacnetClient: Client;

    constructor(bacnetReaderConfig: BacnetReaderConfig) {
        this.bacnetReaderConfig = bacnetReaderConfig;
        this.bacnetClient = new Client({
            port: 47808,
            apduTimeout: 10000
        });
    }

    read(bacnetReaderProperties: Record<string, ReadProperty>): Promise<BACReadMultiple> {
        return new Promise((resolve, reject) => {

            const propertiesArray: ReadProperty[] = Object.entries(bacnetReaderProperties).map(([, value]) => value);

            this.bacnetClient.readPropertyMultiple(this.bacnetReaderConfig.address, propertiesArray, {}, (error: BacnetError | Error, res?: BACReadMultiple) => {
                if (error) reject(error);
                if (!res) reject(`Empty result`);
                if (res) resolve(res);
            });

        });
    }

};

export default BacnetReader;