import { useEffect, useState } from "react";
const babel = require("@babel/core");

function Sample() {
  const [text, setText] = useState();

  // get the code
  useEffect(() => {
    const jsxCodeText = fetch(
      "https://firebasestorage.googleapis.com/v0/b/lwongconsulting-37781.appspot.com/o/sample_components%2Fs1.js?alt=media&token=95bee071-ffdf-472f-8cd9-96cc442f8302"
    )
      .then((res) => res.text())
      .then((txt) => {
        setText(txt);
      });

    console.log(jsxCodeText);
  }, []);

  useEffect(() => {
    babel.transform(text);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      {text ? <div> {text}</div> : <div> Currently empty</div>}
    </div>
  );
}

export default Sample;
