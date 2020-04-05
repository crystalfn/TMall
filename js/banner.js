DOMReady(function () {
  let bannerSlider = getById("banner-slider");
  let mainBanners = getByClass(bannerSlider, "main-banner");
  let sliderNav = getByClass(bannerSlider, "slider-nav")[0];
  let sliderNavs = $(sliderNav, ".slider-nav li");
  let curBn = mainBanners[0];
  let curSlider = sliderNavs[0];
  let bnLen = mainBanners.length;
  let curIndex = 0;
  let timer = null;

  // 自动播放
  // autoPlay();

  // 焦点在轮播图上
  addHandler(bannerSlider, "mouseover", function () {
    clearInterval(timer);
  })
  // 焦点移开轮播图
  addHandler(bannerSlider, "mouseout", function () {
    autoPlay();
  })
  // 轮播索引的 mouseover
  addHandler(sliderNav, "mouseover", function (ev) {
    let e = ev || event;
    let target = e.target || e.srcElement;
    for (let i = 0; i < bnLen; i++) {
      if (sliderNavs[i] == target) {
        curIndex = i;
        change();
      }
    }
  })

  function change() {
    curBn.style.display = "none";
    curSlider.className = "";
    doMove(curBn, {
      "opacity": 0
    }, 5);
    mainBanners[curIndex].style.display = "block";
    sliderNavs[curIndex].className = "active";
    doMove(mainBanners[curIndex], {
      "opacity": 100
    }, 5);
    curBn = mainBanners[curIndex];
    curSlider = sliderNavs[curIndex];
  }

  function autoPlay() {
    clearInterval(timer);
    timer = setInterval(function () {
      curIndex++;
      if (curIndex === bnLen) {
        curIndex = 0;
      }
      change();
    }, 5000);
  }
})
