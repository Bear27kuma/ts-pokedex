// jQueryでローダーを操作するためのクラス
export class Loader {
  elem: JQuery<HTMLElement>;

  constructor(elem: JQuery<HTMLElement>) {
    this.elem = elem;
  }

  // フェードインメソッド
  fadeIn() {
    this.elem.fadeIn();
  }

  // フェードアウトメソッド
  fadeOut() {
    this.elem.fadeOut();
  }
}
