import { isPokemonEx } from './pokemon-ex';
import type { Pokemon } from '../../../sim/pokemon';

function isDelta(pokemon: Pokemon): boolean {
	return pokemon.species.forme === 'Delta';
}
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {


shadymove: {
	name: "Shady Move",
	gen: 3,
	rating: 2,
	desc: "Takes 1/16 of the foe's max HP at the end of each turn, and heals the user for that amount.",
	shortDesc: "Takes 1/16 of the foe's max HP at the end of each turn, and heals recipiant.",
	onResidual(pokemon) {
		const target = pokemon.side.foe.active[pokemon.position];
		if (!target || target.fainted || target.hp <= 0) return;

		const damage = this.damage(target.maxhp / 16, target, pokemon);
		if (damage) {
			this.heal(damage, pokemon, pokemon);
		}
	},
},

disguise: {
	inherit: true,
	gen: 3,
	onDamagePriority: 1,
	onDamage(damage, target, source, effect) {
		if (effect?.effectType !== 'Move' || this.effectState.busted) return;

		this.add('-activate', target, 'ability: Disguise');
		this.effectState.busted = true;
		return 0;
	},
},


	overzealous: {
		name: "Overzealous",
		gen: 3,
		rating: 3,
		desc: "This Pokemon's damaging moves do 30% more damage to Pokemon that are considered EX.",
		shortDesc: "This Pokemon's damaging moves do 30% more damage to Pokemon that are considered EX.",
		onBasePower(basePower, pokemon, target, move) {
			if (!target || move.category === 'Status' || !isPokemonEx(target)) return;
			return this.chainModify([13, 10]);
		},
	},
shieldveil: {
	name: "Shield Veil",
	gen: 3,
	rating: 3,
	desc: "This Pokemon and its allies are immune to super-effective moves.",
	onAnyEffectiveness(typeMod, target) {
		if (typeMod <= 0 || !target) return;

		const allyHasShieldVeil = target.side.active.some(pokemon =>
			pokemon && !pokemon.fainted && pokemon.hasAbility('shieldveil')
		);
		if (allyHasShieldVeil) return 0;
	},
},

deltaprotection: {
	name: "Delta Protection",
	gen: 3,
	rating: 3,
	shortDesc: "Reduces damage from opposing moves by 40% if the user is a Delta Pokemon.",
	onSourceModifyDamage(damage, source) {
		if (isDelta(source)) {
			return this.chainModify([4, 10]);
		}
	},
},

battleaura: {
	name: "Battle Aura",
	gen: 3,
	rating: 3,
	desc: "Add's 10% to the user's Attack and Special Attack for each Delta Pokemon in your party.",
	shortDesc: "Add's 10% to the user's ATK and SPA for each δ Pokemon in your party.",
	onModifyAtk(atk, pokemon) {
		const deltaCount = pokemon.side.pokemon.filter(
  		ally => !ally.fainted && isDelta(ally)
		).length;
 
		if (deltaCount) return this.chainModify([10 + deltaCount, 10]);
	},

	onModifySpA(spa, pokemon) {
		const deltaCount = pokemon.side.pokemon.filter(
			ally => !ally.fainted && isDelta(ally)
		).length;

		if (deltaCount) return this.chainModify([10 + deltaCount, 10]);
	},
},
energyjump: {
	name: "Energy Jump",
	gen: 3,
	rating: 2,
	onResidual(pokemon) {
		const party = pokemon.side.pokemon;

		const donors = party.flatMap(ally =>
			ally.moveSlots
				.filter(slot => slot.pp > 1)
				.map(slot => ({ally, slot}))
		);
		if (!donors.length) return;

		const donor = this.sample(donors);
		const recipients = party.flatMap(ally =>
			ally !== donor.ally
				? ally.moveSlots
					.filter(slot => slot.pp < slot.maxpp)
					.map(slot => ({ally, slot}))
				: []
		);
		if (!recipients.length) return;

		const recipient = this.sample(recipients);
		donor.slot.pp--;
		recipient.slot.pp++;
	},
},
crushdraw: {
	name: "Crush Draw",
	gen: 3,
	rating: 2,
	onResidual(pokemon) {
		if (!this.randomChance(1, 2)) return;

		const moves = pokemon.moveSlots.filter(slot => slot.pp < slot.maxpp);
		if (!moves.length) return;

		this.sample(moves).pp++;
	},
},

deltacontrol: {
	name: "Delta Control",
	gen: 3,
	rating: 2,
	onResidual(pokemon) {
		const moves = pokemon.moveSlots.filter(slot => slot.pp < slot.maxpp);
		if (!moves.length) return;

		this.sample(moves).pp++;
	},
},

bedhead: {
	name: "Bedhead",
	gen: 3,
	rating: 2,
	onResidual(pokemon) {
		if (pokemon.status !== 'slp') return;

		const target = pokemon.side.foe.active[pokemon.position];
		if (!target || target.fainted) return;

		this.damage(target.maxhp / 8, target, pokemon, this.effect);
	},
},

dozing: {
	name: "Dozing",
	gen: 3,
	rating: 2,
	onResidual(pokemon) {
		if (pokemon.status !== 'slp') return;

		this.heal(pokemon.maxhp / 8, pokemon, pokemon, this.effect);
	},
},

};

