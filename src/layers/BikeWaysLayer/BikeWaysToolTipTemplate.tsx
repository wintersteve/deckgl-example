import { round } from "../../utils";
import { BikeWay } from "../../types";

interface BikeWaysToolTipTemplateProps extends BikeWay {}

const BikeWaysToolTipTemplate = ({
  bike_route_name,
  street_name,
  segment_length,
}: BikeWaysToolTipTemplateProps) => {
  return `    
    <div><b>${bike_route_name}</b></div>
    <div>${street_name}</div>
    <div>Length ${round(segment_length)}m</div>
	`;
};

export default BikeWaysToolTipTemplate;
