import React from "react";

function AddProperty(props) {
  const uniqueKeyAddPropertyName = `${props.path}_${props.id}_add_property_name`;
  const uniqueKeyAddPropertyValue = `${props.path}_${props.id}_add_property_value`;

  const add_title = document.getElementById(uniqueKeyAddPropertyName);
  const add_value = document.getElementById(uniqueKeyAddPropertyValue);
  return <div></div>;
}

export default AddProperty;
