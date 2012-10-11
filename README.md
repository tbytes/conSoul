Second attempt at github/sharing

simple RPC server based on tutorials, and a web console.  make simple roc request, both synch and asynch responses supported. either blocks and prints response or responses via notifications.

I have used what I have gained by reading, copying and studying the many great golang projects everybody has shared over the past few years.  Thank you.

SYNCH:
RPC>connect()
aa: , true
localhost:1234
 true
synch
RPC>Arith.Multiply(2,30)
Arith.Multiply(2,30)
RPC>Arith.Multiply(2,30)
Arith.Multiply(2,30)
{"id":null,"result":60,"error":null}

ASYNCH:
RPC>connect(,true)
aa: ,true
localhost:1234
true
RPC>Arith.Multiply(2,30)
Arith.Multiply(2,30)
RPC>Arith.Multiply(2,30)
Arith.Multiply(2,30)



…PS for some reason the first request never receives a response, probably has do do with opening the web socket connection but have not spent the five minutes to figure it out.

PPS right now it does a quick check to try to convert the string input to boolean, int or leaves as string.



 