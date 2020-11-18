<template>
  <div class="class">
    <van-nav-bar
      :fixed="true"
      title="分类"
      right-text="书城"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></van-nav-bar>
    <div class="book-img-box">
      <img src="https://mkp999.github.io/novel/img/home1.07658490.jpg" alt />
      <img src="https://mkp999.github.io/novel/img/home6.8165fb12.jpg" alt />
    </div>
    <van-tabs v-model="active">
      <van-tab title="男生">
        <div class="book-box clearfix">
          <div
            class="book-item fl clearfix"
            :class="[index % 2 == 0 ? 'book-left' : 'book-right']"
            v-for="(item, index) in BookClassData.male"
            :key="index"
          >
            <div class="info fl">
              <div class="info-title">{{ item.name }}</div>
              <div class="info-tags">{{ item.bookCount }} 本</div>
            </div>
            <div class="imgPic fr">
              <!-- {{item.bookCover}}    -->
              <img v-for="(cover,i) in item.bookCover" :key="i"
                :src="cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="女生">
        <div class="book-box clearfix">
          <div
            class="book-item fl clearfix"
            :class="[index % 2 == 0 ? 'book-left' : 'book-right']"
            v-for="(item, index) in BookClassData.female"
            :key="index"
          >
            <div class="info fl">
              <div class="info-title">{{item.name}}</div>
              <div class="info-tags">{{item.bookCount}}</div>
            </div>
            <div class="imgPic fr">
              <img  v-for="(cover,i) in item.bookCover" :key="i"
                :src="cover"
                alt
              />
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="出版">
        <div class="book-box clearfix">
          <div
            class="book-item fl clearfix"
            :class="[index % 2 == 0 ? 'book-left' : 'book-right']"
            v-for="(item, index) in BookClassData.press"
            :key="index"
          >
            <div class="info fl">
              <div class="info-title">{{item.name}}</div>
              <div class="info-tags">{{item.bookCount}}</div>
            </div>
            <div class="imgPic fr">
              <img  v-for="(cover,i) in item.bookCover" :key="i"
                :src="cover"
                alt
              />
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="漫画">
        <div class="book-box clearfix">
          <div
            class="book-item fl clearfix"
            :class="[index % 2 == 0 ? 'book-left' : 'book-right']"
            v-for="(item, index) in BookClassData.picture"
            :key="index"
          >
            <div class="info fl">
              <div class="info-title">{{item.name}}</div>
              <div class="info-tags">{{item.bookCount}}</div>
            </div>
            <div class="imgPic fr">
              <img  v-for="(cover,i) in item.bookCover" :key="i"
                :src="cover"
                alt
              />
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      BookClassData: {
        male: [],
        female: [],
      },
    };
  },
  created() {
    this.bookFather();
  },
  methods: {
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //   书籍父分类
    bookFather() {
      this.axios({
        method: "GET",
        url: "/categories",
      })
        .then((result) => {
          if (result.status == 200) {
            
            // 
            for(let key in result.data){
              // 
              for(let i=0; i<result.data[key].length; i++){
                // 
                for(let j=0; j<result.data[key][i].bookCover.length; j++){
                  result.data[key][i].bookCover[j]='https://statics.zhuishushenqi.com'+result.data[key][i].bookCover[j]
                }
              }
            }
            this.BookClassData = result.data;
            
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ #app {
  padding-top: 0;
  padding-bottom: 0;
}

.class {
  /deep/ .van-nav-bar {
    background-color: #b83320;

    .van-icon-arrow-left,
    .van-nav-bar__text,
    .van-nav-bar__title {
      color: #fff;
    }
  }

  /deep/.van-nav-bar__title {
    height: 46px;
    line-height: 46px;
    width: 100%;
    max-width: 60%;
    font-size: 16px;
    letter-spacing: 3px;
  }

  /deep/.van-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .book-img-box {
    display: flex;
    img {
      display: inline-block;
      flex: 1;
      padding-top: 10px;
      width: 45%;
    }
    img:first-child {
      padding-left: 10px;
      padding-right: 5px;
    }
    img:last-child {
      padding-left: 5px;
      padding-right: 10px;
    }
  }

  /deep/ .van-tabs__wrap {
    border-bottom: 1px solid #eee;
  }
  .book-box {
    padding: 26px 16px 0;
  }
  .book-item {
    background-color: #fafafa;
    padding: 0 10px;
    width: calc(~"50% - 27px");
    height: 86px;
    border-radius: 5px;
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .book-left {
    margin-right: 5px;
  }
  .book-right {
    margin-left: 5px;
  }
  .info {
    height: 44px;
    width: 70px;
    // margin-top: 20%;
    line-height: 22px;
    .info-title {
      font-size: 14px;
    }
    .info-tags {
      font-size: 12px;
      color: #999;
    }
  }
  .imgPic {
    position: relative;
    bottom: 0;
    right: 0;
    width: 90px;
    height: 44px;
    // overflow: hidden;

    img {
      width: 45px;
      background-size: cover;
      /* 某个特定的图形元素可以成为鼠标事件 */
      pointer-events: none;

      &:first-child,
      &:nth-child(2) {
        position: absolute;
        transform-origin: bottom;
        transform: scale(0.8) translateY(3px);
        // top: -4px;
        bottom: 0px;
      }
      &:first-child{
        left: 0;
      }
      &:nth-child(2){
        right: 0;
      }

      &:last-child {
        position: absolute;
        right: 0;
        // bottom: 0px;
        transform: translate(-40%) translateY(-20%);
      }
    }
  }
}
</style>