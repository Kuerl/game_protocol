package com;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import java.net.URISyntaxException;
import java.util.Scanner;

public class Client {

    public static void main(String[] args) {
        final GameSocket gameSocket = new GameSocket("http://localhost:3000");
        gameSocket.registerEventListener(Socket.EVENT_CONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                gameSocket.getSocket().emit("send-string", "I am the GAME");
                System.out.println("Connected to server!");
            }
        });
        gameSocket.registerEventListener("string-sv-to-client", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                String strFromServer = args[0].toString();
                System.out.println("Receive from server: " + strFromServer);
            }
        });
        gameSocket.registerEventListener("rNum-sv-to-client", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                String strFromServer = args[0].toString();
                System.out.println("rNum-sv-to-client: " + strFromServer);
            }
        });
        gameSocket.registerEventListener("action-sv-to-client", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                String strFromServer = args[0].toString();
                System.out.println("action-sv-to-client: " + strFromServer);
            }
        });
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.print("Enter string: ");
            String inputStr = sc.nextLine();
            gameSocket.getSocket().emit("send-string", inputStr);
        }
    }
}
