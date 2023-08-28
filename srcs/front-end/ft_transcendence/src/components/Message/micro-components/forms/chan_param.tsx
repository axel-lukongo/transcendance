// import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Banned, channelfocus, User, UserChanels } from "../../../interfaces/interfaces";
import { UPDATE_CHANEL_ADMIN, UPDATE_CHANEL_USER } from "../../graphql/Mutation";
import { DELETE_CHANEL_USER_MUTATION } from "../../graphql/Mutation";
import { CREATE_BANNED_MUTATION } from "../../graphql/Mutation";
import { REMOVE_BANNED_MUTATION } from "../../graphql/Mutation";
import { CHANNEL_MEMBERS_QUERY } from "../../graphql/Query";
import { BANNED_LIST_QUERY } from "../../graphql/Query";
import { channel } from "diagnostics_channel";

export interface IAddUserInChanProps {
	user: User,
	chanel_focus: channelfocus;
}



export default function Param_Chan({chanel_focus, user} : IAddUserInChanProps) {

	const {data, loading, error, refetch} = useQuery(CHANNEL_MEMBERS_QUERY, { 
		variables: {chan_id: +chanel_focus.id}}
	);

	const { loading: anotherLoading, error: anotherError, data: anotherData, refetch: anotherreftch } = useQuery(BANNED_LIST_QUERY, {
		variables: { 
			channelId: +chanel_focus.id
		},
	});

	const [ParamChan] = useMutation(UPDATE_CHANEL_USER);
	const [AdminParamChan] = useMutation(UPDATE_CHANEL_ADMIN);
	const [KickOfChan] = useMutation(DELETE_CHANEL_USER_MUTATION);
	const [createBanned] = useMutation(CREATE_BANNED_MUTATION);
	const [UnBanned] = useMutation(REMOVE_BANNED_MUTATION);

	// UPDATE_CHANEL_ADMIN
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

	anotherreftch();

  const handlemuted = (User_id: number, oldMuted: boolean) => {
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

  const handleadmin = (User_id: number, oldAdmin: boolean) => {
    AdminParamChan({
      variables: {
        key: {
          user_id: User_id,
          chanel_id: +chanel_focus.id,
		  pending: false,
          is_muted: false,
          is_admin: oldAdmin === true? false : true,
		  mute_start_time: 0,
        },
      },
    }).then((result) => {
		refetch();
		console.log(result.data.updateChanelUser);
    }).catch((error) => {
		console.log("action denied ===>>>", error);
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
			is_muted: ToDel.is_muted,
			mute_start_time: 0,
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
			// mute_start_time: 0,
		},
        },
      }).then((result) => {
		refetch();
		anotherreftch();
		console.log(result.data.updateChanelUser);
	  }).catch(() => {
		console.log("action denied ",);
	});
  }

  const handleDeleteBanned = (ToDel: Banned) => {
	// anotherreftch();
	UnBanned({
		variables: {
			userId: ToDel.user_id,
			channelId: +chanel_focus.id,
		},
	  }).then((result) => {
		// refetch();
		// anotherreftch();
		console.log(result.data.updateChanelUser);
	  }).catch(() => {
		console.log("action denied ",);
	});
	// anotherreftch();
  }



  return (
	<div className="param-box">
	  Member:
	  <div className="param-box">
		{data.ChannelMembers.map((member: UserChanels) => {
		  const unique_key = `${member.user_id}`;
  
		  return (
			member.user_id === user.id ? null : (
			  <ul className="chan_param" key={unique_key}>
				<p className="button_low">{member.user.nickname}
				  {+chanel_focus.owner_id === member.user_id ? null : (
					<>
					  {member.is_muted === true ? (
						<button className="unmute_btn" onClick={() => { handlemuted(member.user_id, member.is_muted) }}></button>
					  ) : (
						<button className="mute_btn" onClick={() => { handlemuted(member.user_id, member.is_muted) }}></button>
					  )}
					  <button className="admin_btn" onClick={() => handleadmin(member.user_id, member.is_admin)}></button>
					  <button className="kick_btn" onClick={() => handlekick(member)}></button>
					  <button className="banned_btn" onClick={() => handleban(member)}></button>
					</>
				  )}
				</p>
			  </ul>
			)
		  );
		})}
		User Banned:
		{anotherData.banned_list.map((banned_list: Banned) => {
		  const unique_key = `${banned_list.user_id}`;
		  return (
			<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}>
			  <p>
				{banned_list.user_ban.nickname}
				<button onClick={() => { handleDeleteBanned(banned_list) }}>Unbanned</button>
			  </p>
			</ul>
		  );
		})}
	  </div>
	</div>
  );
	}  