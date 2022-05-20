// スタイルシート（Sass）をインポート
import './styles.scss';

// Pokedexクラスをインポート
import Pokedex from './pokemon';

// jQueryをインポート
import $ from 'jquery';
import { Loader } from './loader';

// HTML要素の型定義
type Html = HTMLElement | null;

// 組み込みユーティリティとジェネリクスを使ってnull判定を行う
export const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  return !(value === null || value === void 0);
};

// 生成したHTMLを挿入するdiv要素を取得する
const container: Html = document.getElementById('app');
let pokedex: Pokedex;

// document.getElementById()で取得したHTML要素のnull判定を行う
if (isNonNullable(container)) {
  pokedex = new Pokedex(container);
} else {
  console.error('There is some error in getting the HTMLElement.');
}

const overlay = new Loader($('#overlay'));

// 各世代ごとのボタンを取得する
const firstBtn: Html = document.getElementById('first');
const secondBtn: Html = document.getElementById('second');
const thirdBtn: Html = document.getElementById('third');
const forthBtn: Html = document.getElementById('forth');
const fifthBtn: Html = document.getElementById('fifth');
const sixthBtn: Html = document.getElementById('sixth');
const seventhBtn: Html = document.getElementById('seventh');
const eighthBtn: Html = document.getElementById('eighth');

// 各世代ごとにfetchDataを実行する関数
const first = (): Promise<void> => pokedex.fetchData(1, 151);
const second = (): Promise<void> => pokedex.fetchData(152, 251);
const third = (): Promise<void> => pokedex.fetchData(252, 386);
const forth = (): Promise<void> => pokedex.fetchData(387, 493);
const fifth = (): Promise<void> => pokedex.fetchData(494, 649);
const sixth = (): Promise<void> => pokedex.fetchData(650, 721);
const seventh = (): Promise<void> => pokedex.fetchData(722, 807);
const eighth = (): Promise<void> => pokedex.fetchData(810, 898);

// 各世代ごとのボタンをnull判定して関数を実行
isNonNullable(firstBtn) ? (firstBtn.onclick = first) : console.log('firstBtn error');
isNonNullable(secondBtn) ? (secondBtn.onclick = second) : console.log('secondBtn error');
isNonNullable(thirdBtn) ? (thirdBtn.onclick = third) : console.log('thirdBtn error');
isNonNullable(forthBtn) ? (forthBtn.onclick = forth) : console.log('forthBtn error');
isNonNullable(fifthBtn) ? (fifthBtn.onclick = fifth) : console.log('fifthBtn error');
isNonNullable(sixthBtn) ? (sixthBtn.onclick = sixth) : console.log('sixthBtn error');
isNonNullable(seventhBtn) ? (seventhBtn.onclick = seventh) : console.log('seventhBtn error');
isNonNullable(eighthBtn) ? (eighthBtn.onclick = eighth) : console.log('eighthBtn error');
