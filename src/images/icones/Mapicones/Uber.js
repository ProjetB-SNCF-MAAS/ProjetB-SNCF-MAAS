import React from "react";

const Uber = props => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox={props.size}
    >
      <g fill={props.color} fillRule="nonzero">
        <path d="M1.092 3.285c-.341 0-.608-.114-.801-.343C.097 2.713 0 2.399 0 1.999V.249h.485v1.737c0 .274.053.477.159.607.105.13.254.195.448.195a.54.54 0 00.451-.2c.104-.133.156-.333.156-.602V.249h.485v1.75c0 .4-.097.714-.29.943-.194.229-.461.343-.802.343zM3.681.944c.159 0 .3.048.421.145a.969.969 0 01.285.414c.069.179.103.386.103.62 0 .363-.08.647-.241.851a.788.788 0 01-.656.307.838.838 0 01-.228-.03 1.152 1.152 0 01-.243-.107v.09h-.485V0h.485v1.214a.712.712 0 01.559-.27zm-.136 1.861c.152 0 .262-.054.331-.163.068-.109.103-.285.103-.528 0-.231-.028-.403-.085-.514a.278.278 0 00-.265-.168c-.171 0-.34.092-.507.275v1.046a.778.778 0 00.195.043c.064.006.14.009.228.009zM6.534 2.286H5.2a.653.653 0 00.163.395c.09.091.209.137.359.137.11 0 .23-.024.358-.071a1.39 1.39 0 00.359-.195h.015v.459a1.082 1.082 0 01-.736.274.969.969 0 01-.526-.141.915.915 0 01-.345-.408 1.481 1.481 0 01-.122-.622c0-.231.039-.436.116-.613a.958.958 0 01.325-.412.832.832 0 01.486-.145c.179 0 .335.047.469.141.133.094.236.23.307.408.071.177.106.384.106.621v.172zm-.882-.888a.367.367 0 00-.289.133.747.747 0 00-.156.369h.827a.772.772 0 00-.125-.373.302.302 0 00-.257-.129zM7.884.944v.557h-.063a.626.626 0 00-.467.185v1.548h-.485V1.493L6.788.995h.486l.047.296c.081-.129.155-.219.221-.27a.348.348 0 01.221-.077h.121z"></path>
      </g>
    </svg>
  );


export default Uber;