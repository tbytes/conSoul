package main

import (
	//	"arangoDb"
	"flag"
	//	"fmt"
	// "github.com/garyburd/go-websocket/websocket"
	"log"
	"net/http"
	"text/template"
)

var addr = flag.String("addr", ":8180", "http service address")
var homeTempl = template.Must(template.ParseFiles("../web/conSoul.html"))

func serveHome(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "Not found", 404)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method nod allowed", 405)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	homeTempl.Execute(w, r.Host)
}

func main() {
	/*	
		d := arangoDb.DB()
		fmt.Println(d)
		d.Default()
		fmt.Println(d)
		d.NewCollection("{ \"name\" : \"UnitTestsCollectionBasics\" }")
		fmt.Println(d)
	*/
	flag.Parse()
	http.Handle("/js/", http.StripPrefix("/js", http.FileServer(http.Dir("../web/js"))))
	http.Handle("/css/", http.StripPrefix("/css", http.FileServer(http.Dir("../web/css"))))
	http.HandleFunc("/", serveHome)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}

}
