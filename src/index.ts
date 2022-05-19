// スタイルシート（Sass）を読み込む
import './styles.scss';

// Pokedexクラスをインポートする
import Pokedex from './pokemon';

// 組み込みユーティリティとジェネリクスを使ってnull判定を行う
export const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  return !(value === null || value === void 0);
};

// 生成したHTMLを挿入するdiv要素を取得する
const container: HTMLElement | null = document.getElementById('app');
let pokedex: Pokedex;

// document.getElementById()で取得したHTML要素のnull判定を行う
if (isNonNullable(container)) {
  pokedex = new Pokedex(container);
} else {
  console.error('There is some error in getting the HTMLElement.');
}

const exec = async () => {
  await pokedex.fetchData(1, 151);
};
