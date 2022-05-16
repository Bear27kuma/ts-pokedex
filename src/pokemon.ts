// 画面表示で使用するpokemonオブジェクトの型定義
interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

// 非同期処理の実行完了後の値を定義する
type FetchPokemon = (id: number) => Promise<void>;
