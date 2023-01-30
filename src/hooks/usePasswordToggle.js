import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);
  const icon = (
    <FontAwesomeIcon
      icon={visible ? faEyeSlash : faEye}
      onClick={() => setVisibility((visibility) => !visibility)}
    />
  );
  const inputType = visible ? "text" : "password";
  return [inputType, icon];
};

export default usePasswordToggle;
