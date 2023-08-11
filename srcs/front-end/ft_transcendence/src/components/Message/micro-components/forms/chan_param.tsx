// import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Banned, channelfocus, User, UserChanels } from "../../../interfaces/interfaces";
import { UPDATE_CHANEL_USER } from "../../graphql/Mutation";
import { DELETE_CHANEL_USER_MUTATION } from "../../graphql/Mutation";
import { CREATE_BANNED_MUTATION } from "../../graphql/Mutation";
import { REMOVE_BANNED_MUTATION } from "../../graphql/Mutation";
import { CHANNEL_MEMBERS_QUERY } from "../../graphql/Query";
import { BANNED_LIST_QUERY } from "../../graphql/Query";

export interface IAddUserInChanProps {
	user: User,
	chanel_focus: channelfocus;
}



export default function Param_Chan({chanel_focus, user} : IAddUserInChanProps) {

	const {data, loading, error, refetch} = useQuery(CHANNEL_MEMBERS_QUERY, { 
		variables: {chan_id: +chanel_focus.id}}
	);

	const { loading: anotherLoading, error: anotherError, data: anotherData } = useQuery(BANNED_LIST_QUERY, {
		variables: { 
			channelId: +chanel_focus.id
		},
	});

	const [ParamChan] = useMutation(UPDATE_CHANEL_USER);
	const [KickOfChan] = useMutation(DELETE_CHANEL_USER_MUTATION);
	const [createBanned] = useMutation(CREATE_BANNED_MUTATION);
	const [UnBanned] = useMutation(REMOVE_BANNED_MUTATION);

	if (error)
		return (<div>An Error as occured</div>);
	
	if (loading || anotherLoading)
		return (
			<div>loading...</div>
		)
	if (data){
		refetch();
		console.log(data);
	}


  const handlemuted = (User_id: number, oldMuted: boolean) => {
	// const currentTimeInMillis = Math.floor(new Date().getTime() / 60000);
	// console.log('oeee >>>>>>>>>> ',currentTimeInMillis);
	ParamChan({
      variables: {
        key: {
          user_id: User_id,
          chanel_id: +chanel_focus.id,
		  pending: false,
          is_muted: oldMuted === true? false : true,
          is_admin: false,
		  mute_start_time: 0,
        },
      },
    }).then((result) => {
		refetch();
		console.log(result.data.updateChanelUser);
    }).catch(() => {
		console.log("action denied ",);
	});
  };

  const handleadmin = (User_id: number) => {
    ParamChan({
      variables: {
        key: {
          user_id: User_id,
          chanel_id: +chanel_focus.id,
		  pending: false,
          is_muted: false,
          is_admin: true,
        },
      },
    }).then((result) => {
		refetch();
		console.log(result.data.updateChanelUser);
    }).catch(() => {
		console.log("action denied ",);
	});
  };


  const handlekick = (ToDel: UserChanels) => {
	KickOfChan({
		variables: {
		  key: {
			user_id: ToDel.user_id,
			chanel_id: +chanel_focus.id,
			pending: false,
			is_admin: ToDel.is_admin,
			is_muted: ToDel.is_muted
		  },
		},
	  }).then((result) => {
		refetch();
		console.log(result.data.updateChanelUser);
	  }).catch(() => {
		console.log("action denied ",);
	});
  }

  const handleban = (ToDel: UserChanels) => {
	handlekick(ToDel);
	createBanned({
        variables: {
          createBannedInput: {
            user_id: ToDel.user_id,
            channel_id: +chanel_focus.id,
          },
        },
      }).then((result) => {
		refetch();
		console.log(result.data.updateChanelUser);
	  }).catch(() => {
		console.log("action denied ",);
	});
  }

  const handleDeleteBanned = (ToDel: Banned) => {
	UnBanned({
		variables: {
			userId: ToDel.user_id,
			channelId: +chanel_focus.id,
		},
	  }).then((result) => {
		refetch();
		console.log(result.data.updateChanelUser);
	  }).catch(() => {
		console.log("action denied ",);
	});

  }



  return (
		<div>
			Member:
			<div>

				{
					data.ChannelMembers.map((member: UserChanels) => {
						const unique_key=`${member.user_id}`
						return (
							<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}> 
								<p>{member.user.nickname}
								<button onClick={() => { handlemuted(member.user_id, member.is_muted) }}>muted</button>
								<button onClick={() => { handleadmin(member.user_id) }}>admin</button>
								<button onClick={() => { handlekick(member) }}>kick</button>
								<button onClick={() => { handleban(member) }}>ban</button>
								</p>
							</ul>
							)
						})
					}
			User Banned:
				{
					anotherData.banned_list.map((banned_list: Banned) => {
						const unique_key=`${banned_list.user_id}`
						return (
							<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}> 
								<p>{banned_list.user_ban.nickname}
								<button onClick={() => { handleDeleteBanned(banned_list) }}>Unbanned</button>
								</p>
							</ul>
						)
					})
				}
			</div>
		</div>
	)
}