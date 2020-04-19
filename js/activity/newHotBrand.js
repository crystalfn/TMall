let newHotBrandData = [
  {
    "picture": "../img/content/activity/newHotBrand/0.webp",
    "value": "优惠券 ￥50"
  },
  {
    "picture": "../img/content/activity/newHotBrand/1.webp",
    "value": "Dove/多芬"
  },
  {
    "picture": "../img/content/activity/newHotBrand/2.jpg",
    "value": "Samyang/三养"
  },
  {
    "picture": "../img/content/activity/newHotBrand/3.png",
    "value": "优惠券 ￥200"
  },
  {
    "picture": "../img/content/activity/newHotBrand/4.png",
    "value": "优惠券 ￥200"
  },
  {
    "picture": "../img/content/activity/newHotBrand/5.png",
    "value": "BURBERRY/博柏利"
  },
  {
    "picture": "../img/content/activity/newHotBrand/6.png",
    "value": "Devondale/德运"
  },
  {
    "picture": "../img/content/activity/newHotBrand/7.png",
    "value": "优惠券 ￥70"
  },
  {
    "picture": "../img/content/activity/newHotBrand/8.png",
    "value": "可复美"
  },
  {
    "picture": "../img/content/activity/newHotBrand/9.png",
    "value": "优惠券 ￥150"
  },
  {
    "picture": "../img/content/activity/newHotBrand/10.webp",
    "value": "Schneider Electric/施耐德"
  },
  {
    "picture": "../img/content/activity/newHotBrand/11.webp",
    "value": "ENFINITAS/蓝臻"
  },
  {
    "picture": "../img/content/activity/newHotBrand/12.png",
    "value": "GATEMAN"
  },
  {
    "picture": "../img/content/activity/newHotBrand/13.png",
    "value": "优惠券 ￥200"
  },
  {
    "picture": "../img/content/activity/newHotBrand/14.png",
    "value": "ROYAL CANIN/皇家"
  },
  {
    "picture": "../img/content/activity/newHotBrand/15.png",
    "value": "LEAGUE OF LEGENDS/英雄联盟"
  },
  {
    "picture": "../img/content/activity/newHotBrand/16.png",
    "value": "优惠券 ￥65"
  },
  {
    "picture": "../img/content/activity/newHotBrand/17.webp",
    "value": "优惠券 ￥200"
  },
  {
    "picture": "../img/content/activity/newHotBrand/18.jpg",
    "value": "HTC Vive"
  },
  {
    "picture": "../img/content/activity/newHotBrand/19.webp",
    "value": "scout"
  },
  {
    "picture": "../img/content/activity/newHotBrand/20.png",
    "value": "Teddy Bear/泰迪熊"
  },
  {
    "picture": "../img/content/activity/newHotBrand/21.webp",
    "value": "优惠券 ￥1000"
  },
  {
    "picture": "../img/content/activity/newHotBrand/22.png",
    "value": "优惠券 ￥30"
  },
  {
    "picture": "../img/content/activity/newHotBrand/23.png",
    "value": "帕尔马之水"
  },
  {
    "picture": "../img/content/activity/newHotBrand/24.png",
    "value": "AMERICAN TOURISTER/美旅"
  },
  {
    "picture": "../img/content/activity/newHotBrand/25.webp",
    "value": "双心"
  },
  {
    "picture": "../img/content/activity/newHotBrand/26.webp",
    "value": "hot topic"
  },
  {
    "picture": "../img/content/activity/newHotBrand/27.png",
    "value": "BARNEYS NEW YORK"
  },
  {
    "picture": "../img/content/activity/newHotBrand/28.png",
    "value": "优惠券 ￥150"
  },
];

let newHotBrandCon = getByClass(activity, "new-hot-brand-con")[0];
let newHotBrandModuleBody = document.createElement("div");
newHotBrandModuleBody.className = "module-body";

let brandItemBody = document.createElement("ul");
brandItemBody.className = "brand-item-body";

for (let i = 0; i < newHotBrandData.length; i++) {
  let brandItem = document.createElement("li");
  brandItem.className = "brand-item";
  let brandImg = document.createElement("div");
  brandImg.className = "brand-img";
  let img = document.createElement("img");
  img.src = newHotBrandData[i].picture;
  brandImg.appendChild(img);
  let brandMask = document.createElement("a");
  brandMask.className = "brand-mask";
  brandMask.innerHTML = `
    <span class="coupon">${newHotBrandData[i].value}</span>
    <span class="enter">点击进入</span>
  `;

  brandItem.appendChild(brandImg);
  brandItem.appendChild(brandMask);
  brandItemBody.append(brandItem);
}

newHotBrandModuleBody.appendChild(brandItemBody);
newHotBrandCon.appendChild(newHotBrandModuleBody);

// fresh botton
let brandFresh = document.createElement("div");
brandFresh.className = "brand-fresh";
brandFresh.innerHTML = `
  <a class="fresh-con">
    <i class="iconfont icon-rotate"></i>
    <span class="btn-text">换一批</span>
  </a>
`;
newHotBrandCon.appendChild(brandFresh);

// 添加点击后的动画
let freshCon = getByClass(brandFresh, "fresh-con")[0];
addHandler(freshCon, 'click', function() {
  let brandItems = getByClass(brandItemBody, "brand-item");
  for (let i = 0; i < brandItems.length; i++) {
    brandItems[i].className = "brand-item brand-item-active";
    setTimeout(function () {
      brandItems[i].className = "brand-item";
    }, 1000)
  }
})