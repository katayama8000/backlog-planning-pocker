'use client';

type CardSelectionProps = {
  cards: number[];
  selectedCard: number | null;
  onSelectCard: (cardValue: number | null) => void;
  disabled: boolean;
};

export function CardSelection({
  cards,
  selectedCard,
  onSelectCard,
  disabled,
}: CardSelectionProps) {
  // 2段固定でカラム数を計算
  const totalCards = cards.length + 3;
  const columns = Math.ceil(totalCards / 2);
  return (
    <div className="flex flex-col items-center w-full py-4 px-2 min-h-[40vh]">
      <div className="text-center mb-4 w-full">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
          あなたの番です
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          カードを選択してください
        </p>
      </div>

      {disabled && (
        <div className="mb-4 p-2 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded w-full max-w-xl mx-auto flex items-center justify-center">
          <p className="text-green-800 dark:text-green-200 text-xs">
            ✓ 投票完了しました。他の参加者の投票をお待ちください。
          </p>
        </div>
      )}

      <div
        className="grid gap-3 w-full max-w-3xl mx-auto mb-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(64px, 1fr))`,
          gridTemplateRows: 'repeat(2, 1fr)',
        }}>
        {[...cards, -1, -2, -3].map((cardValue) => {
          let label: string = '';
          let subLabel = '';
          if (cardValue === -1) {
            label = '？';
            subLabel = 'わからない';
          } else if (cardValue === -2) {
            label = '∞';
            subLabel = '無限大';
          } else if (cardValue === -3) {
            label = '☕';
            subLabel = '休憩';
          } else {
            label = String(cardValue);
          }
          let border = 'border-gray-300 dark:border-gray-600';
          let bg = 'bg-white dark:bg-gray-700';
          let text = 'text-gray-700 dark:text-gray-300';
          if (cardValue === -1 && selectedCard === -1) {
            border = 'border-orange-500';
            bg = 'bg-orange-100 dark:bg-orange-900';
            text = 'text-orange-700 dark:text-orange-300';
          } else if (cardValue === -2 && selectedCard === -2) {
            border = 'border-purple-500';
            bg = 'bg-purple-100 dark:bg-purple-900';
            text = 'text-purple-700 dark:text-purple-300';
          } else if (cardValue === -3 && selectedCard === -3) {
            border = 'border-red-500';
            bg = 'bg-red-100 dark:bg-red-900';
            text = 'text-red-700 dark:text-red-300';
          } else if (selectedCard === cardValue) {
            border = 'border-blue-500';
            bg = 'bg-blue-100 dark:bg-blue-900';
            text = 'text-blue-700 dark:text-blue-300';
          }
          return (
            <button
              key={cardValue}
              onClick={() => onSelectCard(cardValue)}
              className={`aspect-[2/3] rounded border transition font-bold text-base flex flex-col items-center justify-center ${border} ${bg} ${text} cursor-pointer hover:border-blue-400 focus:outline-none`}
              style={{ minWidth: '64px', minHeight: '96px' }}>
              {label}
              {subLabel && (
                <div className="text-xs mt-1 text-gray-500 dark:text-gray-400 font-normal">
                  {subLabel}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedCard !== null && (
        <div className="mt-4 text-center w-full">
          <p className="text-base text-gray-900 dark:text-white font-semibold">
            あなたの選択:{' '}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {selectedCard === -1
                ? '？ (わからない)'
                : selectedCard === -2
                ? '∞ (無限大)'
                : selectedCard === -3
                ? '☕ (休憩)'
                : selectedCard}
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            他のプレイヤーの選択を待っています...
          </p>
        </div>
      )}
    </div>
  );
}
