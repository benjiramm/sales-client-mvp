export interface IStoreMessage {
  author_id: string;
  author_name: string;
  timestamp: string;
  content: string;
  _id: string;
}

export interface IStoreSocketClient {
  id: string | null;
  loadedInitialMessages: boolean;
  messages: Array<IStoreMessage>;
}

export interface ISocketPayload {
  clientName: string;
  id: string | null;
}

export interface ISocketGetAllPayload {
  clientName: string;
  messages: Array<IStoreMessage>;
}

export interface ISocketGetMessagePayload {
  clientName: string;
  message: IStoreMessage;
}

export interface ISocketState {
  [key: string]: IStoreSocketClient;
}

export enum ESocketClients {
  MAIN = "MAIN",
}
