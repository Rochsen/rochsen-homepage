import { computed } from 'vue'
import { computeAge } from '@/utils/script'
import plan from './plan.json'
import techTack from './techTack.json'
import typewriter from './typewriter.json'
import contact from './contact.json'
import beian from './beiAn.json'

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
  // MBTI
  mbti: 'ISFP',
  mbti_cn: '探险家型人格',
  // 角色
  character: ['待业者', '编程爱好者', 'AI入门者'],
  // 技术栈
  techTack: techTack,
  // 打字机文本
  typewriter: typewriter,
  // 联系方式
  contact: contact,
  // 今年计划
  plan: plan,
  // 页脚备案
  footer: beian,
}
