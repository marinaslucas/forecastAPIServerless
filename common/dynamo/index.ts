import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import {
  BatchGetCommand,
  BatchGetCommandInput,
  BatchGetCommandOutput,
  BatchWriteCommand,
  BatchWriteCommandInput,
  BatchWriteCommandOutput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput
} from '@aws-sdk/lib-dynamodb';

export type PutResponse = PutCommandOutput;
export type GetResponse = GetCommandOutput;
export type QueryResponse = QueryCommandOutput;
export type ScanResponse = ScanCommandOutput;
export type PutManyOutput = PromiseSettledResult<BatchWriteCommandOutput>[];

export const client = (configuration: DynamoDBClientConfig): DynamoDBDocumentClient => {
  return DynamoDBDocumentClient.from(new DynamoDBClient(configuration), {
    marshallOptions: { convertEmptyValues: true, removeUndefinedValues: true }
  });
};

export const get = (client: DynamoDBDocumentClient, input: GetCommandInput): Promise<GetResponse> => {
  return client.send<GetCommandInput, GetCommandOutput>(new GetCommand(input));
};
export const getBatch = (client: DynamoDBDocumentClient, input: BatchGetCommandInput) => {
  return client.send<BatchGetCommandInput, BatchGetCommandOutput>(new BatchGetCommand(input));
};

export const query = (client: DynamoDBDocumentClient, input: QueryCommandInput): Promise<QueryResponse> => {
  return client.send<QueryCommandInput, QueryCommandOutput>(new QueryCommand(input));
};

export const put = (client: DynamoDBDocumentClient, input: PutCommandInput): Promise<PutResponse> => {
  return client.send<PutCommandInput, PutCommandOutput>(new PutCommand(input));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putMany = <T extends Record<string, any>>(
  client: DynamoDBDocumentClient,
  { TableName, Items }: { TableName: string; Items: T[] }
): Promise<PutManyOutput> => {
  const MAX_BULK_ITEMS = 25;
  let tries = 0;
  const response = [];
  let itemsCut = Items.slice(MAX_BULK_ITEMS * tries, MAX_BULK_ITEMS * (tries + 1));
  while (itemsCut.length > 0) {
    const writeCommand = {
      RequestItems: {
        [TableName]: itemsCut.map((item) => ({
          PutRequest: { Item: item }
        }))
      }
    };
    response.push(client.send<BatchWriteCommandInput, BatchWriteCommandOutput>(new BatchWriteCommand(writeCommand)));
    tries++;
    itemsCut = Items.slice(MAX_BULK_ITEMS * tries, MAX_BULK_ITEMS * (tries + 1));
  }
  return Promise.allSettled<BatchWriteCommandOutput>(response);
};

export const scan = (client: DynamoDBDocumentClient, params?: ScanCommandInput): Promise<ScanCommandOutput> => {
  return client.send<ScanCommandInput, ScanCommandOutput>(new ScanCommand(params));
};

export default { client, put, get, query, putMany, scan, getBatch };
