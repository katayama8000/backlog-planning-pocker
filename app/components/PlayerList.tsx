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
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        参加者
      </h2>

      {/* プレイヤー追加フォーム */}
      <form onSubmit={handleAddPlayer} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="プレイヤー名を入力"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            追加
          </button>
        </div>
      </form>

      {/* プレイヤーリスト */}
      {players.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          まだ参加者がいません。上のフォームから参加者を追加してください。
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                currentPlayer?.id === player.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => onSetCurrentPlayer(player)}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {player.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    {/* 投票状況インジケーター */}
                    <div
                      className={`w-3 h-3 rounded-full ${
                        player.hasVoted
                          ? 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {player.hasVoted ? '投票済み' : '未投票'}
                    </span>
                  </div>

                  {/* 選択されたカード（結果表示時のみ） */}
                  {showResults && player.selectedCard !== null && (
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                        {player.selectedCard}
                      </span>
                    </div>
                  )}

                  {/* カードの裏面（投票中） */}
                  {!showResults && player.hasVoted && (
                    <div className="mt-2">
                      <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded text-sm">
                        ?
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePlayer(player.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="プレイヤーを削除">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {currentPlayer?.id === player.id && (
                <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                  ← あなた
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
