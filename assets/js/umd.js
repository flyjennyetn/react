(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.callOrDownloadApp = {})));
}(window, (function(exports) {
  'use strict';

  function isIos() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  }

  function isAndroid() {
    return navigator.userAgent.match(/Android/i) ? true : false;
  }

  function isMobileQQ() {
    var ua = navigator.userAgent;
    return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua);
  }

  function isBrowserQQ() {
    var ua = navigator.userAgent.toLowerCase();
    return /mqqbrowser/i.test(ua);
  }


  function isWeibo() {
    return navigator.userAgent.toLowerCase().match(/WeiBo/i) == "weibo";
  }

  function isWx() {
    return navigator.userAgent.match(/micromessenger/i) ? true : false;
  }

  function isAndroidChrome() {
    var ua = navigator.userAgent;
    return (ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)) && isAndroid() && !isMobileQQ() && !isBrowserQQ();
  }

  function isIosEgt9() {
    var _ua = navigator.userAgent;
    return /iPhone OS (\d+)/i.exec(_ua) && /iPhone OS (\d+)/i.exec(_ua)[1] >= 9;
  }

  function isIqiyi() {
    var _ua = navigator.userAgent;
    return /iqiyi/i.test(_ua);
  }

  /*
   * HOME,PROTOCAL,APK_INFO
   *
   */
  function gen(config) {
    var PROTOCAL = config.PROTOCAL;
    var SCHEME = config.SCHEME;
    var APK_INFO = config.APK_INFO;
    var FAILBACK = config.FAILBACK;
    var PARAMS = config.PARAMS;
    var schemeStr = '';

    if (isWx()) {
      if (FAILBACK && FAILBACK.YYB) {
        window.location.href = FAILBACK.YYB;
        return;
      }
    } else if (isAndroidChrome() && !!APK_INFO) {
      // 如果不传APK_INFO，则生成普通SCHEME
      schemeStr = "intent://" + APK_INFO.host + "#Intent;" +
        "scheme=" + APK_INFO.scheme + ";" +
        "package=" + APK_INFO.package + ";";
      //"category=" + APK_INFO.category + ";"+
      //"action="   + APK_INFO.action   + ";";
      // 添加参数
      PARAMS && Object.keys(PARAMS).forEach(function(key) {
        schemeStr += "S." + key + "=" + PARAMS[key] + ";";
      });
      schemeStr += "S.browser_fallback_url=" + encodeURIComponent(FAILBACK.ANDROID) + ";" +
        "end";
    } else {
      schemeStr = SCHEME || '';
    }
    console.log(("[callOrDownloadApp] scheme : " + schemeStr));
    return schemeStr;
  }

  function call(schemeUrl) {
    // 微信通过应用宝下载地址唤起
    // ios 9 safari 不支持iframe的方式跳转
    // app内部强制使用frame跳转，防止native未中断跳转造成的问题
    if (isIos() && !isIqiyi()) {
      if (isIosEgt9()) {
        console.log('[callOrDownloadApp] env : isIosEgt9');
        callSchemaByLocation(schemeUrl);
      } else {
        console.log('[callOrDownloadApp] env : isIoslt9');
        callSchemaByALink(schemeUrl);
      }
      return;
    }

    // android chrome 不支持iframe的方式跳转
    if (isAndroidChrome()) {
      console.log('[callOrDownloadApp] env : isAndroidChrome');
      callSchemaByALink(schemeUrl);
      return;
    }
    // 其他浏览器
    // 适用：UC,sogou,firefox,mobileQQ
    console.log('[callOrDownloadApp] env : isOtherBrowser');
    callSchemaByFrame(schemeUrl);
    return;
  }

  function callSchemaByALink(schemeUrl) {
    var body = document.body;
    var aLink = document.createElement("a");
    aLink.style.cssText = "display:none;width:0px;height:0px;";
    aLink.href = schemeUrl;
    body.appendChild(aLink);
    aLink.click();
  }

  function callSchemaByLocation(schemeUrl) {
    window.location.href = schemeUrl;
  }

  function callSchemaByFrame(schemeUrl) {
    var iframe = document.createElement("iframe");
    iframe.style.cssText = "display:none;width:0px;height:0px;";
    var body = document.body;
    body.appendChild(iframe);
    iframe.src = schemeUrl;
  }

  function callback(config) {
    var FAILBACK = config.FAILBACK;
    var TIMEOUT = config.TIMEOUT;
    var start = Date.now();
    var loadTimer = setTimeout(function() {
      if (document.hidden || document.webkitHidden) {
        return;
      }
      // 如果app启动，浏览器最小化进入后台，则计时器存在推迟或者变慢的问题
      // 那么代码执行到此处时，时间间隔必然大于设置的定时时间
      if (Date.now() - start > TIMEOUT + 200) {
        // come back from app
        console.log('打开app成功');
        // 如果浏览器未因为app启动进入后台，则定时器会准时执行，故应该跳转到下载页
      } else {
        console.log('打开app失败，进入回调页面');
        if (FAILBACK) {
          if (isIos()) {
            FAILBACK.IOS && (window.location.href = FAILBACK.IOS);
          } else {
            FAILBACK.ANDROID && (window.location.href = FAILBACK.ANDROID);
          }
        }
      }
    }, TIMEOUT);
    // 当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件
    // 在部分浏览器中可行，网上提供方案，作hack处理
    var visibilitychange = function() {
      var tag = document.hidden || document.webkitHidden;
      tag && clearTimeout(loadTimer);
    };
    document.addEventListener('visibilitychange', visibilitychange, false);
    document.addEventListener('webkitvisibilitychange', visibilitychange, false);
    // pagehide 必须绑定到window
    window.addEventListener('pagehide', function() {
      clearTimeout(loadTimer);
    }, false);
  }

  var coverImg;

  function showCoverImg(src) {
    var body = document.body;
    coverImg = coverImg || (function() {
      var cover = document.createElement('div');
      extend(cover.style, {
        display: 'none',
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,.7)',
        backgroundImage: ("url(" + src + ")"),
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: window.screen.width + 'px',
        height: window.screen.height + 'px',
        zIndex: 100
      });
      cover.addEventListener('touchstart', function(e) {
        cover.style.display = 'none';
        e.stopPropagation();
      });
      body.appendChild(cover);
      return cover;
    })();
    coverImg.style.display = 'block';
  }

  function extend(_to, _from) {
    for (var i in _from) {
      _to[i] = _from[i];
    }
    return _to;
  }

  function callOrDownloadApp(config) {
    // 不支持调起，弹浮层
    if (isMobileQQ() || isWeibo() || isWx()) {
      console.log('show coverImg');
      if (config.COVER_IMG) {
        showCoverImg(config.COVER_IMG);
        return
      } else {
        // 若没有传递COVER_IMG，则依旧进行scheme call
        console.error('config.COVER_IMG is needed , so still call scheme');
      }
    }
    var str = gen(config);
    call(str, config);
    callback(config);
  }

  // app内部拉起，无需调起下载
  function callNative(config) {
    var str = gen(config);
    call(str);
  }

  var index = {
    callOrDownloadApp: callOrDownloadApp,
    callNative: callNative
  }

  exports.callOrDownloadApp = callOrDownloadApp;
  exports.callNative = callNative;
  exports['default'] = index;

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

})));