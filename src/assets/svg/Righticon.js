
/* SVGR has dropped some elements not supported by react-native-svg: title */
import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const Righticon = (props) => (
  <Svg
    width="48px"
    height="48px"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={48} height={48} fill="white" fillOpacity={0.01} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 24L9 19L19 29L39 9L44 14L19 39L4 24Z"
      fill="#ffffff"
      stroke=""
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


export default Righticon;
