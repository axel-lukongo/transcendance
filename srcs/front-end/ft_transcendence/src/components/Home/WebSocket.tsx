import React from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let wsClient : SubscriptionClient | null = null;

export const initializeWebSocketClient = (token: string) => {
  if (!wsClient) {
    wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {
      reconnect: true,
      connectionParams: {
        headers: token
      }
    });
  }
};

export const getWebSocketClient = () => {
  if (!wsClient) {
    throw new Error('WebSocket client has not been initialized.');
  }
  return wsClient;
};
