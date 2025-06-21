import BacnetReader from "./BacnetReader";
import { AppConfig, loadConfig } from "./config/AppConfig";

const main = async () => {

    const config: AppConfig = await loadConfig('config.json');

    const bacnetReader: BacnetReader = new BacnetReader(config.bacnetReaderConfig);

    // console.log(JSON.stringify(config.bacnetReaderProperties));

    bacnetReader.read(config.bacnetReaderProperties)
        .then((value) => console.log(JSON.stringify(value)))
        .catch((err) => console.error(err));

};

main();