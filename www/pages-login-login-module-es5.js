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

module.exports = "<!-- <ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      Login\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header> -->\r\n<ion-content>\r\n\r\n  <ion-grid style=\"height: 100%;\">\r\n    <ion-row align-items-center style=\"height: 100%;\">\r\n      <ion-col>\r\n\r\n\r\n\r\n        <form class=\"form\" [formGroup]=\"validationsForms\" (ngSubmit)=\"login(validationsForms.value)\">\r\n          <ion-grid>\r\n            <ion-row color=\"primary\" justify-content-center>\r\n              <ion-col align-self-center size-md=\"6\" size-lg=\"5\" size-xs=\"12\">\r\n                <div text-center>\r\n                  <h3>Login to Results Framework</h3>\r\n                </div>\r\n                <div padding>\r\n                  <ion-item>\r\n                    <ion-input formControlName=\"email\" type=\"email\" placeholder=\"your@email.com\" required></ion-input>\r\n                  </ion-item>\r\n                  <ion-item>\r\n                    <ion-input formControlName=\"password\" type=\"password\" placeholder=\"Password\" required></ion-input>\r\n                  </ion-item>\r\n                  <div class=\"validation-errors\">\r\n                    <ng-container *ngFor=\"let validation of validationMessages.password\">\r\n                      <div class=\"error-message\"\r\n                        *ngIf=\"validationsForms.get('password').hasError(validation.type) && (validationsForms.get('password').dirty || validationsForms.get('password').touched)\">\r\n                        {{ validation.message }}\r\n                      </div>\r\n                    </ng-container>\r\n                  </div>\r\n                </div>\r\n                <div padding>\r\n                  <ion-button size=\"large\" type=\"submit\" [disabled]=\"!validationsForms.valid\" expand=\"block\">Login\r\n                  </ion-button>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </form>\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col text-center>\r\n              <a [routerLink]=\"'/register'\">Register</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;\r\n              <a [routerLink]=\"'/reset-password'\">Forgot Password</a>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row color=\"primary\" justify-content-center>\r\n            <ion-col align-self-center size-md=\"6\" size-lg=\"5\" size-xs=\"12\" text-center>\r\n              <ion-button fill=\"clear\" size=\"large\" (click)=\"linkedInLogin()\">\r\n                <ion-icon slot=\"icon-only\" name=\"logo-linkedin\"></ion-icon>\r\n              </ion-button>\r\n              <ion-button fill=\"clear\" size=\"large\" (click)=\"signInWithGoogle()\">\r\n                <ion-icon slot=\"icon-only\" name=\"logo-google\"></ion-icon>\r\n              </ion-button>\r\n              <ion-button fill=\"clear\" size=\"large\" (click)=\"signInWithFB()\">\r\n                <ion-icon slot=\"icon-only\" name=\"logo-facebook\"></ion-icon>\r\n              </ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n\r\n\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n\r\n\r\n\r\n</ion-content>\r\n"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");




var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }
];
var LoginPageRoutingModule = /** @class */ (function () {
    function LoginPageRoutingModule() {
    }
    LoginPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], LoginPageRoutingModule);
    return LoginPageRoutingModule;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/pages/login/login-routing.module.ts");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");







var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _login_routing_module__WEBPACK_IMPORTED_MODULE_5__["LoginPageRoutingModule"]
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");












var LoginPage = /** @class */ (function () {
    function LoginPage(alertController, loadingController, platform, linkedinService, auth, navCtrl, googlePlus, fb, localAuthService, formBuilder) {
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.platform = platform;
        this.linkedinService = linkedinService;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.googlePlus = googlePlus;
        this.fb = fb;
        this.localAuthService = localAuthService;
        this.formBuilder = formBuilder;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.validationsForms = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].minLength(6),
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required
            ])),
        });
        this.validationMessages = {
            username: [
                { type: 'required', message: 'Username is required.' },
                { type: 'minlength', message: 'Username must be at least 5 characters long.' },
                { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
                { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
                { type: 'validUsername', message: 'Your username has already been taken.' }
            ],
            name: [
                { type: 'required', message: 'Name is required.' }
            ],
            lastname: [
                { type: 'required', message: 'Last name is required.' }
            ],
            email: [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ],
            phone: [
                { type: 'required', message: 'Phone is required.' },
                { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
            ],
            password: [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' },
                { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
            ],
            confirm: [
                { type: 'required', message: 'Confirm password is required' }
            ],
            matchingPasswords: [
                { type: 'areEqual', message: 'Password mismatch' }
            ],
            terms: [
                { type: 'pattern', message: 'You must accept terms and conditions.' }
            ],
        };
    };
    LoginPage.prototype.login = function (data) {
    };
    LoginPage.prototype.linkedInLogin = function () {
        var _this = this;
        this.presentLoading();
        var provider = new ng2_cordova_oauth_core__WEBPACK_IMPORTED_MODULE_3__["LinkedIn"]({
            clientId: src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].linkedinClientId,
            appScope: ['r_emailaddress', 'r_liteprofile'],
            redirectUri: 'https://localhost:8100/callback',
            responseType: 'code',
            state: this.linkedinService.getRandomState()
        });
        var oauth = new ng2_cordova_oauth_platform_browser__WEBPACK_IMPORTED_MODULE_5__["OauthBrowser"]();
        this.platform.ready().then(function () {
            oauth
                .logInVia(provider)
                .then(function (success) {
                _this.linkedinService.getAccessToken(success['code'])
                    .then(function (data) {
                    alert('data' + data);
                });
            })
                .catch(function (err) {
                _this.loading.dismiss();
                console.error(err);
                // this.showAlert('Error', 'Something went wrong');
            });
        });
    };
    LoginPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Loading'
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // AP --- Google Login
    LoginPage.prototype.signInWithGoogle = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            //this.localAuthService.loginWithFacebook(res.accessToken, 'Device1', 'Device2');
            _this.navCtrl.navigateForward('tabs');
        })
            .catch(function (err) { return console.error(err); });
    };
    // AP --- Facebook Login
    LoginPage.prototype.signInWithFB = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            _this.navCtrl.navigateForward('tabs');
            //this.localAuthService.loginWithFacebook(res.authResponse.accessToken, 'Device1', 'Device2');
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    LoginPage.prototype.signOut = function () {
        //
        this.googlePlus.logout();
        this.fb.logout();
        this.navCtrl.navigateForward('login');
        //this.auth.signOut();
    };
    LoginPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: src_app_services_linkedin_linkedin_service__WEBPACK_IMPORTED_MODULE_6__["LinkedinService"] },
        { type: angular4_social_login__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
        { type: _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_8__["GooglePlus"] },
        { type: _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_9__["Facebook"] },
        { type: src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"] }
    ]; };
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
            src_app_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"]])
    ], LoginPage);
    return LoginPage;
}());



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
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/providers/http/http */ "./src/app/providers/http/http.ts");





var LinkedinService = /** @class */ (function () {
    function LinkedinService(http) {
        this.http = http;
    }
    LinkedinService.prototype.getRandomState = function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 21; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    LinkedinService.prototype.getAccessToken = function (authCode) {
        var body = {
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: 'https://localhost:8100/callback',
            client_id: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].linkedinClientId,
            client_secret: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].linkedinClientSecret
        };
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return this.http.http.post('https://www.linkedin.com/oauth/v2/accessToken', body, headers);
    };
    LinkedinService.prototype.getName = function (accessToken) {
        var _this = this;
        var headers = {
            Authorization: "Bearer " + accessToken
        };
        return new Promise(function (resolve, reject) {
            _this.http.http
                .get('https://api.linkedin.com/v2/me', {}, headers)
                .then(function (profile) {
                var parsedProfile = JSON.parse(profile.data);
                var firstName = parsedProfile.firstName.localized.en_US;
                var lastName = parsedProfile.lastName.localized.en_US;
                resolve(firstName + ' ' + lastName);
            })
                .catch(function (err) {
                console.error(err);
                reject('Error. Couldn\'t fetch name');
            });
        });
    };
    LinkedinService.prototype.getProfilePic = function (accessToken) {
        var _this = this;
        var headers = {
            Authorization: "Bearer " + accessToken
        };
        return new Promise(function (resolve, reject) {
            _this.http.http
                .get('https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))', {}, headers)
                .then(function (res) {
                var parsedResponse = JSON.parse(res.data);
                resolve(parsedResponse.profilePicture['displayImage~'].elements[0]
                    .identifiers[0].identifier);
            })
                .catch(function (err) {
                reject('Error getting profile pic');
            });
        });
    };
    LinkedinService.prototype.getEmail = function (accessToken) {
        var _this = this;
        var headers = {
            Authorization: "Bearer " + accessToken
        };
        return new Promise(function (resolve, reject) {
            _this.http.http
                .get('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))', {}, headers)
                .then(function (data) {
                var parsedData = JSON.parse(data.data);
                resolve(parsedData.elements[0]['handle~'].emailAddress);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    LinkedinService.ctorParameters = function () { return [
        { type: src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_4__["HttpProvider"] }
    ]; };
    LinkedinService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_providers_http_http__WEBPACK_IMPORTED_MODULE_4__["HttpProvider"]])
    ], LinkedinService);
    return LinkedinService;
}());



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module-es5.js.map