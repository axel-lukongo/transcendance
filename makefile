# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: idouidi <idouidi@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/05/05 20:16:48 by idouidi           #+#    #+#              #
#    Updated: 2023/05/16 14:47:40 by idouidi          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: up

up:
		# systemctl restart docker
		docker compose -f docker-compose.yml build #--no-cache
		docker compose -f docker-compose.yml up --force-recreate #-d --force-recreate

down:
		docker compose -f docker-compose.yml down 

ps:		
		docker compose -f docker-compose.yml ps -a
		docker ps -a

clean:	down
		docker system prune
		docker volume rm srcs_db srcs_website

		rm -rf ${HOME}/data/db
		mkdir -p ${HOME}/data/db

re : 	clean up

nest_app: docker exec -it nest_app bash

db: docker exec -it db bash


.PHONY: start stop re ps clean nest_app db