import { AppConfig, loadConfig } from "./config/AppConfig";
import BacnetReader from "./BacnetReader";
import { BACReadMultiple } from "@willieee802/ts-bacnet/lib/src/types";

const main = async () => {

    const config: AppConfig = await loadConfig('config.json');

    const bacnetReader: BacnetReader = new BacnetReader(config.bacnetReaderConfig);

    try {
        const result: BACReadMultiple = await bacnetReader.read(config.bacnetReaderProperties);
        console.log(JSON.stringify(result));
    } catch (err) {
        console.error(err);
    }

    bacnetReader.close();

};

main();