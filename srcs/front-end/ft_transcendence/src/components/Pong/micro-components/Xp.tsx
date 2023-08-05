import React, { FC,  } from 'react';

import bronzeMedal from '/ft_transcendence/src/image/bronze_medal.png';
import silverMedal from '/ft_transcendence/src/image/silver_medal.png';
import goldMedal from '/ft_transcendence/src/image/gold_medal.png';

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

  interface XpProps {
    level: number;
    victory: boolean | null
  }
  
  export const findRank = (level: number): Rank | null => {
    for (const rankKey in levelRanges) {
      if (levelRanges.hasOwnProperty(rankKey)) {
        const { min, max } = levelRanges[rankKey as unknown as Rank];
        if (level >= min && level <= max) {
          return rankKey as unknown as Rank;
        }
      }
    }
    return null;
  };

  export const getMedalImage = (rank: Rank | null) => {
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

  export const getNextRank = (rank: Rank | null): Rank | null => {
    
    if (rank === Rank.Bronze) {
      return Rank.Silver;
    } else if (rank === Rank.Silver) {
      return Rank.Gold;
    } else {
      return null;
    }
  };

  export const Xp: FC<XpProps> = ({ level, victory }) => {
    const rank = findRank(level);
  
    const { xpGain, max, min } = rank ? levelRanges[rank] : { xpGain: 0, max: 0, min: 0 };
    const rangeSize = max - min;
    const curXpPercentage = ((level - min) / rangeSize) * 100;
    const xpGainPercentage = rank && victory ? (xpGain / rangeSize) * 100 : 0;
    const totalXpPercentage = victory && level < 30 ? curXpPercentage + xpGainPercentage : curXpPercentage;
    const nextRank = getNextRank(rank);

  
    return (
      <div className='xp-container'>
        <img className='xp-image xp-image-left'   src={getMedalImage(rank)}  alt='left-medal' />
        <div className='xp-bar'>
          {victory ? (
            <div className='xp-bar-segment' style={{ transition: 'width 0.5s ease 0.3s', width: `${curXpPercentage + xpGainPercentage}%` }} />
          ) : (
            <div className='xp-bar-segment' style={{ width: `${curXpPercentage}%` }} />
          )}
          <div className='xp-bar-text'>
            <h1>{totalXpPercentage}%</h1>
          </div>
        </div>
          {nextRank !== null && (
          <img className='xp-image xp-image-right' src={getMedalImage(nextRank)} alt='right-medal' /> 
        )}
      </div>
    )
  };
  
  export default Xp;