import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import PublishableResult from './types/PublishableResult';
import logger from './util/logger';

class MqttWriter {

    private mqttBrokerUrl: string;

    private mqttTopicPrefix: string;

    private options?: IClientOptions;

    private client!: MqttClient;

    constructor(mqttBrokerUrl: string, mqttTopicPrefix: string, options?: IClientOptions) {
        this.mqttBrokerUrl = mqttBrokerUrl;
        this.mqttTopicPrefix = mqttTopicPrefix
        this.options = options;
    }

    /**
     * 
     * @returns 
     */
    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client = mqtt.connect(this.mqttBrokerUrl, this.options);

            this.client.once('connect', () => {
                logger.info(`MQTT client connected @ ${this.mqttBrokerUrl}`);
                resolve();
            });

            this.client.once('error', (err) => {
                logger.error(`MQTT client error: ${err}`);
                reject(err);
            });
        });
    }

    /**
     * 
     * @param publishableResults 
     * @returns 
     */
    public write(publishableResults: PublishableResult[]): Promise<void[]> {
        return Promise.all(publishableResults.map(this.mapPublishableResults, this));
    }

    /**
     * 
     * @param value 
     * @param index 
     * @param array 
     * @returns 
     */
    private mapPublishableResults(value: PublishableResult, index: number, array: PublishableResult[]): Promise<void> {
        return this.publish(`${this.mqttTopicPrefix}/${value.topic}`, value.value.toString());
    }

    /**
     * 
     * @param topic 
     * @param payload 
     * @param retain 
     * @returns 
     */
    public publish(topic: string, payload: string | Buffer, retain = false): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.client.connected) return reject(new Error('MQTT client not connected'));

            this.client.publish(topic, payload, { retain }, (err) => {
                if (err) {
                    return reject(err);
                }
                logger.info(`Published ${payload} to ${topic}`);
                resolve();
            });
        });
    }

    /**
     * 
     * @returns 
     */
    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.end(false, {}, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

}

export default MqttWriter;