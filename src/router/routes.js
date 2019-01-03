/* eslint-disable no-undef */
import NotFind from '../components/404.vue'
import NotPermission from '../components/401.vue'
// 生产/测试环境，使用路由懒加载
const view = process.env.NODE_ENV === 'development'
  ? file => require(`@/pages/${file}.vue`).default
  : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/', component: view('login/Login') },
  { path: '/login', component: view('login/Login') },
  {
    path: '/main',
    component: resolve => require(['../layout/Layout'], resolve),
    children: [
      {
        path: '/404',
        name: '404',
        component: NotFind,
        meta: { title: '404' }
      },
      {
        path: '/401',
        name: '401',
        component: NotPermission,
        meta: { title: '401' }
      },
      //      {
      //        path: '/setpassword',
      //        name: '修改密码',
      //        component: view('SetPassword/Index'),
      //        meta: { title: '修改密码' }
      //      },
      {
        path: '/dashboard',
        name: '首页',
        component: view('dashboard/Index'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/configService',
    name: '配置中心',
    redirect: 'noredirect',
    component: resolve => require(['../layout/Layout'], resolve),
    meta: { icon: 'el-icon-document' },
    children: [
      {
        path: 'appList',
        name: 'appList',
        component: view('configService/company/Index'),
        meta: { title: '项目组管理' }
      },
      {
        path: 'projectList',
        name: 'projectList',
        component: view('configService/project/Index'),
        meta: { title: '项目管理' }
      },
      {
        path: 'configList',
        name: 'configList',
        component: view('configService/config/Index'),
        meta: { title: '配置管理' }
      }
    ]
  },
  {
    path: '/setting',
    name: '系统设置',
    redirect: 'noredirect',
    component: resolve => require(['../layout/Layout'], resolve),
    meta: { icon: 'el-icon-document' },
    children: [
      {
        path: 'platform',
        name: 'platform',
        component: view('setting/platform/Index'),
        meta: { title: '平台设置' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: view('setting/menu/Index'),
        meta: { title: '菜单设置' }
      },
      {
        path: 'project',
        name: 'project',
        component: view('setting/project/Index'),
        meta: { title: '项目设置' }
      },
      {
        path: 'apimanage',
        name: 'apimanage',
        component: view('setting/api/Index'),
        meta: { title: '项目资源' }
      },
      {
        path: 'role',
        name: 'role',
        component: view('setting/role/Index'),
        meta: { title: '角色设置' }
      },
      {
        path: 'user',
        name: 'user',
        component: view('setting/user/Index'),
        meta: { title: '用户设置' }
      }
    ]
  },
  {
    path: '/microservice',
    name: '微服务管理',
    redirect: 'noredirect',
    component: resolve => require(['../layout/Layout'], resolve),
    meta: { icon: 'el-icon-document' },
    children: [
      {
        path: 'service',
        name: 'service',
        component: view('microservice/service/Index'),
        meta: { title: '服务发现' }
      },
      {
        path: 'route',
        name: 'route',
        component: view('microservice/route/Index'),
        meta: { title: '路由管理' }
      },
      {
        path: 'trace',
        name: 'trace',
        component: view('microservice/trace/Index'),
        meta: { title: '链路追踪' }
      },
      {
        path: 'traceOnline',
        name: 'traceOnline',
        component: view('microservice/trace/TraceOnline'),
        meta: { title: '链路监听' }
      },
      {
        path: 'access',
        name: 'access',
        component: view('microservice/trace/ECharts'),
        meta: { title: '访问量统计' }
      }
    ]
  }
]
