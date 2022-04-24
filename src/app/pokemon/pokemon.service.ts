import { Injectable } from '@angular/core';
import {Pokemon} from "./pokemon";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";

@Injectable()
export class PokemonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getPokemonList(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap(res => this.log(res)),
      catchError(err => this.handleError(err, []))
    )
    //return POKEMONS;
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap(res => this.log(res)),
      catchError(err => this.handleError(err, undefined))
    )
    //return POKEMONS.find(pokemon => pokemon.id == pokemonId);
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1){
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}` ).pipe(
      tap(res => this.log(res)),
      catchError(err => this.handleError(err,  []))
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.post<Pokemon>('api/pokemons', pokemon, this.httpOptions).pipe(
      tap(res => this.log(res)),
      catchError(err => this.handleError(err,  null))
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<null>{

    return this.http.put('api/pokemons', pokemon, this.httpOptions).pipe(
      tap(res => this.log(res)),
      catchError(err => this.handleError(err,  null))
    );
  };

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap(res => this.log(res)),
      catchError(err => this.handleError(err, null))
    )
  }

  private log(res: any){
    console.table(res);
  }

  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[]{
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Combat',
      'Psy'
    ];
  }
}
