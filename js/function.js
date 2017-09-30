// funciones
var load = 0, fake = 0;
document.onreadystatechange = function(e){
  show();
if(document.readyState=="interactive" && document.readyState=="complete"){
  $('html').addClass('loading');
  var int = setInterval(function(){
      var prev = parseInt($('.num').text());
      if(prev >= 100){
        clearInterval(int);
        show();
      } else {
        var num = Math.floor((Math.random() * 5) + 1);
        var res = prev+num;
        if(res > 100){
          res = 100;
          if(load == 1){
            show();
          } else {
            fake = 1;
          }
        }
        $('.per').css('height', res + '%');
        $('.num').text(res + '%');
      }
    },100);
  }
}
function show(){
  $('#loader').fadeOut(400, 'easeInQuint');
}

$(window).load(function(){
  load = 1;      
  if(fake){
    show();
    console.log('fake');
  };

});
$(document).ready(function(e) {
  //nav
  $("nav li").on('click', function(e){
    e.preventDefault();
    //nav跳转
  });

  //btmenu
  $('.bt-menu').on('click', function(e){
    e.preventDefault();
    if($(this).hasClass('open')){
      closeMenu();
    }else{
      openMenu();
    }
    $(this).toggleClass('open');
  }); 
  
});

/////FUNCIONES

function openMenu(){ 
  $('header').addClass('op');
  var menu = $('nav');
  btMenu = $('.bt-menu');
  li = menu.find('li');
  li.removeClass('view');
  btMenu.animate({'left':220}, 200, 'easeOutQuart', function(){
    menu.animate({'left': 0}, 300, 'easeOutQuart', function(){
      var i = 0;
      var menuX = setInterval(function() {
          li.eq(i).addClass('view')
          i++;
          if(i > li.length){
            clearInterval(menuX); 
          }
        }, 100);  
    }); 
  });
}

function closeMenu(){
  $('header').removeClass('op');
  var menu = $('nav');
  btMenu = $('.bt-menu');
  li = menu.find('li');   
  li.each(function(index, element) {
    $(this).removeClass('view');
  });
  menu.animate({'left':'-250px'}, 300, 'easeInQuart');
  btMenu.animate({'left': '23px'}, 100, 'easeInQuart');
}

function creatMap1(){
  var lnglat = [116.473188,39.993253];
  var map = new AMap.Map('cqu_map', { resizeEnable: true, center: lnglat, zoom: 15 });
  var marker = new AMap.Marker({ position: lnglat });
  marker.setMap(map);
  var content='<div class="info-content">The Main Teaching Building, Chongqing University<br/>重庆大学主教学楼</div></div>';
  var infowindow1 = new AMap.AdvancedInfoWindow({ content: content, offset: new AMap.Pixel(0, -30) });
  infowindow1.open(map,lnglat);
  map.setLang('zh_en');
  map.plugin(["AMap.ToolBar"], function() {
    map.addControl(new AMap.ToolBar());
  });
  map.setStatus({scrollWheel:false})
}