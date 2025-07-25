'use client';

import { useState } from 'react';
import { Story } from './PlanningPoker';

type StoryInputProps = {
  onStartStory: (story: Story) => void;
  currentStory: Story | null;
};

export function StoryInput({ onStartStory, currentStory }: StoryInputProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newStory: Story = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
      };
      onStartStory(newStory);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        ストーリー
      </h2>

      {currentStory ? (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            現在のストーリー
          </h3>
          <p className="font-medium text-gray-800 dark:text-white mb-2">
            {currentStory.title}
          </p>
          {currentStory.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {currentStory.description}
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="story-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ストーリータイトル *
            </label>
            <input
              id="story-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: ユーザーログイン機能の実装"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="story-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              詳細説明
            </label>
            <textarea
              id="story-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ストーリーの詳細を入力してください..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            ストーリーを開始
          </button>
        </form>
      )}
    </div>
  );
}
