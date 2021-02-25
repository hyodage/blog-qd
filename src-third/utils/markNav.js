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
  let navTree = getTree(headArr)
  return { navTree, html }
}
function getTree(headArr) {
  const navLevelList = headArr.map((item) => {return item.level})//所有level
  let navLeveltemp = navLevelList.filter((x, index, self) => self.indexOf(x) === index)//去重
  let navLevel = navLeveltemp.sort();//升序
  var toAppendNavList
  var retNavs = []
  navLevel.forEach(level => {
    toAppendNavList = find(headArr, {
      level: level
    })
    if (retNavs.length === 0) {
      retNavs = retNavs.concat(toAppendNavList)
    } else {
      toAppendNavList.forEach(toAppendNav => {
        toAppendNav = Object.assign(toAppendNav)
        let parentNavIndex = getParentIndex(headArr, toAppendNav.index)
        return appendToParentNav(retNavs, parentNavIndex, toAppendNav)
      })
    }
  })
  return retNavs
}
function findIndex(arr, condition) {
  let ret = -1
  arr.forEach((item, index) => {
    for (var key in condition) {
      if (condition.hasOwnProperty(key) && condition[key] !== item[key]) { // 不进行深比较
        return false
      }
    }
    ret = index
  })
  return ret
}
function appendToParentNav(nav, parentIndex, newNav) {
  // 先第一级里面找，找不到再去children中去找
  let index = findIndex(nav, {
    index: parentIndex
  })

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
function find(arr, condition) {
  return arr.filter(item => {
    for (var key in condition) {
      if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
        return false
      }
    }
    return true
  })
}
function getParentIndex(nav, endIndex) {
  for (var i = endIndex - 1; i >= 0; i--) {
    if (nav[endIndex].level > nav[i].level) {
      return nav[i].index
    }
  }
}
export { markNav }