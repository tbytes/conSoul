package main

import (
	"code.google.com/p/go.net/websocket"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
	// "strings"
	"log"
	. "server"
)

func main() {
	rpc.Register(new(Arith))
	http.Handle("/ws", websocket.Handler(serve))
	http.ListenAndServe("localhost:1234", nil)
}

func serve(ws *websocket.Conn) {
	var message string
	websocket.Message.Receive(ws, &message)
	log.Println(message)
	jsonrpc.ServeConn(ws)
}
