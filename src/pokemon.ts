import { isNonNullable } from './index';

// PokeAPIのベースURL
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Pokedexクラスのためのインターフェース定義
interface PokedexData {
  pokemons: number;
  container: HTMLElement;
}

// PokeAPIで使用するpokemonオブジェクトの型定義
interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  type: string;
  species: {
    url: string;
  };
  types: { type: { name: string; url: string } }[];
}

// 日本語情報の型定義
interface JapaneseName {
  names: { name: string }[];
}

// ベースとなるポケモンデータ型
interface PokemonData {
  id: number;
  name: string;
  image: string;
}

// レスポンスを整形したオブジェクトの型定義
interface ResponsePokemon extends PokemonData {
  species: string;
  types: { type: { name: string; url: string } }[];
}

// 表示用に整形したポケモンデータ
interface FormattedPokemon extends PokemonData {
  typeList: string[];
}

// 非同期処理の実行完了後の値を型定義する
type FetchPokemon = (id: number) => Promise<void | null>;
type FetchJapaneseName = (url: string) => Promise<string | null>;

export default class Pokedex implements PokedexData {
  // pokemonsプロパティを定義
  pokemons: number;
  container: HTMLElement;

  // constructorで初期化する
  constructor(pokemons: number, container: HTMLElement) {
    this.pokemons = pokemons;
    this.container = container;
  }

  // 指定した回数ポケモン情報取得のメソッドを実行する
  // 先行して先のIDの処理が走ってしまわないように非同期処理にする
  fetchData: () => Promise<void> = async () => {
    for (let i = 1; i <= this.pokemons; i++) {
      await this.getPokemon(i);
    }
  };

  // 表示させるためのポケモン情報を取得する
  // Promise型を定義したので、async/awaitを使ってAPI処理を記述
  private getPokemon: FetchPokemon = async (id: number) => {
    const response: Response | null = await fetch(`${baseUrl}${id}`)
      .then((res) => res)
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (!response) {
      return null;
    }

    // レスポンスをJSONオブジェクトとしてパースする
    const json: Pokemon | null = await response
      .json()
      .then((json: Pokemon) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (!json) {
      return null;
    }

    // JSONオブジェクトを整形する
    const responsePokemon: ResponsePokemon = {
      id: json.id,
      name: json.name,
      image: json.sprites.other['official-artwork'].front_default,
      species: json.species.url,
      types: json.types,
    };

    // ポケモンの日本語名を取得する
    const japaneseName = await this.getJapaneseName(responsePokemon.species);
    let name = String();
    if (isNonNullable(japaneseName)) {
      name = japaneseName;
    }

    // タイプのURLを格納する配列
    const typeUrlList: string[] = [];

    // レスポンスからタイプの情報を抜き出す
    responsePokemon.types.forEach((types: { type: { url: string } }) => {
      Object.keys(types).forEach((category: string) => {
        if (category === 'type') {
          typeUrlList.push(types[category]['url']);
        }
      });
    });

    // タイプの日本語名を取得する
    const typeList: Array<string | null> = [];
    for (const url of typeUrlList) {
      const typeName = await this.getJapaneseName(url);
      typeList.push(typeName);
    }

    // タイプの配列の値を表示用にnull判定する
    const types: string[] = [];
    typeList.forEach((type: string | null) => {
      if (isNonNullable(type)) {
        types.push(type);
      }
    });
    // const formattedType: string = types.map((type: string | null) => type).join(', ');

    // 表示用のデータを整形する
    const formattedPokemon: FormattedPokemon = {
      id: responsePokemon.id,
      name: name,
      image: responsePokemon.image,
      typeList: types,
    };

    console.log(formattedPokemon);
    this.createPokemonCard(formattedPokemon);
  };

  // 日本語情報を取得する
  private getJapaneseName: FetchJapaneseName = async (url: string) => {
    // 引数で渡されたURLをfetchして日本語名を取得する
    const response: Response | null = await fetch(url)
      .then((res) => res)
      .catch((error) => {
        console.log(error);
        return null;
      });

    if (!response) {
      return null;
    }

    const json: JapaneseName | null = await response
      .json()
      .then((json: JapaneseName) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    if (!json) {
      return null;
    }

    return json.names[0].name;
  };

  // ポケモンを表示させるカードパーツを作成する
  createPokemonCard = (pokemon: FormattedPokemon) => {
    let typesElement = String();
    pokemon.typeList.forEach((type: string) => {
      typesElement += `<span class="card-types">${type}</span>`;
    });

    // TODO: 一つ目のタイプをクラスとして付与させる
    const card = `
      <div class="card">
        <span class="card-id">#${pokemon.id}</span>
        <img class="card-image" src=${pokemon.image} alt=${pokemon.name} />
        <h2 class="card-name">${pokemon.name}</h2>
        ${typesElement}
      </div>
    `;

    this.container.innerHTML += card;
  };
}
