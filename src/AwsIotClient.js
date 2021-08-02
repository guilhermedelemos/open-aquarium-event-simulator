const awsIot = require('aws-iot-device-sdk');
const { logger } = require('../src/logger');

class AwsIotClient {

  constructor(privateCertificate, deviceCertificate, rootCA, deviceDataEndpoint, deviceName, region, discoveryTopic, periodicTopic) {
    this.discoveryTopic = discoveryTopic;
    this.periodicTopic = periodicTopic;
    this.device = awsIot.device({
      keyPath: privateCertificate,
      certPath: deviceCertificate,
      caPath: rootCA,
      host: deviceDataEndpoint,
      clientId: deviceName,
      region: region
    });
    this.device.on('connect', function() {
      logger.info('AWS IoT connected.');
      // device.subscribe('topic');
    });
    this.device.on('close', function() {
      logger.info('AWS IoT closed.');
    });
    this.device.on('reconnect', function() {
      logger.info('AWS IoT reconnected.');
    });
    this.device.on('offline', function() {
      logger.info('AWS IoT offline.');
    });
    this.device.on('error', function(error) {
      logger.error(JSON.stringify(error));
    });
    this.device.on('message', function(topic, payload) {
      logger.info(`AWS IoT message (${topic}, ${payload}).`);
    });
  }

  publishDiscovery(discoveryEvent) {
    logger.info(JSON.stringify(discoveryEvent));
    this.publish(this.discoveryTopic, discoveryEvent);
  }

  publishPeriodic(periodicEvent) {
    logger.info(JSON.stringify(periodicEvent));
    this.publish(this.periodicTopic, periodicEvent);
  }

  publish(topic, event) {
    this.device.publish(topic, JSON.stringify(event));
  }

  end() {
    this.device.end();
  }

}

module.exports = { AwsIotClient };
