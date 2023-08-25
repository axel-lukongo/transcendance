import React from 'react';
import '../../css/profil.css'
import { useState } from 'react';
import { User } from '../../../interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { MY_MATCH_HISTORY } from '../../../Home/graphl/Query';
import { PongI } from '../../../interfaces/interfaces';
import { IContact } from '../../../interfaces/interfaces';
interface IshowProfil{
	handleShowProfil: (userIndex: number, show:boolean) => void;
	user: User | IContact;
}

const Profil_page: React.FC<IshowProfil> = ({ handleShowProfil, user }) => {

	const [avatar, setAvatar] = useState(user.avatar);
	console.log(' ========>>>>>>>  ', user);
	const { data, loading, error, refetch } = useQuery(MY_MATCH_HISTORY, {
		variables: {
			userId: user.id
		},
	});

	if(loading)
	{
		return (
			<div>loading...</div>
		)
	}

	if (data && data.myMatchHistory) {
		const historyMatches: PongI[] = data.myMatchHistory;
	}	

	return (
        <div className="profil-modal">
            <div className="modal-content">
                <button className="close-btn" onClick={() => handleShowProfil(user.id, false)}> X </button>

				<div className='Container_one'>
					<div className='avatar_prfl'> 
						<img className='avatar-img-prfl' src={avatar} alt="Avatar of user" />
					</div>
					<div className='sub-Container_one'>
						<div className='nickname-box'> {user.nickname}</div>
						<div className='mail-box'> {user.email}</div>
					</div>
				</div>


				<hr className="horizontal-line" />

				<div className='boxes-container'>
					<div className='rankes-box' style={{ textAlign: 'center' }} > RANK
						<div className='Ranks'  >
							{user.rank}
						</div>
					</div>
					<div className='xp-box' style={{ textAlign: 'center' }}> level
						<div>
							{user.level}
						</div>
					 </div>
				</div>
				<div className='resumer' style={{ textAlign: 'center' }}> Resumer </div>

				<hr className="horizontal-line" />


				<div className='container-scroll'> 
					<div className="container-tree" style={{ textAlign: 'center' }}>
						{ data?.myMatchHistory.map((match: PongI, index: number) => {
							const isUser1 = match.user1?.nickname === user.nickname;
							const myScore = isUser1 ? match.scoreUser1 : match.scoreUser2;
						const opponentScore = isUser1 ? match.scoreUser2 : match.scoreUser1;
						const opponentNickname = isUser1 ? match.user2?.nickname : match.user1?.nickname;
						const isWinner = match.winnerId === user.id;
						
						return (
							<div className="profil-match-history" key={index}>
								{user.nickname} {myScore}-{opponentScore} {opponentNickname} : {isWinner ? "🏆" : "😓"}
							</div>
						);
					})}
					</div>
				</div>

            </div>
        </div>
    );
};

export default Profil_page;
