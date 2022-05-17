// Pokedexクラスをインポートする
import Pokedex from './pokemon';

// 組み込みユーティリティとジェネリクスを使ってnull判定を行う
export const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  return !(value === null || value === void 0);
};

// HTML要素を取得する
const container: HTMLElement | null = document.getElementById('app');
const pokemons = 9;

if (isNonNullable(container)) {
  const pokedex = new Pokedex(pokemons, container);
  void pokedex.fetchData();
} else {
  console.error('There is some error in getting the HTMLElement.');
}
