// PokeAPIのベースURL
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// PokeAPIで使用するpokemonオブジェクトの型定義
interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  type: string;
  species: {
    url: string;
  };
  types: { type: { name: string; url: string } }[];
}

// タイプ情報の型定義
interface Types {
  names: { name: string }[];
}

// レスポンスを整形したオブジェクトの型定義
interface ResponsePokemon {
  id: number;
  name: string;
  image: string;
  species: string;
  types: { type: { name: string; url: string } }[];
}

// 非同期処理の実行完了後の値を型定義する
type FetchPokemon = (id: number) => Promise<void | null>;
type FetchType = (typesUrl: string[]) => Promise<string[] | null>;

export default class Pokedex {
  // pokemonsプロパティを定義
  pokemons: number;

  // constructorで初期化する
  constructor(pokemons: number) {
    this.pokemons = pokemons;
  }

  fetchData(): void {
    for (let i = 1; i <= this.pokemons; i++) {
      void this.getPokemon(i);
    }
  }

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

    const json: Pokemon | null = await response
      .json()
      .then((json: Pokemon) => {
        console.log(json);
        return json;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (!json) {
      return null;
    }

    // レスポンスを整形する
    const responsePokemon: ResponsePokemon = {
      id: json.id,
      name: json.name,
      image: json.sprites.front_default,
      species: json.species.url,
      types: json.types,
    };

    // タイプのURLを格納する配列
    const typesUrl: string[] = [];

    // レスポンスからタイプの情報を抜き出す
    responsePokemon.types.forEach((types: { type: { url: string } }) => {
      Object.keys(types).forEach((category: string) => {
        if (category === 'type') {
          typesUrl.push(types[category]['url']);
        }
      });
    });

    // タイプの日本語名を取得する
    const types: string[] | null = await this.getJpTypes(typesUrl);
    console.log(types);

    // const pokemon = await data.json();
    // const pokemonType: string = pokemon.types
    //   .map((poke: any) => poke.type.name)
    //   .join(', ');
  };

  // タイプの日本語を取得する
  private getJpTypes: FetchType = async (typesUrl: string[]) => {
    const jpTypes: string[] = [];

    // ループで各URLをfetchして日本語名を配列にpushする
    for (const url of typesUrl) {
      const response: Response | null = await fetch(url)
        .then((res) => res)
        .catch((error) => {
          console.error(error);
          return null;
        });

      if (!response) {
        return null;
      }

      const json: Types | null = await response
        .json()
        .then((json: Types) => {
          console.log(json);
          return json;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });

      if (!json) {
        return null;
      }

      jpTypes.push(json.names[0].name);
    }

    return jpTypes;
  };
}
