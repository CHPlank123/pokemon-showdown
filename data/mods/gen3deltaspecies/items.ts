import { isPokemonEx } from './pokemon-ex';
export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	switch: {
		name: "Switch",
		spritenum: 437,
		fling: { basePower: 10 },
		gen: 3,
		desc: "Allows the holder to switch out even when trapped.",
		shortDesc: "Holder can switch out even when trapped.",
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = false;
		},
		onMaybeTrapPokemonPriority: -10,
		onMaybeTrapPokemon(pokemon) {
			pokemon.maybeTrapped = false;
		},
	},
	hermitscroll	: {
		name: "Hermit's Scroll",
		spritenum: 437,
		gen: 3,},
stoneenergy: {
		name: "Stone Energy",
		spritenum: 437,
		gen: 3},

	crystalshard: { 
		name : "Crystal Shard",
		spritenum: 300,
		gen: 3,
	},

	windstorm: {
		name: "Windstorm",
		spritenum: 437,
		gen: 3,
		desc: "When a foe damages the holder, removes the attacker's item and the items of adjacent foes.",
	shortDesc: "When hit by a foe's damaging move, removes items from adjacent foes.",
	onDamagingHit(damage, target, source) {
		if (damage <= 0 || source.isAlly(target)) return; 
		for (const foe of target.adjacentFoes()) {
			const item = foe.takeItem(target);
			if (!item) continue;

			this.add('-enditem', foe, item, '[from] item: Windstorm', `[of] ${target}`);
		}
	},condition: {
	onDamagingHit(damage, target, source) {
	if (!source.item) return;

	source.takeItem();
	target.useItem();

	},
},
	
	},
cessationcrystal: {
		name: "Cessation Crystal",
		spritenum: 437,
		gen: 3,},

holonfield: {
		name: "Holon Field",
		spritenum: 60,
		gen: 3,
		desc: "Everyone's Normal-type moves become Steel-type moves.",
		shortDesc: "Everyone's Normal-type moves become Steel-type moves.",
		onStart(pokemon) {
		pokemon.addVolatile('holonfield');
	},

	condition: {
		onModifyMove(move) {
			if (move.type === 'Normal') {
				move.type = 'Steel';
			}
		},
	},
	
	},
darkball: {
		name: "Dark Ball",
		spritenum: 224,
		gen: 3,
		onBasePower(basePower, pokemon, target, move) {
		if (move.category !== 'Status') {
			return this.chainModify([11, 10]);
		}
	},
	onResidual(pokemon) {
		if (!pokemon.hasType('Dark')) {
			this.damage(pokemon.maxhp / 16, pokemon);
		}
	},

	},
	steelbox: {
		name: "Steel Box",
		spritenum: 286,
		gen: 3,
		onBasePower(basePower, pokemon, target, move) {
		if (move.category !== 'Status') {
			return this.chainModify([11, 10]);
		}
	},
	onResidual(pokemon) {
		if (!pokemon.hasType('Steel')) {
			this.damage(pokemon.maxhp / 16, pokemon);
		}
	},
	},
	

	embershard: {
		name: "Ember Shard",
		spritenum: 142,
		gen: 3,
		
	onEffectiveness(typeMod, target, type, move) {
		if (!target || isPokemonEx(target)) return;
		if (!target || move.category === 'Status' || typeMod <= 0) return;

		const hasUsableFireMove = target.moveSlots.some(slot =>
			slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Fire'
		);
		if (hasUsableFireMove) return 0;
	},

	
	onModifyMove(move, pokemon, target) {
		if (!pokemon || isPokemonEx(pokemon)) return;
		if (move.type !== 'Fighting' || move.category === 'Status') return;

		const hasUsableFightingMove = pokemon.moveSlots.some(slot =>
			slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Fighting'
		);
		if (hasUsableFightingMove) move.ignoreImmunity = true;
	},



	onBasePower(basePower, user, target, move) {
		if (!user || !target || isPokemonEx(user)) return;
		if (!target || move.type !== 'Fighting' || move.category === 'Status') return;

		const hasUsableFightingMove = user.moveSlots.some(slot =>
			slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Fighting'
		);
		if (!hasUsableFightingMove) return;

		const typeMod = target.getMoveHitData(move).typeMod;
		if (typeMod < 0) return this.chainModify(2 ** -typeMod);
	},
},
	voltshard: {
		name: "Volt Shard",
		spritenum: 492,
		gen: 3,
		onSetStatus(status, target) {
	if (isPokemonEx(target)) return;
	const hasGrassPP = target.moveSlots.some(slot =>
		slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Grass'
	);
	if (hasGrassPP) return false;
},

onSourceModifyDamage(damage, target, source) {
	if (isPokemonEx(target)) return;
	if (!isPokemonEx(source)) return;

	const hasElectricPP = target.moveSlots.some(slot =>
		slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Electric'
	);
	if (hasElectricPP) {
		return this.chainModify(0.9);
	}
},
		
},
	waveshard: {
		name: "Wave Shard",
		spritenum: 529,
		gen: 3,
		desc: "Holder has a Water move >= 1 PP, block secondary effects from moves that hit it. If the holder has a Psychic move >= 1 PP, Can't be trapped in.",
		shortDesc: "Holder has a Water move >= 1 PP, block secondary effects from moves that hit it. If the holder has a Psychic move >= 1 PP, Can't be trapped in.",
		
	onModifySecondaries(secondaries, target, source, move) {
		if (!target || isPokemonEx(target)) return;
		if (move.type !== 'Water' || move.category === 'Status') return;

		const hasWaterMoveWithPP = target.moveSlots.some(slot =>
			slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Water'
		);
		if (hasWaterMoveWithPP) {
			return secondaries.filter(effect => !!effect.self);
		}
	},

	onTrapPokemonPriority: -10,
	onTrapPokemon(pokemon) {
		if (isPokemonEx(pokemon)) return;
		const hasPsychicMoveWithPP = pokemon.moveSlots.some(slot =>
			slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Psychic'
		);
		if (hasPsychicMoveWithPP) pokemon.trapped = false;
	},

	onMaybeTrapPokemonPriority: -10,
	onMaybeTrapPokemon(pokemon) {
		if (isPokemonEx(pokemon)) return;
		const hasPsychicMoveWithPP = pokemon.moveSlots.some(slot =>
			slot.pp > 0 && this.dex.moves.get(slot.id).type === 'Psychic'
		);
		if (hasPsychicMoveWithPP) pokemon.maybeTrapped = false;
	},
	},
bufferpiece: {
		name: "Buffer Piece",
		gen: 3,
		spritenum: 747,
		desc: "If holder is hit by a move that would KO it, the holder survives with 1/8 max HP. Single use.",
		shortDesc: "Would KO, survives with 1/8 max HP. Single use.",
		onDamage: undefined, // no inherit
		onTryHit(target, source, move) {
			if (target !== source && target.hp === target.maxhp) {
				target.addVolatile('bufferpiece');
			}
		},
		condition: {
			duration: 1,
			onDamage(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && damage >= target.hp) {
					this.effectState.activated = true;
					return target.hp - Math.max(1, Math.floor(target.maxhp / 8));							
				}
			},
			onAfterMoveSecondary(target) {
				if (this.effectState.activated) target.useItem();
				target.removeVolatile('bufferpiece');
			},
		},
	},
	


strengthcharm: {
        name: "Strength Charm",
        gen: 3,
        shortDesc: "Raises a Pokémon's Attack and Special Attack by 10%.",

        onModifyAtk(atk, user, target, move) {
          
                return this.chainModify(1.1);
},

        onModifySpA(spa, user, target, move) {
            
                return this.chainModify(1.1);
            
        },
    },

	thickclub: {
		inherit: true,
		name: "Thick Club",
		gen: 3,
		itemUser: ["Marowak", "Cubone","Marowakdelta"],
		desc: "Holder's Attack is doubled.",
		shortDesc: "Holder's Attack is doubled.",
		
		onModifyAtk(atk, user, target, move) {
           if (user.species.baseSpecies === 'Marowak' || user.species.baseSpecies === 'Cubone' ) {
                return this.chainModify(2.0);
	}

},



},

}
