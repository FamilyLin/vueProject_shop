<template>
  <section class="msite">
    <!--首页头部-->
    <!-- : 强制绑定 -->
    <header-top :title="address.name">
      <router-link class="header_search"
            slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login"
            slot="right"
            :to="userInfo._id ? '/userInfo': '/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length > 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="(categorys, index) in categorysArr"
               :key="index">
            <a href="javascript:"
               class="link_to_food"
               v-for="(category, index2) in categorys"
               :key="index2">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list />
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { mapState } from 'vuex'   //映射函数

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default {
  data () {
    return {
      //保存图片的文件夹地址
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    // 获取数据进行显示，需要在此发起请求
    // 首先找到store/action中的调用函数
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },

  computed: {
    //读完数据之后进行显示，按照store/states中的值进行显示
    ...mapState(['address', 'categorys', 'userInfo']),

    // categorys是一维数组，需要生成二维数组，
    // 小数组中的元素个数最大是8
    categorysArr () {
      const { categorys } = this;
      const arr = [];
      let minArr = [];
      let maxNum = 8;
      categorys.forEach(element => {
        if (minArr.length === maxNum) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(element);
      });
      return arr;
    }
  },

  //监视，看到有数据之后执行之后的动作
  watch: {
    categorys (value) {
      //categorys有数据之后，在异步更新界面之前执行有bug，需要解决
      //使用setTimeOut(() => {
      //      new Swiper(), 100
      //})
      //可以实现，但是不太好

      //需要页面更新，就立即创建Swiper对象
      this.$nextTick(() => { //一旦完成界面更新，就执行(需要在数据更新之后)
        // 创建一个Swiper实例对象，实现轮播,需要在列表显示之后轮播
        new Swiper('.swiper-container', {
          pagination: {    //分页器
            el: '.swiper-pagination',
          },
          loop: true     //可以实现循环轮播
        })
      })
    }
  },

  components: {
    HeaderTop,
    ShopList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.msite {
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
