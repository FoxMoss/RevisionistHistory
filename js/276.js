"use strict";
(self.webpackChunkrevision_history_chrome_ext =
  self.webpackChunkrevision_history_chrome_ext || []).push([
  [276],
  {
    2276: (e) => {
      e.exports = function () {
        throw new Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object",
        );
      };
    },
  },
]);
