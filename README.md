# プランニングポーカー

チームでアジャイル開発のストーリーポイント見積もりを行うためのWebアプリケーションです。

## 特徴

- 📊 フィボナッチ数列のカードでストーリーポイント見積もり
- 👥 複数プレイヤーでの同時投票
- 📈 投票結果の統計分析（平均、最小・最大、推奨値）
- 🎯 合意状況の自動判定
- 📱 レスポンシブデザイン（モバイル対応）
- 🌙 ダークモード対応

## 開発環境

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 技術スタック
- **Framework**: Next.js 15.4.4
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI**: React 19.1.0

### コーディング規約
- Named Exportを基本とする
- TypeScriptの型安全性を重視
- 関数型コンポーネントを使用
- 詳細は `.github/copilot-instructions.md` を参照

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
