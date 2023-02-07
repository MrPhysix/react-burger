import { Middleware } from 'redux';
import {
  wsOrdersActions,
} from '../reducers/wsOrders';

type TWsActions = typeof wsOrdersActions;

const socketMiddleware = (wsActions: TWsActions) : Middleware => (store: any) => {
  let socket: WebSocket | null = null;

  return (next: any) => (action: any) => {
    const { dispatch } = store;
    const { type, payload } = action;

    const {
      wsStart, wsOpen, wsClose,
      wsMessage, wsSend, wsError,
    } = wsActions;

    if (type === wsStart.type) {
      socket = new WebSocket(payload);
    }

    if (socket) {
      socket.onopen = () => {
        console.log('wsConnected');
        dispatch(wsOpen());
      };

      socket.onmessage = (event: any) => {
        const { data } = event;
        dispatch(wsMessage(JSON.parse(data)));
      };

      socket.onerror = () => {
        dispatch(wsError());
      };

      socket.onclose = () => {
        dispatch(wsClose());
      };

      if (type === wsSend.type) {
        console.log('wsSent');
        socket.send(JSON.stringify(payload));
      }

      if (type === wsClose.type && socket.readyState === 1) {
        console.log('wsClosed');
        socket.close();
      }
    }

    next(action);
  };
};

export default socketMiddleware;
