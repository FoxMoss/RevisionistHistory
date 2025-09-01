(() => {
  "use strict";
  var e = "revHistoryAccessToken",
    t = function () {
      try {
        return "true" === localStorage.getItem("RH_DEBUG_ENABLED");
      } catch (e) {
        return !1;
      }
    },
    n = {},
    r = function () {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      t();
    },
    o = function (e) {
      for (var r = [], o = 1; o < arguments.length; o++)
        r[o - 1] = arguments[o];
      (n[e] || (n[e] = 0), n[e]++, t() && (1 === n[e] || n[e]));
    },
    s = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    },
    a = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    },
    i = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    },
    c = function (e, t, n, r) {
      return new (n || (n = Promise))(function (o, s) {
        function a(e) {
          try {
            c(r.next(e));
          } catch (e) {
            s(e);
          }
        }
        function i(e) {
          try {
            c(r.throw(e));
          } catch (e) {
            s(e);
          }
        }
        function c(e) {
          var t;
          e.done
            ? o(e.value)
            : ((t = e.value),
              t instanceof n
                ? t
                : new n(function (e) {
                    e(t);
                  })).then(a, i);
        }
        c((r = r.apply(e, t || [])).next());
      });
    },
    u = function (e, t) {
      var n,
        r,
        o,
        s,
        a = {
          label: 0,
          sent: function () {
            if (1 & o[0]) throw o[1];
            return o[1];
          },
          trys: [],
          ops: [],
        };
      return (
        (s = { next: i(0), throw: i(1), return: i(2) }),
        "function" == typeof Symbol &&
          (s[Symbol.iterator] = function () {
            return this;
          }),
        s
      );
      function i(i) {
        return function (c) {
          return (function (i) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; s && ((s = 0), i[0] && (a = 0)), a; )
              try {
                if (
                  ((n = 1),
                  r &&
                    (o =
                      2 & i[0]
                        ? r.return
                        : i[0]
                          ? r.throw || ((o = r.return) && o.call(r), 0)
                          : r.next) &&
                    !(o = o.call(r, i[1])).done)
                )
                  return o;
                switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                  case 0:
                  case 1:
                    o = i;
                    break;
                  case 4:
                    return (a.label++, { value: i[1], done: !1 });
                  case 5:
                    (a.label++, (r = i[1]), (i = [0]));
                    continue;
                  case 7:
                    ((i = a.ops.pop()), a.trys.pop());
                    continue;
                  default:
                    if (
                      !((o = a.trys),
                      (o = o.length > 0 && o[o.length - 1]) ||
                        (6 !== i[0] && 2 !== i[0]))
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                      a.label = i[1];
                      break;
                    }
                    if (6 === i[0] && a.label < o[1]) {
                      ((a.label = o[1]), (o = i));
                      break;
                    }
                    if (o && a.label < o[2]) {
                      ((a.label = o[2]), a.ops.push(i));
                      break;
                    }
                    (o[2] && a.ops.pop(), a.trys.pop());
                    continue;
                }
                i = t.call(e, a);
              } catch (e) {
                ((i = [6, e]), (r = 0));
              } finally {
                n = o = 0;
              }
            if (5 & i[0]) throw i[1];
            return { value: i[0] ? i[1] : void 0, done: !0 };
          })([i, c]);
        };
      }
    },
    l = [],
    d = null,
    h = null;
  (chrome.storage.session.setAccessLevel({
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
  }),
    chrome.runtime.onInstalled.addListener(function (e) {
      (chrome.runtime.setUninstallURL("https://forms.gle/bf1G5rGMrw1PW9UC9"),
        ("install" !== e.reason && "update" !== e.reason) ||
          setTimeout(function () {
            chrome.action.openPopup().catch(function (e) {});
          }, 1e3));
    }));
  var g = function () {
      (r("🔄 Reloading active tab after authentication"),
        chrome.tabs.query({ active: !0, currentWindow: !1 }, function (e) {
          if (e.length > 0) {
            var t = e[0].id;
            t && chrome.tabs.sendMessage(t, { action: "reloadPageAfterAuth" });
          }
        }));
    },
    f = 1209600,
    m = function () {
      return c(void 0, void 0, void 0, function () {
        var e;
        return u(this, function (t) {
          switch (t.label) {
            case 0:
              return (
                (e = Math.floor(Date.now() / 1e3) + f),
                [4, chrome.storage.local.set({ sessionExpiresAt: e })]
              );
            case 1:
              return (
                t.sent(),
                r("🔄 Session expiration refreshed to:", e),
                [2]
              );
          }
        });
      });
    };
  (chrome.runtime.onMessage.addListener(function (t, n, f) {
    var p,
      v = this;
    if (
      (o("message-received", "Received message", t.action),
      m(),
      "getCurrentTab" === t.action)
    )
      return (
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          f({ tab: e[0] });
        }),
        !0
      );
    if ("openReplay" === t.action)
      return (
        chrome.tabs.create({
          url: chrome.runtime.getURL("js/replayPage.html"),
        }),
        (l = t.payload.rawChangeLog),
        (d = t.payload.docTab || null),
        (h = t.payload.editorsTable || null),
        !1
      );
    if ("getRawChangeLog" === t.action) return (f({ rawChangeLog: l }), !1);
    if ("getDocTab" === t.action) return (f({ docTab: d }), !1);
    if ("getEditorsTable" === t.action) return (f({ editorsTable: h }), !1);
    if ("hideRevisionHistory" === t.action)
      return (
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          var t = e[0].id;
          t &&
            chrome.tabs.sendMessage(t, { action: "hideRevisionHistoryRelay" });
        }),
        chrome.runtime.sendMessage({ action: "hideRevisionHistoryRelay" }),
        !1
      );
    if ("showRevisionHistory" === t.action)
      return (
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          var t = e[0].id;
          t &&
            chrome.tabs.sendMessage(t, { action: "showRevisionHistoryReplay" });
        }),
        chrome.runtime.sendMessage({ action: "showRevisionHistoryReplay" }),
        !1
      );
    if ("showPopup" === t.action)
      return (
        chrome.action
          .openPopup()
          .then(function () {
            f({ success: !0 });
          })
          .catch(function (e) {
            f({ success: !1, error: e });
          }),
        !1
      );
    if ("setAccessToken" === t.action) {
      r("📨 Background received setAccessToken:", {
        hasToken: !!t.payload,
        hasUserId: !!t.userId,
      });
      var b = !1;
      return (
        null === t.payload
          ? (s("🧹 Clearing stored tokens and IDs"),
            chrome.storage.local.remove([e, "user_id"]))
          : (r("💾 Storing access token"),
            chrome.storage.local.set((((p = {})[e] = t.payload), p)),
            t.userId
              ? (r("💾 Storing user ID: ".concat(t.userId)),
                chrome.storage.local.set({ user_id: t.userId }),
                (b = !0))
              : a("⚠️ No user ID provided with token")),
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
          if (0 !== e.length) {
            var t = e[0].id;
            t &&
              chrome.tabs.sendMessage(t, { action: "toggleFrontendLoggedIn" });
          }
        }),
        chrome.runtime.sendMessage({ action: "toggleFrontendLoggedIn" }),
        b && setTimeout(g, 1e3),
        !1
      );
    }
    return "getAccessToken" === t.action
      ? (chrome.storage.local.get([e]).then(function (t) {
          var n = t[e];
          f({ accessToken: n });
        }),
        !0)
      : "getUserId" === t.action
        ? (r("🔍 Getting stored user ID"),
          c(void 0, void 0, void 0, function () {
            var t, n, r;
            return u(this, function (o) {
              switch (o.label) {
                case 0:
                  return [4, chrome.storage.local.get(["sessionExpiresAt"])];
                case 1:
                  return (t = o.sent()).sessionExpiresAt
                    ? ((n = Math.floor(Date.now() / 1e3)),
                      (r = n >= t.sessionExpiresAt) &&
                        (s("🕐 Session has expired, clearing stored data"),
                        chrome.storage.local.remove([
                          e,
                          "user_id",
                          "supabaseSession",
                          "sessionExpiresAt",
                        ])),
                      [2, r])
                    : [2, !0];
              }
            });
          }).then(function (t) {
            return c(v, void 0, void 0, function () {
              var n, o, s, c, l;
              return u(this, function (u) {
                switch (u.label) {
                  case 0:
                    return t
                      ? (r("👤 Session expired, returning null userId"),
                        f({ userId: null }),
                        [2])
                      : [4, m()];
                  case 1:
                    return (
                      u.sent(),
                      [
                        4,
                        chrome.storage.local.get([
                          e,
                          "user_id",
                          "supabaseSession",
                        ]),
                      ]
                    );
                  case 2:
                    if ((n = u.sent())[e]) {
                      if (
                        ((o = n.user_id),
                        r("👤 User ID from storage:", {
                          userId: o,
                          length: o ? o.length : 0,
                          isUUID:
                            !!o &&
                            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                              o,
                            ),
                          hasAccessToken: !!n[e],
                          hasSupabaseSession: !!n.supabaseSession,
                        }),
                        n.supabaseSession)
                      )
                        try {
                          ((s = JSON.parse(n.supabaseSession)),
                            (c =
                              null === (l = s.user) || void 0 === l
                                ? void 0
                                : l.id),
                            r("🔄 Comparing user IDs:", {
                              storageUserId: o,
                              sessionUserId: c,
                              match: o === c,
                            }),
                            c &&
                              o !== c &&
                              a(
                                "⚠️ User ID mismatch between storage and session!",
                              ));
                        } catch (e) {
                          i("❌ Error parsing Supabase session:", e);
                        }
                      f({ userId: o });
                    } else
                      (r("👤 No access token found, returning empty userId"),
                        f({ userId: null }));
                    return [2];
                }
              });
            });
          }),
          !0)
        : "authStateChanged" === t.action
          ? (s("📣 Auth state changed: ".concat(t.status)),
            setTimeout(g, 1500),
            !1)
          : (a("Unknown action", t.action), !1);
  }),
    chrome.runtime.onMessageExternal.addListener(function (t, n, o) {
      var c, u;
      r("📨 External message received", {
        action: t.action,
        senderUrl: n.url,
        senderOrigin: n.origin,
        senderTab: null === (u = n.tab) || void 0 === u ? void 0 : u.id,
        fullSender: n,
      });
      if (
        n.origin &&
        ![
          "https://localhost:3000",
          "http://localhost:3000",
          "https://extension.revisionhistory.com",
          "https://revisionhistory.com",
          "https://www.revisionhistory.com",
        ].includes(n.origin)
      )
        return (
          a("🚫 Unauthorized external message from:", n.origin),
          o({ success: !1, error: "Unauthorized origin" }),
          !1
        );
      if ("AUTH_SUCCESS" === t.action && t.payload) {
        var l = t.payload,
          d = l.user_id,
          h = l.email,
          g = l.is_premium,
          m = l.access_token,
          p = l.refresh_token;
        if (!d || !h || !m)
          return (
            i("❌ Missing required auth data", {
              user_id: !!d,
              email: !!h,
              access_token: !!m,
            }),
            o({ success: !1, error: "Missing required authentication data" }),
            !1
          );
        s("🔑 Received AUTH_SUCCESS from external sign-in", {
          user_id: d,
          email: h,
          is_premium: g,
          senderOrigin: n.origin,
          hasRefreshToken: !!p,
        });
        var v = Math.floor(Date.now() / 1e3) + f,
          b = {
            access_token: m,
            refresh_token: p || "",
            expires_in: 3600,
            expires_at: v,
            token_type: "bearer",
            user: {
              id: d,
              email: h,
              email_confirmed_at: new Date().toISOString(),
              phone: "",
              confirmed_at: new Date().toISOString(),
              last_sign_in_at: new Date().toISOString(),
              app_metadata: { provider: "email", providers: ["email"] },
              user_metadata: { is_premium: g },
              identities: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              aud: "authenticated",
              role: "authenticated",
            },
          };
        return (
          chrome.storage.local.set({
            supabaseSession: JSON.stringify(b),
            sessionExpiresAt: v,
          }),
          r("💾 Storing access token from external auth"),
          chrome.storage.local.set((((c = {})[e] = m), (c.user_id = d), c)),
          chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
            if (e.length > 0) {
              var t = e[0].id;
              t &&
                chrome.tabs
                  .sendMessage(t, { action: "toggleFrontendLoggedIn" })
                  .catch(function (e) {
                    r(
                      "🔍 Could not send message to active tab (tab may not have content script):",
                      e,
                    );
                  });
            }
          }),
          chrome.runtime.sendMessage({ action: "toggleFrontendLoggedIn" }),
          setTimeout(function () {
            (r(
              "🔄 Reloading Google Docs document tabs after external authentication",
            ),
              chrome.tabs.query(
                {
                  url: [
                    "*://docs.google.com/document/*",
                    "*://classroom.google.com/g/tg/*",
                  ],
                },
                function (e) {
                  e.forEach(function (e) {
                    e.id &&
                      chrome.tabs
                        .sendMessage(e.id, { action: "reloadPageAfterAuth" })
                        .catch(function () {
                          e.id && chrome.tabs.reload(e.id);
                        });
                  });
                },
              ));
          }, 1e3),
          o({ success: !0 }),
          !0
        );
      }
      return "AUTH_SUCCESS" !== t.action || t.payload
        ? (a("Unknown external message action:", t.action),
          o({ success: !1, error: "Unknown action" }),
          !1)
        : (i("❌ AUTH_SUCCESS message missing payload"),
          o({ success: !1, error: "Missing payload" }),
          !1);
    }));
})();
