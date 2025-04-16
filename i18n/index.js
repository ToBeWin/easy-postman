// 国际化处理
import en from './en.js';
import zh from './zh.js';

const translations = {
  en,
  zh
};

// 获取浏览器语言或存储的语言设置
function getLanguage() {
  const savedLang = localStorage.getItem('language');
  if (savedLang && translations[savedLang]) {
    return savedLang;
  }
  
  // 默认语言检测
  const browserLang = navigator.language.split('-')[0];
  return translations[browserLang] ? browserLang : 'en';
}

// 初始当前语言
let currentLang = getLanguage();

// 国际化类
const i18n = {
  // 获取当前语言
  getCurrentLang() {
    return currentLang;
  },
  
  // 设置语言
  setLanguage(lang) {
    if (translations[lang]) {
      currentLang = lang;
      localStorage.setItem('language', lang);
      return true;
    }
    return false;
  },
  
  // 获取翻译文本
  t(key) {
    return translations[currentLang][key] || key;
  },
  
  // 获取支持的语言列表
  getSupportedLanguages() {
    return Object.keys(translations);
  }
};

export default i18n; 