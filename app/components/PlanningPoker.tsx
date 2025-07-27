'use client';

import { useState } from 'react';
import { SelectedIssue } from './SelectedIssue';
import { PlayerList } from './PlayerList';
import { CardSelection } from './CardSelection';
import { Results } from './Results';
import { BacklogConnection } from './BacklogConnection';
import { BacklogIssue } from '../types/backlog';

export type Player = {
  id: string;
  name: string;
  selectedCard: number | null;
  hasVoted: boolean;
};

export type Story = {
  id: string;
  title: string;
  description: string;
};

const FIBONACCI_CARDS = [0.5, 1, 2];

export function PlanningPoker() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [selectedBacklogIssue, setSelectedBacklogIssue] =
    useState<BacklogIssue | null>(null);

  // Handle Backlog issue selection
  const handleBacklogIssueSelect = (issue: BacklogIssue) => {
    setSelectedBacklogIssue(issue);
  };

  // プレイヤーを追加
  const addPlayer = (name: string) => {
    // 同名チェック
    if (players.some((p) => p.name === name)) {
      alert('同じ名前のプレーヤーは追加できません');
      return;
    }
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      selectedCard: null,
      hasVoted: false,
    };
    setPlayers([...players, newPlayer]);

    // 最初のプレイヤーを現在のプレイヤーとして設定
    if (!currentPlayer) {
      setCurrentPlayer(newPlayer);
    }
  };

  // プレイヤーを削除
  const removePlayer = (playerId: string) => {
    setPlayers(players.filter((p) => p.id !== playerId));
    if (currentPlayer?.id === playerId && players.length > 1) {
      setCurrentPlayer(players.find((p) => p.id !== playerId) || null);
    }
  };

  // カードを選択
  const selectCard = (cardValue: number | null) => {
    if (!currentPlayer) return;
    setPlayers(
      players.map((p) =>
        p.id === currentPlayer.id
          ? { ...p, selectedCard: cardValue, hasVoted: cardValue !== null }
          : p
      )
    );
    setCurrentPlayer({
      ...currentPlayer,
      selectedCard: cardValue,
      hasVoted: cardValue !== null,
    });
  };

  // 結果を表示
  const revealCards = () => {
    setShowResults(true);
    setSelectedBacklogIssue(null);
  };

  // 新しいラウンドを開始
  const startNewRound = () => {
    setPlayers(
      players.map((p) => ({
        ...p,
        selectedCard: null,
        hasVoted: false,
      }))
    );
    setShowResults(false);
    if (currentPlayer) {
      setCurrentPlayer({
        ...currentPlayer,
        selectedCard: null,
        hasVoted: false,
      });
    }
  };

  // 全員が投票したかチェック
  const allPlayersVoted =
    players.length > 0 && players.every((p) => p.hasVoted);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        <BacklogConnection onIssueSelect={handleBacklogIssueSelect} />
        {selectedBacklogIssue && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <SelectedIssue selectedBacklogIssue={selectedBacklogIssue} />
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <PlayerList
            players={players}
            currentPlayer={currentPlayer}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onSetCurrentPlayer={setCurrentPlayer}
            showResults={showResults}
          />
        </div>

        {currentPlayer && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <CardSelection
              cards={FIBONACCI_CARDS}
              selectedCard={currentPlayer.selectedCard}
              onSelectCard={selectCard}
              disabled={false}
            />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                投票済み: {players.filter((p) => p.hasVoted).length} /{' '}
                {players.length}
              </p>
              {/* 投票済みの場合は選択済みポイントを表示 */}
              {currentPlayer.selectedCard !== null && (
                <p className="text-base text-blue-700 dark:text-blue-300 font-bold mb-2">
                  あなたの選択:{' '}
                  {currentPlayer.selectedCard === -1
                    ? '？ (わからない)'
                    : currentPlayer.selectedCard === -2
                    ? '∞ (無限大)'
                    : currentPlayer.selectedCard === -3
                    ? '☕ (休憩)'
                    : currentPlayer.selectedCard}
                </p>
              )}
              {allPlayersVoted && (
                <button
                  onClick={revealCards}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  カードを公開
                </button>
              )}
            </div>
          </div>
        )}

        {showResults && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Results players={players} onStartNewRound={startNewRound} />
          </div>
        )}
      </div>
    </div>
  );
}
