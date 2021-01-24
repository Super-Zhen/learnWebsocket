import {io} from 'socket.io-client'
import server from './linkUrl'
export const socket = io(server.server,{transports: ['websocket']});
// export const manager = new Manager(server.server,{transports: ['websocket']});

