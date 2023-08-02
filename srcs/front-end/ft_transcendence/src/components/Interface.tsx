export interface User {
    avatar: string;
    email: string;
    id: number;
    nickname: string;
    token: string;
    tfa_code?: string
  }

export interface Player {
  id: number;
  userId: number;
  positionX: number;
  positionY: number;
  waitingRoomId: number;
  opponentPlayerId :number;
  ballId?: number;
  pongId?: number;
  host: boolean;
}

export interface Ball {
  id: number;
  positionX: number;
  positionY: number;
  directionX: number;
  directionY: number;
}

export interface PongI {
  id: number;
  userId1: number;
  userId2: number;
  scoreUser1?: number;
  scoreUser2?: number;
  loserId?: number | null;
  winnerId?: number | null;
  VersusDate: string;
}