/**
 * @author Air
 * @team Air
 * @name logFilter
 * @version 1.0.0
 * @description 屏蔽无用 API 请求日志
 * @priority 10
 * @admin false
 * @public true
 * @encrypt false
 * @disable false
 * @service true
 * @classification ["Air"]
 */
 
sysMethod.createStartupCompletionHook('logFilterInit', async () => {
  // 需要屏蔽的关键字列表
  const filterKeywords = [
    '/api/web/ws/.websocket',
    '/api/bot/',
    '/favicon.ico'
  ];
  if (!BncrJSLogger) return;
  // 保存原始 warn 方法
  const origWarn = BncrJSLogger.warn.bind(BncrJSLogger);
  // 重写 warn
  BncrJSLogger.warn = (...args: any[]) => {
    const msg = args.join(' ');
    // 如果包含屏蔽关键字则直接返回，不打印
    if (filterKeywords.some(k => msg.includes(k))) return;
    origWarn(...args);
  };
  console.log('[logFilter] 已启动，屏蔽无用 API 日志');
});
