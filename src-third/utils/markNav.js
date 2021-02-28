import marked from 'marked'
import hljs from "highlight.js";//注意引入的是.js
import 'highlight.js/styles/monokai-sublime.css';
function markNav(markText) {
  const renderer = new marked.Renderer();
  let headArr = []
  renderer.heading = function (text, level) {
    headArr.push({
      title: text,
      level: level,
      index: headArr.length,
      children: []
    })
    return `<h${level} id="header-${headArr.length-1}">${text}</h${level}>`
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  let html = marked(markText)
  let mytree = getTree(headArr)
  return { html ,mytree}
}
function getTree(headArr) {
  const navLevelList = headArr.map((item) => {return item.level})//所有level
  let navLeveltemp = navLevelList.filter((x, index, self) => self.indexOf(x) === index)//去重
  let navLevel = navLeveltemp.sort();//获取升序的列表等级数组
  var toAppendNavList
  var retNavs = []
  navLevel.forEach(level => {
    toAppendNavList = find(headArr,level)
    if (retNavs.length === 0) {
      // 将当前第一级别的数据连接到retNavs
      retNavs = retNavs.concat(toAppendNavList)
    } else {
      // 然后开始处理第二和后面的
      toAppendNavList.forEach(toAppendNav => {
        // 循环第一级别的标题
        toAppendNav = Object.assign(toAppendNav)//拷贝自身属性
        let parentNavIndex = getParentIndex(headArr, toAppendNav.index)//获取每一个父级的id
        return appendToParentNav(retNavs, parentNavIndex, toAppendNav)//将子节点添加到父节点下
      })
    }
  })
  return retNavs
}
// 获取在当前层的索引
function findIndex(arr, parentIndex) {
  let ret = -1
  for(let i=0;i<arr.length;i++){
    if(arr[i].index == parentIndex){
      ret = i
      break
    }
  }
  return ret
}
// 将子列表添加到父级(当前的所有父级数组，父级的index,当前元素)
function appendToParentNav(nav, parentIndex, newNav) {
  // 先第一级里面找，找不到再去children中去找
  let index = findIndex(nav, parentIndex)
  if (index === -1) {
    let subNav
    for (var i = 0; i < nav.length; i++) {
      subNav = nav[i]
      subNav.children.length && appendToParentNav(subNav.children, parentIndex, newNav)
    }
  } else {
    nav[index].children = nav[index].children.concat(newNav)
  }
}
// 寻找某一个级别的所有标题信息
function find(arr, level) {
  return arr.filter(item => {
      if (item.level != level) {
        return false
      }
      return true
  })
}
// 获取每一个父级的id
function getParentIndex(nav, endIndex) {
  for (var i = endIndex - 1; i >= 0; i--) {
    if (nav[endIndex].level > nav[i].level) {
      return nav[i].index
    }
  }
}
export { markNav }