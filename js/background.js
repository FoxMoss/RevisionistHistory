(() => {
  "use strict";
  var e = "revHistoryAccessToken",
    o = function () {
      try {
        return "true" === localStorage.getItem("RH_DEBUG_ENABLED");
      } catch (e) {
        return !1;
      }
    },
    t = {},
    n = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      o() && console.log.apply(console, e);
    },
    s = function (e) {
      for (var n = [], s = 1; s < arguments.length; s++)
        n[s - 1] = arguments[s];
      t[e] || (t[e] = 0),
        t[e]++,
        !o() ||
          (1 !== t[e] && t[e] % 100 != 0) ||
          console.log.apply(
            console,
            (function (e, o, t) {
              if (t || 2 === arguments.length)
                for (var n, s = 0, r = o.length; s < r; s++)
                  (!n && s in o) ||
                    (n || (n = Array.prototype.slice.call(o, 0, s)),
                    (n[s] = o[s]));
              return e.concat(n || Array.prototype.slice.call(o));
            })(["[".concat(e, " - count: ").concat(t[e], "]")], n, !1),
          );
    },
    r = function () {
      for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
      console.info.apply(console, e);
    },
    a = function () {
      for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
      console.warn.apply(console, e);
    },
    c = [];
  chrome.storage.session.setAccessLevel({
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
  }),
    chrome.runtime.onInstalled.addListener(function () {
      chrome.runtime.setUninstallURL("https://forms.gle/bf1G5rGMrw1PW9UC9");
    });
  var i = function () {
    n("🔄 Reloading active tab after authentication"),
      chrome.tabs.query({ active: !0, currentWindow: !1 }, function (e) {
        if (e.length > 0) {
          var o = e[0].id;
          o && chrome.tabs.sendMessage(o, { action: "reloadPageAfterAuth" });
        }
      });
  };
  chrome.runtime.onMessage.addListener(function (o, t, u) {
    var l;
    if (
      (s("message-received", "Received message", o.action),
      "getCurrentTab" === o.action)
    )
      return (
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          u({ tab: e[0] });
        }),
        !0
      );
    if ("openReplay" === o.action)
      return (
        chrome.tabs.create({
          url: chrome.runtime.getURL("js/replayPage.html"),
        }),
        (c = o.payload),
        !1
      );
    if ("getRawChangeLog" === o.action) return u({ rawChangeLog: c }), !1;
    if ("hideRevisionHistory" === o.action)
      return (
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          var o = e[0].id;
          o &&
            chrome.tabs.sendMessage(o, { action: "hideRevisionHistoryRelay" });
        }),
        chrome.runtime.sendMessage({ action: "hideRevisionHistoryRelay" }),
        !1
      );
    if ("showRevisionHistory" === o.action)
      return (
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          var o = e[0].id;
          o &&
            chrome.tabs.sendMessage(o, { action: "showRevisionHistoryReplay" });
        }),
        chrome.runtime.sendMessage({ action: "showRevisionHistoryReplay" }),
        !1
      );
    if ("showPopup" === o.action)
      return (
        chrome.action
          .openPopup()
          .then(function () {
            u({ success: !0 });
          })
          .catch(function (e) {
            u({ success: !1, error: e });
          }),
        !1
      );
    if ("setAccessToken" === o.action) {
      n("📨 Background received setAccessToken:", {
        hasToken: !!o.payload,
        hasUserId: !!o.userId,
      });
      var h = !1;
      return (
        null === o.payload
          ? (r("🧹 Clearing stored tokens and IDs"),
            chrome.storage.local.remove([e, "user_id"]))
          : (n("💾 Storing access token"),
            chrome.storage.local.set((((l = {})[e] = o.payload), l)),
            o.userId
              ? (n("💾 Storing user ID: ".concat(o.userId)),
                chrome.storage.local.set({ user_id: o.userId }),
                (h = !0))
              : a("⚠️ No user ID provided with token")),
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          if (0 !== e.length) {
            var o = e[0].id;
            o &&
              chrome.tabs.sendMessage(o, { action: "toggleFrontendLoggedIn" });
          }
        }),
        h && setTimeout(i, 1e3),
        !1
      );
    }
    return "getAccessToken" === o.action
      ? (chrome.storage.local.get([e]).then(function (o) {
          var t = o[e];
          u({ accessToken: t });
        }),
        !0)
      : "getUserId" === o.action
        ? (n("🔍 Getting stored user ID"),
          chrome.storage.local
            .get([e, "user_id", "supabaseSession"])
            .then(function (o) {
              var t;
              if (o[e]) {
                var s = o.user_id;
                if (
                  (n("👤 User ID from storage:", {
                    userId: s,
                    length: s ? s.length : 0,
                    isUUID:
                      !!s &&
                      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                        s,
                      ),
                    hasAccessToken: !!o[e],
                    hasSupabaseSession: !!o.supabaseSession,
                  }),
                  o.supabaseSession)
                )
                  try {
                    var r =
                      null === (t = JSON.parse(o.supabaseSession).user) ||
                      void 0 === t
                        ? void 0
                        : t.id;
                    n("🔄 Comparing user IDs:", {
                      storageUserId: s,
                      sessionUserId: r,
                      match: s === r,
                    }),
                      r &&
                        s !== r &&
                        a("⚠️ User ID mismatch between storage and session!");
                  } catch (e) {
                    !(function () {
                      for (var e = [], o = 0; o < arguments.length; o++)
                        e[o] = arguments[o];
                      console.error.apply(console, e);
                    })("❌ Error parsing Supabase session:", e);
                  }
                u({ userId: s });
              } else
                n("👤 No access token found, returning empty userId"),
                  u({ userId: null });
            }),
          !0)
        : "authStateChanged" === o.action
          ? (r("📣 Auth state changed: ".concat(o.status)),
            setTimeout(i, 1500),
            !1)
          : (a("Unknown action", o.action), !1);
  });
})();
