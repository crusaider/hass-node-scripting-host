import { HaWebSocket } from 'home-assistant-js-websocket';
import * as WebSocket from 'ws';
import { AccessToken } from '../AccessToken';
// @internal
type MessageType = 'auth_required' | 'auth' | 'auth_ok' | 'auth_invalid';
interface MessageBase {
  readonly type: MessageType;
}

// @internal
type ServerMessage = MessageBase & {
  readonly ha_version: string;
};

// @internal
type AuthMessage = { type: 'auth'; access_token: AccessToken } & MessageBase;

// @internal
export function createSocketFactory(
  url: string,
  token: AccessToken
): () => Promise<HaWebSocket> {
  return async () =>
    new Promise<HaWebSocket>((resolve, reject) => {
      const socket = new WebSocket(url);

      socket.on('message', (raw: string) => {
        const m: ServerMessage = JSON.parse(raw) as ServerMessage;
        switch (m.type) {
          case 'auth_required':
            socket.send(
              JSON.stringify({
                type: 'auth',
                access_token: token
              } as AuthMessage)
            );
            break;
          case 'auth_ok':
            {
              const hSocket = (socket as unknown) as HaWebSocket;
              hSocket.haVersion = m.ha_version;
              socket.removeAllListeners();
              resolve(hSocket);
            }
            break;
          case 'auth_invalid':
            socket.removeAllListeners();
            reject(m);
            break;
        }
      });

      socket.on('error', (e) => reject(e));
    });
}
