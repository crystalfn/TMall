let brandwallData = [
  {
    "cName": "品牌闪购",
    "eName": "BRAND SALE",
    "picture": "../img/content/activity/brandwall/1.webp"
  },
  {
    "cName": "聚名品",
    "eName": "LUXURY CHANNEL",
    "picture": "../img/content/activity/brandwall/2.webp"
  },
  {
    "cName": "品牌活动",
    "eName": "BRAND ACTIVITY",
    "picture": "../img/content/activity/brandwall/3.webp"
  },
];

let activity = getById("activity");
let brandwallCon = getByClass(activity, "brandwall-con")[0];
let brandwallModuleBody = document.createElement("div");
brandwallModuleBody.className = "module-body";

for (let i = 0; i < brandwallData.length; i++) {
  let brandwallItem = document.createElement("div");
  brandwallItem.className = "brandwall-item";
  let head = document.createElement("div");
  head.className = "head";
  let cn = document.createElement("span");
  cn.className = "cn";
  cn.innerText = brandwallData[i].cName;
  let en = document.createElement("span");
  en.className = "en";
  en.innerText = brandwallData[i].eName;
  let more = document.createElement("a");
  more.className = "more";
  if (i > 0) {
    more.innerHTML = `更多<i class="iconfont icon-more-copy-right"></i>`;
  } else {
    more.innerHTML = `<i class="iconfont icon-more-copy-right"></i>`;
  }
  head.appendChild(cn);
  head.appendChild(en);
  head.appendChild(more);

  let body = document.createElement("a");
  body.className = "body";
  let img = document.createElement("img");
  img.src = brandwallData[i].picture;
  body.appendChild(img);

  brandwallItem.appendChild(head);
  brandwallItem.appendChild(body);
  brandwallModuleBody.appendChild(brandwallItem);
}

brandwallCon.appendChild(brandwallModuleBody);