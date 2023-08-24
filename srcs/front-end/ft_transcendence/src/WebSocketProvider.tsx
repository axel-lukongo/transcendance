import React, { createContext, useContext, useEffect, useState } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { User } from './components/interfaces/interfaces';

interface WebSocketContextType {
	wsClient: SubscriptionClient | null;
	updateUser: (user: User | null) => void;
	user: User | null;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({children}: {children: React.ReactNode}) {
	
	const [wsClient, setWsClient] = useState<SubscriptionClient | null>(null);
	const [pendingUser, setPendingUser] = useState<User | null>(null);
	
	useEffect(() => {
		if (pendingUser != null && !wsClient) {
			const client = new SubscriptionClient('ws://localhost:4000/graphql', {
				reconnect: true,
				connectionParams: {
					headers: pendingUser.token
				}
			});
			setWsClient(client);
		}
	}, [pendingUser]);
	
	const updateUser = (user: User | null) => {
		setPendingUser(user);
	}

	const contextValue: WebSocketContextType = {
		wsClient,
		updateUser,
		user: pendingUser,
	}


	return (
		<WebSocketContext.Provider value={contextValue}>
			{children}
		</ WebSocketContext.Provider>
	);
}
