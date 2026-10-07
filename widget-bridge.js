/* Optional native iOS Widget bridge. No-op in normal Safari/PWA mode. */
(function(){
  function nativeCall(name,payload){
    try{
      const h=window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers[name];
      if(h) h.postMessage(payload);
    }catch(e){}
  }
  window.syncWidgetSnapshot=function(){
    try{
      if(!window.webkit?.messageHandlers?.widgetBridge || typeof plannedToday!=='function') return;
      const d=today||new Date();
      const tasks=(plannedToday()||[]).map(x=>({
        id:String(taskId(x)), text:String(displayTaskName(x)||x.text||''), room:String(x.room||''),
        interval:String(intervalLabel(x)||''), effort:Number(taskWeight(x)||1),
        done:!!isDone(x), daily:!!isDailyTask(x)
      }));
      nativeCall('widgetBridge',{type:'todaySnapshot',date:dayKey(d),tasks:tasks.filter(x=>!x.done)});
    }catch(e){}
  };
  window.__applyWidgetActions=function(actions){
    try{
      for(const a of (actions||[])){
        if(!a||!a.id) continue;
        const x=CATALOG.find(t=>String(taskId(t))===String(a.id));
        if(!x) continue;
        if(a.action==='done' && !isDone(x)) markDone(x);
        if(a.action==='undone' && isDone(x)) unmarkDone(x);
      }
      if(actions?.length){ save(); render(); }
      window.syncWidgetSnapshot?.();
    }catch(e){console.warn('Widget action failed',e)}
  };
  nativeCall('widgetBridgeReady',{type:'ready'});
})();
