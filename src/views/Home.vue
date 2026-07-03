<script setup>
import { ref } from 'vue'

const featureCards = [
  { id: 'classroom', icon: 'book', title: '红色课堂', desc: '实景照片AI教学', color: '#8B1A1A' },
  { id: 'heroes', icon: 'user', title: '英雄烈士', desc: '铭记英雄事迹', color: '#8B1A1A' },
  { id: 'tourism', icon: 'map', title: '红色旅游', desc: '探索红色足迹', color: '#8B1A1A' },
  { id: 'dendrobium', icon: 'leaf', title: '石斛科普', desc: '了解特色产业', color: '#8B1A1A' },
  { id: 'culture', icon: 'building', title: '优秀文化', desc: '传承优秀文化', color: '#8B1A1A' },
  { id: 'video', icon: 'play', title: '视频科普', desc: '观看科普视频', color: '#8B1A1A' }
]

const heroes = [
  {
    name: '刘淠西',
    years: '(1904-1932)',
    desc: '皖西早期党组织和农民运动领导人，曾在霍山从事革命活动，后被反动派逮捕牺牲。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Chinese%20revolutionary%20hero%20Liu%20Peixi%20from%201920s%20wearing%20traditional%20Chinese%20tunic%20suit%2C%20black%20and%20white%20vintage%20photo%2C%20serious%20expression%2C%20sepia%20tone%2C%20historical%20photograph&image_size=square'
  },
  {
    name: '沈子修',
    years: '(1880-1955)',
    desc: '皖西早期党组织创建人之一，致力于农民运动和抗日救国。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Chinese%20revolutionary%20Shen%20Zixiu%20from%201920s%20wearing%20western%20suit%20and%20tie%2C%20black%20and%20white%20vintage%20photo%2C%20serious%20expression%2C%20sepia%20tone%2C%20historical%20photograph&image_size=square'
  },
  {
    name: '舒传贤',
    years: '(1897-1927)',
    desc: '中共早期党员，积极投身革命工作，1927年在安庆牺牲。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Chinese%20revolutionary%20Shu%20Chuanxian%20from%201920s%20wearing%20dark%20coat%2C%20black%20and%20white%20vintage%20photo%2C%20serious%20expression%2C%20sepia%20tone%2C%20historical%20photograph&image_size=square'
  },
  {
    name: '姜高琦',
    years: '(1906-1927)',
    desc: '六二惨案烈士，反对军阀统治，英勇就义。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20young%20Chinese%20revolutionary%20Jiang%20Gaoqi%20from%201920s%20wearing%20collared%20jacket%2C%20black%20and%20white%20vintage%20photo%2C%20young%20face%2C%20determined%20expression%2C%20sepia%20tone%2C%20historical%20photograph&image_size=square'
  }
]

const videos = [
  { title: '霍山方言介绍', duration: '05:45', thumb: 'landscape' },
  { title: '石斛的传说', duration: '04:12', thumb: 'landscape' },
  { title: '石斛的种植', duration: '06:30', thumb: 'landscape' },
  { title: '石斛的功效', duration: '03:28', thumb: 'landscape' }
]

const currentVideo = ref(0)
const isPlaying = ref(false)
const currentTime = ref(83)
const duration = ref(345)

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const progressPercent = ref((currentTime.value / duration.value) * 100)

const icons = {
  book: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M15 15l5-3v6l-5-3z" opacity="0.6"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3L15 5l-6-3-6 3v16l6-2 6 3 6-3V3zm-6 15l-6-3V6l6 3v9z"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v2h20V7L12 2zM4 10v10h4v-6h8v6h4V10H4zm6 10H6v-4h4v4zm8 0h-4v-4h4v4z"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/><path d="M4 4v3h3V4H4zm0 5v3h3V9H4zm0 5v3h3v-3H4zm13-3l-2-2v4l2-2z" opacity="0.5"/></svg>`
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section id="home" class="hero-section">
      <div class="hero-bg">
        <div class="hero-mountain"></div>
        <div class="hero-ribbon hero-ribbon-left"></div>
        <div class="hero-ribbon hero-ribbon-right"></div>
        <div class="hero-monument"></div>
        <div class="hero-particles"></div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">红色小课堂</h1>
        <div class="hero-subtitle-wrapper">
          <span class="subtitle-line"></span>
          <p class="hero-subtitle">传承红色基因 · 赓续红色血脉</p>
          <span class="subtitle-line"></span>
        </div>
        <p class="hero-desc">学习革命历史，弘扬革命精神，传承红色文化</p>
        <div class="hero-buttons">
          <button class="btn-primary hero-btn">开始学习</button>
          <button class="btn-outline hero-btn">了解更多</button>
        </div>
      </div>
      
      <div class="hero-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
      </div>
    </section>

    <!-- Feature Cards Section -->
    <section class="features-section">
      <div class="features-container">
        <div 
          v-for="(card, idx) in featureCards" 
          :key="card.id" 
          class="feature-card"
          :style="{ animationDelay: `${idx * 0.1}s` }"
        >
          <div class="feature-icon" v-html="icons[card.icon]"></div>
          <h3 class="feature-title">{{ card.title }}</h3>
          <p class="feature-desc">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- AI Classroom Section -->
    <section id="classroom" class="section classroom-section">
      <div class="section-header">
        <h2 class="section-title" data-num="03">虚拟情景讲课 · 沉浸式AI教学</h2>
      </div>
      <div class="classroom-container">
        <div class="classroom-sidebar">
          <div class="sidebar-tab active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>课程介绍</span>
          </div>
        </div>
        <div class="classroom-main">
          <div class="classroom-scene">
            <div class="scene-overlay"></div>
            <div class="scene-fire"></div>
            <div class="classroom-interaction">
              <h3>课堂互动</h3>
              <div class="interaction-content">
                <div class="ai-avatar">
                  <div class="avatar-circle"></div>
                </div>
                <p>欢迎来到红色小课堂，今天我们将一起学习霍山革命历史...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Section -->
    <section id="video" class="section video-section">
      <div class="section-header">
        <h2 class="section-title" data-num="04">方言科普视频 · 本地文化传承</h2>
      </div>
      <div class="video-container">
        <div class="video-player">
          <div class="video-display">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Huoshan%20county%20Anhui%20province%20beautiful%20landscape%20with%20river%20bridges%20mountains%20traditional%20Chinese%20architecture%20cinematic%20wide%20shot%20aerial%20view&image_size=landscape_16_9" alt="视频封面" class="video-thumb" />
            <div class="video-overlay">
              <div class="video-info">
                <h3>霍山与石斛</h3>
                <p>霍山方言讲解</p>
              </div>
              <div class="video-subtitle">
                <p>霍山水好，石斛品质高，我们这里的人从古就用它养生。</p>
              </div>
              <div class="video-controls">
                <div class="progress-bar">
                  <div class="progress-track">
                    <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
                    <div class="progress-thumb" :style="{ left: progressPercent + '%' }"></div>
                  </div>
                </div>
                <div class="controls-row">
                  <div class="controls-left">
                    <button class="control-btn play-btn" @click="isPlaying = !isPlaying">
                      <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                    </button>
                    <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
                  </div>
                  <div class="controls-right">
                    <button class="control-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="23 7 16 12 23 17 23 7"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                    </button>
                    <button class="control-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    </button>
                    <button class="control-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                      </svg>
                    </button>
                    <button class="control-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 3 21 3 21 9"/>
                        <polyline points="9 21 3 21 3 15"/>
                        <line x1="21" y1="3" x2="14" y2="10"/>
                        <line x1="3" y1="21" x2="10" y2="14"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="video-list">
          <div class="list-header">
            <h3>视频列表</h3>
            <span>共8集</span>
          </div>
          <div class="list-items">
            <div 
              v-for="(video, idx) in videos" 
              :key="idx"
              :class="['video-item', { active: idx === currentVideo }]"
              @click="currentVideo = idx"
            >
              <div class="item-thumb">
                <img :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Huoshan%20Anhui%20landscape%20mountains%20river%20pagoda%20scenic%20view&image_size=square`" :alt="video.title" />
                <span class="item-duration">{{ video.duration }}</span>
              </div>
              <div class="item-info">
                <h4>{{ video.title }}</h4>
                <span>{{ video.duration }}</span>
              </div>
            </div>
          </div>
          <button class="btn-primary more-videos-btn">查看更多视频</button>
        </div>
      </div>
    </section>

    <!-- Heroes Section -->
    <section id="heroes" class="section heroes-section">
      <div class="section-header">
        <h2 class="section-title" data-num="06">英雄烈士卡片介绍</h2>
      </div>
      <div class="heroes-grid">
        <div 
          v-for="(hero, idx) in heroes" 
          :key="idx" 
          class="hero-card"
          :style="{ animationDelay: `${idx * 0.15}s` }"
        >
          <div class="hero-photo-frame">
            <div class="photo-vintage"></div>
            <img :src="hero.image" :alt="hero.name" class="hero-photo" />
          </div>
          <h3 class="hero-name">{{ hero.name }}</h3>
          <p class="hero-years">{{ hero.years }}</p>
          <p class="hero-desc">{{ hero.desc }}</p>
          <button class="hero-detail-btn">查看详情</button>
        </div>
      </div>
      <div class="more-heroes">
        <button class="more-btn">
          查看更多英雄
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" fill="#F9F3E8"/>
              <path d="M24 8L14 18H18V28H14L24 40L34 28H30V18H34L24 8Z" fill="#8B1A1A"/>
            </svg>
          </div>
          <div>
            <h4>红色小课堂</h4>
            <p>传承红色基因 · 赓续红色血脉</p>
          </div>
        </div>
        <p class="footer-copy">© 2026 红色小课堂 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(180deg, #F9F3E8 0%, #F5EDE0 50%, #EDE4D4 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-mountain {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: 
    url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ink%20painting%20style%20mountains%20misty%20landscape%20sepia%20tones%20traditional%20art%20minimal&image_size=landscape_16_9') center/cover no-repeat;
  opacity: 0.15;
  mask-image: linear-gradient(to top, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 100%);
}

.hero-ribbon {
  position: absolute;
  bottom: 0;
  width: 60%;
  height: 200px;
  background: linear-gradient(135deg, var(--red-primary) 0%, var(--red-accent) 50%, var(--red-deep) 100%);
  border-radius: 50% 50% 0 0;
  filter: blur(0.5px);
}

.hero-ribbon-left {
  left: -10%;
  transform: rotate(-5deg);
  opacity: 0.9;
}

.hero-ribbon-right {
  right: -10%;
  transform: rotate(5deg);
  opacity: 0.8;
  background: linear-gradient(225deg, var(--red-primary) 0%, var(--red-light) 100%);
}

.hero-monument {
  position: absolute;
  bottom: 80px;
  right: 8%;
  width: 200px;
  height: 280px;
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=revolutionary%20monument%20pagoda%20on%20mountain%20peak%20sepia%20tones%20vintage%20Chinese%20memorial%20tower%20silhouette&image_size=portrait_4_3') center/contain no-repeat;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 40px 20px;
}

.hero-title {
  font-size: clamp(48px, 10vw, 120px);
  font-weight: 900;
  font-family: var(--font-brush);
  color: var(--red-deep);
  text-shadow: 
    2px 2px 0 rgba(139, 26, 26, 0.1),
    -1px -1px 0 rgba(201, 169, 110, 0.3);
  margin-bottom: 20px;
  letter-spacing: 12px;
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 24px;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.subtitle-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--red-primary), transparent);
}

.hero-subtitle {
  font-size: clamp(20px, 3vw, 32px);
  font-weight: 600;
  color: var(--red-primary);
  letter-spacing: 6px;
  font-family: var(--font-serif);
}

.hero-desc {
  font-size: clamp(14px, 2vw, 18px);
  color: var(--brown-light);
  margin-bottom: 40px;
  letter-spacing: 4px;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-buttons {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.hero-btn {
  min-width: 160px;
}

.hero-dots {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(139, 26, 26, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--red-primary);
  width: 24px;
  border-radius: 4px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Features Section */
.features-section {
  position: relative;
  z-index: 3;
  margin-top: -80px;
  padding: 0 40px 60px;
}

.features-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  background: var(--parchment-light);
  border-radius: 16px;
  box-shadow: 
    0 10px 40px rgba(107, 16, 16, 0.15),
    0 0 0 1px var(--border-red);
  overflow: hidden;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 16px;
  text-align: center;
  border-right: 1px solid var(--parchment-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.feature-card:last-child {
  border-right: none;
}

.feature-card:hover {
  background: linear-gradient(180deg, rgba(139, 26, 26, 0.05) 0%, transparent 100%);
  transform: translateY(-4px);
}

.feature-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: var(--red-primary);
  transition: width 0.3s ease;
}

.feature-card:hover::after {
  width: 60%;
}

.feature-icon {
  width: 56px;
  height: 56px;
  color: var(--red-primary);
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

.feature-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--red-deep);
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 14px;
  color: var(--brown-light);
}

/* Section Common */
.section {
  padding: 80px 40px;
  max-width: 1440px;
  margin: 0 auto;
}

.section-header {
  text-align: left;
  margin-bottom: 40px;
}

/* Classroom Section */
.classroom-section {
  background: var(--parchment);
}

.classroom-container {
  display: flex;
  gap: 24px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(107, 16, 16, 0.15);
  border: 1px solid var(--border-red);
  min-height: 500px;
}

.classroom-sidebar {
  width: 120px;
  background: linear-gradient(180deg, var(--parchment-dark) 0%, var(--parchment) 100%);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  color: var(--brown-light);
  cursor: pointer;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.sidebar-tab.active {
  color: var(--red-primary);
  background: rgba(139, 26, 26, 0.08);
  border-left-color: var(--red-primary);
}

.sidebar-tab svg {
  width: 28px;
  height: 28px;
}

.sidebar-tab span {
  font-size: 14px;
  font-weight: 500;
}

.classroom-main {
  flex: 1;
  position: relative;
}

.classroom-scene {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background: linear-gradient(180deg, #2a1a1a 0%, #1a0f0f 100%);
  overflow: hidden;
}

.scene-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 30% 20%, rgba(255, 100, 50, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(139, 26, 26, 0.2) 0%, transparent 50%);
}

.scene-fire {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=historical%20battle%20scene%20revolutionary%20war%20smoke%20embers%20dramatic%20cinematic%20dark%20moody%20atmosphere&image_size=landscape_16_9') center/cover;
  opacity: 0.4;
}

.classroom-interaction {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 320px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.1);
}

.classroom-interaction h3 {
  color: var(--parchment-light);
  font-size: 20px;
  margin-bottom: 16px;
  text-align: center;
}

.interaction-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.ai-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--red-primary), var(--red-accent));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(196, 30, 58, 0.5);
}

.avatar-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--parchment-light);
  position: relative;
}

.avatar-circle::after {
  content: '';
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--red-primary);
}

.avatar-circle::before {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 15px;
  border-radius: 0 0 30px 30px;
  background: var(--red-primary);
}

.interaction-content p {
  color: rgba(249, 243, 232, 0.9);
  font-size: 14px;
  text-align: center;
  line-height: 1.6;
}

/* Video Section */
.video-section {
  background: linear-gradient(180deg, var(--parchment) 0%, var(--parchment-dark) 100%);
}

.video-container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
}

.video-player {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

.video-display {
  position: relative;
  aspect-ratio: 16/9;
  background: #000;
}

.video-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  background: linear-gradient(transparent 40%, rgba(0,0,0,0.8) 100%);
}

.video-info h3 {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: var(--font-serif);
}

.video-info p {
  color: rgba(255,255,255,0.8);
  font-size: 28px;
  font-family: var(--font-serif);
  margin-bottom: 20px;
}

.video-subtitle p {
  color: #fff;
  font-size: 20px;
  margin-bottom: 24px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.video-controls {
  width: 100%;
}

.progress-bar {
  margin-bottom: 12px;
}

.progress-track {
  position: relative;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: var(--red-accent);
  border-radius: 2px;
  transition: width 0.1s;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0,0,0,0.3);
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.controls-left, .controls-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  transition: all 0.2s;
}

.control-btn:hover {
  background: rgba(255,255,255,0.1);
}

.control-btn svg {
  width: 22px;
  height: 22px;
}

.play-btn {
  width: 48px;
  height: 48px;
}

.play-btn svg {
  width: 28px;
  height: 28px;
}

.time-display {
  color: rgba(255,255,255,0.8);
  font-size: 16px;
}

.video-list {
  background: linear-gradient(180deg, #2a1a1a 0%, #1a0f0f 100%);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.list-header h3 {
  color: var(--parchment-light);
  font-size: 22px;
}

.list-header span {
  color: var(--gold);
  font-size: 16px;
}

.list-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  overflow-y: auto;
}

.video-item {
  display: flex;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.video-item:hover {
  background: rgba(255,255,255,0.05);
}

.video-item.active {
  background: rgba(139, 26, 26, 0.3);
  border: 1px solid var(--red-primary);
}

.item-thumb {
  position: relative;
  width: 100px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-duration {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0,0,0,0.8);
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-info h4 {
  color: var(--parchment-light);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.item-info span {
  color: rgba(255,255,255,0.5);
  font-size: 14px;
}

.more-videos-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
}

/* Heroes Section */
.heroes-section {
  background: var(--parchment-light);
  border-radius: 24px;
  margin: 0 40px 80px;
  max-width: calc(1440px - 80px);
  border: 1px solid var(--border-red);
}

.heroes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.hero-card {
  background: linear-gradient(180deg, var(--parchment-light) 0%, var(--parchment) 100%);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 2px solid var(--parchment-dark);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--red-primary), var(--gold), var(--red-primary));
  opacity: 0;
  transition: opacity 0.3s;
}

.hero-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(107, 16, 16, 0.2);
  border-color: var(--red-primary);
}

.hero-card:hover::before {
  opacity: 1;
}

.hero-photo-frame {
  position: relative;
  width: 180px;
  height: 220px;
  margin: 0 auto 20px;
  border-radius: 8px;
  overflow: hidden;
  border: 3px solid var(--parchment-dark);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.photo-vintage {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(45deg, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at center, transparent 40%, rgba(139, 69, 19, 0.15) 100%);
  z-index: 1;
  pointer-events: none;
}

.hero-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(20%) contrast(1.05);
  transition: transform 0.4s ease;
}

.hero-card:hover .hero-photo {
  transform: scale(1.05);
}

.hero-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--red-deep);
  margin-bottom: 8px;
  letter-spacing: 4px;
}

.hero-years {
  font-size: 18px;
  color: var(--brown-light);
  margin-bottom: 16px;
  font-family: var(--font-serif);
}

.hero-desc {
  font-size: 15px;
  color: var(--brown-text);
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: left;
  text-indent: 2em;
}

.hero-detail-btn {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--red-primary);
  border-radius: 8px;
  color: var(--red-primary);
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-serif);
  background: transparent;
  transition: all 0.3s ease;
}

.hero-detail-btn:hover {
  background: var(--red-primary);
  color: var(--parchment-light);
}

.more-heroes {
  text-align: center;
  margin-top: 40px;
}

.more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--parchment-light);
  font-size: 20px;
  font-weight: 600;
  font-family: var(--font-serif);
  padding: 12px 32px;
  background: linear-gradient(180deg, var(--red-primary) 0%, var(--red-deep) 100%);
  border-radius: 8px;
  transition: all 0.3s;
  letter-spacing: 2px;
}

.more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 16, 16, 0.3);
}

.more-btn svg {
  width: 20px;
  height: 20px;
}

/* Footer */
.site-footer {
  background: linear-gradient(180deg, var(--red-deep) 0%, #4a0a0a 100%);
  padding: 40px;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-logo svg {
  width: 48px;
  height: 48px;
}

.footer-brand h4 {
  color: var(--parchment-light);
  font-size: 22px;
  margin-bottom: 4px;
}

.footer-brand p {
  color: var(--gold-light);
  font-size: 13px;
}

.footer-copy {
  color: rgba(249, 243, 232, 0.5);
  font-size: 14px;
}

/* Responsive */
@media (max-width: 1024px) {
  .features-container {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .feature-card:nth-child(3) {
    border-right: none;
  }
  
  .video-container {
    grid-template-columns: 1fr;
  }
  
  .heroes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .features-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .feature-card:nth-child(2n) {
    border-right: none;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .heroes-grid {
    grid-template-columns: 1fr;
  }
  
  .section {
    padding: 60px 20px;
  }
  
  .features-section {
    padding: 0 20px 40px;
  }
  
  .heroes-section {
    margin: 0 20px 60px;
  }
}
</style>
