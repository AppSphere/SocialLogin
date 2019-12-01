(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "./node_modules/ng2-cordova-oauth/core.js":
/*!************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/core.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(/*! ./oauth */ "./node_modules/ng2-cordova-oauth/oauth.js"));
__export(__webpack_require__(/*! ./provider/facebook */ "./node_modules/ng2-cordova-oauth/provider/facebook.js"));
__export(__webpack_require__(/*! ./provider/google */ "./node_modules/ng2-cordova-oauth/provider/google.js"));
__export(__webpack_require__(/*! ./provider/imgur */ "./node_modules/ng2-cordova-oauth/provider/imgur.js"));
__export(__webpack_require__(/*! ./provider/instagram */ "./node_modules/ng2-cordova-oauth/provider/instagram.js"));
__export(__webpack_require__(/*! ./provider/meetup */ "./node_modules/ng2-cordova-oauth/provider/meetup.js"));
__export(__webpack_require__(/*! ./provider/linkedin */ "./node_modules/ng2-cordova-oauth/provider/linkedin.js"));
__export(__webpack_require__(/*! ./provider/strava */ "./node_modules/ng2-cordova-oauth/provider/strava.js"));
__export(__webpack_require__(/*! ./provider/vk */ "./node_modules/ng2-cordova-oauth/provider/vk.js"));


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/oauth.js":
/*!*************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/oauth.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */

var utility_1 = __webpack_require__(/*! ./utility */ "./node_modules/ng2-cordova-oauth/utility.js");
/*
 * The main driver class for connections to each of the providers.
 */
var Oauth = (function () {
    function Oauth() {
        this.defaultWindowOptions = {};
    }
    Oauth.prototype.login = function (provider, windowOptions) {
        if (windowOptions === void 0) { windowOptions = {}; }
        console.warn("\n        new CordovaOauth().login(...) is deprecated and will be removed in the next release.\n        Please use new CordovaOauth().logInVia(...) instead.\n      ");
        return this.logInVia(provider, windowOptions);
    };
    Oauth.prototype.logInVia = function (provider, windowOptions) {
        if (windowOptions === void 0) { windowOptions = {}; }
        var url = provider.dialogUrl();
        return this.openDialog(url, utility_1.utils.defaults(windowOptions, this.defaultWindowOptions), {
            resolveOnUri: provider.options.redirectUri,
            providerName: provider.name
        }).then(function (event) {
            return provider.parseResponseInUrl(event.url);
        });
    };
    Oauth.prototype.serializeOptions = function (options) {
        var chunks = [];
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                chunks.push(prop + "=" + options[prop]);
            }
        }
        return chunks.join(',');
    };
    Oauth.prototype.openDialog = function (url, windowParams, options) {
        if (options === void 0) { options = {}; }
        return Promise.reject(new Error('Not implemented'));
    };
    return Oauth;
}());
exports.Oauth = Oauth;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/platform/browser.js":
/*!************************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/platform/browser.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oauth_1 = __webpack_require__(/*! ../oauth */ "./node_modules/ng2-cordova-oauth/oauth.js");
var utility_1 = __webpack_require__(/*! ../utility */ "./node_modules/ng2-cordova-oauth/utility.js");
var OauthBrowser = (function (_super) {
    __extends(OauthBrowser, _super);
    function OauthBrowser() {
        _super.apply(this, arguments);
        this.defaultWindowOptions = {
            width: 600,
            location: 1,
            toolbar: 0,
        };
    }
    OauthBrowser.prototype.openDialog = function (url, params, options) {
        if (options === void 0) { options = {}; }
        var windowParams = this.addWindowRect(utility_1.utils.defaults({ title: 'Authentication' }, params));
        var title = windowParams.title;
        delete windowParams.title;
        var popup = window.open(url, title, this.serializeOptions(windowParams));
        var watchDelay = this.constructor.WATCH_POPUP_TIMEOUT;
        return new Promise(function (resolve, reject) {
            if (typeof popup.focus === 'function') {
                popup.focus();
            }
            setTimeout(function watchPopup() {
                try {
                    if (popup.closed) {
                        return reject(new Error("The \"" + options.providerName + "\" sign in flow was canceled"));
                    }
                    if (popup.location.href.indexOf(options.resolveOnUri) === 0) {
                        popup.close();
                        resolve({ url: popup.location.href });
                    }
                }
                catch (e) {
                }
                setTimeout(watchPopup, watchDelay);
            }, watchDelay);
        });
    };
    OauthBrowser.prototype.addWindowRect = function (params) {
        var root = document.documentElement;
        var screenX = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft;
        var screenY = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop;
        var outerWidth = typeof window.outerWidth !== 'undefined' ? window.outerWidth : root.clientWidth;
        var outerHeight = typeof window.outerHeight !== 'undefined' ? window.outerHeight : root.clientHeight - 22;
        screenX = screenX < 0 ? window.screen.width + screenX : screenX;
        params.height = Math.floor(outerHeight * 0.8);
        params.left = Math.floor(screenX + (outerWidth - params.width) / 2);
        params.top = Math.floor(screenY + (outerHeight - params.height) / 2.5);
        return params;
    };
    OauthBrowser.WATCH_POPUP_TIMEOUT = 100;
    return OauthBrowser;
}(oauth_1.Oauth));
exports.OauthBrowser = OauthBrowser;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider.js":
/*!****************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utility_1 = __webpack_require__(/*! ./utility */ "./node_modules/ng2-cordova-oauth/utility.js");
var DEFAULTS = {
    redirectUri: 'http://localhost/callback'
};
var OAuthProvider = (function () {
    function OAuthProvider(options) {
        if (options === void 0) { options = {}; }
        this.APP_SCOPE_DELIMITER = ',';
        this.authUrl = '';
        this.defaults = {};
        this.options = utility_1.utils.defaults(options, DEFAULTS);
    }
    Object.defineProperty(OAuthProvider.prototype, "name", {
        get: function () {
            return this.constructor.name || this.authUrl;
        },
        enumerable: true,
        configurable: true
    });
    OAuthProvider.prototype.parseResponseInUrl = function (url) {
        var response = utility_1.utils.parseQueryString(url);
        if (!this.isValid(response)) {
            var error = new Error("Problem authenticating with " + this.name);
            Object.defineProperty(error, 'response', { value: response });
            throw error;
        }
        return response;
    };
    OAuthProvider.prototype.dialogUrl = function () {
        return this.optionsToDialogUrl(this.options);
    };
    OAuthProvider.prototype.optionsToDialogUrl = function (options) {
        utility_1.utils.defaults(options, this.defaults);
        var url = this.authUrl + "?client_id=" + options.clientId + "&redirect_uri=" + options.redirectUri;
        if (options.appScope) {
            url += "&scope=" + this.serializeAppScope(options.appScope);
        }
        if (options.state) {
            url += "&state=" + options.state;
        }
        if (options.responseType) {
            url += "&response_type=" + options.responseType;
        }
        return url;
    };
    OAuthProvider.prototype.serializeAppScope = function (scope) {
        return typeof scope.join === 'function' ? scope.join(this.APP_SCOPE_DELIMITER) : scope;
    };
    OAuthProvider.prototype.isValid = function (response) {
        return !response.error && (response.code || response['access_token']);
    };
    return OAuthProvider;
}());
exports.OAuthProvider = OAuthProvider;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/facebook.js":
/*!*************************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/facebook.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var Facebook = (function (_super) {
    __extends(Facebook, _super);
    function Facebook(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://www.facebook.com/v2.0/dialog/oauth';
        this.defaults = {
            responseType: 'token'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + this.name + " app scope must exist");
        }
    }
    Facebook.prototype.optionsToDialogUrl = function (options) {
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        if (options.authType) {
            url += "&auth_type=" + options.authType;
        }
        return url;
    };
    return Facebook;
}(provider_1.OAuthProvider));
exports.Facebook = Facebook;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/google.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/google.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var Google = (function (_super) {
    __extends(Google, _super);
    function Google(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://accounts.google.com/o/oauth2/auth';
        this.APP_SCOPE_DELIMITER = ' ';
        this.defaults = {
            responseType: 'token'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + this.name + " app scope must exist");
        }
    }
    Google.prototype.optionsToDialogUrl = function (options) {
        return _super.prototype.optionsToDialogUrl.call(this, options) + '&approval_prompt=force';
    };
    return Google;
}(provider_1.OAuthProvider));
exports.Google = Google;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/imgur.js":
/*!**********************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/imgur.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var Imgur = (function (_super) {
    __extends(Imgur, _super);
    function Imgur(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://api.imgur.com/oauth2/authorize';
        this.defaults = {
            responseType: 'token'
        };
    }
    return Imgur;
}(provider_1.OAuthProvider));
exports.Imgur = Imgur;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/instagram.js":
/*!**************************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/instagram.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var Instagram = (function (_super) {
    __extends(Instagram, _super);
    function Instagram(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://api.instagram.com/oauth/authorize';
        this.APP_SCOPE_DELIMITER = '+';
        this.defaults = {
            responseType: 'token'
        };
    }
    return Instagram;
}(provider_1.OAuthProvider));
exports.Instagram = Instagram;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/linkedin.js":
/*!*************************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/linkedin.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var LinkedIn = (function (_super) {
    __extends(LinkedIn, _super);
    function LinkedIn() {
        _super.apply(this, arguments);
        this.authUrl = 'https://www.linkedin.com/oauth/v2/authorization';
        this.APP_SCOPE_DELIMITER = ' ';
        this.defaults = {
            responseType: 'code'
        };
    }
    return LinkedIn;
}(provider_1.OAuthProvider));
exports.LinkedIn = LinkedIn;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/meetup.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/meetup.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var Meetup = (function (_super) {
    __extends(Meetup, _super);
    function Meetup(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://secure.meetup.com/oauth2/authorize/';
        this.defaults = {
            responseType: 'token'
        };
    }
    return Meetup;
}(provider_1.OAuthProvider));
exports.Meetup = Meetup;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/strava.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/strava.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var Strava = (function (_super) {
    __extends(Strava, _super);
    function Strava() {
        _super.apply(this, arguments);
        this.authUrl = 'https://www.strava.com/oauth/authorize';
        this.defaults = {
            responseType: 'code'
        };
    }
    return Strava;
}(provider_1.OAuthProvider));
exports.Strava = Strava;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/provider/vk.js":
/*!*******************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/provider/vk.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = __webpack_require__(/*! ../provider */ "./node_modules/ng2-cordova-oauth/provider.js");
var utility_1 = __webpack_require__(/*! ../utility */ "./node_modules/ng2-cordova-oauth/utility.js");
var VK = (function (_super) {
    __extends(VK, _super);
    function VK(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://oauth.vk.com/authorize';
        this.defaults = {
            responseType: 'token',
            redirectUri: 'https://oauth.vk.com/blank.html'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + this.name + " app scope must exist");
        }
    }
    VK.prototype.optionsToDialogUrl = function (options) {
        utility_1.utils.defaults(options, this.defaults);
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        if (options.display) {
            url += "&display=" + options.display;
        }
        if (options.v) {
            url += "&v=" + options.v;
        }
        if (options.revoke) {
            url += "&revoke=" + options.revoke;
        }
        return url;
    };
    return VK;
}(provider_1.OAuthProvider));
exports.VK = VK;


/***/ }),

/***/ "./node_modules/ng2-cordova-oauth/utility.js":
/*!***************************************************!*\
  !*** ./node_modules/ng2-cordova-oauth/utility.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.utils = {
    parseQueryString: function (url) {
        var values = url.split(/[?#]{1,2}/)[1].split('&');
        return values.reduce(function (map, value) {
            var _a = value.split('='), paramName = _a[0], paramValue = _a[1];
            map[decodeURIComponent(paramName)] = decodeURIComponent(paramValue);
            return map;
        }, {});
    },
    defaults: function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) {
            for (var prop in source) {
                if (!target.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        });
        return target;
    }
};


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/login/login.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>login</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-button expand=\"full\" class=\"linkedin-button\" (click)=\"linkedInLogin()\">\n    <ion-icon name=\"logo-linkedin\" float-left></ion-icon>Linkedin\n</ion-button>\n<ion-button expand=\"full\" class=\"google-button\" (click)=\"signInWithGoogle()\">\n  <ion-icon name=\"logo-google\" float-left></ion-icon>Google\n</ion-button>\n<ion-button expand=\"full\" class=\"google-button\" (click)=\"signInWithFB()\">\n  <ion-icon name=\"logo-facebook\" float-left></ion-icon>Facebook\n</ion-button>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/login/login-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/login/login-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: LoginPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function() { return LoginPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/login/login.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/pages/login/login-routing.module.ts");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");







let LoginPageModule = class LoginPageModule {
};
LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _login_routing_module__WEBPACK_IMPORTED_MODULE_5__["LoginPageRoutingModule"]
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })
], LoginPageModule);



/***/ }),

/***/ "./src/app/pages/login/login.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/login/login.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/login/login.page.ts ***!
  \*******************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var ng2_cordova_oauth_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-cordova-oauth/core */ "./node_modules/ng2-cordova-oauth/core.js");
/* harmony import */ var ng2_cordova_oauth_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_cordova_oauth_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var ng2_cordova_oauth_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-cordova-oauth/platform/browser */ "./node_modules/ng2-cordova-oauth/platform/browser.js");
/* harmony import */ var ng2_cordova_oauth_platform_browser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_cordova_oauth_platform_browser__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_services_linkedin_linkedin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/linkedin/linkedin.service */ "./src/app/services/linkedin/linkedin.service.ts");
/* harmony import */ var angular4_social_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular4-social-login */ "./node_modules/angular4-social-login/angular4-social-login.umd.js");
/* harmony import */ var angular4_social_login__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(angular4_social_login__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/google-plus/ngx */ "./node_modules/@ionic-native/google-plus/ngx/index.js");
/* harmony import */ var _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/facebook/ngx */ "./node_modules/@ionic-native/facebook/ngx/index.js");
/* harmony import */ var src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/auth/auth.service */ "./src/app/services/auth/auth.service.ts");











let LoginPage = class LoginPage {
    constructor(alertController, loadingController, platform, linkedinService, auth, navCtrl, googlePlus, fb, localAuthService) {
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.platform = platform;
        this.linkedinService = linkedinService;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.googlePlus = googlePlus;
        this.fb = fb;
        this.localAuthService = localAuthService;
    }
    ngOnInit() { }
    linkedInLogin() {
        this.presentLoading();
        const provider = new ng2_cordova_oauth_core__WEBPACK_IMPORTED_MODULE_3__["LinkedIn"]({
            clientId: src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].linkedinClientId,
            appScope: ['r_emailaddress', 'r_liteprofile'],
            redirectUri: 'https://localhost:8100/callback',
            responseType: 'code',
            state: this.linkedinService.getRandomState()
        });
        const oauth = new ng2_cordova_oauth_platform_browser__WEBPACK_IMPORTED_MODULE_5__["OauthBrowser"]();
        this.platform.ready().then(() => {
            oauth
                .logInVia(provider)
                .then(success => {
                debugger;
                this.linkedinService.getAccessToken(success['code'])
                    .then(data => {
                    alert('data' + data);
                    debugger;
                });
            })
                .catch(err => {
                this.loading.dismiss();
                console.error(err);
                // this.showAlert('Error', 'Something went wrong');
            });
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Loading'
            });
            yield this.loading.present();
        });
    }
    // AP --- Google Login
    signInWithGoogle() {
        this.googlePlus.login({})
            .then(res => {
            //this.localAuthService.loginWithFacebook(res.accessToken, 'Device1', 'Device2');
            this.navCtrl.navigateForward('tabs');
        })
            .catch(err => console.error(err));
    }
    // AP --- Facebook Login
    signInWithFB() {
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res) => {
            this.navCtrl.navigateForward('tabs');
            //this.localAuthService.loginWithFacebook(res.authResponse.accessToken, 'Device1', 'Device2');
        })
            .catch(e => console.log('Error logging into Facebook', e));
    }
    signOut() {
        //
        this.googlePlus.logout();
        this.fb.logout();
        this.navCtrl.navigateForward('login');
        //this.auth.signOut();
    }
};
LoginPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: src_app_services_linkedin_linkedin_service__WEBPACK_IMPORTED_MODULE_6__["LinkedinService"] },
    { type: angular4_social_login__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_8__["GooglePlus"] },
    { type: _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_9__["Facebook"] },
    { type: src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"] }
];
LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(/*! raw-loader!./login.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.page.html"),
        styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/pages/login/login.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        src_app_services_linkedin_linkedin_service__WEBPACK_IMPORTED_MODULE_6__["LinkedinService"],
        angular4_social_login__WEBPACK_IMPORTED_MODULE_7__["AuthService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
        _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_8__["GooglePlus"],
        _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_9__["Facebook"],
        src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"]])
], LoginPage);



/***/ }),

/***/ "./src/app/services/auth/auth.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/auth/auth.service.ts ***!
  \***********************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/providers/http/http */ "./src/app/providers/http/http.ts");




let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
    }
    // API End Point /Account/login/facebook
    loginWithFacebook(accessToken, deviceId, deviceName) {
        const endPoint = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiEndPoint + '/Account/login/facebook';
        const request = {
            token: accessToken,
            deviceId: deviceId,
            deviceName: deviceName
        };
        return this.http.http.post(endPoint, request);
    }
    // API End Point /Account/login/google (We should remove Redundant Calls If Required)
    loginWithGoogle(accessToken, deviceId, deviceName) {
        const endPoint = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiEndPoint + '/Account/login/google';
        const request = {
            token: accessToken,
            deviceId: deviceId,
            deviceName: deviceName
        };
        return this.http.http.post(endPoint, request);
    }
};
AuthService.ctorParameters = () => [
    { type: src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_3__["HttpProvider"] }
];
AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_3__["HttpProvider"]])
], AuthService);



/***/ }),

/***/ "./src/app/services/linkedin/linkedin.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/linkedin/linkedin.service.ts ***!
  \*******************************************************/
/*! exports provided: LinkedinService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedinService", function() { return LinkedinService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/providers/http/http */ "./src/app/providers/http/http.ts");





let LinkedinService = class LinkedinService {
    constructor(http) {
        this.http = http;
    }
    getRandomState() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 21; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    getAccessToken(authCode) {
        const body = {
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: 'https://localhost:8100/callback',
            client_id: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].linkedinClientId,
            client_secret: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].linkedinClientSecret
        };
        const httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return this.http.http.post('https://www.linkedin.com/oauth/v2/accessToken', body, headers);
    }
    getName(accessToken) {
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        return new Promise((resolve, reject) => {
            this.http.http
                .get('https://api.linkedin.com/v2/me', {}, headers)
                .then(profile => {
                const parsedProfile = JSON.parse(profile.data);
                const firstName = parsedProfile.firstName.localized.en_US;
                const lastName = parsedProfile.lastName.localized.en_US;
                resolve(firstName + ' ' + lastName);
            })
                .catch(err => {
                console.error(err);
                reject('Error. Couldn\'t fetch name');
            });
        });
    }
    getProfilePic(accessToken) {
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        return new Promise((resolve, reject) => {
            this.http.http
                .get('https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))', {}, headers)
                .then(res => {
                const parsedResponse = JSON.parse(res.data);
                resolve(parsedResponse.profilePicture['displayImage~'].elements[0]
                    .identifiers[0].identifier);
            })
                .catch(err => {
                reject('Error getting profile pic');
            });
        });
    }
    getEmail(accessToken) {
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        return new Promise((resolve, reject) => {
            this.http.http
                .get('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))', {}, headers)
                .then(data => {
                const parsedData = JSON.parse(data.data);
                resolve(parsedData.elements[0]['handle~'].emailAddress);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
};
LinkedinService.ctorParameters = () => [
    { type: src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_4__["HttpProvider"] }
];
LinkedinService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_4__["HttpProvider"]])
], LinkedinService);



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module-es2015.js.map