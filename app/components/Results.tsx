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

  // Find the nearest valid voting value (not Fibonacci numbers)
  // Only use 0.5, 1, 2 as valid voting values
  const validVoteValues = [0.5, 1, 2];
  const recommendedValue = validVoteValues.reduce((prev, curr) =>
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          投票結果
        </h2>
      </div>

      {/* 合意状況 */}
      <div
        className={`p-4 rounded-lg border-2 text-center ${
          allSame && numericVotes.length > 0
            ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-700'
            : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-700'
        }`}>
        {allSame && numericVotes.length > 0 ? (
          <p className="text-lg font-semibold text-green-800 dark:text-green-200">
            ✅ 全員一致！
          </p>
        ) : (
          <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
            ⚠️ 意見が割れています
          </p>
        )}
      </div>

      {/* 統計情報 */}
      {numericVotes.length > 0 && (
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {average.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">平均</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {recommendedValue}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">推奨値</div>
          </div>
        </div>
      )}

      {/* 投票分布 */}
      {Object.keys(voteCounts).length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">
            投票の内訳
          </h3>
          <div className="space-y-2">
            {Object.entries(voteCounts)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([value, count]) => (
                <div key={value} className="flex items-center">
                  <div className="w-12 text-center font-medium text-gray-700 dark:text-gray-300">
                    {value}
                  </div>
                  <div className="flex-1 ml-2">
                    <div
                      className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${(count / players.length) * 100}%` }}>
                      <span className="text-white text-sm font-medium">
                        {count}人
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 特別な投票がある場合 */}
      {specialVotes.length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">
            特別な投票
          </h3>
          <div className="space-y-2">
            {specialVotes.map(({ player, card }) => (
              <div
                key={player.id}
                className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-2 flex justify-between items-center">
                <span className="font-medium text-orange-800 dark:text-orange-200">
                  {player.name}
                </span>
                <span className="text-orange-600 dark:text-orange-400 font-bold">
                  {getCardDisplay(card)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* アクションボタン */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onStartNewRound}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-lg">
          次のラウンドへ
        </button>
      </div>
    </div>
  );
}
