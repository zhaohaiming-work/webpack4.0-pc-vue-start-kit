const Index = r => require.ensure([], () => r(require('../views/home')), 'Index')
const Test = r => require.ensure([], () => r(require('../views/test')), 'Test')

export default [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/test/:id',
        component: Test
      }
    ]
  }
]
