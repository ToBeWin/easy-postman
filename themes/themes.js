// 主题配置
import i18n from '../i18n/index.js';

const themes = {
  // 默认主题 - 简洁浅色
  light: {
    id: "lightTheme",
    colors: {
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      cardBackground: "#fff",
      text: "#2d3748",
      headingText: "#3182ce",
      inputBorder: "#e2e8f0",
      buttonPrimary: "#3182ce",
      buttonSecondary: "#718096",
      buttonDanger: "#e53e3e",
      buttonDisabled: "#cbd5e0",
      codeBackground: "#2d3748",
      codeText: "#e2e8f0"
    },
    shadow: "0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)"
  },
  
  // 暗色主题
  dark: {
    id: "darkTheme",
    colors: {
      background: "#1a202c",
      cardBackground: "#2d3748",
      text: "#e2e8f0",
      headingText: "#63b3ed",
      inputBorder: "#4a5568",
      buttonPrimary: "#4299e1",
      buttonSecondary: "#718096",
      buttonDanger: "#f56565",
      buttonDisabled: "#4a5568",
      codeBackground: "#171923",
      codeText: "#a0aec0"
    },
    shadow: "0 4px 6px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)"
  },
  
  // 绿色主题 - 森林风格
  forest: {
    id: "forestTheme",
    colors: {
      background: "linear-gradient(135deg, #134e5e, #71b280)",
      cardBackground: "#f0fff4",
      text: "#276749",
      headingText: "#2f855a",
      inputBorder: "#c6f6d5",
      buttonPrimary: "#38a169",
      buttonSecondary: "#718096",
      buttonDanger: "#e53e3e",
      buttonDisabled: "#c6f6d5",
      codeBackground: "#276749",
      codeText: "#f0fff4"
    },
    shadow: "0 4px 6px rgba(56, 161, 105, 0.2), 0 1px 3px rgba(56, 161, 105, 0.1)"
  },
  
  // 蓝色主题 - 海洋风格
  ocean: {
    id: "oceanTheme",
    colors: {
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      cardBackground: "#ebf8ff",
      text: "#2c5282",
      headingText: "#2b6cb0",
      inputBorder: "#bee3f8",
      buttonPrimary: "#3182ce",
      buttonSecondary: "#718096",
      buttonDanger: "#e53e3e",
      buttonDisabled: "#bee3f8",
      codeBackground: "#2a4365",
      codeText: "#ebf8ff"
    },
    shadow: "0 4px 6px rgba(49, 130, 206, 0.2), 0 1px 3px rgba(49, 130, 206, 0.1)"
  },
  
  // 现代简约主题
  minimal: {
    id: "minimalTheme",
    colors: {
      background: "#f7fafc",
      cardBackground: "#ffffff",
      text: "#1a202c",
      headingText: "#4a5568",
      inputBorder: "#e2e8f0",
      buttonPrimary: "#4a5568",
      buttonSecondary: "#718096",
      buttonDanger: "#e53e3e",
      buttonDisabled: "#e2e8f0",
      codeBackground: "#2d3748",
      codeText: "#e2e8f0"
    },
    shadow: "0 1px 3px rgba(0,0,0,0.05)"
  },
  
  // 科技感主题
  tech: {
    id: "techTheme",
    colors: {
      background: "#000000",
      cardBackground: "#1a202c",
      text: "#a0aec0",
      headingText: "#81e6d9",
      inputBorder: "#2d3748",
      buttonPrimary: "#38b2ac",
      buttonSecondary: "#718096",
      buttonDanger: "#f56565",
      buttonDisabled: "#2d3748",
      codeBackground: "#011627",
      codeText: "#81e6d9"
    },
    shadow: "0 4px 12px rgba(129, 230, 217, 0.1), 0 1px 3px rgba(129, 230, 217, 0.05)"
  }
};

// 获取当前主题或默认主题
function getCurrentTheme() {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme && themes[savedTheme] ? savedTheme : 'light';
}

// 主题管理
const themeManager = {
  // 获取当前主题
  getCurrentTheme() {
    return getCurrentTheme();
  },
  
  // 设置主题
  setTheme(themeName) {
    if (themes[themeName]) {
      localStorage.setItem('theme', themeName);
      this.applyTheme(themeName);
      return true;
    }
    return false;
  },
  
  // 应用主题到DOM
  applyTheme(themeName) {
    const theme = themes[themeName] || themes.light;
    const root = document.documentElement;
    
    // 设置CSS变量
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--card-background', theme.colors.cardBackground);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--heading-color', theme.colors.headingText);
    root.style.setProperty('--input-border', theme.colors.inputBorder);
    root.style.setProperty('--button-primary', theme.colors.buttonPrimary);
    root.style.setProperty('--button-secondary', theme.colors.buttonSecondary);
    root.style.setProperty('--button-danger', theme.colors.buttonDanger);
    root.style.setProperty('--button-disabled', theme.colors.buttonDisabled);
    root.style.setProperty('--code-background', theme.colors.codeBackground);
    root.style.setProperty('--code-text', theme.colors.codeText);
    root.style.setProperty('--box-shadow', theme.shadow);
  },
  
  // 获取所有可用主题
  getAvailableThemes() {
    return Object.keys(themes).map(key => ({
      id: key,
      name: i18n.t(themes[key].id)
    }));
  },
  
  // 初始化主题
  init() {
    this.applyTheme(getCurrentTheme());
  }
};

export default themeManager; 