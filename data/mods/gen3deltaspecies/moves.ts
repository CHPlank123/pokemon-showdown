import { isPokemonEx } from './pokemon-ex';
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {


darkswirl: {
		name: "Dark Swirl",
		accuracy: 90,
		basePower: 150,
		category: "Special",
		pp: 5,
		priority: 0,
		target: "normal",
		flags: {protect: 1, mirror: 1},
		type: "Dark",
		self: {
			boosts: {
				spa: -2,
			},
		},
		desc:"150 base power Dark-type special attack. Lowers the user's Special Attack by 2 stages.",
		shortDesc: "150 base power Dark-type. Lowers the user's Special Attack by 2 stages.",
	gen: 3,
		
},


rotatingclaws: {
	name: "Rotating Claws",
	type: "Dark",
	accuracy: 100,
	basePower: 80,
	category: "Special",
	pp: 10,
	priority: 0,
	target: "normal",
	flags: {
		protect: 1,
		mirror: 1,
		contact: 1,
		
	},
	secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},

},
gen: 3,

},
firedance: {
		
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Fire Dance",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, dance: 1, },
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		gen: 3,
	},
	copycat: {
		name: "Copycat",
		accuracy: true,	
		type: "Normal",
		basePower: 0,
		category: "Status",
		
		pp: 20,
		priority: 0,
		flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1 },
		onHit(pokemon) {
			let move: Move | ActiveMove | null = this.lastMove;
			if (!move) return;

			if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
			if (move.flags['failcopycat'] || move.isZ || move.isMax) {
				return false;
			}
			this.actions.useMove(move.id, pokemon);
		},
		callsMove: true,
		target: "self",
		
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute",
		gen: 3,
	},
metalcrusher: {
		name: "Metal Crusher",
		accuracy: 100,	
		basePower: 80,
		category: "Physical",
		pp: 10,
		priority: 0,	
		flags: { contact: 1, protect: 1, mirror: 1, },
		target: "normal",
		type: "Ground",
		desc: "120 base power if the target is steel type, 80 base power if not.",
		shortDesc: "120 base power if the target is steel type, 80 base power if not.",
		onBasePower(basePower, pokemon, target, ) {
			if (target.hasType('Steel')) 
					return 120;				
			
		},
		gen: 3,
},
bigbite: {
		
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Big Bite",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1,  },
		onHit(target, source, move) {
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Big Bite', `[of] ${source}`);
				if (this.singleEvent('Eat', item, target.itemState, source, source, move)) {
					this.runEvent('EatItem', source, source, move, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		target: "normal",
		type: "Bug",
		contestType: "Cute",
		gen: 3
	},
	
}