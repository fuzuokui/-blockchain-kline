//ds.base
;(function(global, document, undefined){
	var
		rblock = /\{([^\}]*)\}/g,
		ds = global.ds = {
			noop: function(){},
			//Object
			mix: function(target, source, cover){
				if(typeof source !== 'object'){
					cover = source;
					source = target;
					target = this;
				}
				for(var k in source){
					if(cover || target[k] === undefined){
						target[k] = source[k];
					}
				}
				return target;
			},
			//String
			mixStr: function(sStr){
				var args = Array.prototype.slice.call(arguments, 1);
				return String(sStr).replace(rblock, function(a, i){
					return args[i] != null ? args[i] : a;
				});
			},
			trim: function(str){
				return String(str).replace(/^\s*/, '').replace(/\s*$/, '');
			},
			//Number
			getRndNum: function(max, min){
				min = isFinite(min) ? min : 0;
				return Math.random() * ((isFinite(max) ? max : 1000) - min) + min;
			},
			//BOM
			scrollTo: (function(){
				var
					duration = 480,
					view = $(global),
					setTop = function(top){ global.scrollTo(0, top);},
					fxEase = function(t){return (t*=2)<1?.5*t*t:.5*(1-(--t)*(t-2));};
				return function(top, callback){
					top = Math.max(0, ~~top);
					var
						tMark = new Date(),
						currTop = view.scrollTop(),
						height = top - currTop,
						fx = function(){
							var tMap = new Date() - tMark;
							if(tMap >= duration){
								setTop(top);
								return (callback || ds.noop).call(ds, top);
							}
							setTop(currTop + height * fxEase(tMap/duration));
							setTimeout(fx, 16);
						};
					fx();
				};
			})(),
			//DOM
			loadScriptCache: {},
			loadScript: function(url, callback, args){
				var cache = this.loadScriptCache[url];
				if(!cache){
					cache = this.loadScriptCache[url] = {
						callbacks: [],
						url: url
					};

					var
						firstScript = document.getElementsByTagName('script')[0],
						script = document.createElement('script');
					if(typeof args === 'object'){
						for(var k in args){
							script[k] = args[k];
						}
					}
					script.src = url;
					script.onload = script.onreadystatechange =
						script.onerror = function(){
							if(/undefined|loaded|complete/.test(this.readyState)){
								script = script.onreadystatechange =
									script.onload = script.onerror = null;
								cache.loaded = true;

								for(var i=0,len=cache.callbacks.length; i<len; i++){
									cache.callbacks[i].call(null, url);
								}
								cache.callbacks = [];
							}
						};
					firstScript.parentNode.insertBefore(script, firstScript);
				}

				if(!cache.loaded){
					if(typeof callback === 'function'){
						cache.callbacks.push(callback);
					}
				}
				else{
					(callback || ds.noop).call(null, url);
				}
				return this;
			},
			requestAnimationFrame: (function(){
				var handler = global.requestAnimationFrame || global.webkitRequestAnimationFrame ||
					global.mozRequestAnimationFrame || global.msRequestAnimationFrame ||
					global.oRequestAnimationFrame || function(callback){
						return global.setTimeout(callback, 1000 / 60);
					};
				return function(callback){
					return handler(callback);
				};
			})(),
			animate: (function(){
				var
					easeOut = function(pos){ return (Math.pow((pos - 1), 3) + 1);};
				getCurrCSS = global.getComputedStyle ? function(elem, name){
					return global.getComputedStyle(elem, null)[name];
				} : function(elem, name){
					return elem.currentStyle[name];
				};
				return function(elem, name, to, duration, callback, easing){
					var
						from = parseFloat(getCurrCSS(elem, name)) || 0,
						style = elem.style,
						tMark = new Date(),
						size = 0;
					function fx(){
						var elapsed = +new Date() - tMark;
						if(elapsed >= duration){
							style[name] = to + 'px';
							return (callback || ds.noop).call(elem);
						}
						style[name] = (from + size * easing(elapsed/duration)) + 'px';
						ds.requestAnimationFrame(fx);
					};
					to = parseFloat(to) || 0;
					duration = ~~duration || 200;
					easing = easing || easeOut;
					size = to - from;
					fx();
					return this;
				};
			})(),
			//Cookies
			getCookie: function(name){
				var ret = new RegExp('(?:^|[^;])' + name + '=([^;]+)').exec(document.cookie);
				return ret ? decodeURIComponent(ret[1]) : '';
			},
			setCookie: function(name, value, expir){
				var cookie = name + '=' + encodeURIComponent(value);
				if(expir !== void 0){
					var now = new Date();
					now.setDate(now.getDate() + ~~expir);
					cookie += '; expires=' + now.toGMTString();
				}
				document.cookie = cookie;
			},
			//Hacker
			transitionSupport: (function(){
				var
					name = '',
					prefixs = ['', 'webkit', 'moz', 'ms', 'o'],
					docStyle = (document.documentElement || document.body).style;
				for(var i=0,len=prefixs.length; i<len; i++){
					name = prefixs[i] + (prefixs[i]!=='' ? 'Transition' : 'transition');
					if(name in docStyle){
						return {
							propName: name,
							prefix: prefixs[i]
						};
					}
				}
				return null;
			})(),
			isIE6: !-[1,] && !global.XMLHttpRequest
		};

})(this, document);


jQuery(function($){
	//创建DOM
	var 
	quickHTML = document.querySelector("div.quick_link_mian"),
	quickShell = $(document.createElement('div')).html(quickHTML).addClass('quick_links_wrap'),
	quickLinks = quickShell.find('.quick_links');
	quickPanel = quickLinks.next();
	quickShell.appendTo('.mui-mbar-tabs');

	//具体数据操作
	var
	quickPopXHR,
	loadingTmpl = '<div class="loading" style="padding:30px 80px"><i></i><span>Loading...</span></div>',
	popTmpl = '<a href="javascript:;" class="ibar_closebtn" title="关闭"></a><div class="ibar_plugin_title"><h3><%=title%></h3></div><div class="pop_panel"><%=content%></div><div class="arrow"><i></i></div><div class="fix_bg"></div>',
	historyListTmpl = '<ul><%for(var i=0,len=items.length; i<5&&i<len; i++){%><li><a href="<%=items[i].productUrl%>" target="_blank" class="pic"><img alt="<%=items[i].productName%>" src="<%=items[i].productImage%>" width="60" height="60"/></a><a href="<%=items[i].productUrl%>" title="<%=items[i].productName%>" target="_blank" class="tit"><%=items[i].productName%></a><div class="price" title="单价"><em>&yen;<%=items[i].productPrice%></em></div></li><%}%></ul>',
	newMsgTmpl = '<ul><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.commentNewReply%></b></em></span>商品评价/晒单</a></li><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.consultNewReply%></b></em></span>商品咨询</a></li><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.messageNewReply%></b></em></span>我的留言</a></li><li><a href="#"><span class="tips">新通知<em class="num"><b><%=items.arrivalNewNotice%></b></em></span>到货通知</a></li><li><a href="#"><span class="tips">新通知<em class="num"><b><%=items.reduceNewNotice%></b></em></span>降价提醒</a></li></ul>',
	quickPop = quickShell.find('#quick_links_pop'),
	quickDataFns = {

	};

	//showQuickPop
	var 
	prevPopType,
	prevTrigger,
	doc = $(document),
	popDisplayed = false,
	hideQuickPop = function(){
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
		popDisplayed = false;
		prevPopType = '';
		quickPop.hide();
		quickPop.animate({left:280,queue:true});
	},
	showQuickPop = function(type){
		if(quickPopXHR && quickPopXHR.abort){
			quickPopXHR.abort();
		}
		if(type !== prevPopType){
			var fn = quickDataFns[type];
			quickPop.html(ds.tmpl(popTmpl, fn));
			fn.init.call(this, fn);
		}
		doc.unbind('click.quick_links').one('click.quick_links', hideQuickPop);

		quickPop[0].className = 'quick_links_pop quick_' + type;
		popDisplayed = true;
		prevPopType = type;
		quickPop.show();
		quickPop.animate({left:0,queue:true});
	};
	quickShell.bind('click.quick_links', function(e){
		e.stopPropagation();
	});
	quickPop.delegate('a.ibar_closebtn','click',function(){
		quickPop.hide();
		quickPop.animate({left:280,queue:true});
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
	});

	//通用事件处理
	var 
	view = $(window),
	quickLinkCollapsed = !!ds.getCookie('ql_collapse'),
	getHandlerType = function(className){
		return className.replace(/current/g, '').replace(/\s+/, '');
	},
	showPopFn = function(){
		var type = getHandlerType(this.className);
		if(popDisplayed && type === prevPopType){
			return hideQuickPop();
		}
		showQuickPop(this.className);
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
		prevTrigger = $(this).addClass('current');
	},
	quickHandlers = {
		my_qlinks: showPopFn
	};
	quickShell.delegate('a', 'click', function(e){
		var type = getHandlerType(this.className);
		if(type && quickHandlers[type]){
			quickHandlers[type].call(this);
			e.preventDefault();
		}
	});
	
	//Return top
	var scrollTimer, resizeTimer, minWidth = 1350;

	function resizeHandler(){
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(checkScroll, 160);
	}
	
	function checkResize(){
		quickShell[view.width() > 1340 ? 'removeClass' : 'addClass']('quick_links_dockright');
	}
	function scrollHandler(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkResize, 160);
	}
	function checkScroll(){
		view.scrollTop()>100 ? showReturnTop() : hideReturnTop();
	}
	function showReturnTop(){
		quickPanel.addClass('quick_links_allow_gotop');
	}
	function hideReturnTop(){
		quickPanel.removeClass('quick_links_allow_gotop');
	}
	view.bind('scroll.go_top', resizeHandler).bind('resize.quick_links', scrollHandler);
	quickLinkCollapsed && quickShell.addClass('quick_links_min');
	resizeHandler();
	scrollHandler();


	$(".quick_links_panel li").mouseenter(function(){
		$(this).children(".mp_tooltip").animate({left:-92,queue:true});
		$(this).children(".mp_tooltip").css("visibility","visible");
		$(this).children(".ibar_login_box").css("display","block");
	});
	$(".quick_links_panel li").mouseleave(function(){
		$(this).children(".mp_tooltip").css("visibility","hidden");
		$(this).children(".mp_tooltip").animate({left:-121,queue:true});
		$(this).children(".ibar_login_box").css("display","none");
	});
});