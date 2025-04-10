// popup.js

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
    delBtn.textContent = '删除';
    delBtn.className = 'btn btn-danger btn-sm';
    delBtn.onclick = () => tr.remove();
    tdAction.appendChild(delBtn);
    
    tr.appendChild(tdKey);
    tr.appendChild(tdValue);
    tr.appendChild(tdAction);
    return tr;
  }
  
  // 添加 URL 参数行
  document.getElementById('addUrlParam').addEventListener('click', () => {
    const tbody = document.querySelector("#urlParamsTable tbody");
    tbody.appendChild(createParamRow());
  });
  
  // 添加 Header 参数行
  document.getElementById('addHeaderParam').addEventListener('click', () => {
    const tbody = document.querySelector("#headerParamsTable tbody");
    tbody.appendChild(createParamRow());
  });
  
  // 根据请求方法调整 Body 输入状态
  document.getElementById('method').addEventListener('change', function(e) {
    const method = e.target.value;
    const bodyArea = document.getElementById('body');
    if(method === 'GET' || method === 'DELETE'){
      bodyArea.disabled = true;
      bodyArea.placeholder = "GET/DELETE 请求不支持请求体，请使用 URL 参数传递数据";
    } else {
      bodyArea.disabled = false;
      bodyArea.placeholder = '例如: {"name": "张三"}';
    }
  });
  
  // 保存原始响应字符串（用于切换展示模式）
  let rawResponseText = "";
  
  // 复制响应按钮
  document.getElementById('copyBtn').addEventListener('click', () => {
    const responseText = document.getElementById('responseInfo').textContent;
    const textarea = document.createElement('textarea');
    textarea.value = responseText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert("响应内容已复制到剪贴板！");
  });
  
  // 发送请求逻辑
  document.getElementById('sendBtn').addEventListener('click', () => {
    const urlInput = document.getElementById('url').value.trim();
    const method = document.getElementById('method').value;
    const contentType = document.getElementById('contentType').value;
    const timeout = parseInt(document.getElementById('timeout').value, 10) || 60000;
    let bodyText = document.getElementById('body').value.trim();
    
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
          alert("请求体不是合法的 JSON 格式，请检查后重试！");
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
    document.getElementById('requestInfo').textContent = JSON.stringify(requestInfo, null, 2);
    
    // 请求计时
    const startTime = performance.now();
    
    // 超时机制：使用 Promise.race
    const fetchPromise = fetch(requestURL, requestOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("请求超时！")), timeout);
    });
    
    Promise.race([fetchPromise, timeoutPromise])
      .then(response => {
        const endTime = performance.now();
        const elapsed = (endTime - startTime).toFixed(2);
        document.getElementById('elapsedTime').textContent = "耗时：" + elapsed + " 毫秒";
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
        document.getElementById('responseInfo').textContent = "请求失败：" + error.message;
        document.getElementById('elapsedTime').textContent = "";
      });
  });
  
  // 根据选择的展示模式更新响应显示
  function updateResponseDisplay() {
    const format = document.getElementById('resultFormat').value;
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
    document.getElementById('responseInfo').textContent = displayText;
  }
  
  // 当切换展示模式时更新响应区显示
  document.getElementById('resultFormat').addEventListener('change', updateResponseDisplay);
  