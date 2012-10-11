
# $('body').terminal.append('<div style="width: 100%; ">ws&gt;assshit</div>');
#this creates a new element into the object
#adds the element x to array
# alert(JSON.stringify(jsonRequest))
(->
  inBoundMsg = undefined
  stringToBoolean = undefined
  stringToInt = undefined
  dAddr = undefined
  ws = undefined
  ascync = true
  dAddr = "localhost:1234"
  connectWs = (addr, as) ->
    addr = dAddr  if addr is ""
    as = true  if as is ""
    ascync = as
    ws1 = new WebSocket("ws://" + addr + "/ws")
    if ascync is true
      ws1.onmessage = (evt) ->
        inBoundMsg evt.data
    else
      ws1.onmessage = (evt) ->
        term.echo evt.data
        term.resume()
    ws1.onopen = ->
    ws1

  stringToBoolean = (str) ->
    switch str.toLowerCase()
      when "true", "yes"
    , "1"
        true
      when "false", "no"
    , "0"
    , null
        false
      else
        stringToInt str

  stringToInt = (id) ->
    value = undefined
    value = parseInt(id)
    return id  if isNaN(value)
    value

  inBoundMsg = (e) ->
    ui.notify("Message", e).effect "slide", 200

  jQuery(document).ready ($) ->
    jQuery ($, undefined_) ->
      $("body").terminal ((command, term) ->
        jsonRequest = undefined
        newProp = undefined
        newValue = undefined
        nwValue = undefined
        result = undefined
        y = undefined
        z = undefined
        if command isnt ""
          result = command
          if result.substring(0, result.indexOf("(")) is "connect"
            ws = connectWs(result.substring(result.indexOf("(") + 1, result.lastIndexOf(")")))
            return false
          if result isnt `undefined`
            term.echo String(result)
            term.echo "Sending RPC request"
            unless ws
              term.echo "not connected"
              return false
            unless String(result)
              term.echo "Invalid Request"
              term.echo result
              return false
            y = result.substring(result.indexOf("(") + 1, result.lastIndexOf(")"))
            z = y.split(",")
            jsonRequest = method: result.substring(0, result.indexOf("("))
            jsonRequest.params = []
            x = {}
            i = 0
            while i < z.length
              id = "P" + i
              val = $.trim(z[i])
              x[id] = stringToBoolean(val)
              i++
            jsonRequest.params.push x
            ws.send JSON.stringify(jsonRequest)
            term.pause()  if ascync is false
            ws.onclose = (evt) ->
              terminal.echo "Connection closed."

            term.resume()
            false
      ),
        greetings: "JSON conSoul"
        name: "RPC conSoul"
        height: 200
        width: 450
        prompt: "RPC>"



).call this