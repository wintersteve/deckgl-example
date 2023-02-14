import { WashRoom } from "../../types";

interface WashRoomToolTipTemplateProps extends WashRoom {}

const WashRoomToolTipTemplate = ({
  name,
  summer_hours,
  winter_hours,
}: WashRoomToolTipTemplateProps) => {
  const hours =
    summer_hours === winter_hours
      ? summer_hours
      : `
    	<div>Summer ${summer_hours}</div>
    	<div>Winter ${winter_hours}</div>
    `;

  return `    
	  <div><b>${name}</b></div>
	  <div>${hours}</div>
	`;
};

export default WashRoomToolTipTemplate;
