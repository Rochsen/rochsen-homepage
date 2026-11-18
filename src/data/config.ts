import { computed } from 'vue'
import { computeAge } from '@/utils/script'

/* 计算年龄 */
const birthday = '1999-10-11'
const age = computed(() => computeAge(birthday, '岁'))

// 页面的配置数据
export const ConfigData = {
  // 昵称
  name: 'Rochsen',
  // 头像
  avatar: '/avatar.webp',
  // 标签
  tag: {
    gender: '男',
    age: age.value,
    location: '广东省',
  },
  // 角色
  character: ['待业者', '编程爱好者', 'AI入门者'],

  // 联系方式
  contact: {
    intro: 'https://intro.rochsen.cn',
    blog: 'https://blog.rochsen.cn',
    bilibili: 'https://space.bilibili.com/361524948',
    github: 'https://github.com/Rochsen',
  },

  // 页脚备案
  footer: {
    beian: '粤公网安备 44200102446526号',
    beian_url: 'https://beian.mps.gov.cn/#/query/webSearch?code=44200102446526',
    icp: '粤ICP备2026169315号',
    icp_url: 'https://beian.miit.gov.cn/',
  },

  // 技术栈
  skills: [
    {
      name: 'Linux',
      icon: '',
    },
    {
      name: 'Python',
      icon: '',
    },
    {
      name: 'Pandas',
      icon: '',
    },
    {
      name: 'Pytorch',
      icon: '',
    },
    {
      name: 'FastAPI',
      icon: '',
    },
    {
      name: 'Vue3',
      icon: '',
    },
    {
      name: 'Html5',
      icon: '',
    },
    {
      name: 'CSS',
      icon: '',
    },
    {
      name: 'TypeScript',
      icon: '',
    },
  ],
}
