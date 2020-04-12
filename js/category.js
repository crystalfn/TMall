// import {navData, categoryData} from "./categoryData.js";

DOMReady(function() {
  /**
   * js 写 categoryNav 代码
   */
  let categoryTab = getById("category-tab");
  let categoryNav = document.createElement("ul");
  categoryNav.id = "normal-nav";

  for (let k = 0; k < navData.length; k++) {
    let li = document.createElement("li");
    li.className = "nav-item " + navData[k].name;
    let i = document.createElement("i");
    i.className = "iconfont " + navData[k].iClass;
    li.appendChild(i);
    for (let j = 0; j < navData[k].content.length; j++) {
      let a = document.createElement("a");
      if (j === navData[k].content.length-1) {
        a.innerHTML = navData[k].content[j];
        li.appendChild(a);
      } else {
        a.innerHTML = navData[k].content[j];
        let span = document.createElement("span");
        span.innerHTML = " / ";
        li.appendChild(a);
        li.appendChild(span);
      }
    }
    categoryNav.appendChild(li);
  }
  categoryTab.appendChild(categoryNav);

  /**
   * js 写 catagoryContent 代码
   */
  let categoryContent = getById("category-content");
  for (let i = 0; i < categoryData.length; i++) {
    let cg = document.createElement("div");
    cg.className = "cg-content cg" + i;
    
    let hotWordCon = document.createElement("div");
    hotWordCon.className = "hot-word-con";
    
    for (let j = 0; j < categoryData[i].con.length; j++) {
      let hotWordLine = document.createElement("div");
      hotWordLine.className = "hot-word-line";

      // 每行标题
      let lineTitle = document.createElement("div");
      lineTitle.className = "line-title";
      let titleText = document.createElement("div");
      titleText.className = "title-text";
      titleText.innerText = categoryData[i].con[j].name;
      let icon = document.createElement("i");
      icon.className = "iconfont icon-more";
      lineTitle.appendChild(titleText);
      lineTitle.appendChild(icon);

      // 每行标题对应的内容
      let lineCon = document.createElement("div");
      lineCon.className = "line-con";
      for (let k = 0; k < categoryData[i].con[j].content.length; k++) {
        let a = document.createElement("a");
        a.className = categoryData[i].con[j].content[k].color ? "hot-word highlight" : "hot-word";
        a.innerText = categoryData[i].con[j].content[k].value;
        a.style.color = categoryData[i].con[j].content[k].color ? navData[i].color : "#666";
        lineCon.appendChild(a);
      }

      hotWordLine.appendChild(lineTitle);
      hotWordLine.appendChild(lineCon);
      hotWordCon.appendChild(hotWordLine);
    }

    let hotLogo = document.createElement("div");
    hotLogo.className = "hot-logo";
    for (let j = 0; j < categoryData[i].logo.length; j++) {
      let a = document.createElement("a");
      let img = document.createElement("img");
      img.className = "cg-img";
      img.src = categoryData[i].logo[j];
      a.append(img);
      hotLogo.appendChild(a);
    }
    
    cg.appendChild(hotWordCon);
    cg.appendChild(hotLogo);
    categoryContent.appendChild(cg);
  }
})

DOMReady(function () {
  let categoryContent = getById("category-content");
  let categoryNav = getById("normal-nav");
  let navItems = getByClass(categoryNav ,"nav-item");
  let iconList = getByClass(categoryNav, 'iconfont');
  let cgItems = getByClass(categoryContent, "cg-content");

  for (let i = 0; i < navItems.length; i++) {
    let aList = getByName(navItems[i], "a");
    let spanList = getByName(navItems[i], "span");
    addHandler(navItems[i], "mouseover", function() {
      toggle("flex", navData[i].color, "bold", "#fff");
    });
    addHandler(navItems[i], "mouseout", function() {
      toggle("none", "#fff", "normal", "transparent");
    });
    addHandler(cgItems[i], "mouseover", function() {
      toggle("flex", navData[i].color, "bold", "#fff");
    });
    addHandler(cgItems[i], "mouseout", function() {
      toggle("none", "#fff", "normal", "transparent");
    });

    function toggle(display, fontColor, fontWeight, backGround) {
      
      cgItems[i].style.display = display;

      navItems[i].style.background = backGround;
      iconList[i].style.color = fontColor;
      iconList[i].style.fontWeight = fontWeight;
      
      for (let j = 0; j < aList.length; j++) {
        aList[j].style.color = fontColor;
        aList[j].style.fontWeight = fontWeight;
      }
      
      for (let j = 0; j < spanList.length; j++) {
        spanList[j].style.color = fontColor;
        spanList[j].style.fontWeight = fontWeight;
      }
    }
  }
})