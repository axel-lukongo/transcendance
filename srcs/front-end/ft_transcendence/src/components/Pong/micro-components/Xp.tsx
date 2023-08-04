import React, { FC,  } from 'react';

enum Rank {
    Bronze,
    Silver,
    Gold,
  }
  
  const levelRanges = {
    [Rank.Bronze]: { min: 1, max: 10, xpGain: 2 },
    [Rank.Silver]: { min: 20, max: 30, xpGain: 1 },
    [Rank.Gold]: { min: 30, max: 40, xpGain: 0.5 },
  };

  interface XpProps {
    level: number;
    victory: Boolean
  }

  function findRank(level: number): Rank | null {
    for (const rankKey in levelRanges) {
      if (levelRanges.hasOwnProperty(rankKey)) {
        const { min, max } = levelRanges[rankKey as unknown as Rank];
        if (level >= min && level <= max) {
          return rankKey as unknown as Rank;
        }
      }
    }
    return null;
  }
  
  export const Xp: FC<XpProps> = ({ level, victory  }) => {
    
    const rank = findRank(level);
    const { xpGain, max } = rank ? levelRanges[rank] : { xpGain: 0, max: 0 };
    const curXPPercentage = (level / max) * 100;
    const xpGainPercentage = rank && victory? (xpGain / max) * 100 : 0;
    return (
      <div className='xp-container'>
        <div className='xp-image xp-image-left' /*src='/ft_transcendence/src/image/gold_medal.png' alt='left-medal*/ />
        <div className="xp-bar">
          {victory ? (
            <div className="xp-bar-segment" style={{ transition: 'width 0.5s ease 0.3s' , width: `${curXPPercentage + xpGainPercentage }%`,  }} />
            ) : (
            <div className="xp-bar-segment" style={{ width: `${curXPPercentage}%` }} />
            )}
            <div className='xp-bar-text'>
            <h1>{curXPPercentage + xpGainPercentage}%</h1>
            </div>
        </div>
        <div className='xp-image xp-image-right' /*src='/ft_transcendence/src/image/silver_medal_nobg.png' alt='right-medal'*/ />
      </div>
    );  
  };
  
  export default Xp;