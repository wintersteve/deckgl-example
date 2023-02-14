import { Property } from "../../types";
import { round } from "../../utils";

interface PropertiesToolTipTemplateProps extends Property {}

const PropertiesToolTipTemplate = ({
  growth,
  valuePerSqm,
}: PropertiesToolTipTemplateProps) => {
  return `    
    <div><b>Average Property Value</b></div>
    <div>${valuePerSqm} / m<sup>2</sup></div>
    <div>Growth ${round(growth * 100)}%</div>
	`;
};

export default PropertiesToolTipTemplate;
