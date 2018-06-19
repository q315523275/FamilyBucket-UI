export function createMenusByJsonData (jsonData) {
  const router = window.$globalHub.$router.options.routes.filter(x => x.meta && x.meta.icon)
  let menus = []
  jsonData.forEach(x => {
    if (x.ParentId === 0) {
      if (!x.LinkUrl) {
        menus.push({
          name: x.Name,
          icon: x.Icon,
          id: x.Id,
          sort: x.SortId,
          redirect: 'noredirect',
          sub: []
        })
      } else {
        menus.push({
          name: x.Name,
          icon: x.Icon,
          id: x.Id,
          sort: x.SortId,
          sub: [{
            name: x.Name,
            link: x.LinkUrl + '/index'
          }]
        })
      }
    }
  })
  menus.sort((x1, x2) => {
    return x1.sort - x2.sort
  })
  jsonData = jsonData.filter(x => {
    return x.ParentId !== 0
  })
  menus.forEach(x => {
    jsonData.forEach(y => {
      if (x.id === y.ParentId) {
        // 查找父极路由
        const father = router.find(z => z.children && z.children.find(i => '/' + i.path === y.LinkUrl))
        x.sub.push({
          name: y.Name,
          link: (father ? father.path : '') + y.LinkUrl,
          sort: y.SortId
        })
        x.sub.sort((x1, x2) => {
          return x1.sort - x2.sort
        })
      }
    })
  })
  return menus
}
