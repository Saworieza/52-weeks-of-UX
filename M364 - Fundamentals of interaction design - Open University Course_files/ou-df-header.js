function ou_sitestat() {
    if (document.body)
        if (document.body.className.indexOf("ou-noauto-track") >= 0) return;
    ou_sitestat_manual("")
}

function ou_sitestat_manual(n) {
    var u, t, r, i;
    if (ou_tracked != 0) return;
    ou_tracked = 1, u = document.location, t = u && u.href ? u.href : document.URL, t = t.toLowerCase(), r = ou_getcontentarea(t);
    if (r == 0) return;
    ou_sitename = "", ou_sitename = r == "intranet" || r == "test-ou" ? r : r + ou_getsitename(), i = t.indexOf("/", 8), i < 0 && (t += "/", i = t.indexOf("/", 8));
    if (n == "") {
        n = ou_cleanpath(i, t), n.length > 1 && (i = n.lastIndexOf("/"), i == n.length - 1 ? n += "page" : (j = n.lastIndexOf("."), j > i && (n = n.substr(0, j)), n += ".page"));
        while (n.indexOf("/") >= 0) n = n.replace("/", ".");
        while (n.indexOf("..") >= 0) n = n.replace("..", ".");
        n.indexOf(".index.page") >= 0 && (n = n.replace(".index.page", ".page")), n.charAt(0) == "." && (n = n.substr(1)), n.length == 0 && (n = "home.page")
    }
    ou_pagename = n, n = ou_usertype(n), n = ou_spclparams(n, t), t.indexOf("//openlearn.") > 0 && (n = "learningspace." + n), t.indexOf("//labspace.") > 0 && (n = "labspace." + n), t.indexOf("//search.") > 0 && (n = "search." + n), ou_sitestat_again(n), typeof window.ns_p != "undefined" && (ns_pixelUrl = ns_p.src)
}

function ou_sitestat_again(n) {
    if (ou_sitename == undefined) return;
    if (ou_firsttime_only == 1) return;
    ou_nsbaseurl = "http" + (document.location.href.charAt(4) == "s" ? "s://sb" : "://b") + ".scorecardresearch.com/", udm_(ou_nsbaseurl + "b?c1=2&c2=14872310&name=" + n + "&ns_site=" + ou_sitename), ou_firsttime_only = 1
}

function ou_cleanpath(n, t) {
    for (var u = "", r = 0, i; n < t.length; n++) {
        i = t.charAt(n);
        if (i == "(") {
            r = 1;
            continue
        }
        if (r == 1) {
            i == ")" && (r = 0);
            continue
        }
        if (i == "?" || i == "#") break;
        (i == "/" || i == "\\") && (i = "/"), i == "_" && (i = "-"), (i >= "a" && i <= "z" || i >= "0" && i <= "9" || i == "-" || i == "." || i == "/") && (u += i)
    }
    return u
}

function ou_getcontentarea(n) {
    var t, r, i;
    if (n.indexOf("www-acct.open.edu/openlearn") >= 0) return "test-ou";
    if (n.indexOf(".open.ac.uk/openlearn/") > 0 || n.indexOf("open.edu/openlearn/") > 0) return "openmedia";
    if (n.indexOf(".open.edu/openlearnworks") > 0) return "openmedia";
    if (n.indexOf(".open.edu/itunes") > 0) return "openmedia";
    if (n.indexOf("open.edu") > 0) return "public";
    if (n.indexOf("www.open-university.co.uk") >= 0) return "marketing-ext";
    if (n.indexOf("www-dev.open-university.co.uk") >= 0 || n.indexOf("www-acct.open-university.co.uk") >= 0) return "test-ou";
    if (n.indexOf(".open.ac.uk") < 0) return 0;
    t = n.indexOf("//");
    if (t < 0) return 0;
    t += 2, r = n.indexOf(".", t);
    if (r < 0) return 0;
    for (i = n.substr(t, r - t), t = 0; t < ou_ca_pub.length; t++)
        if (ou_ca_pub[t] == i) return "public";
    for (t = 0; t < ou_ca_med.length; t++)
        if (ou_ca_med[t] == i) return "openmedia";
    for (t = 0; t < ou_ca_vle.length; t++)
        if (ou_ca_vle[t] == i) return "vle";
    for (t = 0; t < ou_ca_int.length; t++)
        if (ou_ca_int[t] == i) return "intranet";
    for (t = 0; t < ou_ca_test.length; t++)
        if (ou_ca_test[t] == i) return "test-ou";
    return 0
}

function ou_getsitename() {
    var i = document.cookie + ";",
        n = i.indexOf("SAMS2session="),
        r, t;
    if (n < 0) return typeof ouclientip != "undefined" ? ou_getsitename_ip(ouclientip) : ou_getsitename_ajax();
    return r = i.indexOf(";", n), t = i.substr(n, r - n), t.indexOf("samsStaffID") > 0 || t.indexOf("samsTutorID") > 0 ? "-int" : "-ext"
}

function ou_getsitename_ip(n) {
    if (n == "137.108.140.184") return "-ext";
    if (n.indexOf("137.108.") == 0) return "-int";
    if (n.indexOf("194.66.") == 0) {
        var t = parseInt(n.substr(7));
        if (t >= 128 && t <= 140 || t == 142 || t == 143 || t == 149) return "-int"
    }
    return n == "132.185.144.120" || n == "132.185.144.122" || n == "132.185.240.120" ? "-int" : "-ext"
}

function ou_getsitename_ajax() {
    var n = null,
        t;
    try {
        if (window.XMLHttpRequest) n = new XMLHttpRequest;
        else if (window.ActiveXObject) try {
            n = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (f) {
            n = new ActiveXObject("Microsoft.XMLHTTP")
        }
    } catch (f) { }
    if (n == null) return "-ext";
    try {
        n.open("GET", "/includes/ip.shtm", !1, null, null), n.send()
    } catch (f) {
        return "-ext"
    }
    if (n.responseText == null) return "-ext";
    var u = n.responseText.indexOf("||*"),
        i = n.responseText.indexOf("*|*"),
        r = n.responseText.indexOf("*||");
    if (u != 0 || i < 0 || r < i) return "-ext";
    t = n.responseText.substr(i + 3, r - i - 3);
    if (ou_validate_ip(t) == !0) return ou_getsitename_ip(t);
    return t = n.responseText.substr(3, i - 3), ou_validate_ip(t) == !0 ? ou_getsitename_ip(t) : "-ext"
}

function ou_validate_ip(n) {
    if (n.length < 7 || n.length > 15) return !1;
    x = n.indexOf(".");
    if (x < 1 || x > 3) return !1;
    y = n.indexOf(".", x + 1);
    if (y - x < 2 || y - x > 4) return !1;
    return x = n.indexOf(".", y + 1), x - y < 2 || x - y > 4 ? !1 : !0
}

function ou_spclparams(n, t) {
    for (var r, i = 0; i < ou_pm_page.length; i++)
        if (t.indexOf(ou_pm_page[i]) > 0) {
            r = t.indexOf(ou_pm_var[i] + "=");
            if (r > 0) return i = t.substr(r + ou_pm_var[i].length + 1), r = i.indexOf("&"), r > 0 && (i = i.substr(0, r)), i = ou_cleanpath(0, i), r = n.lastIndexOf("."), n.substr(0, r + 1) + i + n.substr(r)
        }
    return n
}

function ou_usertype(n) {
    var r = document.cookie + ";",
        u = r.indexOf("SAMS2session="),
        t, i;
    return u <= 0 ? n : (u += 13, r = r.substr(u, r.indexOf(";", u) - u) + "&", t = "", i = ou_getusertype(r, "samsStudentPI="), i != null && (n += "&ou_student_id=" + i, t = "student"), i = ou_getusertype(r, "samsStaffID="), i != null && (n += "&ou_staff_id=" + i, t.length > 0 && (t += ","), t += "staff"), i = ou_getusertype(r, "samsTutorID="), i != null && (n += "&ou_tutor_id=" + i, t.length > 0 && (t += ","), t += "tutor"), i = ou_getusertype(r, "samsSelfRegID="), i != null && (n += "&ou_selfreg_id=" + i, t.length > 0 && (t += ","), t += "self-registered"), i = ou_getusertype(r, "samsCorporateID="), i != null && (n += "&ou_corporate_id=" + i, t.length > 0 && (t += ","), t += "corporate"), i = ou_getusertype(r, "samsVisitorID="), i != null && (n += "&ou_special_access_id=" + i, t.length > 0 && (t += ","), t += "special-access"), t.length == 0 && (n += "&ou_unknown_id=1", t = "unknown"), n += "&ou_visitor_types=" + t)
}

function ou_getusertype(n, t) {
    var i = n.indexOf(t);
    return i <= 0 ? null : (i += t.length, n.substr(i, n.indexOf("&", i) - i))
}

function ouClickEvent(n, t) {
    if (ou_nsbaseurl == "" || ou_pagename == "") return;
    var i = ou_nsbaseurl + "p?c1=22&c2=14872310&name=" + ou_pagename + ".click";
    i += "&" + t, t.indexOf("ns_site=") < 0 && (i += "&ns_site=" + ou_sitename), ns_pixelUrl = undefined, ns_onclick(n, "", i, "hidden")
}

function udm_(n) {
    var h = "comScore=",
        t = document,
        w = t.cookie,
        p = "",
        a = "indexOf",
        r = "substring",
        l = "length",
        s = 2048,
        v, c = "&ns_",
        o = "&",
        i, f, u, b, y = window,
        e = y.encodeURIComponent || escape;
    if (w[a](h) + 1)
        for (u = 0, f = w.split(";"), b = f[l]; u < b; u++) i = f[u][a](h), i + 1 && (p = o + unescape(f[u][r](i + h[l])));
    n += c + "_t=" + +new Date + c + "c=" + (t.characterSet || t.defaultCharset || "") + "&c8=" + e(t.title) + p + "&c7=" + e(t.URL) + "&c9=" + e(t.referrer), n[l] > s && n[a](o) > 0 && (v = n[r](0, s - 8).lastIndexOf(o), n = (n[r](0, v) + c + "cut=" + e(n[r](v + 1)))[r](0, s)), t.images ? (i = new Image, y.ns_p || (ns_p = i), i.src = n) : t.write("<", "p", "><", 'img src="', n, '" height="1" width="1" alt="*"', "><", "/p", ">")
}

function ns_onclick(n, t, i, r, u) {
    var o = "",
        f, s, e;
    return typeof ns_pixelUrl == "string" && (o = ns_pixelUrl.substring(0, ns_pixelUrl.indexOf("?") + 1)), o += i, o += "&ns_type=" + r + "&ns_action=view", o += "&ns__t=" + +new Date, t || (t = n.href), f = document.referrer, f.lastIndexOf("/") == f.length - 1 && (f = f.substring(f.lastIndexOf("/"), 0)), f.length > 0 && (o += "&amp;ns_referrer=" + escape(f)), u = u || "", s = n && n.target && n.target != "" ? n.target.substring(0, 1) == "_" ? n.target.substring(1) : n.target : "self", e = new Image, s && t && (window[s] ? (window.ns_softclick_timer = function (n, t) {
        return function () {
            window.ns_softclick_timeout && window.clearTimeout(window.ns_softclick_timeout), e.onload = e.onerror = function () {
                return
            }, window[window[n] ? n : "self"].location.href = t
        }
    }(s, t), ns_softclick_timeout = window.setTimeout("ns_softclick_timer()", 5e3), e.onload = e.onerror = window.ns_softclick_timer) : window.open(t, s, u)), e.src = o, !1
}

function ou_init() {
    var t, y, l, a, v, c, s, h, r, n;
    if (ouinitdone) return;
    ouinitdone = !0;
    if (navigator.appName == "Netscape" && parseFloat(navigator.appVersion) < 5) return;
    t = document.getElementById("ou-signin1");
    if (t == null) return;
    //y = new Date, document.getElementById("sbyear").appendChild(document.createTextNode(y.getFullYear()));
    var f = document.cookie + ";",
        o = document.getElementById("ou-mobile-jlinks"),
        a = null;
    document.body.className.indexOf("ou-mobile") >= 0 && (r = document.createElement("li"), l = document.createElement("a"), f.indexOf("OUMOBILE=") >= 0 ? (r.setAttribute("class", "ou-toggle-mobile"), l.appendChild(document.createTextNode("Desktop view")), l.setAttribute("href", "javascript:ou_desktop()"), o && (a = document.createElement("p"), v = document.createElement("a"), v.setAttribute("class", "ou-toggle-mobile"), v.appendChild(document.createTextNode("Switch to desktop view")), v.setAttribute("href", "javascript:ou_desktop()"), a.appendChild(v), o.appendChild(a))) : (r.setAttribute("class", "ou-toggle-mobile"), l.appendChild(document.createTextNode("Mobile view")), l.setAttribute("href", "javascript:ou_mobile()")), r.appendChild(l), t.parentNode.insertBefore(r, t)), c = f.indexOf("SAMS2session=");
    if (c < 0 || f.indexOf("SAMSsession=") < 0) {
        t = document.getElementById("ou-signin2"), t.href = "https://msds.open.ac.uk/signon/sams001.aspx?nsh=2&URL=" + document.location.href, a && (a.style.marginBottom = "1em");
        return
    }
    c += 13;
    var i = f.indexOf(";", c),
        e = f.substr(c, i - c),
        u = "";
    i = e.indexOf("samsStudentPI="), i > 0 && (i += 14, u = e.substr(i), i = u.indexOf("&"), i > 0 && (u = u.substr(i)), u.length != 8 && (u = ""), document.getElementById("ou-phone1"), document.getElementById("ou-phone2")), t.style.display = "none", document.getElementById("ou-signout").style.display = "inline-block", s = f.indexOf("HS7BDF="), s >= 0 && (s += 7, i = f.indexOf(";", s), h = f.substr(s, i - s), i = h.indexOf("\\"), i >= 0 && (h = h.substr(0, i)), u.length == 8 && (h += " (" + u + ")"), r = document.createElement("li"), r.setAttribute("class", "ou-role-person"), r.appendChild(document.createTextNode(h)), t.parentNode.insertBefore(r, t)), n = null, o && (n = document.createElement("ul"), n.setAttribute("class", "ou-footer-portals")), (e.indexOf("samsStaffID=") > 0 || e.indexOf("samsTutorID=") > 0 || e.indexOf("samsVisitorID=") > 0) && (n && (ou_add_portallink(n, "StudentHome", "http://www.open.ac.uk/students/"), ou_add_portallink(n, "TutorHome", "http://www.open.ac.uk/tutorhome/"), ou_add_portallink(n, "IntranetHome", "http://intranet.open.ac.uk/"), o.appendChild(n), n = null)), e.indexOf("samsSelfRegID=") > 0 && (t = document.getElementById("ou-studenthome2"), t.removeChild(t.firstChild), t.appendChild(document.createTextNode("My account")), n && (ou_add_portallink(n, "My account", "http://www.open.ac.uk/students/"), o.appendChild(n), n = null)), u.length == 8 && (n && (ou_add_portallink(n, "StudentHome", "http://www.open.ac.uk/students/"), o.appendChild(n), n = null)), e.indexOf("samsCorporateID=") > 0 && (n && (ou_add_portallink(n, "SponsorHome", "https://css2.open.ac.uk/employers/sponsorhome/home/HomePage.aspx"), o.appendChild(n), n = null))
    //i = e.indexOf("samsStudentPI="), i > 0 && (i += 14, u = e.substr(i), i = u.indexOf("&"), i > 0 && (u = u.substr(i)), u.length != 8 && (u = ""), document.getElementById("ou-phone1") && (document.getElementById("ou-phone1").style.display = "none"), document.getElementById("ou-phone2") && (document.getElementById("ou-phone2").style.display = "none")), t.style.display = "none", document.getElementById("ou-signout").style.display = "inline", s = f.indexOf("HS7BDF="), s >= 0 && (s += 7, i = f.indexOf(";", s), h = f.substr(s, i - s), i = h.indexOf("\\"), i >= 0 && (h = h.substr(0, i)), u.length == 8 && (h += " (" + u + ")"), r = document.createElement("li"), r.setAttribute("class", "ou-role-person"), r.appendChild(document.createTextNode(h)), t.parentNode.insertBefore(r, t)), n = null, o && (n = document.createElement("ul"), n.setAttribute("class", "ou-footer-portals")), (e.indexOf("samsStaffID=") > 0 || e.indexOf("samsTutorID=") > 0 || e.indexOf("samsVisitorID=") > 0) && (document.getElementById("ou-studenthome").style.display = "inline", document.getElementById("ou-tutorhome").style.display = "inline", document.getElementById("ou-intranet").style.display = "inline", n && (ou_add_portallink(n, "StudentHome", "http://www.open.ac.uk/students/"), ou_add_portallink(n, "TutorHome", "http://www.open.ac.uk/tutorhome/"), ou_add_portallink(n, "IntranetHome", "http://intranet.open.ac.uk/"), o.appendChild(n), n = null)), e.indexOf("samsSelfRegID=") > 0 && (document.getElementById("ou-studenthome").style.display = "inline", t = document.getElementById("ou-studenthome2"), t.removeChild(t.firstChild), t.appendChild(document.createTextNode("My account")), n && (ou_add_portallink(n, "My account", "http://www.open.ac.uk/students/"), o.appendChild(n), n = null)), u.length == 8 && (document.getElementById("ou-studenthome").style.display = "inline", n && (ou_add_portallink(n, "StudentHome", "http://www.open.ac.uk/students/"), o.appendChild(n), n = null)), e.indexOf("samsCorporateID=") > 0 && (document.getElementById("ou-sponsor").style.display = "inline", n && (ou_add_portallink(n, "SponsorHome", "https://css2.open.ac.uk/employers/sponsorhome/home/HomePage.aspx"), o.appendChild(n), n = null))

}

function ou_add_portallink(n, t, i) {
    ele_li = document.createElement("li"), ele_a = document.createElement("a"), ele_a.appendChild(document.createTextNode(t)), ele_a.setAttribute("href", i), ele_li.appendChild(ele_a), n.appendChild(ele_li)
}

function ou_srchclk() {
    ousrchclk == 0 && (document.getElementById("ousrch").value = "", ousrchclk = 1)
}

function ou_mobile() {
    ou_killcookie("OUFULLSIZE"), ou_setcookie("OUMOBILE", "1"), location.reload(!0)
}

function ou_desktop() {
    ou_killcookie("OUMOBILE"), ou_setcookie("OUFULLSIZE", "M"), location.reload(!0)
}

function ou_killcookie(n) {
    document.cookie = n + "=;path=/;domain=.open.ac.uk;expires=Sun, 13 Dec 2009 12:01:01 GMT"
}

function ou_setcookie(n, t) {
    document.cookie = n + "=" + t + ";path=/;domain=.open.ac.uk;expires=Thu, 31 Dec 2099 23:59:59 GMT"
}

function ou_search() {
    //Pass query along to search
    headerSearchVal = document.getElementById("headerSearch");
    if (headerSearchVal.value) {
        window.location.href = 'http://search.open.ac.uk/public/search/results?q=' + headerSearchVal.value;
    }
}

function handleEnter(inField, e) {
    var charCode;

    if (e && e.which) {
        charCode = e.which;
    } else if (window.event) {
        e = window.event;
        charCode = e.keyCode;
    }

    if (charCode == 13) {
        //alert("Enter was pressed on " + inField.id);
        //If enter is pressed proceed to search
        ou_search();
    }
}

var ou_ca_pub = ["www", "www3", "www2", "www8", "css2", "css3", "msds", "search", "students"],
    ou_ca_med = ["openlearn", "labspace", "podcast"],
    ou_ca_vle = ["learn", "learn0", "learn1", "learn2", "learn3", "learn4"],
    ou_ca_int = ["intranet", "intranet6", "intranet-gw", "share", "intranet7", "intranet8"],
    ou_ca_test = ["msds-acct", "gaffer", "www3-acct", "css2-acct", "pccs1523", "csintra1", "learnacct", "learn2acct", "learn3acct", "learn4acct", "www-acct", "www8-acct", "www2-acct", "cms-test"],
    ou_pm_page = ["1a/o1aprospchoice.asp"],
    ou_pm_var = ["catcode"],
    ou_tracked = 0,
    ou_sitename, ou_pagename = "",
    ou_nsbaseurl = "",
    ou_firsttime_only = 0,
    ouinitdone = !1,
    ousrchclk = 0



