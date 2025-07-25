'use client';

import { useState } from 'react';
import { StoryInput } from './StoryInput';
import { PlayerList } from './PlayerList';
import { CardSelection } from './CardSelection';
import { Results } from './Results';
import { BacklogConnection } from './BacklogConnection';

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
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isVotingPhase, setIsVotingPhase] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [selectedBacklogIssue, setSelectedBacklogIssue] =
    useState<BacklogIssue | null>(null);

  // Backlog課題選択時の処理
  const handleBacklogIssueSelect = (issue: BacklogIssue) => {
    setSelectedBacklogIssue(issue);
  };

  // プレイヤーを追加
  const addPlayer = (name: string) => {
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

  // ストーリーを開始
  const startStory = (story: Story) => {
    setCurrentStory(story);
    setIsVotingPhase(true);
    setShowResults(false);
    setSelectedBacklogIssue(null); // ストーリー開始時にBacklog課題をクリア
    // 全プレイヤーの投票をリセット
    setPlayers(
      players.map((p) => ({
        ...p,
        selectedCard: null,
        hasVoted: false,
      }))
    );
  };

  // カードを選択
  const selectCard = (cardValue: number) => {
    if (!currentPlayer || !isVotingPhase) return;

    setPlayers(
      players.map((p) =>
        p.id === currentPlayer.id
          ? { ...p, selectedCard: cardValue, hasVoted: true }
          : p
      )
    );

    // 現在のプレイヤーの投票状態を更新
    setCurrentPlayer({
      ...currentPlayer,
      selectedCard: cardValue,
      hasVoted: true,
    });
  };

  // 結果を表示
  const revealCards = () => {
    setShowResults(true);
    setIsVotingPhase(false);
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
    setIsVotingPhase(true);

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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Backlog連携セクション */}
      <BacklogConnection onIssueSelect={handleBacklogIssueSelect} />

      {/* ストーリー入力セクション */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <StoryInput
          onStartStory={startStory}
          currentStory={currentStory}
          selectedBacklogIssue={selectedBacklogIssue}
        />
      </div>

      {/* プレイヤー管理セクション */}
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

      {/* 投票セクション */}
      {isVotingPhase && currentPlayer && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <CardSelection
            cards={FIBONACCI_CARDS}
            selectedCard={currentPlayer.selectedCard}
            onSelectCard={selectCard}
            disabled={currentPlayer.hasVoted}
          />

          {/* 投票状況 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              投票済み: {players.filter((p) => p.hasVoted).length} /{' '}
              {players.length}
            </p>

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

      {/* 結果セクション */}
      {showResults && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <Results players={players} onStartNewRound={startNewRound} />
        </div>
      )}
    </div>
  );
}
