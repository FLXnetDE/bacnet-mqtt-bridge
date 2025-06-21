import fs from 'fs/promises';
import BacnetReaderConfig from "../BacnetReaderConfig";
import { ReadProperty } from '@willieee802/ts-bacnet/lib/src/types';

type AppConfig = {

    bacnetReaderConfig: BacnetReaderConfig;

    bacnetReaderProperties: Record<string, ReadProperty>;

};

const loadConfig = async (filePath: string): Promise<AppConfig> => {
    const file = await fs.readFile(filePath, 'utf-8');
    const config = JSON.parse(file);
    return config as AppConfig;
};

export {
    AppConfig,
    loadConfig
};