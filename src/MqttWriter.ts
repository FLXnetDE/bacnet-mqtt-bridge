import mqtt from "mqtt/*";

class MqttWriter {

    private mqttBrokerUrl: string;

    private mqttTopicPrefix: string;

    private client: mqtt.MqttClient;

    constructor(mqttBrokerUrl: string, mqttTopicPrefix: string) {
        this.mqttBrokerUrl = mqttBrokerUrl;
        this.mqttTopicPrefix = mqttTopicPrefix
        
        this.client = mqtt.connect(mqttBrokerUrl);
    }

}

export default MqttWriter;