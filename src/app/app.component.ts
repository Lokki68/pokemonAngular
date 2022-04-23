import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemons-list';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon | undefined;

  ngOnInit() {
    console.table(this.pokemonList);
  }

  selectPokemon(pokemonId: number) {
    const pokemon: Pokemon | undefined = this.pokemonList.find(
      (pokemon) => pokemon.id === +pokemonId
    );

    if (pokemon) {
      this.pokemonSelected = pokemon;
      console.log(`Vous avez sélectionné ${pokemon.name}`);
    } else {
      this.pokemonSelected = undefined;
      console.log(`Vous avez demandé un Pokemon qui n'existe pas`);
    }
  }
}
