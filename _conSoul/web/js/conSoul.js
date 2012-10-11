(function() {
  var ascync, connectWs, dAddr, inBoundMsg, stringToBoolean, stringToInt, ws;
  inBoundMsg = void 0;
  stringToBoolean = void 0;
  stringToInt = void 0;
  dAddr = void 0;
  ws = void 0;
  ascync = true;
  dAddr = "localhost:1234";
  stringToBoolean = function(str) {
    switch (str.toLowerCase()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return stringToInt(str);
    }
  };
  stringToInt = function(id) {
    var value;
    value = parseInt(id);
    if (isNaN(value)) {
      return id;
    }
    return value;
  };
  inBoundMsg = function(e) {
    return ui.notify("Message", e).effect("slide", 200);
  };
  return jQuery(document).ready(function($) {
    return jQuery(function($, undefined_) {
      return $("body").terminal((function(command, term) {
        connectWs = function (ss) {

          zz = ss.split(",");
          addr = zz[0];
          as = zz[1];

          if (addr.length === 0) {
            addr = dAddr;
          }
          
          term.echo(addr);
          if (as === "") {
            as = true;
          }
          else {
            as = stringToBoolean(as);
          }
          ascync = as;

          ws = new WebSocket("ws://" + addr + "/ws");
          term.echo(ascync);
          if (ascync === true) {
            ws.onmessage = function(evt) {
              return inBoundMsg(evt.data);
            };
          }
          else
          {
            term.echo("synch");
            ws.onmessage = function(evt) {
              term.resume();
              return term.echo(evt.data);
            };
          }
          ws.onopen = function() {};
          return ws;
        };
        var i, id, jsonRequest, newProp, newValue, nwValue, result, val, x, y, z;
        jsonRequest = void 0;
        newProp = void 0;
        newValue = void 0;
        nwValue = void 0;
        result = void 0;
        y = void 0;
        z = void 0;

        if (command !== "") {
          result = command;
          if (result.substring(0, result.indexOf("(")) === "connect") {
            aa = result.substring(result.indexOf("(") + 1, result.lastIndexOf(")"));

            if (aa === "") {
              aa = ", true";
            }
            term.echo("aa: " + aa);
            ws = connectWs(aa);
            return false;
          }

          if (result !== undefined) {
            term.echo(String(result));

            if (!ws) {
              term.echo("not connected");
              return false;
            }

            if (!String(result)) {
              term.echo("Invalid Request");
              term.echo(result);
              return false;
            }

            y = result.substring(result.indexOf("(") + 1, result.lastIndexOf(")"));
            z = y.split(",");

            jsonRequest = {
              method: result.substring(0, result.indexOf("("))
            };

            jsonRequest.params = [];
            x = {};
            i = 0;

            while (i < z.length) {
              id = "P" + i;
              val = $.trim(z[i]);
              x[id] = stringToBoolean(val);
              i++;
            }

            jsonRequest.params.push(x);

            ws.send(JSON.stringify(jsonRequest));
            if (ascync === false) {
              term.echo("pause");
              // term.pause();
            }
            ws.onclose = function(evt) {
              return terminal.echo("Connection closed.");
            };
            term.resume();
            return false;
          }
        }
      }), {
        greetings: "JSON conSoul",
        name: "RPC conSoul",
        height: 200,
        width: 450,
        prompt: "RPC>"
      });
    });
  });
}).call(this);