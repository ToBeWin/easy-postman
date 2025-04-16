// popup.js
import i18n from './i18n/index.js';
import themeManager from './themes/themes.js';

// DOM元素引用
const elements = {
  // 设置相关
  languageLabel: document.getElementById('languageLabel'),
  languageSelector: document.getElementById('languageSelector'),
  themeLabel: document.getElementById('themeLabel'),
  themeSelector: document.getElementById('themeSelector'),
  
  // 页面标题
  title: document.getElementById('title'),
  
  // 请求配置区域
  requestConfigTitle: document.getElementById('requestConfigTitle'),
  urlLabel: document.getElementById('urlLabel'),
  methodLabel: document.getElementById('methodLabel'),
  contentTypeLabel: document.getElementById('contentTypeLabel'),
  timeoutLabel: document.getElementById('timeoutLabel'),
  
  // URL参数区域
  urlParamsTitle: document.getElementById('urlParamsTitle'),
  keyHeader: document.getElementById('keyHeader'),
  valueHeader: document.getElementById('valueHeader'),
  actionsHeader: document.getElementById('actionsHeader'),
  addUrlParam: document.getElementById('addUrlParam'),
  
  // Headers参数区域
  headersTitle: document.getElementById('headersTitle'),
  keyHeaderHeader: document.getElementById('keyHeaderHeader'),
  valueHeaderHeader: document.getElementById('valueHeaderHeader'),
  actionsHeaderHeader: document.getElementById('actionsHeaderHeader'),
  addHeaderParam: document.getElementById('addHeaderParam'),
  
  // 请求体区域
  bodyTitle: document.getElementById('bodyTitle'),
  bodySubtitle: document.getElementById('bodySubtitle'),
  body: document.getElementById('body'),
  
  // 按钮
  sendBtn: document.getElementById('sendBtn'),
  
  // 请求详情区域
  requestDetailsTitle: document.getElementById('requestDetailsTitle'),
  requestInfo: document.getElementById('requestInfo'),
  
  // 响应详情区域
  responseDetailsTitle: document.getElementById('responseDetailsTitle'),
  resultFormatLabel: document.getElementById('resultFormatLabel'),
  resultFormat: document.getElementById('resultFormat'),
  copyBtn: document.getElementById('copyBtn'),
  responseInfo: document.getElementById('responseInfo'),
  elapsedTime: document.getElementById('elapsedTime'),
  
  // 版权信息
  currentYear: document.getElementById('currentYear'),
  copyrightText: document.getElementById('copyrightText'),
  versionInfo: document.getElementById('versionInfo')
};

// 初始化语言选择器
function initLanguageSelector() {
  // 设置当前语言
  elements.languageSelector.value = i18n.getCurrentLang();
  
  // 添加语言切换事件
  elements.languageSelector.addEventListener('change', (e) => {
    i18n.setLanguage(e.target.value);
    updateUILanguage();
    // 更新主题选择器（为了更新主题名称的翻译）
    initThemeSelector();
  });
}

// 初始化主题选择器
function initThemeSelector() {
  // 获取所有可用主题
  const themes = themeManager.getAvailableThemes();
  
  // 保存当前选择的主题
  const currentTheme = elements.themeSelector.value || themeManager.getCurrentTheme();
  
  // 清空选择器
  elements.themeSelector.innerHTML = '';
  
  // 添加主题选项
  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme.id;
    option.textContent = theme.name;
    elements.themeSelector.appendChild(option);
  });
  
  // 设置当前主题
  elements.themeSelector.value = currentTheme;
  
  // 添加主题切换事件
  elements.themeSelector.addEventListener('change', (e) => {
    themeManager.setTheme(e.target.value);
  });
}

// 初始化版权信息
function initCopyright() {
  // 设置当前年份
  const currentYear = new Date().getFullYear();
  elements.currentYear.textContent = currentYear;
  
  // 更新版权文本和版本信息
  updateCopyrightLanguage();
}

// 更新版权信息的语言
function updateCopyrightLanguage() {
  elements.copyrightText.textContent = i18n.t('allRightsReserved');
  elements.versionInfo.textContent = i18n.t('version') + ' 1.1';
}

// 根据当前语言更新UI文本
function updateUILanguage() {
  // 设置设置面板标签
  elements.languageLabel.textContent = i18n.t('language');
  elements.themeLabel.textContent = i18n.t('theme');
  
  // 设置标题和区域标题
  elements.title.textContent = i18n.t('pageTitle');
  elements.requestConfigTitle.textContent = i18n.t('requestConfig');
  elements.urlParamsTitle.textContent = i18n.t('urlParams');
  elements.headersTitle.textContent = i18n.t('requestHeaders');
  elements.bodyTitle.textContent = i18n.t('requestBody');
  elements.bodySubtitle.textContent = i18n.t('onlyForPostPutPatch');
  elements.requestDetailsTitle.textContent = i18n.t('requestDetails');
  elements.responseDetailsTitle.textContent = i18n.t('responseDetails');
  
  // 设置标签
  elements.urlLabel.textContent = i18n.t('requestUrl');
  elements.methodLabel.textContent = i18n.t('requestMethod');
  elements.contentTypeLabel.textContent = i18n.t('contentType');
  elements.timeoutLabel.textContent = i18n.t('timeout');
  elements.resultFormatLabel.textContent = i18n.t('resultDisplayType');
  
  // 设置表头
  elements.keyHeader.textContent = i18n.t('key');
  elements.valueHeader.textContent = i18n.t('value');
  elements.actionsHeader.textContent = i18n.t('actions');
  elements.keyHeaderHeader.textContent = i18n.t('key');
  elements.valueHeaderHeader.textContent = i18n.t('value');
  elements.actionsHeaderHeader.textContent = i18n.t('actions');
  
  // 设置按钮
  elements.addUrlParam.textContent = i18n.t('add') + ' ' + i18n.t('urlParams');
  elements.addHeaderParam.textContent = i18n.t('add') + ' ' + i18n.t('requestHeaders');
  elements.sendBtn.textContent = i18n.t('send');
  elements.copyBtn.textContent = i18n.t('copy');
  
  // 设置选项
  elements.resultFormat.options[0].textContent = i18n.t('formatted');
  elements.resultFormat.options[1].textContent = i18n.t('raw');
  
  // 更新body placeholder文本
  updateBodyPlaceholder();
  
  // 找到所有已存在的删除按钮并更新文本
  document.querySelectorAll('.btn-danger').forEach(btn => {
    btn.textContent = i18n.t('delete');
  });
  
  // 更新版权信息
  updateCopyrightLanguage();
}

// 更新body的placeholder文本（根据请求方法）
function updateBodyPlaceholder() {
  const method = document.getElementById('method').value;
  if(method === 'GET' || method === 'DELETE'){
    elements.body.disabled = true;
    elements.body.placeholder = i18n.t('getDeleteBodyDisabled');
  } else {
    elements.body.disabled = false;
    elements.body.placeholder = i18n.t('jsonBodyPlaceholder');
  }
}

// 动态添加参数行的函数（用于 URL 参数和 Header 参数）
function createParamRow() {
  const tr = document.createElement('tr');
  const tdKey = document.createElement('td');
  const tdValue = document.createElement('td');
  const tdAction = document.createElement('td');
  
  const keyInput = document.createElement('input');
  keyInput.type = 'text';
  keyInput.className = 'form-control';
  tdKey.appendChild(keyInput);
  
  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.className = 'form-control';
  tdValue.appendChild(valueInput);
  
  const delBtn = document.createElement('button');
  delBtn.textContent = i18n.t('delete');
  delBtn.className = 'btn btn-danger btn-sm';
  delBtn.onclick = () => tr.remove();
  tdAction.appendChild(delBtn);
  
  tr.appendChild(tdKey);
  tr.appendChild(tdValue);
  tr.appendChild(tdAction);
  return tr;
}

// 添加 URL 参数行
elements.addUrlParam.addEventListener('click', () => {
  const tbody = document.querySelector("#urlParamsTable tbody");
  tbody.appendChild(createParamRow());
});

// 添加 Header 参数行
elements.addHeaderParam.addEventListener('click', () => {
  const tbody = document.querySelector("#headerParamsTable tbody");
  tbody.appendChild(createParamRow());
});

// 根据请求方法调整 Body 输入状态
document.getElementById('method').addEventListener('change', function(e) {
  updateBodyPlaceholder();
});

// 保存原始响应字符串（用于切换展示模式）
let rawResponseText = "";

// 复制响应按钮
elements.copyBtn.addEventListener('click', () => {
  const responseText = elements.responseInfo.textContent;
  const textarea = document.createElement('textarea');
  textarea.value = responseText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert(i18n.t('copied'));
});

// 发送请求逻辑
elements.sendBtn.addEventListener('click', () => {
  const urlInput = document.getElementById('url').value.trim();
  const method = document.getElementById('method').value;
  const contentType = document.getElementById('contentType').value;
  const timeout = parseInt(document.getElementById('timeout').value, 10) || 60000;
  let bodyText = elements.body.value.trim();
  
  // 组装 URL 参数
  const urlParams = {};
  document.querySelectorAll("#urlParamsTable tbody tr").forEach(row => {
    const inputs = row.querySelectorAll('input');
    const key = inputs[0].value.trim();
    const value = inputs[1].value.trim();
    if(key) urlParams[key] = value;
  });
  let requestURL = urlInput;
  if(Object.keys(urlParams).length > 0) {
    const qs = Object.entries(urlParams).map(
      ([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v)
    ).join("&");
    requestURL += (urlInput.indexOf('?') !== -1 ? "&" : "?") + qs;
  }
  
  // 组装 Headers
  const headers = {};
  document.querySelectorAll("#headerParamsTable tbody tr").forEach(row => {
    const inputs = row.querySelectorAll('input');
    const key = inputs[0].value.trim();
    const value = inputs[1].value.trim();
    if(key) headers[key] = value;
  });
  if(method !== 'GET' && method !== 'DELETE'){
    headers["Content-Type"] = contentType;
  }
  
  // 构造请求选项
  const requestOptions = {
    method: method,
    headers: headers
  };
  
  if(method !== 'GET' && method !== 'DELETE' && bodyText) {
    if(contentType === "application/json"){
      try {
        requestOptions.body = JSON.stringify(JSON.parse(bodyText));
      } catch(e) {
        alert(i18n.t('invalidJson'));
        return;
      }
    } else {
      requestOptions.body = bodyText;
    }
  }
  
  // 显示请求详情
  const requestInfo = {
    method: method,
    url: requestURL,
    headers: headers,
    body: requestOptions.body || null,
    timeout: timeout
  };
  elements.requestInfo.textContent = JSON.stringify(requestInfo, null, 2);
  
  // 请求计时
  const startTime = performance.now();
  
  // 超时机制：使用 Promise.race
  const fetchPromise = fetch(requestURL, requestOptions);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(i18n.t('requestTimeout'))), timeout);
  });
  
  Promise.race([fetchPromise, timeoutPromise])
    .then(response => {
      const endTime = performance.now();
      const elapsed = (endTime - startTime).toFixed(2);
      elements.elapsedTime.textContent = i18n.t('elapsedTime') + elapsed + i18n.t('milliseconds');
      const ct = response.headers.get("content-type") || "";
      if(ct.indexOf("application/json") !== -1){
        return response.json().then(data => ({data, response, raw: JSON.stringify(data)}));
      } else {
        return response.text().then(data => ({data, response, raw: data}));
      }
    })
    .then(({data, response, raw}) => {
      rawResponseText = raw;
      updateResponseDisplay();
    })
    .catch(error => {
      elements.responseInfo.textContent = i18n.t('requestFailed') + error.message;
      elements.elapsedTime.textContent = "";
    });
});

// 根据选择的展示模式更新响应显示
function updateResponseDisplay() {
  const format = elements.resultFormat.value;
  let displayText = "";
  try {
    if(format === "formatted"){
      const parsed = JSON.parse(rawResponseText);
      displayText = JSON.stringify(parsed, null, 2);
    } else {
      displayText = rawResponseText;
    }
  } catch (e) {
    displayText = rawResponseText;
  }
  elements.responseInfo.textContent = displayText;
}

// 当切换展示模式时更新响应区显示
elements.resultFormat.addEventListener('change', updateResponseDisplay);

// 初始化应用
function initApp() {
  // 初始化主题
  themeManager.init();
  
  // 初始化设置选择器
  initLanguageSelector();
  initThemeSelector();
  
  // 初始化版权信息
  initCopyright();
  
  // 初始化UI语言
  updateUILanguage();
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp);
  