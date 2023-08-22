import React, { FC, useEffect, useState } from 'react';
import bronzeMedal from '/ft_transcendence/src/image/bronze_medal.png';
import silverMedal from '/ft_transcendence/src/image/silver_medal.png';
import goldMedal from '/ft_transcendence/src/image/gold_medal.png';
import { useLazyQuery, useQuery } from '@apollo/client';
import { FIND_USER } from '../graphql/Query';

enum Rank {
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
}

const levelRanges = {
  [Rank.Bronze]: { min: 1, max: 9, xpGain: 2 },
  [Rank.Silver]: { min: 10, max: 19, xpGain: 1 },
  [Rank.Gold]: { min: 20, max: 30, xpGain: 0.5 },
};

const getMedalImage = (rank: Rank | null) => {
  switch (rank) {
    case Rank.Bronze:
      return bronzeMedal;
    case Rank.Silver:
      return silverMedal;
    case Rank.Gold:
      return goldMedal;
    default:
      return '';
  }
};

const getNextRank = (rank: Rank | null): Rank | null => {
  if (rank === Rank.Bronze) {
    return Rank.Silver;
  } else if (rank === Rank.Silver) {
    return Rank.Gold;
  } else {
    return null;
  }
};

const getRank = (rank: string): Rank | null => {
  switch (rank) {
    case Rank.Bronze:
      return Rank.Bronze;
    case Rank.Silver:
      return Rank.Silver;
    case Rank.Gold:
      return Rank.Gold;
    default:
      return null;
  }
};

interface XpProps {
  userId: number | undefined;
}

const Xp: FC<XpProps> = ({ userId }) => {

  const [totalXpPercentage, setTotalXpPercentage] = useState(0);
  const [rank, setRank] = useState<Rank | null>(null);
  const [nextRank, setNextRank] = useState<Rank | null>(null);


  
  const { data, refetch } = useQuery(FIND_USER, {
    variables: {
      id: userId,
    },
  });

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  useEffect(() => {
    if (data && data.findUserById) {
      const user = data.findUserById;
      const userRank = getRank(user.rank);

      if (userRank) {
        setRank(userRank);
        const { xpGain, max, min } = levelRanges[userRank];
        const rangeSize = max - min;
        const curXpPercentage = ((user.level - min) / rangeSize) * 100;
        const xpGainPercentage = (xpGain / rangeSize) * 100;
        const totalXp = user.level < 30 ? (curXpPercentage + xpGainPercentage).toFixed(2)
                                        : curXpPercentage.toFixed(2);
        setTotalXpPercentage(parseFloat(totalXp));
        setNextRank(getNextRank(userRank));
      }
    }
  }, [data]);

  return (
    <div className='xp-container'>
      <img className='xp-image xp-image-left' src={getMedalImage(rank)} alt='left-medal' />
      <div className='xp-bar'>
        <div className='xp-bar-segment' style={{ transition: 'width 0.5s ease 0.3s', width: `${totalXpPercentage}%` }} />
        <div className='xp-bar-text'>
          <h1>{totalXpPercentage}%</h1>
        </div>
      </div>
      {nextRank !== null && (
        <img className='xp-image xp-image-right' src={getMedalImage(nextRank)} alt='right-medal' />
      )}
    </div>
  );
};

export default Xp;

