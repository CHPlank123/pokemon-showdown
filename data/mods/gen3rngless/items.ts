export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	brightpowder: {
		inherit: true,
		onModifyAccuracy: undefined,
		desc: "No effect in this format.",
		shortDesc: "No effect in this format.",
	},
	focusband: {
		inherit: true,
		onDamage: undefined,
		desc: "No effect in this format.",
		shortDesc: "No effect in this format.",
	},
	kingsrock: {
		inherit: true,
		onModifyMove: undefined,
		desc: "No effect in this format.",
		shortDesc: "No effect in this format.",
	},
	laxincense: {
		inherit: true,
		onModifyAccuracy: undefined,
		desc: "No effect in this format.",
		shortDesc: "No effect in this format.",
	},
	quickclaw: {
		inherit: true,
		onFractionalPriority: undefined,
		desc: "No effect in this format.",
		shortDesc: "No effect in this format.",
	},
	figyberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		desc: "At the end of the turn, if the holder has 1/2 or less of its maximum HP, restores 1/8 of its maximum HP. Does not cause confusion. Single use.",
		shortDesc: "At 1/2 HP or less, restores 1/8 max HP at turn's end. No confusion. Single use.",
	},
	iapapaberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		desc: "At the end of the turn, if the holder has 1/2 or less of its maximum HP, restores 1/8 of its maximum HP. Does not cause confusion. Single use.",
		shortDesc: "At 1/2 HP or less, restores 1/8 max HP at turn's end. No confusion. Single use.",
	},
	magoberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		desc: "At the end of the turn, if the holder has 1/2 or less of its maximum HP, restores 1/8 of its maximum HP. Does not cause confusion. Single use.",
		shortDesc: "At 1/2 HP or less, restores 1/8 max HP at turn's end. No confusion. Single use.",
	},
};
