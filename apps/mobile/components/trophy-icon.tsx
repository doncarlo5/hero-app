import React from "react";
import { TrophyLevel1 } from "./trophy-level-1";
import { TrophyLevel2 } from "./trophy-level-2";
import { TrophyLevel3 } from "./trophy-level-3";
import { TrophyLevel4 } from "./trophy-level-4";
import { TrophyLevel5 } from "./trophy-level-5";
import { TrophyLevel6 } from "./trophy-level-6";
import { TrophyLevel7 } from "./trophy-level-7";

type TrophyIconProps = {
	level: number;
	achieved: boolean;
	size?: number; // square size override
	className?: string; // kept for NativeWind compatibility if used by caller
};

const TrophyIcon = ({ level, achieved, ...rest }: TrophyIconProps) => {
	switch (level) {
		case 1:
			return <TrophyLevel1 achieved={achieved} {...rest} />;
		case 2:
			return <TrophyLevel2 achieved={achieved} {...rest} />;
		case 3:
			return <TrophyLevel3 achieved={achieved} {...rest} />;
		case 4:
			return <TrophyLevel4 achieved={achieved} {...rest} />;
		case 5:
			return <TrophyLevel5 achieved={achieved} {...rest} />;
		case 6:
			return <TrophyLevel6 achieved={achieved} {...rest} />;
		case 7:
			return <TrophyLevel7 achieved={achieved} {...rest} />;
		default:
			return null;
	}
};

export default TrophyIcon;
