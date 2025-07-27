'use client';

import { BacklogIssue } from '../types/backlog';

type SelectedIssueProps = {
  selectedBacklogIssue?: BacklogIssue | null;
};

export function SelectedIssue({ selectedBacklogIssue }: SelectedIssueProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Story
      </h2>

      {selectedBacklogIssue ? (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            選択されたBacklog課題
          </h3>
          <p className="font-medium text-gray-800 dark:text-white mb-2">
            [{selectedBacklogIssue.issueKey}] {selectedBacklogIssue.summary}
          </p>
          {selectedBacklogIssue.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {selectedBacklogIssue.description}
            </p>
          )}
          {selectedBacklogIssue.assignee && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              担当: {selectedBacklogIssue.assignee.name}
            </p>
          )}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          課題を選択してください
        </div>
      )}
    </div>
  );
}
