import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    fill="#ffffff"
    width="30px"
    height="30px"
    viewBox="-2 -9 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    className="jam jam-more-horizontal-f"
    {...props}
  >
    <Path d="M3 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm14 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-7 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </Svg>
);
export default SVGComponent;
