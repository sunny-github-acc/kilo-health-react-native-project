export interface ChatsReducerInterface {
  chat: { [key: string]: {} }[];
  chatsKeys?: { [key: string]: string };
}

export interface SendChatInterface {
  payload: {
    _id: string;
    uidKey: string;
    createdAt: number;
    text: string;
    user: string;
  };
}

export type SendChatPayloadInterface = SendChatInterface['payload'];
