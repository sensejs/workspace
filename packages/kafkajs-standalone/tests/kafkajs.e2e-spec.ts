import {MessageConsumer, MessageProducer} from '../src';
import {Subject} from 'rxjs';

const TOPIC = 'e2e-topic-' + Date.now();
const TX_TOPIC = 'e2e-tx-topic-' + Date.now();

test('KafkaJS', async () => {

  const producerA = new MessageProducer({
    connectOption: {brokers: ['kafka-1:9092'], clientId: 'kafkajs-1'},
    producerOption: {
      transactionalId: 'txid' + Date.now(),
    },
  });

  const firstMessage = new Date().toString();
  let stopped = false;
  await producerA.connect();
  await producerA.send(TOPIC, {key: new Date().toString(), value: firstMessage});

  async function sendBatch() {
    while (!stopped) {
      await new Promise((done) => setTimeout(done, 1000));
      await producerA.sendBatch([
        {
          topic: TOPIC,
          messages: [{key: new Date().toString(), value: new Date().toString()}],
        },
      ]);
    }
    await producerA.disconnect();
  }

  const producingPromise = sendBatch();
  const observableA = new Subject(), observableB = new Subject();

  const consumerStubA = jest.fn().mockImplementationOnce(() => observableA.complete());
  const consumerStubB = jest.fn().mockImplementationOnce(() => observableB.complete());
  const messageConsumerA = new MessageConsumer({
    connectOption: {brokers: ['kafka-1:9092'], clientId: 'kafkajs-2'},
    fetchOption: {
      groupId: 'e2etest-latest',
    },
  });

  messageConsumerA.subscribe(TOPIC, async (message) => {
    consumerStubA(message.toString());
  });

  const messageConsumerB = new MessageConsumer({
    connectOption: {brokers: ['kafka-1:9092'], clientId: 'kafkajs-3'},
    fetchOption: {
      groupId: 'e2etest-earliest',
    },
  });

  messageConsumerB.subscribe(TOPIC, async (message, metadata) => {
    consumerStubB(message.toString());
    const {consumerGroupId, topic, partition, offset} = metadata;
    await producerA.sendBatch([
      {
        topic: TOPIC,
        messages: [{key: new Date().toString(), value: new Date().toString()}],
      },
    ],
      {
        transactional: true,
        transactionalCommit: {consumerGroupId, offsets: {topics: [{topic, partitions: [{partition, offset}]}]}},
      },
    );
  }, true);

  const p = Promise.all([
    observableA.toPromise(),
    observableB.toPromise(),
  ]);
  await messageConsumerA.start();
  await messageConsumerA.start(); // safe to call start multiple times
  await messageConsumerB.start();
  await p;
  stopped = true;
  await producingPromise;
  await messageConsumerA.stop();
  await messageConsumerA.stop(); // safe to call stop multiple times
  await messageConsumerB.stop();
  expect(consumerStubA).toHaveBeenCalledWith(expect.not.stringMatching(firstMessage));
  expect(consumerStubB).toHaveBeenCalledWith(firstMessage);
}, 30000);