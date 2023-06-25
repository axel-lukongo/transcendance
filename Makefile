# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: asimon <asimon@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/05/05 20:16:48 by idouidi           #+#    #+#              #
#    Updated: 2023/06/16 18:08:04 by asimon           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: up

up:
	docker compose up --build --force-recreate #-d

down:
	docker compose down

ps:		
	docker compose ps -a
	docker ps -a

clean:	down
	docker system prune
	docker volume prune


re : 	clean up

db: 
	docker exec -it db bash

back-end: 
	docker exec -it back-end bash

front-end: 
	docker exec -it front-end bash

.PHONY: up down re ps clean front-end back-end db