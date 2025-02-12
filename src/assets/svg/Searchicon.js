import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Searchicon = (props) => (
  <Svg
    fill="#ffffff"
    xmlns="http://www.w3.org/2000/svg"
    width="25px"
    height="25px"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 100 100"
    xmlSpace="preserve"
    {...props}
  >
    <Path d="M79.5,74.1L62.9,57.6c3.4-4.7,5.1-10.7,4.2-17.1C65.6,29.8,56.9,21.3,46,20.3c-14.7-1.5-27.2,11-25.7,25.8 c1,10.7,9.5,19.6,20.2,21.1c6.4,0.9,12.3-0.9,17.1-4.2l16.6,16.6c0.7,0.7,1.9,0.7,2.6,0l2.6-2.6C80.2,76.1,80.2,74.9,79.5,74.1z  M27.7,43.7c0-8.8,7.2-16.1,16.1-16.1s16.1,7.2,16.1,16.1s-7.2,16.1-16.1,16.1S27.7,52.7,27.7,43.7z" />
  </Svg>
);
export default Searchicon;
