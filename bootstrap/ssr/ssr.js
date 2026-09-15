import { computed, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, mergeProps, openBlock, createBlock, createCommentVNode, ref, onMounted, onUnmounted, createVNode, Fragment, renderList, withModifiers, withDirectives, vModelText, watch, nextTick, vShow, reactive, resolveComponent, vModelCheckbox, createSSRApp, h as h$1 } from "vue";
import { ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderAttrs, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderStyle, ssrLooseContain } from "vue/server-renderer";
import { usePage, Link, useForm, router, Head, createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
const _sfc_main$S = {
  __name: "MainMenuList",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const locale = computed(() => page.props.locale);
    const headerPages = computed(() => page.props.headerPages || []);
    const auth = computed(() => page.props.auth);
    const portalTranslations = computed(() => {
      var _a;
      return ((_a = page.props.portal) == null ? void 0 : _a.translations) || {};
    });
    const currentLanguageLabel = computed(() => {
      const labels = { en: "English", ar: "العربية", tr: "Türkçe", de: "Deutsch" };
      return labels[locale.value] || "English";
    });
    const portalLabel = (key) => {
      const parts = key.split(".");
      let value = portalTranslations.value;
      for (const part of parts) {
        value = value == null ? void 0 : value[part];
      }
      if (typeof value === "string") {
        return value;
      }
      const fallbacks = {
        "menu.my_dashboard": "My Dashboard",
        "menu.projects": "My Projects",
        "menu.tickets": "My Tickets",
        "menu.logout": "Logout"
      };
      return fallbacks[key] || key;
    };
    const localizedPath = (path = "") => {
      const normalized = path.startsWith("/") ? path : `/${path}`;
      const localePrefix = locale.value ? `/${locale.value}` : "";
      if (!localePrefix) {
        return normalized === "/" ? "/" : normalized;
      }
      if (normalized === "/") {
        return localePrefix;
      }
      return `${localePrefix}${normalized}`;
    };
    const safeRoute = (name, fallbackPath = "/", params = void 0) => {
      try {
        return params !== void 0 ? route(name, params) : route(name);
      } catch (e2) {
        return localizedPath(fallbackPath);
      }
    };
    const loginUrl = computed(() => safeRoute("login", "/login"));
    const adminDashboardUrl = computed(() => localizedPath("/admin/dashboard"));
    const normalizePath = (path) => {
      if (!path) return "";
      const withoutQuery = path.split("?")[0];
      if (withoutQuery === "/") return "/";
      return withoutQuery.replace(/\/+$/, "");
    };
    const getPathFromUrl = (url) => {
      if (!url) return "";
      try {
        return new URL(url, window.location.origin).pathname;
      } catch (e2) {
        return url;
      }
    };
    const expandPrefixes = (prefixes = []) => {
      const localePrefix = locale.value ? `/${locale.value}` : "";
      return prefixes.flatMap((prefix) => {
        const normalized = prefix.startsWith("/") ? prefix : `/${prefix}`;
        if (!localePrefix) {
          return [normalized];
        }
        return [normalized, `${localePrefix}${normalized}`];
      });
    };
    const isActive = (routeName, options = {}) => {
      const routeNames = Array.isArray(routeName) ? routeName : [routeName];
      const prefixes = expandPrefixes(options.prefixes || []);
      const exactPaths = expandPrefixes(options.exact || []);
      const currentPath = normalizePath(page.url);
      const hasPathOptions = exactPaths.length > 0 || prefixes.length > 0;
      if (exactPaths.some((path) => currentPath === normalizePath(path))) {
        return true;
      }
      if (prefixes.some((prefix) => {
        const normalized = normalizePath(prefix);
        return currentPath === normalized || currentPath.startsWith(`${normalized}/`);
      })) {
        return true;
      }
      if (hasPathOptions) {
        return false;
      }
      try {
        return routeNames.some((name) => route().current(name));
      } catch (e2) {
        return false;
      }
    };
    const isCurrentUrl = (targetUrl) => {
      const targetPath = normalizePath(getPathFromUrl(targetUrl));
      const currentPath = normalizePath(page.url);
      return currentPath === targetPath;
    };
    const isPageActive = (pageItem) => {
      if (!pageItem || !pageItem.slug) return false;
      try {
        return isCurrentUrl(route("page.view", pageItem.slug));
      } catch (e2) {
        return false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[--><ul class="nav navbar-nav"><li class="hidden"><a href="#page-top"></a></li><li class="${ssrRenderClass({ active: isActive("home", { exact: ["/"] }) })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="${ssrRenderClass({ active: isActive("about-us", { prefixes: ["/about-us"] }) })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("about-us")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("About Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("About Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="${ssrRenderClass({ active: isActive(["services.index", "services.show"], { prefixes: ["/services", "/service"] }) })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("services.index")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Our Services"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Our Services")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="${ssrRenderClass({ active: isActive(["use-cases.index", "use-cases.show"], { prefixes: ["/use-cases", "/portfolio"] }) })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("use-cases.index")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Case Studies"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Case Studies")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="${ssrRenderClass({ active: isActive(["product.index", "product.show"], { prefixes: ["/products", "/product"] }) })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("product.index")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Products"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Products")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="${ssrRenderClass({ active: isActive(["blogs.index", "blogs.show"], { prefixes: ["/blogs", "/blog"] }) })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("blogs.index")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Blogs"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Blogs")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (headerPages.value.length) {
        _push(`<li class="${ssrRenderClass({ active: isActive("page.view", { prefixes: ["/p"] }) })}"><a href="#">${ssrInterpolate(trans("Pages"))} <span class="caret"></span></a><ul class="dropdown-menu"><!--[-->`);
        ssrRenderList(headerPages.value, (cmsPage) => {
          _push(`<li class="${ssrRenderClass({ active: isPageActive(cmsPage) })}">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("page.view", cmsPage.slug)
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(cmsPage.title[locale.value])}`);
              } else {
                return [
                  createTextVNode(toDisplayString(cmsPage.title[locale.value]), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="${ssrRenderClass({ active: isActive("contact-us", { prefixes: ["/contact-us"] }) })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contact-us")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Contact Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Contact Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><ul class="nav navbar-nav pull-right">`);
      if (!auth.value) {
        _push(`<li class="${ssrRenderClass({ active: isActive("login", { prefixes: ["/login"] }) })}">`);
        _push(ssrRenderComponent(unref(Link), { href: loginUrl.value }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(trans("Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(trans("Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (((_a = auth.value) == null ? void 0 : _a.type) === "admin") {
        _push(`<li><a${ssrRenderAttr("href", adminDashboardUrl.value)}>${ssrInterpolate(trans("Dashboard"))}</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (((_b = auth.value) == null ? void 0 : _b.type) === "customer") {
        _push(`<li><a href="#">${ssrInterpolate(auth.value.name)} <span class="caret"></span></a><ul class="dropdown-menu"><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("portal.dashboard")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(portalLabel("menu.my_dashboard"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(portalLabel("menu.my_dashboard")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("portal.projects.index")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(portalLabel("menu.projects"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(portalLabel("menu.projects")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("portal.tickets.index")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(portalLabel("menu.tickets"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(portalLabel("menu.tickets")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("logout"),
          method: "post",
          as: "a"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(portalLabel("menu.logout"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(portalLabel("menu.logout")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li><a href="#"><i class="fa fa-globe fa-lg"></i> ${ssrInterpolate(currentLanguageLabel.value)}<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#">English</a></li><li><a href="#">العربية</a></li><li><a href="#">Türkçe</a></li><li><a href="#">Deutsch</a></li></ul></li></ul><!--]-->`);
    };
  }
};
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/MainMenuList.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$R = {
  __name: "MainMenuNav",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const settings = computed(() => page.props.settings || {});
    const storage_path = computed(() => page.props.storage_path || "");
    const seo = computed(() => page.props.seo || {});
    const brandName = computed(() => {
      var _a;
      return ((_a = seo.value) == null ? void 0 : _a.website_name) || page.props.appName || "Symfonix";
    });
    const isPortalPage = computed(() => /\/portal(\/|$)/.test(page.url));
    const isHome = computed(() => {
      const url = (page.url || "").split("?")[0];
      return url === "/" || /^\/[a-z]{2}\/?$/.test(url);
    });
    const logoSrc = computed(() => {
      var _a;
      const logo = (_a = settings.value) == null ? void 0 : _a.site_logo;
      if (!logo || logo === false || logo === "false" || logo === "default.jpg") {
        return "";
      }
      if (/^https?:\/\//i.test(logo) || String(logo).startsWith("//") || String(logo).startsWith("/")) {
        return logo;
      }
      return `${storage_path.value}${logo}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!isPortalPage.value) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          class: ["navbar navbar-Concept navbar-center navbar-custom navbar-fixed-top", { "nav-bright": isHome.value }]
        }, _attrs))} data-v-68da86ee><div class="container" data-v-68da86ee><div class="navbar-header" data-v-68da86ee><button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-main-collapse" data-v-68da86ee><span class="sr-only" data-v-68da86ee>${ssrInterpolate(trans("Toggle navigation"))}</span><span class="icon-bar" data-v-68da86ee></span><span class="icon-bar" data-v-68da86ee></span><span class="icon-bar" data-v-68da86ee></span></button>`);
        _push(ssrRenderComponent(unref(Link), {
          class: "navbar-brand page-scroll",
          href: _ctx.route("home"),
          "aria-label": trans("Symfonix home page")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (logoSrc.value) {
                _push2(`<img class="logo"${ssrRenderAttr("src", logoSrc.value)}${ssrRenderAttr("alt", brandName.value)} data-v-68da86ee${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              if (logoSrc.value) {
                _push2(`<img class="logodark"${ssrRenderAttr("src", logoSrc.value)}${ssrRenderAttr("alt", brandName.value)} data-v-68da86ee${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              if (!logoSrc.value) {
                _push2(`<span class="logodark" data-v-68da86ee${_scopeId}>${ssrInterpolate(brandName.value)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                logoSrc.value ? (openBlock(), createBlock("img", {
                  key: 0,
                  class: "logo",
                  src: logoSrc.value,
                  alt: brandName.value
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                logoSrc.value ? (openBlock(), createBlock("img", {
                  key: 1,
                  class: "logodark",
                  src: logoSrc.value,
                  alt: brandName.value
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                !logoSrc.value ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "logodark"
                }, toDisplayString(brandName.value), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="collapse navbar-collapse navbar-main-collapse" data-v-68da86ee>`);
        _push(ssrRenderComponent(_sfc_main$S, null, null, _parent));
        _push(`</div></div></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/MainMenuNav.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const MainMenuNav = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-68da86ee"]]);
const _sfc_main$Q = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const settings = computed(() => page.props.settings || {});
    const seo = computed(() => page.props.seo || {});
    const isPortalPage = computed(() => /\/portal(\/|$)/.test(page.url));
    const subscribeSuccess = ref(false);
    const subscribeForm = useForm({ email: "" });
    const reinitTheme = () => {
      window.setTimeout(() => {
        if (typeof window.initConceptTheme === "function") {
          window.initConceptTheme();
        }
      }, 50);
    };
    onMounted(() => {
      reinitTheme();
      const unregister = router.on("success", () => {
        window.scrollTo(0, 0);
        reinitTheme();
      });
      onUnmounted(() => {
        unregister();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(MainMenuNav, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (!isPortalPage.value) {
        _push(`<!--[--><section class="section-small bg-white footer"><div class="container"><div class="row"><div class="col-md-3 footer-menu"><h4>${ssrInterpolate(trans("Subscribe to Our Newsletter"))}</h4><form><div class="form-group"><input class="form-control" type="email" name="email"${ssrRenderAttr("value", unref(subscribeForm).email)}${ssrRenderAttr("placeholder", trans("Enter your email address"))}${ssrIncludeBooleanAttr(unref(subscribeForm).processing) ? " disabled" : ""} required>`);
        if (unref(subscribeForm).errors.email) {
          _push(`<div class="help-block text-danger">${ssrInterpolate(unref(subscribeForm).errors.email)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="btn btn-dark btn-sm" type="submit"${ssrIncludeBooleanAttr(unref(subscribeForm).processing) ? " disabled" : ""}>${ssrInterpolate(unref(subscribeForm).processing ? trans("Subscribing...") : trans("Subscribe Now"))}</button><p class="small no-pad-btm">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("privacy-policy")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(trans("By subscribing, you accept our privacy policy"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(trans("By subscribing, you accept our privacy policy")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
        if (subscribeSuccess.value) {
          _push(`<div class="alert alert-success">${ssrInterpolate(trans("Thank you for subscribing to our newsletter!"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div><div class="col-md-4 col-md-offset-1 footer-menu"><h4>${ssrInterpolate(trans("About"))}</h4><p>${ssrInterpolate(seo.value.about_us || seo.value.main_title || seo.value.website_desc)}</p>`);
        if (settings.value.email) {
          _push(`<p><a${ssrRenderAttr("href", `mailto:${settings.value.email}`)}>${ssrInterpolate(settings.value.email)}</a><br>`);
          if (settings.value.phone) {
            _push(`<a dir="ltr"${ssrRenderAttr("href", `tel:${settings.value.phone}`)}>${ssrInterpolate(settings.value.phone)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-md-3 col-md-offset-1 footer-menu"><h4>${ssrInterpolate(trans("Quick Links"))}</h4><ul class="list-unstyled"><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(trans("Home"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(trans("Home")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("about-us")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(trans("About Us"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(trans("About Us")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("contact-us")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(trans("Contact Us"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(trans("Contact Us")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></div></div></div></section><section class="section-small bg-gray footer"><div class="container"><div class="row"><div class="col-lg-3"><ul class="list-inline no-pad">`);
        if (settings.value.twitter) {
          _push(`<li><a${ssrRenderAttr("href", settings.value.twitter)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", trans("Twitter"))}><i class="fab fa-twitter fa-fw fa-lg"></i></a></li>`);
        } else {
          _push(`<!---->`);
        }
        if (settings.value.facebook) {
          _push(`<li><a${ssrRenderAttr("href", settings.value.facebook)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", trans("Facebook"))}><i class="fab fa-facebook-f fa-fw fa-lg"></i></a></li>`);
        } else {
          _push(`<!---->`);
        }
        if (settings.value.linkedin) {
          _push(`<li><a${ssrRenderAttr("href", settings.value.linkedin)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", trans("LinkedIn"))}><i class="fab fa-linkedin-in fa-fw fa-lg"></i></a></li>`);
        } else {
          _push(`<!---->`);
        }
        if (settings.value.instagram) {
          _push(`<li><a${ssrRenderAttr("href", settings.value.instagram)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", trans("Instagram"))}><i class="fab fa-instagram fa-fw fa-lg"></i></a></li>`);
        } else {
          _push(`<!---->`);
        }
        if (settings.value.github) {
          _push(`<li><a${ssrRenderAttr("href", settings.value.github)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", trans("GitHub"))}><i class="fab fa-github-alt fa-fw fa-lg"></i></a></li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div><div class="col-lg-4 col-lg-offset-1"><h5 class="no-pad">${ssrInterpolate(trans("All rights are reserved"))} ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} © `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(seo.value.website_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(seo.value.website_name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h5></div><div class="col-lg-3 col-lg-offset-1"><h5 class="no-pad">${ssrInterpolate(settings.value.address)}</h5></div></div></div></section><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/App.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const _sfc_main$P = {
  __name: "HomeBlogCard",
  __ssrInlineRender: true,
  props: {
    post: { type: Object, required: true },
    variant: { type: String, default: "featured" },
    locale: { type: String, default: "en" },
    assetPath: { type: String, default: "" },
    imageFallbackIndex: { type: Number, default: 1 },
    preferTheme: { type: Boolean, default: false }
  },
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const props = __props;
    const imageFailed = ref(false);
    const translateField = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      if (typeof value === "object") {
        return value[props.locale] || value.en || Object.values(value)[0] || "";
      }
      return "";
    };
    const truncate = (text, length) => {
      const str = String(text || "");
      if (str.length <= length) return str;
      return `${str.slice(0, length).trim()}…`;
    };
    const postUrl = computed(() => {
      try {
        return route("blogs.show", props.post.slug);
      } catch (e2) {
        return "#";
      }
    });
    const localize = (value) => {
      const text = translateField(value);
      if (!text) return "";
      return trans(text);
    };
    const fallbackImage = computed(() => `${props.assetPath}theme/img/main/${42 + (props.imageFallbackIndex || 1)}.jpg`);
    const imageSrc = computed(() => {
      if (props.preferTheme || imageFailed.value) {
        return fallbackImage.value;
      }
      const src = props.post.image_link || "";
      if (!src || src.includes("blank.png")) {
        return fallbackImage.value;
      }
      return src;
    });
    const handleImageError = () => {
      imageFailed.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wow fadeIn" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), { href: postUrl.value }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="img-responsive center-block news-card-image"${ssrRenderAttr("src", imageSrc.value)}${ssrRenderAttr("alt", localize(__props.post.title))}${_scopeId}><h5${_scopeId}>${ssrInterpolate(truncate(localize(__props.post.title), 70))}</h5>`);
          } else {
            return [
              createVNode("img", {
                class: "img-responsive center-block news-card-image",
                src: imageSrc.value,
                alt: localize(__props.post.title),
                onError: handleImageError
              }, null, 40, ["src", "alt"]),
              createVNode("h5", null, toDisplayString(truncate(localize(__props.post.title), 70)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p>${ssrInterpolate(truncate(localize(__props.post.description), 140))}</p>`);
      _push(ssrRenderComponent(unref(Link), {
        class: "btn btn-gray btn-xs",
        href: postUrl.value
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Read More"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Read More")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/HomeBlogCard.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const _sfc_main$O = {
  __name: "CtaTwo",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-small bg-gray2 action" }, _attrs))}><div class="container"><div class="row"><div class="col-md-3"><h2 class="no-pad">${ssrInterpolate(trans("Have an idea?"))}</h2></div><div class="col-md-4 col-md-offset-1"><p class="no-pad">${ssrInterpolate(trans("Are you ready to take your project to the next stage?"))}</p></div><div class="col-md-2 col-md-offset-1">`);
      _push(ssrRenderComponent(unref(Link), {
        class: "btn btn-dark btn-lg",
        href: _ctx.route("contact-us")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Get Started"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Get Started")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
    };
  }
};
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CtaTwo.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const _sfc_main$N = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo || {});
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale);
    const isRtl = computed(() => locale.value === "ar");
    const posts = computed(() => page.props.posts || []);
    const servicesCategories = computed(() => page.props.servicesCategories || []);
    const testimonials = computed(() => page.props.testimonials || []);
    const useCases = computed(() => page.props.useCases || []);
    const products = computed(() => page.props.products || []);
    const clients = computed(() => page.props.clients || []);
    const meta = computed(() => page.props.meta || {});
    const brandName = computed(() => seo.value.website_name || page.props.appName || "Symfonix");
    const serviceIcons = ["ion-ios-pie-outline", "ion-ios-game-controller-b-outline", "ion-ios-analytics-outline", "ion-ios-clock-outline"];
    const themeAsset = (path) => `${asset_path.value}theme/img/${path}`;
    const heroImage = computed(() => themeAsset("main/0.jpg"));
    const whyImage = computed(() => themeAsset("main/6.jpg"));
    const heroHeadline = computed(() => {
      if (isRtl.value) {
        return `${trans("We are")} ${brandName.value}`;
      }
      return `${trans("We are")} ${brandName.value}, ${trans("We are creative")}, ${trans("We have a dream")}, ${trans("We love to design")}, ${trans("We love to code")}`;
    });
    const metaTitle = computed(() => meta.value.title || `${trans("Home")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => meta.value.description || trans("Empowering businesses with modern web, mobile, AI, and cloud solutions.") || seo.value.website_desc || "");
    const metaKeywords = computed(() => meta.value.keywords || trans("IT solutions, web development, mobile apps, AI automation, cloud services") || seo.value.website_keywords || "");
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    const translateField = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      if (typeof value === "object" && value !== null) {
        return value[locale.value] || value.en || "";
      }
      return "";
    };
    const localize = (value) => {
      const text = translateField(value);
      if (!text) return "";
      return trans(text);
    };
    const excerpt = (value, length = 140) => {
      const text = String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text.length <= length) return text;
      return `${text.slice(0, length).trim()}…`;
    };
    const onMediaError = (event, fallback) => {
      if ((event == null ? void 0 : event.target) && fallback && event.target.src !== fallback) {
        event.target.src = fallback;
      }
    };
    const flatServices = computed(() => {
      const list = [];
      for (const category of servicesCategories.value) {
        if (Array.isArray(category.services)) {
          list.push(...category.services);
        }
      }
      return list;
    });
    const serviceUrl = (service) => {
      try {
        return route("services.show", service.slug);
      } catch (e2) {
        return "#";
      }
    };
    const carouselFallbacks = ["main/40.jpg", "main/41.jpg", "main/42.jpg"];
    const carouselItems = computed(() => {
      const source = products.value.length ? products.value.slice(0, 3).map((product, index) => ({
        id: `p-${product.id}`,
        title: localize(product.name),
        text: excerpt(localize(product.short_description), 180),
        fallback: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
        image: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
        url: route("product.show", product.slug)
      })) : useCases.value.slice(0, 3).map((useCase, index) => ({
        id: `u-${useCase.id}`,
        title: localize(useCase.title),
        text: excerpt(localize(useCase.summary), 180),
        fallback: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
        image: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
        url: route("use-cases.show", useCase.slug)
      }));
      return source;
    });
    const workFallbacks = ["main/15.jpg", "main/5.jpg", "main/16.jpg"];
    const featuredWorks = computed(() => useCases.value.slice(0, 3).map((useCase, index) => {
      const fallback = themeAsset(workFallbacks[index] || workFallbacks[0]);
      return {
        ...useCase,
        title: localize(useCase.title),
        summary: excerpt(localize(useCase.summary), 90),
        fallback,
        image: fallback
      };
    }));
    const featuredTestimonial = computed(() => {
      const item = testimonials.value[0];
      if (!item) return null;
      return {
        ...item,
        name: translateField(item.name) || item.client_name || item.author,
        content: translateField(item.content || item.comment || item.message),
        company: translateField(item.company || item.position),
        image_link: item.image_link || item.avatar || item.photo
      };
    });
    const contactSubmitSuccess = ref(false);
    const contactForm = useForm({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: ""
    });
    const handleContactSubmit = () => {
      if (contactForm.processing) return false;
      contactForm.post(route("contact-us.store"), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          contactSubmitSuccess.value = false;
        },
        onSuccess: () => {
          contactSubmitSuccess.value = true;
          contactForm.reset();
          contactForm.clearErrors();
          setTimeout(() => {
            contactSubmitSuccess.value = false;
          }, 5e3);
        }
      });
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)}${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website"${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-gray" id="about"${_scopeId}><div class="container offcet-art-main"${_scopeId}><div class="row"${_scopeId}><div class="col-lg-10 col-lg-offset-2 text-center"${_scopeId}><img class="center-block img-responsive"${ssrRenderAttr("src", heroImage.value)}${ssrRenderAttr("alt", brandName.value)}${_scopeId}><div class="offcet-art offcet-art-dark"${_scopeId}><h1 class="${ssrRenderClass({ rotate: !isRtl.value })}"${_scopeId}>${ssrInterpolate(heroHeadline.value)}</h1><p${_scopeId}>${ssrInterpolate(trans("Help companies build practical technology solutions in Web, AI, automation, and cloud computing — designed for growth and sustainability"))}</p><p class="no-pad text-right"${_scopeId}><span class="classic"${_scopeId}>${ssrInterpolate(brandName.value)}</span><small${_scopeId}>— ${ssrInterpolate(trans("IT Solutions Designed for Your Success"))}</small></p></div></div></div></div></section>`);
            if (flatServices.value.length) {
              _push2(`<section class="section-small text-center" id="services"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><h2${_scopeId}>${ssrInterpolate(trans("Our Services"))}</h2><!--[-->`);
              ssrRenderList(flatServices.value.slice(0, 4), (service, index) => {
                _push2(`<div class="col-lg-3 col-sm-6 wow fadeIn"${ssrRenderAttr("data-wow-delay", `${(index + 1) * 0.2}s`)}${_scopeId}><h4${_scopeId}><i class="${ssrRenderClass([serviceIcons[index % serviceIcons.length], "icon-big"])}"${_scopeId}></i> ${ssrInterpolate(localize(service.title))}</h4><p${_scopeId}>${ssrInterpolate(excerpt(localize(service.short_desc || service.description), 120))}</p>`);
                _push2(ssrRenderComponent(unref(Link), {
                  class: "btn btn-dark btn-xs",
                  href: serviceUrl(service)
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(trans("Read More"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(trans("Read More")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            if (carouselItems.value.length) {
              _push2(`<section class="no-pad" id="action-slider"${_scopeId}><div class="carousel slide" id="carousel-light"${_scopeId}><div class="carousel-inner" role="listbox"${_scopeId}><!--[-->`);
              ssrRenderList(carouselItems.value, (item, index) => {
                _push2(`<div class="${ssrRenderClass([{ active: index === 0 }, "item"])}"${_scopeId}><div class="container-fluid bg-gray no-pad"${_scopeId}><div class="row"${_scopeId}><div class="col-lg-6 carousel-item"${_scopeId}><img class="img-responsive center-block"${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)}${_scopeId}></div><div class="col-lg-3 col-lg-offset-1 carousel-item-text"${_scopeId}><h2${_scopeId}>${ssrInterpolate(item.title)}</h2><p${_scopeId}>${ssrInterpolate(item.text)}</p>`);
                _push2(ssrRenderComponent(unref(Link), {
                  class: "btn btn-lg btn-dark",
                  href: item.url
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(trans("Get it Now!"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(trans("Get it Now!")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div><a class="left carousel-control" href="#carousel-light" data-slide="prev"${_scopeId}><span class="icon-prev"${_scopeId}></span></a><a class="right carousel-control" href="#carousel-light" data-slide="next"${_scopeId}><span class="icon-next"${_scopeId}></span></a></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            if (clients.value.length) {
              _push2(`<section class="section-small" id="partners"${_scopeId}><div class="container text-center"${_scopeId}><div class="row wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s"${_scopeId}><!--[-->`);
              ssrRenderList(clients.value.slice(0, 6), (client) => {
                _push2(`<div class="col-md-2"${_scopeId}>`);
                if (client.url) {
                  _push2(`<a${ssrRenderAttr("href", client.url)} target="_blank" rel="noopener noreferrer"${_scopeId}><img class="center-block img-responsive"${ssrRenderAttr("src", client.logo_link)}${ssrRenderAttr("alt", client.name)}${_scopeId}></a>`);
                } else {
                  _push2(`<img class="center-block img-responsive"${ssrRenderAttr("src", client.logo_link)}${ssrRenderAttr("alt", client.name)}${_scopeId}>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            if (featuredWorks.value.length) {
              _push2(`<section class="section-small" id="gallery"${_scopeId}><div class="container text-center"${_scopeId}><h2${_scopeId}>${ssrInterpolate(trans("Our Works"))}</h2><div class="row"${_scopeId}><div class="col-sm-6 no-pad"${_scopeId}><div class="portfolio-item gallery-feature"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("use-cases.show", featuredWorks.value[0].slug)
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", featuredWorks.value[0].image)}${ssrRenderAttr("alt", featuredWorks.value[0].title)}${_scopeId2}><div class="portfolio-overlay"${_scopeId2}><div class="caption"${_scopeId2}><h3${_scopeId2}>${ssrInterpolate(featuredWorks.value[0].title)}</h3><span${_scopeId2}>${ssrInterpolate(featuredWorks.value[0].summary)}</span></div></div>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: featuredWorks.value[0].image,
                        alt: featuredWorks.value[0].title,
                        onError: ($event) => onMediaError($event, featuredWorks.value[0].fallback)
                      }, null, 40, ["src", "alt", "onError"]),
                      createVNode("div", { class: "portfolio-overlay" }, [
                        createVNode("div", { class: "caption" }, [
                          createVNode("h3", null, toDisplayString(featuredWorks.value[0].title), 1),
                          createVNode("span", null, toDisplayString(featuredWorks.value[0].summary), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (featuredWorks.value.length > 1) {
                _push2(`<div class="col-sm-6 no-pad"${_scopeId}><!--[-->`);
                ssrRenderList(featuredWorks.value.slice(1), (work) => {
                  _push2(`<div class="portfolio-item"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("use-cases.show", work.slug)
                  }, {
                    default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<img${ssrRenderAttr("src", work.image)}${ssrRenderAttr("alt", work.title)}${_scopeId2}><div class="portfolio-overlay"${_scopeId2}><div class="caption"${_scopeId2}><h3${_scopeId2}>${ssrInterpolate(work.title)}</h3><span${_scopeId2}>${ssrInterpolate(work.summary)}</span></div></div>`);
                      } else {
                        return [
                          createVNode("img", {
                            src: work.image,
                            alt: work.title,
                            onError: ($event) => onMediaError($event, work.fallback)
                          }, null, 40, ["src", "alt", "onError"]),
                          createVNode("div", { class: "portfolio-overlay" }, [
                            createVNode("div", { class: "caption" }, [
                              createVNode("h3", null, toDisplayString(work.title), 1),
                              createVNode("span", null, toDisplayString(work.summary), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><p class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                class: "btn btn-dark",
                href: _ctx.route("use-cases.index")
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("Case Studies"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("Case Studies")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            if (featuredTestimonial.value) {
              _push2(`<section class="section-small" id="testimonials"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-md-3"${_scopeId}><h2${_scopeId}>${ssrInterpolate(trans("Testimonials"))}</h2></div><div class="col-md-3"${_scopeId}><img class="img-circle center-block img-responsive"${ssrRenderAttr("src", featuredTestimonial.value.image_link || asset_path.value + "theme/img/testimonials/1.jpg")}${ssrRenderAttr("alt", featuredTestimonial.value.name)}${_scopeId}></div><div class="col-md-6"${_scopeId}><h2 class="dark-gray"${_scopeId}>${ssrInterpolate(featuredTestimonial.value.content || featuredTestimonial.value.comment)}</h2><div class="classic"${_scopeId}>${ssrInterpolate(featuredTestimonial.value.name)}</div>`);
              if (featuredTestimonial.value.company) {
                _push2(`<small${_scopeId}>— ${ssrInterpolate(featuredTestimonial.value.company)}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section class="section-small" id="why"${_scopeId}><div class="container offcet-art-main"${_scopeId}><div class="row"${_scopeId}><div class="col-lg-10 col-lg-offset-2 text-center"${_scopeId}><img class="img-responsive center-block"${ssrRenderAttr("src", whyImage.value)}${ssrRenderAttr("alt", trans("About Us"))}${_scopeId}><div class="offcet-art"${_scopeId}><h3${_scopeId}>${ssrInterpolate(trans("Why Choose Symfonix for Web, AI, and Cloud"))}</h3><p${_scopeId}>${ssrInterpolate(trans("Transform your business with our innovative IT solutions, tailored to address your unique challenges and drive growth in today's digital landscape."))}</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              class: "btn btn-sm btn-gray",
              href: _ctx.route("about-us")
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("LEARN MORE"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("LEARN MORE")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></section>`);
            if (posts.value.length) {
              _push2(`<section class="section-small bg-gray" id="news"${_scopeId}><div class="container"${_scopeId}><h3 class="pull-left"${_scopeId}>${ssrInterpolate(trans("News"))}</h3><div class="pull-right"${_scopeId}><h4${_scopeId}>${ssrInterpolate(trans("OUR LATEST NEWS"))}</h4></div><div class="clearfix"${_scopeId}></div><div class="row grid-pad"${_scopeId}><!--[-->`);
              ssrRenderList(posts.value.slice(0, 3), (post, index) => {
                _push2(`<div class="col-sm-6 col-md-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$P, {
                  post,
                  locale: locale.value,
                  "asset-path": asset_path.value,
                  "image-fallback-index": index + 1,
                  "prefer-theme": ""
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section class="section-small" id="contact-home"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-md-4"${_scopeId}>`);
            if (settings.value.phone) {
              _push2(`<h3${_scopeId}><i class="fa fa-phone"${_scopeId}></i><a dir="ltr"${ssrRenderAttr("href", `tel:${settings.value.phone}`)}${_scopeId}>${ssrInterpolate(settings.value.phone)}</a></h3>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form novalidate${_scopeId}><div class="control-group"${_scopeId}><div class="form-group floating-label-form-group controls"${_scopeId}><label class="sr-only" for="home-name"${_scopeId}>${ssrInterpolate(trans("Name"))}</label><input id="home-name" class="form-control" type="text"${ssrRenderAttr("value", unref(contactForm).name)}${ssrRenderAttr("placeholder", trans("Name"))} required${_scopeId}>`);
            if (unref(contactForm).errors.name) {
              _push2(`<span class="help-block text-danger"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.name)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="control-group"${_scopeId}><div class="form-group floating-label-form-group controls"${_scopeId}><label class="sr-only" for="home-email"${_scopeId}>${ssrInterpolate(trans("Email"))}</label><input id="home-email" class="form-control" type="email"${ssrRenderAttr("value", unref(contactForm).email)}${ssrRenderAttr("placeholder", trans("Email"))} required${_scopeId}>`);
            if (unref(contactForm).errors.email) {
              _push2(`<span class="help-block text-danger"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.email)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="control-group"${_scopeId}><div class="form-group floating-label-form-group controls"${_scopeId}><label class="sr-only" for="home-mobile"${_scopeId}>${ssrInterpolate(trans("Phone"))}</label><input id="home-mobile" class="form-control" type="text"${ssrRenderAttr("value", unref(contactForm).mobile)}${ssrRenderAttr("placeholder", trans("Phone"))} required${_scopeId}>`);
            if (unref(contactForm).errors.mobile) {
              _push2(`<span class="help-block text-danger"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.mobile)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="control-group"${_scopeId}><div class="form-group floating-label-form-group controls"${_scopeId}><label class="sr-only" for="home-subject"${_scopeId}>${ssrInterpolate(trans("Subject"))}</label><input id="home-subject" class="form-control" type="text"${ssrRenderAttr("value", unref(contactForm).subject)}${ssrRenderAttr("placeholder", trans("Subject"))} required${_scopeId}>`);
            if (unref(contactForm).errors.subject) {
              _push2(`<span class="help-block text-danger"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.subject)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="control-group"${_scopeId}><div class="form-group floating-label-form-group controls"${_scopeId}><label class="sr-only" for="home-message"${_scopeId}>${ssrInterpolate(trans("Message"))}</label><textarea id="home-message" class="form-control" rows="2"${ssrRenderAttr("placeholder", trans("Message"))} required${_scopeId}>${ssrInterpolate(unref(contactForm).message)}</textarea>`);
            if (unref(contactForm).errors.message) {
              _push2(`<span class="help-block text-danger"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.message)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><button class="btn btn-dark" type="submit"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(contactForm).processing ? trans("Sending...") : trans("Send"))}</button>`);
            if (contactSubmitSuccess.value) {
              _push2(`<div class="alert alert-success"${_scopeId}>${ssrInterpolate(trans("Thank you for contacting us! We will get back to you soon."))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div><div class="col-md-6 col-md-offset-2"${_scopeId}><h2${_scopeId}>${ssrInterpolate(trans("Get in Touch With Our Team"))}</h2><p${_scopeId}>${ssrInterpolate(trans("Have a project in mind? Reach out and our experts will help you turn your ideas into reality."))}</p>`);
            if (settings.value.email) {
              _push2(`<p${_scopeId}><a${ssrRenderAttr("href", `mailto:${settings.value.email}`)}${_scopeId}>${ssrInterpolate(settings.value.email)}</a></p>`);
            } else {
              _push2(`<!---->`);
            }
            if (settings.value.address) {
              _push2(`<p${_scopeId}>${ssrInterpolate(settings.value.address)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("section", {
                class: "bg-gray",
                id: "about"
              }, [
                createVNode("div", { class: "container offcet-art-main" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-10 col-lg-offset-2 text-center" }, [
                      createVNode("img", {
                        class: "center-block img-responsive",
                        src: heroImage.value,
                        alt: brandName.value
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "offcet-art offcet-art-dark" }, [
                        createVNode("h1", {
                          class: { rotate: !isRtl.value }
                        }, toDisplayString(heroHeadline.value), 3),
                        createVNode("p", null, toDisplayString(trans("Help companies build practical technology solutions in Web, AI, automation, and cloud computing — designed for growth and sustainability")), 1),
                        createVNode("p", { class: "no-pad text-right" }, [
                          createVNode("span", { class: "classic" }, toDisplayString(brandName.value), 1),
                          createVNode("small", null, "— " + toDisplayString(trans("IT Solutions Designed for Your Success")), 1)
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              flatServices.value.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "section-small text-center",
                id: "services"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("h2", null, toDisplayString(trans("Our Services")), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(flatServices.value.slice(0, 4), (service, index) => {
                      return openBlock(), createBlock("div", {
                        key: service.id,
                        class: "col-lg-3 col-sm-6 wow fadeIn",
                        "data-wow-delay": `${(index + 1) * 0.2}s`
                      }, [
                        createVNode("h4", null, [
                          createVNode("i", {
                            class: [serviceIcons[index % serviceIcons.length], "icon-big"]
                          }, null, 2),
                          createTextVNode(" " + toDisplayString(localize(service.title)), 1)
                        ]),
                        createVNode("p", null, toDisplayString(excerpt(localize(service.short_desc || service.description), 120)), 1),
                        createVNode(unref(Link), {
                          class: "btn btn-dark btn-xs",
                          href: serviceUrl(service)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(trans("Read More")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ], 8, ["data-wow-delay"]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              carouselItems.value.length ? (openBlock(), createBlock("section", {
                key: 1,
                class: "no-pad",
                id: "action-slider"
              }, [
                createVNode("div", {
                  class: "carousel slide",
                  id: "carousel-light"
                }, [
                  createVNode("div", {
                    class: "carousel-inner",
                    role: "listbox"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(carouselItems.value, (item, index) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: ["item", { active: index === 0 }]
                      }, [
                        createVNode("div", { class: "container-fluid bg-gray no-pad" }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-lg-6 carousel-item" }, [
                              createVNode("img", {
                                class: "img-responsive center-block",
                                src: item.image,
                                alt: item.title,
                                onError: ($event) => onMediaError($event, item.fallback)
                              }, null, 40, ["src", "alt", "onError"])
                            ]),
                            createVNode("div", { class: "col-lg-3 col-lg-offset-1 carousel-item-text" }, [
                              createVNode("h2", null, toDisplayString(item.title), 1),
                              createVNode("p", null, toDisplayString(item.text), 1),
                              createVNode(unref(Link), {
                                class: "btn btn-lg btn-dark",
                                href: item.url
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(trans("Get it Now!")), 1)
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ])
                          ])
                        ])
                      ], 2);
                    }), 128))
                  ]),
                  createVNode("a", {
                    class: "left carousel-control",
                    href: "#carousel-light",
                    "data-slide": "prev"
                  }, [
                    createVNode("span", { class: "icon-prev" })
                  ]),
                  createVNode("a", {
                    class: "right carousel-control",
                    href: "#carousel-light",
                    "data-slide": "next"
                  }, [
                    createVNode("span", { class: "icon-next" })
                  ])
                ])
              ])) : createCommentVNode("", true),
              clients.value.length ? (openBlock(), createBlock("section", {
                key: 2,
                class: "section-small",
                id: "partners"
              }, [
                createVNode("div", { class: "container text-center" }, [
                  createVNode("div", {
                    class: "row wow fadeInUp",
                    "data-wow-duration": "2s",
                    "data-wow-delay": ".2s"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(clients.value.slice(0, 6), (client) => {
                      return openBlock(), createBlock("div", {
                        key: client.id,
                        class: "col-md-2"
                      }, [
                        client.url ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: client.url,
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }, [
                          createVNode("img", {
                            class: "center-block img-responsive",
                            src: client.logo_link,
                            alt: client.name
                          }, null, 8, ["src", "alt"])
                        ], 8, ["href"])) : (openBlock(), createBlock("img", {
                          key: 1,
                          class: "center-block img-responsive",
                          src: client.logo_link,
                          alt: client.name
                        }, null, 8, ["src", "alt"]))
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              featuredWorks.value.length ? (openBlock(), createBlock("section", {
                key: 3,
                class: "section-small",
                id: "gallery"
              }, [
                createVNode("div", { class: "container text-center" }, [
                  createVNode("h2", null, toDisplayString(trans("Our Works")), 1),
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-sm-6 no-pad" }, [
                      createVNode("div", { class: "portfolio-item gallery-feature" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("use-cases.show", featuredWorks.value[0].slug)
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: featuredWorks.value[0].image,
                              alt: featuredWorks.value[0].title,
                              onError: ($event) => onMediaError($event, featuredWorks.value[0].fallback)
                            }, null, 40, ["src", "alt", "onError"]),
                            createVNode("div", { class: "portfolio-overlay" }, [
                              createVNode("div", { class: "caption" }, [
                                createVNode("h3", null, toDisplayString(featuredWorks.value[0].title), 1),
                                createVNode("span", null, toDisplayString(featuredWorks.value[0].summary), 1)
                              ])
                            ])
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    featuredWorks.value.length > 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-sm-6 no-pad"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(featuredWorks.value.slice(1), (work) => {
                        return openBlock(), createBlock("div", {
                          key: work.id,
                          class: "portfolio-item"
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("use-cases.show", work.slug)
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                src: work.image,
                                alt: work.title,
                                onError: ($event) => onMediaError($event, work.fallback)
                              }, null, 40, ["src", "alt", "onError"]),
                              createVNode("div", { class: "portfolio-overlay" }, [
                                createVNode("div", { class: "caption" }, [
                                  createVNode("h3", null, toDisplayString(work.title), 1),
                                  createVNode("span", null, toDisplayString(work.summary), 1)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("p", { class: "text-center" }, [
                    createVNode(unref(Link), {
                      class: "btn btn-dark",
                      href: _ctx.route("use-cases.index")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(trans("Case Studies")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ])) : createCommentVNode("", true),
              featuredTestimonial.value ? (openBlock(), createBlock("section", {
                key: 4,
                class: "section-small",
                id: "testimonials"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-md-3" }, [
                      createVNode("h2", null, toDisplayString(trans("Testimonials")), 1)
                    ]),
                    createVNode("div", { class: "col-md-3" }, [
                      createVNode("img", {
                        class: "img-circle center-block img-responsive",
                        src: featuredTestimonial.value.image_link || asset_path.value + "theme/img/testimonials/1.jpg",
                        alt: featuredTestimonial.value.name
                      }, null, 8, ["src", "alt"])
                    ]),
                    createVNode("div", { class: "col-md-6" }, [
                      createVNode("h2", { class: "dark-gray" }, toDisplayString(featuredTestimonial.value.content || featuredTestimonial.value.comment), 1),
                      createVNode("div", { class: "classic" }, toDisplayString(featuredTestimonial.value.name), 1),
                      featuredTestimonial.value.company ? (openBlock(), createBlock("small", { key: 0 }, "— " + toDisplayString(featuredTestimonial.value.company), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("section", {
                class: "section-small",
                id: "why"
              }, [
                createVNode("div", { class: "container offcet-art-main" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-10 col-lg-offset-2 text-center" }, [
                      createVNode("img", {
                        class: "img-responsive center-block",
                        src: whyImage.value,
                        alt: trans("About Us")
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "offcet-art" }, [
                        createVNode("h3", null, toDisplayString(trans("Why Choose Symfonix for Web, AI, and Cloud")), 1),
                        createVNode("p", null, toDisplayString(trans("Transform your business with our innovative IT solutions, tailored to address your unique challenges and drive growth in today's digital landscape.")), 1),
                        createVNode(unref(Link), {
                          class: "btn btn-sm btn-gray",
                          href: _ctx.route("about-us")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(trans("LEARN MORE")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ])
                ])
              ]),
              posts.value.length ? (openBlock(), createBlock("section", {
                key: 5,
                class: "section-small bg-gray",
                id: "news"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("h3", { class: "pull-left" }, toDisplayString(trans("News")), 1),
                  createVNode("div", { class: "pull-right" }, [
                    createVNode("h4", null, toDisplayString(trans("OUR LATEST NEWS")), 1)
                  ]),
                  createVNode("div", { class: "clearfix" }),
                  createVNode("div", { class: "row grid-pad" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(posts.value.slice(0, 3), (post, index) => {
                      return openBlock(), createBlock("div", {
                        key: post.id,
                        class: "col-sm-6 col-md-4"
                      }, [
                        createVNode(_sfc_main$P, {
                          post,
                          locale: locale.value,
                          "asset-path": asset_path.value,
                          "image-fallback-index": index + 1,
                          "prefer-theme": ""
                        }, null, 8, ["post", "locale", "asset-path", "image-fallback-index"])
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("section", {
                class: "section-small",
                id: "contact-home"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-md-4" }, [
                      settings.value.phone ? (openBlock(), createBlock("h3", { key: 0 }, [
                        createVNode("i", { class: "fa fa-phone" }),
                        createVNode("a", {
                          dir: "ltr",
                          href: `tel:${settings.value.phone}`
                        }, toDisplayString(settings.value.phone), 9, ["href"])
                      ])) : createCommentVNode("", true),
                      createVNode("form", {
                        onSubmit: withModifiers(handleContactSubmit, ["prevent"]),
                        novalidate: ""
                      }, [
                        createVNode("div", { class: "control-group" }, [
                          createVNode("div", { class: "form-group floating-label-form-group controls" }, [
                            createVNode("label", {
                              class: "sr-only",
                              for: "home-name"
                            }, toDisplayString(trans("Name")), 1),
                            withDirectives(createVNode("input", {
                              id: "home-name",
                              class: "form-control",
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(contactForm).name = $event,
                              placeholder: trans("Name"),
                              required: ""
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(contactForm).name]
                            ]),
                            unref(contactForm).errors.name ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "help-block text-danger"
                            }, toDisplayString(unref(contactForm).errors.name), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "control-group" }, [
                          createVNode("div", { class: "form-group floating-label-form-group controls" }, [
                            createVNode("label", {
                              class: "sr-only",
                              for: "home-email"
                            }, toDisplayString(trans("Email")), 1),
                            withDirectives(createVNode("input", {
                              id: "home-email",
                              class: "form-control",
                              type: "email",
                              "onUpdate:modelValue": ($event) => unref(contactForm).email = $event,
                              placeholder: trans("Email"),
                              required: ""
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(contactForm).email]
                            ]),
                            unref(contactForm).errors.email ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "help-block text-danger"
                            }, toDisplayString(unref(contactForm).errors.email), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "control-group" }, [
                          createVNode("div", { class: "form-group floating-label-form-group controls" }, [
                            createVNode("label", {
                              class: "sr-only",
                              for: "home-mobile"
                            }, toDisplayString(trans("Phone")), 1),
                            withDirectives(createVNode("input", {
                              id: "home-mobile",
                              class: "form-control",
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(contactForm).mobile = $event,
                              placeholder: trans("Phone"),
                              required: ""
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(contactForm).mobile]
                            ]),
                            unref(contactForm).errors.mobile ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "help-block text-danger"
                            }, toDisplayString(unref(contactForm).errors.mobile), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "control-group" }, [
                          createVNode("div", { class: "form-group floating-label-form-group controls" }, [
                            createVNode("label", {
                              class: "sr-only",
                              for: "home-subject"
                            }, toDisplayString(trans("Subject")), 1),
                            withDirectives(createVNode("input", {
                              id: "home-subject",
                              class: "form-control",
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(contactForm).subject = $event,
                              placeholder: trans("Subject"),
                              required: ""
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(contactForm).subject]
                            ]),
                            unref(contactForm).errors.subject ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "help-block text-danger"
                            }, toDisplayString(unref(contactForm).errors.subject), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "control-group" }, [
                          createVNode("div", { class: "form-group floating-label-form-group controls" }, [
                            createVNode("label", {
                              class: "sr-only",
                              for: "home-message"
                            }, toDisplayString(trans("Message")), 1),
                            withDirectives(createVNode("textarea", {
                              id: "home-message",
                              class: "form-control",
                              rows: "2",
                              "onUpdate:modelValue": ($event) => unref(contactForm).message = $event,
                              placeholder: trans("Message"),
                              required: ""
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(contactForm).message]
                            ]),
                            unref(contactForm).errors.message ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "help-block text-danger"
                            }, toDisplayString(unref(contactForm).errors.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn btn-dark",
                          type: "submit",
                          disabled: unref(contactForm).processing
                        }, toDisplayString(unref(contactForm).processing ? trans("Sending...") : trans("Send")), 9, ["disabled"]),
                        contactSubmitSuccess.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "alert alert-success"
                        }, toDisplayString(trans("Thank you for contacting us! We will get back to you soon.")), 1)) : createCommentVNode("", true)
                      ], 32)
                    ]),
                    createVNode("div", { class: "col-md-6 col-md-offset-2" }, [
                      createVNode("h2", null, toDisplayString(trans("Get in Touch With Our Team")), 1),
                      createVNode("p", null, toDisplayString(trans("Have a project in mind? Reach out and our experts will help you turn your ideas into reality.")), 1),
                      settings.value.email ? (openBlock(), createBlock("p", { key: 0 }, [
                        createVNode("a", {
                          href: `mailto:${settings.value.email}`
                        }, toDisplayString(settings.value.email), 9, ["href"])
                      ])) : createCommentVNode("", true),
                      settings.value.address ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(settings.value.address), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Base/resources/assets/js/Pages/Index.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$N
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$M = {
  __name: "PageHeader",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    parentHref: { type: String, default: "" },
    crumb: { type: String, default: "" },
    background: { type: String, default: "" },
    compact: { type: Boolean, default: false }
  },
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["intro introhalf", { "intro-compact": __props.compact }],
        "data-background": __props.background,
        style: __props.background ? { backgroundImage: `url(${__props.background})` } : {}
      }, _attrs))} data-v-24f45534><div class="overlay" data-v-24f45534></div><div class="intro-body" data-v-24f45534><div class="container" data-v-24f45534><div class="page-header-copy" data-v-24f45534><h1 data-v-24f45534>${ssrInterpolate(__props.title)}</h1><h4 class="page-breadcrumb" data-v-24f45534>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.subtitle) {
        _push(`<!--[--><span aria-hidden="true" data-v-24f45534> / </span>`);
        if (__props.parentHref) {
          _push(ssrRenderComponent(unref(Link), { href: __props.parentHref }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.subtitle)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.subtitle), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<span data-v-24f45534>${ssrInterpolate(__props.subtitle)}</span>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props.crumb) {
        _push(`<!--[--><span aria-hidden="true" data-v-24f45534> / </span><span data-v-24f45534>${ssrInterpolate(__props.crumb)}</span><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.subtitle && !__props.crumb) {
        _push(`<!--[--><span aria-hidden="true" data-v-24f45534> / </span><span data-v-24f45534>${ssrInterpolate(__props.title)}</span><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h4></div></div></div></header>`);
    };
  }
};
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PageHeader.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const PageHeader = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-24f45534"]]);
const _sfc_main$L = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo || {});
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const meta = computed(() => page.props.meta || {});
    const siteName = computed(() => seo.value.website_name || page.props.appName || "Symfonix");
    const metaTitle = computed(() => {
      return meta.value.title || `${trans("Contact Us")} | ${siteName.value}`;
    });
    const metaDescription = computed(() => {
      return meta.value.description || trans("Contact our team for support, inquiries, or project discussions.") || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("contact, support, get in touch, customer service") || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const submitSuccess = ref(false);
    const filled = (value) => String(value || "").trim() !== "";
    const phoneNumber = computed(() => filled(settings.value.phone) ? settings.value.phone : "");
    const emailAddress = computed(() => filled(settings.value.email) ? settings.value.email : "");
    const officeAddress = computed(() => filled(settings.value.address) ? settings.value.address : "");
    const hasContactDetails = computed(() => Boolean(phoneNumber.value || emailAddress.value || officeAddress.value));
    const visualImage = computed(() => `${asset_path.value}images/home/about_us.jpg`);
    const socialLinks = computed(() => {
      const items = [
        { key: "whatsapp", icon: "fab fa-whatsapp", label: trans("WhatsApp") },
        { key: "facebook", icon: "fab fa-facebook-f", label: trans("Facebook") },
        { key: "twitter", icon: "fab fa-twitter", label: trans("Twitter") },
        { key: "linkedin", icon: "fab fa-linkedin-in", label: trans("LinkedIn") },
        { key: "instagram", icon: "fab fa-instagram", label: trans("Instagram") }
      ];
      return items.map((item) => {
        const raw = String(settings.value[item.key] || "").trim();
        if (!raw) {
          return null;
        }
        let href = raw;
        if (item.key === "whatsapp" && !raw.startsWith("http")) {
          href = `https://wa.me/${raw.replace(/[^\d]/g, "")}`;
        }
        return { ...item, href };
      }).filter(Boolean);
    });
    const contactForm = useForm({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: ""
    });
    const handleSubmit = () => {
      if (contactForm.processing) {
        return false;
      }
      if (!contactForm.name || !contactForm.name.trim()) {
        return false;
      }
      if (!contactForm.email || !contactForm.email.trim()) {
        return false;
      }
      if (!contactForm.mobile || !contactForm.mobile.trim()) {
        return false;
      }
      if (!contactForm.subject || !contactForm.subject.trim()) {
        return false;
      }
      if (!contactForm.message || !contactForm.message.trim()) {
        return false;
      }
      contactForm.post(route("contact-us.store"), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          submitSuccess.value = false;
        },
        onSuccess: () => {
          submitSuccess.value = true;
          contactForm.reset();
          contactForm.clearErrors();
          setTimeout(() => {
            submitSuccess.value = false;
          }, 5e3);
        },
        onError: () => {
          submitSuccess.value = false;
        }
      });
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-98ddba71${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-98ddba71${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-98ddba71${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-98ddba71${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-98ddba71${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-98ddba71${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-98ddba71${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-98ddba71${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-98ddba71${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website" data-v-98ddba71${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-98ddba71${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-98ddba71${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-98ddba71${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-98ddba71${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Contact Us"),
              subtitle: trans("Get In Touch"),
              background: asset_path.value + "theme/img/main/36.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="contact2" data-v-98ddba71${_scopeId}><div class="container" data-v-98ddba71${_scopeId}><div class="contact-page__intro" data-v-98ddba71${_scopeId}><p class="contact-page__kicker" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Get In Touch"))}</p><h2 data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("How Can We Help You?"))}</h2><p data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("We're here to listen! Whether you have questions, feedback, or just want to say hello, feel free to reach out"))}</p></div><div class="row contact-page__row" data-v-98ddba71${_scopeId}><div class="col-lg-6 contact-page__col" data-v-98ddba71${_scopeId}><form class="contact-page__form" novalidate data-v-98ddba71${_scopeId}><h3 data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Send a message"))}</h3><p class="contact-page__form-lead" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Fill out the form below and we'll get back to you as soon as possible"))}</p><div class="row" data-v-98ddba71${_scopeId}><div class="col-sm-6" data-v-98ddba71${_scopeId}><div class="${ssrRenderClass([{ "has-error": unref(contactForm).errors.name }, "form-group"])}" data-v-98ddba71${_scopeId}><label class="sr-only" for="contact-name" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Full Name"))}</label><input id="contact-name" class="form-control input-lg"${ssrRenderAttr("value", unref(contactForm).name)} type="text" name="name" autocomplete="name"${ssrRenderAttr("placeholder", trans("Full Name"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-98ddba71${_scopeId}>`);
            if (unref(contactForm).errors.name) {
              _push2(`<span class="help-block text-danger" data-v-98ddba71${_scopeId}>${ssrInterpolate(unref(contactForm).errors.name)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-sm-6" data-v-98ddba71${_scopeId}><div class="${ssrRenderClass([{ "has-error": unref(contactForm).errors.email }, "form-group"])}" data-v-98ddba71${_scopeId}><label class="sr-only" for="contact-email" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Email"))}</label><input id="contact-email" class="form-control input-lg"${ssrRenderAttr("value", unref(contactForm).email)} type="email" name="email" autocomplete="email"${ssrRenderAttr("placeholder", trans("Email"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-98ddba71${_scopeId}>`);
            if (unref(contactForm).errors.email) {
              _push2(`<span class="help-block text-danger" data-v-98ddba71${_scopeId}>${ssrInterpolate(unref(contactForm).errors.email)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="row" data-v-98ddba71${_scopeId}><div class="col-sm-6" data-v-98ddba71${_scopeId}><div class="${ssrRenderClass([{ "has-error": unref(contactForm).errors.mobile }, "form-group"])}" data-v-98ddba71${_scopeId}><label class="sr-only" for="contact-mobile" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Phone Number"))}</label><input id="contact-mobile" class="form-control input-lg"${ssrRenderAttr("value", unref(contactForm).mobile)} type="tel" name="mobile" autocomplete="tel"${ssrRenderAttr("placeholder", trans("Phone Number"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-98ddba71${_scopeId}>`);
            if (unref(contactForm).errors.mobile) {
              _push2(`<span class="help-block text-danger" data-v-98ddba71${_scopeId}>${ssrInterpolate(unref(contactForm).errors.mobile)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-sm-6" data-v-98ddba71${_scopeId}><div class="${ssrRenderClass([{ "has-error": unref(contactForm).errors.subject }, "form-group"])}" data-v-98ddba71${_scopeId}><label class="sr-only" for="contact-subject" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Subject"))}</label><input id="contact-subject" class="form-control input-lg"${ssrRenderAttr("value", unref(contactForm).subject)} type="text" name="subject"${ssrRenderAttr("placeholder", trans("Subject"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-98ddba71${_scopeId}>`);
            if (unref(contactForm).errors.subject) {
              _push2(`<span class="help-block text-danger" data-v-98ddba71${_scopeId}>${ssrInterpolate(unref(contactForm).errors.subject)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="${ssrRenderClass([{ "has-error": unref(contactForm).errors.message }, "form-group"])}" data-v-98ddba71${_scopeId}><label class="sr-only" for="contact-message" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Message"))}</label><textarea id="contact-message" class="form-control input-lg" name="message" rows="5"${ssrRenderAttr("placeholder", trans("Write your message"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-98ddba71${_scopeId}>${ssrInterpolate(unref(contactForm).message)}</textarea>`);
            if (unref(contactForm).errors.message) {
              _push2(`<span class="help-block text-danger" data-v-98ddba71${_scopeId}>${ssrInterpolate(unref(contactForm).errors.message)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (submitSuccess.value) {
              _push2(`<div class="alert alert-success" role="alert" data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Thank you for contacting us! We will get back to you soon."))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="btn btn-dark btn-lg" type="submit"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} data-v-98ddba71${_scopeId}>${ssrInterpolate(unref(contactForm).processing ? trans("Sending...") : trans("Send Message"))}</button></form></div><div class="col-lg-6 contact-page__col" data-v-98ddba71${_scopeId}>`);
            if (hasContactDetails.value) {
              _push2(`<aside class="contact-page__aside" data-v-98ddba71${_scopeId}><h3 data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Start the Conversation"))}</h3><p data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Reach Out Anytime"))}</p><ul class="contact-page__details list-unstyled" data-v-98ddba71${_scopeId}>`);
              if (phoneNumber.value) {
                _push2(`<li data-v-98ddba71${_scopeId}><span class="contact-page__icon" aria-hidden="true" data-v-98ddba71${_scopeId}><i class="fa fa-phone" data-v-98ddba71${_scopeId}></i></span><div data-v-98ddba71${_scopeId}><strong data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Phone"))}</strong><a dir="ltr"${ssrRenderAttr("href", `tel:${phoneNumber.value}`)} data-v-98ddba71${_scopeId}>${ssrInterpolate(phoneNumber.value)}</a></div></li>`);
              } else {
                _push2(`<!---->`);
              }
              if (emailAddress.value) {
                _push2(`<li data-v-98ddba71${_scopeId}><span class="contact-page__icon" aria-hidden="true" data-v-98ddba71${_scopeId}><i class="fa fa-envelope" data-v-98ddba71${_scopeId}></i></span><div data-v-98ddba71${_scopeId}><strong data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Email"))}</strong><a${ssrRenderAttr("href", `mailto:${emailAddress.value}`)} data-v-98ddba71${_scopeId}>${ssrInterpolate(emailAddress.value)}</a></div></li>`);
              } else {
                _push2(`<!---->`);
              }
              if (officeAddress.value) {
                _push2(`<li data-v-98ddba71${_scopeId}><span class="contact-page__icon" aria-hidden="true" data-v-98ddba71${_scopeId}><i class="fa fa-map-marker" data-v-98ddba71${_scopeId}></i></span><div data-v-98ddba71${_scopeId}><strong data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Our Location"))}</strong><span data-v-98ddba71${_scopeId}>${ssrInterpolate(officeAddress.value)}</span></div></li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</ul>`);
              if (socialLinks.value.length) {
                _push2(`<ul class="contact-page__social list-inline" data-v-98ddba71${_scopeId}><!--[-->`);
                ssrRenderList(socialLinks.value, (item) => {
                  _push2(`<li data-v-98ddba71${_scopeId}><a${ssrRenderAttr("href", item.href)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", item.label)} data-v-98ddba71${_scopeId}><i class="${ssrRenderClass(item.icon)}" data-v-98ddba71${_scopeId}></i></a></li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</aside>`);
            } else {
              _push2(`<div class="contact-page__visual" data-v-98ddba71${_scopeId}><img${ssrRenderAttr("src", visualImage.value)}${ssrRenderAttr("alt", trans("Contact Us"))} loading="lazy" decoding="async" data-v-98ddba71${_scopeId}><div class="contact-page__visual-copy" data-v-98ddba71${_scopeId}><span data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Get In Touch"))}</span><strong data-v-98ddba71${_scopeId}>${ssrInterpolate(trans("Reach Out Anytime"))}</strong></div></div>`);
            }
            _push2(`</div></div></div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Contact Us"),
                subtitle: trans("Get In Touch"),
                background: asset_path.value + "theme/img/main/36.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "contact2"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "contact-page__intro" }, [
                    createVNode("p", { class: "contact-page__kicker" }, toDisplayString(trans("Get In Touch")), 1),
                    createVNode("h2", null, toDisplayString(trans("How Can We Help You?")), 1),
                    createVNode("p", null, toDisplayString(trans("We're here to listen! Whether you have questions, feedback, or just want to say hello, feel free to reach out")), 1)
                  ]),
                  createVNode("div", { class: "row contact-page__row" }, [
                    createVNode("div", { class: "col-lg-6 contact-page__col" }, [
                      createVNode("form", {
                        class: "contact-page__form",
                        onSubmit: withModifiers(handleSubmit, ["prevent"]),
                        novalidate: ""
                      }, [
                        createVNode("h3", null, toDisplayString(trans("Send a message")), 1),
                        createVNode("p", { class: "contact-page__form-lead" }, toDisplayString(trans("Fill out the form below and we'll get back to you as soon as possible")), 1),
                        createVNode("div", { class: "row" }, [
                          createVNode("div", { class: "col-sm-6" }, [
                            createVNode("div", {
                              class: ["form-group", { "has-error": unref(contactForm).errors.name }]
                            }, [
                              createVNode("label", {
                                class: "sr-only",
                                for: "contact-name"
                              }, toDisplayString(trans("Full Name")), 1),
                              withDirectives(createVNode("input", {
                                id: "contact-name",
                                class: "form-control input-lg",
                                "onUpdate:modelValue": ($event) => unref(contactForm).name = $event,
                                type: "text",
                                name: "name",
                                autocomplete: "name",
                                placeholder: trans("Full Name"),
                                disabled: unref(contactForm).processing,
                                required: ""
                              }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).name]
                              ]),
                              unref(contactForm).errors.name ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "help-block text-danger"
                              }, toDisplayString(unref(contactForm).errors.name), 1)) : createCommentVNode("", true)
                            ], 2)
                          ]),
                          createVNode("div", { class: "col-sm-6" }, [
                            createVNode("div", {
                              class: ["form-group", { "has-error": unref(contactForm).errors.email }]
                            }, [
                              createVNode("label", {
                                class: "sr-only",
                                for: "contact-email"
                              }, toDisplayString(trans("Email")), 1),
                              withDirectives(createVNode("input", {
                                id: "contact-email",
                                class: "form-control input-lg",
                                "onUpdate:modelValue": ($event) => unref(contactForm).email = $event,
                                type: "email",
                                name: "email",
                                autocomplete: "email",
                                placeholder: trans("Email"),
                                disabled: unref(contactForm).processing,
                                required: ""
                              }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).email]
                              ]),
                              unref(contactForm).errors.email ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "help-block text-danger"
                              }, toDisplayString(unref(contactForm).errors.email), 1)) : createCommentVNode("", true)
                            ], 2)
                          ])
                        ]),
                        createVNode("div", { class: "row" }, [
                          createVNode("div", { class: "col-sm-6" }, [
                            createVNode("div", {
                              class: ["form-group", { "has-error": unref(contactForm).errors.mobile }]
                            }, [
                              createVNode("label", {
                                class: "sr-only",
                                for: "contact-mobile"
                              }, toDisplayString(trans("Phone Number")), 1),
                              withDirectives(createVNode("input", {
                                id: "contact-mobile",
                                class: "form-control input-lg",
                                "onUpdate:modelValue": ($event) => unref(contactForm).mobile = $event,
                                type: "tel",
                                name: "mobile",
                                autocomplete: "tel",
                                placeholder: trans("Phone Number"),
                                disabled: unref(contactForm).processing,
                                required: ""
                              }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).mobile]
                              ]),
                              unref(contactForm).errors.mobile ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "help-block text-danger"
                              }, toDisplayString(unref(contactForm).errors.mobile), 1)) : createCommentVNode("", true)
                            ], 2)
                          ]),
                          createVNode("div", { class: "col-sm-6" }, [
                            createVNode("div", {
                              class: ["form-group", { "has-error": unref(contactForm).errors.subject }]
                            }, [
                              createVNode("label", {
                                class: "sr-only",
                                for: "contact-subject"
                              }, toDisplayString(trans("Subject")), 1),
                              withDirectives(createVNode("input", {
                                id: "contact-subject",
                                class: "form-control input-lg",
                                "onUpdate:modelValue": ($event) => unref(contactForm).subject = $event,
                                type: "text",
                                name: "subject",
                                placeholder: trans("Subject"),
                                disabled: unref(contactForm).processing,
                                required: ""
                              }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).subject]
                              ]),
                              unref(contactForm).errors.subject ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "help-block text-danger"
                              }, toDisplayString(unref(contactForm).errors.subject), 1)) : createCommentVNode("", true)
                            ], 2)
                          ])
                        ]),
                        createVNode("div", {
                          class: ["form-group", { "has-error": unref(contactForm).errors.message }]
                        }, [
                          createVNode("label", {
                            class: "sr-only",
                            for: "contact-message"
                          }, toDisplayString(trans("Message")), 1),
                          withDirectives(createVNode("textarea", {
                            id: "contact-message",
                            class: "form-control input-lg",
                            "onUpdate:modelValue": ($event) => unref(contactForm).message = $event,
                            name: "message",
                            rows: "5",
                            placeholder: trans("Write your message"),
                            disabled: unref(contactForm).processing,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                            [vModelText, unref(contactForm).message]
                          ]),
                          unref(contactForm).errors.message ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "help-block text-danger"
                          }, toDisplayString(unref(contactForm).errors.message), 1)) : createCommentVNode("", true)
                        ], 2),
                        submitSuccess.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "alert alert-success",
                          role: "alert"
                        }, toDisplayString(trans("Thank you for contacting us! We will get back to you soon.")), 1)) : createCommentVNode("", true),
                        createVNode("button", {
                          class: "btn btn-dark btn-lg",
                          type: "submit",
                          disabled: unref(contactForm).processing
                        }, toDisplayString(unref(contactForm).processing ? trans("Sending...") : trans("Send Message")), 9, ["disabled"])
                      ], 32)
                    ]),
                    createVNode("div", { class: "col-lg-6 contact-page__col" }, [
                      hasContactDetails.value ? (openBlock(), createBlock("aside", {
                        key: 0,
                        class: "contact-page__aside"
                      }, [
                        createVNode("h3", null, toDisplayString(trans("Start the Conversation")), 1),
                        createVNode("p", null, toDisplayString(trans("Reach Out Anytime")), 1),
                        createVNode("ul", { class: "contact-page__details list-unstyled" }, [
                          phoneNumber.value ? (openBlock(), createBlock("li", { key: 0 }, [
                            createVNode("span", {
                              class: "contact-page__icon",
                              "aria-hidden": "true"
                            }, [
                              createVNode("i", { class: "fa fa-phone" })
                            ]),
                            createVNode("div", null, [
                              createVNode("strong", null, toDisplayString(trans("Phone")), 1),
                              createVNode("a", {
                                dir: "ltr",
                                href: `tel:${phoneNumber.value}`
                              }, toDisplayString(phoneNumber.value), 9, ["href"])
                            ])
                          ])) : createCommentVNode("", true),
                          emailAddress.value ? (openBlock(), createBlock("li", { key: 1 }, [
                            createVNode("span", {
                              class: "contact-page__icon",
                              "aria-hidden": "true"
                            }, [
                              createVNode("i", { class: "fa fa-envelope" })
                            ]),
                            createVNode("div", null, [
                              createVNode("strong", null, toDisplayString(trans("Email")), 1),
                              createVNode("a", {
                                href: `mailto:${emailAddress.value}`
                              }, toDisplayString(emailAddress.value), 9, ["href"])
                            ])
                          ])) : createCommentVNode("", true),
                          officeAddress.value ? (openBlock(), createBlock("li", { key: 2 }, [
                            createVNode("span", {
                              class: "contact-page__icon",
                              "aria-hidden": "true"
                            }, [
                              createVNode("i", { class: "fa fa-map-marker" })
                            ]),
                            createVNode("div", null, [
                              createVNode("strong", null, toDisplayString(trans("Our Location")), 1),
                              createVNode("span", null, toDisplayString(officeAddress.value), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        socialLinks.value.length ? (openBlock(), createBlock("ul", {
                          key: 0,
                          class: "contact-page__social list-inline"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(socialLinks.value, (item) => {
                            return openBlock(), createBlock("li", {
                              key: item.label
                            }, [
                              createVNode("a", {
                                href: item.href,
                                target: "_blank",
                                rel: "noopener",
                                "aria-label": item.label
                              }, [
                                createVNode("i", {
                                  class: item.icon
                                }, null, 2)
                              ], 8, ["href", "aria-label"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "contact-page__visual"
                      }, [
                        createVNode("img", {
                          src: visualImage.value,
                          alt: trans("Contact Us"),
                          loading: "lazy",
                          decoding: "async"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "contact-page__visual-copy" }, [
                          createVNode("span", null, toDisplayString(trans("Get In Touch")), 1),
                          createVNode("strong", null, toDisplayString(trans("Reach Out Anytime")), 1)
                        ])
                      ]))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/CRM/resources/assets/js/Pages/Index.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const Index$1 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-98ddba71"]]);
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$K = {
  __name: "QuoteShow",
  __ssrInlineRender: true,
  props: {
    quote: { type: Object, required: true },
    branding: { type: Object, required: true },
    urls: { type: Object, required: true },
    labels: { type: Object, required: true },
    viewer: { type: Object, default: () => ({}) },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const page = usePage();
    computed(() => page.props.locale || "en");
    const asset_path = computed(() => page.props.asset_path || "/");
    const flashSuccess = computed(() => {
      var _a2;
      return ((_a2 = page.props.flash) == null ? void 0 : _a2.success) || null;
    });
    const metaTitle = computed(() => {
      var _a2;
      return ((_a2 = props.meta) == null ? void 0 : _a2.title) || props.labels.title;
    });
    const metaDescription = computed(() => {
      var _a2;
      return ((_a2 = props.meta) == null ? void 0 : _a2.description) || props.labels.subtitle;
    });
    const statusBanner = computed(() => {
      if (props.quote.status === "expired") return props.labels.expired;
      if (props.quote.status === "accepted") return props.labels.accepted;
      if (props.quote.status === "rejected") return props.labels.rejected;
      if (props.quote.status === "void") return props.labels.void;
      return null;
    });
    const statusBannerClass = computed(() => {
      if (props.quote.status === "accepted") return "alert-success";
      if (props.quote.status === "rejected" || props.quote.status === "void" || props.quote.status === "expired") {
        return "alert-warning";
      }
      return "alert-info";
    });
    const acceptForm = useForm({
      responder_name: ((_a = props.viewer) == null ? void 0 : _a.name) || "",
      responder_email: ((_b = props.viewer) == null ? void 0 : _b.email) || "",
      response_note: ""
    });
    const rejectForm = useForm({
      responder_name: ((_c = props.viewer) == null ? void 0 : _c.name) || "",
      responder_email: ((_d = props.viewer) == null ? void 0 : _d.email) || "",
      response_note: ""
    });
    function formatMoney(value) {
      return Number(value || 0).toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    function submitAccept() {
      acceptForm.post(props.urls.accept, { preserveScroll: true });
    }
    function submitReject() {
      rejectForm.post(props.urls.reject, { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-a3cda87c${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-a3cda87c${_scopeId}><meta name="robots" content="noindex,nofollow" data-v-a3cda87c${_scopeId}><meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-a3cda87c${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-a3cda87c${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: "noindex,nofollow"
              }),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: __props.labels.title,
              subtitle: __props.quote.quote_number,
              background: asset_path.value + "theme/img/main/36.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="quote-show" data-v-a3cda87c${_scopeId}><div class="container" data-v-a3cda87c${_scopeId}><div class="row justify-content-center" data-v-a3cda87c${_scopeId}><div class="col-xl-10" data-v-a3cda87c${_scopeId}><div class="quote-show__card" data-v-a3cda87c${_scopeId}><div class="quote-show__header" data-v-a3cda87c${_scopeId}><div data-v-a3cda87c${_scopeId}>`);
            if (__props.branding.logo_url) {
              _push2(`<img${ssrRenderAttr("src", __props.branding.logo_url)}${ssrRenderAttr("alt", __props.branding.name)} class="quote-show__logo mb-3" data-v-a3cda87c${_scopeId}>`);
            } else {
              _push2(`<h3 class="quote-show__brand mb-2" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.branding.name)}</h3>`);
            }
            _push2(`<div class="quote-show__muted" data-v-a3cda87c${_scopeId}>`);
            if (__props.branding.phone) {
              _push2(`<div data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.branding.phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.branding.email) {
              _push2(`<div data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.branding.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.branding.address) {
              _push2(`<div data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.branding.address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="quote-show__meta text-md-end" data-v-a3cda87c${_scopeId}><div class="quote-show__number" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.quote.quote_number)}</div><span class="quote-show__badge" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.status)}</span><div class="quote-show__total" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(__props.quote.total))} ${ssrInterpolate(__props.quote.currency)}</div><a${ssrRenderAttr("href", __props.urls.pdf)} class="btn btn-dark quote-show__pdf-btn" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.download_pdf)}</a></div></div><div class="row mb-4" data-v-a3cda87c${_scopeId}><div class="col-md-6" data-v-a3cda87c${_scopeId}><div class="quote-show__label" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.quote_to)}</div><div class="quote-show__value" data-v-a3cda87c${_scopeId}>${ssrInterpolate((_a2 = __props.quote.company) == null ? void 0 : _a2.name)}</div>`);
            if ((_b2 = __props.quote.company) == null ? void 0 : _b2.email) {
              _push2(`<div class="quote-show__muted" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.quote.company.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_c2 = __props.quote.deal) == null ? void 0 : _c2.title) {
              _push2(`<div class="quote-show__muted" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.quote.deal.title)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-md-6 text-md-end" data-v-a3cda87c${_scopeId}><div data-v-a3cda87c${_scopeId}><span class="quote-show__muted" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.issued_at)}:</span><span class="quote-show__value" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.quote.issued_at)}</span></div>`);
            if (__props.quote.expires_at) {
              _push2(`<div data-v-a3cda87c${_scopeId}><span class="quote-show__muted" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.expires_at)}:</span><span class="quote-show__value" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.quote.expires_at)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (flashSuccess.value) {
              _push2(`<div class="alert alert-success" role="alert" data-v-a3cda87c${_scopeId}>${ssrInterpolate(flashSuccess.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (statusBanner.value) {
              _push2(`<div class="${ssrRenderClass([statusBannerClass.value, "alert"])}" role="alert" data-v-a3cda87c${_scopeId}>${ssrInterpolate(statusBanner.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="table-responsive mb-4" data-v-a3cda87c${_scopeId}><table class="quote-show__table" data-v-a3cda87c${_scopeId}><thead data-v-a3cda87c${_scopeId}><tr data-v-a3cda87c${_scopeId}><th data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.description)}</th><th class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.quantity)}</th><th class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.unit_price)}</th><th class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.discount)}</th><th class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.tax)}</th><th class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.amount)}</th></tr></thead><tbody data-v-a3cda87c${_scopeId}><!--[-->`);
            ssrRenderList(__props.quote.lines, (line, index) => {
              _push2(`<tr data-v-a3cda87c${_scopeId}><td data-v-a3cda87c${_scopeId}>${ssrInterpolate(line.description)}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(line.quantity)}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(line.unit_price))}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(line.discount_amount))}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(line.tax_amount))}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(line.amount))}</td></tr>`);
            });
            _push2(`<!--]--></tbody><tfoot data-v-a3cda87c${_scopeId}><tr data-v-a3cda87c${_scopeId}><td colspan="5" class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.subtotal)}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(__props.quote.subtotal))} ${ssrInterpolate(__props.quote.currency)}</td></tr><tr data-v-a3cda87c${_scopeId}><td colspan="5" class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.discount)}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(__props.quote.discount_amount))}</td></tr><tr data-v-a3cda87c${_scopeId}><td colspan="5" class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.tax)}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(__props.quote.tax_amount))}</td></tr><tr class="quote-show__grand" data-v-a3cda87c${_scopeId}><td colspan="5" class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.total)}</td><td class="text-end" data-v-a3cda87c${_scopeId}>${ssrInterpolate(formatMoney(__props.quote.total))} ${ssrInterpolate(__props.quote.currency)}</td></tr></tfoot></table></div>`);
            if (__props.quote.terms) {
              _push2(`<div class="mb-4" data-v-a3cda87c${_scopeId}><h5 class="quote-show__section-title" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.terms)}</h5><p class="quote-show__muted" style="${ssrRenderStyle({ "white-space": "pre-wrap" })}" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.quote.terms)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.branding.sign_url) {
              _push2(`<div class="text-center mb-5" data-v-a3cda87c${_scopeId}><div class="quote-show__label mb-2" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.company_sign)}</div><img${ssrRenderAttr("src", __props.branding.sign_url)}${ssrRenderAttr("alt", __props.branding.name)} class="quote-show__sign" data-v-a3cda87c${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.quote.can_respond) {
              _push2(`<div class="row g-4" data-v-a3cda87c${_scopeId}><div class="col-md-6" data-v-a3cda87c${_scopeId}><div class="quote-show__panel h-100" data-v-a3cda87c${_scopeId}><h4 class="quote-show__section-title" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.accept_title)}</h4><form data-v-a3cda87c${_scopeId}><div class="mb-3" data-v-a3cda87c${_scopeId}><label class="quote-show__label form-label" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.your_name)}</label><input${ssrRenderAttr("value", unref(acceptForm).responder_name)} type="text" class="quote-show__input" required data-v-a3cda87c${_scopeId}>`);
              if (unref(acceptForm).errors.responder_name) {
                _push2(`<div class="text-danger small mt-1" data-v-a3cda87c${_scopeId}>${ssrInterpolate(unref(acceptForm).errors.responder_name)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-3" data-v-a3cda87c${_scopeId}><label class="quote-show__label form-label" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.your_email)}</label><input${ssrRenderAttr("value", unref(acceptForm).responder_email)} type="email" class="quote-show__input" data-v-a3cda87c${_scopeId}></div><div class="mb-3" data-v-a3cda87c${_scopeId}><label class="quote-show__label form-label" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.optional_note)}</label><textarea rows="3" class="quote-show__input" data-v-a3cda87c${_scopeId}>${ssrInterpolate(unref(acceptForm).response_note)}</textarea></div><button type="submit" class="btn btn-dark"${ssrIncludeBooleanAttr(unref(acceptForm).processing) ? " disabled" : ""} data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.confirm_accept)}</button></form></div></div><div class="col-md-6" data-v-a3cda87c${_scopeId}><div class="quote-show__panel h-100" data-v-a3cda87c${_scopeId}><h4 class="quote-show__section-title" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.reject_title)}</h4><form data-v-a3cda87c${_scopeId}><div class="mb-3" data-v-a3cda87c${_scopeId}><label class="quote-show__label form-label" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.your_name)}</label><input${ssrRenderAttr("value", unref(rejectForm).responder_name)} type="text" class="quote-show__input" required data-v-a3cda87c${_scopeId}>`);
              if (unref(rejectForm).errors.responder_name) {
                _push2(`<div class="text-danger small mt-1" data-v-a3cda87c${_scopeId}>${ssrInterpolate(unref(rejectForm).errors.responder_name)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-3" data-v-a3cda87c${_scopeId}><label class="quote-show__label form-label" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.your_email)}</label><input${ssrRenderAttr("value", unref(rejectForm).responder_email)} type="email" class="quote-show__input" data-v-a3cda87c${_scopeId}></div><div class="mb-3" data-v-a3cda87c${_scopeId}><label class="quote-show__label form-label" data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.optional_note)}</label><textarea rows="3" class="quote-show__input" data-v-a3cda87c${_scopeId}>${ssrInterpolate(unref(rejectForm).response_note)}</textarea></div><button type="submit" class="btn btn-outline-danger"${ssrIncludeBooleanAttr(unref(rejectForm).processing) ? " disabled" : ""} data-v-a3cda87c${_scopeId}>${ssrInterpolate(__props.labels.confirm_reject)}</button></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: __props.labels.title,
                subtitle: __props.quote.quote_number,
                background: asset_path.value + "theme/img/main/36.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", { class: "quote-show" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row justify-content-center" }, [
                    createVNode("div", { class: "col-xl-10" }, [
                      createVNode("div", { class: "quote-show__card" }, [
                        createVNode("div", { class: "quote-show__header" }, [
                          createVNode("div", null, [
                            __props.branding.logo_url ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: __props.branding.logo_url,
                              alt: __props.branding.name,
                              class: "quote-show__logo mb-3"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("h3", {
                              key: 1,
                              class: "quote-show__brand mb-2"
                            }, toDisplayString(__props.branding.name), 1)),
                            createVNode("div", { class: "quote-show__muted" }, [
                              __props.branding.phone ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(__props.branding.phone), 1)) : createCommentVNode("", true),
                              __props.branding.email ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(__props.branding.email), 1)) : createCommentVNode("", true),
                              __props.branding.address ? (openBlock(), createBlock("div", { key: 2 }, toDisplayString(__props.branding.address), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "quote-show__meta text-md-end" }, [
                            createVNode("div", { class: "quote-show__number" }, toDisplayString(__props.quote.quote_number), 1),
                            createVNode("span", { class: "quote-show__badge" }, toDisplayString(__props.labels.status), 1),
                            createVNode("div", { class: "quote-show__total" }, toDisplayString(formatMoney(__props.quote.total)) + " " + toDisplayString(__props.quote.currency), 1),
                            createVNode("a", {
                              href: __props.urls.pdf,
                              class: "btn btn-dark quote-show__pdf-btn"
                            }, toDisplayString(__props.labels.download_pdf), 9, ["href"])
                          ])
                        ]),
                        createVNode("div", { class: "row mb-4" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "quote-show__label" }, toDisplayString(__props.labels.quote_to), 1),
                            createVNode("div", { class: "quote-show__value" }, toDisplayString((_d2 = __props.quote.company) == null ? void 0 : _d2.name), 1),
                            ((_e = __props.quote.company) == null ? void 0 : _e.email) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "quote-show__muted"
                            }, toDisplayString(__props.quote.company.email), 1)) : createCommentVNode("", true),
                            ((_f = __props.quote.deal) == null ? void 0 : _f.title) ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "quote-show__muted"
                            }, toDisplayString(__props.quote.deal.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-md-6 text-md-end" }, [
                            createVNode("div", null, [
                              createVNode("span", { class: "quote-show__muted" }, toDisplayString(__props.labels.issued_at) + ":", 1),
                              createVNode("span", { class: "quote-show__value" }, toDisplayString(__props.quote.issued_at), 1)
                            ]),
                            __props.quote.expires_at ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("span", { class: "quote-show__muted" }, toDisplayString(__props.labels.expires_at) + ":", 1),
                              createVNode("span", { class: "quote-show__value" }, toDisplayString(__props.quote.expires_at), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        flashSuccess.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "alert alert-success",
                          role: "alert"
                        }, toDisplayString(flashSuccess.value), 1)) : createCommentVNode("", true),
                        statusBanner.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: ["alert", statusBannerClass.value],
                          role: "alert"
                        }, toDisplayString(statusBanner.value), 3)) : createCommentVNode("", true),
                        createVNode("div", { class: "table-responsive mb-4" }, [
                          createVNode("table", { class: "quote-show__table" }, [
                            createVNode("thead", null, [
                              createVNode("tr", null, [
                                createVNode("th", null, toDisplayString(__props.labels.description), 1),
                                createVNode("th", { class: "text-end" }, toDisplayString(__props.labels.quantity), 1),
                                createVNode("th", { class: "text-end" }, toDisplayString(__props.labels.unit_price), 1),
                                createVNode("th", { class: "text-end" }, toDisplayString(__props.labels.discount), 1),
                                createVNode("th", { class: "text-end" }, toDisplayString(__props.labels.tax), 1),
                                createVNode("th", { class: "text-end" }, toDisplayString(__props.labels.amount), 1)
                              ])
                            ]),
                            createVNode("tbody", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.quote.lines, (line, index) => {
                                return openBlock(), createBlock("tr", { key: index }, [
                                  createVNode("td", null, toDisplayString(line.description), 1),
                                  createVNode("td", { class: "text-end" }, toDisplayString(line.quantity), 1),
                                  createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(line.unit_price)), 1),
                                  createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(line.discount_amount)), 1),
                                  createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(line.tax_amount)), 1),
                                  createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(line.amount)), 1)
                                ]);
                              }), 128))
                            ]),
                            createVNode("tfoot", null, [
                              createVNode("tr", null, [
                                createVNode("td", {
                                  colspan: "5",
                                  class: "text-end"
                                }, toDisplayString(__props.labels.subtotal), 1),
                                createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(__props.quote.subtotal)) + " " + toDisplayString(__props.quote.currency), 1)
                              ]),
                              createVNode("tr", null, [
                                createVNode("td", {
                                  colspan: "5",
                                  class: "text-end"
                                }, toDisplayString(__props.labels.discount), 1),
                                createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(__props.quote.discount_amount)), 1)
                              ]),
                              createVNode("tr", null, [
                                createVNode("td", {
                                  colspan: "5",
                                  class: "text-end"
                                }, toDisplayString(__props.labels.tax), 1),
                                createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(__props.quote.tax_amount)), 1)
                              ]),
                              createVNode("tr", { class: "quote-show__grand" }, [
                                createVNode("td", {
                                  colspan: "5",
                                  class: "text-end"
                                }, toDisplayString(__props.labels.total), 1),
                                createVNode("td", { class: "text-end" }, toDisplayString(formatMoney(__props.quote.total)) + " " + toDisplayString(__props.quote.currency), 1)
                              ])
                            ])
                          ])
                        ]),
                        __props.quote.terms ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mb-4"
                        }, [
                          createVNode("h5", { class: "quote-show__section-title" }, toDisplayString(__props.labels.terms), 1),
                          createVNode("p", {
                            class: "quote-show__muted",
                            style: { "white-space": "pre-wrap" }
                          }, toDisplayString(__props.quote.terms), 1)
                        ])) : createCommentVNode("", true),
                        __props.branding.sign_url ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "text-center mb-5"
                        }, [
                          createVNode("div", { class: "quote-show__label mb-2" }, toDisplayString(__props.labels.company_sign), 1),
                          createVNode("img", {
                            src: __props.branding.sign_url,
                            alt: __props.branding.name,
                            class: "quote-show__sign"
                          }, null, 8, ["src", "alt"])
                        ])) : createCommentVNode("", true),
                        __props.quote.can_respond ? (openBlock(), createBlock("div", {
                          key: 4,
                          class: "row g-4"
                        }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "quote-show__panel h-100" }, [
                              createVNode("h4", { class: "quote-show__section-title" }, toDisplayString(__props.labels.accept_title), 1),
                              createVNode("form", {
                                onSubmit: withModifiers(submitAccept, ["prevent"])
                              }, [
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode("label", { class: "quote-show__label form-label" }, toDisplayString(__props.labels.your_name), 1),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(acceptForm).responder_name = $event,
                                    type: "text",
                                    class: "quote-show__input",
                                    required: ""
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(acceptForm).responder_name]
                                  ]),
                                  unref(acceptForm).errors.responder_name ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-danger small mt-1"
                                  }, toDisplayString(unref(acceptForm).errors.responder_name), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode("label", { class: "quote-show__label form-label" }, toDisplayString(__props.labels.your_email), 1),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(acceptForm).responder_email = $event,
                                    type: "email",
                                    class: "quote-show__input"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(acceptForm).responder_email]
                                  ])
                                ]),
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode("label", { class: "quote-show__label form-label" }, toDisplayString(__props.labels.optional_note), 1),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => unref(acceptForm).response_note = $event,
                                    rows: "3",
                                    class: "quote-show__input"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(acceptForm).response_note]
                                  ])
                                ]),
                                createVNode("button", {
                                  type: "submit",
                                  class: "btn btn-dark",
                                  disabled: unref(acceptForm).processing
                                }, toDisplayString(__props.labels.confirm_accept), 9, ["disabled"])
                              ], 32)
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "quote-show__panel h-100" }, [
                              createVNode("h4", { class: "quote-show__section-title" }, toDisplayString(__props.labels.reject_title), 1),
                              createVNode("form", {
                                onSubmit: withModifiers(submitReject, ["prevent"])
                              }, [
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode("label", { class: "quote-show__label form-label" }, toDisplayString(__props.labels.your_name), 1),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(rejectForm).responder_name = $event,
                                    type: "text",
                                    class: "quote-show__input",
                                    required: ""
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(rejectForm).responder_name]
                                  ]),
                                  unref(rejectForm).errors.responder_name ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-danger small mt-1"
                                  }, toDisplayString(unref(rejectForm).errors.responder_name), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode("label", { class: "quote-show__label form-label" }, toDisplayString(__props.labels.your_email), 1),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(rejectForm).responder_email = $event,
                                    type: "email",
                                    class: "quote-show__input"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(rejectForm).responder_email]
                                  ])
                                ]),
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode("label", { class: "quote-show__label form-label" }, toDisplayString(__props.labels.optional_note), 1),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => unref(rejectForm).response_note = $event,
                                    rows: "3",
                                    class: "quote-show__input"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(rejectForm).response_note]
                                  ])
                                ]),
                                createVNode("button", {
                                  type: "submit",
                                  class: "btn btn-outline-danger",
                                  disabled: unref(rejectForm).processing
                                }, toDisplayString(__props.labels.confirm_reject), 9, ["disabled"])
                              ], 32)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/CRM/resources/assets/js/Pages/QuoteShow.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const QuoteShow = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-a3cda87c"]]);
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QuoteShow
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$J = {
  __name: "ClientsSection",
  __ssrInlineRender: true,
  props: {
    clients: { type: Array, default: () => [] }
  },
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.clients.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "section-small",
          id: "partners"
        }, _attrs))}><div class="container text-center"><h2>${ssrInterpolate(trans("Our Clients"))}</h2><div class="row wow fadeInUp"><!--[-->`);
        ssrRenderList(__props.clients.slice(0, 6), (client) => {
          _push(`<div class="col-md-2">`);
          if (client.url) {
            _push(`<a${ssrRenderAttr("href", client.url)} target="_blank" rel="noopener noreferrer"><img class="center-block img-responsive"${ssrRenderAttr("src", client.logo_link)}${ssrRenderAttr("alt", client.name)}></a>`);
          } else {
            _push(`<img class="center-block img-responsive"${ssrRenderAttr("src", client.logo_link)}${ssrRenderAttr("alt", client.name)}>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ClientsSection.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const _sfc_main$I = {
  __name: "AboutUs",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const teams = computed(() => page.props.teams || []);
    const testimonials = computed(() => page.props.testimonials || []);
    const clients = computed(() => page.props.clients || []);
    const meta = computed(() => page.props.meta || {});
    const metaTitle = computed(() => meta.value.title || `${trans("About Us")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => meta.value.description || trans("Learn about our team, mission, and the technology expertise behind our solutions.") || seo.value.website_desc || "");
    const metaKeywords = computed(() => meta.value.keywords || trans("about us, IT consulting, technology experts, digital transformation") || seo.value.website_keywords || "");
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const translateField = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      if (typeof value === "object" && value !== null) {
        return value[locale.value] || value.en || value[Object.keys(value)[0]] || "";
      }
      return "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)}${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website"${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("About Us"),
              subtitle: trans("Who we are?"),
              background: asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section id="about"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-lg-6"${_scopeId}><h2${_scopeId}>${ssrInterpolate(trans("About Us"))}</h2><p${_scopeId}>${ssrInterpolate(trans("Symfonix is a technology company that designs, builds, and scales digital systems where web, mobile, AI, and cloud work together instead of fighting each other. The name says it all: a symphony of technologies, orchestrated with intention."))}</p><h2 class="classic"${_scopeId}>— ${ssrInterpolate(seo.value.website_name)}</h2><ul class="list-unstyled"${_scopeId}><li${_scopeId}><strong${_scopeId}>${ssrInterpolate(trans("Harmony over chaos"))}</strong> — ${ssrInterpolate(trans("Every solution must be coherent. No messy stacks, no duct-tape architectures."))}</li><li${_scopeId}><strong${_scopeId}>${ssrInterpolate(trans("Engineering first"))}</strong> — ${ssrInterpolate(trans("Pretty UI is great, but solid architecture, performance, and maintainability come first."))}</li><li${_scopeId}><strong${_scopeId}>${ssrInterpolate(trans("Truth & clarity"))}</strong> — ${ssrInterpolate(trans("We say what's possible, what's risky, and what's unnecessary. No tech theater."))}</li><li${_scopeId}><strong${_scopeId}>${ssrInterpolate(trans("Continuous learning"))}</strong> — ${ssrInterpolate(trans("AI, cloud, and software evolve fast. We evolve faster."))}</li><li${_scopeId}><strong${_scopeId}>${ssrInterpolate(trans("Global mindset, local roots"))}</strong> — ${ssrInterpolate(trans("Built in Syria. Designed for the world."))}</li></ul></div><div class="col-lg-5 col-lg-offset-1"${_scopeId}><img class="img-responsive"${ssrRenderAttr("src", asset_path.value + "images/home/about_us.jpg")}${ssrRenderAttr("alt", trans("About Us"))}${_scopeId}></div></div></div></section>`);
            if (teams.value.length) {
              _push2(`<section id="team"${_scopeId}><div class="container text-center"${_scopeId}><h2${_scopeId}>${ssrInterpolate(trans("Meet The Team"))}</h2><div class="row"${_scopeId}><!--[-->`);
              ssrRenderList(teams.value, (team) => {
                _push2(`<div class="col-md-4 shadow"${_scopeId}><img class="img-responsive center-block"${ssrRenderAttr("src", team.image_link || team.avatar_link)}${ssrRenderAttr("alt", translateField(team.name))}${_scopeId}><h5${_scopeId}>${ssrInterpolate(translateField(team.name))} <div class="small"${_scopeId}>${ssrInterpolate(translateField(team.position))}</div></h5></div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            if (testimonials.value.length) {
              _push2(`<section class="section-small" id="testimonials"${_scopeId}><div class="container"${_scopeId}><!--[-->`);
              ssrRenderList(testimonials.value.slice(0, 1), (testimonial) => {
                _push2(`<div class="row"${_scopeId}><div class="col-md-3"${_scopeId}><h2${_scopeId}>${ssrInterpolate(trans("Testimonials"))}</h2></div><div class="col-md-3"${_scopeId}><img class="img-circle center-block img-responsive"${ssrRenderAttr("src", testimonial.avatar_link)}${ssrRenderAttr("alt", translateField(testimonial.name))}${_scopeId}></div><div class="col-md-6"${_scopeId}><h2 class="dark-gray"${_scopeId}>${ssrInterpolate(translateField(testimonial.quote))}</h2><div class="classic"${_scopeId}>${ssrInterpolate(translateField(testimonial.name))}</div><small${_scopeId}>${ssrInterpolate(translateField(testimonial.position))}</small></div></div>`);
              });
              _push2(`<!--]--></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$J, { clients: clients.value }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("About Us"),
                subtitle: trans("Who we are?"),
                background: asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", { id: "about" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-6" }, [
                      createVNode("h2", null, toDisplayString(trans("About Us")), 1),
                      createVNode("p", null, toDisplayString(trans("Symfonix is a technology company that designs, builds, and scales digital systems where web, mobile, AI, and cloud work together instead of fighting each other. The name says it all: a symphony of technologies, orchestrated with intention.")), 1),
                      createVNode("h2", { class: "classic" }, "— " + toDisplayString(seo.value.website_name), 1),
                      createVNode("ul", { class: "list-unstyled" }, [
                        createVNode("li", null, [
                          createVNode("strong", null, toDisplayString(trans("Harmony over chaos")), 1),
                          createTextVNode(" — " + toDisplayString(trans("Every solution must be coherent. No messy stacks, no duct-tape architectures.")), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, toDisplayString(trans("Engineering first")), 1),
                          createTextVNode(" — " + toDisplayString(trans("Pretty UI is great, but solid architecture, performance, and maintainability come first.")), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, toDisplayString(trans("Truth & clarity")), 1),
                          createTextVNode(" — " + toDisplayString(trans("We say what's possible, what's risky, and what's unnecessary. No tech theater.")), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, toDisplayString(trans("Continuous learning")), 1),
                          createTextVNode(" — " + toDisplayString(trans("AI, cloud, and software evolve fast. We evolve faster.")), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, toDisplayString(trans("Global mindset, local roots")), 1),
                          createTextVNode(" — " + toDisplayString(trans("Built in Syria. Designed for the world.")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-5 col-lg-offset-1" }, [
                      createVNode("img", {
                        class: "img-responsive",
                        src: asset_path.value + "images/home/about_us.jpg",
                        alt: trans("About Us")
                      }, null, 8, ["src", "alt"])
                    ])
                  ])
                ])
              ]),
              teams.value.length ? (openBlock(), createBlock("section", {
                key: 0,
                id: "team"
              }, [
                createVNode("div", { class: "container text-center" }, [
                  createVNode("h2", null, toDisplayString(trans("Meet The Team")), 1),
                  createVNode("div", { class: "row" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(teams.value, (team) => {
                      return openBlock(), createBlock("div", {
                        key: team.id,
                        class: "col-md-4 shadow"
                      }, [
                        createVNode("img", {
                          class: "img-responsive center-block",
                          src: team.image_link || team.avatar_link,
                          alt: translateField(team.name)
                        }, null, 8, ["src", "alt"]),
                        createVNode("h5", null, [
                          createTextVNode(toDisplayString(translateField(team.name)) + " ", 1),
                          createVNode("div", { class: "small" }, toDisplayString(translateField(team.position)), 1)
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              testimonials.value.length ? (openBlock(), createBlock("section", {
                key: 1,
                class: "section-small",
                id: "testimonials"
              }, [
                createVNode("div", { class: "container" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(testimonials.value.slice(0, 1), (testimonial) => {
                    return openBlock(), createBlock("div", {
                      class: "row",
                      key: testimonial.id
                    }, [
                      createVNode("div", { class: "col-md-3" }, [
                        createVNode("h2", null, toDisplayString(trans("Testimonials")), 1)
                      ]),
                      createVNode("div", { class: "col-md-3" }, [
                        createVNode("img", {
                          class: "img-circle center-block img-responsive",
                          src: testimonial.avatar_link,
                          alt: translateField(testimonial.name)
                        }, null, 8, ["src", "alt"])
                      ]),
                      createVNode("div", { class: "col-md-6" }, [
                        createVNode("h2", { class: "dark-gray" }, toDisplayString(translateField(testimonial.quote)), 1),
                        createVNode("div", { class: "classic" }, toDisplayString(translateField(testimonial.name)), 1),
                        createVNode("small", null, toDisplayString(translateField(testimonial.position)), 1)
                      ])
                    ]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true),
              createVNode(_sfc_main$O),
              createVNode(_sfc_main$J, { clients: clients.value }, null, 8, ["clients"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/AboutUs.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$I
}, Symbol.toStringTag, { value: "Module" }));
const __default__$b = {
  components: {
    AppLayout: _sfc_main$Q,
    HomeBlogCard: _sfc_main$P,
    CtaTwo: _sfc_main$O
  }
};
const _sfc_main$H = /* @__PURE__ */ Object.assign(__default__$b, {
  __name: "BlogIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo || {});
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const blogs = computed(() => page.props.blogs);
    const meta = computed(() => page.props.meta || {});
    const siteName = computed(() => seo.value.website_name || page.props.appName || "Symfonix");
    const metaTitle = computed(() => {
      return meta.value.title || `${trans("Blogs")} | ${siteName.value}`;
    });
    const metaDescription = computed(() => {
      return meta.value.description || trans("Explore our latest blogs, insights, and technology updates.") || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("blogs, news, insights, technology trends") || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)}${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website"${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Our Blogs"),
              subtitle: trans("News & Blog"),
              background: asset_path.value + "theme/img/main/43.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="news"${_scopeId}><div class="blog-page__shape-1"${_scopeId}></div><div class="blog-page__shape-2"${_scopeId}></div><div class="container"${_scopeId}><div class="section-title text-center sec-title-animation animation-style1"${_scopeId}><div class="section-title__tagline-box"${_scopeId}><div class="section-title__tagline-shape-1"${_scopeId}></div><span class="section-title__tagline"${_scopeId}>${ssrInterpolate(trans("News & Blog"))}</span><div class="section-title__tagline-shape-2"${_scopeId}></div></div><h2 class="section-title__title title-animation"${_scopeId}>${trans("How We've <span>Empowered Businesses</span><br><span> with Innovative</span>Tech Solutions") ?? ""}</h2></div><div class="row"${_scopeId}>`);
            if (blogs.value.data && blogs.value.data.length > 0) {
              _push2(`<!--[-->`);
              ssrRenderList(blogs.value.data, (blog) => {
                _push2(`<div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$P, {
                  post: blog,
                  variant: "featured",
                  locale: locale.value,
                  "asset-path": asset_path.value,
                  "image-fallback-index": 1
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-12"${_scopeId}><div class="text-center py-5"${_scopeId}><h3 class="text-muted"${_scopeId}>${ssrInterpolate(trans("No blogs found"))} <i class="fa fa-xmark text-danger"${_scopeId}></i></h3></div></div>`);
            }
            if (blogs.value.last_page > 1) {
              _push2(`<div class="blog-page__pagination"${_scopeId}><ul class="pg-pagination list-unstyled"${_scopeId}>`);
              if (blogs.value.prev_page_url) {
                _push2(`<li class="prev"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: blogs.value.prev_page_url,
                  "aria-label": "prev"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="icon-left-arrow-1"${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", { class: "icon-left-arrow-1" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(blogs.value.links, (link, index) => {
                _push2(`<!--[-->`);
                if (link.url && index > 0 && index < blogs.value.links.length - 1) {
                  _push2(`<li class="${ssrRenderClass(["count", link.active ? "active" : ""])}"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url
                  }, {
                    default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(link.label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(link.label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</li>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              if (blogs.value.next_page_url) {
                _push2(`<li class="next"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: blogs.value.next_page_url,
                  "aria-label": "Next"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`)}"${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", {
                          class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Our Blogs"),
                subtitle: trans("News & Blog"),
                background: asset_path.value + "theme/img/main/43.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "news"
              }, [
                createVNode("div", { class: "blog-page__shape-1" }),
                createVNode("div", { class: "blog-page__shape-2" }),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "section-title text-center sec-title-animation animation-style1" }, [
                    createVNode("div", { class: "section-title__tagline-box" }, [
                      createVNode("div", { class: "section-title__tagline-shape-1" }),
                      createVNode("span", { class: "section-title__tagline" }, toDisplayString(trans("News & Blog")), 1),
                      createVNode("div", { class: "section-title__tagline-shape-2" })
                    ]),
                    createVNode("h2", {
                      class: "section-title__title title-animation",
                      innerHTML: trans("How We've <span>Empowered Businesses</span><br><span> with Innovative</span>Tech Solutions")
                    }, null, 8, ["innerHTML"])
                  ]),
                  createVNode("div", { class: "row" }, [
                    blogs.value.data && blogs.value.data.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(blogs.value.data, (blog) => {
                      return openBlock(), createBlock("div", {
                        key: blog.id,
                        class: "col-xl-4 col-lg-6 col-md-6 wow fadeInUp",
                        "data-wow-delay": "100ms"
                      }, [
                        createVNode(_sfc_main$P, {
                          post: blog,
                          variant: "featured",
                          locale: locale.value,
                          "asset-path": asset_path.value,
                          "image-fallback-index": 1
                        }, null, 8, ["post", "locale", "asset-path"])
                      ]);
                    }), 128)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "col-12"
                    }, [
                      createVNode("div", { class: "text-center py-5" }, [
                        createVNode("h3", { class: "text-muted" }, [
                          createTextVNode(toDisplayString(trans("No blogs found")) + " ", 1),
                          createVNode("i", { class: "fa fa-xmark text-danger" })
                        ])
                      ])
                    ])),
                    blogs.value.last_page > 1 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "blog-page__pagination"
                    }, [
                      createVNode("ul", { class: "pg-pagination list-unstyled" }, [
                        blogs.value.prev_page_url ? (openBlock(), createBlock("li", {
                          key: 0,
                          class: "prev"
                        }, [
                          createVNode(unref(Link), {
                            href: blogs.value.prev_page_url,
                            "aria-label": "prev"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "icon-left-arrow-1" })
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(blogs.value.links, (link, index) => {
                          return openBlock(), createBlock(Fragment, { key: index }, [
                            link.url && index > 0 && index < blogs.value.links.length - 1 ? (openBlock(), createBlock("li", {
                              key: 0,
                              class: ["count", link.active ? "active" : ""]
                            }, [
                              createVNode(unref(Link), {
                                href: link.url
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(link.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ], 2)) : createCommentVNode("", true)
                          ], 64);
                        }), 128)),
                        blogs.value.next_page_url ? (openBlock(), createBlock("li", {
                          key: 1,
                          class: "next"
                        }, [
                          createVNode(unref(Link), {
                            href: blogs.value.next_page_url,
                            "aria-label": "Next"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                              }, null, 2)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/BlogIndex.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$H
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$G = {
  __name: "BlogShow",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const isRtl = computed(() => locale.value === "ar");
    const blog = computed(() => page.props.blog || {});
    const relatedBlogs = computed(() => page.props.relatedBlogs || []);
    const categories = computed(() => page.props.categories || []);
    const recentPosts = computed(() => page.props.recentPosts || []);
    const previousPost = computed(() => page.props.previousPost);
    const nextPost = computed(() => page.props.nextPost);
    const meta = computed(() => page.props.meta || {});
    const seo = computed(() => page.props.seo || {});
    const settings = computed(() => page.props.settings || {});
    const fallbackImage = computed(() => `${asset_path.value}theme/img/main/12.jpg`);
    const headerBackground = computed(() => fallbackImage.value);
    const metaTitle = computed(() => {
      var _a;
      return meta.value.title || ((_a = blog.value) == null ? void 0 : _a.title) || "";
    });
    const metaDescription = computed(() => {
      var _a;
      return meta.value.description || ((_a = blog.value) == null ? void 0 : _a.description) || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      var _a;
      return meta.value.keywords || ((_a = blog.value) == null ? void 0 : _a.keywords) || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_c = blog.value) == null ? void 0 : _c.image_link) || ((_d = settings.value) == null ? void 0 : _d.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const keywordList = computed(() => {
      var _a;
      const keywords = (_a = blog.value) == null ? void 0 : _a.keywords;
      if (!keywords) {
        return [];
      }
      if (typeof keywords === "string") {
        return keywords.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 6);
      }
      return [];
    });
    const searchQuery = ref("");
    const relatedExcerpt = (item) => {
      const raw = String((item == null ? void 0 : item.description) || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (!raw) {
        return "";
      }
      return raw.length > 140 ? `${raw.slice(0, 140).trim()}…` : raw;
    };
    const getShareUrl = (platform) => {
      if (typeof window === "undefined") {
        return "#";
      }
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(blog.value.title || "");
      switch (platform) {
        case "twitter":
          return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        case "facebook":
          return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "linkedin":
          return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        case "whatsapp":
          return `https://wa.me/?text=${title}%20${url}`;
        default:
          return "#";
      }
    };
    const handleSearch = () => {
      const query = searchQuery.value.trim();
      if (query) {
        router.get(route("blogs.index"), { search: query });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-8faa44b5${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-8faa44b5${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-8faa44b5${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-8faa44b5${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-8faa44b5${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-8faa44b5${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-8faa44b5${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-8faa44b5${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-8faa44b5${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="article" data-v-8faa44b5${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-8faa44b5${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-8faa44b5${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-8faa44b5${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-8faa44b5${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "article"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: blog.value.title,
              subtitle: trans("Blogs"),
              "parent-href": _ctx.route("blogs.index"),
              crumb: blog.value.created_at_formatted || "",
              background: headerBackground.value,
              compact: ""
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="news-single" data-v-8faa44b5${_scopeId}><div class="container" data-v-8faa44b5${_scopeId}><div class="row" data-v-8faa44b5${_scopeId}><article class="col-md-8 news-article" data-v-8faa44b5${_scopeId}>`);
            if (blog.value.description) {
              _push2(`<p class="news-lead" data-v-8faa44b5${_scopeId}>${ssrInterpolate(blog.value.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (blog.value.image_link) {
              _push2(`<img class="img-responsive news-hero"${ssrRenderAttr("src", blog.value.image_link)}${ssrRenderAttr("alt", blog.value.title)} loading="lazy" decoding="async" data-v-8faa44b5${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<ul class="list-inline news-meta" data-v-8faa44b5${_scopeId}>`);
            if (blog.value.created_at_formatted) {
              _push2(`<li data-v-8faa44b5${_scopeId}><i class="fa fa-calendar" aria-hidden="true" data-v-8faa44b5${_scopeId}></i> ${ssrInterpolate(blog.value.created_at_formatted)}</li>`);
            } else {
              _push2(`<!---->`);
            }
            if (blog.value.reading_time) {
              _push2(`<li data-v-8faa44b5${_scopeId}><i class="fa fa-clock" aria-hidden="true" data-v-8faa44b5${_scopeId}></i> ${ssrInterpolate(blog.value.reading_time)} ${ssrInterpolate(trans("min read"))}</li>`);
            } else {
              _push2(`<!---->`);
            }
            if (blog.value.category) {
              _push2(`<li data-v-8faa44b5${_scopeId}><i class="fa fa-folder-open" aria-hidden="true" data-v-8faa44b5${_scopeId}></i>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("blogs.index", { category: blog.value.category.slug })
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(blog.value.category.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(blog.value.category.name), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul><div class="news-content" data-v-8faa44b5${_scopeId}>${blog.value.content ?? ""}</div><div class="news-footer" data-v-8faa44b5${_scopeId}>`);
            if (keywordList.value.length) {
              _push2(`<div class="news-tags" data-v-8faa44b5${_scopeId}><strong data-v-8faa44b5${_scopeId}>${ssrInterpolate(trans("Tags"))}:</strong><!--[-->`);
              ssrRenderList(keywordList.value, (keyword) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: keyword,
                  class: "btn btn-gray btn-xs",
                  href: _ctx.route("blogs.index", { search: keyword })
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(keyword)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(keyword), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="news-share" data-v-8faa44b5${_scopeId}><strong data-v-8faa44b5${_scopeId}>${ssrInterpolate(trans("Share On:"))}</strong><a${ssrRenderAttr("href", getShareUrl("facebook"))} target="_blank" rel="noopener" aria-label="Facebook" data-v-8faa44b5${_scopeId}><i class="fab fa-facebook-f fa-fw" data-v-8faa44b5${_scopeId}></i></a><a${ssrRenderAttr("href", getShareUrl("twitter"))} target="_blank" rel="noopener" aria-label="Twitter" data-v-8faa44b5${_scopeId}><i class="fab fa-twitter fa-fw" data-v-8faa44b5${_scopeId}></i></a><a${ssrRenderAttr("href", getShareUrl("linkedin"))} target="_blank" rel="noopener" aria-label="LinkedIn" data-v-8faa44b5${_scopeId}><i class="fab fa-linkedin-in fa-fw" data-v-8faa44b5${_scopeId}></i></a><a${ssrRenderAttr("href", getShareUrl("whatsapp"))} target="_blank" rel="noopener" aria-label="WhatsApp" data-v-8faa44b5${_scopeId}><i class="fab fa-whatsapp fa-fw" data-v-8faa44b5${_scopeId}></i></a></div></div></article><aside class="col-md-3 col-md-offset-1 news-sidebar" data-v-8faa44b5${_scopeId}><form class="form-inline subscribe-form" data-v-8faa44b5${_scopeId}><div class="input-group" data-v-8faa44b5${_scopeId}><input class="form-control" type="search"${ssrRenderAttr("value", searchQuery.value)}${ssrRenderAttr("placeholder", trans("Search Blogs"))} data-v-8faa44b5${_scopeId}><span class="input-group-btn" data-v-8faa44b5${_scopeId}><button class="btn btn-dark" type="submit"${ssrRenderAttr("aria-label", trans("Search"))} data-v-8faa44b5${_scopeId}><i class="fa fa-search" data-v-8faa44b5${_scopeId}></i></button></span></div></form><hr data-v-8faa44b5${_scopeId}><h4 data-v-8faa44b5${_scopeId}>${ssrInterpolate(trans("Categories"))}</h4><ul class="list-unstyled news-cats" data-v-8faa44b5${_scopeId}><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              var _a;
              _push2(`<li data-v-8faa44b5${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("blogs.index", { category: category.slug }),
                class: { active: ((_a = blog.value.category) == null ? void 0 : _a.slug) === category.slug }
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(category.name)} <span data-v-8faa44b5${_scopeId2}>(${ssrInterpolate(category.blogs_count)})</span>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(category.name) + " ", 1),
                      createVNode("span", null, "(" + toDisplayString(category.blogs_count) + ")", 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul><hr data-v-8faa44b5${_scopeId}><h4 data-v-8faa44b5${_scopeId}>${ssrInterpolate(trans("Recent Post"))}</h4><ul class="list-unstyled recent-posts" data-v-8faa44b5${_scopeId}><!--[-->`);
            ssrRenderList(recentPosts.value, (recentPost) => {
              _push2(`<li class="recent-post" data-v-8faa44b5${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("blogs.show", recentPost.slug)
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", recentPost.image_link || fallbackImage.value)}${ssrRenderAttr("alt", recentPost.title)} loading="lazy" decoding="async" data-v-8faa44b5${_scopeId2}><span class="recent-post__body" data-v-8faa44b5${_scopeId2}><strong data-v-8faa44b5${_scopeId2}>${ssrInterpolate(recentPost.title)}</strong>`);
                    if (recentPost.created_at) {
                      _push3(`<small data-v-8faa44b5${_scopeId2}>${ssrInterpolate(recentPost.created_at)}</small>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: recentPost.image_link || fallbackImage.value,
                        alt: recentPost.title,
                        loading: "lazy",
                        decoding: "async"
                      }, null, 8, ["src", "alt"]),
                      createVNode("span", { class: "recent-post__body" }, [
                        createVNode("strong", null, toDisplayString(recentPost.title), 1),
                        recentPost.created_at ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(recentPost.created_at), 1)) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul></aside></div></div></section>`);
            if (relatedBlogs.value.length) {
              _push2(`<section class="section-small bg-white" data-v-8faa44b5${_scopeId}><div class="container grid-pad" data-v-8faa44b5${_scopeId}><h3 data-v-8faa44b5${_scopeId}>${ssrInterpolate(trans("Related Blogs"))}</h3><div class="row" data-v-8faa44b5${_scopeId}><!--[-->`);
              ssrRenderList(relatedBlogs.value, (relatedBlog) => {
                _push2(`<div class="col-sm-6 col-md-4" data-v-8faa44b5${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("blogs.show", relatedBlog.slug)
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img class="img-responsive center-block"${ssrRenderAttr("src", relatedBlog.image_link || fallbackImage.value)}${ssrRenderAttr("alt", relatedBlog.title)} loading="lazy" decoding="async" data-v-8faa44b5${_scopeId2}><h5 data-v-8faa44b5${_scopeId2}>${ssrInterpolate(relatedBlog.title)}</h5>`);
                    } else {
                      return [
                        createVNode("img", {
                          class: "img-responsive center-block",
                          src: relatedBlog.image_link || fallbackImage.value,
                          alt: relatedBlog.title,
                          loading: "lazy",
                          decoding: "async"
                        }, null, 8, ["src", "alt"]),
                        createVNode("h5", null, toDisplayString(relatedBlog.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (relatedExcerpt(relatedBlog)) {
                  _push2(`<p data-v-8faa44b5${_scopeId}>${ssrInterpolate(relatedExcerpt(relatedBlog))}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="section section-small" data-v-8faa44b5${_scopeId}><div class="container" data-v-8faa44b5${_scopeId}><nav aria-label="blog pagination" data-v-8faa44b5${_scopeId}><ul class="news-pager" data-v-8faa44b5${_scopeId}><li class="news-pager__side" data-v-8faa44b5${_scopeId}>`);
            if (previousPost.value) {
              _push2(ssrRenderComponent(unref(Link), {
                class: "text-muted",
                href: _ctx.route("blogs.show", previousPost.value.slug)
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="${ssrRenderClass(isRtl.value ? "fa fa-angle-right" : "fa fa-angle-left")}" data-v-8faa44b5${_scopeId2}></i> ${ssrInterpolate(trans("Prev Blog"))} <span class="news-pager__title" data-v-8faa44b5${_scopeId2}>${ssrInterpolate(previousPost.value.title)}</span>`);
                  } else {
                    return [
                      createVNode("i", {
                        class: isRtl.value ? "fa fa-angle-right" : "fa fa-angle-left"
                      }, null, 2),
                      createTextVNode(" " + toDisplayString(trans("Prev Blog")) + " ", 1),
                      createVNode("span", { class: "news-pager__title" }, toDisplayString(previousPost.value.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</li><li class="news-pager__index" data-v-8faa44b5${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("blogs.index"),
              "aria-label": trans("All Blogs")
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fa fa-th fa-2x" data-v-8faa44b5${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "fa fa-th fa-2x" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="news-pager__side news-pager__side--end" data-v-8faa44b5${_scopeId}>`);
            if (nextPost.value) {
              _push2(ssrRenderComponent(unref(Link), {
                class: "text-muted",
                href: _ctx.route("blogs.show", nextPost.value.slug)
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("Next Blog"))} <i class="${ssrRenderClass(isRtl.value ? "fa fa-angle-left" : "fa fa-angle-right")}" data-v-8faa44b5${_scopeId2}></i><span class="news-pager__title" data-v-8faa44b5${_scopeId2}>${ssrInterpolate(nextPost.value.title)}</span>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("Next Blog")) + " ", 1),
                      createVNode("i", {
                        class: isRtl.value ? "fa fa-angle-left" : "fa fa-angle-right"
                      }, null, 2),
                      createVNode("span", { class: "news-pager__title" }, toDisplayString(nextPost.value.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</li></ul></nav></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: blog.value.title,
                subtitle: trans("Blogs"),
                "parent-href": _ctx.route("blogs.index"),
                crumb: blog.value.created_at_formatted || "",
                background: headerBackground.value,
                compact: ""
              }, null, 8, ["title", "subtitle", "parent-href", "crumb", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "news-single"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("article", { class: "col-md-8 news-article" }, [
                      blog.value.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "news-lead"
                      }, toDisplayString(blog.value.description), 1)) : createCommentVNode("", true),
                      blog.value.image_link ? (openBlock(), createBlock("img", {
                        key: 1,
                        class: "img-responsive news-hero",
                        src: blog.value.image_link,
                        alt: blog.value.title,
                        loading: "lazy",
                        decoding: "async"
                      }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                      createVNode("ul", { class: "list-inline news-meta" }, [
                        blog.value.created_at_formatted ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("i", {
                            class: "fa fa-calendar",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" " + toDisplayString(blog.value.created_at_formatted), 1)
                        ])) : createCommentVNode("", true),
                        blog.value.reading_time ? (openBlock(), createBlock("li", { key: 1 }, [
                          createVNode("i", {
                            class: "fa fa-clock",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" " + toDisplayString(blog.value.reading_time) + " " + toDisplayString(trans("min read")), 1)
                        ])) : createCommentVNode("", true),
                        blog.value.category ? (openBlock(), createBlock("li", { key: 2 }, [
                          createVNode("i", {
                            class: "fa fa-folder-open",
                            "aria-hidden": "true"
                          }),
                          createVNode(unref(Link), {
                            href: _ctx.route("blogs.index", { category: blog.value.category.slug })
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(blog.value.category.name), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", {
                        class: "news-content",
                        innerHTML: blog.value.content
                      }, null, 8, ["innerHTML"]),
                      createVNode("div", { class: "news-footer" }, [
                        keywordList.value.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "news-tags"
                        }, [
                          createVNode("strong", null, toDisplayString(trans("Tags")) + ":", 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(keywordList.value, (keyword) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: keyword,
                              class: "btn btn-gray btn-xs",
                              href: _ctx.route("blogs.index", { search: keyword })
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(keyword), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "news-share" }, [
                          createVNode("strong", null, toDisplayString(trans("Share On:")), 1),
                          createVNode("a", {
                            href: getShareUrl("facebook"),
                            target: "_blank",
                            rel: "noopener",
                            "aria-label": "Facebook"
                          }, [
                            createVNode("i", { class: "fab fa-facebook-f fa-fw" })
                          ], 8, ["href"]),
                          createVNode("a", {
                            href: getShareUrl("twitter"),
                            target: "_blank",
                            rel: "noopener",
                            "aria-label": "Twitter"
                          }, [
                            createVNode("i", { class: "fab fa-twitter fa-fw" })
                          ], 8, ["href"]),
                          createVNode("a", {
                            href: getShareUrl("linkedin"),
                            target: "_blank",
                            rel: "noopener",
                            "aria-label": "LinkedIn"
                          }, [
                            createVNode("i", { class: "fab fa-linkedin-in fa-fw" })
                          ], 8, ["href"]),
                          createVNode("a", {
                            href: getShareUrl("whatsapp"),
                            target: "_blank",
                            rel: "noopener",
                            "aria-label": "WhatsApp"
                          }, [
                            createVNode("i", { class: "fab fa-whatsapp fa-fw" })
                          ], 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("aside", { class: "col-md-3 col-md-offset-1 news-sidebar" }, [
                      createVNode("form", {
                        class: "form-inline subscribe-form",
                        onSubmit: withModifiers(handleSearch, ["prevent"])
                      }, [
                        createVNode("div", { class: "input-group" }, [
                          withDirectives(createVNode("input", {
                            class: "form-control",
                            type: "search",
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            placeholder: trans("Search Blogs")
                          }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                            [vModelText, searchQuery.value]
                          ]),
                          createVNode("span", { class: "input-group-btn" }, [
                            createVNode("button", {
                              class: "btn btn-dark",
                              type: "submit",
                              "aria-label": trans("Search")
                            }, [
                              createVNode("i", { class: "fa fa-search" })
                            ], 8, ["aria-label"])
                          ])
                        ])
                      ], 32),
                      createVNode("hr"),
                      createVNode("h4", null, toDisplayString(trans("Categories")), 1),
                      createVNode("ul", { class: "list-unstyled news-cats" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                          var _a;
                          return openBlock(), createBlock("li", {
                            key: category.id
                          }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("blogs.index", { category: category.slug }),
                              class: { active: ((_a = blog.value.category) == null ? void 0 : _a.slug) === category.slug }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.name) + " ", 1),
                                createVNode("span", null, "(" + toDisplayString(category.blogs_count) + ")", 1)
                              ]),
                              _: 2
                            }, 1032, ["href", "class"])
                          ]);
                        }), 128))
                      ]),
                      createVNode("hr"),
                      createVNode("h4", null, toDisplayString(trans("Recent Post")), 1),
                      createVNode("ul", { class: "list-unstyled recent-posts" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(recentPosts.value, (recentPost) => {
                          return openBlock(), createBlock("li", {
                            key: recentPost.id,
                            class: "recent-post"
                          }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("blogs.show", recentPost.slug)
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: recentPost.image_link || fallbackImage.value,
                                  alt: recentPost.title,
                                  loading: "lazy",
                                  decoding: "async"
                                }, null, 8, ["src", "alt"]),
                                createVNode("span", { class: "recent-post__body" }, [
                                  createVNode("strong", null, toDisplayString(recentPost.title), 1),
                                  recentPost.created_at ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(recentPost.created_at), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]),
              relatedBlogs.value.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "section-small bg-white"
              }, [
                createVNode("div", { class: "container grid-pad" }, [
                  createVNode("h3", null, toDisplayString(trans("Related Blogs")), 1),
                  createVNode("div", { class: "row" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(relatedBlogs.value, (relatedBlog) => {
                      return openBlock(), createBlock("div", {
                        key: relatedBlog.id,
                        class: "col-sm-6 col-md-4"
                      }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("blogs.show", relatedBlog.slug)
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              class: "img-responsive center-block",
                              src: relatedBlog.image_link || fallbackImage.value,
                              alt: relatedBlog.title,
                              loading: "lazy",
                              decoding: "async"
                            }, null, 8, ["src", "alt"]),
                            createVNode("h5", null, toDisplayString(relatedBlog.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        relatedExcerpt(relatedBlog) ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(relatedExcerpt(relatedBlog)), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "section section-small" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("nav", { "aria-label": "blog pagination" }, [
                    createVNode("ul", { class: "news-pager" }, [
                      createVNode("li", { class: "news-pager__side" }, [
                        previousPost.value ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          class: "text-muted",
                          href: _ctx.route("blogs.show", previousPost.value.slug)
                        }, {
                          default: withCtx(() => [
                            createVNode("i", {
                              class: isRtl.value ? "fa fa-angle-right" : "fa fa-angle-left"
                            }, null, 2),
                            createTextVNode(" " + toDisplayString(trans("Prev Blog")) + " ", 1),
                            createVNode("span", { class: "news-pager__title" }, toDisplayString(previousPost.value.title), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("li", { class: "news-pager__index" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("blogs.index"),
                          "aria-label": trans("All Blogs")
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "fa fa-th fa-2x" })
                          ]),
                          _: 1
                        }, 8, ["href", "aria-label"])
                      ]),
                      createVNode("li", { class: "news-pager__side news-pager__side--end" }, [
                        nextPost.value ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          class: "text-muted",
                          href: _ctx.route("blogs.show", nextPost.value.slug)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(trans("Next Blog")) + " ", 1),
                            createVNode("i", {
                              class: isRtl.value ? "fa fa-angle-left" : "fa fa-angle-right"
                            }, null, 2),
                            createVNode("span", { class: "news-pager__title" }, toDisplayString(nextPost.value.title), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/BlogShow.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const BlogShow = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-8faa44b5"]]);
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogShow
}, Symbol.toStringTag, { value: "Module" }));
const __default__$a = {
  components: {
    AppLayout: _sfc_main$Q,
    CtaTwo: _sfc_main$O
  }
};
const _sfc_main$F = /* @__PURE__ */ Object.assign(__default__$a, {
  __name: "Faq",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const asset_path = computed(() => page.props.asset_path || "");
    const settings = computed(() => page.props.settings || {});
    const locale = computed(() => page.props.locale);
    const meta = computed(() => page.props.meta || {});
    const metaTitle = computed(() => {
      return meta.value.title || `${trans("FAQs")} | ${seo.value.website_name || ""}`.trim();
    });
    const metaDescription = computed(() => {
      return meta.value.description || trans("Find answers to common questions about our services and policies.") || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("FAQ, help center, support, common questions") || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const faqs = computed(() => {
      return page.props.faqs || [];
    });
    const activeIndex = ref(0);
    const toggleAccordion = (index) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };
    watch(() => faqs.value, (newFaqs) => {
      if (newFaqs && newFaqs.length > 0 && activeIndex.value === null) {
        activeIndex.value = 0;
      }
    }, { immediate: true });
    const translateField = (field) => {
      if (!field) return "";
      if (typeof field === "string") return field;
      if (typeof field === "object") {
        return field[locale.value] || field["en"] || field[Object.keys(field)[0]] || "";
      }
      return "";
    };
    const faqSchema = computed(() => {
      if (page.props.faqSchema) {
        return page.props.faqSchema;
      }
      if (!faqs.value || !Array.isArray(faqs.value) || faqs.value.length === 0) {
        return null;
      }
      const mainEntity = faqs.value.map((faq) => {
        const question = translateField(faq.question);
        const answer = translateField(faq.answer);
        if (!question || !answer || question.trim() === "" || answer.trim() === "") {
          return null;
        }
        const answerText = answer.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s\s+/g, " ").trim();
        if (!answerText || answerText.trim() === "") {
          return null;
        }
        return {
          "@type": "Question",
          name: question.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: answerText
          }
        };
      }).filter((item) => item !== null);
      if (mainEntity.length === 0) {
        return null;
      }
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity
      };
    });
    const faqSchemaJson = computed(() => {
      if (!faqSchema.value) return "";
      return JSON.stringify(faqSchema.value, null, 2);
    });
    let schemaScript = null;
    const SCRIPT_ID = "faq-schema-json-ld";
    const updateSchemaScript = () => {
      const existingServerScript = document.querySelector('script[type="application/ld+json"]:not([data-inertia])');
      if (existingServerScript && existingServerScript.textContent.includes("FAQPage")) {
        return;
      }
      if (typeof document === "undefined" || !document.head) {
        return;
      }
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
        schemaScript = null;
      }
      if (faqSchemaJson.value && faqSchemaJson.value.trim() !== "") {
        try {
          schemaScript = document.createElement("script");
          schemaScript.id = SCRIPT_ID;
          schemaScript.type = "application/ld+json";
          schemaScript.textContent = faqSchemaJson.value;
          schemaScript.setAttribute("data-inertia", "true");
          document.head.appendChild(schemaScript);
        } catch (error) {
          console.error("Error injecting FAQ Schema:", error);
        }
      }
    };
    onMounted(() => {
      nextTick(() => {
        updateSchemaScript();
      });
    });
    onUnmounted(() => {
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
        schemaScript = null;
      }
    });
    watch(() => faqSchemaJson.value, (newValue) => {
      if (newValue && newValue.trim() !== "") {
        nextTick(() => {
          updateSchemaScript();
        });
      }
    }, { immediate: true, deep: true });
    watch(() => faqs.value, () => {
      nextTick(() => {
        updateSchemaScript();
      });
    }, { immediate: true, deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-4393ae28${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-4393ae28${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-4393ae28${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-4393ae28${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-4393ae28${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-4393ae28${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-4393ae28${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-4393ae28${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-4393ae28${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website" data-v-4393ae28${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-4393ae28${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-4393ae28${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-4393ae28${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-4393ae28${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("FAQs"),
              subtitle: trans("Frequently Asked Questions"),
              background: asset_path.value + "theme/img/main/11.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section data-v-4393ae28${_scopeId}><div class="container" data-v-4393ae28${_scopeId}><div class="section-title text-center sec-title-animation animation-style1" data-v-4393ae28${_scopeId}><div class="section-title__tagline-box" data-v-4393ae28${_scopeId}><div class="section-title__tagline-shape-1" data-v-4393ae28${_scopeId}></div><span class="section-title__tagline" data-v-4393ae28${_scopeId}>${ssrInterpolate(trans("FAQs"))}</span><div class="section-title__tagline-shape-2" data-v-4393ae28${_scopeId}></div></div><h2 class="section-title__title title-animation" data-v-4393ae28${_scopeId}>${ssrInterpolate(trans("Get answers to the most common questions about our products, services, and policies."))}</h2></div><div class="faq-two__right" data-v-4393ae28${_scopeId}>`);
            if (faqs.value && faqs.value.length > 0) {
              _push2(`<div class="accrodion-grp" data-grp-name="faq-one-accrodion" data-v-4393ae28${_scopeId}><!--[-->`);
              ssrRenderList(faqs.value, (faq, index) => {
                _push2(`<div class="${ssrRenderClass([{ "active": activeIndex.value === index }, "accrodion"])}" data-v-4393ae28${_scopeId}><div class="accrodion-title" data-v-4393ae28${_scopeId}><h4 data-v-4393ae28${_scopeId}>${ssrInterpolate(translateField(faq.question))}</h4></div><div class="accrodion-content" style="${ssrRenderStyle(activeIndex.value === index ? null : { display: "none" })}" data-v-4393ae28${_scopeId}><div class="inner" data-v-4393ae28${_scopeId}><p class="accrodion-content__text-1" data-v-4393ae28${_scopeId}>${translateField(faq.answer) ?? ""}</p></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-5" data-v-4393ae28${_scopeId}><p data-v-4393ae28${_scopeId}>${ssrInterpolate(trans("No FAQs found."))}</p></div>`);
            }
            _push2(`</div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("FAQs"),
                subtitle: trans("Frequently Asked Questions"),
                background: asset_path.value + "theme/img/main/11.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", null, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "section-title text-center sec-title-animation animation-style1" }, [
                    createVNode("div", { class: "section-title__tagline-box" }, [
                      createVNode("div", { class: "section-title__tagline-shape-1" }),
                      createVNode("span", { class: "section-title__tagline" }, toDisplayString(trans("FAQs")), 1),
                      createVNode("div", { class: "section-title__tagline-shape-2" })
                    ]),
                    createVNode("h2", { class: "section-title__title title-animation" }, toDisplayString(trans("Get answers to the most common questions about our products, services, and policies.")), 1)
                  ]),
                  createVNode("div", { class: "faq-two__right" }, [
                    faqs.value && faqs.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "accrodion-grp",
                      "data-grp-name": "faq-one-accrodion"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(faqs.value, (faq, index) => {
                        return openBlock(), createBlock("div", {
                          class: ["accrodion", { "active": activeIndex.value === index }],
                          key: faq.id || index
                        }, [
                          createVNode("div", {
                            class: "accrodion-title",
                            onClick: ($event) => toggleAccordion(index)
                          }, [
                            createVNode("h4", null, toDisplayString(translateField(faq.question)), 1)
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "accrodion-content" }, [
                            createVNode("div", { class: "inner" }, [
                              createVNode("p", {
                                class: "accrodion-content__text-1",
                                innerHTML: translateField(faq.answer)
                              }, null, 8, ["innerHTML"])
                            ])
                          ], 512), [
                            [vShow, activeIndex.value === index]
                          ])
                        ], 2);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-5"
                    }, [
                      createVNode("p", null, toDisplayString(trans("No FAQs found.")), 1)
                    ]))
                  ])
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/Faq.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const Faq = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-4393ae28"]]);
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Faq
}, Symbol.toStringTag, { value: "Module" }));
const __default__$9 = {
  components: {
    AppLayout: _sfc_main$Q
  }
};
const _sfc_main$E = /* @__PURE__ */ Object.assign(__default__$9, {
  __name: "PageShow",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const seo = computed(() => page.props.seo);
    const custom_page = computed(() => page.props.custom_page);
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const banner = computed(() => page.props.banner);
    const metaTitle = computed(() => {
      var _a, _b;
      const pageTitle = ((_b = (_a = custom_page.value) == null ? void 0 : _a.title) == null ? void 0 : _b[locale.value]) || "";
      return `${pageTitle} | ${seo.value.website_name || ""}`.trim();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(metaTitle.value)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: custom_page.value.title[locale.value],
              background: banner.value || asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small"${_scopeId}><div class="container"${_scopeId}><div class="content"${_scopeId}><div${_scopeId}>${custom_page.value.content[locale.value] ?? ""}</div></div></div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: custom_page.value.title[locale.value],
                background: banner.value || asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "background"]),
              createVNode("section", { class: "section-small" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "content" }, [
                    createVNode("div", {
                      innerHTML: custom_page.value.content[locale.value]
                    }, null, 8, ["innerHTML"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/PageShow.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$E
}, Symbol.toStringTag, { value: "Module" }));
const __default__$8 = {
  components: {
    AppLayout: _sfc_main$Q
  }
};
const _sfc_main$D = /* @__PURE__ */ Object.assign(__default__$8, {
  __name: "PrivacyPolicy",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const asset_path = computed(() => page.props.asset_path || "");
    const settings = computed(() => page.props.settings || {});
    computed(() => page.props.locale);
    const meta = computed(() => page.props.meta || {});
    const metaTitle = computed(() => {
      return meta.value.title || `${trans("Privacy Policy")} | ${seo.value.website_name || ""}`.trim();
    });
    const metaDescription = computed(() => {
      return meta.value.description || trans("Review how we collect, use, and protect your personal information.") || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("privacy policy, data protection, security, compliance") || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-77fc15eb${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-77fc15eb${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-77fc15eb${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-77fc15eb${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-77fc15eb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-77fc15eb${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-77fc15eb${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-77fc15eb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-77fc15eb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website" data-v-77fc15eb${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-77fc15eb${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-77fc15eb${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-77fc15eb${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-77fc15eb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Privacy Policy"),
              background: asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="privacy-policy my-5" data-v-77fc15eb${_scopeId}><div class="container" data-v-77fc15eb${_scopeId}><div class="row" data-v-77fc15eb${_scopeId}><div class="col-xl-12" data-v-77fc15eb${_scopeId}><div class="privacy-policy__content" data-v-77fc15eb${_scopeId}><div class="privacy-policy__text" data-v-77fc15eb${_scopeId}><p class="privacy-policy__last-updated" data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Last Updated:"))}</strong> ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString())}</p><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("1. Introduction"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Welcome to our Privacy Policy. This document explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."))}</p><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("2. Information We Collect"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("We may collect information about you in a variety of ways. The information we may collect on the site includes:"))}</p><ul data-v-77fc15eb${_scopeId}><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Personal Data"))}</strong>: ${ssrInterpolate(trans("Personally identifiable information, such as your name, email address, phone number, and demographic information that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site."))}</li><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Derivative Data"))}</strong>: ${ssrInterpolate(trans("Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site."))}</li><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Financial Data"))}</strong>: ${ssrInterpolate(trans("Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the site."))}</li><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Mobile Device Data"))}</strong>: ${ssrInterpolate(trans("Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the site from a mobile device."))}</li></ul><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("3. How We Use Your Information"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:"))}</p><ul data-v-77fc15eb${_scopeId}><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Create and manage your account"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Process your transactions and send you related information"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Email you regarding your account or order"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Fulfill and manage purchases, orders, payments, and other transactions related to the site"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Generate a personal profile about you to make future visits more personalized"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Increase the efficiency and operation of the site"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Monitor and analyze usage and trends to improve your experience with the site"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Notify you of updates to the site"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Perform other business activities as needed"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Request feedback and contact you about your use of the site"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Resolve disputes and troubleshoot problems"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Respond to product and customer service requests"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Send you a newsletter"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Solicit support for the site"))}</li></ul><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("4. Disclosure of Your Information"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("We may share information we have collected about you in certain situations. Your information may be disclosed as follows:"))}</p><ul data-v-77fc15eb${_scopeId}><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("By Law or to Protect Rights"))}</strong>: ${ssrInterpolate(trans("If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation."))}</li><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Third-Party Service Providers"))}</strong>: ${ssrInterpolate(trans("We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance."))}</li><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Business Transfers"))}</strong>: ${ssrInterpolate(trans("We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company."))}</li><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Affiliates"))}</strong>: ${ssrInterpolate(trans("We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us."))}</li><li data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Business Partners"))}</strong>: ${ssrInterpolate(trans("We may share your information with our business partners to offer you certain products, services, or promotions."))}</li></ul><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("5. Security of Your Information"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information."))}</p><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("6. Policy for Children"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us."))}</p><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("7. Your Rights"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Depending on your location, you may have the following rights regarding your personal information:"))}</p><ul data-v-77fc15eb${_scopeId}><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("The right to access â€“ You have the right to request copies of your personal data"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("The right to rectification â€“ You have the right to request that we correct any information you believe is inaccurate"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("The right to erasure â€“ You have the right to request that we erase your personal data, under certain conditions"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("The right to restrict processing â€“ You have the right to request that we restrict the processing of your personal data, under certain conditions"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("The right to object to processing â€“ You have the right to object to our processing of your personal data, under certain conditions"))}</li><li data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("The right to data portability â€“ You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions"))}</li></ul><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("8. Cookies and Tracking Technologies"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("We may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to help customize the site and improve your experience. When you access the site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the site."))}</p><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("9. Third-Party Websites"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("The site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information."))}</p><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("10. Changes to This Privacy Policy"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans('We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.'))}</p><h3 class="privacy-policy__heading" data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("11. Contact Us"))}</h3><p data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("If you have questions or comments about this Privacy Policy, please contact us at:"))}</p><p data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Email:"))}</strong> ${ssrInterpolate((_a = settings.value) == null ? void 0 : _a.email)}<br data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Phone:"))}</strong> ${ssrInterpolate((_b = settings.value) == null ? void 0 : _b.phone)}<br data-v-77fc15eb${_scopeId}><strong data-v-77fc15eb${_scopeId}>${ssrInterpolate(trans("Address:"))}</strong> ${ssrInterpolate((_c = settings.value) == null ? void 0 : _c.address)}</p></div></div></div></div></div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Privacy Policy"),
                background: asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "background"]),
              createVNode("section", { class: "privacy-policy my-5" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-xl-12" }, [
                      createVNode("div", { class: "privacy-policy__content" }, [
                        createVNode("div", { class: "privacy-policy__text" }, [
                          createVNode("p", { class: "privacy-policy__last-updated" }, [
                            createVNode("strong", null, toDisplayString(trans("Last Updated:")), 1),
                            createTextVNode(" " + toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString()), 1)
                          ]),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("1. Introduction")), 1),
                          createVNode("p", null, toDisplayString(trans("Welcome to our Privacy Policy. This document explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.")), 1),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("2. Information We Collect")), 1),
                          createVNode("p", null, toDisplayString(trans("We may collect information about you in a variety of ways. The information we may collect on the site includes:")), 1),
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Personal Data")), 1),
                              createTextVNode(": " + toDisplayString(trans("Personally identifiable information, such as your name, email address, phone number, and demographic information that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site.")), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Derivative Data")), 1),
                              createTextVNode(": " + toDisplayString(trans("Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site.")), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Financial Data")), 1),
                              createTextVNode(": " + toDisplayString(trans("Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the site.")), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Mobile Device Data")), 1),
                              createTextVNode(": " + toDisplayString(trans("Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the site from a mobile device.")), 1)
                            ])
                          ]),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("3. How We Use Your Information")), 1),
                          createVNode("p", null, toDisplayString(trans("Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:")), 1),
                          createVNode("ul", null, [
                            createVNode("li", null, toDisplayString(trans("Create and manage your account")), 1),
                            createVNode("li", null, toDisplayString(trans("Process your transactions and send you related information")), 1),
                            createVNode("li", null, toDisplayString(trans("Email you regarding your account or order")), 1),
                            createVNode("li", null, toDisplayString(trans("Fulfill and manage purchases, orders, payments, and other transactions related to the site")), 1),
                            createVNode("li", null, toDisplayString(trans("Generate a personal profile about you to make future visits more personalized")), 1),
                            createVNode("li", null, toDisplayString(trans("Increase the efficiency and operation of the site")), 1),
                            createVNode("li", null, toDisplayString(trans("Monitor and analyze usage and trends to improve your experience with the site")), 1),
                            createVNode("li", null, toDisplayString(trans("Notify you of updates to the site")), 1),
                            createVNode("li", null, toDisplayString(trans("Perform other business activities as needed")), 1),
                            createVNode("li", null, toDisplayString(trans("Request feedback and contact you about your use of the site")), 1),
                            createVNode("li", null, toDisplayString(trans("Resolve disputes and troubleshoot problems")), 1),
                            createVNode("li", null, toDisplayString(trans("Respond to product and customer service requests")), 1),
                            createVNode("li", null, toDisplayString(trans("Send you a newsletter")), 1),
                            createVNode("li", null, toDisplayString(trans("Solicit support for the site")), 1)
                          ]),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("4. Disclosure of Your Information")), 1),
                          createVNode("p", null, toDisplayString(trans("We may share information we have collected about you in certain situations. Your information may be disclosed as follows:")), 1),
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("By Law or to Protect Rights")), 1),
                              createTextVNode(": " + toDisplayString(trans("If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.")), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Third-Party Service Providers")), 1),
                              createTextVNode(": " + toDisplayString(trans("We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.")), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Business Transfers")), 1),
                              createTextVNode(": " + toDisplayString(trans("We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.")), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Affiliates")), 1),
                              createTextVNode(": " + toDisplayString(trans("We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.")), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, toDisplayString(trans("Business Partners")), 1),
                              createTextVNode(": " + toDisplayString(trans("We may share your information with our business partners to offer you certain products, services, or promotions.")), 1)
                            ])
                          ]),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("5. Security of Your Information")), 1),
                          createVNode("p", null, toDisplayString(trans("We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.")), 1),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("6. Policy for Children")), 1),
                          createVNode("p", null, toDisplayString(trans("We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us.")), 1),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("7. Your Rights")), 1),
                          createVNode("p", null, toDisplayString(trans("Depending on your location, you may have the following rights regarding your personal information:")), 1),
                          createVNode("ul", null, [
                            createVNode("li", null, toDisplayString(trans("The right to access â€“ You have the right to request copies of your personal data")), 1),
                            createVNode("li", null, toDisplayString(trans("The right to rectification â€“ You have the right to request that we correct any information you believe is inaccurate")), 1),
                            createVNode("li", null, toDisplayString(trans("The right to erasure â€“ You have the right to request that we erase your personal data, under certain conditions")), 1),
                            createVNode("li", null, toDisplayString(trans("The right to restrict processing â€“ You have the right to request that we restrict the processing of your personal data, under certain conditions")), 1),
                            createVNode("li", null, toDisplayString(trans("The right to object to processing â€“ You have the right to object to our processing of your personal data, under certain conditions")), 1),
                            createVNode("li", null, toDisplayString(trans("The right to data portability â€“ You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions")), 1)
                          ]),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("8. Cookies and Tracking Technologies")), 1),
                          createVNode("p", null, toDisplayString(trans("We may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to help customize the site and improve your experience. When you access the site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the site.")), 1),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("9. Third-Party Websites")), 1),
                          createVNode("p", null, toDisplayString(trans("The site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information.")), 1),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("10. Changes to This Privacy Policy")), 1),
                          createVNode("p", null, toDisplayString(trans('We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.')), 1),
                          createVNode("h3", { class: "privacy-policy__heading" }, toDisplayString(trans("11. Contact Us")), 1),
                          createVNode("p", null, toDisplayString(trans("If you have questions or comments about this Privacy Policy, please contact us at:")), 1),
                          createVNode("p", null, [
                            createVNode("strong", null, toDisplayString(trans("Email:")), 1),
                            createTextVNode(" " + toDisplayString((_d = settings.value) == null ? void 0 : _d.email), 1),
                            createVNode("br"),
                            createVNode("strong", null, toDisplayString(trans("Phone:")), 1),
                            createTextVNode(" " + toDisplayString((_e = settings.value) == null ? void 0 : _e.phone), 1),
                            createVNode("br"),
                            createVNode("strong", null, toDisplayString(trans("Address:")), 1),
                            createTextVNode(" " + toDisplayString((_f = settings.value) == null ? void 0 : _f.address), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/PrivacyPolicy.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const PrivacyPolicy = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-77fc15eb"]]);
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PrivacyPolicy
}, Symbol.toStringTag, { value: "Module" }));
const __default__$7 = {
  components: {
    AppLayout: _sfc_main$Q
  }
};
const _sfc_main$C = /* @__PURE__ */ Object.assign(__default__$7, {
  __name: "Team",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale);
    const teams = computed(() => page.props.teams || []);
    const meta = computed(() => page.props.meta || {});
    const metaTitle = computed(() => {
      return meta.value.title || `${trans("Our Members")} | ${seo.value.website_name || ""}`.trim();
    });
    const metaDescription = computed(() => {
      return meta.value.description || trans("Meet the professionals behind our technology and consulting services.") || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("team, experts, leadership, professionals") || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const translateField = (value) => {
      if (!value) {
        return "";
      }
      if (typeof value === "string") {
        return value;
      }
      const loc = locale.value;
      if (typeof value === "object" && value !== null) {
        if (value[loc]) {
          return value[loc];
        }
      }
      return "";
    };
    onMounted(() => {
      nextTick(() => {
        if (typeof WOW !== "undefined") {
          new WOW().init();
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)}${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website"${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Our Members"),
              subtitle: trans("Meet our leaders"),
              background: asset_path.value + "theme/img/main/19.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section id="team"${_scopeId}><div class="team-page__shape-1"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/shapes/team-page-shape-1.png")} alt="" aria-hidden="true"${_scopeId}></div><div class="container"${_scopeId}>`);
            if (teams.value && teams.value.length > 0) {
              _push2(`<div class="row"${_scopeId}><!--[-->`);
              ssrRenderList(teams.value, (team, index) => {
                _push2(`<div class="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft"${ssrRenderAttr("data-wow-delay", `${index % 4 * 100}ms`)}${_scopeId}><div class="team-one__single"${_scopeId}><div class="team-one__img-box"${_scopeId}><div class="team-one__img"${_scopeId}><img${ssrRenderAttr("src", team.avatar_link)}${ssrRenderAttr("alt", translateField(team.name))}${_scopeId}></div><div class="team-one__social-box-inner"${_scopeId}><div class="team-one__social-box"${_scopeId}><div class="team-one__social"${_scopeId}>`);
                if (team.facebook) {
                  _push2(`<a${ssrRenderAttr("href", team.facebook)} target="_blank" aria-label="Facebook"${_scopeId}><span class="icon-facebook"${_scopeId}></span></a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (team.behance) {
                  _push2(`<a${ssrRenderAttr("href", team.behance)} target="_blank" aria-label="Behance"${_scopeId}><span class="icon-dribble"${_scopeId}></span></a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="team-one__social"${_scopeId}>`);
                if (team.linked_in) {
                  _push2(`<a${ssrRenderAttr("href", team.linked_in)} target="_blank" aria-label="LinkedIn"${_scopeId}><span class="icon-linkedin"${_scopeId}></span></a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (team.github) {
                  _push2(`<a${ssrRenderAttr("href", team.github)} target="_blank" aria-label="GitHub"${_scopeId}><span class="icon-github"${_scopeId}></span></a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div><div class="team-one__content"${_scopeId}><div class="team-one__title-box"${_scopeId}><p class="team-one__sub-title"${_scopeId}><span${_scopeId}></span>${ssrInterpolate(translateField(team.position))}</p><h3 class="team-one__title"${_scopeId}><span${_scopeId}>${ssrInterpolate(translateField(team.name))}</span></h3></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-5"${_scopeId}><p${_scopeId}>${ssrInterpolate(trans("No team members found."))}</p></div>`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Our Members"),
                subtitle: trans("Meet our leaders"),
                background: asset_path.value + "theme/img/main/19.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", { id: "team" }, [
                createVNode("div", { class: "team-page__shape-1" }, [
                  createVNode("img", {
                    src: asset_path.value + "images/shapes/team-page-shape-1.png",
                    alt: "",
                    "aria-hidden": "true"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "container" }, [
                  teams.value && teams.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "row"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(teams.value, (team, index) => {
                      return openBlock(), createBlock("div", {
                        class: "col-xl-3 col-lg-6 col-md-6 wow fadeInLeft",
                        key: team.id,
                        "data-wow-delay": `${index % 4 * 100}ms`
                      }, [
                        createVNode("div", { class: "team-one__single" }, [
                          createVNode("div", { class: "team-one__img-box" }, [
                            createVNode("div", { class: "team-one__img" }, [
                              createVNode("img", {
                                src: team.avatar_link,
                                alt: translateField(team.name)
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "team-one__social-box-inner" }, [
                              createVNode("div", { class: "team-one__social-box" }, [
                                createVNode("div", { class: "team-one__social" }, [
                                  team.facebook ? (openBlock(), createBlock("a", {
                                    key: 0,
                                    href: team.facebook,
                                    target: "_blank",
                                    "aria-label": "Facebook"
                                  }, [
                                    createVNode("span", { class: "icon-facebook" })
                                  ], 8, ["href"])) : createCommentVNode("", true),
                                  team.behance ? (openBlock(), createBlock("a", {
                                    key: 1,
                                    href: team.behance,
                                    target: "_blank",
                                    "aria-label": "Behance"
                                  }, [
                                    createVNode("span", { class: "icon-dribble" })
                                  ], 8, ["href"])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "team-one__social" }, [
                                  team.linked_in ? (openBlock(), createBlock("a", {
                                    key: 0,
                                    href: team.linked_in,
                                    target: "_blank",
                                    "aria-label": "LinkedIn"
                                  }, [
                                    createVNode("span", { class: "icon-linkedin" })
                                  ], 8, ["href"])) : createCommentVNode("", true),
                                  team.github ? (openBlock(), createBlock("a", {
                                    key: 1,
                                    href: team.github,
                                    target: "_blank",
                                    "aria-label": "GitHub"
                                  }, [
                                    createVNode("span", { class: "icon-github" })
                                  ], 8, ["href"])) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "team-one__content" }, [
                            createVNode("div", { class: "team-one__title-box" }, [
                              createVNode("p", { class: "team-one__sub-title" }, [
                                createVNode("span"),
                                createTextVNode(toDisplayString(translateField(team.position)), 1)
                              ]),
                              createVNode("h3", { class: "team-one__title" }, [
                                createVNode("span", null, toDisplayString(translateField(team.name)), 1)
                              ])
                            ])
                          ])
                        ])
                      ], 8, ["data-wow-delay"]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-5"
                  }, [
                    createVNode("p", null, toDisplayString(trans("No team members found.")), 1)
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/Team.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const __default__$6 = {
  components: {
    AppLayout: _sfc_main$Q
  }
};
const _sfc_main$B = /* @__PURE__ */ Object.assign(__default__$6, {
  __name: "Testimonials",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale);
    const testimonials = computed(() => page.props.testimonials || []);
    const meta = computed(() => page.props.meta || {});
    const metaTitle = computed(() => {
      return `${trans("Testimonials")} | ${seo.value.website_name || ""}`.trim();
    });
    const metaDescription = computed(() => {
      return meta.value.description || trans("Read what our clients say about working with our team.") || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("testimonials, reviews, client feedback, success stories") || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const translateField = (value) => {
      if (!value) {
        return "";
      }
      if (typeof value === "string") {
        return value;
      }
      const loc = locale.value;
      if (typeof value === "object" && value !== null) {
        if (value[loc]) {
          return value[loc];
        }
      }
      return "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)}${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website"${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Testimonials"),
              subtitle: trans("What clients say"),
              background: asset_path.value + "theme/img/main/4.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="testimonials"${_scopeId}><div class="container"${_scopeId}>`);
            if (testimonials.value && testimonials.value.length > 0) {
              _push2(`<div class="row"${_scopeId}><!--[-->`);
              ssrRenderList(testimonials.value, (testimonial) => {
                _push2(`<div class="col-xl-4 col-lg-6 col-md-6"${_scopeId}><div class="testimonial-two__single"${_scopeId}><div class="testimonial-two__single-inner"${_scopeId}><div class="testimonial-two__star"${_scopeId}><span class="icon-pointed-star"${_scopeId}></span><span class="icon-pointed-star"${_scopeId}></span><span class="icon-pointed-star"${_scopeId}></span><span class="icon-pointed-star"${_scopeId}></span><span class="icon-pointed-star"${_scopeId}></span></div><p class="testimonial-two__text"${_scopeId}>${ssrInterpolate(translateField(testimonial.quote))}</p></div><div class="testimonial-two__client-info"${_scopeId}><div class="testimonial-two__client-img"${_scopeId}><img${ssrRenderAttr("src", testimonial.avatar_link)}${ssrRenderAttr("alt", translateField(testimonial.name))}${_scopeId}></div><div class="testimonial-two__client-content"${_scopeId}><h4 class="testimonial-two__client-name"${_scopeId}><span${_scopeId}>${ssrInterpolate(translateField(testimonial.name))}</span></h4><p class="testimonial-two__sub-title"${_scopeId}>${ssrInterpolate(translateField(testimonial.position))}</p></div></div><div class="testimonial-two__quote"${_scopeId}><span class="icon-right-quote"${_scopeId}></span></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-5"${_scopeId}><p${_scopeId}>${ssrInterpolate(trans("No testimonials found."))}</p></div>`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Testimonials"),
                subtitle: trans("What clients say"),
                background: asset_path.value + "theme/img/main/4.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "testimonials"
              }, [
                createVNode("div", { class: "container" }, [
                  testimonials.value && testimonials.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "row"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(testimonials.value, (testimonial) => {
                      return openBlock(), createBlock("div", {
                        class: "col-xl-4 col-lg-6 col-md-6",
                        key: testimonial.id
                      }, [
                        createVNode("div", { class: "testimonial-two__single" }, [
                          createVNode("div", { class: "testimonial-two__single-inner" }, [
                            createVNode("div", { class: "testimonial-two__star" }, [
                              createVNode("span", { class: "icon-pointed-star" }),
                              createVNode("span", { class: "icon-pointed-star" }),
                              createVNode("span", { class: "icon-pointed-star" }),
                              createVNode("span", { class: "icon-pointed-star" }),
                              createVNode("span", { class: "icon-pointed-star" })
                            ]),
                            createVNode("p", { class: "testimonial-two__text" }, toDisplayString(translateField(testimonial.quote)), 1)
                          ]),
                          createVNode("div", { class: "testimonial-two__client-info" }, [
                            createVNode("div", { class: "testimonial-two__client-img" }, [
                              createVNode("img", {
                                src: testimonial.avatar_link,
                                alt: translateField(testimonial.name)
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "testimonial-two__client-content" }, [
                              createVNode("h4", { class: "testimonial-two__client-name" }, [
                                createVNode("span", null, toDisplayString(translateField(testimonial.name)), 1)
                              ]),
                              createVNode("p", { class: "testimonial-two__sub-title" }, toDisplayString(translateField(testimonial.position)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "testimonial-two__quote" }, [
                            createVNode("span", { class: "icon-right-quote" })
                          ])
                        ])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-5"
                  }, [
                    createVNode("p", null, toDisplayString(trans("No testimonials found.")), 1)
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cms/resources/assets/js/Pages/Testimonials.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true },
    variant: { type: String, default: "default" }
  },
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const props = __props;
    const cardUrl = computed(() => {
      try {
        return route("product.show", props.item.slug);
      } catch (e2) {
        return "#";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "portfolio-item" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), { href: cardUrl.value }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.item.main_image_link)}${ssrRenderAttr("alt", __props.item.name)}${_scopeId}><div class="portfolio-overlay"${_scopeId}><div class="caption"${_scopeId}><h5${_scopeId}>${ssrInterpolate(__props.item.name)}</h5><span${_scopeId}>${ssrInterpolate(((_a = __props.item.category) == null ? void 0 : _a.name) || trans("Products"))}</span></div></div>`);
          } else {
            return [
              createVNode("img", {
                src: __props.item.main_image_link,
                alt: __props.item.name
              }, null, 8, ["src", "alt"]),
              createVNode("div", { class: "portfolio-overlay" }, [
                createVNode("div", { class: "caption" }, [
                  createVNode("h5", null, toDisplayString(__props.item.name), 1),
                  createVNode("span", null, toDisplayString(((_b = __props.item.category) == null ? void 0 : _b.name) || trans("Products")), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ProductCard.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const __default__$5 = {
  components: {
    AppLayout: _sfc_main$Q,
    CtaTwo: _sfc_main$O,
    ProductCard: _sfc_main$A
  }
};
const _sfc_main$z = /* @__PURE__ */ Object.assign(__default__$5, {
  __name: "ProductIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const products = computed(() => page.props.products || { data: [] });
    const meta = computed(() => page.props.meta || {});
    const featuredCount = computed(() => {
      var _a;
      return ((_a = products.value.data) == null ? void 0 : _a.filter((p2) => p2.is_featured).length) || 0;
    });
    const metaTitle = computed(() => meta.value.title || `${trans("Products")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => meta.value.description || trans("Browse our B2B product catalog.") || seo.value.website_desc || "");
    const metaKeywords = computed(() => meta.value.keywords || trans("products, B2B catalog, SaaS") || seo.value.website_keywords || "");
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    onMounted(() => {
      nextTick(() => {
        if (typeof WOW !== "undefined") {
          new WOW().init();
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-d492a9fb${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-d492a9fb${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-d492a9fb${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-d492a9fb${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-d492a9fb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-d492a9fb${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-d492a9fb${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-d492a9fb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-d492a9fb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website" data-v-d492a9fb${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-d492a9fb${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-d492a9fb${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-d492a9fb${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-d492a9fb${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Products"),
              subtitle: trans("Our Catalog"),
              background: asset_path.value + "theme/img/main/18.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="shop" data-v-d492a9fb${_scopeId}><div class="container text-center" data-v-d492a9fb${_scopeId}><h2 data-v-d492a9fb${_scopeId}>${ssrInterpolate(trans("B2B Solutions Built for Scale"))}</h2><p class="products-page__subtitle" data-v-d492a9fb${_scopeId}>${ssrInterpolate(trans("Discover enterprise-ready platforms and services designed to grow with your business."))}</p>`);
            if (products.value.data.length) {
              _push2(`<div class="products-page__stats" data-v-d492a9fb${_scopeId}><div class="products-page__stat" data-v-d492a9fb${_scopeId}><span class="products-page__stat-value" data-v-d492a9fb${_scopeId}>${ssrInterpolate(products.value.total)}</span><span class="products-page__stat-label" data-v-d492a9fb${_scopeId}>${ssrInterpolate(trans("Solutions Available"))}</span></div>`);
              if (featuredCount.value) {
                _push2(`<div class="products-page__stat" data-v-d492a9fb${_scopeId}><span class="products-page__stat-value" data-v-d492a9fb${_scopeId}>${ssrInterpolate(featuredCount.value)}</span><span class="products-page__stat-label" data-v-d492a9fb${_scopeId}>${ssrInterpolate(trans("Featured"))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row" data-v-d492a9fb${_scopeId}><!--[-->`);
            ssrRenderList(products.value.data, (product, index) => {
              _push2(`<div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"${ssrRenderAttr("data-wow-delay", `${(index % 3 + 1) * 100}ms`)} data-v-d492a9fb${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$A, {
                item: product,
                locale: locale.value
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (!products.value.data.length) {
              _push2(`<div class="col-12" data-v-d492a9fb${_scopeId}><div class="products-page__empty" data-v-d492a9fb${_scopeId}><div class="products-page__empty-icon" aria-hidden="true" data-v-d492a9fb${_scopeId}><i class="fas fa-box-open" data-v-d492a9fb${_scopeId}></i></div><h3 data-v-d492a9fb${_scopeId}>${ssrInterpolate(trans("No records found"))}</h3><p data-v-d492a9fb${_scopeId}>${ssrInterpolate(trans("Check back soon — we are adding new solutions to our catalog."))}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (products.value.last_page > 1) {
              _push2(`<div class="blog-page__pagination products-page__pagination" data-v-d492a9fb${_scopeId}><ul class="pg-pagination list-unstyled" data-v-d492a9fb${_scopeId}>`);
              if (products.value.prev_page_url) {
                _push2(`<li class="prev" data-v-d492a9fb${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: products.value.prev_page_url,
                  "aria-label": "Previous"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="icon-left-arrow-1" data-v-d492a9fb${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", { class: "icon-left-arrow-1" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(products.value.links, (link, linkIndex) => {
                _push2(`<!--[-->`);
                if (link.url && linkIndex > 0 && linkIndex < products.value.links.length - 1) {
                  _push2(`<li class="${ssrRenderClass(["count", link.active ? "active" : ""])}" data-v-d492a9fb${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url
                  }, {
                    default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(link.label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(link.label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</li>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              if (products.value.next_page_url) {
                _push2(`<li class="next" data-v-d492a9fb${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: products.value.next_page_url,
                  "aria-label": "Next"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`)}" data-v-d492a9fb${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", {
                          class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Products"),
                subtitle: trans("Our Catalog"),
                background: asset_path.value + "theme/img/main/18.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "shop"
              }, [
                createVNode("div", { class: "container text-center" }, [
                  createVNode("h2", null, toDisplayString(trans("B2B Solutions Built for Scale")), 1),
                  createVNode("p", { class: "products-page__subtitle" }, toDisplayString(trans("Discover enterprise-ready platforms and services designed to grow with your business.")), 1),
                  products.value.data.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "products-page__stats"
                  }, [
                    createVNode("div", { class: "products-page__stat" }, [
                      createVNode("span", { class: "products-page__stat-value" }, toDisplayString(products.value.total), 1),
                      createVNode("span", { class: "products-page__stat-label" }, toDisplayString(trans("Solutions Available")), 1)
                    ]),
                    featuredCount.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "products-page__stat"
                    }, [
                      createVNode("span", { class: "products-page__stat-value" }, toDisplayString(featuredCount.value), 1),
                      createVNode("span", { class: "products-page__stat-label" }, toDisplayString(trans("Featured")), 1)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "row" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(products.value.data, (product, index) => {
                      return openBlock(), createBlock("div", {
                        key: product.id,
                        class: "col-xl-4 col-lg-6 col-md-6 wow fadeInUp",
                        "data-wow-delay": `${(index % 3 + 1) * 100}ms`
                      }, [
                        createVNode(_sfc_main$A, {
                          item: product,
                          locale: locale.value
                        }, null, 8, ["item", "locale"])
                      ], 8, ["data-wow-delay"]);
                    }), 128)),
                    !products.value.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-12"
                    }, [
                      createVNode("div", { class: "products-page__empty" }, [
                        createVNode("div", {
                          class: "products-page__empty-icon",
                          "aria-hidden": "true"
                        }, [
                          createVNode("i", { class: "fas fa-box-open" })
                        ]),
                        createVNode("h3", null, toDisplayString(trans("No records found")), 1),
                        createVNode("p", null, toDisplayString(trans("Check back soon — we are adding new solutions to our catalog.")), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    products.value.last_page > 1 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "blog-page__pagination products-page__pagination"
                    }, [
                      createVNode("ul", { class: "pg-pagination list-unstyled" }, [
                        products.value.prev_page_url ? (openBlock(), createBlock("li", {
                          key: 0,
                          class: "prev"
                        }, [
                          createVNode(unref(Link), {
                            href: products.value.prev_page_url,
                            "aria-label": "Previous"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "icon-left-arrow-1" })
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(products.value.links, (link, linkIndex) => {
                          return openBlock(), createBlock(Fragment, { key: linkIndex }, [
                            link.url && linkIndex > 0 && linkIndex < products.value.links.length - 1 ? (openBlock(), createBlock("li", {
                              key: 0,
                              class: ["count", link.active ? "active" : ""]
                            }, [
                              createVNode(unref(Link), {
                                href: link.url
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(link.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ], 2)) : createCommentVNode("", true)
                          ], 64);
                        }), 128)),
                        products.value.next_page_url ? (openBlock(), createBlock("li", {
                          key: 1,
                          class: "next"
                        }, [
                          createVNode(unref(Link), {
                            href: products.value.next_page_url,
                            "aria-label": "Next"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                              }, null, 2)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Product/resources/assets/js/Pages/ProductIndex.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const ProductIndex = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-d492a9fb"]]);
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductIndex
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
  __name: "ContactRequestModal",
  __ssrInlineRender: true,
  props: {
    modalId: {
      type: String,
      default: "productContactModal"
    },
    title: {
      type: String,
      default: "Contact Us"
    },
    description: {
      type: String,
      default: ""
    },
    defaultSubject: {
      type: String,
      default: ""
    },
    defaultMessage: {
      type: String,
      default: ""
    },
    submitLabel: {
      type: String,
      default: "Submit"
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const modalElement = ref(null);
    const submitSuccess = ref(false);
    const contactForm = useForm({
      name: "",
      email: "",
      mobile: "",
      subject: props.defaultSubject,
      message: props.defaultMessage
    });
    watch(() => props.defaultSubject, (value) => {
      contactForm.subject = value;
    });
    watch(() => props.defaultMessage, (value) => {
      contactForm.message = value;
    });
    const show = () => {
      contactForm.subject = props.defaultSubject;
      contactForm.message = props.defaultMessage;
      if (window.jQuery && modalElement.value) {
        window.jQuery(modalElement.value).modal("show");
      }
    };
    const hide = () => {
      if (window.jQuery && modalElement.value) {
        window.jQuery(modalElement.value).modal("hide");
      }
    };
    __expose({
      show,
      hide
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "modal fade product-contact-modal",
        id: __props.modalId,
        tabindex: "-1",
        role: "dialog",
        "aria-labelledby": `${__props.modalId}Label`,
        ref_key: "modalElement",
        ref: modalElement
      }, _attrs))} data-v-20a19de9><div class="modal-dialog" role="document" data-v-20a19de9><div class="modal-content" data-v-20a19de9><div class="modal-header" data-v-20a19de9><button type="button" class="close" data-dismiss="modal"${ssrRenderAttr("aria-label", trans("Close"))} data-v-20a19de9><span aria-hidden="true" data-v-20a19de9>×</span></button><h4 class="modal-title"${ssrRenderAttr("id", `${__props.modalId}Label`)} data-v-20a19de9>${ssrInterpolate(__props.title)}</h4></div><div class="modal-body" data-v-20a19de9>`);
      if (__props.description) {
        _push(`<p data-v-20a19de9>${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form data-v-20a19de9><div class="form-group" data-v-20a19de9><input class="form-control"${ssrRenderAttr("value", unref(contactForm).name)} type="text"${ssrRenderAttr("placeholder", trans("Full Name"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-20a19de9>`);
      if (unref(contactForm).errors.name) {
        _push(`<p class="help-block text-danger" data-v-20a19de9>${ssrInterpolate(unref(contactForm).errors.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-20a19de9><input class="form-control"${ssrRenderAttr("value", unref(contactForm).email)} type="email"${ssrRenderAttr("placeholder", trans("Email"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-20a19de9>`);
      if (unref(contactForm).errors.email) {
        _push(`<p class="help-block text-danger" data-v-20a19de9>${ssrInterpolate(unref(contactForm).errors.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-20a19de9><input class="form-control"${ssrRenderAttr("value", unref(contactForm).mobile)} type="text"${ssrRenderAttr("placeholder", trans("Phone Number"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-20a19de9>`);
      if (unref(contactForm).errors.mobile) {
        _push(`<p class="help-block text-danger" data-v-20a19de9>${ssrInterpolate(unref(contactForm).errors.mobile)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-20a19de9><input class="form-control"${ssrRenderAttr("value", unref(contactForm).subject)} type="text"${ssrRenderAttr("placeholder", trans("Subject"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-20a19de9>`);
      if (unref(contactForm).errors.subject) {
        _push(`<p class="help-block text-danger" data-v-20a19de9>${ssrInterpolate(unref(contactForm).errors.subject)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-20a19de9><textarea class="form-control" rows="4"${ssrRenderAttr("placeholder", trans("Message"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-20a19de9>${ssrInterpolate(unref(contactForm).message)}</textarea>`);
      if (unref(contactForm).errors.message) {
        _push(`<p class="help-block text-danger" data-v-20a19de9>${ssrInterpolate(unref(contactForm).errors.message)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (submitSuccess.value) {
        _push(`<div class="alert alert-success" data-v-20a19de9>${ssrInterpolate(trans("Thank you for contacting us! We will get back to you soon."))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-dark"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} data-v-20a19de9>${ssrInterpolate(unref(contactForm).processing ? trans("Sending...") : __props.submitLabel)}</button></form></div></div></div></div>`);
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ContactRequestModal.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const ContactRequestModal = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-20a19de9"]]);
const _sfc_main$x = {
  __name: "ProductShow",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const asset_path = computed(() => page.props.asset_path || "");
    const product = computed(() => page.props.product || {});
    const relatedProducts = computed(() => page.props.relatedProducts || []);
    const meta = computed(() => page.props.meta || {});
    const contactModal = ref(null);
    const metaTitle = computed(() => meta.value.title || product.value.seo_title || product.value.name || "");
    const metaDescription = computed(() => meta.value.description || product.value.seo_description || product.value.short_description || "");
    const metaKeywords = computed(() => meta.value.keywords || "");
    const metaImage = computed(() => {
      var _a, _b;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || product.value.main_image_link || "";
    });
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const formattedPrice = computed(() => {
      const raw = product.value.price;
      if (raw === null || raw === void 0 || raw === "") {
        return "";
      }
      const amount = Number(raw).toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return `${amount} ${product.value.currency || "USD"}`;
    });
    const billingLabel = computed(() => {
      const type = product.value.billing_type;
      if (!type || type === "one_time") {
        return "";
      }
      const labels = {
        monthly: trans("/mo"),
        quarterly: trans("/quarter"),
        yearly: trans("/yr")
      };
      return labels[type] || "";
    });
    const demoSubject = computed(() => `${trans("Live Demo Request")}: ${product.value.name || ""}`.trim());
    const demoMessage = computed(() => {
      const intro = trans("I would like to request a live demo for this product.");
      const name = product.value.name ? `${trans("Product")}: ${product.value.name}` : "";
      return [intro, name].filter(Boolean).join("\n\n");
    });
    const demoModalDescription = computed(() => trans("Fill out the form below and our team will schedule your live demo."));
    const openDemoModal = () => {
      var _a;
      (_a = contactModal.value) == null ? void 0 : _a.show();
    };
    const getShareUrl = (platform) => {
      if (typeof window === "undefined") {
        return "#";
      }
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(product.value.name || "");
      switch (platform) {
        case "twitter":
          return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        case "facebook":
          return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "linkedin":
          return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        default:
          return "#";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-122d4999${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-122d4999${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-122d4999${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-122d4999${_scopeId}><meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-122d4999${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-122d4999${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-122d4999${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="product" data-v-122d4999${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-122d4999${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-122d4999${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-122d4999${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-122d4999${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 0,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "product"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: product.value.name,
              subtitle: trans("Products"),
              background: product.value.main_image_link || asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="shop" data-v-122d4999${_scopeId}><div class="container" data-v-122d4999${_scopeId}><div class="row" data-v-122d4999${_scopeId}><div class="col-lg-6" data-v-122d4999${_scopeId}><img class="img-responsive"${ssrRenderAttr("src", product.value.main_image_link)}${ssrRenderAttr("alt", product.value.name)} loading="lazy" decoding="async" data-v-122d4999${_scopeId}></div><div class="col-lg-6" data-v-122d4999${_scopeId}>`);
            if (product.value.category) {
              _push2(`<p class="small" data-v-122d4999${_scopeId}>${ssrInterpolate(product.value.category.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h2 data-v-122d4999${_scopeId}>${ssrInterpolate(product.value.name)}</h2>`);
            if (formattedPrice.value) {
              _push2(`<p class="lead" data-v-122d4999${_scopeId}>${ssrInterpolate(formattedPrice.value)} `);
              if (billingLabel.value) {
                _push2(`<small data-v-122d4999${_scopeId}>${ssrInterpolate(billingLabel.value)}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (product.value.short_description) {
              _push2(`<p data-v-122d4999${_scopeId}>${ssrInterpolate(product.value.short_description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (product.value.description) {
              _push2(`<div class="product-copy" data-v-122d4999${_scopeId}>${product.value.description ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p data-v-122d4999${_scopeId}><button type="button" class="btn btn-dark btn-lg" data-v-122d4999${_scopeId}>${ssrInterpolate(trans("Request Live Demo"))}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              class: "btn btn-gray btn-lg",
              href: _ctx.route("contact-us")
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Get in Touch"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Get in Touch")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p><p data-v-122d4999${_scopeId}><a${ssrRenderAttr("href", getShareUrl("facebook"))} target="_blank" rel="noopener" aria-label="Facebook" data-v-122d4999${_scopeId}><i class="fab fa-facebook-f fa-fw fa-lg" data-v-122d4999${_scopeId}></i></a><a${ssrRenderAttr("href", getShareUrl("twitter"))} target="_blank" rel="noopener" aria-label="Twitter" data-v-122d4999${_scopeId}><i class="fab fa-twitter fa-fw fa-lg" data-v-122d4999${_scopeId}></i></a><a${ssrRenderAttr("href", getShareUrl("linkedin"))} target="_blank" rel="noopener" aria-label="LinkedIn" data-v-122d4999${_scopeId}><i class="fab fa-linkedin-in fa-fw fa-lg" data-v-122d4999${_scopeId}></i></a></p></div></div></div></section>`);
            if (relatedProducts.value.length) {
              _push2(`<section class="section-small bg-white" data-v-122d4999${_scopeId}><div class="container" data-v-122d4999${_scopeId}><h3 data-v-122d4999${_scopeId}>${ssrInterpolate(trans("Explore More Solutions"))}</h3><div class="row grid-pad" data-v-122d4999${_scopeId}><!--[-->`);
              ssrRenderList(relatedProducts.value, (item) => {
                _push2(`<div class="col-sm-6 col-md-3" data-v-122d4999${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$A, { item }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(ContactRequestModal, {
              ref_key: "contactModal",
              ref: contactModal,
              "modal-id": "productDemoModal",
              title: trans("Request Live Demo"),
              description: demoModalDescription.value,
              "default-subject": demoSubject.value,
              "default-message": demoMessage.value,
              "submit-label": trans("Send Request")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: product.value.name,
                subtitle: trans("Products"),
                background: product.value.main_image_link || asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "shop"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-6" }, [
                      createVNode("img", {
                        class: "img-responsive",
                        src: product.value.main_image_link,
                        alt: product.value.name,
                        loading: "lazy",
                        decoding: "async"
                      }, null, 8, ["src", "alt"])
                    ]),
                    createVNode("div", { class: "col-lg-6" }, [
                      product.value.category ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "small"
                      }, toDisplayString(product.value.category.name), 1)) : createCommentVNode("", true),
                      createVNode("h2", null, toDisplayString(product.value.name), 1),
                      formattedPrice.value ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "lead"
                      }, [
                        createTextVNode(toDisplayString(formattedPrice.value) + " ", 1),
                        billingLabel.value ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(billingLabel.value), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      product.value.short_description ? (openBlock(), createBlock("p", { key: 2 }, toDisplayString(product.value.short_description), 1)) : createCommentVNode("", true),
                      product.value.description ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "product-copy",
                        innerHTML: product.value.description
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      createVNode("p", null, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-dark btn-lg",
                          onClick: openDemoModal
                        }, toDisplayString(trans("Request Live Demo")), 1),
                        createVNode(unref(Link), {
                          class: "btn btn-gray btn-lg",
                          href: _ctx.route("contact-us")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(trans("Get in Touch")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("p", null, [
                        createVNode("a", {
                          href: getShareUrl("facebook"),
                          target: "_blank",
                          rel: "noopener",
                          "aria-label": "Facebook"
                        }, [
                          createVNode("i", { class: "fab fa-facebook-f fa-fw fa-lg" })
                        ], 8, ["href"]),
                        createVNode("a", {
                          href: getShareUrl("twitter"),
                          target: "_blank",
                          rel: "noopener",
                          "aria-label": "Twitter"
                        }, [
                          createVNode("i", { class: "fab fa-twitter fa-fw fa-lg" })
                        ], 8, ["href"]),
                        createVNode("a", {
                          href: getShareUrl("linkedin"),
                          target: "_blank",
                          rel: "noopener",
                          "aria-label": "LinkedIn"
                        }, [
                          createVNode("i", { class: "fab fa-linkedin-in fa-fw fa-lg" })
                        ], 8, ["href"])
                      ])
                    ])
                  ])
                ])
              ]),
              relatedProducts.value.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "section-small bg-white"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("h3", null, toDisplayString(trans("Explore More Solutions")), 1),
                  createVNode("div", { class: "row grid-pad" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(relatedProducts.value, (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "col-sm-6 col-md-3"
                      }, [
                        createVNode(_sfc_main$A, { item }, null, 8, ["item"])
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode(ContactRequestModal, {
                ref_key: "contactModal",
                ref: contactModal,
                "modal-id": "productDemoModal",
                title: trans("Request Live Demo"),
                description: demoModalDescription.value,
                "default-subject": demoSubject.value,
                "default-message": demoMessage.value,
                "submit-label": trans("Send Request")
              }, null, 8, ["title", "description", "default-subject", "default-message", "submit-label"]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Product/resources/assets/js/Pages/ProductShow.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const ProductShow = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-122d4999"]]);
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductShow
}, Symbol.toStringTag, { value: "Module" }));
function usePortalTranslations() {
  const page = usePage();
  const t3 = (key, replacements = {}) => {
    var _a;
    const parts = key.split(".");
    let value = (_a = page.props.portal) == null ? void 0 : _a.translations;
    for (const part of parts) {
      value = value == null ? void 0 : value[part];
    }
    if (typeof value !== "string") {
      return key;
    }
    return Object.entries(replacements).reduce(
      (text, [placeholder, replacement]) => text.replace(`:${placeholder}`, String(replacement)),
      value
    );
  };
  const paymentStatusLabel = (status) => t3(`payment_status.${status}`);
  const invoiceStatusLabel = (status) => t3(`invoice_status.${status}`);
  const ticketStatusLabel = (status) => t3(`ticket_status.${status}`);
  const ticketPriorityLabel = (priority) => t3(`ticket_priority.${priority}`);
  return { t: t3, paymentStatusLabel, invoiceStatusLabel, ticketStatusLabel, ticketPriorityLabel };
}
const _sfc_main$w = {
  __name: "PortalNav",
  __ssrInlineRender: true,
  props: {
    active: { type: String, default: "dashboard" },
    open: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props) {
    const page = usePage();
    const { t: t3 } = usePortalTranslations();
    const auth = computed(() => page.props.auth);
    const settings = computed(() => page.props.settings || {});
    const storage_path = computed(() => page.props.storage_path || "");
    const seo = computed(() => page.props.seo || {});
    const brandName = computed(() => seo.value.website_name || page.props.appName || "Symfonix");
    const unreadCount = computed(() => {
      var _a;
      return ((_a = page.props.portal) == null ? void 0 : _a.unread_notifications) || 0;
    });
    const openTicketsCount = computed(() => {
      var _a;
      return ((_a = page.props.portal) == null ? void 0 : _a.open_tickets) || 0;
    });
    const logoSrc = computed(() => {
      var _a;
      const logo = (_a = settings.value) == null ? void 0 : _a.site_logo;
      if (!logo || logo === false || logo === "false" || logo === "default.jpg") {
        return "";
      }
      if (/^https?:\/\//i.test(logo) || String(logo).startsWith("//") || String(logo).startsWith("/")) {
        return logo;
      }
      return `${storage_path.value}${logo}`;
    });
    const items = computed(() => [
      {
        key: "dashboard",
        href: route("portal.dashboard"),
        icon: "fas fa-th-large",
        label: t3("menu.my_dashboard")
      },
      {
        key: "projects",
        href: route("portal.projects.index"),
        icon: "fas fa-folder-open",
        label: t3("menu.projects"),
        badge: unreadCount.value || null
      },
      {
        key: "subscriptions",
        href: route("portal.subscriptions.index"),
        icon: "fas fa-sync-alt",
        label: t3("menu.subscriptions")
      },
      {
        key: "tickets",
        href: route("portal.tickets.index"),
        icon: "fas fa-life-ring",
        label: t3("menu.tickets"),
        badge: openTicketsCount.value || null
      },
      {
        key: "profile",
        href: route("portal.profile.index"),
        icon: "fas fa-user-cog",
        label: t3("menu.profile")
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["portal-sidebar", { "portal-sidebar--open": __props.open }],
        "aria-label": "Portal navigation"
      }, _attrs))}><div class="portal-sidebar__brand">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "portal-sidebar__logo",
        title: brandName.value
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (logoSrc.value) {
              _push2(`<img${ssrRenderAttr("src", logoSrc.value)}${ssrRenderAttr("alt", brandName.value)}${_scopeId}>`);
            } else {
              _push2(`<span class="portal-sidebar__logo-text"${_scopeId}>${ssrInterpolate(brandName.value)}</span>`);
            }
          } else {
            return [
              logoSrc.value ? (openBlock(), createBlock("img", {
                key: 0,
                src: logoSrc.value,
                alt: brandName.value
              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "portal-sidebar__logo-text"
              }, toDisplayString(brandName.value), 1))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="portal-sidebar__close d-lg-none"${ssrRenderAttr("aria-label", unref(t3)("menu.close_menu"))}><i class="fas fa-times"></i></button></div><p class="portal-sidebar__label">${ssrInterpolate(unref(t3)("menu.navigation"))}</p><nav class="portal-sidebar__nav"><!--[-->`);
      ssrRenderList(items.value, (item) => {
        _push(ssrRenderComponent(unref(Link), {
          key: item.key,
          href: item.href,
          class: ["portal-sidebar__link", { "portal-sidebar__link--active": __props.active === item.key }],
          onClick: ($event) => _ctx.$emit("close")
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="portal-sidebar__link-icon"${_scopeId}><i class="${ssrRenderClass(item.icon)}"${_scopeId}></i></span><span class="portal-sidebar__link-text"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              if (item.badge) {
                _push2(`<span class="portal-sidebar__badge"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "portal-sidebar__link-icon" }, [
                  createVNode("i", {
                    class: item.icon
                  }, null, 2)
                ]),
                createVNode("span", { class: "portal-sidebar__link-text" }, toDisplayString(item.label), 1),
                item.badge ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "portal-sidebar__badge"
                }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="portal-sidebar__footer"><div class="portal-sidebar__user"><span class="portal-sidebar__avatar">`);
      if ((_a = auth.value) == null ? void 0 : _a.avatar) {
        _push(`<img${ssrRenderAttr("src", auth.value.avatar)}${ssrRenderAttr("alt", ((_b = auth.value) == null ? void 0 : _b.name) || "")}>`);
      } else {
        _push(`<i class="fas fa-user"></i>`);
      }
      _push(`</span><div class="portal-sidebar__user-meta"><strong>${ssrInterpolate((_c = auth.value) == null ? void 0 : _c.name)}</strong><span>${ssrInterpolate((_d = auth.value) == null ? void 0 : _d.email)}</span></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("logout"),
        method: "post",
        as: "button",
        type: "button",
        class: "portal-sidebar__logout"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-sign-out-alt"${_scopeId}></i> ${ssrInterpolate(unref(t3)("menu.logout"))}`);
          } else {
            return [
              createVNode("i", { class: "fas fa-sign-out-alt" }),
              createTextVNode(" " + toDisplayString(unref(t3)("menu.logout")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "portal-sidebar__site-link",
        onClick: ($event) => _ctx.$emit("close")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-external-link-alt"${_scopeId}></i> ${ssrInterpolate(unref(t3)("menu.back_to_site"))}`);
          } else {
            return [
              createVNode("i", { class: "fas fa-external-link-alt" }),
              createTextVNode(" " + toDisplayString(unref(t3)("menu.back_to_site")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portal/PortalNav.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = {
  __name: "PortalShell",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    active: { type: String, default: "dashboard" },
    breadcrumbs: { type: Array, default: () => [] },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3 } = usePortalTranslations();
    const navOpen = ref(false);
    const asset_path = computed(() => page.props.asset_path || "");
    const seo = computed(() => page.props.seo || {});
    const auth = computed(() => page.props.auth);
    const portalHomeLabel = computed(() => t3("menu.dashboard"));
    const flatBreadcrumbs = computed(() => {
      const items = [
        {
          key: "portal",
          type: "link",
          label: portalHomeLabel.value,
          href: route("portal.dashboard")
        }
      ];
      props.breadcrumbs.forEach((crumb, index) => {
        items.push({ key: `sep-${index}`, type: "separator" });
        if (crumb.href) {
          items.push({
            key: `link-${index}`,
            type: "link",
            label: crumb.label,
            href: crumb.href
          });
        } else {
          items.push({
            key: `text-${index}`,
            type: "text",
            label: crumb.label
          });
        }
      });
      return items;
    });
    const pageTitle = computed(() => {
      const title = props.metaTitle || props.title;
      return `${title} | ${seo.value.website_name || ""}`.trim();
    });
    const pageDescription = computed(() => props.metaDescription || props.subtitle || "");
    watch(navOpen, (open) => {
      document.body.classList.toggle("portal-nav-locked", open);
    });
    watch(() => page.url, () => {
      navOpen.value = false;
    });
    onMounted(() => {
      document.body.classList.add("portal-panel-active");
    });
    onUnmounted(() => {
      document.body.classList.remove("portal-nav-locked");
      document.body.classList.remove("portal-panel-active");
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<link rel="stylesheet"${ssrRenderAttr("href", asset_path.value + "site/css/module-css/portal.css")}${_scopeId}><title${_scopeId}>${ssrInterpolate(pageTitle.value)}</title><meta name="description"${ssrRenderAttr("content", pageDescription.value)}${_scopeId}><meta name="robots" content="noindex, nofollow"${_scopeId}>`);
          } else {
            return [
              createVNode("link", {
                rel: "stylesheet",
                href: asset_path.value + "site/css/module-css/portal.css"
              }, null, 8, ["href"]),
              createVNode("title", null, toDisplayString(pageTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: pageDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: "noindex, nofollow"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass([{ "portal-app--nav-open": navOpen.value }, "portal-app"])}"><div class="${ssrRenderClass([{ "portal-app__overlay--visible": navOpen.value }, "portal-app__overlay"])}"></div>`);
      _push(ssrRenderComponent(_sfc_main$w, {
        active: __props.active,
        open: navOpen.value,
        onClose: ($event) => navOpen.value = false
      }, null, _parent));
      _push(`<div class="portal-app__main"><header class="portal-topbar"><div class="portal-topbar__start"><button type="button" class="portal-topbar__menu d-lg-none"${ssrRenderAttr("aria-label", unref(t3)("menu.open_menu"))}${ssrRenderAttr("aria-expanded", navOpen.value)}><i class="fas fa-bars"></i></button><div class="portal-topbar__titles"><nav class="portal-topbar__crumbs" aria-label="Breadcrumb"><ol><!--[-->`);
      ssrRenderList(flatBreadcrumbs.value, (item) => {
        _push(`<li>`);
        if (item.type === "separator") {
          _push(`<span class="portal-topbar__sep" aria-hidden="true">/</span>`);
        } else if (item.type === "link") {
          _push(ssrRenderComponent(unref(Link), {
            href: item.href
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span aria-current="page">${ssrInterpolate(item.label)}</span>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ol></nav><h1 class="portal-topbar__title">${ssrInterpolate(__props.title)}</h1>`);
      if (__props.subtitle) {
        _push(`<p class="portal-topbar__subtitle">${ssrInterpolate(__props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="portal-topbar__end">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("portal.profile.index"),
        class: "portal-topbar__user",
        title: (_a = auth.value) == null ? void 0 : _a.name
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<span class="portal-topbar__avatar"${_scopeId}>`);
            if ((_a2 = auth.value) == null ? void 0 : _a2.avatar) {
              _push2(`<img${ssrRenderAttr("src", auth.value.avatar)}${ssrRenderAttr("alt", ((_b = auth.value) == null ? void 0 : _b.name) || "")}${_scopeId}>`);
            } else {
              _push2(`<i class="fas fa-user"${_scopeId}></i>`);
            }
            _push2(`</span><span class="portal-topbar__user-name d-none d-md-inline"${_scopeId}>${ssrInterpolate((_c = auth.value) == null ? void 0 : _c.name)}</span>`);
          } else {
            return [
              createVNode("span", { class: "portal-topbar__avatar" }, [
                ((_d = auth.value) == null ? void 0 : _d.avatar) ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: auth.value.avatar,
                  alt: ((_e = auth.value) == null ? void 0 : _e.name) || ""
                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("i", {
                  key: 1,
                  class: "fas fa-user"
                }))
              ]),
              createVNode("span", { class: "portal-topbar__user-name d-none d-md-inline" }, toDisplayString((_f = auth.value) == null ? void 0 : _f.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><div class="portal-app__content">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portal/PortalShell.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    projects: { type: Object, required: true },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3, paymentStatusLabel } = usePortalTranslations();
    const locale = computed(() => page.props.locale);
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || t3("pages.projects_title");
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.projects_description");
    });
    const formatMoney = (amount, currency) => `${Number(amount).toFixed(2)} ${currency || ""}`.trim();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: unref(t3)("projects.title"),
        subtitle: unref(t3)("projects.subtitle"),
        active: "projects",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("projects.title") }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (__props.projects.data.length === 0) {
              _push2(`<div class="portal-panel"${_scopeId}><div class="portal-empty"${_scopeId}><i class="fas fa-folder-open"${_scopeId}></i> ${ssrInterpolate(unref(t3)("projects.no_projects"))}</div></div>`);
            } else {
              _push2(`<div class="row g-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.projects.data, (project) => {
                var _a2, _b2, _c, _d;
                _push2(`<div class="col-md-6 col-xl-4"${_scopeId}><article class="portal-project-card"${_scopeId}><div class="portal-project-card__top"${_scopeId}><h3 class="portal-project-card__title"${_scopeId}>${ssrInterpolate(project.title)}</h3><span class="portal-badge" style="${ssrRenderStyle({ backgroundColor: (((_a2 = project.status) == null ? void 0 : _a2.color_code) || "#6c757d") + "33", color: ((_b2 = project.status) == null ? void 0 : _b2.color_code) || "#C5C8CD" })}"${_scopeId}>${ssrInterpolate((_c = project.status) == null ? void 0 : _c.name)}</span></div>`);
                if ((_d = project.company) == null ? void 0 : _d.name) {
                  _push2(`<div class="portal-project-card__company"${_scopeId}><i class="fas fa-building me-1"${_scopeId}></i>${ssrInterpolate(project.company.name)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="portal-project-card__meta"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.payment_status"))}</span><strong${_scopeId}>${ssrInterpolate(unref(paymentStatusLabel)(project.payment_status))}</strong></div><div class="portal-project-card__meta"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.remaining"))}</span><strong${_scopeId}>${ssrInterpolate(formatMoney(project.collection.remaining, project.collection.currency))}</strong></div><div class="mb-3"${_scopeId}><div class="portal-progress"${_scopeId}><div class="portal-progress__bar" style="${ssrRenderStyle({ width: `${project.collection.collection_rate}%` })}"${_scopeId}></div></div></div><div class="portal-project-card__footer"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("portal.projects.show", project.id),
                  class: "thm-btn w-100 text-center"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t3)("projects.view_details"))} <span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow`)}"${_scopeId2}></span>`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t3)("projects.view_details")) + " ", 1),
                        createVNode("span", {
                          class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow`
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></article></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (((_a = __props.projects.links) == null ? void 0 : _a.length) > 3) {
              _push2(`<nav class="portal-pagination" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(__props.projects.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url || "#",
                  class: ["portal-pagination__link", { "portal-pagination__link--active": link.active }]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></nav>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.projects.data.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "portal-panel"
              }, [
                createVNode("div", { class: "portal-empty" }, [
                  createVNode("i", { class: "fas fa-folder-open" }),
                  createTextVNode(" " + toDisplayString(unref(t3)("projects.no_projects")), 1)
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "row g-4"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.projects.data, (project) => {
                  var _a2, _b2, _c, _d;
                  return openBlock(), createBlock("div", {
                    key: project.id,
                    class: "col-md-6 col-xl-4"
                  }, [
                    createVNode("article", { class: "portal-project-card" }, [
                      createVNode("div", { class: "portal-project-card__top" }, [
                        createVNode("h3", { class: "portal-project-card__title" }, toDisplayString(project.title), 1),
                        createVNode("span", {
                          class: "portal-badge",
                          style: { backgroundColor: (((_a2 = project.status) == null ? void 0 : _a2.color_code) || "#6c757d") + "33", color: ((_b2 = project.status) == null ? void 0 : _b2.color_code) || "#C5C8CD" }
                        }, toDisplayString((_c = project.status) == null ? void 0 : _c.name), 5)
                      ]),
                      ((_d = project.company) == null ? void 0 : _d.name) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-project-card__company"
                      }, [
                        createVNode("i", { class: "fas fa-building me-1" }),
                        createTextVNode(toDisplayString(project.company.name), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "portal-project-card__meta" }, [
                        createVNode("span", null, toDisplayString(unref(t3)("fields.payment_status")), 1),
                        createVNode("strong", null, toDisplayString(unref(paymentStatusLabel)(project.payment_status)), 1)
                      ]),
                      createVNode("div", { class: "portal-project-card__meta" }, [
                        createVNode("span", null, toDisplayString(unref(t3)("fields.remaining")), 1),
                        createVNode("strong", null, toDisplayString(formatMoney(project.collection.remaining, project.collection.currency)), 1)
                      ]),
                      createVNode("div", { class: "mb-3" }, [
                        createVNode("div", { class: "portal-progress" }, [
                          createVNode("div", {
                            class: "portal-progress__bar",
                            style: { width: `${project.collection.collection_rate}%` }
                          }, null, 4)
                        ])
                      ]),
                      createVNode("div", { class: "portal-project-card__footer" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("portal.projects.show", project.id),
                          class: "thm-btn w-100 text-center"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t3)("projects.view_details")) + " ", 1),
                            createVNode("span", {
                              class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow`
                            }, null, 2)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]);
                }), 128))
              ])),
              ((_b = __props.projects.links) == null ? void 0 : _b.length) > 3 ? (openBlock(), createBlock("nav", {
                key: 2,
                class: "portal-pagination",
                "aria-label": "Pagination"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.projects.links, (link) => {
                  return openBlock(), createBlock(unref(Link), {
                    key: link.label,
                    href: link.url || "#",
                    class: ["portal-pagination__link", { "portal-pagination__link--active": link.active }],
                    innerHTML: link.label
                  }, null, 8, ["href", "class", "innerHTML"]);
                }), 128))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Project/resources/assets/js/Pages/Portal/Projects/Index.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    project: { type: Object, required: true },
    invoices: { type: Array, default: () => [] },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3, paymentStatusLabel, invoiceStatusLabel } = usePortalTranslations();
    const reviewForm = useForm({
      quote: ""
    });
    const reviewQuote = computed(() => {
      var _a;
      const quote = (_a = props.project.review) == null ? void 0 : _a.quote;
      if (!quote) return "";
      if (typeof quote === "string") return quote;
      const loc = page.props.locale || "en";
      return quote[loc] || Object.values(quote)[0] || "";
    });
    const submitReview = () => {
      reviewForm.post(route("portal.projects.review", props.project.id), {
        preserveScroll: true,
        onSuccess: () => reviewForm.reset("quote")
      });
    };
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || props.project.title;
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.project_show_description");
    });
    const collection = computed(() => props.project.collection ?? {
      budget: 0,
      invoiced: 0,
      remaining: 0,
      currency: "USD",
      collection_rate: 0
    });
    const invoiceList = computed(() => {
      if (Array.isArray(props.invoices)) {
        return props.invoices;
      }
      return Object.values(props.invoices ?? {});
    });
    const attachments = computed(() => {
      const items = props.project.attachments;
      return Array.isArray(items) ? items : [];
    });
    const statusBadgeStyle = computed(() => {
      var _a;
      const color = ((_a = props.project.status) == null ? void 0 : _a.color_code) || "#6c757d";
      return {
        backgroundColor: `${color}33`,
        color
      };
    });
    const formatMoney = (amount, currency) => `${Number(amount ?? 0).toFixed(2)} ${currency || ""}`.trim();
    const invoiceBadgeClass = (status) => {
      if (status === "paid") return "portal-badge--paid";
      if (status === "overdue") return "portal-badge--overdue";
      return "portal-badge--invoice";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: __props.project.title,
        subtitle: (_a = __props.project.company) == null ? void 0 : _a.name,
        active: "projects",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("projects.title"), href: _ctx.route("portal.projects.index") },
          { label: __props.project.title }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="portal-grid portal-grid--show"${_scopeId}><div${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("projects.details"))}</h2></div><div class="portal-panel__body"${_scopeId}><div class="portal-details"${_scopeId}><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.status"))}</div><div class="portal-details__value"${_scopeId}><span class="portal-badge" style="${ssrRenderStyle(statusBadgeStyle.value)}"${_scopeId}>${ssrInterpolate(((_a2 = __props.project.status) == null ? void 0 : _a2.name) || "—")}</span></div></div><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.payment_status"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(unref(paymentStatusLabel)(__props.project.payment_status))}</div></div>`);
            if ((_b = __props.project.company) == null ? void 0 : _b.name) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.company"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.project.company.name)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.project.start_date) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.start_date"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.project.start_date)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.project.due_date) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.due_date"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.project.due_date)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.project.description) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.description"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.project.description)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if (attachments.value.length) {
              _push2(`<div class="portal-panel" style="${ssrRenderStyle({ "margin-top": "24px" })}"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("projects.attachments"))}</h2></div><div class="portal-panel__body"${_scopeId}><ul class="list-unstyled mb-0"${_scopeId}><!--[-->`);
              ssrRenderList(attachments.value, (attachment, index) => {
                _push2(`<li class="mb-2"${_scopeId}><a${ssrRenderAttr("href", attachment.url)} target="_blank" class="portal-panel__action"${_scopeId}><i class="fas fa-paperclip"${_scopeId}></i>${ssrInterpolate(attachment.name)}</a></li>`);
              });
              _push2(`<!--]--></ul></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.project.is_completed) {
              _push2(`<div class="portal-panel" style="${ssrRenderStyle({ "margin-top": "24px" })}"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("projects.review_title"))}</h2></div><div class="portal-panel__body"${_scopeId}>`);
              if (__props.project.review) {
                _push2(`<div class="portal-details"${_scopeId}><p class="mb-2"${_scopeId}>${ssrInterpolate(unref(t3)("projects.review_submitted_hint"))}</p><div class="portal-review-quote"${_scopeId}>“${ssrInterpolate(reviewQuote.value)}”</div>`);
                if (__props.project.review.status) {
                  _push2(`<span class="${ssrRenderClass([__props.project.review.status === "Published" ? "portal-badge--paid" : "portal-badge--invoice", "portal-badge mt-3"])}"${_scopeId}>${ssrInterpolate(__props.project.review.status === "Published" ? unref(t3)("projects.review_status_published") : unref(t3)("projects.review_status_pending"))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else if (__props.project.can_review) {
                _push2(`<form${_scopeId}><p class="mb-3"${_scopeId}>${ssrInterpolate(unref(t3)("projects.review_prompt"))}</p><textarea class="portal-input" rows="4"${ssrRenderAttr("placeholder", unref(t3)("projects.review_placeholder"))} required minlength="10" maxlength="2000"${_scopeId}>${ssrInterpolate(unref(reviewForm).quote)}</textarea>`);
                if (unref(reviewForm).errors.quote) {
                  _push2(`<p class="portal-form-error mt-2 mb-0"${_scopeId}>${ssrInterpolate(unref(reviewForm).errors.quote)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<button type="submit" class="thm-btn mt-3"${ssrIncludeBooleanAttr(unref(reviewForm).processing) ? " disabled" : ""} style="${ssrRenderStyle({ "padding": "10px 20px", "font-size": "14px" })}"${_scopeId}>${ssrInterpolate(unref(t3)("projects.submit_review"))}</button></form>`);
              } else {
                _push2(`<div class="portal-empty"${_scopeId}>${ssrInterpolate(unref(t3)("projects.review_unavailable"))}</div>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-grid__stack"${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("projects.billing"))}</h2></div><div class="portal-panel__body"${_scopeId}><div class="portal-billing-grid"${_scopeId}><div class="portal-billing-item"${_scopeId}><div class="portal-billing-item__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.budget"))}</div><div class="portal-billing-item__value"${_scopeId}>${ssrInterpolate(formatMoney(collection.value.budget, collection.value.currency))}</div></div><div class="portal-billing-item"${_scopeId}><div class="portal-billing-item__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.invoiced"))}</div><div class="portal-billing-item__value"${_scopeId}>${ssrInterpolate(formatMoney(collection.value.invoiced, collection.value.currency))}</div></div><div class="portal-billing-item"${_scopeId}><div class="portal-billing-item__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.remaining"))}</div><div class="portal-billing-item__value portal-billing-item__value--accent"${_scopeId}>${ssrInterpolate(formatMoney(collection.value.remaining, collection.value.currency))}</div></div></div><div${_scopeId}><div class="d-flex justify-content-between mb-2"${_scopeId}><span class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.collection_rate"))}</span><span class="portal-details__value"${_scopeId}>${ssrInterpolate(collection.value.collection_rate)}%</span></div><div class="portal-progress" style="${ssrRenderStyle({ "height": "10px" })}"${_scopeId}><div class="portal-progress__bar" style="${ssrRenderStyle({ width: `${collection.value.collection_rate}%` })}"${_scopeId}></div></div></div></div></div><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("projects.invoices"))}</h2></div><div class="portal-panel__body"${_scopeId}>`);
            if (invoiceList.value.length === 0) {
              _push2(`<div class="portal-empty"${_scopeId}><span class="portal-empty__icon"${_scopeId}><i class="fas fa-file-alt"${_scopeId}></i></span> ${ssrInterpolate(unref(t3)("projects.no_invoices"))}</div>`);
            } else {
              _push2(`<div class="portal-invoice-list"${_scopeId}><!--[-->`);
              ssrRenderList(invoiceList.value, (invoice) => {
                _push2(`<article class="portal-invoice-card"${_scopeId}><div class="portal-invoice-card__top"${_scopeId}><div${_scopeId}><div class="portal-invoice-card__number"${_scopeId}>${ssrInterpolate(invoice.invoice_number)}</div><span class="${ssrRenderClass([invoiceBadgeClass(invoice.status), "portal-badge mt-2"])}"${_scopeId}>${ssrInterpolate(unref(invoiceStatusLabel)(invoice.status))}</span></div><div class="portal-invoice-card__total"${_scopeId}>${ssrInterpolate(formatMoney(invoice.total, invoice.currency))}</div></div><div class="portal-invoice-card__meta"${_scopeId}><div class="portal-invoice-card__meta-item"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.issued_at"))}</span><strong${_scopeId}>${ssrInterpolate(invoice.issued_at || "—")}</strong></div><div class="portal-invoice-card__meta-item"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.due_at"))}</span><strong${_scopeId}>${ssrInterpolate(invoice.due_at || "—")}</strong></div><div class="portal-invoice-card__meta-item"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.paid_at"))}</span><strong${_scopeId}>${ssrInterpolate(invoice.paid_at || "—")}</strong></div></div><a${ssrRenderAttr("href", invoice.pdf_url)} class="portal-panel__action" target="_blank" rel="noopener"${_scopeId}><i class="fas fa-download"${_scopeId}></i> ${ssrInterpolate(unref(t3)("projects.download_pdf"))}</a></article>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "portal-grid portal-grid--show" }, [
                createVNode("div", null, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("projects.details")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("div", { class: "portal-details" }, [
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.status")), 1),
                          createVNode("div", { class: "portal-details__value" }, [
                            createVNode("span", {
                              class: "portal-badge",
                              style: statusBadgeStyle.value
                            }, toDisplayString(((_c = __props.project.status) == null ? void 0 : _c.name) || "—"), 5)
                          ])
                        ]),
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.payment_status")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(unref(paymentStatusLabel)(__props.project.payment_status)), 1)
                        ]),
                        ((_d = __props.project.company) == null ? void 0 : _d.name) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.company")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.project.company.name), 1)
                        ])) : createCommentVNode("", true),
                        __props.project.start_date ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.start_date")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.project.start_date), 1)
                        ])) : createCommentVNode("", true),
                        __props.project.due_date ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.due_date")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.project.due_date), 1)
                        ])) : createCommentVNode("", true),
                        __props.project.description ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.description")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.project.description), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  attachments.value.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "portal-panel",
                    style: { "margin-top": "24px" }
                  }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("projects.attachments")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("ul", { class: "list-unstyled mb-0" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(attachments.value, (attachment, index) => {
                          return openBlock(), createBlock("li", {
                            key: index,
                            class: "mb-2"
                          }, [
                            createVNode("a", {
                              href: attachment.url,
                              target: "_blank",
                              class: "portal-panel__action"
                            }, [
                              createVNode("i", { class: "fas fa-paperclip" }),
                              createTextVNode(toDisplayString(attachment.name), 1)
                            ], 8, ["href"])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  __props.project.is_completed ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "portal-panel",
                    style: { "margin-top": "24px" }
                  }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("projects.review_title")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      __props.project.review ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-details"
                      }, [
                        createVNode("p", { class: "mb-2" }, toDisplayString(unref(t3)("projects.review_submitted_hint")), 1),
                        createVNode("div", { class: "portal-review-quote" }, "“" + toDisplayString(reviewQuote.value) + "”", 1),
                        __props.project.review.status ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ["portal-badge mt-3", __props.project.review.status === "Published" ? "portal-badge--paid" : "portal-badge--invoice"]
                        }, toDisplayString(__props.project.review.status === "Published" ? unref(t3)("projects.review_status_published") : unref(t3)("projects.review_status_pending")), 3)) : createCommentVNode("", true)
                      ])) : __props.project.can_review ? (openBlock(), createBlock("form", {
                        key: 1,
                        onSubmit: withModifiers(submitReview, ["prevent"])
                      }, [
                        createVNode("p", { class: "mb-3" }, toDisplayString(unref(t3)("projects.review_prompt")), 1),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(reviewForm).quote = $event,
                          class: "portal-input",
                          rows: "4",
                          placeholder: unref(t3)("projects.review_placeholder"),
                          required: "",
                          minlength: "10",
                          maxlength: "2000"
                        }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(reviewForm).quote]
                        ]),
                        unref(reviewForm).errors.quote ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "portal-form-error mt-2 mb-0"
                        }, toDisplayString(unref(reviewForm).errors.quote), 1)) : createCommentVNode("", true),
                        createVNode("button", {
                          type: "submit",
                          class: "thm-btn mt-3",
                          disabled: unref(reviewForm).processing,
                          style: { "padding": "10px 20px", "font-size": "14px" }
                        }, toDisplayString(unref(t3)("projects.submit_review")), 9, ["disabled"])
                      ], 32)) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "portal-empty"
                      }, toDisplayString(unref(t3)("projects.review_unavailable")), 1))
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "portal-grid__stack" }, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("projects.billing")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("div", { class: "portal-billing-grid" }, [
                        createVNode("div", { class: "portal-billing-item" }, [
                          createVNode("div", { class: "portal-billing-item__label" }, toDisplayString(unref(t3)("fields.budget")), 1),
                          createVNode("div", { class: "portal-billing-item__value" }, toDisplayString(formatMoney(collection.value.budget, collection.value.currency)), 1)
                        ]),
                        createVNode("div", { class: "portal-billing-item" }, [
                          createVNode("div", { class: "portal-billing-item__label" }, toDisplayString(unref(t3)("fields.invoiced")), 1),
                          createVNode("div", { class: "portal-billing-item__value" }, toDisplayString(formatMoney(collection.value.invoiced, collection.value.currency)), 1)
                        ]),
                        createVNode("div", { class: "portal-billing-item" }, [
                          createVNode("div", { class: "portal-billing-item__label" }, toDisplayString(unref(t3)("fields.remaining")), 1),
                          createVNode("div", { class: "portal-billing-item__value portal-billing-item__value--accent" }, toDisplayString(formatMoney(collection.value.remaining, collection.value.currency)), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "d-flex justify-content-between mb-2" }, [
                          createVNode("span", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.collection_rate")), 1),
                          createVNode("span", { class: "portal-details__value" }, toDisplayString(collection.value.collection_rate) + "%", 1)
                        ]),
                        createVNode("div", {
                          class: "portal-progress",
                          style: { "height": "10px" }
                        }, [
                          createVNode("div", {
                            class: "portal-progress__bar",
                            style: { width: `${collection.value.collection_rate}%` }
                          }, null, 4)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("projects.invoices")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      invoiceList.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-empty"
                      }, [
                        createVNode("span", { class: "portal-empty__icon" }, [
                          createVNode("i", { class: "fas fa-file-alt" })
                        ]),
                        createTextVNode(" " + toDisplayString(unref(t3)("projects.no_invoices")), 1)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "portal-invoice-list"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(invoiceList.value, (invoice) => {
                          return openBlock(), createBlock("article", {
                            key: invoice.id,
                            class: "portal-invoice-card"
                          }, [
                            createVNode("div", { class: "portal-invoice-card__top" }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "portal-invoice-card__number" }, toDisplayString(invoice.invoice_number), 1),
                                createVNode("span", {
                                  class: ["portal-badge mt-2", invoiceBadgeClass(invoice.status)]
                                }, toDisplayString(unref(invoiceStatusLabel)(invoice.status)), 3)
                              ]),
                              createVNode("div", { class: "portal-invoice-card__total" }, toDisplayString(formatMoney(invoice.total, invoice.currency)), 1)
                            ]),
                            createVNode("div", { class: "portal-invoice-card__meta" }, [
                              createVNode("div", { class: "portal-invoice-card__meta-item" }, [
                                createVNode("span", null, toDisplayString(unref(t3)("fields.issued_at")), 1),
                                createVNode("strong", null, toDisplayString(invoice.issued_at || "—"), 1)
                              ]),
                              createVNode("div", { class: "portal-invoice-card__meta-item" }, [
                                createVNode("span", null, toDisplayString(unref(t3)("fields.due_at")), 1),
                                createVNode("strong", null, toDisplayString(invoice.due_at || "—"), 1)
                              ]),
                              createVNode("div", { class: "portal-invoice-card__meta-item" }, [
                                createVNode("span", null, toDisplayString(unref(t3)("fields.paid_at")), 1),
                                createVNode("strong", null, toDisplayString(invoice.paid_at || "—"), 1)
                              ])
                            ]),
                            createVNode("a", {
                              href: invoice.pdf_url,
                              class: "portal-panel__action",
                              target: "_blank",
                              rel: "noopener"
                            }, [
                              createVNode("i", { class: "fas fa-download" }),
                              createTextVNode(" " + toDisplayString(unref(t3)("projects.download_pdf")), 1)
                            ], 8, ["href"])
                          ]);
                        }), 128))
                      ]))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Project/resources/assets/js/Pages/Portal/Projects/Show.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = {
  __name: "UseCaseCard",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true },
    variant: { type: String, default: "default" }
  },
  setup(__props) {
    const props = __props;
    const cardUrl = computed(() => {
      try {
        return route("use-cases.show", props.item.slug);
      } catch (e2) {
        return "#";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "portfolio-item" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), { href: cardUrl.value }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.item.image_link)}${ssrRenderAttr("alt", __props.item.title)}${_scopeId}><div class="portfolio-overlay"${_scopeId}><div class="caption"${_scopeId}><h5${_scopeId}>${ssrInterpolate(__props.item.title)}</h5><span${_scopeId}>${ssrInterpolate(__props.item.category_tag || __props.item.summary)}</span></div></div>`);
          } else {
            return [
              createVNode("img", {
                src: __props.item.image_link,
                alt: __props.item.title
              }, null, 8, ["src", "alt"]),
              createVNode("div", { class: "portfolio-overlay" }, [
                createVNode("div", { class: "caption" }, [
                  createVNode("h5", null, toDisplayString(__props.item.title), 1),
                  createVNode("span", null, toDisplayString(__props.item.category_tag || __props.item.summary), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UseCaseCard.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __default__$4 = {
  components: {
    AppLayout: _sfc_main$Q,
    CtaTwo: _sfc_main$O,
    UseCaseCard: _sfc_main$s
  }
};
const _sfc_main$r = /* @__PURE__ */ Object.assign(__default__$4, {
  __name: "UseCaseIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const useCases = computed(() => page.props.useCases || { data: [] });
    const meta = computed(() => page.props.meta || {});
    const metaTitle = computed(() => meta.value.title || `${trans("Case Studies")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => meta.value.description || trans("Explore our case studies and see how we help businesses with innovative technology solutions.") || seo.value.website_desc || "");
    const metaKeywords = computed(() => meta.value.keywords || trans("case studies, project solutions, IT solutions, web development") || seo.value.website_keywords || "");
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    onMounted(() => {
      nextTick(() => {
        if (typeof WOW !== "undefined") {
          new WOW().init();
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-6b70437f${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-6b70437f${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-6b70437f${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-6b70437f${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-6b70437f${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-6b70437f${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-6b70437f${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-6b70437f${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-6b70437f${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website" data-v-6b70437f${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-6b70437f${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-6b70437f${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-6b70437f${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-6b70437f${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Case Studies"),
              subtitle: trans("Latest Works"),
              background: asset_path.value + "theme/img/main/15.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small portfolio-wide" id="portfolio" data-v-6b70437f${_scopeId}><div class="use-cases-page__bg" aria-hidden="true" data-v-6b70437f${_scopeId}><div class="use-cases-page__orb use-cases-page__orb--one" data-v-6b70437f${_scopeId}></div><div class="use-cases-page__orb use-cases-page__orb--two" data-v-6b70437f${_scopeId}></div><div class="use-cases-page__orb use-cases-page__orb--three" data-v-6b70437f${_scopeId}></div></div><div class="container position-relative" data-v-6b70437f${_scopeId}><div class="section-title text-center sec-title-animation animation-style1" data-v-6b70437f${_scopeId}><div class="section-title__tagline-box" data-v-6b70437f${_scopeId}><div class="section-title__tagline-shape-1" data-v-6b70437f${_scopeId}></div><span class="section-title__tagline" data-v-6b70437f${_scopeId}>${ssrInterpolate(trans("Case Studies"))}</span><div class="section-title__tagline-shape-2" data-v-6b70437f${_scopeId}></div></div><h2 class="section-title__title title-animation" data-v-6b70437f${_scopeId}>${ssrInterpolate(trans("How We've Empowered Businesses with Innovative Tech Solutions"))}</h2></div><div class="row" data-v-6b70437f${_scopeId}><!--[-->`);
            ssrRenderList(useCases.value.data, (item, index) => {
              _push2(`<div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"${ssrRenderAttr("data-wow-delay", `${(index % 3 + 1) * 100}ms`)} data-v-6b70437f${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$s, {
                item,
                locale: locale.value
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (!useCases.value.data.length) {
              _push2(`<div class="col-12" data-v-6b70437f${_scopeId}><div class="text-center py-5" data-v-6b70437f${_scopeId}><h3 class="use-cases-page__empty" data-v-6b70437f${_scopeId}>${ssrInterpolate(trans("No records found"))}</h3></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (useCases.value.last_page > 1) {
              _push2(`<div class="blog-page__pagination" data-v-6b70437f${_scopeId}><ul class="pg-pagination list-unstyled" data-v-6b70437f${_scopeId}>`);
              if (useCases.value.prev_page_url) {
                _push2(`<li class="prev" data-v-6b70437f${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: useCases.value.prev_page_url,
                  "aria-label": "Previous"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="icon-left-arrow-1" data-v-6b70437f${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", { class: "icon-left-arrow-1" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(useCases.value.links, (link, index) => {
                _push2(`<!--[-->`);
                if (link.url && index > 0 && index < useCases.value.links.length - 1) {
                  _push2(`<li class="${ssrRenderClass(["count", link.active ? "active" : ""])}" data-v-6b70437f${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url
                  }, {
                    default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(link.label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(link.label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</li>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              if (useCases.value.next_page_url) {
                _push2(`<li class="next" data-v-6b70437f${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: useCases.value.next_page_url,
                  "aria-label": "Next"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`)}" data-v-6b70437f${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", {
                          class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Case Studies"),
                subtitle: trans("Latest Works"),
                background: asset_path.value + "theme/img/main/15.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", {
                class: "section-small portfolio-wide",
                id: "portfolio"
              }, [
                createVNode("div", {
                  class: "use-cases-page__bg",
                  "aria-hidden": "true"
                }, [
                  createVNode("div", { class: "use-cases-page__orb use-cases-page__orb--one" }),
                  createVNode("div", { class: "use-cases-page__orb use-cases-page__orb--two" }),
                  createVNode("div", { class: "use-cases-page__orb use-cases-page__orb--three" })
                ]),
                createVNode("div", { class: "container position-relative" }, [
                  createVNode("div", { class: "section-title text-center sec-title-animation animation-style1" }, [
                    createVNode("div", { class: "section-title__tagline-box" }, [
                      createVNode("div", { class: "section-title__tagline-shape-1" }),
                      createVNode("span", { class: "section-title__tagline" }, toDisplayString(trans("Case Studies")), 1),
                      createVNode("div", { class: "section-title__tagline-shape-2" })
                    ]),
                    createVNode("h2", { class: "section-title__title title-animation" }, toDisplayString(trans("How We've Empowered Businesses with Innovative Tech Solutions")), 1)
                  ]),
                  createVNode("div", { class: "row" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(useCases.value.data, (item, index) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "col-xl-4 col-lg-6 col-md-6 wow fadeInUp",
                        "data-wow-delay": `${(index % 3 + 1) * 100}ms`
                      }, [
                        createVNode(_sfc_main$s, {
                          item,
                          locale: locale.value
                        }, null, 8, ["item", "locale"])
                      ], 8, ["data-wow-delay"]);
                    }), 128)),
                    !useCases.value.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-12"
                    }, [
                      createVNode("div", { class: "text-center py-5" }, [
                        createVNode("h3", { class: "use-cases-page__empty" }, toDisplayString(trans("No records found")), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    useCases.value.last_page > 1 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "blog-page__pagination"
                    }, [
                      createVNode("ul", { class: "pg-pagination list-unstyled" }, [
                        useCases.value.prev_page_url ? (openBlock(), createBlock("li", {
                          key: 0,
                          class: "prev"
                        }, [
                          createVNode(unref(Link), {
                            href: useCases.value.prev_page_url,
                            "aria-label": "Previous"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "icon-left-arrow-1" })
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(useCases.value.links, (link, index) => {
                          return openBlock(), createBlock(Fragment, { key: index }, [
                            link.url && index > 0 && index < useCases.value.links.length - 1 ? (openBlock(), createBlock("li", {
                              key: 0,
                              class: ["count", link.active ? "active" : ""]
                            }, [
                              createVNode(unref(Link), {
                                href: link.url
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(link.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ], 2)) : createCommentVNode("", true)
                          ], 64);
                        }), 128)),
                        useCases.value.next_page_url ? (openBlock(), createBlock("li", {
                          key: 1,
                          class: "next"
                        }, [
                          createVNode(unref(Link), {
                            href: useCases.value.next_page_url,
                            "aria-label": "Next"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                              }, null, 2)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Project/resources/assets/js/Pages/UseCaseIndex.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const UseCaseIndex = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-6b70437f"]]);
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UseCaseIndex
}, Symbol.toStringTag, { value: "Module" }));
const __default__$3 = {
  components: {
    AppLayout: _sfc_main$Q,
    CtaTwo: _sfc_main$O,
    UseCaseCard: _sfc_main$s
  }
};
const _sfc_main$q = /* @__PURE__ */ Object.assign(__default__$3, {
  __name: "UseCaseShow",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const useCase = computed(() => page.props.useCase || {});
    const relatedUseCases = computed(() => page.props.relatedUseCases || []);
    const meta = computed(() => page.props.meta || {});
    const metaTitle = computed(() => meta.value.title || `${useCase.value.title || trans("Case Studies")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => meta.value.description || useCase.value.summary || seo.value.website_desc || "");
    const metaKeywords = computed(() => meta.value.keywords || (useCase.value.technologies || []).join(", ") || seo.value.website_keywords || "");
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || useCase.value.image_link || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const getShareUrl = (platform) => {
      if (typeof window === "undefined") {
        return "#";
      }
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(useCase.value.title || "");
      switch (platform) {
        case "twitter":
          return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        case "facebook":
          return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "linkedin":
          return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        default:
          return "#";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-3e309d87${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-3e309d87${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-3e309d87${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-3e309d87${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-3e309d87${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-3e309d87${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-3e309d87${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-3e309d87${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-3e309d87${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="article" data-v-3e309d87${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-3e309d87${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-3e309d87${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-3e309d87${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-3e309d87${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "article"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: useCase.value.title,
              subtitle: trans("Case Studies"),
              background: useCase.value.image_link || asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="blog-details use-cases-page" data-v-3e309d87${_scopeId}><div class="use-cases-page__bg" aria-hidden="true" data-v-3e309d87${_scopeId}><div class="use-cases-page__orb use-cases-page__orb--one" data-v-3e309d87${_scopeId}></div><div class="use-cases-page__orb use-cases-page__orb--two" data-v-3e309d87${_scopeId}></div><div class="use-cases-page__orb use-cases-page__orb--three" data-v-3e309d87${_scopeId}></div></div><div class="container position-relative" data-v-3e309d87${_scopeId}><div class="row" data-v-3e309d87${_scopeId}><div class="col-xl-12" data-v-3e309d87${_scopeId}><article class="use-case-detail" data-v-3e309d87${_scopeId}><div class="use-case-detail__glow" aria-hidden="true" data-v-3e309d87${_scopeId}></div><header class="use-case-detail__header" data-v-3e309d87${_scopeId}><div class="use-case-detail__identity" data-v-3e309d87${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("use-cases.index"),
              class: "use-case-detail__avatar"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img${ssrRenderAttr("src", useCase.value.image_link)}${ssrRenderAttr("alt", useCase.value.title)} loading="lazy" decoding="async" data-v-3e309d87${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      src: useCase.value.image_link,
                      alt: useCase.value.title,
                      loading: "lazy",
                      decoding: "async"
                    }, null, 8, ["src", "alt"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="use-case-detail__intro" data-v-3e309d87${_scopeId}><h1 class="use-case-detail__title" data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.title)}</h1>`);
            if (useCase.value.client_name) {
              _push2(`<p class="use-case-detail__subtitle" data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.client_name)}</p>`);
            } else if (useCase.value.category_tag) {
              _push2(`<p class="use-case-detail__subtitle" data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.category_tag)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="use-case-detail__actions" data-v-3e309d87${_scopeId}><div class="use-case-detail__share" data-v-3e309d87${_scopeId}><span class="use-case-detail__share-label" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Share now"))}</span><div class="use-case-detail__share-links" data-v-3e309d87${_scopeId}><a${ssrRenderAttr("href", getShareUrl("facebook"))} target="_blank" rel="noopener" class="use-case-detail__share-btn" aria-label="Facebook" data-v-3e309d87${_scopeId}><span class="icon-facebook" data-v-3e309d87${_scopeId}></span></a><a${ssrRenderAttr("href", getShareUrl("twitter"))} target="_blank" rel="noopener" class="use-case-detail__share-btn" aria-label="Twitter" data-v-3e309d87${_scopeId}><span class="fab fa-twitter" data-v-3e309d87${_scopeId}></span></a><a${ssrRenderAttr("href", getShareUrl("linkedin"))} target="_blank" rel="noopener" class="use-case-detail__share-btn" aria-label="LinkedIn" data-v-3e309d87${_scopeId}><span class="icon-linkedin" data-v-3e309d87${_scopeId}></span></a></div></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("contact-us"),
              class: "use-case-detail__pill use-case-detail__pill--cta"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Get in Touch"))} <span class="icon-right-up" data-v-3e309d87${_scopeId2}></span>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Get in Touch")) + " ", 1),
                    createVNode("span", { class: "icon-right-up" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></header>`);
            if (useCase.value.client_name || useCase.value.completed_year || useCase.value.category_tag) {
              _push2(`<div class="use-case-detail__meta" data-v-3e309d87${_scopeId}>`);
              if (useCase.value.client_name) {
                _push2(`<div class="use-case-detail__pill" data-v-3e309d87${_scopeId}><i class="fas fa-user" data-v-3e309d87${_scopeId}></i><span data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Client"))}: ${ssrInterpolate(useCase.value.client_name)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (useCase.value.completed_year) {
                _push2(`<div class="use-case-detail__pill" data-v-3e309d87${_scopeId}><i class="far fa-calendar-alt" data-v-3e309d87${_scopeId}></i><span data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.completed_year)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (useCase.value.category_tag) {
                _push2(`<div class="use-case-detail__pill" data-v-3e309d87${_scopeId}><i class="fas fa-tag" data-v-3e309d87${_scopeId}></i><span data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.category_tag)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="use-case-detail__hero" data-v-3e309d87${_scopeId}><img${ssrRenderAttr("src", useCase.value.image_link)}${ssrRenderAttr("alt", useCase.value.title)} loading="lazy" decoding="async" data-v-3e309d87${_scopeId}></div>`);
            if (useCase.value.summary) {
              _push2(`<div class="use-case-detail__section" data-v-3e309d87${_scopeId}><div class="use-case-detail__section-head" data-v-3e309d87${_scopeId}><span class="use-case-detail__section-icon" data-v-3e309d87${_scopeId}><i class="fas fa-lightbulb" data-v-3e309d87${_scopeId}></i></span><span class="use-case-detail__section-label" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Project Overview"))}</span></div><p class="use-case-detail__text" data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.summary)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (useCase.value.challenge) {
              _push2(`<div class="use-case-detail__section" data-v-3e309d87${_scopeId}><div class="use-case-detail__section-head" data-v-3e309d87${_scopeId}><span class="use-case-detail__section-icon" data-v-3e309d87${_scopeId}><i class="fas fa-exclamation-triangle" data-v-3e309d87${_scopeId}></i></span><span class="use-case-detail__section-label" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("The Challenge"))}</span></div><p class="use-case-detail__text" data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.challenge)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (useCase.value.solution) {
              _push2(`<div class="use-case-detail__section" data-v-3e309d87${_scopeId}><div class="use-case-detail__section-head" data-v-3e309d87${_scopeId}><span class="use-case-detail__section-icon" data-v-3e309d87${_scopeId}><i class="fas fa-cogs" data-v-3e309d87${_scopeId}></i></span><span class="use-case-detail__section-label" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Our Solution"))}</span></div><p class="use-case-detail__text" data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.solution)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (useCase.value.results) {
              _push2(`<div class="use-case-detail__section" data-v-3e309d87${_scopeId}><div class="use-case-detail__section-head" data-v-3e309d87${_scopeId}><span class="use-case-detail__section-icon" data-v-3e309d87${_scopeId}><i class="fas fa-chart-line" data-v-3e309d87${_scopeId}></i></span><span class="use-case-detail__section-label" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("The Results"))}</span></div><p class="use-case-detail__text" data-v-3e309d87${_scopeId}>${ssrInterpolate(useCase.value.results)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (useCase.value.content) {
              _push2(`<div class="use-case-detail__section" data-v-3e309d87${_scopeId}><div class="use-case-detail__section-head" data-v-3e309d87${_scopeId}><span class="use-case-detail__section-icon" data-v-3e309d87${_scopeId}><i class="fas fa-align-left" data-v-3e309d87${_scopeId}></i></span><span class="use-case-detail__section-label" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Details"))}</span></div><div class="use-case-detail__content" data-v-3e309d87${_scopeId}>${useCase.value.content ?? ""}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (useCase.value.technologies && useCase.value.technologies.length) {
              _push2(`<div class="use-case-detail__section" data-v-3e309d87${_scopeId}><div class="use-case-detail__section-head" data-v-3e309d87${_scopeId}><span class="use-case-detail__section-icon" data-v-3e309d87${_scopeId}><i class="fas fa-code" data-v-3e309d87${_scopeId}></i></span><span class="use-case-detail__section-label" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Technologies Used"))}</span></div><div class="use-case-detail__tags" data-v-3e309d87${_scopeId}><!--[-->`);
              ssrRenderList(useCase.value.technologies, (tech) => {
                _push2(`<span class="use-case-detail__tag" data-v-3e309d87${_scopeId}>${ssrInterpolate(tech)}</span>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (useCase.value.project_url) {
              _push2(`<footer class="use-case-detail__footer" data-v-3e309d87${_scopeId}><a${ssrRenderAttr("href", useCase.value.project_url)} target="_blank" rel="noopener" class="use-case-detail__pill use-case-detail__pill--cta" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Visit Live Project"))} <span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow`)}" data-v-3e309d87${_scopeId}></span></a></footer>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article>`);
            if (relatedUseCases.value.length) {
              _push2(`<div class="use-cases-related" data-v-3e309d87${_scopeId}><div class="use-cases-related__head" data-v-3e309d87${_scopeId}><div class="section-title__tagline-box justify-content-center" data-v-3e309d87${_scopeId}><div class="section-title__tagline-shape-1" data-v-3e309d87${_scopeId}></div><span class="section-title__tagline" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("More Case Studies"))}</span><div class="section-title__tagline-shape-2" data-v-3e309d87${_scopeId}></div></div><h3 class="use-cases-related__title" data-v-3e309d87${_scopeId}>${ssrInterpolate(trans("Explore More Success Stories"))}</h3></div><div class="row" data-v-3e309d87${_scopeId}><!--[-->`);
              ssrRenderList(relatedUseCases.value, (item) => {
                _push2(`<div class="col-xl-4 col-lg-6 col-md-6" data-v-3e309d87${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$s, {
                  item,
                  locale: locale.value,
                  variant: "compact"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: useCase.value.title,
                subtitle: trans("Case Studies"),
                background: useCase.value.image_link || asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", { class: "blog-details use-cases-page" }, [
                createVNode("div", {
                  class: "use-cases-page__bg",
                  "aria-hidden": "true"
                }, [
                  createVNode("div", { class: "use-cases-page__orb use-cases-page__orb--one" }),
                  createVNode("div", { class: "use-cases-page__orb use-cases-page__orb--two" }),
                  createVNode("div", { class: "use-cases-page__orb use-cases-page__orb--three" })
                ]),
                createVNode("div", { class: "container position-relative" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-xl-12" }, [
                      createVNode("article", { class: "use-case-detail" }, [
                        createVNode("div", {
                          class: "use-case-detail__glow",
                          "aria-hidden": "true"
                        }),
                        createVNode("header", { class: "use-case-detail__header" }, [
                          createVNode("div", { class: "use-case-detail__identity" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("use-cases.index"),
                              class: "use-case-detail__avatar"
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: useCase.value.image_link,
                                  alt: useCase.value.title,
                                  loading: "lazy",
                                  decoding: "async"
                                }, null, 8, ["src", "alt"])
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode("div", { class: "use-case-detail__intro" }, [
                              createVNode("h1", { class: "use-case-detail__title" }, toDisplayString(useCase.value.title), 1),
                              useCase.value.client_name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "use-case-detail__subtitle"
                              }, toDisplayString(useCase.value.client_name), 1)) : useCase.value.category_tag ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "use-case-detail__subtitle"
                              }, toDisplayString(useCase.value.category_tag), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "use-case-detail__actions" }, [
                            createVNode("div", { class: "use-case-detail__share" }, [
                              createVNode("span", { class: "use-case-detail__share-label" }, toDisplayString(trans("Share now")), 1),
                              createVNode("div", { class: "use-case-detail__share-links" }, [
                                createVNode("a", {
                                  href: getShareUrl("facebook"),
                                  target: "_blank",
                                  rel: "noopener",
                                  class: "use-case-detail__share-btn",
                                  "aria-label": "Facebook"
                                }, [
                                  createVNode("span", { class: "icon-facebook" })
                                ], 8, ["href"]),
                                createVNode("a", {
                                  href: getShareUrl("twitter"),
                                  target: "_blank",
                                  rel: "noopener",
                                  class: "use-case-detail__share-btn",
                                  "aria-label": "Twitter"
                                }, [
                                  createVNode("span", { class: "fab fa-twitter" })
                                ], 8, ["href"]),
                                createVNode("a", {
                                  href: getShareUrl("linkedin"),
                                  target: "_blank",
                                  rel: "noopener",
                                  class: "use-case-detail__share-btn",
                                  "aria-label": "LinkedIn"
                                }, [
                                  createVNode("span", { class: "icon-linkedin" })
                                ], 8, ["href"])
                              ])
                            ]),
                            createVNode(unref(Link), {
                              href: _ctx.route("contact-us"),
                              class: "use-case-detail__pill use-case-detail__pill--cta"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Get in Touch")) + " ", 1),
                                createVNode("span", { class: "icon-right-up" })
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ]),
                        useCase.value.client_name || useCase.value.completed_year || useCase.value.category_tag ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "use-case-detail__meta"
                        }, [
                          useCase.value.client_name ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "use-case-detail__pill"
                          }, [
                            createVNode("i", { class: "fas fa-user" }),
                            createVNode("span", null, toDisplayString(trans("Client")) + ": " + toDisplayString(useCase.value.client_name), 1)
                          ])) : createCommentVNode("", true),
                          useCase.value.completed_year ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "use-case-detail__pill"
                          }, [
                            createVNode("i", { class: "far fa-calendar-alt" }),
                            createVNode("span", null, toDisplayString(useCase.value.completed_year), 1)
                          ])) : createCommentVNode("", true),
                          useCase.value.category_tag ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "use-case-detail__pill"
                          }, [
                            createVNode("i", { class: "fas fa-tag" }),
                            createVNode("span", null, toDisplayString(useCase.value.category_tag), 1)
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "use-case-detail__hero" }, [
                          createVNode("img", {
                            src: useCase.value.image_link,
                            alt: useCase.value.title,
                            loading: "lazy",
                            decoding: "async"
                          }, null, 8, ["src", "alt"])
                        ]),
                        useCase.value.summary ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "use-case-detail__section"
                        }, [
                          createVNode("div", { class: "use-case-detail__section-head" }, [
                            createVNode("span", { class: "use-case-detail__section-icon" }, [
                              createVNode("i", { class: "fas fa-lightbulb" })
                            ]),
                            createVNode("span", { class: "use-case-detail__section-label" }, toDisplayString(trans("Project Overview")), 1)
                          ]),
                          createVNode("p", { class: "use-case-detail__text" }, toDisplayString(useCase.value.summary), 1)
                        ])) : createCommentVNode("", true),
                        useCase.value.challenge ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "use-case-detail__section"
                        }, [
                          createVNode("div", { class: "use-case-detail__section-head" }, [
                            createVNode("span", { class: "use-case-detail__section-icon" }, [
                              createVNode("i", { class: "fas fa-exclamation-triangle" })
                            ]),
                            createVNode("span", { class: "use-case-detail__section-label" }, toDisplayString(trans("The Challenge")), 1)
                          ]),
                          createVNode("p", { class: "use-case-detail__text" }, toDisplayString(useCase.value.challenge), 1)
                        ])) : createCommentVNode("", true),
                        useCase.value.solution ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "use-case-detail__section"
                        }, [
                          createVNode("div", { class: "use-case-detail__section-head" }, [
                            createVNode("span", { class: "use-case-detail__section-icon" }, [
                              createVNode("i", { class: "fas fa-cogs" })
                            ]),
                            createVNode("span", { class: "use-case-detail__section-label" }, toDisplayString(trans("Our Solution")), 1)
                          ]),
                          createVNode("p", { class: "use-case-detail__text" }, toDisplayString(useCase.value.solution), 1)
                        ])) : createCommentVNode("", true),
                        useCase.value.results ? (openBlock(), createBlock("div", {
                          key: 4,
                          class: "use-case-detail__section"
                        }, [
                          createVNode("div", { class: "use-case-detail__section-head" }, [
                            createVNode("span", { class: "use-case-detail__section-icon" }, [
                              createVNode("i", { class: "fas fa-chart-line" })
                            ]),
                            createVNode("span", { class: "use-case-detail__section-label" }, toDisplayString(trans("The Results")), 1)
                          ]),
                          createVNode("p", { class: "use-case-detail__text" }, toDisplayString(useCase.value.results), 1)
                        ])) : createCommentVNode("", true),
                        useCase.value.content ? (openBlock(), createBlock("div", {
                          key: 5,
                          class: "use-case-detail__section"
                        }, [
                          createVNode("div", { class: "use-case-detail__section-head" }, [
                            createVNode("span", { class: "use-case-detail__section-icon" }, [
                              createVNode("i", { class: "fas fa-align-left" })
                            ]),
                            createVNode("span", { class: "use-case-detail__section-label" }, toDisplayString(trans("Details")), 1)
                          ]),
                          createVNode("div", {
                            class: "use-case-detail__content",
                            innerHTML: useCase.value.content
                          }, null, 8, ["innerHTML"])
                        ])) : createCommentVNode("", true),
                        useCase.value.technologies && useCase.value.technologies.length ? (openBlock(), createBlock("div", {
                          key: 6,
                          class: "use-case-detail__section"
                        }, [
                          createVNode("div", { class: "use-case-detail__section-head" }, [
                            createVNode("span", { class: "use-case-detail__section-icon" }, [
                              createVNode("i", { class: "fas fa-code" })
                            ]),
                            createVNode("span", { class: "use-case-detail__section-label" }, toDisplayString(trans("Technologies Used")), 1)
                          ]),
                          createVNode("div", { class: "use-case-detail__tags" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(useCase.value.technologies, (tech) => {
                              return openBlock(), createBlock("span", {
                                key: tech,
                                class: "use-case-detail__tag"
                              }, toDisplayString(tech), 1);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        useCase.value.project_url ? (openBlock(), createBlock("footer", {
                          key: 7,
                          class: "use-case-detail__footer"
                        }, [
                          createVNode("a", {
                            href: useCase.value.project_url,
                            target: "_blank",
                            rel: "noopener",
                            class: "use-case-detail__pill use-case-detail__pill--cta"
                          }, [
                            createTextVNode(toDisplayString(trans("Visit Live Project")) + " ", 1),
                            createVNode("span", {
                              class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow`
                            }, null, 2)
                          ], 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ]),
                      relatedUseCases.value.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "use-cases-related"
                      }, [
                        createVNode("div", { class: "use-cases-related__head" }, [
                          createVNode("div", { class: "section-title__tagline-box justify-content-center" }, [
                            createVNode("div", { class: "section-title__tagline-shape-1" }),
                            createVNode("span", { class: "section-title__tagline" }, toDisplayString(trans("More Case Studies")), 1),
                            createVNode("div", { class: "section-title__tagline-shape-2" })
                          ]),
                          createVNode("h3", { class: "use-cases-related__title" }, toDisplayString(trans("Explore More Success Stories")), 1)
                        ]),
                        createVNode("div", { class: "row" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(relatedUseCases.value, (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "col-xl-4 col-lg-6 col-md-6"
                            }, [
                              createVNode(_sfc_main$s, {
                                item,
                                locale: locale.value,
                                variant: "compact"
                              }, null, 8, ["item", "locale"])
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Project/resources/assets/js/Pages/UseCaseShow.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const UseCaseShow = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-3e309d87"]]);
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UseCaseShow
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = {
  __name: "ServiceCardThree",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: true },
    shortDesc: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: Array, default: () => [] },
    link: { type: String, required: true },
    image: { type: String, default: "" },
    buttonLabel: { type: String, default: "Read More" },
    isRtl: { type: Boolean, default: false },
    readingTime: { type: [Number, String], default: 0 },
    readingTimeLabel: { type: String, default: "min read" },
    category: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    iconClass: { type: String, default: "ion-ios-analytics-outline" }
  },
  setup(__props) {
    const page = usePage();
    const trans = (key) => {
      var _a;
      return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
    };
    const props = __props;
    const buttonText = computed(() => trans(props.buttonLabel));
    const categoryLabel = computed(() => props.category || "");
    const imageUsable = ref(true);
    const hasImage = computed(() => {
      const src = String(props.image || "");
      return src !== "" && !src.includes("blank.png");
    });
    const onImageLoad = (event) => {
      const img = event == null ? void 0 : event.target;
      if (!img) {
        return;
      }
      imageUsable.value = img.naturalWidth >= 240 && img.naturalHeight >= 80;
    };
    const excerptText = computed(() => {
      const raw = props.shortDesc || props.description || "";
      const text = String(raw).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text.length <= 140) {
        return text;
      }
      return `${text.slice(0, 140).trim()}…`;
    });
    const visibleHighlights = computed(() => {
      return (props.highlights || []).map((item) => String(item || "").trim()).filter(Boolean).slice(0, 3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["service-card", { "service-card--featured": __props.featured }]
      }, _attrs))} data-v-ae886a5d>`);
      _push(ssrRenderComponent(unref(Link), {
        href: __props.link,
        class: "service-card__link"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (hasImage.value && imageUsable.value) {
              _push2(`<div class="service-card__media" data-v-ae886a5d${_scopeId}><img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.title)} loading="lazy" decoding="async" data-v-ae886a5d${_scopeId}>`);
              if (__props.featured) {
                _push2(`<span class="service-card__badge" data-v-ae886a5d${_scopeId}>${ssrInterpolate(trans("Featured"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="service-card__body" data-v-ae886a5d${_scopeId}>`);
            if (__props.featured && !(hasImage.value && imageUsable.value)) {
              _push2(`<p class="service-card__featured-label" data-v-ae886a5d${_scopeId}>${ssrInterpolate(trans("Featured"))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (categoryLabel.value) {
              _push2(`<p class="service-card__category" data-v-ae886a5d${_scopeId}>${ssrInterpolate(categoryLabel.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h3 class="service-card__title" data-v-ae886a5d${_scopeId}>`);
            if (!(hasImage.value && imageUsable.value)) {
              _push2(`<i class="${ssrRenderClass([__props.iconClass, "icon-big"])}" aria-hidden="true" data-v-ae886a5d${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(__props.title)}</h3>`);
            if (excerptText.value) {
              _push2(`<p class="service-card__excerpt" data-v-ae886a5d${_scopeId}>${ssrInterpolate(excerptText.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (visibleHighlights.value.length) {
              _push2(`<ul class="service-card__tags list-unstyled" data-v-ae886a5d${_scopeId}><!--[-->`);
              ssrRenderList(visibleHighlights.value, (tag) => {
                _push2(`<li data-v-ae886a5d${_scopeId}>${ssrInterpolate(tag)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="service-card__footer" data-v-ae886a5d${_scopeId}><span class="btn btn-dark btn-xs" data-v-ae886a5d${_scopeId}>${ssrInterpolate(buttonText.value)}</span>`);
            if (Number(__props.readingTime)) {
              _push2(`<span class="service-card__meta" data-v-ae886a5d${_scopeId}><i class="far fa-clock" aria-hidden="true" data-v-ae886a5d${_scopeId}></i> ${ssrInterpolate(__props.readingTime)} ${ssrInterpolate(__props.readingTimeLabel)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              hasImage.value && imageUsable.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "service-card__media"
              }, [
                createVNode("img", {
                  src: __props.image,
                  alt: __props.title,
                  loading: "lazy",
                  decoding: "async",
                  onLoad: onImageLoad
                }, null, 40, ["src", "alt"]),
                __props.featured ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "service-card__badge"
                }, toDisplayString(trans("Featured")), 1)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "service-card__body" }, [
                __props.featured && !(hasImage.value && imageUsable.value) ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "service-card__featured-label"
                }, toDisplayString(trans("Featured")), 1)) : createCommentVNode("", true),
                categoryLabel.value ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: "service-card__category"
                }, toDisplayString(categoryLabel.value), 1)) : createCommentVNode("", true),
                createVNode("h3", { class: "service-card__title" }, [
                  !(hasImage.value && imageUsable.value) ? (openBlock(), createBlock("i", {
                    key: 0,
                    class: [__props.iconClass, "icon-big"],
                    "aria-hidden": "true"
                  }, null, 2)) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(__props.title), 1)
                ]),
                excerptText.value ? (openBlock(), createBlock("p", {
                  key: 2,
                  class: "service-card__excerpt"
                }, toDisplayString(excerptText.value), 1)) : createCommentVNode("", true),
                visibleHighlights.value.length ? (openBlock(), createBlock("ul", {
                  key: 3,
                  class: "service-card__tags list-unstyled"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(visibleHighlights.value, (tag) => {
                    return openBlock(), createBlock("li", { key: tag }, toDisplayString(tag), 1);
                  }), 128))
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "service-card__footer" }, [
                  createVNode("span", { class: "btn btn-dark btn-xs" }, toDisplayString(buttonText.value), 1),
                  Number(__props.readingTime) ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "service-card__meta"
                  }, [
                    createVNode("i", {
                      class: "far fa-clock",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" " + toDisplayString(__props.readingTime) + " " + toDisplayString(__props.readingTimeLabel), 1)
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</article>`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Services/ServiceCardThree.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const ServiceCardThree = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-ae886a5d"]]);
const __default__$2 = {
  components: {
    AppLayout: _sfc_main$Q,
    CtaTwo: _sfc_main$O
  }
};
const _sfc_main$o = /* @__PURE__ */ Object.assign(__default__$2, {
  __name: "ServiceIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const categories = computed(() => page.props.categories || []);
    const filters = computed(() => page.props.filters || {});
    const meta = computed(() => page.props.meta || {});
    const totalServicesCount = computed(() => page.props.totalServicesCount || 0);
    const featuredCount = computed(() => page.props.featuredCount || 0);
    const searchQuery = ref(filters.value.search || "");
    const serviceIcons = [
      "ion-ios-pie-outline",
      "ion-ios-game-controller-b-outline",
      "ion-ios-analytics-outline",
      "ion-ios-clock-outline"
    ];
    const metaTitle = computed(() => {
      return `${trans("Our Services")} | ${seo.value.website_name || ""}`.trim();
    });
    const metaDescription = computed(() => {
      return meta.value.description || trans("Discover our IT services designed to scale and modernize your business.") || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("IT services, web development, mobile apps, AI solutions, cloud services") || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const services = computed(() => {
      const source = page.props.services || { data: [], links: [], last_page: 1, total: 0 };
      const data = Array.isArray(source.data) ? source.data.filter((service) => service && service.id) : [];
      return {
        ...source,
        data
      };
    });
    const hasActiveFilters = computed(() => Boolean(filters.value.search || filters.value.category));
    watch(() => filters.value.search, (value) => {
      searchQuery.value = value || "";
    });
    const translateField = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      if (typeof value === "object" && value !== null) {
        return value[locale.value] || value["en"] || value[Object.keys(value)[0]] || "";
      }
      return "";
    };
    const filterParams = (overrides = {}) => {
      const params = {};
      const search = overrides.search !== void 0 ? overrides.search : filters.value.search;
      const category = overrides.category !== void 0 ? overrides.category : filters.value.category;
      if (search) params.search = search;
      if (category) params.category = category;
      return params;
    };
    const categoryUrl = (slug) => route("services.index", filterParams({ category: slug || null }));
    const submitSearch = () => {
      router.get(route("services.index"), filterParams({ search: searchQuery.value.trim() || null }), {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    };
    const getServiceUrl = (service) => {
      if (!service || !service.slug) {
        return "#";
      }
      try {
        return route("services.show", service.slug);
      } catch (e2) {
        return "#";
      }
    };
    const getServiceTitle = (service) => translateField(service == null ? void 0 : service.title);
    const getServiceDescription = (service) => translateField(service == null ? void 0 : service.description);
    const getCategoryName = (category) => translateField(category == null ? void 0 : category.title);
    const normalizeKeywords = (rawKeywords) => {
      if (!rawKeywords) {
        return [];
      }
      let parsed = rawKeywords;
      if (typeof rawKeywords === "string") {
        try {
          parsed = JSON.parse(rawKeywords);
        } catch (e2) {
          parsed = rawKeywords;
        }
      }
      if (Array.isArray(parsed)) {
        return parsed.map((item) => {
          if (typeof item === "string") {
            return item;
          }
          if (item && typeof item === "object") {
            if (item.value) {
              return translateField(item.value);
            }
            return translateField(item);
          }
          return "";
        }).map((item) => item == null ? void 0 : item.toString().trim()).filter(Boolean);
      }
      if (typeof parsed === "object") {
        const value = translateField(parsed);
        return value ? [value] : [];
      }
      return parsed.toString().split(/[,;\n]+/).map((item) => item.trim()).filter(Boolean);
    };
    const getServiceHighlights = (service) => normalizeKeywords(service == null ? void 0 : service.keywords);
    onMounted(() => {
      nextTick(() => {
        if (typeof WOW !== "undefined") {
          new WOW().init();
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-be14da04${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-be14da04${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-be14da04${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-be14da04${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-be14da04${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-be14da04${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-be14da04${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-be14da04${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-be14da04${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website" data-v-be14da04${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-be14da04${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-be14da04${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-be14da04${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-be14da04${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Our Services"),
              subtitle: trans("What we do"),
              background: asset_path.value + "theme/img/main/59.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="services" data-v-be14da04${_scopeId}><div class="container" data-v-be14da04${_scopeId}><div class="text-center" data-v-be14da04${_scopeId}><h2 data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Scale Your Business Smarter with Next-Gen IT Solutions"))}</h2><p class="services-page__subtitle" data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Discover our IT services designed to scale and modernize your business."))}</p></div>`);
            if (totalServicesCount.value) {
              _push2(`<div class="services-page__stats" data-v-be14da04${_scopeId}><div class="services-page__stat" data-v-be14da04${_scopeId}><span class="services-page__stat-value" data-v-be14da04${_scopeId}>${ssrInterpolate(totalServicesCount.value)}</span><span class="services-page__stat-label" data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Services Available"))}</span></div>`);
              if (categories.value.length) {
                _push2(`<div class="services-page__stat" data-v-be14da04${_scopeId}><span class="services-page__stat-value" data-v-be14da04${_scopeId}>${ssrInterpolate(categories.value.length)}</span><span class="services-page__stat-label" data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Categories"))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (featuredCount.value) {
                _push2(`<div class="services-page__stat" data-v-be14da04${_scopeId}><span class="services-page__stat-value" data-v-be14da04${_scopeId}>${ssrInterpolate(featuredCount.value)}</span><span class="services-page__stat-label" data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Featured"))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="services-page__search" data-v-be14da04${_scopeId}><label class="sr-only" for="services-search" data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Search services..."))}</label><input id="services-search"${ssrRenderAttr("value", searchQuery.value)} type="search" class="form-control"${ssrRenderAttr("placeholder", trans("Search services..."))} data-v-be14da04${_scopeId}><button type="submit" class="btn btn-dark" data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Search"))}</button>`);
            if (hasActiveFilters.value) {
              _push2(ssrRenderComponent(unref(Link), {
                class: "btn btn-gray",
                href: _ctx.route("services.index")
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("Clear"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("Clear")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form>`);
            if (categories.value.length) {
              _push2(`<ul class="list-inline portfolio-sorting services-page__filters" data-v-be14da04${_scopeId}><li data-v-be14da04${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: categoryUrl(null),
                class: ["services-page__filter", { "is-current": !filters.value.category }],
                "active-class": "",
                "exact-active-class": "",
                "aria-current": !filters.value.category ? "page" : void 0
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("All Services"))} <span data-v-be14da04${_scopeId2}>(${ssrInterpolate(totalServicesCount.value)})</span>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("All Services")) + " ", 1),
                      createVNode("span", null, "(" + toDisplayString(totalServicesCount.value) + ")", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</li><!--[-->`);
              ssrRenderList(categories.value, (category) => {
                _push2(`<li data-v-be14da04${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: categoryUrl(category.slug),
                  class: ["services-page__filter", { "is-current": filters.value.category === category.slug }],
                  "active-class": "",
                  "exact-active-class": "",
                  "aria-current": filters.value.category === category.slug ? "page" : void 0
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(getCategoryName(category))} <span data-v-be14da04${_scopeId2}>(${ssrInterpolate(category.services_count || 0)})</span>`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(getCategoryName(category)) + " ", 1),
                        createVNode("span", null, "(" + toDisplayString(category.services_count || 0) + ")", 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            if (hasActiveFilters.value && services.value.total) {
              _push2(`<p class="services-page__results" data-v-be14da04${_scopeId}>${ssrInterpolate(trans("Showing"))} ${ssrInterpolate(services.value.total)} ${ssrInterpolate(trans("results"))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row services-page__grid" data-v-be14da04${_scopeId}><!--[-->`);
            ssrRenderList(services.value.data, (serviceItem, index) => {
              _push2(`<div class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp services-page__col"${ssrRenderAttr("data-wow-delay", `${(index % 3 + 1) * 100}ms`)} data-v-be14da04${_scopeId}>`);
              _push2(ssrRenderComponent(ServiceCardThree, {
                title: getServiceTitle(serviceItem),
                "short-desc": serviceItem.short_desc,
                description: getServiceDescription(serviceItem),
                highlights: getServiceHighlights(serviceItem),
                link: getServiceUrl(serviceItem),
                image: serviceItem.image_link,
                "is-rtl": locale.value === "ar",
                "reading-time": serviceItem.reading_time,
                "reading-time-label": trans("min read"),
                category: getCategoryName(serviceItem.category),
                featured: Boolean(serviceItem.featured),
                "icon-class": serviceIcons[index % serviceIcons.length]
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (!services.value.data.length) {
              _push2(`<div class="col-12" data-v-be14da04${_scopeId}><div class="services-page__empty" data-v-be14da04${_scopeId}><div class="services-page__empty-icon" aria-hidden="true" data-v-be14da04${_scopeId}><i class="ion-ios-lightbulb-outline" data-v-be14da04${_scopeId}></i></div><h3 data-v-be14da04${_scopeId}>${ssrInterpolate(trans("No services found"))}</h3><p data-v-be14da04${_scopeId}>${ssrInterpolate(trans("No services match your filters. Try another category or search term."))}</p>`);
              if (hasActiveFilters.value) {
                _push2(ssrRenderComponent(unref(Link), {
                  class: "btn btn-dark",
                  href: _ctx.route("services.index")
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(trans("View All Services"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(trans("View All Services")), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (services.value.last_page > 1) {
              _push2(`<div class="blog-page__pagination services-pagination" data-v-be14da04${_scopeId}><ul class="pg-pagination list-unstyled" data-v-be14da04${_scopeId}>`);
              if (services.value.prev_page_url) {
                _push2(`<li class="prev" data-v-be14da04${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: services.value.prev_page_url,
                  "aria-label": trans("Previous")
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="icon-left-arrow-1" data-v-be14da04${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", { class: "icon-left-arrow-1" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(services.value.links, (link, linkIndex) => {
                _push2(`<!--[-->`);
                if (link.url && linkIndex > 0 && linkIndex < services.value.links.length - 1) {
                  _push2(`<li class="${ssrRenderClass(["count", link.active ? "active" : ""])}" data-v-be14da04${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url
                  }, {
                    default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(link.label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(link.label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</li>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              if (services.value.next_page_url) {
                _push2(`<li class="next" data-v-be14da04${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: services.value.next_page_url,
                  "aria-label": trans("Next")
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`)}" data-v-be14da04${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", {
                          class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section>`);
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Our Services"),
                subtitle: trans("What we do"),
                background: asset_path.value + "theme/img/main/59.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "services"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h2", null, toDisplayString(trans("Scale Your Business Smarter with Next-Gen IT Solutions")), 1),
                    createVNode("p", { class: "services-page__subtitle" }, toDisplayString(trans("Discover our IT services designed to scale and modernize your business.")), 1)
                  ]),
                  totalServicesCount.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "services-page__stats"
                  }, [
                    createVNode("div", { class: "services-page__stat" }, [
                      createVNode("span", { class: "services-page__stat-value" }, toDisplayString(totalServicesCount.value), 1),
                      createVNode("span", { class: "services-page__stat-label" }, toDisplayString(trans("Services Available")), 1)
                    ]),
                    categories.value.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "services-page__stat"
                    }, [
                      createVNode("span", { class: "services-page__stat-value" }, toDisplayString(categories.value.length), 1),
                      createVNode("span", { class: "services-page__stat-label" }, toDisplayString(trans("Categories")), 1)
                    ])) : createCommentVNode("", true),
                    featuredCount.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "services-page__stat"
                    }, [
                      createVNode("span", { class: "services-page__stat-value" }, toDisplayString(featuredCount.value), 1),
                      createVNode("span", { class: "services-page__stat-label" }, toDisplayString(trans("Featured")), 1)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  createVNode("form", {
                    class: "services-page__search",
                    onSubmit: withModifiers(submitSearch, ["prevent"])
                  }, [
                    createVNode("label", {
                      class: "sr-only",
                      for: "services-search"
                    }, toDisplayString(trans("Search services...")), 1),
                    withDirectives(createVNode("input", {
                      id: "services-search",
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "search",
                      class: "form-control",
                      placeholder: trans("Search services...")
                    }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                      [vModelText, searchQuery.value]
                    ]),
                    createVNode("button", {
                      type: "submit",
                      class: "btn btn-dark"
                    }, toDisplayString(trans("Search")), 1),
                    hasActiveFilters.value ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      class: "btn btn-gray",
                      href: _ctx.route("services.index")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(trans("Clear")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ], 32),
                  categories.value.length ? (openBlock(), createBlock("ul", {
                    key: 1,
                    class: "list-inline portfolio-sorting services-page__filters"
                  }, [
                    createVNode("li", null, [
                      createVNode(unref(Link), {
                        href: categoryUrl(null),
                        class: ["services-page__filter", { "is-current": !filters.value.category }],
                        "active-class": "",
                        "exact-active-class": "",
                        "aria-current": !filters.value.category ? "page" : void 0
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(trans("All Services")) + " ", 1),
                          createVNode("span", null, "(" + toDisplayString(totalServicesCount.value) + ")", 1)
                        ]),
                        _: 1
                      }, 8, ["href", "class", "aria-current"])
                    ]),
                    (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                      return openBlock(), createBlock("li", {
                        key: category.id
                      }, [
                        createVNode(unref(Link), {
                          href: categoryUrl(category.slug),
                          class: ["services-page__filter", { "is-current": filters.value.category === category.slug }],
                          "active-class": "",
                          "exact-active-class": "",
                          "aria-current": filters.value.category === category.slug ? "page" : void 0
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getCategoryName(category)) + " ", 1),
                            createVNode("span", null, "(" + toDisplayString(category.services_count || 0) + ")", 1)
                          ]),
                          _: 2
                        }, 1032, ["href", "class", "aria-current"])
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  hasActiveFilters.value && services.value.total ? (openBlock(), createBlock("p", {
                    key: 2,
                    class: "services-page__results"
                  }, toDisplayString(trans("Showing")) + " " + toDisplayString(services.value.total) + " " + toDisplayString(trans("results")), 1)) : createCommentVNode("", true),
                  createVNode("div", { class: "row services-page__grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(services.value.data, (serviceItem, index) => {
                      return openBlock(), createBlock("div", {
                        key: serviceItem.id,
                        class: "col-xl-4 col-lg-4 col-md-6 wow fadeInUp services-page__col",
                        "data-wow-delay": `${(index % 3 + 1) * 100}ms`
                      }, [
                        createVNode(ServiceCardThree, {
                          title: getServiceTitle(serviceItem),
                          "short-desc": serviceItem.short_desc,
                          description: getServiceDescription(serviceItem),
                          highlights: getServiceHighlights(serviceItem),
                          link: getServiceUrl(serviceItem),
                          image: serviceItem.image_link,
                          "is-rtl": locale.value === "ar",
                          "reading-time": serviceItem.reading_time,
                          "reading-time-label": trans("min read"),
                          category: getCategoryName(serviceItem.category),
                          featured: Boolean(serviceItem.featured),
                          "icon-class": serviceIcons[index % serviceIcons.length]
                        }, null, 8, ["title", "short-desc", "description", "highlights", "link", "image", "is-rtl", "reading-time", "reading-time-label", "category", "featured", "icon-class"])
                      ], 8, ["data-wow-delay"]);
                    }), 128)),
                    !services.value.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-12"
                    }, [
                      createVNode("div", { class: "services-page__empty" }, [
                        createVNode("div", {
                          class: "services-page__empty-icon",
                          "aria-hidden": "true"
                        }, [
                          createVNode("i", { class: "ion-ios-lightbulb-outline" })
                        ]),
                        createVNode("h3", null, toDisplayString(trans("No services found")), 1),
                        createVNode("p", null, toDisplayString(trans("No services match your filters. Try another category or search term.")), 1),
                        hasActiveFilters.value ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          class: "btn btn-dark",
                          href: _ctx.route("services.index")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(trans("View All Services")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  services.value.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "blog-page__pagination services-pagination"
                  }, [
                    createVNode("ul", { class: "pg-pagination list-unstyled" }, [
                      services.value.prev_page_url ? (openBlock(), createBlock("li", {
                        key: 0,
                        class: "prev"
                      }, [
                        createVNode(unref(Link), {
                          href: services.value.prev_page_url,
                          "aria-label": trans("Previous")
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "icon-left-arrow-1" })
                          ]),
                          _: 1
                        }, 8, ["href", "aria-label"])
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(services.value.links, (link, linkIndex) => {
                        return openBlock(), createBlock(Fragment, { key: linkIndex }, [
                          link.url && linkIndex > 0 && linkIndex < services.value.links.length - 1 ? (openBlock(), createBlock("li", {
                            key: 0,
                            class: ["count", link.active ? "active" : ""]
                          }, [
                            createVNode(unref(Link), {
                              href: link.url
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ], 2)) : createCommentVNode("", true)
                        ], 64);
                      }), 128)),
                      services.value.next_page_url ? (openBlock(), createBlock("li", {
                        key: 1,
                        class: "next"
                      }, [
                        createVNode(unref(Link), {
                          href: services.value.next_page_url,
                          "aria-label": trans("Next")
                        }, {
                          default: withCtx(() => [
                            createVNode("span", {
                              class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow-1`
                            }, null, 2)
                          ]),
                          _: 1
                        }, 8, ["href", "aria-label"])
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Services/resources/assets/js/Pages/ServiceIndex.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const ServiceIndex = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-be14da04"]]);
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ServiceIndex
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1 = {
  components: {
    AppLayout: _sfc_main$Q,
    CtaTwo: _sfc_main$O
  }
};
const _sfc_main$n = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "ServiceShow",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const service = computed(() => page.props.service || {});
    const relatedServices = computed(() => page.props.relatedServices || []);
    const categories = computed(() => page.props.categories || []);
    const testimonials = computed(() => page.props.testimonials || []);
    const totalServicesCount = computed(() => page.props.totalServicesCount || 0);
    const previousService = computed(() => page.props.previousService);
    const nextService = computed(() => page.props.nextService);
    const meta = computed(() => page.props.meta || {});
    const contactModal = ref(null);
    const imageUsable = ref(true);
    const metaTitle = computed(() => {
      return meta.value.title || `${getServiceTitle(service.value)} | ${seo.value.website_name || ""}`.trim();
    });
    const metaDescription = computed(() => {
      return meta.value.description || getServiceDescription(service.value) || seo.value.website_desc || "";
    });
    const metaKeywords = computed(() => {
      var _a;
      return meta.value.keywords || ((_a = service.value) == null ? void 0 : _a.keywords) || seo.value.website_keywords || "";
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = service.value) == null ? void 0 : _e.image_link) || ((_f = settings.value) == null ? void 0 : _f.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "index, follow");
    const featuredTestimonial = computed(() => testimonials.value[0] || null);
    const phoneNumber = computed(() => settings.value.website_phone || settings.value.phone || "");
    const hasImage = computed(() => {
      const src = String(service.value.image_link || "");
      return src !== "" && !src.includes("blank.png");
    });
    const translateField = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      if (typeof value === "object" && value !== null) {
        return value[locale.value] || value["en"] || value[Object.keys(value)[0]] || "";
      }
      return "";
    };
    const getServiceUrl = (serviceItem) => {
      if (!serviceItem || !serviceItem.slug) {
        return "#";
      }
      try {
        return route("services.show", serviceItem.slug);
      } catch (e2) {
        return "#";
      }
    };
    const getServiceTitle = (serviceItem) => translateField(serviceItem == null ? void 0 : serviceItem.title);
    const getServiceDescription = (serviceItem) => translateField(serviceItem == null ? void 0 : serviceItem.description);
    const getCategoryName = (category) => translateField(category == null ? void 0 : category.title);
    const leadText = computed(() => {
      const raw = getServiceDescription(service.value);
      const text = String(raw).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (!text) {
        return "";
      }
      const content = String(service.value.content || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (content && content.includes(text)) {
        return "";
      }
      return text;
    });
    const normalizeKeywords = (rawKeywords) => {
      if (!rawKeywords) {
        return [];
      }
      let parsed = rawKeywords;
      if (typeof rawKeywords === "string") {
        const trimmed = rawKeywords.trim();
        if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
          try {
            parsed = JSON.parse(trimmed);
          } catch (e2) {
            try {
              parsed = JSON.parse(trimmed.replace(/'/g, '"'));
            } catch (err) {
              parsed = rawKeywords;
            }
          }
        }
      }
      if (Array.isArray(parsed)) {
        return parsed.map((item) => {
          if (typeof item === "string") {
            return item;
          }
          if (item && typeof item === "object") {
            if (item.value) {
              return translateField(item.value);
            }
            return translateField(item);
          }
          return "";
        }).map((item) => String(item).trim()).filter(Boolean);
      }
      if (typeof parsed === "object") {
        const value = translateField(parsed);
        return value ? [value] : [];
      }
      return parsed.toString().split(/[,;\n]+/).map((item) => item.trim()).filter(Boolean);
    };
    const getServiceHighlights = (serviceItem) => normalizeKeywords(translateField(serviceItem == null ? void 0 : serviceItem.keywords) || (serviceItem == null ? void 0 : serviceItem.keywords));
    const keywordTags = computed(() => getServiceHighlights(service.value).slice(0, 8));
    const requestSubject = computed(() => `${trans("Request this Service")}: ${getServiceTitle(service.value)}`.trim());
    const requestMessage = computed(() => {
      const intro = trans("I would like to learn more about this service.");
      const name = getServiceTitle(service.value) ? `${trans("Service")}: ${getServiceTitle(service.value)}` : "";
      return [intro, name].filter(Boolean).join("\n\n");
    });
    const requestModalDescription = computed(() => trans("Tell us about your needs and we will get back to you shortly."));
    const openRequestModal = () => {
      var _a;
      (_a = contactModal.value) == null ? void 0 : _a.show();
      if (typeof window !== "undefined" && window.jQuery) {
        window.jQuery("#serviceRequestModal").modal("show");
      }
    };
    const onHeroLoad = (event) => {
      const img = event == null ? void 0 : event.target;
      if (!img) {
        return;
      }
      imageUsable.value = img.naturalWidth >= 240 && img.naturalHeight >= 80;
    };
    const getShareUrl = (platform) => {
      if (typeof window === "undefined") {
        return "#";
      }
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(getServiceTitle(service.value) || "");
      switch (platform) {
        case "twitter":
          return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        case "facebook":
          return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "linkedin":
          return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        default:
          return "#";
      }
    };
    onMounted(() => {
      nextTick(() => {
        if (typeof WOW !== "undefined") {
          new WOW().init();
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-65698540${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)} data-v-65698540${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)} data-v-65698540${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)} data-v-65698540${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)} data-v-65698540${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)} data-v-65698540${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)} data-v-65698540${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)} data-v-65698540${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)} data-v-65698540${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="article" data-v-65698540${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-65698540${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)} data-v-65698540${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)} data-v-65698540${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)} data-v-65698540${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "article"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: getServiceTitle(service.value),
              subtitle: trans("Our Services"),
              "parent-href": _ctx.route("services.index"),
              background: service.value.image_link || asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="section-small" id="service-details" data-v-65698540${_scopeId}><div class="container" data-v-65698540${_scopeId}><div class="row" data-v-65698540${_scopeId}><div class="col-lg-8" data-v-65698540${_scopeId}><article class="service-detail" data-v-65698540${_scopeId}>`);
            if (getCategoryName(service.value.category)) {
              _push2(`<p class="service-detail__kicker" data-v-65698540${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("services.index", { category: service.value.category.slug })
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(getCategoryName(service.value.category))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(getCategoryName(service.value.category)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h1 class="service-detail__title" data-v-65698540${_scopeId}>${ssrInterpolate(getServiceTitle(service.value))}</h1><ul class="service-detail__meta list-unstyled" data-v-65698540${_scopeId}>`);
            if (service.value.reading_time) {
              _push2(`<li data-v-65698540${_scopeId}><i class="far fa-clock" aria-hidden="true" data-v-65698540${_scopeId}></i> ${ssrInterpolate(service.value.reading_time)} ${ssrInterpolate(trans("min read"))}</li>`);
            } else {
              _push2(`<!---->`);
            }
            if (service.value.created_at) {
              _push2(`<li data-v-65698540${_scopeId}><i class="far fa-calendar" aria-hidden="true" data-v-65698540${_scopeId}></i> ${ssrInterpolate(service.value.created_at)}</li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul>`);
            if (leadText.value) {
              _push2(`<p class="service-detail__lead" data-v-65698540${_scopeId}>${ssrInterpolate(leadText.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (hasImage.value && imageUsable.value) {
              _push2(`<div class="service-detail__image" data-v-65698540${_scopeId}><img${ssrRenderAttr("src", service.value.image_link)}${ssrRenderAttr("alt", getServiceTitle(service.value))} loading="lazy" decoding="async" data-v-65698540${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="service-detail__content" data-v-65698540${_scopeId}>${service.value.content ?? ""}</div>`);
            if (keywordTags.value.length) {
              _push2(`<ul class="service-detail__tags list-unstyled" data-v-65698540${_scopeId}><!--[-->`);
              ssrRenderList(keywordTags.value, (tag) => {
                _push2(`<li data-v-65698540${_scopeId}>${ssrInterpolate(tag)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="service-detail__share" data-v-65698540${_scopeId}><span data-v-65698540${_scopeId}>${ssrInterpolate(trans("Share"))}</span><a${ssrRenderAttr("href", getShareUrl("facebook"))} target="_blank" rel="noopener" aria-label="Facebook" data-v-65698540${_scopeId}><i class="fab fa-facebook-f fa-fw fa-lg" data-v-65698540${_scopeId}></i></a><a${ssrRenderAttr("href", getShareUrl("twitter"))} target="_blank" rel="noopener" aria-label="Twitter" data-v-65698540${_scopeId}><i class="fab fa-twitter fa-fw fa-lg" data-v-65698540${_scopeId}></i></a><a${ssrRenderAttr("href", getShareUrl("linkedin"))} target="_blank" rel="noopener" aria-label="LinkedIn" data-v-65698540${_scopeId}><i class="fab fa-linkedin-in fa-fw fa-lg" data-v-65698540${_scopeId}></i></a></div>`);
            if (previousService.value || nextService.value) {
              _push2(`<nav class="service-detail__nav" aria-label="Service pagination" data-v-65698540${_scopeId}>`);
              if (previousService.value) {
                _push2(ssrRenderComponent(unref(Link), {
                  class: "service-detail__nav-link",
                  href: getServiceUrl(previousService.value)
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<small data-v-65698540${_scopeId2}>${ssrInterpolate(trans("Previous Service"))}</small><strong data-v-65698540${_scopeId2}>${ssrInterpolate(getServiceTitle(previousService.value))}</strong>`);
                    } else {
                      return [
                        createVNode("small", null, toDisplayString(trans("Previous Service")), 1),
                        createVNode("strong", null, toDisplayString(getServiceTitle(previousService.value)), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<span data-v-65698540${_scopeId}></span>`);
              }
              if (nextService.value) {
                _push2(ssrRenderComponent(unref(Link), {
                  class: "service-detail__nav-link service-detail__nav-link--next",
                  href: getServiceUrl(nextService.value)
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<small data-v-65698540${_scopeId2}>${ssrInterpolate(trans("Next Service"))}</small><strong data-v-65698540${_scopeId2}>${ssrInterpolate(getServiceTitle(nextService.value))}</strong>`);
                    } else {
                      return [
                        createVNode("small", null, toDisplayString(trans("Next Service")), 1),
                        createVNode("strong", null, toDisplayString(getServiceTitle(nextService.value)), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</nav>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article></div><aside class="col-lg-4" data-v-65698540${_scopeId}><div class="service-sidebar" data-v-65698540${_scopeId}><div class="service-sidebar__card" data-v-65698540${_scopeId}><h3 data-v-65698540${_scopeId}>${ssrInterpolate(trans("Need Help?"))}</h3><p data-v-65698540${_scopeId}>${ssrInterpolate(trans("Tell us about your needs and we will get back to you shortly."))}</p><button type="button" class="btn btn-dark btn-block" data-v-65698540${_scopeId}>${ssrInterpolate(trans("Request this Service"))}</button>`);
            if (phoneNumber.value) {
              _push2(`<a class="service-sidebar__phone" dir="ltr"${ssrRenderAttr("href", `tel:${phoneNumber.value}`)} data-v-65698540${_scopeId}>${ssrInterpolate(phoneNumber.value)}</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (categories.value.length) {
              _push2(`<div class="service-sidebar__card" data-v-65698540${_scopeId}><h3 data-v-65698540${_scopeId}>${ssrInterpolate(trans("Service Categories"))}</h3><ul class="service-sidebar__list list-unstyled" data-v-65698540${_scopeId}><li data-v-65698540${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("services.index")
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("All Services"))} <span data-v-65698540${_scopeId2}>${ssrInterpolate(totalServicesCount.value)}</span>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("All Services")) + " ", 1),
                      createVNode("span", null, toDisplayString(totalServicesCount.value), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</li><!--[-->`);
              ssrRenderList(categories.value, (category) => {
                var _a, _b;
                _push2(`<li data-v-65698540${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("services.index", { category: category.slug }),
                  class: { "is-active": ((_b = (_a = service.value) == null ? void 0 : _a.category) == null ? void 0 : _b.slug) === category.slug }
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(getCategoryName(category))} <span data-v-65698540${_scopeId2}>${ssrInterpolate(category.services_count || 0)}</span>`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(getCategoryName(category)) + " ", 1),
                        createVNode("span", null, toDisplayString(category.services_count || 0), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></aside></div></div></section>`);
            if (relatedServices.value.length) {
              _push2(`<section class="section-small bg-white" id="related-services" data-v-65698540${_scopeId}><div class="container" data-v-65698540${_scopeId}><div class="text-center" data-v-65698540${_scopeId}><h2 data-v-65698540${_scopeId}>${ssrInterpolate(trans("Explore More"))} ${ssrInterpolate(trans("Services"))}</h2><p class="services-page__subtitle" data-v-65698540${_scopeId}>${ssrInterpolate(trans("Related Services"))}</p></div><div class="row services-page__grid" data-v-65698540${_scopeId}><!--[-->`);
              ssrRenderList(relatedServices.value, (relatedService, index) => {
                _push2(`<div class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp services-page__col"${ssrRenderAttr("data-wow-delay", `${(index + 1) * 100}ms`)} data-v-65698540${_scopeId}>`);
                _push2(ssrRenderComponent(ServiceCardThree, {
                  title: getServiceTitle(relatedService),
                  "short-desc": relatedService.short_desc,
                  description: getServiceDescription(relatedService),
                  highlights: getServiceHighlights(relatedService),
                  link: getServiceUrl(relatedService),
                  image: relatedService.image_link,
                  "is-rtl": locale.value === "ar",
                  "reading-time": relatedService.reading_time,
                  "reading-time-label": trans("min read"),
                  category: getCategoryName(relatedService.category),
                  featured: Boolean(relatedService.featured)
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            if (featuredTestimonial.value) {
              _push2(`<section class="section-small" id="testimonials" data-v-65698540${_scopeId}><div class="container" data-v-65698540${_scopeId}><div class="row" data-v-65698540${_scopeId}><div class="col-md-3" data-v-65698540${_scopeId}><h2 data-v-65698540${_scopeId}>${ssrInterpolate(trans("Testimonials"))}</h2></div><div class="col-md-3" data-v-65698540${_scopeId}><img class="img-circle center-block img-responsive"${ssrRenderAttr("src", featuredTestimonial.value.avatar_link || asset_path.value + "theme/img/testimonials/1.jpg")}${ssrRenderAttr("alt", translateField(featuredTestimonial.value.name))} data-v-65698540${_scopeId}></div><div class="col-md-6" data-v-65698540${_scopeId}><h2 class="dark-gray" data-v-65698540${_scopeId}>${ssrInterpolate(translateField(featuredTestimonial.value.quote))}</h2><div class="classic" data-v-65698540${_scopeId}>${ssrInterpolate(translateField(featuredTestimonial.value.name))}</div>`);
              if (translateField(featuredTestimonial.value.position)) {
                _push2(`<small data-v-65698540${_scopeId}> — ${ssrInterpolate(translateField(featuredTestimonial.value.position))}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(ContactRequestModal, {
              ref_key: "contactModal",
              ref: contactModal,
              "modal-id": "serviceRequestModal",
              title: trans("Request this Service"),
              description: requestModalDescription.value,
              "default-subject": requestSubject.value,
              "default-message": requestMessage.value,
              "submit-label": trans("Send")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageHeader, {
                title: getServiceTitle(service.value),
                subtitle: trans("Our Services"),
                "parent-href": _ctx.route("services.index"),
                background: service.value.image_link || asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "subtitle", "parent-href", "background"]),
              createVNode("section", {
                class: "section-small",
                id: "service-details"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-8" }, [
                      createVNode("article", { class: "service-detail" }, [
                        getCategoryName(service.value.category) ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "service-detail__kicker"
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("services.index", { category: service.value.category.slug })
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getCategoryName(service.value.category)), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true),
                        createVNode("h1", { class: "service-detail__title" }, toDisplayString(getServiceTitle(service.value)), 1),
                        createVNode("ul", { class: "service-detail__meta list-unstyled" }, [
                          service.value.reading_time ? (openBlock(), createBlock("li", { key: 0 }, [
                            createVNode("i", {
                              class: "far fa-clock",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" " + toDisplayString(service.value.reading_time) + " " + toDisplayString(trans("min read")), 1)
                          ])) : createCommentVNode("", true),
                          service.value.created_at ? (openBlock(), createBlock("li", { key: 1 }, [
                            createVNode("i", {
                              class: "far fa-calendar",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" " + toDisplayString(service.value.created_at), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        leadText.value ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "service-detail__lead"
                        }, toDisplayString(leadText.value), 1)) : createCommentVNode("", true),
                        hasImage.value && imageUsable.value ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "service-detail__image"
                        }, [
                          createVNode("img", {
                            src: service.value.image_link,
                            alt: getServiceTitle(service.value),
                            loading: "lazy",
                            decoding: "async",
                            onLoad: onHeroLoad
                          }, null, 40, ["src", "alt"])
                        ])) : createCommentVNode("", true),
                        createVNode("div", {
                          class: "service-detail__content",
                          innerHTML: service.value.content
                        }, null, 8, ["innerHTML"]),
                        keywordTags.value.length ? (openBlock(), createBlock("ul", {
                          key: 3,
                          class: "service-detail__tags list-unstyled"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(keywordTags.value, (tag) => {
                            return openBlock(), createBlock("li", { key: tag }, toDisplayString(tag), 1);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "service-detail__share" }, [
                          createVNode("span", null, toDisplayString(trans("Share")), 1),
                          createVNode("a", {
                            href: getShareUrl("facebook"),
                            target: "_blank",
                            rel: "noopener",
                            "aria-label": "Facebook"
                          }, [
                            createVNode("i", { class: "fab fa-facebook-f fa-fw fa-lg" })
                          ], 8, ["href"]),
                          createVNode("a", {
                            href: getShareUrl("twitter"),
                            target: "_blank",
                            rel: "noopener",
                            "aria-label": "Twitter"
                          }, [
                            createVNode("i", { class: "fab fa-twitter fa-fw fa-lg" })
                          ], 8, ["href"]),
                          createVNode("a", {
                            href: getShareUrl("linkedin"),
                            target: "_blank",
                            rel: "noopener",
                            "aria-label": "LinkedIn"
                          }, [
                            createVNode("i", { class: "fab fa-linkedin-in fa-fw fa-lg" })
                          ], 8, ["href"])
                        ]),
                        previousService.value || nextService.value ? (openBlock(), createBlock("nav", {
                          key: 4,
                          class: "service-detail__nav",
                          "aria-label": "Service pagination"
                        }, [
                          previousService.value ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            class: "service-detail__nav-link",
                            href: getServiceUrl(previousService.value)
                          }, {
                            default: withCtx(() => [
                              createVNode("small", null, toDisplayString(trans("Previous Service")), 1),
                              createVNode("strong", null, toDisplayString(getServiceTitle(previousService.value)), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])) : (openBlock(), createBlock("span", { key: 1 })),
                          nextService.value ? (openBlock(), createBlock(unref(Link), {
                            key: 2,
                            class: "service-detail__nav-link service-detail__nav-link--next",
                            href: getServiceUrl(nextService.value)
                          }, {
                            default: withCtx(() => [
                              createVNode("small", null, toDisplayString(trans("Next Service")), 1),
                              createVNode("strong", null, toDisplayString(getServiceTitle(nextService.value)), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("aside", { class: "col-lg-4" }, [
                      createVNode("div", { class: "service-sidebar" }, [
                        createVNode("div", { class: "service-sidebar__card" }, [
                          createVNode("h3", null, toDisplayString(trans("Need Help?")), 1),
                          createVNode("p", null, toDisplayString(trans("Tell us about your needs and we will get back to you shortly.")), 1),
                          createVNode("button", {
                            type: "button",
                            class: "btn btn-dark btn-block",
                            onClick: openRequestModal
                          }, toDisplayString(trans("Request this Service")), 1),
                          phoneNumber.value ? (openBlock(), createBlock("a", {
                            key: 0,
                            class: "service-sidebar__phone",
                            dir: "ltr",
                            href: `tel:${phoneNumber.value}`
                          }, toDisplayString(phoneNumber.value), 9, ["href"])) : createCommentVNode("", true)
                        ]),
                        categories.value.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "service-sidebar__card"
                        }, [
                          createVNode("h3", null, toDisplayString(trans("Service Categories")), 1),
                          createVNode("ul", { class: "service-sidebar__list list-unstyled" }, [
                            createVNode("li", null, [
                              createVNode(unref(Link), {
                                href: _ctx.route("services.index")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(trans("All Services")) + " ", 1),
                                  createVNode("span", null, toDisplayString(totalServicesCount.value), 1)
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                              var _a, _b;
                              return openBlock(), createBlock("li", {
                                key: category.id
                              }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("services.index", { category: category.slug }),
                                  class: { "is-active": ((_b = (_a = service.value) == null ? void 0 : _a.category) == null ? void 0 : _b.slug) === category.slug }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(getCategoryName(category)) + " ", 1),
                                    createVNode("span", null, toDisplayString(category.services_count || 0), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href", "class"])
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              relatedServices.value.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "section-small bg-white",
                id: "related-services"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h2", null, toDisplayString(trans("Explore More")) + " " + toDisplayString(trans("Services")), 1),
                    createVNode("p", { class: "services-page__subtitle" }, toDisplayString(trans("Related Services")), 1)
                  ]),
                  createVNode("div", { class: "row services-page__grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(relatedServices.value, (relatedService, index) => {
                      return openBlock(), createBlock("div", {
                        key: relatedService.id,
                        class: "col-xl-4 col-lg-4 col-md-6 wow fadeInUp services-page__col",
                        "data-wow-delay": `${(index + 1) * 100}ms`
                      }, [
                        createVNode(ServiceCardThree, {
                          title: getServiceTitle(relatedService),
                          "short-desc": relatedService.short_desc,
                          description: getServiceDescription(relatedService),
                          highlights: getServiceHighlights(relatedService),
                          link: getServiceUrl(relatedService),
                          image: relatedService.image_link,
                          "is-rtl": locale.value === "ar",
                          "reading-time": relatedService.reading_time,
                          "reading-time-label": trans("min read"),
                          category: getCategoryName(relatedService.category),
                          featured: Boolean(relatedService.featured)
                        }, null, 8, ["title", "short-desc", "description", "highlights", "link", "image", "is-rtl", "reading-time", "reading-time-label", "category", "featured"])
                      ], 8, ["data-wow-delay"]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              featuredTestimonial.value ? (openBlock(), createBlock("section", {
                key: 1,
                class: "section-small",
                id: "testimonials"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-md-3" }, [
                      createVNode("h2", null, toDisplayString(trans("Testimonials")), 1)
                    ]),
                    createVNode("div", { class: "col-md-3" }, [
                      createVNode("img", {
                        class: "img-circle center-block img-responsive",
                        src: featuredTestimonial.value.avatar_link || asset_path.value + "theme/img/testimonials/1.jpg",
                        alt: translateField(featuredTestimonial.value.name)
                      }, null, 8, ["src", "alt"])
                    ]),
                    createVNode("div", { class: "col-md-6" }, [
                      createVNode("h2", { class: "dark-gray" }, toDisplayString(translateField(featuredTestimonial.value.quote)), 1),
                      createVNode("div", { class: "classic" }, toDisplayString(translateField(featuredTestimonial.value.name)), 1),
                      translateField(featuredTestimonial.value.position) ? (openBlock(), createBlock("small", { key: 0 }, " — " + toDisplayString(translateField(featuredTestimonial.value.position)), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode(ContactRequestModal, {
                ref_key: "contactModal",
                ref: contactModal,
                "modal-id": "serviceRequestModal",
                title: trans("Request this Service"),
                description: requestModalDescription.value,
                "default-subject": requestSubject.value,
                "default-message": requestMessage.value,
                "submit-label": trans("Send")
              }, null, 8, ["title", "description", "default-subject", "default-message", "submit-label"]),
              createVNode(_sfc_main$O)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Services/resources/assets/js/Pages/ServiceShow.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const ServiceShow = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-65698540"]]);
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ServiceShow
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = {
  __name: "PortalSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [String, Number], default: "" },
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: "" },
    id: { type: String, default: "" },
    hasError: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const root = ref(null);
    const isOpen = ref(false);
    const hasValue = computed(() => props.modelValue !== "" && props.modelValue != null);
    const selectedLabel = computed(() => {
      const match = props.options.find((option) => String(option.value) === String(props.modelValue));
      return (match == null ? void 0 : match.label) ?? props.placeholder;
    });
    const isSelected = (value) => String(value) === String(props.modelValue);
    const close = () => {
      isOpen.value = false;
    };
    const handleClickOutside = (event) => {
      var _a;
      if (!((_a = root.value) == null ? void 0 : _a.contains(event.target))) {
        close();
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "root",
        ref: root,
        class: ["portal-select", {
          "portal-select--open": isOpen.value,
          "portal-select--error": __props.hasError,
          "portal-select--disabled": __props.disabled
        }]
      }, _attrs))} data-v-2ede9016><button${ssrRenderAttr("id", __props.id)} type="button" class="${ssrRenderClass([{ "portal-select__trigger--error": __props.hasError }, "portal-select__trigger"])}"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("aria-expanded", isOpen.value)} aria-haspopup="listbox" data-v-2ede9016><span class="${ssrRenderClass([{ "portal-select__value--placeholder": !hasValue.value }, "portal-select__value"])}" data-v-2ede9016>${ssrInterpolate(selectedLabel.value)}</span><i class="${ssrRenderClass([{ "portal-select__icon--open": isOpen.value }, "fas fa-chevron-down portal-select__icon"])}" data-v-2ede9016></i></button>`);
      if (isOpen.value) {
        _push(`<ul class="portal-select__menu" role="listbox"${ssrRenderAttr("aria-labelledby", __props.id)} data-v-2ede9016><!--[-->`);
        ssrRenderList(__props.options, (option) => {
          _push(`<li role="option" class="${ssrRenderClass([{ "portal-select__option--selected": isSelected(option.value) }, "portal-select__option"])}"${ssrRenderAttr("aria-selected", isSelected(option.value))} data-v-2ede9016>${ssrInterpolate(option.label)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portal/PortalSelect.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const PortalSelect = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-2ede9016"]]);
const _sfc_main$l = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: { type: Array, default: () => [] },
    priorities: { type: Array, default: () => [] },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    usePage();
    const { t: t3, ticketPriorityLabel } = usePortalTranslations();
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || t3("tickets.create_title");
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.tickets_description");
    });
    const categoryOptions = computed(() => props.categories.map((category) => ({
      value: category.id,
      label: category.name
    })));
    const priorityOptions = computed(() => props.priorities.map((priority) => ({
      value: priority,
      label: ticketPriorityLabel(priority)
    })));
    const form = useForm({
      subject: "",
      description: "",
      ticket_category_id: "",
      priority: "medium",
      attachment: null
    });
    const onFileChange = (event) => {
      form.attachment = event.target.files[0] || null;
    };
    const submit = () => {
      form.post(route("portal.tickets.store"), {
        forceFormData: true,
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: unref(t3)("tickets.create_title"),
        subtitle: unref(t3)("tickets.create_subtitle"),
        active: "tickets",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("tickets.title"), href: _ctx.route("portal.tickets.index") },
          { label: unref(t3)("tickets.create_title") }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="portal-panel portal-panel--allow-overflow"${_scopeId}><div class="portal-panel__body"${_scopeId}><form class="portal-ticket-form"${_scopeId}><div class="portal-form-group"${_scopeId}><label for="subject"${_scopeId}>${ssrInterpolate(unref(t3)("fields.subject"))} *</label><input id="subject"${ssrRenderAttr("value", unref(form).subject)} type="text" class="${ssrRenderClass([{ "portal-input--error": unref(form).errors.subject }, "portal-input"])}" required${_scopeId}>`);
            if (unref(form).errors.subject) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(form).errors.subject)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-row"${_scopeId}><div class="portal-form-group"${_scopeId}><label for="ticket_category_id"${_scopeId}>${ssrInterpolate(unref(t3)("fields.category"))} *</label>`);
            _push2(ssrRenderComponent(PortalSelect, {
              id: "ticket_category_id",
              modelValue: unref(form).ticket_category_id,
              "onUpdate:modelValue": ($event) => unref(form).ticket_category_id = $event,
              options: categoryOptions.value,
              placeholder: unref(t3)("tickets.select_category"),
              "has-error": !!unref(form).errors.ticket_category_id
            }, null, _parent2, _scopeId));
            if (unref(form).errors.ticket_category_id) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(form).errors.ticket_category_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-group"${_scopeId}><label for="priority"${_scopeId}>${ssrInterpolate(unref(t3)("fields.priority"))} *</label>`);
            _push2(ssrRenderComponent(PortalSelect, {
              id: "priority",
              modelValue: unref(form).priority,
              "onUpdate:modelValue": ($event) => unref(form).priority = $event,
              options: priorityOptions.value,
              placeholder: unref(t3)("tickets.select_priority"),
              "has-error": !!unref(form).errors.priority
            }, null, _parent2, _scopeId));
            if (unref(form).errors.priority) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(form).errors.priority)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="portal-form-group"${_scopeId}><label for="description"${_scopeId}>${ssrInterpolate(unref(t3)("fields.description"))} *</label><textarea id="description" rows="6" class="${ssrRenderClass([{ "portal-input--error": unref(form).errors.description }, "portal-input"])}" required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-group"${_scopeId}><label for="attachment"${_scopeId}>${ssrInterpolate(unref(t3)("projects.attachments"))}</label><input id="attachment" type="file" class="${ssrRenderClass([{ "portal-input--error": unref(form).errors.attachment }, "portal-input"])}"${_scopeId}><p class="portal-form-hint"${_scopeId}>${ssrInterpolate(unref(t3)("tickets.attachment_hint"))}</p>`);
            if (unref(form).errors.attachment) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(form).errors.attachment)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-ticket-form__actions"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.tickets.index"),
              class: "portal-panel__action"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t3)("tickets.back_to_tickets"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t3)("tickets.back_to_tickets")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit" class="thm-btn"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("tickets.submit_ticket"))}</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "portal-panel portal-panel--allow-overflow" }, [
                createVNode("div", { class: "portal-panel__body" }, [
                  createVNode("form", {
                    class: "portal-ticket-form",
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", { class: "portal-form-group" }, [
                      createVNode("label", { for: "subject" }, toDisplayString(unref(t3)("fields.subject")) + " *", 1),
                      withDirectives(createVNode("input", {
                        id: "subject",
                        "onUpdate:modelValue": ($event) => unref(form).subject = $event,
                        type: "text",
                        class: ["portal-input", { "portal-input--error": unref(form).errors.subject }],
                        required: ""
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).subject]
                      ]),
                      unref(form).errors.subject ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "portal-form-error"
                      }, toDisplayString(unref(form).errors.subject), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "portal-form-row" }, [
                      createVNode("div", { class: "portal-form-group" }, [
                        createVNode("label", { for: "ticket_category_id" }, toDisplayString(unref(t3)("fields.category")) + " *", 1),
                        createVNode(PortalSelect, {
                          id: "ticket_category_id",
                          modelValue: unref(form).ticket_category_id,
                          "onUpdate:modelValue": ($event) => unref(form).ticket_category_id = $event,
                          options: categoryOptions.value,
                          placeholder: unref(t3)("tickets.select_category"),
                          "has-error": !!unref(form).errors.ticket_category_id
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder", "has-error"]),
                        unref(form).errors.ticket_category_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "portal-form-error"
                        }, toDisplayString(unref(form).errors.ticket_category_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "portal-form-group" }, [
                        createVNode("label", { for: "priority" }, toDisplayString(unref(t3)("fields.priority")) + " *", 1),
                        createVNode(PortalSelect, {
                          id: "priority",
                          modelValue: unref(form).priority,
                          "onUpdate:modelValue": ($event) => unref(form).priority = $event,
                          options: priorityOptions.value,
                          placeholder: unref(t3)("tickets.select_priority"),
                          "has-error": !!unref(form).errors.priority
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder", "has-error"]),
                        unref(form).errors.priority ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "portal-form-error"
                        }, toDisplayString(unref(form).errors.priority), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "portal-form-group" }, [
                      createVNode("label", { for: "description" }, toDisplayString(unref(t3)("fields.description")) + " *", 1),
                      withDirectives(createVNode("textarea", {
                        id: "description",
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "6",
                        class: ["portal-input", { "portal-input--error": unref(form).errors.description }],
                        required: ""
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      unref(form).errors.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "portal-form-error"
                      }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "portal-form-group" }, [
                      createVNode("label", { for: "attachment" }, toDisplayString(unref(t3)("projects.attachments")), 1),
                      createVNode("input", {
                        id: "attachment",
                        type: "file",
                        class: ["portal-input", { "portal-input--error": unref(form).errors.attachment }],
                        onChange: onFileChange
                      }, null, 34),
                      createVNode("p", { class: "portal-form-hint" }, toDisplayString(unref(t3)("tickets.attachment_hint")), 1),
                      unref(form).errors.attachment ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "portal-form-error"
                      }, toDisplayString(unref(form).errors.attachment), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "portal-ticket-form__actions" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("portal.tickets.index"),
                        class: "portal-panel__action"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t3)("tickets.back_to_tickets")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        class: "thm-btn",
                        disabled: unref(form).processing
                      }, toDisplayString(unref(t3)("tickets.submit_ticket")), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Support/resources/assets/js/Pages/Portal/Tickets/Create.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tickets: { type: Object, required: true },
    filters: { type: Object, default: () => ({}) },
    statuses: { type: Array, default: () => [] },
    priorities: { type: Array, default: () => [] },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3, ticketStatusLabel, ticketPriorityLabel } = usePortalTranslations();
    const locale = computed(() => page.props.locale);
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || t3("pages.tickets_title");
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.tickets_description");
    });
    const filterForm = reactive({
      status: props.filters.status || "",
      priority: props.filters.priority || "",
      sort: props.filters.sort || "newest"
    });
    const statusOptions = computed(() => props.statuses.map((status) => ({
      value: status,
      label: ticketStatusLabel(status)
    })));
    const priorityOptions = computed(() => props.priorities.map((priority) => ({
      value: priority,
      label: ticketPriorityLabel(priority)
    })));
    const sortOptions = computed(() => [
      { value: "newest", label: t3("tickets.sort_newest") },
      { value: "oldest", label: t3("tickets.sort_oldest") }
    ]);
    const applyFilters = () => {
      router.get(route("portal.tickets.index"), {
        status: filterForm.status || void 0,
        priority: filterForm.priority || void 0,
        sort: filterForm.sort || void 0
      }, {
        preserveState: true,
        replace: true
      });
    };
    const clearFilters = () => {
      filterForm.status = "";
      filterForm.priority = "";
      filterForm.sort = "newest";
      router.get(route("portal.tickets.index"));
    };
    const statusBadgeClass = (status) => {
      if (status === "closed" || status === "resolved") return "portal-badge--success";
      if (status === "in_progress") return "portal-badge--info";
      return "portal-badge--neutral";
    };
    const formatDate = (value) => {
      if (!value) return "—";
      return new Date(value).toLocaleString(locale.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: unref(t3)("tickets.title"),
        subtitle: unref(t3)("tickets.subtitle"),
        active: "tickets",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("tickets.title") }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="portal-panel portal-panel--allow-overflow mb-4"${_scopeId}><div class="portal-panel__body"${_scopeId}><div class="portal-ticket-toolbar"${_scopeId}><form class="portal-ticket-filters"${_scopeId}><div class="portal-ticket-filters__group"${_scopeId}><label${_scopeId}>${ssrInterpolate(unref(t3)("tickets.filter_status"))}</label>`);
            _push2(ssrRenderComponent(PortalSelect, {
              modelValue: filterForm.status,
              "onUpdate:modelValue": ($event) => filterForm.status = $event,
              options: statusOptions.value,
              placeholder: unref(t3)("tickets.all_statuses")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="portal-ticket-filters__group"${_scopeId}><label${_scopeId}>${ssrInterpolate(unref(t3)("tickets.filter_priority"))}</label>`);
            _push2(ssrRenderComponent(PortalSelect, {
              modelValue: filterForm.priority,
              "onUpdate:modelValue": ($event) => filterForm.priority = $event,
              options: priorityOptions.value,
              placeholder: unref(t3)("tickets.all_priorities")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="portal-ticket-filters__group"${_scopeId}><label${_scopeId}>${ssrInterpolate(unref(t3)("tickets.sort_newest"))}</label>`);
            _push2(ssrRenderComponent(PortalSelect, {
              modelValue: filterForm.sort,
              "onUpdate:modelValue": ($event) => filterForm.sort = $event,
              options: sortOptions.value
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="portal-ticket-filters__actions"${_scopeId}><button type="submit" class="thm-btn"${_scopeId}>${ssrInterpolate(unref(t3)("tickets.apply_filters"))}</button><button type="button" class="portal-panel__action"${_scopeId}>${ssrInterpolate(unref(t3)("tickets.clear_filters"))}</button></div></form>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.tickets.create"),
              class: "thm-btn"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fas fa-plus me-1"${_scopeId2}></i>${ssrInterpolate(unref(t3)("tickets.new_ticket"))}`);
                } else {
                  return [
                    createVNode("i", { class: "fas fa-plus me-1" }),
                    createTextVNode(toDisplayString(unref(t3)("tickets.new_ticket")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            if (__props.tickets.data.length === 0) {
              _push2(`<div class="portal-panel"${_scopeId}><div class="portal-empty"${_scopeId}><i class="fas fa-life-ring portal-empty__icon"${_scopeId}></i> ${ssrInterpolate(unref(t3)("tickets.no_tickets"))}</div></div>`);
            } else {
              _push2(`<div class="portal-ticket-list"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tickets.data, (ticket) => {
                _push2(`<article class="portal-ticket-card"${_scopeId}><div class="portal-ticket-card__top"${_scopeId}><div${_scopeId}><div class="portal-ticket-card__number"${_scopeId}>${ssrInterpolate(ticket.ticket_number)}</div><h3 class="portal-ticket-card__title"${_scopeId}>${ssrInterpolate(ticket.subject)}</h3></div><span class="${ssrRenderClass([statusBadgeClass(ticket.status), "portal-badge"])}"${_scopeId}>${ssrInterpolate(unref(ticketStatusLabel)(ticket.status))}</span></div><div class="portal-ticket-card__meta"${_scopeId}><div${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.category"))}</span><strong${_scopeId}>${ssrInterpolate(ticket.category || "—")}</strong></div><div${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.priority"))}</span><strong${_scopeId}>${ssrInterpolate(unref(ticketPriorityLabel)(ticket.priority))}</strong></div><div${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.status"))}</span><strong${_scopeId}>${ssrInterpolate(formatDate(ticket.created_at))}</strong></div></div><div class="portal-ticket-card__footer"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("portal.tickets.show", ticket.id),
                  class: "thm-btn w-100 text-center"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t3)("tickets.view_ticket"))} <span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow`)}"${_scopeId2}></span>`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t3)("tickets.view_ticket")) + " ", 1),
                        createVNode("span", {
                          class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow`
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></article>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (((_a = __props.tickets.links) == null ? void 0 : _a.length) > 3) {
              _push2(`<nav class="portal-pagination" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tickets.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url || "#",
                  class: ["portal-pagination__link", { "portal-pagination__link--active": link.active }]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></nav>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "portal-panel portal-panel--allow-overflow mb-4" }, [
                createVNode("div", { class: "portal-panel__body" }, [
                  createVNode("div", { class: "portal-ticket-toolbar" }, [
                    createVNode("form", {
                      class: "portal-ticket-filters",
                      onSubmit: withModifiers(applyFilters, ["prevent"])
                    }, [
                      createVNode("div", { class: "portal-ticket-filters__group" }, [
                        createVNode("label", null, toDisplayString(unref(t3)("tickets.filter_status")), 1),
                        createVNode(PortalSelect, {
                          modelValue: filterForm.status,
                          "onUpdate:modelValue": ($event) => filterForm.status = $event,
                          options: statusOptions.value,
                          placeholder: unref(t3)("tickets.all_statuses")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                      ]),
                      createVNode("div", { class: "portal-ticket-filters__group" }, [
                        createVNode("label", null, toDisplayString(unref(t3)("tickets.filter_priority")), 1),
                        createVNode(PortalSelect, {
                          modelValue: filterForm.priority,
                          "onUpdate:modelValue": ($event) => filterForm.priority = $event,
                          options: priorityOptions.value,
                          placeholder: unref(t3)("tickets.all_priorities")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                      ]),
                      createVNode("div", { class: "portal-ticket-filters__group" }, [
                        createVNode("label", null, toDisplayString(unref(t3)("tickets.sort_newest")), 1),
                        createVNode(PortalSelect, {
                          modelValue: filterForm.sort,
                          "onUpdate:modelValue": ($event) => filterForm.sort = $event,
                          options: sortOptions.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode("div", { class: "portal-ticket-filters__actions" }, [
                        createVNode("button", {
                          type: "submit",
                          class: "thm-btn"
                        }, toDisplayString(unref(t3)("tickets.apply_filters")), 1),
                        createVNode("button", {
                          type: "button",
                          class: "portal-panel__action",
                          onClick: clearFilters
                        }, toDisplayString(unref(t3)("tickets.clear_filters")), 1)
                      ])
                    ], 32),
                    createVNode(unref(Link), {
                      href: _ctx.route("portal.tickets.create"),
                      class: "thm-btn"
                    }, {
                      default: withCtx(() => [
                        createVNode("i", { class: "fas fa-plus me-1" }),
                        createTextVNode(toDisplayString(unref(t3)("tickets.new_ticket")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ]),
              __props.tickets.data.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "portal-panel"
              }, [
                createVNode("div", { class: "portal-empty" }, [
                  createVNode("i", { class: "fas fa-life-ring portal-empty__icon" }),
                  createTextVNode(" " + toDisplayString(unref(t3)("tickets.no_tickets")), 1)
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "portal-ticket-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.tickets.data, (ticket) => {
                  return openBlock(), createBlock("article", {
                    key: ticket.id,
                    class: "portal-ticket-card"
                  }, [
                    createVNode("div", { class: "portal-ticket-card__top" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "portal-ticket-card__number" }, toDisplayString(ticket.ticket_number), 1),
                        createVNode("h3", { class: "portal-ticket-card__title" }, toDisplayString(ticket.subject), 1)
                      ]),
                      createVNode("span", {
                        class: ["portal-badge", statusBadgeClass(ticket.status)]
                      }, toDisplayString(unref(ticketStatusLabel)(ticket.status)), 3)
                    ]),
                    createVNode("div", { class: "portal-ticket-card__meta" }, [
                      createVNode("div", null, [
                        createVNode("span", null, toDisplayString(unref(t3)("fields.category")), 1),
                        createVNode("strong", null, toDisplayString(ticket.category || "—"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", null, toDisplayString(unref(t3)("fields.priority")), 1),
                        createVNode("strong", null, toDisplayString(unref(ticketPriorityLabel)(ticket.priority)), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", null, toDisplayString(unref(t3)("fields.status")), 1),
                        createVNode("strong", null, toDisplayString(formatDate(ticket.created_at)), 1)
                      ])
                    ]),
                    createVNode("div", { class: "portal-ticket-card__footer" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("portal.tickets.show", ticket.id),
                        class: "thm-btn w-100 text-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t3)("tickets.view_ticket")) + " ", 1),
                          createVNode("span", {
                            class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow`
                          }, null, 2)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]);
                }), 128))
              ])),
              ((_b = __props.tickets.links) == null ? void 0 : _b.length) > 3 ? (openBlock(), createBlock("nav", {
                key: 2,
                class: "portal-pagination",
                "aria-label": "Pagination"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.tickets.links, (link) => {
                  return openBlock(), createBlock(unref(Link), {
                    key: link.label,
                    href: link.url || "#",
                    class: ["portal-pagination__link", { "portal-pagination__link--active": link.active }],
                    innerHTML: link.label
                  }, null, 8, ["href", "class", "innerHTML"]);
                }), 128))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Support/resources/assets/js/Pages/Portal/Tickets/Index.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    ticket: { type: Object, required: true },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3, ticketStatusLabel, ticketPriorityLabel } = usePortalTranslations();
    const locale = computed(() => page.props.locale);
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || props.ticket.subject;
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.ticket_show_description");
    });
    const replyForm = useForm({
      body: "",
      attachment: null
    });
    const onReplyFileChange = (event) => {
      replyForm.attachment = event.target.files[0] || null;
    };
    const submitReply = () => {
      replyForm.post(route("portal.tickets.reply", props.ticket.id), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => replyForm.reset()
      });
    };
    const closeTicket = () => {
      if (!window.confirm(t3("tickets.close_confirm"))) {
        return;
      }
      router.post(route("portal.tickets.close", props.ticket.id), {}, {
        preserveScroll: true
      });
    };
    const statusBadgeClass = (status) => {
      if (status === "closed" || status === "resolved") return "portal-badge--success";
      if (status === "in_progress") return "portal-badge--info";
      return "portal-badge--neutral";
    };
    const formatDate = (value) => {
      if (!value) return "—";
      return new Date(value).toLocaleString(locale.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: __props.ticket.subject,
        subtitle: __props.ticket.ticket_number,
        active: "tickets",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("tickets.title"), href: _ctx.route("portal.tickets.index") },
          { label: __props.ticket.ticket_number }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.tickets.index"),
              class: "portal-back"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="${ssrRenderClass(`fas fa-arrow-${locale.value === "ar" ? "right" : "left"}`)}"${_scopeId2}></i> ${ssrInterpolate(unref(t3)("tickets.back_to_tickets"))}`);
                } else {
                  return [
                    createVNode("i", {
                      class: `fas fa-arrow-${locale.value === "ar" ? "right" : "left"}`
                    }, null, 2),
                    createTextVNode(" " + toDisplayString(unref(t3)("tickets.back_to_tickets")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="portal-grid portal-grid--show"${_scopeId}><div${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("projects.details"))}</h2></div><div class="portal-panel__body"${_scopeId}><div class="portal-details"${_scopeId}><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.ticket_number"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.ticket.ticket_number)}</div></div><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.status"))}</div><div class="portal-details__value"${_scopeId}><span class="${ssrRenderClass([statusBadgeClass(__props.ticket.status), "portal-badge"])}"${_scopeId}>${ssrInterpolate(unref(ticketStatusLabel)(__props.ticket.status))}</span></div></div><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.priority"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(unref(ticketPriorityLabel)(__props.ticket.priority))}</div></div><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.category"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.ticket.category || "—")}</div></div><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.created_at"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(formatDate(__props.ticket.created_at))}</div></div></div></div></div>`);
            if (__props.ticket.can_reply) {
              _push2(`<div class="portal-panel" style="${ssrRenderStyle({ "margin-top": "24px" })}"${_scopeId}><div class="portal-panel__body"${_scopeId}><button type="button" class="portal-panel__action text-danger"${_scopeId}><i class="fas fa-times-circle me-1"${_scopeId}></i>${ssrInterpolate(unref(t3)("tickets.close_ticket"))}</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-grid__stack"${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("tickets.conversation"))}</h2></div><div class="portal-panel__body"${_scopeId}><div class="portal-ticket-thread"${_scopeId}><div class="portal-ticket-message portal-ticket-message--customer"${_scopeId}><div class="portal-ticket-message__header"${_scopeId}><strong${_scopeId}>${ssrInterpolate(unref(t3)("tickets.original_message"))}</strong><span${_scopeId}>${ssrInterpolate(formatDate(__props.ticket.created_at))}</span></div><div class="portal-ticket-message__body"${_scopeId}>${ssrInterpolate(__props.ticket.description)}</div>`);
            if (__props.ticket.attachment) {
              _push2(`<a${ssrRenderAttr("href", __props.ticket.attachment.url)} target="_blank" class="portal-ticket-message__attachment"${_scopeId}><i class="fas fa-paperclip"${_scopeId}></i>${ssrInterpolate(__props.ticket.attachment.name)}</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!--[-->`);
            ssrRenderList(__props.ticket.messages, (message) => {
              _push2(`<div class="${ssrRenderClass([message.is_staff ? "portal-ticket-message--staff" : "portal-ticket-message--customer", "portal-ticket-message"])}"${_scopeId}><div class="portal-ticket-message__header"${_scopeId}><strong${_scopeId}>${ssrInterpolate(message.author)}</strong><span${_scopeId}>${ssrInterpolate(formatDate(message.created_at))}</span></div><div class="portal-ticket-message__body"${_scopeId}>${ssrInterpolate(message.body)}</div>`);
              if (message.attachment) {
                _push2(`<a${ssrRenderAttr("href", message.attachment.url)} target="_blank" class="portal-ticket-message__attachment"${_scopeId}><i class="fas fa-paperclip"${_scopeId}></i>${ssrInterpolate(message.attachment.name)}</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (__props.ticket.can_reply) {
              _push2(`<div class="portal-ticket-reply"${_scopeId}><form${_scopeId}><div class="portal-form-group"${_scopeId}><label for="reply"${_scopeId}>${ssrInterpolate(unref(t3)("tickets.send_reply"))}</label><textarea id="reply" rows="4"${ssrRenderAttr("placeholder", unref(t3)("tickets.reply_placeholder"))} class="${ssrRenderClass([{ "portal-input--error": unref(replyForm).errors.body }, "portal-input"])}" required${_scopeId}>${ssrInterpolate(unref(replyForm).body)}</textarea>`);
              if (unref(replyForm).errors.body) {
                _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(replyForm).errors.body)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="portal-form-group"${_scopeId}><input type="file" class="${ssrRenderClass([{ "portal-input--error": unref(replyForm).errors.attachment }, "portal-input"])}"${_scopeId}>`);
              if (unref(replyForm).errors.attachment) {
                _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(replyForm).errors.attachment)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><button type="submit" class="thm-btn"${ssrIncludeBooleanAttr(unref(replyForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("tickets.send_reply"))}</button></form></div>`);
            } else {
              _push2(`<div class="portal-empty portal-empty--compact"${_scopeId}>${ssrInterpolate(unref(t3)("tickets.ticket_closed"))}</div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Link), {
                href: _ctx.route("portal.tickets.index"),
                class: "portal-back"
              }, {
                default: withCtx(() => [
                  createVNode("i", {
                    class: `fas fa-arrow-${locale.value === "ar" ? "right" : "left"}`
                  }, null, 2),
                  createTextVNode(" " + toDisplayString(unref(t3)("tickets.back_to_tickets")), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode("div", { class: "portal-grid portal-grid--show" }, [
                createVNode("div", null, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("projects.details")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("div", { class: "portal-details" }, [
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.ticket_number")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.ticket.ticket_number), 1)
                        ]),
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.status")), 1),
                          createVNode("div", { class: "portal-details__value" }, [
                            createVNode("span", {
                              class: ["portal-badge", statusBadgeClass(__props.ticket.status)]
                            }, toDisplayString(unref(ticketStatusLabel)(__props.ticket.status)), 3)
                          ])
                        ]),
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.priority")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(unref(ticketPriorityLabel)(__props.ticket.priority)), 1)
                        ]),
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.category")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.ticket.category || "—"), 1)
                        ]),
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.created_at")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(formatDate(__props.ticket.created_at)), 1)
                        ])
                      ])
                    ])
                  ]),
                  __props.ticket.can_reply ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "portal-panel",
                    style: { "margin-top": "24px" }
                  }, [
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("button", {
                        type: "button",
                        class: "portal-panel__action text-danger",
                        onClick: closeTicket
                      }, [
                        createVNode("i", { class: "fas fa-times-circle me-1" }),
                        createTextVNode(toDisplayString(unref(t3)("tickets.close_ticket")), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "portal-grid__stack" }, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("tickets.conversation")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("div", { class: "portal-ticket-thread" }, [
                        createVNode("div", { class: "portal-ticket-message portal-ticket-message--customer" }, [
                          createVNode("div", { class: "portal-ticket-message__header" }, [
                            createVNode("strong", null, toDisplayString(unref(t3)("tickets.original_message")), 1),
                            createVNode("span", null, toDisplayString(formatDate(__props.ticket.created_at)), 1)
                          ]),
                          createVNode("div", { class: "portal-ticket-message__body" }, toDisplayString(__props.ticket.description), 1),
                          __props.ticket.attachment ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: __props.ticket.attachment.url,
                            target: "_blank",
                            class: "portal-ticket-message__attachment"
                          }, [
                            createVNode("i", { class: "fas fa-paperclip" }),
                            createTextVNode(toDisplayString(__props.ticket.attachment.name), 1)
                          ], 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.ticket.messages, (message) => {
                          return openBlock(), createBlock("div", {
                            key: message.id,
                            class: ["portal-ticket-message", message.is_staff ? "portal-ticket-message--staff" : "portal-ticket-message--customer"]
                          }, [
                            createVNode("div", { class: "portal-ticket-message__header" }, [
                              createVNode("strong", null, toDisplayString(message.author), 1),
                              createVNode("span", null, toDisplayString(formatDate(message.created_at)), 1)
                            ]),
                            createVNode("div", { class: "portal-ticket-message__body" }, toDisplayString(message.body), 1),
                            message.attachment ? (openBlock(), createBlock("a", {
                              key: 0,
                              href: message.attachment.url,
                              target: "_blank",
                              class: "portal-ticket-message__attachment"
                            }, [
                              createVNode("i", { class: "fas fa-paperclip" }),
                              createTextVNode(toDisplayString(message.attachment.name), 1)
                            ], 8, ["href"])) : createCommentVNode("", true)
                          ], 2);
                        }), 128))
                      ]),
                      __props.ticket.can_reply ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-ticket-reply"
                      }, [
                        createVNode("form", {
                          onSubmit: withModifiers(submitReply, ["prevent"])
                        }, [
                          createVNode("div", { class: "portal-form-group" }, [
                            createVNode("label", { for: "reply" }, toDisplayString(unref(t3)("tickets.send_reply")), 1),
                            withDirectives(createVNode("textarea", {
                              id: "reply",
                              "onUpdate:modelValue": ($event) => unref(replyForm).body = $event,
                              rows: "4",
                              class: ["portal-input", { "portal-input--error": unref(replyForm).errors.body }],
                              placeholder: unref(t3)("tickets.reply_placeholder"),
                              required: ""
                            }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(replyForm).body]
                            ]),
                            unref(replyForm).errors.body ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "portal-form-error"
                            }, toDisplayString(unref(replyForm).errors.body), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "portal-form-group" }, [
                            createVNode("input", {
                              type: "file",
                              class: ["portal-input", { "portal-input--error": unref(replyForm).errors.attachment }],
                              onChange: onReplyFileChange
                            }, null, 34),
                            unref(replyForm).errors.attachment ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "portal-form-error"
                            }, toDisplayString(unref(replyForm).errors.attachment), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("button", {
                            type: "submit",
                            class: "thm-btn",
                            disabled: unref(replyForm).processing
                          }, toDisplayString(unref(t3)("tickets.send_reply")), 9, ["disabled"])
                        ], 32)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "portal-empty portal-empty--compact"
                      }, toDisplayString(unref(t3)("tickets.ticket_closed")), 1))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Support/resources/assets/js/Pages/Portal/Tickets/Show.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  components: {
    AppLayout: _sfc_main$Q,
    Link,
    Head,
    PageHeader
  },
  props: {
    errors: Object
  },
  setup() {
    const page = usePage();
    const locale = computed(() => page.props.locale);
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path);
    const flash = computed(() => page.props.flash || {});
    const meta = computed(() => page.props.meta || {});
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e2) {
        return key;
      }
    };
    const metaTitle = computed(() => `${trans("Forgot Password")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => {
      return meta.value.description || trans("Request a password reset link to regain access to your account.");
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("forgot password, reset password, account recovery");
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "noindex, nofollow");
    const form = useForm({
      email: ""
    });
    return {
      form,
      seo,
      locale,
      trans,
      asset_path,
      flash,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaCanonical,
      metaRobots
    };
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_PageHeader = resolveComponent("PageHeader");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title data-v-02db8892${_scopeId}>${ssrInterpolate($setup.metaTitle)}</title><meta name="description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-02db8892${_scopeId}><meta name="keywords"${ssrRenderAttr("content", $setup.metaKeywords)} data-v-02db8892${_scopeId}><meta name="robots"${ssrRenderAttr("content", $setup.metaRobots)} data-v-02db8892${_scopeId}>`);
        if ($setup.metaCanonical) {
          _push2(`<link rel="canonical"${ssrRenderAttr("href", $setup.metaCanonical)} data-v-02db8892${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-02db8892${_scopeId}><meta property="og:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-02db8892${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta property="og:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-02db8892${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.metaCanonical) {
          _push2(`<meta property="og:url"${ssrRenderAttr("content", $setup.metaCanonical)} data-v-02db8892${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:type" content="website" data-v-02db8892${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-02db8892${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-02db8892${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-02db8892${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta name="twitter:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-02db8892${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.metaTitle), 1),
          createVNode("meta", {
            name: "description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "keywords",
            content: $setup.metaKeywords
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "robots",
            content: $setup.metaRobots
          }, null, 8, ["content"]),
          $setup.metaCanonical ? (openBlock(), createBlock("link", {
            key: 0,
            rel: "canonical",
            href: $setup.metaCanonical
          }, null, 8, ["href"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 1,
            property: "og:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true),
          $setup.metaCanonical ? (openBlock(), createBlock("meta", {
            key: 2,
            property: "og:url",
            content: $setup.metaCanonical
          }, null, 8, ["content"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:type",
            content: "website"
          }),
          createVNode("meta", {
            name: "twitter:card",
            content: "summary_large_image"
          }),
          createVNode("meta", {
            name: "twitter:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 3,
            name: "twitter:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_PageHeader, {
          title: $setup.trans("Forgot Password"),
          background: $setup.asset_path + "theme/img/main/32.jpg"
        }, null, _parent2, _scopeId));
        _push2(`<section class="section-small" data-v-02db8892${_scopeId}><div class="container" data-v-02db8892${_scopeId}><div class="row" data-v-02db8892${_scopeId}><div class="col-md-4 col-md-offset-4" data-v-02db8892${_scopeId}><h2 class="text-center" data-v-02db8892${_scopeId}>${ssrInterpolate($setup.trans("Reset Your Password"))}</h2>`);
        if ($setup.flash.success) {
          _push2(`<div class="alert alert-success" data-v-02db8892${_scopeId}>${ssrInterpolate($setup.flash.success)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.flash.error) {
          _push2(`<div class="alert alert-danger" data-v-02db8892${_scopeId}>${ssrInterpolate($setup.flash.error)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<form data-v-02db8892${_scopeId}><div class="form-group" data-v-02db8892${_scopeId}><input id="email" class="form-control input-lg"${ssrRenderAttr("value", $setup.form.email)} type="email" autocomplete="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-02db8892${_scopeId}>`);
        if ($props.errors.email) {
          _push2(`<p class="help-block text-danger" data-v-02db8892${_scopeId}>${ssrInterpolate($props.errors.email)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><button class="btn btn-lg btn-dark btn-block" type="submit"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} data-v-02db8892${_scopeId}>${ssrInterpolate($setup.form.processing ? $setup.trans("Sending...") : $setup.trans("Send Email Verification"))}</button></form><p class="text-center" data-v-02db8892${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login")
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Back to Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</p></div></div></div></section>`);
      } else {
        return [
          createVNode(_component_PageHeader, {
            title: $setup.trans("Forgot Password"),
            background: $setup.asset_path + "theme/img/main/32.jpg"
          }, null, 8, ["title", "background"]),
          createVNode("section", { class: "section-small" }, [
            createVNode("div", { class: "container" }, [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-4 col-md-offset-4" }, [
                  createVNode("h2", { class: "text-center" }, toDisplayString($setup.trans("Reset Your Password")), 1),
                  $setup.flash.success ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "alert alert-success"
                  }, toDisplayString($setup.flash.success), 1)) : createCommentVNode("", true),
                  $setup.flash.error ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "alert alert-danger"
                  }, toDisplayString($setup.flash.error), 1)) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("password.email")), ["prevent"])
                  }, [
                    createVNode("div", { class: "form-group" }, [
                      withDirectives(createVNode("input", {
                        id: "email",
                        class: "form-control input-lg",
                        "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                        type: "email",
                        autocomplete: "email",
                        placeholder: $setup.trans("Email"),
                        disabled: $setup.form.processing,
                        required: ""
                      }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                        [vModelText, $setup.form.email]
                      ]),
                      $props.errors.email ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "help-block text-danger"
                      }, toDisplayString($props.errors.email), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      class: "btn btn-lg btn-dark btn-block",
                      type: "submit",
                      disabled: $setup.form.processing
                    }, toDisplayString($setup.form.processing ? $setup.trans("Sending...") : $setup.trans("Send Email Verification")), 9, ["disabled"])
                  ], 40, ["onSubmit"]),
                  createVNode("p", { class: "text-center" }, [
                    createVNode(_component_Link, {
                      href: _ctx.route("login")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const ForgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-02db8892"]]);
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  components: {
    AppLayout: _sfc_main$Q,
    Link,
    Head
  },
  props: {
    errors: Object
  },
  setup() {
    const page = usePage();
    const locale = computed(() => page.props.locale);
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const flash = computed(() => page.props.flash || {});
    const meta = computed(() => page.props.meta || {});
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e2) {
        return key;
      }
    };
    const formatError = (error) => {
      if (!error) {
        return error;
      }
      const authErrors = {
        "auth.failed": trans("These credentials do not match our records."),
        "auth.password": trans("The provided password is incorrect."),
        "auth.throttle": trans("Too many login attempts. Please try again in :seconds seconds.")
      };
      return authErrors[error] || trans(error) || error;
    };
    const metaTitle = computed(() => `${trans("Login")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => {
      return meta.value.description || trans("Log in to manage your account and services.");
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("login, sign in, account access");
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "noindex, nofollow");
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    return {
      form,
      seo,
      locale,
      trans,
      formatError,
      asset_path,
      flash,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaCanonical,
      metaRobots
    };
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.metaTitle)}</title><meta name="description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-56d6aa13${_scopeId}><meta name="keywords"${ssrRenderAttr("content", $setup.metaKeywords)} data-v-56d6aa13${_scopeId}><meta name="robots"${ssrRenderAttr("content", $setup.metaRobots)} data-v-56d6aa13${_scopeId}>`);
        if ($setup.metaCanonical) {
          _push2(`<link rel="canonical"${ssrRenderAttr("href", $setup.metaCanonical)} data-v-56d6aa13${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-56d6aa13${_scopeId}><meta property="og:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-56d6aa13${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta property="og:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-56d6aa13${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.metaCanonical) {
          _push2(`<meta property="og:url"${ssrRenderAttr("content", $setup.metaCanonical)} data-v-56d6aa13${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:type" content="website" data-v-56d6aa13${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-56d6aa13${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-56d6aa13${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-56d6aa13${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta name="twitter:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-56d6aa13${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.metaTitle), 1),
          createVNode("meta", {
            name: "description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "keywords",
            content: $setup.metaKeywords
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "robots",
            content: $setup.metaRobots
          }, null, 8, ["content"]),
          $setup.metaCanonical ? (openBlock(), createBlock("link", {
            key: 0,
            rel: "canonical",
            href: $setup.metaCanonical
          }, null, 8, ["href"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 1,
            property: "og:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true),
          $setup.metaCanonical ? (openBlock(), createBlock("meta", {
            key: 2,
            property: "og:url",
            content: $setup.metaCanonical
          }, null, 8, ["content"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:type",
            content: "website"
          }),
          createVNode("meta", {
            name: "twitter:card",
            content: "summary_large_image"
          }),
          createVNode("meta", {
            name: "twitter:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 3,
            name: "twitter:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<header class="intro intro-fullscreen" style="${ssrRenderStyle({ backgroundImage: `url(${$setup.asset_path}theme/img/main/32.jpg)` })}" data-v-56d6aa13${_scopeId}><div class="overlay" data-v-56d6aa13${_scopeId}></div><div class="intro-body" data-v-56d6aa13${_scopeId}><h2 data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.trans("Login"))}</h2><div class="container" data-v-56d6aa13${_scopeId}><div class="row" data-v-56d6aa13${_scopeId}><div class="col-md-4 col-md-offset-4" data-v-56d6aa13${_scopeId}>`);
        if ($setup.flash.success) {
          _push2(`<div class="alert alert-success" data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.flash.success)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.flash.error) {
          _push2(`<div class="alert alert-danger" data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.flash.error)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<form class="form-signin" data-v-56d6aa13${_scopeId}><div class="form-group" data-v-56d6aa13${_scopeId}><label class="sr-only" for="formEmail" data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.trans("Email"))}</label><input id="formEmail" class="form-control input-lg"${ssrRenderAttr("value", $setup.form.email)} type="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required autofocus data-v-56d6aa13${_scopeId}>`);
        if ($props.errors.email) {
          _push2(`<p class="help-block text-danger" data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.formatError($props.errors.email))}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="form-group" data-v-56d6aa13${_scopeId}><label class="sr-only" for="formPassword" data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.trans("Password"))}</label><input id="formPassword" class="form-control input-lg"${ssrRenderAttr("value", $setup.form.password)} type="password"${ssrRenderAttr("placeholder", $setup.trans("Password"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-56d6aa13${_scopeId}>`);
        if ($props.errors.password) {
          _push2(`<p class="help-block text-danger" data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.formatError($props.errors.password))}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="checkbox text-left" data-v-56d6aa13${_scopeId}><label data-v-56d6aa13${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray($setup.form.remember) ? ssrLooseContain($setup.form.remember, null) : $setup.form.remember) ? " checked" : ""} type="checkbox" data-v-56d6aa13${_scopeId}> ${ssrInterpolate($setup.trans("Remember Me"))}</label></div><button class="btn btn-lg btn-dark btn-block" type="submit"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.form.processing ? $setup.trans("Signing In...") : $setup.trans("Login"))}</button></form><p class="text-center" data-v-56d6aa13${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("password.request")
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Forgot Password"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Forgot Password")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</p><p class="text-center" data-v-56d6aa13${_scopeId}>${ssrInterpolate($setup.trans("I Don't Have Account!"))} `);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("register")
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Create A New Account"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Create A New Account")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</p></div></div></div></div></header>`);
      } else {
        return [
          createVNode("header", {
            class: "intro intro-fullscreen",
            style: { backgroundImage: `url(${$setup.asset_path}theme/img/main/32.jpg)` }
          }, [
            createVNode("div", { class: "overlay" }),
            createVNode("div", { class: "intro-body" }, [
              createVNode("h2", null, toDisplayString($setup.trans("Login")), 1),
              createVNode("div", { class: "container" }, [
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-md-4 col-md-offset-4" }, [
                    $setup.flash.success ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "alert alert-success"
                    }, toDisplayString($setup.flash.success), 1)) : createCommentVNode("", true),
                    $setup.flash.error ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "alert alert-danger"
                    }, toDisplayString($setup.flash.error), 1)) : createCommentVNode("", true),
                    createVNode("form", {
                      class: "form-signin",
                      onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("login")), ["prevent"])
                    }, [
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", {
                          class: "sr-only",
                          for: "formEmail"
                        }, toDisplayString($setup.trans("Email")), 1),
                        withDirectives(createVNode("input", {
                          id: "formEmail",
                          class: "form-control input-lg",
                          "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                          type: "email",
                          placeholder: $setup.trans("Email"),
                          disabled: $setup.form.processing,
                          required: "",
                          autofocus: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                          [vModelText, $setup.form.email]
                        ]),
                        $props.errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "help-block text-danger"
                        }, toDisplayString($setup.formatError($props.errors.email)), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", {
                          class: "sr-only",
                          for: "formPassword"
                        }, toDisplayString($setup.trans("Password")), 1),
                        withDirectives(createVNode("input", {
                          id: "formPassword",
                          class: "form-control input-lg",
                          "onUpdate:modelValue": ($event) => $setup.form.password = $event,
                          type: "password",
                          placeholder: $setup.trans("Password"),
                          disabled: $setup.form.processing,
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                          [vModelText, $setup.form.password]
                        ]),
                        $props.errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "help-block text-danger"
                        }, toDisplayString($setup.formatError($props.errors.password)), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "checkbox text-left" }, [
                        createVNode("label", null, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => $setup.form.remember = $event,
                            type: "checkbox"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, $setup.form.remember]
                          ]),
                          createTextVNode(" " + toDisplayString($setup.trans("Remember Me")), 1)
                        ])
                      ]),
                      createVNode("button", {
                        class: "btn btn-lg btn-dark btn-block",
                        type: "submit",
                        disabled: $setup.form.processing
                      }, toDisplayString($setup.form.processing ? $setup.trans("Signing In...") : $setup.trans("Login")), 9, ["disabled"])
                    ], 40, ["onSubmit"]),
                    createVNode("p", { class: "text-center" }, [
                      createVNode(_component_Link, {
                        href: _ctx.route("password.request")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($setup.trans("Forgot Password")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("p", { class: "text-center" }, [
                      createTextVNode(toDisplayString($setup.trans("I Don't Have Account!")) + " ", 1),
                      createVNode(_component_Link, {
                        href: _ctx.route("register")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($setup.trans("Create A New Account")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ])
              ])
            ])
          ], 4)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/Login.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-56d6aa13"]]);
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  components: {
    AppLayout: _sfc_main$Q,
    Link,
    Head
  },
  props: {
    errors: Object
  },
  setup() {
    const page = usePage();
    const locale = computed(() => page.props.locale);
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path);
    const flash = computed(() => page.props.flash || {});
    const meta = computed(() => page.props.meta || {});
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e2) {
        return key;
      }
    };
    const metaTitle = computed(() => `${trans("Register")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => {
      return meta.value.description || trans("Create a new account to access our services.");
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("register, sign up, create account");
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "noindex, nofollow");
    const form = useForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
      password_confirmation: ""
    });
    return {
      form,
      seo,
      trans,
      locale,
      asset_path,
      flash,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaCanonical,
      metaRobots
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title data-v-b7bbe74e${_scopeId}>${ssrInterpolate($setup.metaTitle)}</title><meta name="description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-b7bbe74e${_scopeId}><meta name="keywords"${ssrRenderAttr("content", $setup.metaKeywords)} data-v-b7bbe74e${_scopeId}><meta name="robots"${ssrRenderAttr("content", $setup.metaRobots)} data-v-b7bbe74e${_scopeId}>`);
        if ($setup.metaCanonical) {
          _push2(`<link rel="canonical"${ssrRenderAttr("href", $setup.metaCanonical)} data-v-b7bbe74e${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-b7bbe74e${_scopeId}><meta property="og:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-b7bbe74e${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta property="og:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-b7bbe74e${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.metaCanonical) {
          _push2(`<meta property="og:url"${ssrRenderAttr("content", $setup.metaCanonical)} data-v-b7bbe74e${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:type" content="website" data-v-b7bbe74e${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-b7bbe74e${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-b7bbe74e${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-b7bbe74e${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta name="twitter:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-b7bbe74e${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.metaTitle), 1),
          createVNode("meta", {
            name: "description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "keywords",
            content: $setup.metaKeywords
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "robots",
            content: $setup.metaRobots
          }, null, 8, ["content"]),
          $setup.metaCanonical ? (openBlock(), createBlock("link", {
            key: 0,
            rel: "canonical",
            href: $setup.metaCanonical
          }, null, 8, ["href"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 1,
            property: "og:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true),
          $setup.metaCanonical ? (openBlock(), createBlock("meta", {
            key: 2,
            property: "og:url",
            content: $setup.metaCanonical
          }, null, 8, ["content"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:type",
            content: "website"
          }),
          createVNode("meta", {
            name: "twitter:card",
            content: "summary_large_image"
          }),
          createVNode("meta", {
            name: "twitter:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 3,
            name: "twitter:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<header class="intro intro-fullscreen" style="${ssrRenderStyle({ backgroundImage: `url(${$setup.asset_path}theme/img/main/33.jpg)` })}" data-v-b7bbe74e${_scopeId}><div class="overlay" data-v-b7bbe74e${_scopeId}></div><div class="intro-body" data-v-b7bbe74e${_scopeId}><h2 data-v-b7bbe74e${_scopeId}>${ssrInterpolate($setup.trans("Register"))}</h2><div class="container" data-v-b7bbe74e${_scopeId}><div class="row" data-v-b7bbe74e${_scopeId}><div class="col-md-4 col-md-offset-4" data-v-b7bbe74e${_scopeId}>`);
        if ($setup.flash.success) {
          _push2(`<div class="alert alert-success" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($setup.flash.success)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.flash.error) {
          _push2(`<div class="alert alert-danger" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($setup.flash.error)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<form class="form-signin" data-v-b7bbe74e${_scopeId}><div class="form-group" data-v-b7bbe74e${_scopeId}><input class="form-control input-lg" id="formName"${ssrRenderAttr("value", $setup.form.name)} type="text"${ssrRenderAttr("placeholder", $setup.trans("Name"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-b7bbe74e${_scopeId}>`);
        if ($props.errors.name) {
          _push2(`<p class="help-block text-danger" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($props.errors.name)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="form-group" data-v-b7bbe74e${_scopeId}><input class="form-control input-lg" id="formEmail"${ssrRenderAttr("value", $setup.form.email)} type="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-b7bbe74e${_scopeId}>`);
        if ($props.errors.email) {
          _push2(`<p class="help-block text-danger" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($props.errors.email)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="form-group" data-v-b7bbe74e${_scopeId}><input class="form-control input-lg" id="formPhone"${ssrRenderAttr("value", $setup.form.mobile)} type="text"${ssrRenderAttr("placeholder", $setup.trans("Phone"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-b7bbe74e${_scopeId}>`);
        if ($props.errors.mobile) {
          _push2(`<p class="help-block text-danger" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($props.errors.mobile)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="form-group" data-v-b7bbe74e${_scopeId}><input class="form-control input-lg" id="formPassword"${ssrRenderAttr("value", $setup.form.password)} type="password"${ssrRenderAttr("placeholder", $setup.trans("Password"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-b7bbe74e${_scopeId}>`);
        if ($props.errors.password) {
          _push2(`<p class="help-block text-danger" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($props.errors.password)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="form-group" data-v-b7bbe74e${_scopeId}><input class="form-control input-lg" id="formPasswordConfirm"${ssrRenderAttr("value", $setup.form.password_confirmation)} type="password"${ssrRenderAttr("placeholder", $setup.trans("Confirm Password"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-b7bbe74e${_scopeId}>`);
        if ($props.errors.password_confirmation) {
          _push2(`<p class="help-block text-danger" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($props.errors.password_confirmation)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><button class="btn btn-lg btn-dark btn-block" type="submit"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} data-v-b7bbe74e${_scopeId}>${ssrInterpolate($setup.form.processing ? $setup.trans("Registering...") : $setup.trans("Register"))}</button></form><p class="text-center" data-v-b7bbe74e${_scopeId}>${ssrInterpolate($setup.trans("Already Have An Account?"))} `);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login")
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</p></div></div></div></div></header>`);
      } else {
        return [
          createVNode("header", {
            class: "intro intro-fullscreen",
            style: { backgroundImage: `url(${$setup.asset_path}theme/img/main/33.jpg)` }
          }, [
            createVNode("div", { class: "overlay" }),
            createVNode("div", { class: "intro-body" }, [
              createVNode("h2", null, toDisplayString($setup.trans("Register")), 1),
              createVNode("div", { class: "container" }, [
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-md-4 col-md-offset-4" }, [
                    $setup.flash.success ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "alert alert-success"
                    }, toDisplayString($setup.flash.success), 1)) : createCommentVNode("", true),
                    $setup.flash.error ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "alert alert-danger"
                    }, toDisplayString($setup.flash.error), 1)) : createCommentVNode("", true),
                    createVNode("form", {
                      class: "form-signin",
                      onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("register")), ["prevent"])
                    }, [
                      createVNode("div", { class: "form-group" }, [
                        withDirectives(createVNode("input", {
                          class: "form-control input-lg",
                          id: "formName",
                          "onUpdate:modelValue": ($event) => $setup.form.name = $event,
                          type: "text",
                          placeholder: $setup.trans("Name"),
                          disabled: $setup.form.processing,
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                          [vModelText, $setup.form.name]
                        ]),
                        $props.errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "help-block text-danger"
                        }, toDisplayString($props.errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        withDirectives(createVNode("input", {
                          class: "form-control input-lg",
                          id: "formEmail",
                          "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                          type: "email",
                          placeholder: $setup.trans("Email"),
                          disabled: $setup.form.processing,
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                          [vModelText, $setup.form.email]
                        ]),
                        $props.errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "help-block text-danger"
                        }, toDisplayString($props.errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        withDirectives(createVNode("input", {
                          class: "form-control input-lg",
                          id: "formPhone",
                          "onUpdate:modelValue": ($event) => $setup.form.mobile = $event,
                          type: "text",
                          placeholder: $setup.trans("Phone"),
                          disabled: $setup.form.processing,
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                          [vModelText, $setup.form.mobile]
                        ]),
                        $props.errors.mobile ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "help-block text-danger"
                        }, toDisplayString($props.errors.mobile), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        withDirectives(createVNode("input", {
                          class: "form-control input-lg",
                          id: "formPassword",
                          "onUpdate:modelValue": ($event) => $setup.form.password = $event,
                          type: "password",
                          placeholder: $setup.trans("Password"),
                          disabled: $setup.form.processing,
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                          [vModelText, $setup.form.password]
                        ]),
                        $props.errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "help-block text-danger"
                        }, toDisplayString($props.errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        withDirectives(createVNode("input", {
                          class: "form-control input-lg",
                          id: "formPasswordConfirm",
                          "onUpdate:modelValue": ($event) => $setup.form.password_confirmation = $event,
                          type: "password",
                          placeholder: $setup.trans("Confirm Password"),
                          disabled: $setup.form.processing,
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                          [vModelText, $setup.form.password_confirmation]
                        ]),
                        $props.errors.password_confirmation ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "help-block text-danger"
                        }, toDisplayString($props.errors.password_confirmation), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("button", {
                        class: "btn btn-lg btn-dark btn-block",
                        type: "submit",
                        disabled: $setup.form.processing
                      }, toDisplayString($setup.form.processing ? $setup.trans("Registering...") : $setup.trans("Register")), 9, ["disabled"])
                    ], 40, ["onSubmit"]),
                    createVNode("p", { class: "text-center" }, [
                      createTextVNode(toDisplayString($setup.trans("Already Have An Account?")) + " ", 1),
                      createVNode(_component_Link, {
                        href: _ctx.route("login")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($setup.trans("Login")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ])
              ])
            ])
          ], 4)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/Register.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-b7bbe74e"]]);
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  components: {
    AppLayout: _sfc_main$Q,
    Link,
    Head,
    PageHeader
  },
  props: {
    errors: Object
  },
  setup() {
    const page = usePage();
    const locale = computed(() => page.props.locale);
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const flash = computed(() => page.props.flash || {});
    const meta = computed(() => page.props.meta || {});
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e2) {
        return key;
      }
    };
    const metaTitle = computed(() => `${trans("Reset Password")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => {
      return meta.value.description || trans("Set a new password to secure your account.");
    });
    const metaKeywords = computed(() => {
      return meta.value.keywords || trans("reset password, account security, set new password");
    });
    const metaImage = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || ((_e = settings.value) == null ? void 0 : _e.meta_img) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "noindex, nofollow");
    const params = new URLSearchParams(window.location.search);
    const form = useForm({
      email: "",
      password: "",
      password_confirmation: "",
      token: params.get("token") || ""
    });
    return {
      form,
      seo,
      locale,
      trans,
      asset_path,
      flash,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaCanonical,
      metaRobots
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_PageHeader = resolveComponent("PageHeader");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title data-v-d7da4c9f${_scopeId}>${ssrInterpolate($setup.metaTitle)}</title><meta name="description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-d7da4c9f${_scopeId}><meta name="keywords"${ssrRenderAttr("content", $setup.metaKeywords)} data-v-d7da4c9f${_scopeId}><meta name="robots"${ssrRenderAttr("content", $setup.metaRobots)} data-v-d7da4c9f${_scopeId}>`);
        if ($setup.metaCanonical) {
          _push2(`<link rel="canonical"${ssrRenderAttr("href", $setup.metaCanonical)} data-v-d7da4c9f${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-d7da4c9f${_scopeId}><meta property="og:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-d7da4c9f${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta property="og:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-d7da4c9f${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.metaCanonical) {
          _push2(`<meta property="og:url"${ssrRenderAttr("content", $setup.metaCanonical)} data-v-d7da4c9f${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<meta property="og:type" content="website" data-v-d7da4c9f${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-d7da4c9f${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", $setup.metaTitle)} data-v-d7da4c9f${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", $setup.metaDescription)} data-v-d7da4c9f${_scopeId}>`);
        if ($setup.metaImage) {
          _push2(`<meta name="twitter:image"${ssrRenderAttr("content", $setup.metaImage)} data-v-d7da4c9f${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.metaTitle), 1),
          createVNode("meta", {
            name: "description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "keywords",
            content: $setup.metaKeywords
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "robots",
            content: $setup.metaRobots
          }, null, 8, ["content"]),
          $setup.metaCanonical ? (openBlock(), createBlock("link", {
            key: 0,
            rel: "canonical",
            href: $setup.metaCanonical
          }, null, 8, ["href"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 1,
            property: "og:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true),
          $setup.metaCanonical ? (openBlock(), createBlock("meta", {
            key: 2,
            property: "og:url",
            content: $setup.metaCanonical
          }, null, 8, ["content"])) : createCommentVNode("", true),
          createVNode("meta", {
            property: "og:type",
            content: "website"
          }),
          createVNode("meta", {
            name: "twitter:card",
            content: "summary_large_image"
          }),
          createVNode("meta", {
            name: "twitter:title",
            content: $setup.metaTitle
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          $setup.metaImage ? (openBlock(), createBlock("meta", {
            key: 3,
            name: "twitter:image",
            content: $setup.metaImage
          }, null, 8, ["content"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_PageHeader, {
          title: $setup.trans("Reset Password"),
          background: $setup.asset_path + "theme/img/main/32.jpg"
        }, null, _parent2, _scopeId));
        _push2(`<section class="section-small" data-v-d7da4c9f${_scopeId}><div class="container" data-v-d7da4c9f${_scopeId}><div class="row" data-v-d7da4c9f${_scopeId}><div class="col-md-4 col-md-offset-4" data-v-d7da4c9f${_scopeId}><h2 class="text-center" data-v-d7da4c9f${_scopeId}>${ssrInterpolate($setup.trans("Set New Password"))}</h2>`);
        if ($setup.flash.success) {
          _push2(`<div class="alert alert-success" data-v-d7da4c9f${_scopeId}>${ssrInterpolate($setup.flash.success)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.flash.error) {
          _push2(`<div class="alert alert-danger" data-v-d7da4c9f${_scopeId}>${ssrInterpolate($setup.flash.error)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<form data-v-d7da4c9f${_scopeId}><input${ssrRenderAttr("value", $setup.form.token)} name="token" type="hidden" data-v-d7da4c9f${_scopeId}><div class="form-group" data-v-d7da4c9f${_scopeId}><input id="email" class="form-control input-lg"${ssrRenderAttr("value", $setup.form.email)} type="email" autocomplete="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-d7da4c9f${_scopeId}>`);
        if ($props.errors.email) {
          _push2(`<p class="help-block text-danger" data-v-d7da4c9f${_scopeId}>${ssrInterpolate($props.errors.email)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="form-group" data-v-d7da4c9f${_scopeId}><input id="password" class="form-control input-lg"${ssrRenderAttr("value", $setup.form.password)} type="password" autocomplete="new-password"${ssrRenderAttr("placeholder", $setup.trans("Password"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-d7da4c9f${_scopeId}>`);
        if ($props.errors.password) {
          _push2(`<p class="help-block text-danger" data-v-d7da4c9f${_scopeId}>${ssrInterpolate($props.errors.password)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="form-group" data-v-d7da4c9f${_scopeId}><input id="password_confirmation" class="form-control input-lg"${ssrRenderAttr("value", $setup.form.password_confirmation)} type="password" autocomplete="new-password"${ssrRenderAttr("placeholder", $setup.trans("Confirm Password"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required data-v-d7da4c9f${_scopeId}>`);
        if ($props.errors.password_confirmation) {
          _push2(`<p class="help-block text-danger" data-v-d7da4c9f${_scopeId}>${ssrInterpolate($props.errors.password_confirmation)}</p>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><button class="btn btn-lg btn-dark btn-block" type="submit"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} data-v-d7da4c9f${_scopeId}>${ssrInterpolate($setup.form.processing ? $setup.trans("Resetting...") : $setup.trans("Reset Password"))}</button></form><p class="text-center" data-v-d7da4c9f${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login")
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Back to Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</p></div></div></div></section>`);
      } else {
        return [
          createVNode(_component_PageHeader, {
            title: $setup.trans("Reset Password"),
            background: $setup.asset_path + "theme/img/main/32.jpg"
          }, null, 8, ["title", "background"]),
          createVNode("section", { class: "section-small" }, [
            createVNode("div", { class: "container" }, [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-4 col-md-offset-4" }, [
                  createVNode("h2", { class: "text-center" }, toDisplayString($setup.trans("Set New Password")), 1),
                  $setup.flash.success ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "alert alert-success"
                  }, toDisplayString($setup.flash.success), 1)) : createCommentVNode("", true),
                  $setup.flash.error ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "alert alert-danger"
                  }, toDisplayString($setup.flash.error), 1)) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("password.update")), ["prevent"])
                  }, [
                    createVNode("input", {
                      value: $setup.form.token,
                      name: "token",
                      type: "hidden"
                    }, null, 8, ["value"]),
                    createVNode("div", { class: "form-group" }, [
                      withDirectives(createVNode("input", {
                        id: "email",
                        class: "form-control input-lg",
                        "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                        type: "email",
                        autocomplete: "email",
                        placeholder: $setup.trans("Email"),
                        disabled: $setup.form.processing,
                        required: ""
                      }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                        [vModelText, $setup.form.email]
                      ]),
                      $props.errors.email ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "help-block text-danger"
                      }, toDisplayString($props.errors.email), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-group" }, [
                      withDirectives(createVNode("input", {
                        id: "password",
                        class: "form-control input-lg",
                        "onUpdate:modelValue": ($event) => $setup.form.password = $event,
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: $setup.trans("Password"),
                        disabled: $setup.form.processing,
                        required: ""
                      }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                        [vModelText, $setup.form.password]
                      ]),
                      $props.errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "help-block text-danger"
                      }, toDisplayString($props.errors.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-group" }, [
                      withDirectives(createVNode("input", {
                        id: "password_confirmation",
                        class: "form-control input-lg",
                        "onUpdate:modelValue": ($event) => $setup.form.password_confirmation = $event,
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: $setup.trans("Confirm Password"),
                        disabled: $setup.form.processing,
                        required: ""
                      }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                        [vModelText, $setup.form.password_confirmation]
                      ]),
                      $props.errors.password_confirmation ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "help-block text-danger"
                      }, toDisplayString($props.errors.password_confirmation), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      class: "btn btn-lg btn-dark btn-block",
                      type: "submit",
                      disabled: $setup.form.processing
                    }, toDisplayString($setup.form.processing ? $setup.trans("Resetting...") : $setup.trans("Reset Password")), 9, ["disabled"])
                  ], 40, ["onSubmit"]),
                  createVNode("p", { class: "text-center" }, [
                    createVNode(_component_Link, {
                      href: _ctx.route("login")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const ResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-d7da4c9f"]]);
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  components: {
    AppLayout: _sfc_main$Q,
    Head,
    PageHeader
  },
  setup() {
    const page = usePage();
    const useRecoveryCode = ref(false);
    const locale = computed(() => page.props.locale);
    const seo = computed(() => page.props.seo);
    const asset_path = computed(() => page.props.asset_path || "");
    const meta = computed(() => page.props.meta || {});
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e2) {
        return key;
      }
    };
    const metaTitle = computed(() => `${trans("Two-Factor Authentication")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => {
      return meta.value.description || trans("Please confirm access to your account by entering the authentication code provided by your authenticator application.");
    });
    const form = useForm({
      code: "",
      recovery_code: ""
    });
    const toggleRecovery = () => {
      useRecoveryCode.value = !useRecoveryCode.value;
      form.code = "";
      form.recovery_code = "";
      form.clearErrors();
    };
    const submit = () => {
      form.post(route("two-factor.login.store"), {
        preserveScroll: true
      });
    };
    return {
      form,
      locale,
      trans,
      asset_path,
      metaTitle,
      metaDescription,
      useRecoveryCode,
      toggleRecovery,
      submit
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_PageHeader = resolveComponent("PageHeader");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title${_scopeId}>${ssrInterpolate($setup.metaTitle)}</title><meta name="description"${ssrRenderAttr("content", $setup.metaDescription)}${_scopeId}><meta name="robots" content="noindex, nofollow"${_scopeId}>`);
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.metaTitle), 1),
          createVNode("meta", {
            name: "description",
            content: $setup.metaDescription
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "robots",
            content: "noindex, nofollow"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_PageHeader, {
          title: $setup.trans("Two-Factor Authentication"),
          background: $setup.asset_path + "theme/img/main/32.jpg"
        }, null, _parent2, _scopeId));
        _push2(`<section class="section-small"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-md-4 col-md-offset-4"${_scopeId}><h2 class="text-center"${_scopeId}>${ssrInterpolate($setup.trans("Two-Factor Authentication"))}</h2><p class="text-center"${_scopeId}>${ssrInterpolate($setup.trans("Please confirm access to your account by entering the authentication code provided by your authenticator application."))}</p><form${_scopeId}>`);
        if (!$setup.useRecoveryCode) {
          _push2(`<div class="form-group"${_scopeId}><input class="form-control input-lg"${ssrRenderAttr("value", $setup.form.code)} type="text" inputmode="numeric" autocomplete="one-time-code"${ssrRenderAttr("placeholder", $setup.trans("Authentication Code"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required autofocus${_scopeId}>`);
          if ($setup.form.errors.code) {
            _push2(`<p class="help-block text-danger"${_scopeId}>${ssrInterpolate($setup.form.errors.code)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<div class="form-group"${_scopeId}><input class="form-control input-lg"${ssrRenderAttr("value", $setup.form.recovery_code)} type="text" autocomplete="one-time-code"${ssrRenderAttr("placeholder", $setup.trans("Recovery Code"))}${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required autofocus${_scopeId}>`);
          if ($setup.form.errors.recovery_code) {
            _push2(`<p class="help-block text-danger"${_scopeId}>${ssrInterpolate($setup.form.errors.recovery_code)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        }
        _push2(`<p class="text-center"${_scopeId}><button type="button" class="btn btn-link"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate($setup.useRecoveryCode ? $setup.trans("Use an authentication code") : $setup.trans("Use a recovery code"))}</button></p><button class="btn btn-lg btn-dark btn-block" type="submit"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate($setup.form.processing ? $setup.trans("Signing In...") : $setup.trans("Login"))}</button></form></div></div></div></section>`);
      } else {
        return [
          createVNode(_component_PageHeader, {
            title: $setup.trans("Two-Factor Authentication"),
            background: $setup.asset_path + "theme/img/main/32.jpg"
          }, null, 8, ["title", "background"]),
          createVNode("section", { class: "section-small" }, [
            createVNode("div", { class: "container" }, [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-4 col-md-offset-4" }, [
                  createVNode("h2", { class: "text-center" }, toDisplayString($setup.trans("Two-Factor Authentication")), 1),
                  createVNode("p", { class: "text-center" }, toDisplayString($setup.trans("Please confirm access to your account by entering the authentication code provided by your authenticator application.")), 1),
                  createVNode("form", {
                    onSubmit: withModifiers($setup.submit, ["prevent"])
                  }, [
                    !$setup.useRecoveryCode ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "form-group"
                    }, [
                      withDirectives(createVNode("input", {
                        class: "form-control input-lg",
                        "onUpdate:modelValue": ($event) => $setup.form.code = $event,
                        type: "text",
                        inputmode: "numeric",
                        autocomplete: "one-time-code",
                        placeholder: $setup.trans("Authentication Code"),
                        disabled: $setup.form.processing,
                        required: "",
                        autofocus: ""
                      }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                        [vModelText, $setup.form.code]
                      ]),
                      $setup.form.errors.code ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "help-block text-danger"
                      }, toDisplayString($setup.form.errors.code), 1)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "form-group"
                    }, [
                      withDirectives(createVNode("input", {
                        class: "form-control input-lg",
                        "onUpdate:modelValue": ($event) => $setup.form.recovery_code = $event,
                        type: "text",
                        autocomplete: "one-time-code",
                        placeholder: $setup.trans("Recovery Code"),
                        disabled: $setup.form.processing,
                        required: "",
                        autofocus: ""
                      }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                        [vModelText, $setup.form.recovery_code]
                      ]),
                      $setup.form.errors.recovery_code ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "help-block text-danger"
                      }, toDisplayString($setup.form.errors.recovery_code), 1)) : createCommentVNode("", true)
                    ])),
                    createVNode("p", { class: "text-center" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-link",
                        disabled: $setup.form.processing,
                        onClick: $setup.toggleRecovery
                      }, toDisplayString($setup.useRecoveryCode ? $setup.trans("Use an authentication code") : $setup.trans("Use a recovery code")), 9, ["disabled", "onClick"])
                    ]),
                    createVNode("button", {
                      class: "btn btn-lg btn-dark btn-block",
                      type: "submit",
                      disabled: $setup.form.processing
                    }, toDisplayString($setup.form.processing ? $setup.trans("Signing In...") : $setup.trans("Login")), 9, ["disabled"])
                  ], 40, ["onSubmit"])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/TwoFactorChallenge.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const TwoFactorChallenge = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender]]);
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TwoFactorChallenge
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { positions: { type: Object, required: true } },
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const locale = computed(() => page.props.locale || "en");
    const asset_path = computed(() => page.props.asset_path || "");
    const metaTitle = computed(() => {
      var _a, _b;
      return ((_a = page.props.meta) == null ? void 0 : _a.title) || `${trans("Careers")} | ${((_b = page.props.seo) == null ? void 0 : _b.website_name) || page.props.appName}`;
    });
    const formatDate = (value) => new Intl.DateTimeFormat(locale.value, { year: "numeric", month: "long", day: "numeric" }).format(/* @__PURE__ */ new Date(`${value}T00:00:00`));
    const formatEmploymentType = (value) => trans(String(value || "").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: metaTitle.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: trans("Careers"),
              subtitle: trans("Join Our Team"),
              background: asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="jobs-page py-5" data-v-e2c626f1${_scopeId}><div class="container" data-v-e2c626f1${_scopeId}><div class="text-center mb-5" data-v-e2c626f1${_scopeId}><h2 data-v-e2c626f1${_scopeId}>${ssrInterpolate(trans("Join Our Team"))}</h2><p data-v-e2c626f1${_scopeId}>${ssrInterpolate(trans("Explore current opportunities and help us build technology in perfect harmony."))}</p></div><div class="row g-4" data-v-e2c626f1${_scopeId}><!--[-->`);
            ssrRenderList(__props.positions.data, (position) => {
              _push2(`<div class="col-lg-4 col-md-6" data-v-e2c626f1${_scopeId}><article class="job-card h-100" data-v-e2c626f1${_scopeId}><span class="job-card__department" data-v-e2c626f1${_scopeId}>${ssrInterpolate(position.department)}</span><h3 data-v-e2c626f1${_scopeId}>${ssrInterpolate(position.title)}</h3><p class="job-card__meta" data-v-e2c626f1${_scopeId}><span data-v-e2c626f1${_scopeId}><i class="fas fa-map-marker-alt" data-v-e2c626f1${_scopeId}></i>${ssrInterpolate(position.location)}</span><span data-v-e2c626f1${_scopeId}><i class="fas fa-briefcase" data-v-e2c626f1${_scopeId}></i>${ssrInterpolate(formatEmploymentType(position.employment_type))}</span></p><p class="text-muted" data-v-e2c626f1${_scopeId}>${ssrInterpolate(trans("Posted"))}: ${ssrInterpolate(formatDate(position.posted_at))}</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("jobs.show", position.slug),
                class: "btn btn-dark"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("View & Apply"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("View & Apply")), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</article></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.positions.data.length === 0) {
              _push2(`<div class="col-12 text-center py-5" data-v-e2c626f1${_scopeId}><p class="text-muted" data-v-e2c626f1${_scopeId}>${ssrInterpolate(trans("There are no open positions at the moment. Please check back soon."))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: trans("Careers"),
                subtitle: trans("Join Our Team"),
                background: asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", { class: "jobs-page py-5" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "text-center mb-5" }, [
                    createVNode("h2", null, toDisplayString(trans("Join Our Team")), 1),
                    createVNode("p", null, toDisplayString(trans("Explore current opportunities and help us build technology in perfect harmony.")), 1)
                  ]),
                  createVNode("div", { class: "row g-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.positions.data, (position) => {
                      return openBlock(), createBlock("div", {
                        key: position.id,
                        class: "col-lg-4 col-md-6"
                      }, [
                        createVNode("article", { class: "job-card h-100" }, [
                          createVNode("span", { class: "job-card__department" }, toDisplayString(position.department), 1),
                          createVNode("h3", null, toDisplayString(position.title), 1),
                          createVNode("p", { class: "job-card__meta" }, [
                            createVNode("span", null, [
                              createVNode("i", { class: "fas fa-map-marker-alt" }),
                              createTextVNode(toDisplayString(position.location), 1)
                            ]),
                            createVNode("span", null, [
                              createVNode("i", { class: "fas fa-briefcase" }),
                              createTextVNode(toDisplayString(formatEmploymentType(position.employment_type)), 1)
                            ])
                          ]),
                          createVNode("p", { class: "text-muted" }, toDisplayString(trans("Posted")) + ": " + toDisplayString(formatDate(position.posted_at)), 1),
                          createVNode(unref(Link), {
                            href: _ctx.route("jobs.show", position.slug),
                            class: "btn btn-dark"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(trans("View & Apply")), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ]);
                    }), 128)),
                    __props.positions.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-12 text-center py-5"
                    }, [
                      createVNode("p", { class: "text-muted" }, toDisplayString(trans("There are no open positions at the moment. Please check back soon.")), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Jobs/Index.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-e2c626f1"]]);
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = {
  __name: "Show",
  __ssrInlineRender: true,
  props: { position: { type: Object, required: true } },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const locale = computed(() => page.props.locale || "en");
    const asset_path = computed(() => page.props.asset_path || "");
    const success = ref(false);
    const metaTitle = computed(() => {
      var _a, _b;
      return ((_a = page.props.meta) == null ? void 0 : _a.title) || `${props.position.title} | ${((_b = page.props.seo) == null ? void 0 : _b.website_name) || page.props.appName}`;
    });
    const form = useForm({ full_name: "", email: "", phone: "", expected_salary: "", motivation: "", cover_letter: "", resume: null });
    const formatDate = (value) => new Intl.DateTimeFormat(locale.value, { year: "numeric", month: "long", day: "numeric" }).format(/* @__PURE__ */ new Date(`${value}T00:00:00`));
    const formatEmploymentType = (value) => trans(String(value || "").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()));
    const submit = () => form.post(route("jobs.apply", props.position.slug), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        success.value = true;
        form.reset();
      },
      onError: () => {
        success.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: metaTitle.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageHeader, {
              title: __props.position.title,
              subtitle: trans("Careers"),
              background: asset_path.value + "theme/img/main/30.jpg"
            }, null, _parent2, _scopeId));
            _push2(`<section class="job-detail py-5" data-v-8b3b42e6${_scopeId}><div class="container" data-v-8b3b42e6${_scopeId}><div class="row g-5" data-v-8b3b42e6${_scopeId}><div class="col-lg-7" data-v-8b3b42e6${_scopeId}><span class="job-department" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(__props.position.department)}</span><h2 class="mt-2" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(__props.position.title)}</h2><div class="job-meta mb-3" data-v-8b3b42e6${_scopeId}><span data-v-8b3b42e6${_scopeId}><i class="fas fa-map-marker-alt" data-v-8b3b42e6${_scopeId}></i>${ssrInterpolate(__props.position.location)}</span><span data-v-8b3b42e6${_scopeId}><i class="fas fa-briefcase" data-v-8b3b42e6${_scopeId}></i>${ssrInterpolate(formatEmploymentType(__props.position.employment_type))}</span></div><p class="text-muted" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Posted"))}: ${ssrInterpolate(formatDate(__props.position.posted_at))}</p><div class="job-content" data-v-8b3b42e6${_scopeId}><h3 data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("About the role"))}</h3><div class="job-rich-content" data-v-8b3b42e6${_scopeId}>${__props.position.description ?? ""}</div>`);
            if (__props.position.requirements) {
              _push2(`<!--[--><h3 data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Requirements"))}</h3><div class="job-rich-content" data-v-8b3b42e6${_scopeId}>${__props.position.requirements ?? ""}</div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-lg-5" data-v-8b3b42e6${_scopeId}><form class="job-form" data-v-8b3b42e6${_scopeId}><h3 class="job-form__title" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Apply for this role"))}</h3>`);
            if (success.value) {
              _push2(`<div class="alert alert-success" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Your application has been submitted successfully."))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-3" data-v-8b3b42e6${_scopeId}><label for="full_name" class="form-label" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Full Name"))} <span class="required-mark" data-v-8b3b42e6${_scopeId}>*</span></label><input id="full_name"${ssrRenderAttr("value", unref(form).full_name)} type="text" class="${ssrRenderClass([{ "is-invalid": unref(form).errors.full_name }, "form-control"])}" required data-v-8b3b42e6${_scopeId}><div class="invalid-feedback" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).errors.full_name)}</div></div><div class="mb-3" data-v-8b3b42e6${_scopeId}><label for="email" class="form-label" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Email"))} <span class="required-mark" data-v-8b3b42e6${_scopeId}>*</span></label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" class="${ssrRenderClass([{ "is-invalid": unref(form).errors.email }, "form-control"])}" required data-v-8b3b42e6${_scopeId}><div class="invalid-feedback" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</div></div><div class="mb-3" data-v-8b3b42e6${_scopeId}><label for="phone" class="form-label" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Phone"))} <span class="required-mark" data-v-8b3b42e6${_scopeId}>*</span></label><input id="phone"${ssrRenderAttr("value", unref(form).phone)} type="tel" class="${ssrRenderClass([{ "is-invalid": unref(form).errors.phone }, "form-control"])}" required data-v-8b3b42e6${_scopeId}><div class="invalid-feedback" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).errors.phone)}</div></div><div class="mb-3" data-v-8b3b42e6${_scopeId}><label for="expected_salary" class="form-label" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Expected Salary"))}</label><div class="input-group" data-v-8b3b42e6${_scopeId}><input id="expected_salary"${ssrRenderAttr("value", unref(form).expected_salary)} type="number" min="0" step="0.01" class="${ssrRenderClass([{ "is-invalid": unref(form).errors.expected_salary }, "form-control"])}" data-v-8b3b42e6${_scopeId}><span class="input-group-text" data-v-8b3b42e6${_scopeId}>USD</span></div><div class="invalid-feedback" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).errors.expected_salary)}</div></div><div class="mb-3" data-v-8b3b42e6${_scopeId}><label for="motivation" class="form-label" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Why do you want to work with us?"))} <span class="required-mark" data-v-8b3b42e6${_scopeId}>*</span></label><textarea id="motivation" rows="4" class="${ssrRenderClass([{ "is-invalid": unref(form).errors.motivation }, "form-control"])}" required data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).motivation)}</textarea><div class="invalid-feedback" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).errors.motivation)}</div></div><div class="mb-3" data-v-8b3b42e6${_scopeId}><label for="cover_letter" class="form-label" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Cover Letter"))}</label><textarea id="cover_letter" rows="5" class="${ssrRenderClass([{ "is-invalid": unref(form).errors.cover_letter }, "form-control"])}" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).cover_letter)}</textarea><div class="invalid-feedback" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).errors.cover_letter)}</div></div><div class="mb-4" data-v-8b3b42e6${_scopeId}><label for="resume" class="form-label" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Resume / CV"))} <span class="required-mark" data-v-8b3b42e6${_scopeId}>*</span></label><input id="resume" type="file" accept=".pdf,.doc,.docx" class="${ssrRenderClass([{ "is-invalid": unref(form).errors.resume }, "form-control"])}" required data-v-8b3b42e6${_scopeId}><div class="form-text" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(trans("Accepted file types: PDF, DOC, DOCX. Maximum size: 5 MB."))}</div><div class="invalid-feedback" data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).errors.resume)}</div></div><button class="btn btn-dark" type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-8b3b42e6${_scopeId}>${ssrInterpolate(unref(form).processing ? trans("Submitting...") : trans("Submit Application"))}</button></form></div></div></div></section>`);
          } else {
            return [
              createVNode(PageHeader, {
                title: __props.position.title,
                subtitle: trans("Careers"),
                background: asset_path.value + "theme/img/main/30.jpg"
              }, null, 8, ["title", "subtitle", "background"]),
              createVNode("section", { class: "job-detail py-5" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row g-5" }, [
                    createVNode("div", { class: "col-lg-7" }, [
                      createVNode("span", { class: "job-department" }, toDisplayString(__props.position.department), 1),
                      createVNode("h2", { class: "mt-2" }, toDisplayString(__props.position.title), 1),
                      createVNode("div", { class: "job-meta mb-3" }, [
                        createVNode("span", null, [
                          createVNode("i", { class: "fas fa-map-marker-alt" }),
                          createTextVNode(toDisplayString(__props.position.location), 1)
                        ]),
                        createVNode("span", null, [
                          createVNode("i", { class: "fas fa-briefcase" }),
                          createTextVNode(toDisplayString(formatEmploymentType(__props.position.employment_type)), 1)
                        ])
                      ]),
                      createVNode("p", { class: "text-muted" }, toDisplayString(trans("Posted")) + ": " + toDisplayString(formatDate(__props.position.posted_at)), 1),
                      createVNode("div", { class: "job-content" }, [
                        createVNode("h3", null, toDisplayString(trans("About the role")), 1),
                        createVNode("div", {
                          class: "job-rich-content",
                          innerHTML: __props.position.description
                        }, null, 8, ["innerHTML"]),
                        __props.position.requirements ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("h3", null, toDisplayString(trans("Requirements")), 1),
                          createVNode("div", {
                            class: "job-rich-content",
                            innerHTML: __props.position.requirements
                          }, null, 8, ["innerHTML"])
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-5" }, [
                      createVNode("form", {
                        class: "job-form",
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("h3", { class: "job-form__title" }, toDisplayString(trans("Apply for this role")), 1),
                        success.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "alert alert-success"
                        }, toDisplayString(trans("Your application has been submitted successfully.")), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "full_name",
                            class: "form-label"
                          }, [
                            createTextVNode(toDisplayString(trans("Full Name")) + " ", 1),
                            createVNode("span", { class: "required-mark" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "full_name",
                            "onUpdate:modelValue": ($event) => unref(form).full_name = $event,
                            type: "text",
                            class: ["form-control", { "is-invalid": unref(form).errors.full_name }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).full_name]
                          ]),
                          createVNode("div", { class: "invalid-feedback" }, toDisplayString(unref(form).errors.full_name), 1)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "email",
                            class: "form-label"
                          }, [
                            createTextVNode(toDisplayString(trans("Email")) + " ", 1),
                            createVNode("span", { class: "required-mark" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "email",
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            class: ["form-control", { "is-invalid": unref(form).errors.email }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ]),
                          createVNode("div", { class: "invalid-feedback" }, toDisplayString(unref(form).errors.email), 1)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "phone",
                            class: "form-label"
                          }, [
                            createTextVNode(toDisplayString(trans("Phone")) + " ", 1),
                            createVNode("span", { class: "required-mark" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "phone",
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                            type: "tel",
                            class: ["form-control", { "is-invalid": unref(form).errors.phone }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).phone]
                          ]),
                          createVNode("div", { class: "invalid-feedback" }, toDisplayString(unref(form).errors.phone), 1)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "expected_salary",
                            class: "form-label"
                          }, toDisplayString(trans("Expected Salary")), 1),
                          createVNode("div", { class: "input-group" }, [
                            withDirectives(createVNode("input", {
                              id: "expected_salary",
                              "onUpdate:modelValue": ($event) => unref(form).expected_salary = $event,
                              type: "number",
                              min: "0",
                              step: "0.01",
                              class: ["form-control", { "is-invalid": unref(form).errors.expected_salary }]
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).expected_salary]
                            ]),
                            createVNode("span", { class: "input-group-text" }, "USD")
                          ]),
                          createVNode("div", { class: "invalid-feedback" }, toDisplayString(unref(form).errors.expected_salary), 1)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "motivation",
                            class: "form-label"
                          }, [
                            createTextVNode(toDisplayString(trans("Why do you want to work with us?")) + " ", 1),
                            createVNode("span", { class: "required-mark" }, "*")
                          ]),
                          withDirectives(createVNode("textarea", {
                            id: "motivation",
                            "onUpdate:modelValue": ($event) => unref(form).motivation = $event,
                            rows: "4",
                            class: ["form-control", { "is-invalid": unref(form).errors.motivation }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).motivation]
                          ]),
                          createVNode("div", { class: "invalid-feedback" }, toDisplayString(unref(form).errors.motivation), 1)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "cover_letter",
                            class: "form-label"
                          }, toDisplayString(trans("Cover Letter")), 1),
                          withDirectives(createVNode("textarea", {
                            id: "cover_letter",
                            "onUpdate:modelValue": ($event) => unref(form).cover_letter = $event,
                            rows: "5",
                            class: ["form-control", { "is-invalid": unref(form).errors.cover_letter }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).cover_letter]
                          ]),
                          createVNode("div", { class: "invalid-feedback" }, toDisplayString(unref(form).errors.cover_letter), 1)
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", {
                            for: "resume",
                            class: "form-label"
                          }, [
                            createTextVNode(toDisplayString(trans("Resume / CV")) + " ", 1),
                            createVNode("span", { class: "required-mark" }, "*")
                          ]),
                          createVNode("input", {
                            id: "resume",
                            type: "file",
                            accept: ".pdf,.doc,.docx",
                            class: ["form-control", { "is-invalid": unref(form).errors.resume }],
                            required: "",
                            onChange: ($event) => unref(form).resume = $event.target.files[0]
                          }, null, 42, ["onChange"]),
                          createVNode("div", { class: "form-text" }, toDisplayString(trans("Accepted file types: PDF, DOC, DOCX. Maximum size: 5 MB.")), 1),
                          createVNode("div", { class: "invalid-feedback" }, toDisplayString(unref(form).errors.resume), 1)
                        ]),
                        createVNode("button", {
                          class: "btn btn-dark",
                          type: "submit",
                          disabled: unref(form).processing
                        }, toDisplayString(unref(form).processing ? trans("Submitting...") : trans("Submit Application")), 9, ["disabled"])
                      ], 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Jobs/Show.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-8b3b42e6"]]);
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const { t: t3 } = usePortalTranslations();
    const seo = computed(() => page.props.seo || {});
    const metaTitle = computed(() => `${t3("profile.confirm_password_title")} | ${seo.value.website_name || ""}`.trim());
    const metaDescription = computed(() => t3("profile.confirm_password_description"));
    const form = useForm({
      password: ""
    });
    const submit = () => {
      form.post(route("password.confirm.store"), {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: unref(t3)("profile.confirm_password_title"),
        subtitle: unref(t3)("profile.confirm_password_description"),
        active: "profile",
        breadcrumbs: [
          { label: unref(t3)("menu.profile"), href: _ctx.route("portal.profile.index") },
          { label: unref(t3)("profile.confirm_password_title") }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="portal-panel portal-panel--narrow"${_scopeId}><div class="portal-panel__body"${_scopeId}><form class="portal-profile-form"${_scopeId}><div class="portal-form-group"${_scopeId}><label for="password"${_scopeId}>${ssrInterpolate(unref(t3)("profile.current_password"))} *</label><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" class="${ssrRenderClass([{ "portal-input--error": unref(form).errors.password }, "portal-input"])}" required autofocus autocomplete="current-password"${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-profile-form__actions"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.profile.index"),
              class: "portal-panel__action"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t3)("profile.back_to_profile"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t3)("profile.back_to_profile")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit" class="thm-btn"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("profile.confirm_password_button"))}</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "portal-panel portal-panel--narrow" }, [
                createVNode("div", { class: "portal-panel__body" }, [
                  createVNode("form", {
                    class: "portal-profile-form",
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", { class: "portal-form-group" }, [
                      createVNode("label", { for: "password" }, toDisplayString(unref(t3)("profile.current_password")) + " *", 1),
                      withDirectives(createVNode("input", {
                        id: "password",
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        type: "password",
                        class: ["portal-input", { "portal-input--error": unref(form).errors.password }],
                        required: "",
                        autofocus: "",
                        autocomplete: "current-password"
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password]
                      ]),
                      unref(form).errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "portal-form-error"
                      }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "portal-profile-form__actions" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("portal.profile.index"),
                        class: "portal-panel__action"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t3)("profile.back_to_profile")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        class: "thm-btn",
                        disabled: unref(form).processing
                      }, toDisplayString(unref(t3)("profile.confirm_password_button")), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Portal/ConfirmPassword.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    projects: { type: Array, default: () => [] },
    stats: { type: Object, required: true },
    notifications: { type: Array, default: () => [] },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3 } = usePortalTranslations();
    const locale = computed(() => page.props.locale);
    const auth = computed(() => page.props.auth);
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || t3("pages.dashboard_title");
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.dashboard_description");
    });
    const welcomeSubtitle = computed(() => {
      var _a;
      return `${t3("dashboard.welcome", { name: (_a = auth.value) == null ? void 0 : _a.name })} — ${t3("dashboard.subtitle")}`;
    });
    const formatMoney = (amount, currency) => `${Number(amount).toFixed(2)} ${currency || ""}`.trim();
    const markAllRead = () => router.post(route("portal.notifications.read-all"));
    const openNotification = (notification) => router.post(route("portal.notifications.read", notification.id));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: unref(t3)("menu.my_dashboard"),
        subtitle: welcomeSubtitle.value,
        active: "dashboard",
        breadcrumbs: [{ label: unref(t3)("menu.my_dashboard") }],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="portal-stats"${_scopeId}><div class="portal-stat"${_scopeId}><span class="portal-stat__icon"${_scopeId}><i class="fas fa-briefcase"${_scopeId}></i></span><span class="portal-stat__label"${_scopeId}>${ssrInterpolate(unref(t3)("dashboard.total_projects"))}</span><span class="portal-stat__value"${_scopeId}>${ssrInterpolate(__props.stats.total_projects)}</span></div><div class="portal-stat"${_scopeId}><span class="portal-stat__icon"${_scopeId}><i class="fas fa-spinner"${_scopeId}></i></span><span class="portal-stat__label"${_scopeId}>${ssrInterpolate(unref(t3)("dashboard.active_projects"))}</span><span class="portal-stat__value"${_scopeId}>${ssrInterpolate(__props.stats.active_projects)}</span></div><div class="portal-stat"${_scopeId}><span class="portal-stat__icon"${_scopeId}><i class="fas fa-bell"${_scopeId}></i></span><span class="portal-stat__label"${_scopeId}>${ssrInterpolate(unref(t3)("menu.notifications"))}</span><span class="portal-stat__value"${_scopeId}>${ssrInterpolate(__props.stats.unread_notifications)}</span></div></div><div class="row g-4"${_scopeId}><div class="col-lg-7"${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("dashboard.recent_projects"))}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.projects.index"),
              class: "portal-panel__action"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t3)("dashboard.view_all_projects"))} <i class="${ssrRenderClass(`fas fa-arrow-${locale.value === "ar" ? "left" : "right"}`)}"${_scopeId2}></i>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t3)("dashboard.view_all_projects")) + " ", 1),
                    createVNode("i", {
                      class: `fas fa-arrow-${locale.value === "ar" ? "left" : "right"}`
                    }, null, 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="portal-panel__body"${_scopeId}>`);
            if (__props.projects.length === 0) {
              _push2(`<div class="portal-empty"${_scopeId}><i class="fas fa-folder-open"${_scopeId}></i> ${ssrInterpolate(unref(t3)("dashboard.no_projects"))}</div>`);
            } else {
              _push2(`<div class="portal-table-wrap"${_scopeId}><table class="portal-table"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>${ssrInterpolate(unref(t3)("fields.status"))}</th><th${_scopeId}>${ssrInterpolate(unref(t3)("projects.title"))}</th><th${_scopeId}>${ssrInterpolate(unref(t3)("fields.remaining"))}</th><th${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.projects, (project) => {
                var _a, _b, _c;
                _push2(`<tr${_scopeId}><td${_scopeId}><span class="portal-badge" style="${ssrRenderStyle({ backgroundColor: (((_a = project.status) == null ? void 0 : _a.color_code) || "#6c757d") + "33", color: ((_b = project.status) == null ? void 0 : _b.color_code) || "#C5C8CD" })}"${_scopeId}>${ssrInterpolate((_c = project.status) == null ? void 0 : _c.name)}</span></td><td${_scopeId}>${ssrInterpolate(project.title)}</td><td${_scopeId}>${ssrInterpolate(formatMoney(project.collection.remaining, project.collection.currency))}</td><td class="text-end"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("portal.projects.show", project.id),
                  class: "thm-btn",
                  style: { "padding": "10px 20px", "font-size": "14px" }
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t3)("projects.view_details"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t3)("projects.view_details")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`</div></div></div><div class="col-lg-5"${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("dashboard.recent_notifications"))}</h2>`);
            if (__props.notifications.length) {
              _push2(`<button type="button" class="portal-link-muted"${_scopeId}>${ssrInterpolate(unref(t3)("notifications.mark_all_read"))}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-panel__body"${_scopeId}>`);
            if (__props.notifications.length === 0) {
              _push2(`<div class="portal-empty"${_scopeId}><i class="fas fa-bell-slash"${_scopeId}></i> ${ssrInterpolate(unref(t3)("dashboard.no_notifications"))}</div>`);
            } else {
              _push2(`<div class="portal-notifications"${_scopeId}><!--[-->`);
              ssrRenderList(__props.notifications, (notification) => {
                _push2(`<button type="button" class="${ssrRenderClass([{ "portal-notification--unread": !notification.read_at }, "portal-notification"])}"${_scopeId}><div class="portal-notification__inner"${_scopeId}><span class="portal-notification__dot"${_scopeId}></span><div${_scopeId}><div class="portal-notification__message"${_scopeId}>${ssrInterpolate(notification.message)}</div><div class="portal-notification__time"${_scopeId}>${ssrInterpolate(notification.created_at)}</div></div></div></button>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "portal-stats" }, [
                createVNode("div", { class: "portal-stat" }, [
                  createVNode("span", { class: "portal-stat__icon" }, [
                    createVNode("i", { class: "fas fa-briefcase" })
                  ]),
                  createVNode("span", { class: "portal-stat__label" }, toDisplayString(unref(t3)("dashboard.total_projects")), 1),
                  createVNode("span", { class: "portal-stat__value" }, toDisplayString(__props.stats.total_projects), 1)
                ]),
                createVNode("div", { class: "portal-stat" }, [
                  createVNode("span", { class: "portal-stat__icon" }, [
                    createVNode("i", { class: "fas fa-spinner" })
                  ]),
                  createVNode("span", { class: "portal-stat__label" }, toDisplayString(unref(t3)("dashboard.active_projects")), 1),
                  createVNode("span", { class: "portal-stat__value" }, toDisplayString(__props.stats.active_projects), 1)
                ]),
                createVNode("div", { class: "portal-stat" }, [
                  createVNode("span", { class: "portal-stat__icon" }, [
                    createVNode("i", { class: "fas fa-bell" })
                  ]),
                  createVNode("span", { class: "portal-stat__label" }, toDisplayString(unref(t3)("menu.notifications")), 1),
                  createVNode("span", { class: "portal-stat__value" }, toDisplayString(__props.stats.unread_notifications), 1)
                ])
              ]),
              createVNode("div", { class: "row g-4" }, [
                createVNode("div", { class: "col-lg-7" }, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("dashboard.recent_projects")), 1),
                      createVNode(unref(Link), {
                        href: _ctx.route("portal.projects.index"),
                        class: "portal-panel__action"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t3)("dashboard.view_all_projects")) + " ", 1),
                          createVNode("i", {
                            class: `fas fa-arrow-${locale.value === "ar" ? "left" : "right"}`
                          }, null, 2)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      __props.projects.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-empty"
                      }, [
                        createVNode("i", { class: "fas fa-folder-open" }),
                        createTextVNode(" " + toDisplayString(unref(t3)("dashboard.no_projects")), 1)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "portal-table-wrap"
                      }, [
                        createVNode("table", { class: "portal-table" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", null, toDisplayString(unref(t3)("fields.status")), 1),
                              createVNode("th", null, toDisplayString(unref(t3)("projects.title")), 1),
                              createVNode("th", null, toDisplayString(unref(t3)("fields.remaining")), 1),
                              createVNode("th")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project) => {
                              var _a, _b, _c;
                              return openBlock(), createBlock("tr", {
                                key: project.id
                              }, [
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: "portal-badge",
                                    style: { backgroundColor: (((_a = project.status) == null ? void 0 : _a.color_code) || "#6c757d") + "33", color: ((_b = project.status) == null ? void 0 : _b.color_code) || "#C5C8CD" }
                                  }, toDisplayString((_c = project.status) == null ? void 0 : _c.name), 5)
                                ]),
                                createVNode("td", null, toDisplayString(project.title), 1),
                                createVNode("td", null, toDisplayString(formatMoney(project.collection.remaining, project.collection.currency)), 1),
                                createVNode("td", { class: "text-end" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("portal.projects.show", project.id),
                                    class: "thm-btn",
                                    style: { "padding": "10px 20px", "font-size": "14px" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t3)("projects.view_details")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]))
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-lg-5" }, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("dashboard.recent_notifications")), 1),
                      __props.notifications.length ? (openBlock(), createBlock("button", {
                        key: 0,
                        type: "button",
                        class: "portal-link-muted",
                        onClick: markAllRead
                      }, toDisplayString(unref(t3)("notifications.mark_all_read")), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      __props.notifications.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-empty"
                      }, [
                        createVNode("i", { class: "fas fa-bell-slash" }),
                        createTextVNode(" " + toDisplayString(unref(t3)("dashboard.no_notifications")), 1)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "portal-notifications"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications, (notification) => {
                          return openBlock(), createBlock("button", {
                            key: notification.id,
                            type: "button",
                            class: ["portal-notification", { "portal-notification--unread": !notification.read_at }],
                            onClick: ($event) => openNotification(notification)
                          }, [
                            createVNode("div", { class: "portal-notification__inner" }, [
                              createVNode("span", { class: "portal-notification__dot" }),
                              createVNode("div", null, [
                                createVNode("div", { class: "portal-notification__message" }, toDisplayString(notification.message), 1),
                                createVNode("div", { class: "portal-notification__time" }, toDisplayString(notification.created_at), 1)
                              ])
                            ])
                          ], 10, ["onClick"]);
                        }), 128))
                      ]))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Portal/Dashboard.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    user: { type: Object, required: true },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorPending: { type: Boolean, default: false },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3 } = usePortalTranslations();
    const flash = computed(() => page.props.flash || {});
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || t3("pages.profile_title");
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.profile_description");
    });
    const avatarPreview = ref(null);
    const twoFactorLoading = ref(false);
    const twoFactorError = ref("");
    const qrSvg = ref("");
    const recoveryCodes = ref([]);
    const twoFactorCode = ref("");
    const profileForm = useForm({
      name: props.user.name,
      email: props.user.email,
      mobile: props.user.mobile || "",
      avatar: null
    });
    const passwordForm = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const onAvatarChange = (event) => {
      const file = event.target.files[0] || null;
      profileForm.avatar = file;
      if (file) {
        avatarPreview.value = URL.createObjectURL(file);
      }
    };
    const clearAvatar = () => {
      profileForm.avatar = null;
      avatarPreview.value = null;
    };
    const submitProfile = () => {
      profileForm.post(route("portal.profile.update"), {
        forceFormData: true,
        preserveScroll: true
      });
    };
    const submitPassword = () => {
      passwordForm.put(route("portal.profile.password"), {
        preserveScroll: true,
        onSuccess: () => passwordForm.reset()
      });
    };
    const fortifyHeaders = () => ({
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": page.props.csrf
    });
    const loadQrCode = async () => {
      twoFactorLoading.value = true;
      twoFactorError.value = "";
      try {
        const response = await fetch(route("two-factor.qr-code"), {
          headers: fortifyHeaders(),
          credentials: "same-origin"
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        qrSvg.value = data.svg || "";
      } catch (error) {
        twoFactorError.value = t3("profile.two_factor_error");
      } finally {
        twoFactorLoading.value = false;
      }
    };
    const loadRecoveryCodes = async () => {
      twoFactorLoading.value = true;
      twoFactorError.value = "";
      try {
        const response = await fetch(route("two-factor.recovery-codes"), {
          headers: fortifyHeaders(),
          credentials: "same-origin"
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        recoveryCodes.value = data.recoveryCodes || [];
      } catch (error) {
        twoFactorError.value = t3("profile.two_factor_error");
      } finally {
        twoFactorLoading.value = false;
      }
    };
    const enableTwoFactor = () => {
      twoFactorLoading.value = true;
      twoFactorError.value = "";
      router.post(route("two-factor.enable"), {}, {
        preserveScroll: true,
        onFinish: () => {
          twoFactorLoading.value = false;
        },
        onError: () => {
          twoFactorError.value = t3("profile.two_factor_error");
        }
      });
    };
    const disableTwoFactor = () => {
      if (!window.confirm(t3("profile.disable_confirm"))) {
        return;
      }
      twoFactorLoading.value = true;
      twoFactorError.value = "";
      router.delete(route("two-factor.disable"), {
        preserveScroll: true,
        onFinish: () => {
          twoFactorLoading.value = false;
          qrSvg.value = "";
          recoveryCodes.value = [];
          twoFactorCode.value = "";
        },
        onError: () => {
          twoFactorError.value = t3("profile.two_factor_error");
        }
      });
    };
    const confirmTwoFactor = () => {
      twoFactorLoading.value = true;
      twoFactorError.value = "";
      router.post(route("two-factor.confirm"), { code: twoFactorCode.value }, {
        preserveScroll: true,
        onSuccess: () => {
          twoFactorCode.value = "";
          loadQrCode();
        },
        onFinish: () => {
          twoFactorLoading.value = false;
        },
        onError: () => {
          twoFactorError.value = t3("profile.confirm_code_error");
        }
      });
    };
    if (props.twoFactorPending) {
      loadQrCode();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: unref(t3)("profile.title"),
        subtitle: unref(t3)("profile.subtitle"),
        active: "profile",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("profile.title") }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (flash.value.success) {
              _push2(`<div class="portal-alert portal-alert--success" role="alert"${_scopeId}><i class="fas fa-check-circle"${_scopeId}></i> ${ssrInterpolate(flash.value.success)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-4"${_scopeId}><div class="col-lg-6"${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("profile.information"))}</h2></div><div class="portal-panel__body"${_scopeId}><form class="portal-profile-form"${_scopeId}><div class="portal-profile-avatar"${_scopeId}><div class="portal-profile-avatar__preview"${_scopeId}><img${ssrRenderAttr("src", avatarPreview.value || __props.user.avatar)}${ssrRenderAttr("alt", unref(t3)("profile.avatar"))}${_scopeId}></div><div class="portal-profile-avatar__actions"${_scopeId}><label class="portal-profile-avatar__upload thm-btn thm-btn--sm"${_scopeId}><i class="fas fa-camera"${_scopeId}></i> ${ssrInterpolate(unref(t3)("profile.change_photo"))} <input type="file" accept="image/jpeg,image/png,image/jpg,image/webp" class="d-none"${_scopeId}></label>`);
            if (avatarPreview.value) {
              _push2(`<button type="button" class="portal-panel__action"${_scopeId}>${ssrInterpolate(unref(t3)("profile.remove_photo"))}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(profileForm).errors.avatar) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.avatar)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-group"${_scopeId}><label for="profile-name"${_scopeId}>${ssrInterpolate(unref(t3)("profile.name"))} *</label><input id="profile-name"${ssrRenderAttr("value", unref(profileForm).name)} type="text" class="${ssrRenderClass([{ "portal-input--error": unref(profileForm).errors.name }, "portal-input"])}" required${_scopeId}>`);
            if (unref(profileForm).errors.name) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-group"${_scopeId}><label for="profile-email"${_scopeId}>${ssrInterpolate(unref(t3)("profile.email"))} *</label><input id="profile-email"${ssrRenderAttr("value", unref(profileForm).email)} type="email" class="${ssrRenderClass([{ "portal-input--error": unref(profileForm).errors.email }, "portal-input"])}" required${_scopeId}>`);
            if (unref(profileForm).errors.email) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-group"${_scopeId}><label for="profile-mobile"${_scopeId}>${ssrInterpolate(unref(t3)("profile.mobile"))}</label><input id="profile-mobile"${ssrRenderAttr("value", unref(profileForm).mobile)} type="text" class="${ssrRenderClass([{ "portal-input--error": unref(profileForm).errors.mobile }, "portal-input"])}"${_scopeId}>`);
            if (unref(profileForm).errors.mobile) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.mobile)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-profile-form__actions"${_scopeId}><button type="submit" class="thm-btn"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("profile.save_changes"))}</button></div></form></div></div></div><div class="col-lg-6"${_scopeId}><div class="portal-panel mb-4"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("profile.change_password"))}</h2></div><div class="portal-panel__body"${_scopeId}><form class="portal-profile-form"${_scopeId}><div class="portal-form-group"${_scopeId}><label for="current-password"${_scopeId}>${ssrInterpolate(unref(t3)("profile.current_password"))} *</label><input id="current-password"${ssrRenderAttr("value", unref(passwordForm).current_password)} type="password" class="${ssrRenderClass([{ "portal-input--error": unref(passwordForm).errors.current_password }, "portal-input"])}" required autocomplete="current-password"${_scopeId}>`);
            if (unref(passwordForm).errors.current_password) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(passwordForm).errors.current_password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-group"${_scopeId}><label for="new-password"${_scopeId}>${ssrInterpolate(unref(t3)("profile.new_password"))} *</label><input id="new-password"${ssrRenderAttr("value", unref(passwordForm).password)} type="password" class="${ssrRenderClass([{ "portal-input--error": unref(passwordForm).errors.password }, "portal-input"])}" required autocomplete="new-password"${_scopeId}>`);
            if (unref(passwordForm).errors.password) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(unref(passwordForm).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="portal-form-group"${_scopeId}><label for="confirm-password"${_scopeId}>${ssrInterpolate(unref(t3)("profile.confirm_password"))} *</label><input id="confirm-password"${ssrRenderAttr("value", unref(passwordForm).password_confirmation)} type="password" class="portal-input" required autocomplete="new-password"${_scopeId}></div><div class="portal-profile-form__actions"${_scopeId}><button type="submit" class="thm-btn"${ssrIncludeBooleanAttr(unref(passwordForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("profile.update_password"))}</button></div></form></div></div><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("profile.two_factor"))}</h2></div><div class="portal-panel__body"${_scopeId}><p class="portal-profile-2fa__text"${_scopeId}>${ssrInterpolate(unref(t3)("profile.two_factor_description"))}</p>`);
            if (__props.twoFactorEnabled) {
              _push2(`<div class="portal-profile-2fa__status"${_scopeId}><span class="portal-badge portal-badge--paid"${_scopeId}>${ssrInterpolate(unref(t3)("profile.two_factor_enabled"))}</span></div>`);
            } else if (__props.twoFactorPending) {
              _push2(`<div class="portal-profile-2fa__status"${_scopeId}><span class="portal-badge portal-badge--invoice"${_scopeId}>${ssrInterpolate(unref(t3)("profile.two_factor_pending"))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.twoFactorEnabled || __props.twoFactorPending) {
              _push2(`<div class="portal-profile-2fa__tools"${_scopeId}><button type="button" class="portal-panel__action"${ssrIncludeBooleanAttr(twoFactorLoading.value) ? " disabled" : ""}${_scopeId}><i class="fas fa-qrcode"${_scopeId}></i> ${ssrInterpolate(unref(t3)("profile.show_qr"))}</button>`);
              if (__props.twoFactorEnabled) {
                _push2(`<button type="button" class="portal-panel__action"${ssrIncludeBooleanAttr(twoFactorLoading.value) ? " disabled" : ""}${_scopeId}><i class="fas fa-key"${_scopeId}></i> ${ssrInterpolate(unref(t3)("profile.show_recovery_codes"))}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (qrSvg.value) {
              _push2(`<div class="portal-profile-2fa__qr"${_scopeId}>${qrSvg.value ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (recoveryCodes.value.length) {
              _push2(`<div class="portal-profile-2fa__codes"${_scopeId}><p class="portal-form-hint"${_scopeId}>${ssrInterpolate(unref(t3)("profile.recovery_codes_hint"))}</p><ul${_scopeId}><!--[-->`);
              ssrRenderList(recoveryCodes.value, (code) => {
                _push2(`<li${_scopeId}><code${_scopeId}>${ssrInterpolate(code)}</code></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.twoFactorPending) {
              _push2(`<form class="portal-profile-2fa__confirm"${_scopeId}><div class="portal-form-group"${_scopeId}><label for="two-factor-code"${_scopeId}>${ssrInterpolate(unref(t3)("profile.confirm_code"))} *</label><input id="two-factor-code"${ssrRenderAttr("value", twoFactorCode.value)} type="text" inputmode="numeric" maxlength="6" class="portal-input"${ssrRenderAttr("placeholder", unref(t3)("profile.confirm_code_placeholder"))} required${_scopeId}></div><button type="submit" class="thm-btn thm-btn--sm"${ssrIncludeBooleanAttr(twoFactorLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("profile.confirm_two_factor"))}</button></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (twoFactorError.value) {
              _push2(`<p class="portal-form-error"${_scopeId}>${ssrInterpolate(twoFactorError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="portal-profile-2fa__actions"${_scopeId}>`);
            if (__props.twoFactorEnabled || __props.twoFactorPending) {
              _push2(`<button type="button" class="portal-profile-2fa__disable"${ssrIncludeBooleanAttr(twoFactorLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("profile.disable_two_factor"))}</button>`);
            } else {
              _push2(`<button type="button" class="thm-btn"${ssrIncludeBooleanAttr(twoFactorLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(t3)("profile.enable_two_factor"))}</button>`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              flash.value.success ? (openBlock(), createBlock("div", {
                key: 0,
                class: "portal-alert portal-alert--success",
                role: "alert"
              }, [
                createVNode("i", { class: "fas fa-check-circle" }),
                createTextVNode(" " + toDisplayString(flash.value.success), 1)
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "row g-4" }, [
                createVNode("div", { class: "col-lg-6" }, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("profile.information")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("form", {
                        class: "portal-profile-form",
                        onSubmit: withModifiers(submitProfile, ["prevent"])
                      }, [
                        createVNode("div", { class: "portal-profile-avatar" }, [
                          createVNode("div", { class: "portal-profile-avatar__preview" }, [
                            createVNode("img", {
                              src: avatarPreview.value || __props.user.avatar,
                              alt: unref(t3)("profile.avatar")
                            }, null, 8, ["src", "alt"])
                          ]),
                          createVNode("div", { class: "portal-profile-avatar__actions" }, [
                            createVNode("label", { class: "portal-profile-avatar__upload thm-btn thm-btn--sm" }, [
                              createVNode("i", { class: "fas fa-camera" }),
                              createTextVNode(" " + toDisplayString(unref(t3)("profile.change_photo")) + " ", 1),
                              createVNode("input", {
                                type: "file",
                                accept: "image/jpeg,image/png,image/jpg,image/webp",
                                class: "d-none",
                                onChange: onAvatarChange
                              }, null, 32)
                            ]),
                            avatarPreview.value ? (openBlock(), createBlock("button", {
                              key: 0,
                              type: "button",
                              class: "portal-panel__action",
                              onClick: clearAvatar
                            }, toDisplayString(unref(t3)("profile.remove_photo")), 1)) : createCommentVNode("", true)
                          ]),
                          unref(profileForm).errors.avatar ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "portal-form-error"
                          }, toDisplayString(unref(profileForm).errors.avatar), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "portal-form-group" }, [
                          createVNode("label", { for: "profile-name" }, toDisplayString(unref(t3)("profile.name")) + " *", 1),
                          withDirectives(createVNode("input", {
                            id: "profile-name",
                            "onUpdate:modelValue": ($event) => unref(profileForm).name = $event,
                            type: "text",
                            class: ["portal-input", { "portal-input--error": unref(profileForm).errors.name }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).name]
                          ]),
                          unref(profileForm).errors.name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "portal-form-error"
                          }, toDisplayString(unref(profileForm).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "portal-form-group" }, [
                          createVNode("label", { for: "profile-email" }, toDisplayString(unref(t3)("profile.email")) + " *", 1),
                          withDirectives(createVNode("input", {
                            id: "profile-email",
                            "onUpdate:modelValue": ($event) => unref(profileForm).email = $event,
                            type: "email",
                            class: ["portal-input", { "portal-input--error": unref(profileForm).errors.email }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).email]
                          ]),
                          unref(profileForm).errors.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "portal-form-error"
                          }, toDisplayString(unref(profileForm).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "portal-form-group" }, [
                          createVNode("label", { for: "profile-mobile" }, toDisplayString(unref(t3)("profile.mobile")), 1),
                          withDirectives(createVNode("input", {
                            id: "profile-mobile",
                            "onUpdate:modelValue": ($event) => unref(profileForm).mobile = $event,
                            type: "text",
                            class: ["portal-input", { "portal-input--error": unref(profileForm).errors.mobile }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).mobile]
                          ]),
                          unref(profileForm).errors.mobile ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "portal-form-error"
                          }, toDisplayString(unref(profileForm).errors.mobile), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "portal-profile-form__actions" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "thm-btn",
                            disabled: unref(profileForm).processing
                          }, toDisplayString(unref(t3)("profile.save_changes")), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-lg-6" }, [
                  createVNode("div", { class: "portal-panel mb-4" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("profile.change_password")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("form", {
                        class: "portal-profile-form",
                        onSubmit: withModifiers(submitPassword, ["prevent"])
                      }, [
                        createVNode("div", { class: "portal-form-group" }, [
                          createVNode("label", { for: "current-password" }, toDisplayString(unref(t3)("profile.current_password")) + " *", 1),
                          withDirectives(createVNode("input", {
                            id: "current-password",
                            "onUpdate:modelValue": ($event) => unref(passwordForm).current_password = $event,
                            type: "password",
                            class: ["portal-input", { "portal-input--error": unref(passwordForm).errors.current_password }],
                            required: "",
                            autocomplete: "current-password"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(passwordForm).current_password]
                          ]),
                          unref(passwordForm).errors.current_password ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "portal-form-error"
                          }, toDisplayString(unref(passwordForm).errors.current_password), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "portal-form-group" }, [
                          createVNode("label", { for: "new-password" }, toDisplayString(unref(t3)("profile.new_password")) + " *", 1),
                          withDirectives(createVNode("input", {
                            id: "new-password",
                            "onUpdate:modelValue": ($event) => unref(passwordForm).password = $event,
                            type: "password",
                            class: ["portal-input", { "portal-input--error": unref(passwordForm).errors.password }],
                            required: "",
                            autocomplete: "new-password"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(passwordForm).password]
                          ]),
                          unref(passwordForm).errors.password ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "portal-form-error"
                          }, toDisplayString(unref(passwordForm).errors.password), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "portal-form-group" }, [
                          createVNode("label", { for: "confirm-password" }, toDisplayString(unref(t3)("profile.confirm_password")) + " *", 1),
                          withDirectives(createVNode("input", {
                            id: "confirm-password",
                            "onUpdate:modelValue": ($event) => unref(passwordForm).password_confirmation = $event,
                            type: "password",
                            class: "portal-input",
                            required: "",
                            autocomplete: "new-password"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(passwordForm).password_confirmation]
                          ])
                        ]),
                        createVNode("div", { class: "portal-profile-form__actions" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "thm-btn",
                            disabled: unref(passwordForm).processing
                          }, toDisplayString(unref(t3)("profile.update_password")), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("profile.two_factor")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("p", { class: "portal-profile-2fa__text" }, toDisplayString(unref(t3)("profile.two_factor_description")), 1),
                      __props.twoFactorEnabled ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-profile-2fa__status"
                      }, [
                        createVNode("span", { class: "portal-badge portal-badge--paid" }, toDisplayString(unref(t3)("profile.two_factor_enabled")), 1)
                      ])) : __props.twoFactorPending ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "portal-profile-2fa__status"
                      }, [
                        createVNode("span", { class: "portal-badge portal-badge--invoice" }, toDisplayString(unref(t3)("profile.two_factor_pending")), 1)
                      ])) : createCommentVNode("", true),
                      __props.twoFactorEnabled || __props.twoFactorPending ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "portal-profile-2fa__tools"
                      }, [
                        createVNode("button", {
                          type: "button",
                          class: "portal-panel__action",
                          disabled: twoFactorLoading.value,
                          onClick: loadQrCode
                        }, [
                          createVNode("i", { class: "fas fa-qrcode" }),
                          createTextVNode(" " + toDisplayString(unref(t3)("profile.show_qr")), 1)
                        ], 8, ["disabled"]),
                        __props.twoFactorEnabled ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          class: "portal-panel__action",
                          disabled: twoFactorLoading.value,
                          onClick: loadRecoveryCodes
                        }, [
                          createVNode("i", { class: "fas fa-key" }),
                          createTextVNode(" " + toDisplayString(unref(t3)("profile.show_recovery_codes")), 1)
                        ], 8, ["disabled"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      qrSvg.value ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "portal-profile-2fa__qr",
                        innerHTML: qrSvg.value
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      recoveryCodes.value.length ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "portal-profile-2fa__codes"
                      }, [
                        createVNode("p", { class: "portal-form-hint" }, toDisplayString(unref(t3)("profile.recovery_codes_hint")), 1),
                        createVNode("ul", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(recoveryCodes.value, (code) => {
                            return openBlock(), createBlock("li", { key: code }, [
                              createVNode("code", null, toDisplayString(code), 1)
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      __props.twoFactorPending ? (openBlock(), createBlock("form", {
                        key: 5,
                        class: "portal-profile-2fa__confirm",
                        onSubmit: withModifiers(confirmTwoFactor, ["prevent"])
                      }, [
                        createVNode("div", { class: "portal-form-group" }, [
                          createVNode("label", { for: "two-factor-code" }, toDisplayString(unref(t3)("profile.confirm_code")) + " *", 1),
                          withDirectives(createVNode("input", {
                            id: "two-factor-code",
                            "onUpdate:modelValue": ($event) => twoFactorCode.value = $event,
                            type: "text",
                            inputmode: "numeric",
                            maxlength: "6",
                            class: "portal-input",
                            placeholder: unref(t3)("profile.confirm_code_placeholder"),
                            required: ""
                          }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                            [vModelText, twoFactorCode.value]
                          ])
                        ]),
                        createVNode("button", {
                          type: "submit",
                          class: "thm-btn thm-btn--sm",
                          disabled: twoFactorLoading.value
                        }, toDisplayString(unref(t3)("profile.confirm_two_factor")), 9, ["disabled"])
                      ], 32)) : createCommentVNode("", true),
                      twoFactorError.value ? (openBlock(), createBlock("p", {
                        key: 6,
                        class: "portal-form-error"
                      }, toDisplayString(twoFactorError.value), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "portal-profile-2fa__actions" }, [
                        __props.twoFactorEnabled || __props.twoFactorPending ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          class: "portal-profile-2fa__disable",
                          disabled: twoFactorLoading.value,
                          onClick: disableTwoFactor
                        }, toDisplayString(unref(t3)("profile.disable_two_factor")), 9, ["disabled"])) : (openBlock(), createBlock("button", {
                          key: 1,
                          type: "button",
                          class: "thm-btn",
                          disabled: twoFactorLoading.value,
                          onClick: enableTwoFactor
                        }, toDisplayString(unref(t3)("profile.enable_two_factor")), 9, ["disabled"]))
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Portal/Profile.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    subscriptions: { type: Object, required: true },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { t: t3 } = usePortalTranslations();
    const locale = computed(() => page.props.locale);
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || t3("pages.subscriptions_title");
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.subscriptions_description");
    });
    const formatMoney = (amount, currency) => `${Number(amount ?? 0).toFixed(2)} ${currency || ""}`.trim();
    const subscriptionBadgeClass = (status) => {
      if (status === "active" || status === "trial") return "portal-badge--paid";
      if (status === "cancelled" || status === "expired") return "portal-badge--overdue";
      return "portal-badge--invoice";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: unref(t3)("subscriptions.title"),
        subtitle: unref(t3)("subscriptions.subtitle"),
        active: "subscriptions",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("subscriptions.title") }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (__props.subscriptions.data.length === 0) {
              _push2(`<div class="portal-panel"${_scopeId}><div class="portal-empty"${_scopeId}><i class="fas fa-sync-alt"${_scopeId}></i> ${ssrInterpolate(unref(t3)("subscriptions.no_subscriptions"))}</div></div>`);
            } else {
              _push2(`<div class="row g-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.subscriptions.data, (subscription) => {
                var _a2;
                _push2(`<div class="col-md-6 col-xl-4"${_scopeId}><article class="portal-project-card"${_scopeId}><div class="portal-project-card__top"${_scopeId}><h3 class="portal-project-card__title"${_scopeId}>${ssrInterpolate(subscription.name)}</h3><span class="${ssrRenderClass([subscriptionBadgeClass(subscription.status), "portal-badge"])}"${_scopeId}>${ssrInterpolate(subscription.status_label)}</span></div>`);
                if ((_a2 = subscription.company) == null ? void 0 : _a2.name) {
                  _push2(`<div class="portal-project-card__company"${_scopeId}><i class="fas fa-building me-1"${_scopeId}></i>${ssrInterpolate(subscription.company.name)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="portal-project-card__meta"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.amount"))}</span><strong${_scopeId}>${ssrInterpolate(formatMoney(subscription.amount, subscription.currency))}</strong></div><div class="portal-project-card__meta"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.billing_cycle"))}</span><strong${_scopeId}>${ssrInterpolate(subscription.billing_cycle_label)}</strong></div>`);
                if (subscription.renewal_at) {
                  _push2(`<div class="portal-project-card__meta"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.renewal_at"))}</span><strong${_scopeId}>${ssrInterpolate(subscription.renewal_at)}</strong></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (subscription.service_name) {
                  _push2(`<div class="portal-project-card__meta"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.service"))}</span><strong${_scopeId}>${ssrInterpolate(subscription.service_name)}</strong></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (subscription.auto_renew) {
                  _push2(`<div class="portal-project-card__meta"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.auto_renew"))}</span><strong${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.auto_renew_enabled"))}</strong></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="portal-project-card__footer"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("portal.subscriptions.show", subscription.id),
                  class: "thm-btn w-100 text-center"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t3)("subscriptions.view_details"))} <span class="${ssrRenderClass(`icon-${locale.value === "ar" ? "left" : "right"}-arrow`)}"${_scopeId2}></span>`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t3)("subscriptions.view_details")) + " ", 1),
                        createVNode("span", {
                          class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow`
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></article></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (((_a = __props.subscriptions.links) == null ? void 0 : _a.length) > 3) {
              _push2(`<nav class="portal-pagination" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(__props.subscriptions.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url || "#",
                  class: ["portal-pagination__link", { "portal-pagination__link--active": link.active }]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></nav>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.subscriptions.data.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "portal-panel"
              }, [
                createVNode("div", { class: "portal-empty" }, [
                  createVNode("i", { class: "fas fa-sync-alt" }),
                  createTextVNode(" " + toDisplayString(unref(t3)("subscriptions.no_subscriptions")), 1)
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "row g-4"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.subscriptions.data, (subscription) => {
                  var _a2;
                  return openBlock(), createBlock("div", {
                    key: subscription.id,
                    class: "col-md-6 col-xl-4"
                  }, [
                    createVNode("article", { class: "portal-project-card" }, [
                      createVNode("div", { class: "portal-project-card__top" }, [
                        createVNode("h3", { class: "portal-project-card__title" }, toDisplayString(subscription.name), 1),
                        createVNode("span", {
                          class: ["portal-badge", subscriptionBadgeClass(subscription.status)]
                        }, toDisplayString(subscription.status_label), 3)
                      ]),
                      ((_a2 = subscription.company) == null ? void 0 : _a2.name) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-project-card__company"
                      }, [
                        createVNode("i", { class: "fas fa-building me-1" }),
                        createTextVNode(toDisplayString(subscription.company.name), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "portal-project-card__meta" }, [
                        createVNode("span", null, toDisplayString(unref(t3)("subscriptions.amount")), 1),
                        createVNode("strong", null, toDisplayString(formatMoney(subscription.amount, subscription.currency)), 1)
                      ]),
                      createVNode("div", { class: "portal-project-card__meta" }, [
                        createVNode("span", null, toDisplayString(unref(t3)("subscriptions.billing_cycle")), 1),
                        createVNode("strong", null, toDisplayString(subscription.billing_cycle_label), 1)
                      ]),
                      subscription.renewal_at ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "portal-project-card__meta"
                      }, [
                        createVNode("span", null, toDisplayString(unref(t3)("subscriptions.renewal_at")), 1),
                        createVNode("strong", null, toDisplayString(subscription.renewal_at), 1)
                      ])) : createCommentVNode("", true),
                      subscription.service_name ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "portal-project-card__meta"
                      }, [
                        createVNode("span", null, toDisplayString(unref(t3)("subscriptions.service")), 1),
                        createVNode("strong", null, toDisplayString(subscription.service_name), 1)
                      ])) : createCommentVNode("", true),
                      subscription.auto_renew ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "portal-project-card__meta"
                      }, [
                        createVNode("span", null, toDisplayString(unref(t3)("subscriptions.auto_renew")), 1),
                        createVNode("strong", null, toDisplayString(unref(t3)("subscriptions.auto_renew_enabled")), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "portal-project-card__footer" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("portal.subscriptions.show", subscription.id),
                          class: "thm-btn w-100 text-center"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t3)("subscriptions.view_details")) + " ", 1),
                            createVNode("span", {
                              class: `icon-${locale.value === "ar" ? "left" : "right"}-arrow`
                            }, null, 2)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]);
                }), 128))
              ])),
              ((_b = __props.subscriptions.links) == null ? void 0 : _b.length) > 3 ? (openBlock(), createBlock("nav", {
                key: 2,
                class: "portal-pagination",
                "aria-label": "Pagination"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.subscriptions.links, (link) => {
                  return openBlock(), createBlock(unref(Link), {
                    key: link.label,
                    href: link.url || "#",
                    class: ["portal-pagination__link", { "portal-pagination__link--active": link.active }],
                    innerHTML: link.label
                  }, null, 8, ["href", "class", "innerHTML"]);
                }), 128))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Portal/Subscriptions/Index.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    subscription: { type: Object, required: true },
    invoices: { type: Array, default: () => [] },
    meta: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const { t: t3, invoiceStatusLabel } = usePortalTranslations();
    const metaTitle = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.title) || props.subscription.name;
    });
    const metaDescription = computed(() => {
      var _a;
      return ((_a = props.meta) == null ? void 0 : _a.description) || t3("pages.subscriptions_description");
    });
    const invoiceList = computed(() => {
      if (Array.isArray(props.invoices)) {
        return props.invoices;
      }
      return Object.values(props.invoices ?? {});
    });
    const formatMoney = (amount, currency) => `${Number(amount ?? 0).toFixed(2)} ${currency || ""}`.trim();
    const subscriptionBadgeClass = (status) => {
      if (status === "active" || status === "trial") return "portal-badge--paid";
      if (status === "cancelled" || status === "expired") return "portal-badge--overdue";
      return "portal-badge--invoice";
    };
    const invoiceBadgeClass = (status) => {
      if (status === "paid") return "portal-badge--paid";
      if (status === "overdue") return "portal-badge--overdue";
      return "portal-badge--invoice";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(_sfc_main$v, mergeProps({
        title: __props.subscription.name,
        subtitle: (_a = __props.subscription.company) == null ? void 0 : _a.name,
        active: "subscriptions",
        breadcrumbs: [
          { label: unref(t3)("menu.my_dashboard"), href: _ctx.route("portal.dashboard") },
          { label: unref(t3)("subscriptions.title"), href: _ctx.route("portal.subscriptions.index") },
          { label: __props.subscription.name }
        ],
        "meta-title": metaTitle.value,
        "meta-description": metaDescription.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="portal-grid portal-grid--show"${_scopeId}><div${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.details"))}</h2></div><div class="portal-panel__body"${_scopeId}><div class="portal-details"${_scopeId}><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.status"))}</div><div class="portal-details__value"${_scopeId}><span class="${ssrRenderClass([subscriptionBadgeClass(__props.subscription.status), "portal-badge"])}"${_scopeId}>${ssrInterpolate(__props.subscription.status_label)}</span></div></div>`);
            if ((_a2 = __props.subscription.company) == null ? void 0 : _a2.name) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("fields.company"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.subscription.company.name)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.amount"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(formatMoney(__props.subscription.amount, __props.subscription.currency))}</div></div><div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.billing_cycle"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.subscription.billing_cycle_label)}</div></div>`);
            if (__props.subscription.service_name) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.service"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.subscription.service_name)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.subscription.starts_at) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.starts_at"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.subscription.starts_at)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.subscription.ends_at) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.ends_at"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.subscription.ends_at)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.subscription.renewal_at) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.renewal_at"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(__props.subscription.renewal_at)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.subscription.auto_renew) {
              _push2(`<div class="portal-details__row"${_scopeId}><div class="portal-details__label"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.auto_renew"))}</div><div class="portal-details__value"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.auto_renew_enabled"))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="portal-grid__stack"${_scopeId}><div class="portal-panel"${_scopeId}><div class="portal-panel__header"${_scopeId}><h2 class="portal-panel__title"${_scopeId}>${ssrInterpolate(unref(t3)("subscriptions.invoices"))}</h2></div><div class="portal-panel__body"${_scopeId}>`);
            if (invoiceList.value.length === 0) {
              _push2(`<div class="portal-empty"${_scopeId}><span class="portal-empty__icon"${_scopeId}><i class="fas fa-file-alt"${_scopeId}></i></span> ${ssrInterpolate(unref(t3)("subscriptions.no_invoices"))}</div>`);
            } else {
              _push2(`<div class="portal-invoice-list"${_scopeId}><!--[-->`);
              ssrRenderList(invoiceList.value, (invoice) => {
                _push2(`<article class="portal-invoice-card"${_scopeId}><div class="portal-invoice-card__top"${_scopeId}><div${_scopeId}><div class="portal-invoice-card__number"${_scopeId}>${ssrInterpolate(invoice.invoice_number)}</div><span class="${ssrRenderClass([invoiceBadgeClass(invoice.status), "portal-badge mt-2"])}"${_scopeId}>${ssrInterpolate(unref(invoiceStatusLabel)(invoice.status))}</span></div><div class="portal-invoice-card__total"${_scopeId}>${ssrInterpolate(formatMoney(invoice.total, invoice.currency))}</div></div><div class="portal-invoice-card__meta"${_scopeId}><div class="portal-invoice-card__meta-item"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.issued_at"))}</span><strong${_scopeId}>${ssrInterpolate(invoice.issued_at || "—")}</strong></div><div class="portal-invoice-card__meta-item"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.due_at"))}</span><strong${_scopeId}>${ssrInterpolate(invoice.due_at || "—")}</strong></div><div class="portal-invoice-card__meta-item"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t3)("fields.paid_at"))}</span><strong${_scopeId}>${ssrInterpolate(invoice.paid_at || "—")}</strong></div></div><a${ssrRenderAttr("href", invoice.pdf_url)} class="portal-panel__action" target="_blank" rel="noopener"${_scopeId}><i class="fas fa-download"${_scopeId}></i> ${ssrInterpolate(unref(t3)("subscriptions.download_pdf"))}</a></article>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "portal-grid portal-grid--show" }, [
                createVNode("div", null, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("subscriptions.details")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      createVNode("div", { class: "portal-details" }, [
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.status")), 1),
                          createVNode("div", { class: "portal-details__value" }, [
                            createVNode("span", {
                              class: ["portal-badge", subscriptionBadgeClass(__props.subscription.status)]
                            }, toDisplayString(__props.subscription.status_label), 3)
                          ])
                        ]),
                        ((_b = __props.subscription.company) == null ? void 0 : _b.name) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("fields.company")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.subscription.company.name), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("subscriptions.amount")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(formatMoney(__props.subscription.amount, __props.subscription.currency)), 1)
                        ]),
                        createVNode("div", { class: "portal-details__row" }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("subscriptions.billing_cycle")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.subscription.billing_cycle_label), 1)
                        ]),
                        __props.subscription.service_name ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("subscriptions.service")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.subscription.service_name), 1)
                        ])) : createCommentVNode("", true),
                        __props.subscription.starts_at ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("subscriptions.starts_at")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.subscription.starts_at), 1)
                        ])) : createCommentVNode("", true),
                        __props.subscription.ends_at ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("subscriptions.ends_at")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.subscription.ends_at), 1)
                        ])) : createCommentVNode("", true),
                        __props.subscription.renewal_at ? (openBlock(), createBlock("div", {
                          key: 4,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("subscriptions.renewal_at")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(__props.subscription.renewal_at), 1)
                        ])) : createCommentVNode("", true),
                        __props.subscription.auto_renew ? (openBlock(), createBlock("div", {
                          key: 5,
                          class: "portal-details__row"
                        }, [
                          createVNode("div", { class: "portal-details__label" }, toDisplayString(unref(t3)("subscriptions.auto_renew")), 1),
                          createVNode("div", { class: "portal-details__value" }, toDisplayString(unref(t3)("subscriptions.auto_renew_enabled")), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "portal-grid__stack" }, [
                  createVNode("div", { class: "portal-panel" }, [
                    createVNode("div", { class: "portal-panel__header" }, [
                      createVNode("h2", { class: "portal-panel__title" }, toDisplayString(unref(t3)("subscriptions.invoices")), 1)
                    ]),
                    createVNode("div", { class: "portal-panel__body" }, [
                      invoiceList.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "portal-empty"
                      }, [
                        createVNode("span", { class: "portal-empty__icon" }, [
                          createVNode("i", { class: "fas fa-file-alt" })
                        ]),
                        createTextVNode(" " + toDisplayString(unref(t3)("subscriptions.no_invoices")), 1)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "portal-invoice-list"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(invoiceList.value, (invoice) => {
                          return openBlock(), createBlock("article", {
                            key: invoice.id,
                            class: "portal-invoice-card"
                          }, [
                            createVNode("div", { class: "portal-invoice-card__top" }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "portal-invoice-card__number" }, toDisplayString(invoice.invoice_number), 1),
                                createVNode("span", {
                                  class: ["portal-badge mt-2", invoiceBadgeClass(invoice.status)]
                                }, toDisplayString(unref(invoiceStatusLabel)(invoice.status)), 3)
                              ]),
                              createVNode("div", { class: "portal-invoice-card__total" }, toDisplayString(formatMoney(invoice.total, invoice.currency)), 1)
                            ]),
                            createVNode("div", { class: "portal-invoice-card__meta" }, [
                              createVNode("div", { class: "portal-invoice-card__meta-item" }, [
                                createVNode("span", null, toDisplayString(unref(t3)("fields.issued_at")), 1),
                                createVNode("strong", null, toDisplayString(invoice.issued_at || "—"), 1)
                              ]),
                              createVNode("div", { class: "portal-invoice-card__meta-item" }, [
                                createVNode("span", null, toDisplayString(unref(t3)("fields.due_at")), 1),
                                createVNode("strong", null, toDisplayString(invoice.due_at || "—"), 1)
                              ]),
                              createVNode("div", { class: "portal-invoice-card__meta-item" }, [
                                createVNode("span", null, toDisplayString(unref(t3)("fields.paid_at")), 1),
                                createVNode("strong", null, toDisplayString(invoice.paid_at || "—"), 1)
                              ])
                            ]),
                            createVNode("a", {
                              href: invoice.pdf_url,
                              class: "portal-panel__action",
                              target: "_blank",
                              rel: "noopener"
                            }, [
                              createVNode("i", { class: "fas fa-download" }),
                              createTextVNode(" " + toDisplayString(unref(t3)("subscriptions.download_pdf")), 1)
                            ], 8, ["href"])
                          ]);
                        }), 128))
                      ]))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Portal/Subscriptions/Show.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const __default__ = {
  components: {
    AppLayout: _sfc_main$Q
  }
};
const _sfc_main$6 = /* @__PURE__ */ Object.assign(__default__, {
  __name: "SiteErrorPage",
  __ssrInlineRender: true,
  props: {
    status: { type: [Number, String], required: true },
    title: { type: String, required: true },
    heading: { type: String, required: true },
    message: { type: String, required: true },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    showImage: { type: Boolean, default: false },
    showDebug: { type: Boolean, default: false },
    secondaryHref: { type: String, default: "" },
    secondaryLabel: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e2) {
        return key;
      }
    };
    const asset_path = computed(() => page.props.asset_path || "/");
    const locale = computed(() => page.props.locale || "en");
    computed(() => locale.value === "ar");
    const seo = computed(() => page.props.seo || {});
    const meta = computed(() => page.props.meta || {});
    const siteName = computed(() => seo.value.website_name || page.props.appName || "Symfonix");
    const metaTitle = computed(() => `${props.title} | ${siteName.value}`);
    const metaDescription = computed(() => meta.value.description || props.description || props.message);
    const metaKeywords = computed(() => meta.value.keywords || props.keywords);
    const metaImage = computed(() => {
      var _a, _b, _c, _d;
      return ((_b = (_a = meta.value) == null ? void 0 : _a.og) == null ? void 0 : _b.image) || ((_d = (_c = meta.value) == null ? void 0 : _c.twitter) == null ? void 0 : _d.image) || "";
    });
    const metaCanonical = computed(() => meta.value.canonical || "");
    const metaRobots = computed(() => meta.value.robots || "noindex, nofollow");
    const homeUrl = computed(() => {
      try {
        return route("home");
      } catch (e2) {
        return `/${locale.value}`;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(metaTitle.value)}</title><meta name="description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}><meta name="keywords"${ssrRenderAttr("content", metaKeywords.value)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", metaRobots.value)}${_scopeId}>`);
            if (metaCanonical.value) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (metaCanonical.value) {
              _push2(`<meta property="og:url"${ssrRenderAttr("content", metaCanonical.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="website"${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", metaDescription.value)}${_scopeId}>`);
            if (metaImage.value) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", metaImage.value)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(metaTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: metaKeywords.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: metaRobots.value
              }, null, 8, ["content"]),
              metaCanonical.value ? (openBlock(), createBlock("link", {
                key: 0,
                rel: "canonical",
                href: metaCanonical.value
              }, null, 8, ["href"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              metaCanonical.value ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:url",
                content: metaCanonical.value
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: metaTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: metaDescription.value
              }, null, 8, ["content"]),
              metaImage.value ? (openBlock(), createBlock("meta", {
                key: 3,
                name: "twitter:image",
                content: metaImage.value
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$Q, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<header class="intro intro-fullscreen"${ssrRenderAttr("data-background", asset_path.value + "theme/img/main/55.jpg")} style="${ssrRenderStyle({ backgroundImage: `url(${asset_path.value}theme/img/main/55.jpg)` })}"${_scopeId}><div class="overlay"${_scopeId}></div><div class="intro-body"${_scopeId}><h1 class="big light"${_scopeId}>${ssrInterpolate(__props.status)}</h1><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-md-6 col-md-offset-3"${_scopeId}><h2${_scopeId}>${ssrInterpolate(__props.heading)}</h2><h3${_scopeId}>${ssrInterpolate(__props.message)}</h3><p${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              class: "btn btn-dark btn-lg",
              href: homeUrl.value
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Back To Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Back To Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.secondaryHref) {
              _push2(ssrRenderComponent(unref(Link), {
                class: "btn btn-gray btn-lg",
                href: __props.secondaryHref
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.secondaryLabel)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.secondaryLabel), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</p>`);
            if (__props.showDebug && (((_b = (_a = unref(page)) == null ? void 0 : _a.props) == null ? void 0 : _b.error) || ((_d = (_c = unref(page)) == null ? void 0 : _c.props) == null ? void 0 : _d.trace))) {
              _push2(`<div class="alert alert-danger text-left"${_scopeId}><strong${_scopeId}>Debug Error:</strong>`);
              if ((_f = (_e = unref(page)) == null ? void 0 : _e.props) == null ? void 0 : _f.error) {
                _push2(`<div${_scopeId}>${ssrInterpolate(unref(page).props.error)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></header>`);
          } else {
            return [
              createVNode("header", {
                class: "intro intro-fullscreen",
                "data-background": asset_path.value + "theme/img/main/55.jpg",
                style: { backgroundImage: `url(${asset_path.value}theme/img/main/55.jpg)` }
              }, [
                createVNode("div", { class: "overlay" }),
                createVNode("div", { class: "intro-body" }, [
                  createVNode("h1", { class: "big light" }, toDisplayString(__props.status), 1),
                  createVNode("div", { class: "container" }, [
                    createVNode("div", { class: "row" }, [
                      createVNode("div", { class: "col-md-6 col-md-offset-3" }, [
                        createVNode("h2", null, toDisplayString(__props.heading), 1),
                        createVNode("h3", null, toDisplayString(__props.message), 1),
                        createVNode("p", null, [
                          createVNode(unref(Link), {
                            class: "btn btn-dark btn-lg",
                            href: homeUrl.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(trans("Back To Home")), 1)
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          __props.secondaryHref ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            class: "btn btn-gray btn-lg",
                            href: __props.secondaryHref
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.secondaryLabel), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        __props.showDebug && (((_h = (_g = unref(page)) == null ? void 0 : _g.props) == null ? void 0 : _h.error) || ((_j = (_i = unref(page)) == null ? void 0 : _i.props) == null ? void 0 : _j.trace)) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "alert alert-danger text-left"
                        }, [
                          createVNode("strong", null, "Debug Error:"),
                          ((_l = (_k = unref(page)) == null ? void 0 : _k.props) == null ? void 0 : _l.error) ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(unref(page).props.error), 1)) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ], 12, ["data-background"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SiteErrorPage.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "Error",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e2) {
        return key;
      }
    };
    const status = computed(() => Number(page.props.status || 500));
    const appEnv = computed(() => page.props.app_env || "production");
    const locale = computed(() => page.props.locale || "en");
    const catalog = {
      400: {
        status: 400,
        title: "400 Bad Request",
        heading: "Bad Request",
        message: "The request could not be understood or was invalid. Please check and try again.",
        description: "The request could not be processed due to invalid input.",
        keywords: "400 error, bad request, invalid request",
        showImage: false,
        showDebug: false,
        secondary: null
      },
      401: {
        status: 401,
        title: "401 Unauthorized",
        heading: "Authentication Required",
        message: "You need to sign in to access this page.",
        description: "Authentication is required to access this resource.",
        keywords: "401 error, unauthorized, login required",
        showImage: false,
        showDebug: false,
        secondary: "login"
      },
      403: {
        status: 403,
        title: "403 Forbidden",
        heading: "Access Denied",
        message: "You do not have permission to access this page.",
        description: "You are not allowed to access this resource.",
        keywords: "403 error, forbidden, access denied",
        showImage: false,
        showDebug: false,
        secondary: null
      },
      404: {
        status: 404,
        title: "404 Error",
        heading: "Oops! Page Not Found!",
        message: "The page you are looking for does not exist. It might have been moved or deleted.",
        description: "The page you are looking for could not be found.",
        keywords: "404 error, page not found, missing page",
        showImage: true,
        showDebug: false,
        secondary: null
      },
      500: {
        status: 500,
        title: "500 Error",
        heading: "Internal Server Error",
        message: "We're sorry, but something went wrong on our end. Please try again later or contact support if the problem persists.",
        description: "An internal server error occurred. Please try again later.",
        keywords: "500 error, server error, internal error",
        showImage: false,
        showDebug: true,
        secondary: null
      },
      503: {
        status: 503,
        title: "503 Service Unavailable",
        heading: "Service Unavailable",
        message: "The service is temporarily unavailable. Please try again in a few moments.",
        description: "The service is temporarily unavailable. Please try again later.",
        keywords: "503 error, service unavailable, maintenance",
        showImage: false,
        showDebug: false,
        secondary: null
      }
    };
    const config = computed(() => {
      const entry = catalog[status.value] || catalog[500];
      return {
        ...entry,
        showDebug: entry.showDebug && appEnv.value !== "production"
      };
    });
    const secondaryHref = computed(() => {
      if (config.value.secondary !== "login") {
        return "";
      }
      try {
        return route("login");
      } catch (e2) {
        return `/${locale.value}/login`;
      }
    });
    const secondaryLabel = computed(() => {
      return config.value.secondary === "login" ? trans("Login") : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$6, mergeProps({
        status: config.value.status,
        title: trans(config.value.title),
        heading: trans(config.value.heading),
        message: trans(config.value.message),
        description: trans(config.value.description),
        keywords: trans(config.value.keywords),
        "show-image": config.value.showImage,
        "show-debug": config.value.showDebug,
        "secondary-href": secondaryHref.value,
        "secondary-label": secondaryLabel.value
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "Error400",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, _attrs, null, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error400.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_1_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "Error401",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, _attrs, null, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error401.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_1_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "Error403",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, _attrs, null, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error403.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __vite_glob_1_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "Error404",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, _attrs, null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error404.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_1_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "Error500",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error500.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_1_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = /* @__PURE__ */ new WeakMap();
var l = function(t3, e2) {
  return u.set(t3, e2), t3;
};
function c(t3) {
  return u.has(t3);
}
var a = function(t3) {
  return u.get(t3);
}, f = function(t3, e2) {
  u.set(t3, e2);
};
const p = function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
}(), y = function(t3, e2) {
  const o2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (let e3 = 0; e3 < t3.length; ++e3) void 0 !== t3[e3] && (o2[e3] = t3[e3]);
  return o2;
}, d = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      if (c(e2)) {
        var r2 = a(e2) + 1;
        e2[r2] = o2, f(e2, r2);
      } else (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) {
    if (c(o2)) {
      for (var u2 = Object.keys(o2), p2 = n2 && n2.plainObjects ? { __proto__: null, 0: e2 } : { 0: e2 }, d2 = 0; d2 < u2.length; d2++) p2[parseInt(u2[d2], 10) + 1] = o2[u2[d2]];
      return l(p2, a(o2) + 1);
    }
    return [e2].concat(o2);
  }
  let h2 = e2;
  return s(e2) && !s(o2) && (h2 = y(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, h2);
}, h = 1024, b = function(t3, e2, o2, n2) {
  if (c(t3)) {
    var r2 = a(t3) + 1;
    return t3[r2] = e2, f(t3, r2), t3;
  }
  var i2 = [].concat(t3, e2);
  return i2.length > o2 ? l(y(i2, { plainObjects: n2 }), i2.length - 1) : i2;
}, m = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, g = Object.prototype.hasOwnProperty, w = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, v = Array.isArray, j = Array.prototype.push, $ = function(t3, e2) {
  j.apply(t3, v(e2) ? e2 : [e2]);
}, E = Date.prototype.toISOString, O = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += h) {
    const e3 = i2.length >= h ? i2.slice(t4, t4 + h) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = p[n3] : n3 < 2048 ? o3[o3.length] = p[192 | n3 >> 6] + p[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = p[224 | n3 >> 12] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = p[240 | n3 >> 18] + p[128 | n3 >> 12 & 63] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n[r], indices: false, serializeDate: function(t3) {
  return E.call(t3);
}, skipNulls: false, strictNullHandling: false }, T = {}, R = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, f2, p2, y2, d2, h2, b2, g2) {
  let w2 = t3, j2 = g2, E2 = 0, _2 = false;
  for (; void 0 !== (j2 = j2.get(T)) && !_2; ) {
    const e3 = j2.get(t3);
    if (E2 += 1, void 0 !== e3) {
      if (e3 === E2) throw new RangeError("Cyclic object value");
      _2 = true;
    }
    void 0 === j2.get(T) && (E2 = 0);
  }
  if ("function" == typeof c2 ? w2 = c2(e2, w2) : w2 instanceof Date ? w2 = p2(w2) : "comma" === o2 && v(w2) && (w2 = m(w2, function(t4) {
    return t4 instanceof Date ? p2(t4) : t4;
  })), null === w2) {
    if (i2) return l2 && !h2 ? l2(e2, O.encoder, b2, "key", y2) : e2;
    w2 = "";
  }
  if ("string" == typeof (I2 = w2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  }(w2)) return l2 ? [d2(h2 ? e2 : l2(e2, O.encoder, b2, "key", y2)) + "=" + d2(l2(w2, O.encoder, b2, "value", y2))] : [d2(e2) + "=" + d2(String(w2))];
  var I2;
  const S2 = [];
  if (void 0 === w2) return S2;
  let A2;
  if ("comma" === o2 && v(w2)) h2 && l2 && (w2 = m(w2, l2)), A2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (v(c2)) A2 = c2;
  else {
    const t4 = Object.keys(w2);
    A2 = a2 ? t4.sort(a2) : t4;
  }
  const D2 = u2 ? e2.replace(/\./g, "%2E") : e2, k2 = n2 && v(w2) && 1 === w2.length ? D2 + "[]" : D2;
  if (r2 && v(w2) && 0 === w2.length) return k2 + "[]";
  for (let e3 = 0; e3 < A2.length; ++e3) {
    const m2 = A2[e3], j3 = "object" == typeof m2 && void 0 !== m2.value ? m2.value : w2[m2];
    if (s2 && null === j3) continue;
    const O2 = f2 && u2 ? m2.replace(/\./g, "%2E") : m2, _3 = v(w2) ? "function" == typeof o2 ? o2(k2, O2) : k2 : k2 + (f2 ? "." + O2 : "[" + O2 + "]");
    g2.set(t3, E2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(T, g2), $(S2, R(j3, _3, o2, n2, r2, i2, s2, u2, "comma" === o2 && h2 && v(w2) ? null : l2, c2, a2, f2, p2, y2, d2, h2, b2, I3));
  }
  return S2;
}, _ = Object.prototype.hasOwnProperty, I = Array.isArray, S = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, A = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, D = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, k = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && _.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let a2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && a2 < o2.depth; ) {
    if (a2 += 1, !o2.plainObjects && _.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : D(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = c(r3) ? r3 : o3.allowEmptyArrays && ("" === r3 || o3.strictNullHandling && null === r3) ? [] : b([], r3, o3.arrayLimit, o3.plainObjects);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  }(l2, e2, o2, n2);
};
function N(t3, e2) {
  const o2 = /* @__PURE__ */ function(t4) {
    return S;
  }();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, a2;
      -1 === l2 ? (c2 = e3.decoder(t5, S.decoder, s2, "key"), a2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), S.decoder, s2, "key"), a2 = m(D(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, S.decoder, s2, "value");
      })), a2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (a2 = A(a2)), t5.indexOf("[]=") > -1 && (a2 = I(a2) ? [a2] : a2);
      const f2 = _.call(o3, c2);
      f2 && "combine" === e3.duplicates ? o3[c2] = b(o3[c2], a2, e3.arrayLimit, e3.plainObjects) : f2 && "last" !== e3.duplicates || (o3[c2] = a2);
    }
    return o3;
  }(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = k(s2, n2[s2], o2, "string" == typeof t3);
    r2 = d(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    }(e3), t4;
  }(r2);
}
class x {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: N(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class C extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + function(t3, e3) {
      let o2 = t3;
      const i2 = function(t4) {
        if (!t4) return O;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || O.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!g.call(n, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n[o3];
        let s3, u3 = O.filter;
        if (("function" == typeof t4.filter || v(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in w ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : O.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : O.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || O.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : O.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : O.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? O.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : O.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : O.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : O.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : O.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : O.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : O.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : O.strictNullHandling };
      }(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : v(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = w[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || $(l2, R(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const p2 = l2.join(i2.delimiter);
      let y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), p2.length > 0 ? y2 + p2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new x(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new x(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2.hasOwnProperty(n2[0].name) || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      const s2 = i2.hasOwnProperty(o2[r2]) ? o2[r2] : i2.hasOwnProperty("id") ? "id" : void 0;
      if (void 0 === s2) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
      return t({}, e3, { [r2]: i2[s2] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function P(t3, e2, o2, n2) {
  const r2 = new C(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const U = { install(t3, e2) {
  const o2 = (t4, o3, n2, r2 = e2) => P(t4, o3, n2, r2);
  parseInt(t3.version) > 2 ? (t3.config.globalProperties.route = o2, t3.provide("route", o2)) : t3.mixin({ methods: { route: o2 } });
} };
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const modules = name.split("::");
      if (modules.length > 1) {
        return resolvePageComponent(
          `../../Modules/${modules[0]}/resources/assets/js/Pages/${modules[1]}.vue`,
          /* @__PURE__ */ Object.assign({
            "../../Modules/Base/resources/assets/js/Pages/Index.vue": __vite_glob_0_0,
            "../../Modules/CRM/resources/assets/js/Pages/Index.vue": __vite_glob_0_1,
            "../../Modules/CRM/resources/assets/js/Pages/QuoteShow.vue": __vite_glob_0_2,
            "../../Modules/Cms/resources/assets/js/Pages/AboutUs.vue": __vite_glob_0_3,
            "../../Modules/Cms/resources/assets/js/Pages/BlogIndex.vue": __vite_glob_0_4,
            "../../Modules/Cms/resources/assets/js/Pages/BlogShow.vue": __vite_glob_0_5,
            "../../Modules/Cms/resources/assets/js/Pages/Faq.vue": __vite_glob_0_6,
            "../../Modules/Cms/resources/assets/js/Pages/PageShow.vue": __vite_glob_0_7,
            "../../Modules/Cms/resources/assets/js/Pages/PrivacyPolicy.vue": __vite_glob_0_8,
            "../../Modules/Cms/resources/assets/js/Pages/Team.vue": __vite_glob_0_9,
            "../../Modules/Cms/resources/assets/js/Pages/Testimonials.vue": __vite_glob_0_10,
            "../../Modules/Product/resources/assets/js/Pages/ProductIndex.vue": __vite_glob_0_11,
            "../../Modules/Product/resources/assets/js/Pages/ProductShow.vue": __vite_glob_0_12,
            "../../Modules/Project/resources/assets/js/Pages/Portal/Projects/Index.vue": __vite_glob_0_13,
            "../../Modules/Project/resources/assets/js/Pages/Portal/Projects/Show.vue": __vite_glob_0_14,
            "../../Modules/Project/resources/assets/js/Pages/UseCaseIndex.vue": __vite_glob_0_15,
            "../../Modules/Project/resources/assets/js/Pages/UseCaseShow.vue": __vite_glob_0_16,
            "../../Modules/Services/resources/assets/js/Pages/ServiceIndex.vue": __vite_glob_0_17,
            "../../Modules/Services/resources/assets/js/Pages/ServiceShow.vue": __vite_glob_0_18,
            "../../Modules/Support/resources/assets/js/Pages/Portal/Tickets/Create.vue": __vite_glob_0_19,
            "../../Modules/Support/resources/assets/js/Pages/Portal/Tickets/Index.vue": __vite_glob_0_20,
            "../../Modules/Support/resources/assets/js/Pages/Portal/Tickets/Show.vue": __vite_glob_0_21,
            "../../Modules/User/resources/assets/js/Pages/Auth/ForgotPassword.vue": __vite_glob_0_22,
            "../../Modules/User/resources/assets/js/Pages/Auth/Login.vue": __vite_glob_0_23,
            "../../Modules/User/resources/assets/js/Pages/Auth/Register.vue": __vite_glob_0_24,
            "../../Modules/User/resources/assets/js/Pages/Auth/ResetPassword.vue": __vite_glob_0_25,
            "../../Modules/User/resources/assets/js/Pages/Auth/TwoFactorChallenge.vue": __vite_glob_0_26,
            "../../Modules/User/resources/assets/js/Pages/Jobs/Index.vue": __vite_glob_0_27,
            "../../Modules/User/resources/assets/js/Pages/Jobs/Show.vue": __vite_glob_0_28,
            "../../Modules/User/resources/assets/js/Pages/Portal/ConfirmPassword.vue": __vite_glob_0_29,
            "../../Modules/User/resources/assets/js/Pages/Portal/Dashboard.vue": __vite_glob_0_30,
            "../../Modules/User/resources/assets/js/Pages/Portal/Profile.vue": __vite_glob_0_31,
            "../../Modules/User/resources/assets/js/Pages/Portal/Subscriptions/Index.vue": __vite_glob_0_32,
            "../../Modules/User/resources/assets/js/Pages/Portal/Subscriptions/Show.vue": __vite_glob_0_33
          })
        );
      }
      return resolvePageComponent(
        `./Pages/${name}.vue`,
        /* @__PURE__ */ Object.assign({ "./Pages/Error.vue": __vite_glob_1_0, "./Pages/Error400.vue": __vite_glob_1_1, "./Pages/Error401.vue": __vite_glob_1_2, "./Pages/Error403.vue": __vite_glob_1_3, "./Pages/Error404.vue": __vite_glob_1_4, "./Pages/Error500.vue": __vite_glob_1_5 })
      );
    },
    setup({ App, props, plugin }) {
      var _a, _b, _c;
      const ziggyProps = ((_b = (_a = props.initialPage) == null ? void 0 : _a.props) == null ? void 0 : _b.ziggy) || ((_c = page.props) == null ? void 0 : _c.ziggy) || {};
      const ziggyConfig = {
        ...ziggyProps,
        location: new URL(ziggyProps.location || "http://localhost")
      };
      return createSSRApp({
        render: () => h$1(App, props)
      }).use(plugin).use(U, ziggyConfig);
    }
  })
);
