export interface IMessageInCluster {
  timestamp: string;
  content: string;
}

export interface IMessageCluster {
  author_id: string;
  author_name: string;
  messages: IMessageCluster[];
}

export interface IMessageDay {
  day: Date;
  clusters: IMessageCluster[];
}
