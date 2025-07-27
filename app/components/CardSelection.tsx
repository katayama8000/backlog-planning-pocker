'use client';

type CardSelectionProps = {
  cards: number[];
  selectedCard: number | null;
  onSelectCard: (cardValue: number) => void;
  disabled: boolean;
};

export function CardSelection({
  cards,
  selectedCard,
  onSelectCard,
  disabled,
}: CardSelectionProps) {
  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">あなたの番です</h3>
        <p className="text-gray-600 dark:text-gray-400">カードを選択してください</p>
      </div>

      {disabled && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200 text-sm">
            ✓ 投票完了しました。他の参加者の投票をお待ちください。
          </p>
        </div>
      )}

      <div className="grid grid-cols-6 md:grid-cols-11 gap-3">
        {cards.map((cardValue) => (
          <button
            key={cardValue}
            onClick={() => !disabled && onSelectCard(cardValue)}
            disabled={disabled}
            className={`
              aspect-[2/3] rounded-lg border-2 transition-all font-bold text-lg shadow-md hover:shadow-lg
              ${
                disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:scale-105'
              }
              ${
                selectedCard === cardValue
                  ? 'border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-blue-300/50'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500'
              }
            `}>
            {cardValue}
          </button>
        ))}
      </div>

      {/* 特別なカード */}
      <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
        <button
          onClick={() => !disabled && onSelectCard(-1)}
          disabled={disabled}
          className={`
            aspect-[2/3] rounded-lg border-2 transition-all font-bold text-sm shadow-md hover:shadow-lg
            ${
              disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:scale-105'
            }
            ${
              selectedCard === -1
                ? 'border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 shadow-orange-300/50'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-300'
            }
          `}>
          ?<div className="text-xs mt-1">わからない</div>
        </button>

        <button
          onClick={() => !disabled && onSelectCard(-2)}
          disabled={disabled}
          className={`
            aspect-[2/3] rounded-lg border-2 transition-all font-bold text-sm shadow-md hover:shadow-lg
            ${
              disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:scale-105'
            }
            ${
              selectedCard === -2
                ? 'border-purple-500 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 shadow-purple-300/50'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300'
            }
          `}>
          ∞<div className="text-xs mt-1">無限大</div>
        </button>

        <button
          onClick={() => !disabled && onSelectCard(-3)}
          disabled={disabled}
          className={`
            aspect-[2/3] rounded-lg border-2 transition-all font-bold text-sm shadow-md hover:shadow-lg
            ${
              disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:scale-105'
            }
            ${
              selectedCard === -3
                ? 'border-red-500 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 shadow-red-300/50'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300'
            }
          `}>
          ☕<div className="text-xs mt-1">休憩</div>
        </button>
      </div>

      {selectedCard !== null && !disabled && (
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-800 dark:text-white">
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
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            他のプレイヤーの選択を待っています...
          </p>
        </div>
      )}
    </div>
  );
}
