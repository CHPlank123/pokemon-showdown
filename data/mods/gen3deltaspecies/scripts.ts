export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3',
	gen: 3,

	pokemon: {
		inherit: true,

		ignoringAbility() {
			if (
				this.volatiles['abilityimprison'] &&
				!this.hasItem('Ability Shield') &&
				!this.getAbility().flags['cantsuppress']
			) {
				return true;
			}
			return Object.getPrototypeOf(this).ignoringAbility.call(this);
		},

		getMoveRequestData() {
			const request = Object.getPrototypeOf(this).getMoveRequestData.call(this);

			if (!this.trapped || this.getLockedMove()) return request;
			if (!this.hasType('Fire') && !this.hasType('Psychic')) return request;

			const hasBenchedThermalShift = this.side.pokemon
				.slice(this.side.active.length)
				.some(pokemon => !pokemon.fainted && pokemon.hasAbility('thermalshift'));

			if (hasBenchedThermalShift) delete request.trapped;
			return request;
		},
	},

	side: {
		inherit: true,

		chooseSwitch(slotText) {
			const originalChooseSwitch = Object.getPrototypeOf(this).chooseSwitch;
			const activePokemon = this.active[this.getChoiceIndex()];

			const slot = slotText && /^\d+$/.test(slotText) ? Number(slotText) - 1 : -1;
			const replacement = this.pokemon[slot];

			const canThermalShift =
				this.requestState === 'move' &&
				!!activePokemon?.trapped &&
				(activePokemon.hasType('Fire') || activePokemon.hasType('Psychic')) &&
				!!replacement &&
				!replacement.fainted &&
				replacement.hasAbility('thermalshift');

			if (!canThermalShift) {
				return originalChooseSwitch.call(this, slotText);
			}

			const wasTrapped = activePokemon.trapped;
			activePokemon.trapped = false;
			try {
				return originalChooseSwitch.call(this, slotText);
			} finally {
				activePokemon.trapped = wasTrapped;
			}
		},
	},
};