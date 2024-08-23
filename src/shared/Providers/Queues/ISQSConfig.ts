export interface ISQSServiceMessageBody {
  [key: string]: any;
}

export interface ISQSService {
  ReceiveMessages(queueUrl: string): Promise<ISQSServiceMessageBody[]>;
}
