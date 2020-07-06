const presets = [
    [
      "@babel/env",
      {
        targets: {
              edge: "15",
              ie: "11",
              firefox: "50",
              chrome: "64",
              and_chr: "80",
              safari: "11.1",
        },
        useBuiltIns: "usage",
        corejs: "3.1.4",
        "targets": {
          "esmodules": true,
           "ie": "11"
        }
      }
    ],
  ];

  module.exports = { presets };