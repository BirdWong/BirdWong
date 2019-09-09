var InstantClick = function(d, a) {
    var f, n, r, o, c, s, u, l, e = navigator.userAgent, h = -1 < e.indexOf(" CriOS/"), v = {}, p = !1, b = !1, g = !1, m = !1, y = {}, t = !1, w = !1, E = [], L = {
        fetch: [],
        receive: [],
        wait: [],
        change: []
    };
    function T(e) {
        var t = e.indexOf("#");
        return t < 0 ? e : e.substr(0, t)
    }
    function A(e) {
        for (; e && "A" != e.nodeName; )
            e = e.parentNode;
        return e
    }
    function H(e) {
        var t = a.protocol + "//" + a.host;
        return !(e.target || e.hasAttribute("download") || 0 != e.href.indexOf(t + "/") || -1 < e.href.indexOf("#") && T(e.href) == f || (s ? !function(e) {
            do {
                if (!e.hasAttribute)
                    break;
                if (e.hasAttribute("data-no-instant"))
                    return !1;
                if (e.hasAttribute("data-instant"))
                    return !0
            } while (e = e.parentNode);return !1
        }(e) : function(e) {
            do {
                if (!e.hasAttribute)
                    break;
                if (e.hasAttribute("data-instant"))
                    return !1;
                if (e.hasAttribute("data-no-instant"))
                    return !0
            } while (e = e.parentNode);return !1
        }(e)))
    }
    function x(e, t, n, r) {
        for (var i = !1, a = 0; a < L[e].length; a++)
            if ("receive" == e) {
                var o = L[e][a](t, n, r);
                o && ("body"in o && (n = o.body),
                "title"in o && (r = o.title),
                i = o)
            } else
                L[e][a](t, n, r);
        return i
    }
    function D(e, t, n, r) {
        if (d.documentElement.replaceChild(t, d.body),
        n) {
            history.pushState(null, null, n);
            var i = n.indexOf("#")
              , a = -1 < i && d.getElementById(n.substr(i + 1))
              , o = 0;
            if (a)
                for (; a.offsetParent; )
                    o += a.offsetTop,
                    a = a.offsetParent;
            scrollTo(0, o),
            f = T(n)
        } else
            scrollTo(0, r);
        h && d.title == e ? d.title = e + String.fromCharCode(160) : d.title = e,
        B(),
        x("change", !1);
        var s = d.createEvent("HTMLEvents");
        s.initEvent("instantclick:newpage", !0, !0),
        dispatchEvent(s)
    }
    function M() {
        w = t = !1
    }
    function O(e) {
        if (!(o > +new Date - 500)) {
            var t = A(e.target);
            t && H(t) && I(t.href)
        }
    }
    function Y(e) {
        if (!(o > +new Date - 500)) {
            var t = A(e.target);
            t && H(t) && (t.addEventListener("mouseout", S),
            l ? (n = t.href,
            r = setTimeout(I, l)) : I(t.href))
        }
    }
    function C(e) {
        o = +new Date;
        var t = A(e.target);
        t && H(t) && (u ? t.removeEventListener("mousedown", O) : t.removeEventListener("mouseover", Y),
        I(t.href))
    }
    function k(e) {
        var t = A(e.target);
        t && H(t) && (1 < e.which || e.metaKey || e.ctrlKey || (e.preventDefault(),
        K(t.href)))
    }
    function S() {
        if (r)
            return clearTimeout(r),
            void (r = !1);
        t && !w && (c.abort(),
        M())
    }
    function N() {
        if (!(c.readyState < 4) && 0 != c.status) {
            if (y.ready = +new Date - y.start,
            c.getResponseHeader("Content-Type").match(/\/(x|ht|xht)ml/)) {
                var e = d.implementation.createHTMLDocument("");
                e.documentElement.innerHTML = c.responseText.replace(/<noscript[\s\S]+<\/noscript>/gi, ""),
                b = e.title,
                m = e.body;
                var t = x("receive", p, m, b);
                t && ("body"in t && (m = t.body),
                "title"in t && (b = t.title));
                var n = T(p);
                v[n] = {
                    body: m,
                    title: b,
                    scrollY: n in v ? v[n].scrollY : 0
                };
                for (var r, i, a = e.head.children, o = 0, s = a.length - 1; 0 <= s; s--)
                    if ((r = a[s]).hasAttribute("data-instant-track")) {
                        i = r.getAttribute("href") || r.getAttribute("src") || r.innerHTML;
                        for (var f = E.length - 1; 0 <= f; f--)
                            E[f] == i && o++
                    }
                o != E.length && (g = !0)
            } else
                g = !0;
            w && (w = !1,
            K(p))
        }
    }
    function B(e) {
        if (d.body.addEventListener("touchstart", C, !0),
        u ? d.body.addEventListener("mousedown", O, !0) : d.body.addEventListener("mouseover", Y, !0),
        d.body.addEventListener("click", k, !0),
        !e) {
            var t, n, r, a, o = d.body.getElementsByTagName("script");
            for (i = 0,
            j = o.length; i < j; i++)
                (t = o[i]).hasAttribute("data-no-instant") || (n = d.createElement("script"),
                t.src && (n.src = t.src),
                t.innerHTML && (n.innerHTML = t.innerHTML),
                r = t.parentNode,
                a = t.nextSibling,
                r.removeChild(t),
                r.insertBefore(n, a))
        }
    }
    function I(e) {
        !u && "display"in y && +new Date - (y.start + y.display) < 100 || (r && (clearTimeout(r),
        r = !1),
        e || (e = n),
        t && (e == p || w) || (p = e,
        g = m = w = !(t = !0),
        y = {
            start: +new Date
        },
        x("fetch"),
        c.open("GET", e),
        c.send()))
    }
    function K(e) {
        if ("display"in y || (y.display = +new Date - y.start),
        r || !t)
            return r && p && p != e ? void (a.href = e) : (I(e),
            x("wait"),
            void (w = !0));
        if (w)
            a.href = e;
        else if (g)
            a.href = p;
        else {
            if (!m)
                return x("wait"),
                void (w = !0);
            v[f].scrollY = pageYOffset,
            M(),
            D(b, m, p)
        }
    }
    var P = "pushState"in history && (!e.match("Android") || e.match("Chrome/")) && "file:" != a.protocol;
    return {
        supported: P,
        init: function() {
            if (!f)
                if (P) {
                    for (var e = arguments.length - 1; 0 <= e; e--) {
                        var t = arguments[e];
                        !0 === t ? s = !0 : "mousedown" == t ? u = !0 : "number" == typeof t && (l = t)
                    }
                    f = T(a.href),
                    v[f] = {
                        body: d.body,
                        title: d.title,
                        scrollY: pageYOffset
                    };
                    var n, r, i = d.head.children;
                    for (e = i.length - 1; 0 <= e; e--)
                        (n = i[e]).hasAttribute("data-instant-track") && (r = n.getAttribute("href") || n.getAttribute("src") || n.innerHTML,
                        E.push(r));
                    (c = new XMLHttpRequest).addEventListener("readystatechange", N),
                    B(!0),
                    x("change", !0),
                    addEventListener("popstate", function() {
                        var e = T(a.href);
                        e != f && (e in v ? (v[f].scrollY = pageYOffset,
                        D(v[f = e].title, v[e].body, !1, v[e].scrollY)) : a.href = a.href)
                    })
                } else
                    x("change", !0)
        },
        on: function(e, t) {
            L[e].push(t)
        }
    }
}(document, location);

