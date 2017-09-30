var browser = {
    versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
        trident: u.indexOf("Trident") > -1,
        presto: u.indexOf("Presto") > -1,
        webKit: u.indexOf("AppleWebKit") > -1,
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
        iPhone: u.indexOf("iPhone") > -1 ,
        iPad: u.indexOf("iPad") > -1,
        webApp: u.indexOf("Safari") == -1
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
$(".person-window").click(function(){
  $(this).hide();
});
$(".logo-window").click(function(){
  $(this).hide();
});
$("a").each(function(index,ele){
    if($(this).attr("href")==""){
      $(this).attr("target","_blank");
    }
});

$(".ani").each(function(index,ele){
  if($(this).hasClass("randomEffect")){
    var randomEffects = ["fadeInUp","fadeInDown","fadeInLeft","fadeInRight"];
    $(this).attr("swiper-animate-effect",randomEffects[Math.floor(Math.random()*3)]);
  }else{
    $(this).attr("swiper-animate-effect",$(this).data("effect"));
  }
  $(this).attr("swiper-animate-duration","0.5s");
  $(this).attr("swiper-animate-delay","0.3s");
});

if(browser.versions.mobile){
  scheduleSwiperDirection="horizontal";
  transitionSpeed=500;
  $(".margin").css("height",$(window).height()-214);
}else{
  scheduleSwiperDirection="vertical";
  transitionSpeed=1000;
  $(".margin").css("height",$(window).height()-414);
}


var mainSwiper = new Swiper('#main', {
    direction: 'vertical',
    speed:transitionSpeed,
    slidesPerView: 'auto',
    parallax: true,
    mousewheelControl: true,
    roundLengths : true,
    onInit: function(swiper){
      swiperAnimateCache(swiper);  
      swiperAnimate(swiper);
      $("#navScroll li").each(function(index,ele){
          $(this).click(function(){
          	swiper.slideTo($(this).data("link"));
       		$("#navScroll li").removeClass("active");
          	$(this).addClass("active");
          });
      });
    }, 
    onSlideChangeEnd: function(swiper){ 
      swiperAnimate(swiper);
    },
    onSetTransition: function(swiper){
      //if(swiper.activeIndex==2 || swiper.activeIndex==3){
      if(swiper.activeIndex==2){
        swiper.params.onlyExternal=true;
        swiper.disableMousewheelControl();
      }else{
        swiper.params.onlyExternal=false;
        swiper.enableMousewheelControl();
      }
      if(swiper.activeIndex==3 && $("#cqu_map").attr("src")==""){
        //<iframe id="cqu_map" class="map" src="" width="100%" height="100%" frameborder="0" scrolling="no" style="border:0" allowfullscreen></iframe>
        $("#cqu_map").attr("src","https://gaode.com/search?id=B0017822WN&city=500106&geoobj=106.45715%7C29.554432%7C106.462917%7C29.557242&query_type=IDQ&query=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%B8%BB%E6%95%99%E5%AD%A6%E6%A5%BC&zoom=18");
        //creatMap1();
      }
//    setTimeout('timeline01Swiper.setWrapperTranslate(-10)',1500);
      schedule01Swiper.setWrapperTranslate(-10);
      schedule02Swiper.setWrapperTranslate(-10);
      //schedule03Swiper.setWrapperTranslate(-10);
    }
});

// var timelineSwiper = new Swiper('#timeline', {
//     direction: "vertical",
//     speed:transitionSpeed,
//     autoHeight: true,
//     slidesPerView: 1,
//     mousewheelControl: true,
//     roundLengths : true,
//     onSetTransition: function(swiper,translate){
//       //父级锁定&解锁
//       if(mainSwiper.activeIndex==2){
//         mainSwiper.params.onlyExternal=true;
//         mainSwiper.disableMousewheelControl();
//       }else{
//         mainSwiper.params.onlyExternal=false;
//         mainSwiper.enableMousewheelControl();
//       }
//       //timelineSwiper.setWrapperTranslate(-10);
//       schedule01Swiper.setWrapperTranslate(-10);
//       schedule02Swiper.setWrapperTranslate(-10);
//       //schedule03Swiper.setWrapperTranslate(-10);

//     }
// });

// var timeline01Swiper = new Swiper('#timeline01',{
//     scrollbar: '.swiper-scrollbar',
//     direction: 'vertical',
//     speed:transitionSpeed,
//     slidesPerView: 'auto',
//     freeMode: true,
//     freeModeMomentum : false,
//     mousewheelControl: true,
//     mousewheelSensitivity : 0.775,
//     roundLengths : true,
//     onSetTransition: function(swiper,translate){
//       //父级锁定&解锁
//       if(timelineSwiper.activeIndex==0){
//         timelineSwiper.params.onlyExternal=true;
//         timelineSwiper.disableMousewheelControl();
//       }else{
//         timelineSwiper.params.onlyExternal=false;
//         timelineSwiper.enableMousewheelControl();
//       }

//       //translate 一直为0，不可直接用
//       nowTranslate=swiper.translate;
//       if(typeof(beforeTranslate)=="undefined"){
//         beforeTranslate=0;
//       };
//       slideHeight=swiper.slides[0].scrollHeight;
//       swiperHeight=swiper.height;
//       if(nowTranslate>-2 && nowTranslate > beforeTranslate){//当前到顶
//         mainSwiper.slideTo(1);
//         mainSwiper.params.onlyExternal=false;
//         mainSwiper.enableMousewheelControl();
//         beforeTranslate = -1;
//       }
//       if(slideHeight-swiperHeight+nowTranslate<182 && nowTranslate < beforeTranslate){//当前到底
//         mainSwiper.slideTo(3);
//         $("#timeline01 .swiper-wrapper").css("transform","matrix(1, 0, 0, 1, 0, 0)");
//         beforeTranslate = 1;
//       }else{
//         beforeTranslate=nowTranslate;
//       }
//     },
//      onReachBeginning:function(swiper){
//       if(swiper.translate>0){
//         timelineSwiper.slideTo(0);
//       }
//        if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){
//         timelineSwiper.slideTo(1);
//       }
//      }
//     });

var scheduleSwiper = new Swiper('#schedule', {
    direction: 'vertical',
    speed:transitionSpeed,
    pagination: '.swiper-pagination-schedule',
    paginationClickable: true,
    autoHeight: true,
    slidesPerView: 1,
    mousewheelControl: true,
    roundLengths : true,
    onSetTransition: function(swiper,translate){
      //父级锁定&解锁
      if(mainSwiper.activeIndex==2){
        mainSwiper.params.onlyExternal=true;
        mainSwiper.disableMousewheelControl();
      }else{
        mainSwiper.params.onlyExternal=false;
        mainSwiper.enableMousewheelControl();
      }
//    timelineSwiper.setWrapperTranslate(-10);
      schedule01Swiper.setWrapperTranslate(-10);
      schedule02Swiper.setWrapperTranslate(-10);
      //schedule03Swiper.setWrapperTranslate(-10);
    }
});

  var schedule01Swiper = new Swiper('#schedule01',{
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      speed:transitionSpeed,
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentum : false,
      mousewheelControl: true,
      mousewheelSensitivity : 0.775,
      roundLengths : true,
      onSetTransition: function(swiper,translate){
        //父级锁定&解锁
        if(scheduleSwiper.activeIndex==0){
          scheduleSwiper.params.onlyExternal=true;
          scheduleSwiper.disableMousewheelControl();
        }else{
          scheduleSwiper.params.onlyExternal=false;
          scheduleSwiper.enableMousewheelControl();
        }

        //translate 一直为0，不可直接用
        nowTranslate=swiper.translate;
        if(typeof(beforeTranslate)=="undefined"){
          beforeTranslate=0;
        };
        slideHeight=swiper.slides[0].scrollHeight;
        swiperHeight=swiper.height;
        if(nowTranslate>-2 && nowTranslate > beforeTranslate){//当前到顶
          mainSwiper.slideTo(1);
          mainSwiper.params.onlyExternal=false;
          mainSwiper.enableMousewheelControl();
          beforeTranslate = -1;
        }
        if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){//当前到底
          scheduleSwiper.slideTo(1);
          $("#schedule01 .swiper-wrapper").css("transform","matrix(1, 0, 0, 1, 0, 0)");
          beforeTranslate = 1;
        }else{
          beforeTranslate=nowTranslate;
        }
      },
       onReachBeginning:function(swiper){
        if(swiper.translate>0){
          scheduleSwiper.slideTo(0);
        }
         if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){
          scheduleSwiper.slideTo(1);
        }
       }
      });

  var schedule02Swiper = new Swiper('#schedule02',{
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      speed:transitionSpeed,
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentum : false,
      mousewheelControl: true,
      mousewheelSensitivity : 0.775,
      roundLengths : true,
      onSetTransition: function(swiper,translate){
        //父级    
        if(scheduleSwiper.activeIndex==1){
          scheduleSwiper.params.onlyExternal=true;
          scheduleSwiper.disableMousewheelControl();
        }else{
          scheduleSwiper.params.onlyExternal=false;
          scheduleSwiper.enableMousewheelControl();
        }

        //translate 一直为0，不可直接用
        nowTranslate=swiper.translate;
        if(typeof(beforeTranslate)=="undefined"){
          beforeTranslate=0;
        };
        slideHeight=swiper.slides[0].scrollHeight;
        swiperHeight=swiper.height;
        if(nowTranslate>-2 && nowTranslate > beforeTranslate){
          scheduleSwiper.slideTo(0);
          beforeTranslate = -1;
        }
        if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){
          scheduleSwiper.slideTo(2);
          //mainSwiper.slideTo(3);
          $("#schedule02 .swiper-wrapper").css("transform","matrix(1, 0, 0, 1, 0, 0)")
          beforeTranslate=1;
        }else{
          beforeTranslate=nowTranslate;
        }
      },
       onReachBeginning:function(swiper){
         if(swiper.translate>0){
          scheduleSwiper.slideTo(1);
        }
         if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){
          scheduleSwiper.slideTo(2);
          //mainSwiper.slideTo(3);
        }
       }
      });

  var schedule03Swiper = new Swiper('#schedule03',{
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      speed:transitionSpeed,
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentum : false,
      mousewheelControl: true,
      mousewheelSensitivity : 0.775,
      roundLengths : true,
      onSetTransition: function(swiper,translate){
        //父级    
        if(scheduleSwiper.activeIndex==2){
          scheduleSwiper.params.onlyExternal=true;
          scheduleSwiper.disableMousewheelControl();
        }else{
          scheduleSwiper.params.onlyExternal=false;
          scheduleSwiper.enableMousewheelControl();
        }

        //translate 一直为0，不可直接用
        nowTranslate=swiper.translate;
        if(typeof(beforeTranslate)=="undefined"){
          beforeTranslate=0;
        };
        slideHeight=swiper.slides[0].scrollHeight;
        swiperHeight=swiper.height;
        if(nowTranslate>-2 && nowTranslate > beforeTranslate){
          scheduleSwiper.slideTo(1);
          beforeTranslate = -1;
        }
        if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){
          mainSwiper.slideTo(3);
          mainSwiper.params.onlyExternal=false;
          mainSwiper.enableMousewheelControl();
          $("#schedule03 .swiper-wrapper").css("transform","matrix(1, 0, 0, 1, 0, 0)")
          beforeTranslate = 1;
        }else{
          beforeTranslate=nowTranslate;
        }
      },
       onReachBeginning:function(swiper){
         if(swiper.translate>0){
          scheduleSwiper.slideTo(1);
        }
         if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){
          mainSwiper.slideTo(3);
        }
      }
  });


var transportSwiper = new Swiper('#transport', {
    direction: 'horizontal',
    speed:transitionSpeed,
    slidesPerView: 1,
    mousewheelControl: false,
    roundLengths : true,
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    onInit: function(swiper){
      var spanText = ["DAY 1","DAY 2","社区专场"];
      $(".swiper-pagination-bullet").each(function(index,ele){
        $(this).html(spanText[index]);
      });
    },
    onSetTransition: function(swiper,translate){
      if(swiper.activeIndex==1 && $("#hotel_map1").attr("src")==""){
        $("#hotel_map1").attr("src","https://gaode.com/search?id=B001702171&city=500106&geoobj=106.577472%7C29.556369%7C106.579741%7C29.557361&query_type=IDQ&query=%E9%87%8D%E5%BA%86%E4%B8%BD%E8%8B%91%E5%A4%A7%E9%85%92%E5%BA%97&zoom=18");
      }
      if(swiper.activeIndex==2 && $("#hotel_map2").attr("src")==""){
        $("#hotel_map2").attr("src","https://gaode.com/search?query=%E7%93%A6%E8%88%8D%E5%9B%BD%E9%99%85%E9%9D%92%E5%B9%B4%E6%97%85%E8%88%8D(%E9%87%8D%E5%BA%86%E8%A7%A3%E6%94%BE%E7%A2%91%E8%BE%83%E5%9C%BA%E5%8F%A3%E5%9C%B0%E9%93%81%E7%AB%99%E5%BA%97)&city=500000&geoobj=106.570113%7C29.55144%7C106.57478%7C29.5536&zoom=18");
      }
    }
  });