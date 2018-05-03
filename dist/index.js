"use strict";function createLi(t){var e=document.createElement("li"),n=document.createTextNode(t.value);return e.appendChild(n),t.liClass&&e.classList.add(t.liClass),t.title&&e.setAttribute("title",t.title),e.addEventListener("click",function(){t.action(t.value)}),e}function createLists(t,e){var n=document.createElement("ul");n.classList.add(e.ulClass);for(var c=0;c<t.length;c++)n.appendChild(createLi(t[c]));return n}function replaceElement(t,e){e.parentNode.replaceChild(t,e)}function scrollToTop(t){var e=10;window.scrollTo(0,0),Array.prototype.slice.call(document.querySelectorAll(t)).forEach(function(t){var n=setInterval(function(){t.scrollTop<=0?clearInterval(n):(t.scrollTop-=e,e+=1)},10)})}function noop(){}function validateCurrent(t,e){e.current>t&&(e.current=t),e.current<=0&&(e.current=1),t<=1&&(e.hide=_config.hideIfEmpty)}function internalAction(t,e){e.current!==t&&(e.current=t,e.action({current:e.current,size:e.size,total:e.total}),build(e),_config.scrollTop&&scrollToTop(_config.scrollContainer))}function createRange(t,e,n){for(var c=[],i=t;i<=e;i++){var r=function(t){return{value:t,title:"cn"===_config.lang?"第"+t+"页":"Page "+t,liClass:n.current===t?_config.activeClass:"",action:function(t){internalAction(t,n)}}}(i);c.push(r)}return c}function createDots(){return[{value:_config.dots,action:function(){}}]}function createFirst(t,e){return createRange(1,1,e).concat(createDots())}function createLast(t,e){return createDots().concat(createRange(t,t,e))}function createPreNext(t,e,n){if(!_config.showPreNext||t<1)return[];var c,i;if("pre"===n){c=e.current-1<=0;var r=e.current-1<=0?1:e.current-1;i={value:_config.prevPageText,title:"cn"===_config.lang?"上一页":"Pre page",page:r}}else{c=e.current+1>t;var a=e.current+1>=t?t:e.current+1;i={value:_config.nextPageText,title:"cn"===_config.lang?"下一页":"Next page",page:a}}return[function(t,n){return{value:t.value,title:t.title,liClass:n?_config.disableClass:"",action:function(c){n||internalAction(t.page,e)}}}(i,c)]}function build(t){t.lists=[];var e=Math.ceil(t.total/t.size),n=2*_config.adjacent+3;if(validateCurrent(e,t),t.lists=t.lists.concat(createPreNext(e,t,"pre")),e<=n)t.lists=t.lists.concat(createRange(1,e,t));else if(t.current-_config.adjacent<=2)t.lists=t.lists.concat(createRange(1,n,t)),t.lists=t.lists.concat(createLast(e,t));else if(t.current<e-(_config.adjacent+2)){var c=t.current-_config.adjacent,i=t.current+_config.adjacent;t.lists=t.lists.concat(createFirst(e,t)),t.lists=t.lists.concat(createRange(c,i,t)),t.lists=t.lists.concat(createLast(e,t))}else{var r=e-n+1,a=e;t.lists=t.lists.concat(createFirst(e,t)),t.lists=t.lists.concat(createRange(r,a,t))}t.lists=t.lists.concat(createPreNext(e,t,"next"));var o=createLists(t.lists,_config);replaceElement(o,t.field),t.field=o,t.hide&&(t.field.style.display="none")}var _config={ulClass:"pagination",dots:"...",activeClass:"active",disableClass:"disabled",hideIfEmpty:!0,showPreNext:!0,scrollTop:!1,scrollContainer:"body",adjacent:2,lang:"en",prevPageText:"⟨",nextPageText:"⟩"},Pagination=function(t,e,n,c){this.total=t||1,this.size=e||1,this.action=n||noop,this.field=document.querySelector(c),this.lists=[],this.current=1,build(this)};Pagination.config=function(t){Object.keys(t).forEach(function(e){if(!_config.hasOwnProperty(e))throw new Error("cannot set config key "+e+", not exists!");_config[e]=t[e]})},Pagination.prototype.goToPage=function(t){t=Number(t),internalAction(t,this)},Pagination.prototype.getCurrentPage=function(){return this.current},module.exports=Pagination;