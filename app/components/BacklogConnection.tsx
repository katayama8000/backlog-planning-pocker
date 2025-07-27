'use client';

import { useState } from 'react';
import { useBacklogApi } from '../hooks/useBacklogApi';
import type { Issue } from 'backlog-js/dist/types/entity';

type BacklogIssue = Issue.Issue;

type Props = {
  onIssueSelect: (issue: BacklogIssue) => void;
};

export function BacklogConnection({ onIssueSelect }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const host = 'nulab.backlog.jp';
  const [searchQuery, setSearchQuery] = useState('');

  const {
    isConnected,
    isLoading,
    error,
    issues,
    selectedProject,
    connect,
    connectWithDefaults,
    disconnect,
    loadIssues,
    clearError,
    searchIssues,
  } = useBacklogApi();

  // Filter issues by status on frontend
  const filteredIssues = statusFilter
    ? issues.filter((issue) => issue.status.name === statusFilter)
    : issues;

  const handleConnect = async () => {
    await connect(host, apiKey);
  };

  const handleDisconnect = () => {
    disconnect();
    setApiKey('');
  };

  // 未使用の関数・変数は削除

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchIssues(searchQuery.trim());
    } else if (selectedProject) {
      await loadIssues(selectedProject);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Backlog連携
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Backlogホスト:{' '}
              <span className="font-mono text-blue-700 dark:text-blue-300">
                nulab.backlog.jp
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="api-key"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              APIキー *
            </label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="BacklogのAPIキーを入力"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-red-800 dark:text-red-200 text-sm">
                  {error}
                </p>
                <button
                  onClick={clearError}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 ml-2">
                  ✕
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            {isLoading ? '接続中...' : 'Backlogに接続'}
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>※ BacklogのAPIキーが必要です。</p>
            <p>設定 → 個人設定 → APIより取得できます。</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Backlog課題選択
        </h2>
        <button
          onClick={handleDisconnect}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          接続解除
        </button>
      </div>

      {/* 課題一覧 */}
      {selectedProject ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              課題一覧 ({selectedProject.name})
            </h3>
            <div className="flex items-center gap-2">
              <label
                htmlFor="status-filter"
                className="text-sm text-gray-700 dark:text-gray-300">
                Status:
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="">All</option>
                {Array.from(
                  new Set(issues.map((issue) => issue.status.name))
                ).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="課題を検索..."
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-r transition-colors">
                検索
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                課題を読み込み中...
              </p>
            </div>
          ) : issues.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                課題が見つかりませんでした
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredIssues.map((issue) => (
                <button
                  key={issue.id}
                  onClick={() => onIssueSelect(issue)}
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {issue.issueKey}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            issue.status.id === 1
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                              : issue.status.id === 2
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                          {issue.status.name}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {issue.issueType.name}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-800 dark:text-white mb-1">
                        {issue.summary}
                      </h4>
                      {issue.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {issue.description
                            .replace(/\n/g, ' ')
                            .substring(0, 100)}
                          {issue.description.length > 100 && '...'}
                        </p>
                      )}
                      {issue.assignee && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          担当: {issue.assignee.name}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            PASTAプロジェクトを自動選択中...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            <button
              onClick={clearError}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 ml-2">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
