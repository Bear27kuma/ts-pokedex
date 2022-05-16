// Pokedexクラスをインポートする
import Pokedex from './pokemon';

// HTML要素を取得する
const container: HTMLElement | null = document.getElementById('app');
const pokemons = 1;

const pokedex = new Pokedex(pokemons);
pokedex.fetchData();
