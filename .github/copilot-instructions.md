# GitHub Copilot Instructions

このプロジェクトはNext.js、TypeScript、TailwindCSSを使用したプランニングポーカーアプリケーションです。

## コーディング規約

### 基本方針
- **Named Export**を基本とする（default exportは使用しない）
- TypeScriptの型安全性を重視する
- 関数型コンポーネントを使用する
- Reactフックを適切に使用する

### Export/Import規約
```typescript
// ❌ Default Export（使用しない）
export default function Component() {}
import Component from './Component';

// ✅ Named Export（推奨）
export function Component() {}
import { Component } from './Component';

// 例外: Next.jsページコンポーネント
export function Home() {}
export default Home; // Next.jsの要件で併用
```

### コンポーネント設計
- 単一責任の原則に従う
- propsの型定義を明確にする
- 再利用可能なコンポーネントを作成する
- 適切なdefaultPropsを設定する

### 型定義
```typescript
// 型定義の例
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
```

### スタイリング
- TailwindCSSを使用
- レスポンシブデザインを考慮
- ダークモード対応
- 一貫したデザインシステム

### 状態管理
- React Hooksを使用（useState, useEffect等）
- useStateにはジェネリクスを明示的に指定する
- 状態の最小化
- 適切な状態の分離

```typescript
// useState使用例
const [players, setPlayers] = useState<Player[]>([]);
const [isVisible, setIsVisible] = useState<boolean>(false);
const [message, setMessage] = useState<string>('');
```

### アクセシビリティ
- セマンティックなHTML要素を使用
- 適切なaria-label、aria-describedbyを設定
- キーボードナビゲーションをサポート
- 色以外での情報伝達も考慮

### パフォーマンス
- 不要な再レンダリングを避ける
- useCallback、useMemoを適切に使用
- 画像の最適化

## 開発時の注意点
- 型エラーを解決してからコミット
- ESLintの警告を無視しない
- コンポーネントの責任を明確にする
- テスタブルなコードを書く
- 日本語UIに対応した設計

## 推奨するベストプラクティス
- 早期リターンパターンを使用
- 条件分岐の簡潔化
- 適切なコメントの追加
- 関数の純粋性を保つ
- エラーハンドリングの実装
