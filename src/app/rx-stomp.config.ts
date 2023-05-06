import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from '../environments/environment'

var url = '';

if (environment.appEnv === 'PROD') {
    url = 'wss://place2lease.hdb.gov.sg/webservice-public/live-bidding';
} else if (environment.appEnv === 'UAT') {
    url = 'wss://place2lease.nicehomes.com.sg/webservice-public/live-bidding';
} else {
    url = 'ws://localhost:9000/webservice-public/live-chat';
}

export const RxStompConfig: InjectableRxStompConfig = {
    // Which server?
    //brokerURL: 'ws://localhost:9090/webservice-public/live-bidding',
    brokerURL: url,

    // Headers
    // Typical keys: login, passcode, host
    connectHeaders: {
        login: 'guest',
        passcode: 'guest',
        Connection: 'Upgrade',
        Upgrade: 'websocket'
    },

    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeatIncoming: 0, // Typical value 0 - disabled
    heartbeatOutgoing: 60000, // Typical value 50000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 500 (500 milli seconds)
    reconnectDelay: 1000,

    // Will log diagnostics on console
    // It can be quite verbose, not recommended in production
    // Skip this key to stop logging to console
}
