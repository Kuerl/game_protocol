package com;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import java.net.URISyntaxException;

public class GameSocket {
    static private Socket socket;

    public GameSocket(String socketUrl) {
        try {
            socket = IO.socket(socketUrl);
            socket.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    public Emitter registerEventListener(String event, Emitter.Listener callback) {
        return socket.on(event, callback);
    }

    public Socket getSocket() {
        return socket;
    }

}
