import React from "react";
const { NodeVM } = require("vm2");

function Sample() {
  const vm = new NodeVM({
    require: {
      external: true,
    },
  });

  vm.run(
    `
    var request = require('request');
    request('http://www.google.com', function (error, response, body) {
        console.error(error);
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
        }
    })
`,
    "vm.js"
  );
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      Hello
    </div>
  );
}

export default Sample;
