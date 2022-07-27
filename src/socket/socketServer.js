import io from "socket.io-client";

export class SocketModule {
    //constructor do que vai ter na minha classe.
    constructor(uri) {
        this.listeners = new Map(); //tentar entender melhor
        this.io = io(uri);
        this.registerDefaultListeners();
    }
    static connect() {
        if (SocketModule.instance)
            return SocketModule.instance;
        console.log('entrô');
        SocketModule.instance = new SocketModule("ws://localhost:3001");
        return SocketModule.instance;
    }
    registerDefaultListeners() {
        console.log(this.io);
        // this.io.on("connected", () => {
        //   console.log("hehehee pivete");
        // });
    }
    registerListener(namespace, event, cb) {
        if (this.listeners.has(`${namespace}/${event}`))
            return;
        this.io.on(event, cb);
        this.listeners.set(`${namespace}/${event}`, cb);
    }
    removeListener(namespace, event) {
        if (!this.listeners.has(`${namespace}/${event}`))
            return;
        this.io.removeListener(event);
        this.listeners.delete(`${namespace}/${event}`);
    }
}
