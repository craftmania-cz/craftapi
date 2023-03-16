interface EconomyLevelPlayer {
	nick: string;
	uuid: string;
	groups: any;

	// Active servers
	creative_level: number;
	creative_experience: number;
	survival_118_level: number;
	survival_118_experience: number;
	skyblock_118_level: number;
	skyblock_118_experience: number;
	vanilla_level: number;
	vanilla_experience: number;

	// Legacy servers
	survival_level: number;
	survival_experience: number;
	skyblock_level: number;
	skyblock_experience: number;
	vanilla_116_level: number;
	vanilla_116_experience: number;
	skycloud_level: number;
	skycloud_experience: number;
	hardcore_vanilla_level: number;
	hardcore_vanilla_experience: number;
	prison_level: number;
	prison_experience: number;
}

export default EconomyLevelPlayer;
