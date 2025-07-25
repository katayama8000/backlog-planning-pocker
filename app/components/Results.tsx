'use client';

import { Player } from './PlanningPoker';

type ResultsProps = {
  players: Player[];
  onStartNewRound: () => void;
};

export function Results({ players, onStartNewRound }: ResultsProps) {
  // 数値のカードのみを抽出して統計を計算
  const numericVotes = players
    .map((p) => p.selectedCard)
    .filter((card): card is number => card !== null && card >= 0);

  const specialVotes = players
    .filter((p) => p.selectedCard !== null && p.selectedCard < 0)
    .map((p) => ({
      player: p,
      card: p.selectedCard as number,
    }));

  const getCardDisplay = (cardValue: number) => {
    switch (cardValue) {
      case -1:
        return 'わからない';
      case -2:
        return '無限大';
      case -3:
        return '休憩';
      default:
        return cardValue.toString();
    }
  };

  // 統計計算
  const average =
    numericVotes.length > 0
      ? numericVotes.reduce((sum, card) => sum + card, 0) / numericVotes.length
      : 0;

  const min = numericVotes.length > 0 ? Math.min(...numericVotes) : 0;
  const max = numericVotes.length > 0 ? Math.max(...numericVotes) : 0;

  // 最も近いフィボナッチ数を見つける
  const fibSequence = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  const nearestFib = fibSequence.reduce((prev, curr) =>
    Math.abs(curr - average) < Math.abs(prev - average) ? curr : prev
  );

  // 投票の分布を計算
  const voteCounts = numericVotes.reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const allSame =
    numericVotes.length > 0 &&
    numericVotes.every((vote) => vote === numericVotes[0]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        投票結果
      </h2>

      {/* 全員の投票結果 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          全員の投票
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {player.name}
              </div>
              <div className="text-2xl font-bold text-center">
                {player.selectedCard !== null ? (
                  <span
                    className={`
                    inline-block px-3 py-2 rounded-lg
                    ${
                      player.selectedCard >= 0
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                        : 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
                    }
                  `}>
                    {getCardDisplay(player.selectedCard)}
                  </span>
                ) : (
                  <span className="text-gray-400">未投票</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 統計情報 */}
      {numericVotes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            統計情報
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                {average.toFixed(1)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                平均
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {nearestFib}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                推奨値
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                {min}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                最小
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                {max}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                最大
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 合意状況 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          合意状況
        </h3>
        <div
          className={`p-4 rounded-lg border ${
            allSame && numericVotes.length > 0
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
          }`}>
          {allSame && numericVotes.length > 0 ? (
            <p className="text-green-800 dark:text-green-200">
              ✅ 全員が同じ値（{numericVotes[0]}
              ）に投票しました！合意が取れています。
            </p>
          ) : (
            <p className="text-yellow-800 dark:text-yellow-200">
              ⚠️ 投票に差があります。再議論をおすすめします。
            </p>
          )}
        </div>
      </div>

      {/* 特別な投票がある場合 */}
      {specialVotes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            特別な投票
          </h3>
          <div className="space-y-2">
            {specialVotes.map(({ player, card }) => (
              <div
                key={player.id}
                className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                <span className="font-medium text-orange-800 dark:text-orange-200">
                  {player.name}
                </span>
                <span className="text-orange-600 dark:text-orange-400 ml-2">
                  → {getCardDisplay(card)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 投票分布 */}
      {Object.keys(voteCounts).length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            投票分布
          </h3>
          <div className="space-y-2">
            {Object.entries(voteCounts)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([value, count]) => (
                <div key={value} className="flex items-center">
                  <div className="w-12 text-center font-medium text-gray-700 dark:text-gray-300">
                    {value}
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                      <div
                        className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(count / players.length) * 100}%` }}>
                        <span className="text-white text-sm font-medium">
                          {count}人
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onStartNewRound}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          新しいラウンドを開始
        </button>
      </div>
    </div>
  );
}
