
// 点击商品的列表 颜色切换 和 对应的信息切换
$(".list-ul li").bind("click",function(){
	// 颜色切换
	$(this).find("a").addClass("act");
	$(this).siblings().find("a").removeClass("act");
	// 信息对应切换
	$(".all-content .content-item").eq($(this).index()).addClass("act").siblings().removeClass("act");
});
// 默认第一个显示
$(".list-ul li").eq(0).click();
$(".content-show").bind("touchstart", function(e) {
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!e.defaultPrevented) {
            e.preventDefault();
        }
    }   
    startX = e.originalEvent.changedTouches[0].pageX,
    startY = e.originalEvent.changedTouches[0].pageY;
});

// 默认第一个显示
$(".list-c li").eq(0).click()
  $(function(){
    $('.content').css('height',$('.right').height());
    $('.left ul li').eq(0).addClass('active');
    $(window).scroll(function(){
      if($(window).scrollTop() >= 134){
        $('.swiper-container-ul').css('position','fixed');
        $('.left').css('position','fixed');
        $('.right').css('margin-left',$('.left').width());
      }else {
        $('.swiper-container-ul').css('position','');
        $('.left').css('position','');
        $('.right').css('margin-left','');
      };
      //滚动到标杆位置,左侧导航加active
      $('.right ul li').each(function(){
        var target = parseInt($(this).offset().top-$(window).scrollTop()-150);
        var i = $(this).index();
        if (target<=0) {
          $('.left ul li').removeClass('active');
          $('.left ul li').eq(i).addClass('active');
        }
      });
    });
    $('.left ul li').click(function(){
      var i = $(this).index('.left ul li');
      $('body, html').animate({scrollTop:$('.right ul li').eq(i).offset().top-40},500);
    });
    $('.swiper-container-ul-li').click(function(){
      var index = $(this).index();
      $('.swiper-slide').eq(index).show().siblings().hide();
      $('.swiper-container-ul-li').eq(index).addClass('actives').siblings().removeClass('actives');
    });
  });
  // vue
  // 评论 时间处理 过滤时间 //value为13位的时间戳
  Vue.filter('time', function (value) {
      function add0(m) {
          return m < 10 ? '0' + m : m
      }
      var time = new Date(parseInt(value));
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var hour = time.getHours();
      var minute  = time.getMinutes();

      return y + '.' + add0(m) + '.' + add0(d) + ' ' + add0(hour) +':'+ add0(minute) ;
  });
  /*
  list_ratings 外卖的全部数据
  pl_con_1 满意值的初始值
  pl_con_2 不满意值的初始值
  score 五星评分数组
  btn_con 支撑条件
   */
var right = new Vue({
    el: '#content',
    data: {
      list_ratings:jsonnew,
      pl_con_1:0,
      pl_con_2:0,
      active:false,
      block:'none',
      score:[1,2,3,4,5],
      btn_con:jsonnew.seller[0].supports.length,
      porridge:'img/msc.svg',
      porridge_mei:'没收藏'
    },
    methods:{
      // 评论的数据输出 满意 不满意 rateType 0 是满意 rateType 1 是不满意
      pl_conall:function(){ 
        // 防止重复点击累加
        if(this.pl_con_1==0){
          this.list_ratings.goods.forEach(function(value, index, array) {
            value.foods.forEach(function(value1, index1, array1){
               value1.ratings.forEach(function(value2, index2, array2){
                  return value2.rateType==0 ? right.pl_con_1+=1 : right.pl_con_2+=1;
               })
            })
          });
        }else{
          return false;
        }

      },
      // 点击的时候 显示弹窗
      bulletin:function(){
        this.active=true;
        this.block='block';
      },
      // 点击的时候 不显示弹窗
      bulletin_close:function(){
          this.active=false;
          this.block='none';
      },
      add_porridge:function(){
        this.porridge == 'img/msc.svg' ? this.porridge="img/sc.svg" : this.porridge="img/msc.svg";
        this.porridge_mei == '没收藏' ? this.porridge_mei='已收藏' : this.porridge_mei='没收藏';
      }
    }
  });
