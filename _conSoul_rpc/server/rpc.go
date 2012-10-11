package server

import (
	"errors"
	"log"
)

type Args struct {
	P0, P1 int
}

type Quotient struct {
	Quo, Rem int
}

type Arith int

var run chan bool

func (t *Arith) Multiply(args *Args, reply *int) error {
	*reply = args.P0 * args.P1
	log.Println(string(*reply), args.P0, args.P1)
	return nil
}

func (t *Arith) Divide(args *Args, quo *Quotient) error {
	if args.P1 == 0 {
		return errors.New("divide by zero")
	}
	quo.Quo = args.P0 / args.P1
	quo.Rem = args.P0 % args.P1
	return nil
}

func Start(arg bool) chan bool {
	run = make(chan bool, 1)
	run <- arg
	return run
}

func (t *Arith) Stop(arg string, quo *bool) error {
	if arg == "quit" {
		run <- false
		t := true
		quo = &t
	}
	return nil
}
