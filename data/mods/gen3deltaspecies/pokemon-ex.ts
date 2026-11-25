import type { Pokemon } from '../../../sim/pokemon';

export function isPokemonEx(pokemon: Pokemon): boolean {
	const species = pokemon.species;

	return !!species.isMega ||
		species.bst >= 600 ||
		species.tags.some(tag =>
			tag === 'Mythical' ||
			tag === 'Restricted Legendary' ||
			tag === 'Sub-Legendary' ||
			tag === 'Ultra Beast'
		);
}