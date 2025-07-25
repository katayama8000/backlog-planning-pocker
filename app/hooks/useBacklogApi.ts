'use client';

import { useState, useCallback } from 'react';
import 'isomorphic-fetch';
import 'isomorphic-form-data';
import * as backlogjs from 'backlog-js';
import { BacklogIssue, type BacklogProject } from '../components/BacklogConnection';

type UseBacklogApiReturn = {
    isConnected: boolean;
    isLoading: boolean;
    error: string;
    projects: BacklogProject[];
    issues: BacklogIssue[]; // BacklogIssue型の配列を使用
    selectedProject: BacklogProject | null;
    connect: (host: string, apiKey: string) => Promise<void>;
    connectWithDefaults: () => Promise<void>;
    disconnect: () => void;
    loadIssues: (project: BacklogProject) => Promise<void>;
    clearError: () => void;
    refreshProjects: () => Promise<void>;
    searchIssues: (query: string) => Promise<void>;
};

export function useBacklogApi(): UseBacklogApiReturn {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [projects, setProjects] = useState<BacklogProject[]>([]);
    const [issues, setIssues] = useState<BacklogIssue[]>([]);
    const [selectedProject, setSelectedProject] = useState<BacklogProject | null>(null);
    const [backlogClient, setBacklogClient] = useState<backlogjs.Backlog | null>(null);

    // 開発用のデフォルト値
    const DEFAULT_HOST = 'nulab.backlog.jp';
    const DEFAULT_API_KEY = '';

    const clearError = useCallback(() => {
        setError('');
    }, []);

    // プロジェクトの課題を取得するヘルパー関数
    const loadIssuesForProject = async (project: BacklogProject, client: backlogjs.Backlog) => {
        try {
            const issuesData = await client.getIssues({
                projectId: [project.id],
                statusId: [1, 2, 3], // 未対応、処理中、処理済み
                count: 20,
                sort: 'updated',
                order: 'desc'
            });

            setIssues(issuesData as BacklogIssue[]);
            setSelectedProject(project);
        } catch (err) {
            console.error('Issues loading error:', err);
            // エラーは表示しない（自動選択なので）
        }
    };

    const connect = useCallback(async (host: string, apiKey: string) => {
        if (!apiKey.trim() || !host.trim()) {
            setError('APIキーとホストを入力してください');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const backlog = new backlogjs.Backlog({ host, apiKey });

            // 接続テスト
            await backlog.getSpace();

            // プロジェクト一覧を取得
            const projectsData = await backlog.getProjects();

            setBacklogClient(backlog);
            setProjects(projectsData as BacklogProject[]);
            setIsConnected(true);

            // PASTAプロジェクトを自動選択
            const pastaProject = (projectsData as BacklogProject[]).find(
                p => p.name === 'PASTA' || p.projectKey === 'PASTA'
            );
            if (pastaProject) {
                await loadIssuesForProject(pastaProject, backlog);
            }

        } catch (err) {
            setError('Backlogへの接続に失敗しました。APIキーとホストを確認してください。');
            console.error('Backlog connection error:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const connectWithDefaults = useCallback(async () => {
        await connect(DEFAULT_HOST, DEFAULT_API_KEY);
    }, [connect, DEFAULT_HOST, DEFAULT_API_KEY]);

    const disconnect = useCallback(() => {
        setIsConnected(false);
        setProjects([]);
        setSelectedProject(null);
        setIssues([]);
        setBacklogClient(null);
        setError('');
    }, []);

    const loadIssues = useCallback(async (project: BacklogProject) => {
        if (!isConnected || !backlogClient) {
            setError('Backlogに接続されていません');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await loadIssuesForProject(project, backlogClient);
        } catch (err) {
            setError('課題の取得に失敗しました。');
            console.error('Issues loading error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [isConnected, backlogClient]);

    const refreshProjects = useCallback(async () => {
        if (!isConnected || !backlogClient) {
            setError('Backlogに接続されていません');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const projectsData = await backlogClient.getProjects();
            setProjects(projectsData as BacklogProject[]);
        } catch (err) {
            setError('プロジェクト一覧の再取得に失敗しました。');
            console.error('Projects refresh error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [isConnected, backlogClient]);

    const searchIssues = useCallback(async (query: string) => {
        if (!isConnected || !backlogClient || !selectedProject) {
            setError('Backlogに接続されていないか、プロジェクトが選択されていません');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const issuesData = await backlogClient.getIssues({
                projectId: [selectedProject.id],
                keyword: query,
                count: 20,
                sort: 'updated',
                order: 'desc'
            });

            setIssues(issuesData as BacklogIssue[]);
        } catch (err) {
            setError('課題の検索に失敗しました。');
            console.error('Issues search error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [isConnected, backlogClient, selectedProject]);

    return {
        isConnected,
        isLoading,
        error,
        projects,
        issues,
        selectedProject,
        connect,
        connectWithDefaults,
        disconnect,
        loadIssues,
        clearError,
        refreshProjects,
        searchIssues
    };
}
