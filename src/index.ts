import { AppConfig, loadConfig } from './config/AppConfig';
import BacnetReader from './bacnet/BacnetReader';
import { BACReadMultiple } from '@willieee802/ts-bacnet/lib/src/types';
import { getPublishableResults } from './tools/bacnetTools';
import PublishableResult from './types/PublishableResult';
import logger from './util/logger';
import MqttWriter from './mqtt/MqttWriter';
import Worker from './Worker';

/**
 *
 * @param config
 */
const runProcess = async (config: AppConfig) => {
    const bacnetReader: BacnetReader = new BacnetReader(
        config.bacnetReaderConfig,
    );

    const result: BACReadMultiple = await bacnetReader.read(
        config.bacnetReaderProperties,
    );

    const publishableResults: PublishableResult[] = getPublishableResults(
        result,
        config.bacnetReaderProperties,
    );

    const mqttWriter: MqttWriter = new MqttWriter(
        config.mqttBrokerUrl,
        config.mqttTopicPrefix,
    );

    await mqttWriter.connect();

    await mqttWriter.write(publishableResults);

    await mqttWriter.close();

    bacnetReader.close();
};

/**
 *
 */
const main = async () => {
    try {
        const config: AppConfig = await loadConfig('./config/config.json');

        const worker: Worker = new Worker();

        worker.start(() => runProcess(config), config.workerInterval * 1000);
    } catch (err) {
        logger.error(err);
    }
};

main();
