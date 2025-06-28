import { TrophyLevel1 } from "./TrophyLevel";
import { TrophyLevel2 } from "./TrophyLevel";
import { TrophyLevel3 } from "./TrophyLevel";
import { TrophyLevel4 } from "./TrophyLevel";
import { TrophyLevel5 } from "./TrophyLevel";
import { TrophyLevel6 } from "./TrophyLevel";
import { TrophyLevel7 } from "./TrophyLevel";

interface TrophyIconProps {
  level: number;
  achieved: boolean;
  className?: string;
}

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
