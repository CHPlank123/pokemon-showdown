

export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	abilityimprison: {
		name: "Imprison",
		onStart(target) {
			this.add('-start', target, 'ability: Imprison');
			this.add('-endability', target);
			this.singleEvent('End', target.getAbility(), target.abilityState, target, target, 'abilityimprison');

			for (const id of Object.keys(target.volatiles)) {
				if (id.startsWith('ability:')) target.removeVolatile(id);
			}
		},
	},
};


