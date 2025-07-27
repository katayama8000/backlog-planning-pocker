'use client';

import { useState } from 'react';
import { Player } from './PlanningPoker';

type PlayerListProps = {
  players: Player[];
  currentPlayer: Player | null;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (playerId: string) => void;
  onSetCurrentPlayer: (player: Player) => void;
  showResults: boolean;
};

export function PlayerList({
  players,
  currentPlayer,
  onAddPlayer,
  onRemovePlayer,
  onSetCurrentPlayer,
  showResults,
}: PlayerListProps) {
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        参加者
      </h3>

      {/* プレイヤー追加フォーム */}
      <form onSubmit={handleAddPlayer} className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="プレイヤー名"
          className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          追加
        </button>
      </form>

      {/* プレイヤーリスト */}
      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
              currentPlayer?.id === player.id
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => onSetCurrentPlayer(player)}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {player.name}
              </span>
              {currentPlayer?.id === player.id && (
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
                  あなた
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {showResults && player.selectedCard !== null && (
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  {player.selectedCard === -1
                    ? '？'
                    : player.selectedCard === -2
                    ? '∞'
                    : player.selectedCard === -3
                    ? '☕'
                    : player.selectedCard}
                </span>
              )}
              {!showResults && player.hasVoted && (
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemovePlayer(player.id);
                }}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-1 rounded-full"
                title="プレイヤーを削除"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18 6L6 18M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      {players.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          参加者を追加してください
        </p>
      )}
    </div>
  );
}
