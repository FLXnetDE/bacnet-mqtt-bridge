import Client from '@willieee802/ts-bacnet';
import { BacnetError } from '@willieee802/ts-bacnet/lib/src/client';
import {
    BACReadMultiple,
    ReadProperty,
} from '@willieee802/ts-bacnet/lib/src/types';
import BacnetReaderConfig from '../types/BacnetReaderConfig';

/**
 * Reader for retrieving values from BACnet device
 */
class BacnetReader {
    /**
     * Local member instance for used BacnetReaderConfig
     */
    private bacnetReaderConfig: BacnetReaderConfig;
    /**
     * Local member instance of BACnet client
     */
    private bacnetClient: Client;
    /**
     * Creator for BacnetReader object
     * @param bacnetReaderConfig Instance of configuration for BacnetReader
     */
    constructor(bacnetReaderConfig: BacnetReaderConfig) {
        this.bacnetReaderConfig = bacnetReaderConfig;
        this.bacnetClient = new Client({
            port: 47808,
            apduTimeout: 10000,
        });
    }

    /**
     * Reads named properties from the BACnet device
     * @param bacnetReaderProperties Record of named ReadProperty
     * @returns Promise of BACReadMultiple
     */
    public read(
        bacnetReaderProperties: Record<string, ReadProperty>,
    ): Promise<BACReadMultiple> {
        return new Promise((resolve, reject) => {
            const propertiesArray: ReadProperty[] = Object.entries(
                bacnetReaderProperties,
            ).map(([, value]) => value);

            this.bacnetClient.readPropertyMultiple(
                this.bacnetReaderConfig.address,
                propertiesArray,
                {},
                (error: BacnetError | Error, res?: BACReadMultiple) => {
                    if (error) reject(error);
                    if (!res) reject(`Empty result`);
                    if (res) resolve(res);
                },
            );
        });
    }

    /**
     * Unloads the current bacnet instance and closes the underlying UDP socket.
     */
    public close() {
        this.bacnetClient.close();
    }
}

export default BacnetReader;
