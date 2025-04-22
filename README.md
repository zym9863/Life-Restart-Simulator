# 人生重开模拟器 (Life Restart Simulator)

[English](README_EN.md) | 简体中文

一个基于React和TypeScript的人生模拟游戏，让玩家体验不同的人生道路。

## 游戏介绍 (Game Introduction)

人生重开模拟器是一款模拟人生体验的游戏，玩家可以：
- 选择不同的天赋开始新的人生
- 经历从童年到老年的各个人生阶段
- 应对随机事件和做出影响未来的选择
- 最终查看人生总结和统计数据

## 游戏机制 (Game Mechanics)

### 生命属性 (Life Attributes)

游戏追踪多种生命属性，包括：
- 基本属性：健康、智力、魅力、财富、幸福
- 社交属性：家庭、人际关系、婚姻、子女
- 职业属性：学习、事业
- 个人属性：压力、运气、意志力、创造力、独立性、天赋

### 人生阶段 (Life Stages)

人生分为四个主要阶段：
- 童年 (0-10岁)
- 青少年 (10-18岁)
- 成年 (18-65岁)
- 老年 (65岁以上)

### 游戏流程 (Gameplay Flow)

1. **天赋选择**：玩家使用天赋点分配到不同的天赋上
2. **人生进程**：玩家逐年经历人生
3. **随机事件**：基于当前人生阶段和属性触发事件
4. **选择**：某些事件提供选择，影响未来结果
5. **人生总结**：最后，玩家获得人生旅程的总结

## 技术栈 (Tech Stack)

- React 19
- TypeScript
- Vite 6

## 开发指南 (Development Guide)

### 安装依赖 (Install Dependencies)

```
npm install
```

### 运行开发服务器 (Run Development Server)

```
npm run dev
```

### 构建生产版本 (Build for Production)

```
npm run build
```

### 预览生产构建 (Preview Production Build)

```
npm run preview
```

## 项目结构 (Project Structure)

- **src/App.tsx**: 主应用组件，管理游戏状态和屏幕转换
- **src/components/**: UI组件
  - StartScreen: 初始天赋选择屏幕
  - EventScreen: 主游戏屏幕，显示生活事件和选择
  - SummaryScreen: 最终屏幕，显示人生总结和统计
- **src/logic/**: 游戏逻辑实现
  - LifeSimulator.js: 核心游戏引擎
- **src/data/**: 游戏数据文件
  - events.js: 生活事件集合
  - talents.js: 可选天赋
