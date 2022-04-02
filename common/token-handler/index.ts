import DB from '../dynamo';
import { TokenFormat } from './types';

const client = DB.client({ region: process.env.AWS_REGION || 'us-east-1' });

export class TokenHandler {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  async getToken(key: string): Promise<TokenFormat> {
    const result = await DB.query(client, {
      TableName: this.table,
      ExpressionAttributeValues: { ':v1': key },
      ExpressionAttributeNames: {
        "#k": "key"
      },
      ScanIndexForward: false,
      Limit: 1,
      KeyConditionExpression: '#k = :v1'
    });
    const token = result.Items[0];
    return token as TokenFormat;
  }

  async setToken(key: string, token: string, expiresAt: number): Promise<void> {
    await DB.put(client, { TableName: this.table, Item: { key, token, expiresAt } })
  }
}