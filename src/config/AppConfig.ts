import fs from 'fs/promises';
import BacnetReaderConfig from "./BacnetReaderConfig";
import { ReadProperty } from '@willieee802/ts-bacnet/lib/src/types';

/**
 * Configuration definition for the app
 */
type AppConfig = {
    /**
     * Configuration for BacnetReader with connection information
     */
    bacnetReaderConfig: BacnetReaderConfig;

    /**
     * Properties to be read via BacnetReader
     */
    bacnetReaderProperties: Record<string, ReadProperty>;

    /**
     * MQTT broker connection URL
     */
    mqttBrokerUrl: string;

    /**
     * MQTT publish topic prefix
     */
    mqttTopicPrefix: string;
};

/**
 * Load app configuration from given file
 * @param filePath Path of the config file
 * @returns Promise of AppConfig
 */
const loadConfig = async (filePath: string): Promise<AppConfig> => {
    const file = await fs.readFile(filePath, 'utf-8');
    const config = JSON.parse(file);
    return config as AppConfig;
};

export {
    AppConfig,
    loadConfig
};