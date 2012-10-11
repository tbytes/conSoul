stringToBoolean = (string) ->
  switch string.toLowerCase()
    when "true", "yes"
  , "1"
      true
    when "false", "no"
  , "0"
  , null
      false
    else
      stringToInt(string)

stringToInt = (id) ->
  value = parseInt(id)
  if isNaN(value)
    return id

