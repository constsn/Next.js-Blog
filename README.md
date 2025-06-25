# 🚀 shuto tech （Next.js Blog）

## 概要

技術学習のアウトプットと実践的な開発スキルの習得を目的として、Next.js 15、TypeScript、Prisma、Supabase で開発した完全 Markdown 対応の個人ブログシステムです。

---

## デモサイト

🔗 [本番環境はこちら（Vercel）](https://shuto-tech.com)

---

## 🚧 機能一覧

### 📰 一般ユーザー向け機能

- ブログ記事一覧の表示
- 記事の詳細表示
- 記事の検索機能
- タグ一覧ページ
- タグによる記事の絞り込み
- 最近の記事セクションの表示
- 関連記事セクションの表示（各記事下に配置）
- ページネーション
- 前後の記事ナビゲーション
- コメント投稿機能（各記事下部にコメント投稿・返信が可能）

  - コメント投稿時は「名前」と「本文」だけを入力
  - コメント作成時の処理で`autorEmail`を自動付与
    - ログイン中（=管理者）の場合：セッションから email を取得して付加（`session.user.email`）
    - 未ログイン（=一般ユーザー）の場合：ダミーアドレス`anonymous@unknown.com`を付加
  - 各コメントが持つ`authorEmail`をもとにそのコメントが管理者のコメントか、ユーザーのコメントかを視覚的に区別 ⬇︎

  ```tsx
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isMyComment = adminEmail === comment.authorEmail;
  {
    isMyComment && (
      <span className="text-blue-600 bg-blue-100 p-1 rounded-full">管理人</span>
    );
  }
  ```

- SNS シェアボタン（各記事下に配置）

### 🔐 認証機能

- ログインページ（管理者専用）
- ## next-auth（Credentials Provider）による認証対応
  - 管理者自身のみログイン可能な設計
  - ログイン情報（メールアドレス・ハッシュ済みパスワード）は環境変数で安全に管理
  - Zod による入力バリデーション
  - 認証処理には bcryptjs によるハッシュ照合を使用
- `/dashboard` 配下の管理ページには認証チェック付き
  - ミドルウェアでルーティング単位のページ保護
  - 未ログイン時は`/login` にリダイレクト
  - ログイン済みで`/login` にアクセスした場合`/dashboard` にリダイレクト

### ✏️ 管理画面機能

- 記事の新規作成機能
- 記事の編集機能
- Markdown 入力 + リアルタイムプレビュー
- タグの追加・編集（記事の投稿、編集時に対応）
- 記事の削除機能
- 全ての記事一覧表示（下書き記事も含む）
- 各記事の詳細ページ表示
- コメント一覧表示
- コメントの削除機能

## 🧠 データベース

### 📝 Post（投稿）

| フィールド名  | 型       | 属性             | 説明                     |
| ------------- | -------- | ---------------- | ------------------------ |
| id            | Int      | 主キー、自動増分 | 投稿の一意識別子         |
| title         | String   | 必須             | 投稿のタイトル           |
| content       | String   | 必須             | 投稿の本文内容           |
| slug          | String   | 必須、一意       | URL スラッグ（SEO 対応） |
| coverImageUrl | String   | 必須             | カバー画像の URL         |
| published     | Boolean  | デフォルト: true | 公開状態                 |
| createdAt     | DateTime | 自動設定         | 作成日時                 |
| updatedAt     | DateTime | 自動更新         | 更新日時                 |

### 🏷️ Tag（タグ）

| フィールド名 | 型     | 属性             | 説明             |
| ------------ | ------ | ---------------- | ---------------- |
| id           | Int    | 主キー、自動増分 | タグの一意識別子 |
| name         | String | 必須、一意       | タグ名           |

### 💬 Comment（コメント）

| フィールド名 | 型       | 属性             | 説明                                         |
| ------------ | -------- | ---------------- | -------------------------------------------- |
| id           | Int      | 主キー、自動増分 | コメントの一意識別子                         |
| postId       | Int      | 外部キー         | 関連する投稿の ID                            |
| author       | String   | 必須             | コメント投稿者名                             |
| authorEmail  | String   | 任意             | システム設計用メールアドレス（管理者判定用） |
| content      | String   | 必須             | コメント内容                                 |
| createdAt    | DateTime | 自動設定         | 投稿日時                                     |
| parentId     | Int      | 任意             | 親コメントの ID（返信機能用）                |

## リレーション

### Post ↔ Tag（多対多）

- 1 つの投稿に複数のタグを設定可能
- 1 つのタグは複数の投稿で使用可能
- `PostTags`中間テーブルで関連付け

### Post → Comment（1 対多）

- 1 つの投稿に対して複数のコメントが可能
- コメントは必ず 1 つの投稿に属する

### Comment → Comment（自己参照）

- コメントに対する返信機能
- 階層構造のコメントシステム

---

## 🧭 ER 図

![ER Diagram](https://i.imgur.com/BSm1yt3.jpeg)

## 📸 スクリーンショット

### 1.一般ユーザー向け画面

### トップページ

![Home Page](https://i.imgur.com/p2phPou.jpeg)

### 記事詳細ページ

![PostDetail Page](https://i.imgur.com/l3JKtYC.jpeg)

### コメントページ

![Comment Page](https://i.imgur.com/5Li7VpP.jpeg)

### タグ一覧ページ

![Tags Page](https://i.imgur.com/53xpshx.jpeg)

### タグ別の記事一覧ページ

![PostWithTags Page](https://i.imgur.com/pE8EXQ4.jpeg)

---

### 2.管理画面

### ダッシュボードページ

![Dashboard Page](https://i.imgur.com/xaPcQat.jpeg)

### 記事管理ページ

![PostManage Page](https://i.imgur.com/aLx19ev.jpeg)

### コメント管理ページ

![CommentManage Page](https://i.imgur.com/Vztp27Y.jpeg)

### 記事作成ページ ➀

![CreatePost Page-1](https://i.imgur.com/HqAi21u.jpeg)

### 記事作成ページ ➁

![CreatePost Page-2](https://i.imgur.com/3Mc9jFG.jpeg)

---

## 🛠️ 技術スタック（Tech Stack）

### フレームワーク / 言語

- **Next.js 15**
- **React 19**
- **TypeScript 5**

### スタイリング

- **Tailwind CSS 4**
- **@tailwindcss/typography**

### 認証・セキュリティ

- **next-auth（v5 beta）**
- **bcryptjs** – パスワードのハッシュ化

### 入力・バリデーション

- **Zod**
- **react-textarea-autosize**

### Markdown

- **marked**
- **highlight.js** – コードハイライト表示対応

### データベース / ORM

- **Prisma ORM**
- **Supabase**（本番環境）

### UI コンポーネント

- **Radix UI**
- **lucide-react**

---

## 📝 学んだこと・工夫点

このプロジェクトを通して、Next.js の各レンダリング方式（SSR / SSG / ISR）について実践的に理解を深めました。

- SSR（Server-Side Rendering）：リクエストごとに最新データを取得して表示できる反面、表示速度が若干遅くなる場面がありました。
- SSG（Static Site Generation）：ビルド時に静的 HTML を生成するため高速に表示できますが、データの更新には再ビルドが必要なため、データの内容の変更などを UI に反映させるには再デプロイする必要があり、使う側としては UX 的にかなり厳しいと実感しました。
- ISR（Incremental Static Regeneration）：静的生成と最新データの取得のバランスが取れており、指定した時間間隔でページを再生成することで、表示速度と鮮度の両立が可能だと実感しました。

この知見を活かして、本ブログでは、記事一覧や記事詳細ページ、管理画面などの各ページで ISR と SSG を組み合わせて使用しています。
たとえば `generateStaticParams` を使った SSG と ISR を同時に活用し、表示速度を保ちつつ一定時間ごとにデータの更新も可能にするなど、ページごとに適した構成を工夫しました。

また、UX にも配慮し、以下の点を工夫しました：

- 各記事下部に関連記事や前後の記事ナビゲーションを設置
- フッターにトップページへの導線を追加

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

Next.js への知見が深まりました。実際にアプリをデプロイして本番環境で動かした時 SSR のページと例えば SSG のページが全然表示速度が違ったりして、目に見えてこの next.js 特徴のレンダリングの違いを学びました。例えば SSR ではデータの更新が、データの UI での表示にもしっかり反映されていくが、しかし毎回のリクエストで生成するから多少動作は遅くなり、また一方 SSG では最初に生成されているからキャッシュがあり表示速度が速く、しかしその代わりデータの更新はビルド時にしか更新されないから SSR のように UI のページに関して最新のデータを表示することができないなど、レンダリング方法による特徴を実際に自分のアプリで経験して学びました。
一方 ISR では指定時間ごとにデータが再び生成されて最新のデータを表示できる一方、さらにキャッシュを作るから SSG のように表示速度も早く万能だと感じました。
つまり何が言いたいかというとデータの取得などがあるページでは、開発途中の段階からどの方法でレンダリングするのかなど多少考えるべきだと感じました。
実際にこのブログでは一般ユーザーが見る記事一覧や記事詳細などの画面、また、管理人用の管理画面においては ISR と SSG を選んでいます。そうすることで表示も早くデータの更新もコンマ一秒リアルタイムではないですがちゃんと反映されます。
工夫した点では、記事それぞれの下部に関連記事のセクションや前後記事のナビゲーション、さらに下のフッターではトップページに遷移といった、UX への配慮も意識して作りました。
