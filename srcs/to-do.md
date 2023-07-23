# TO DO

## CHANEL

### ROUTES

- new (create a new chanel)
- add (add someone to chanel)
- list (list all chanels)


- create player 
  -> add player in wainting list
- create a subscription for the update of Wainting room 
  -> if the result of wainting room update has 2 players
    -> try to create a pong instance with my info and the other players
        -> if the pong instance is created , 
            -> delete name in wainting list 
            -> update succed state to pass to the rest
        -> if the request fail
            -> make a query to check if my info are registrer
                -> if the query successed , update succed state to pass to the rest
