<template>
  <div class="search">
    <van-nav-bar
      :fixed="true"
      title="搜索"
      right-text="书城"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></van-nav-bar>

    <!-- 小说搜索部分 -->
    <div class="nav">
      <div class="nav-back">
        <van-icon name="arrow-left" size="26" color="#ccc" />
      </div>
      <div class="nav-s">
        <van-search
          v-model="value"
          placeholder="请输入小说名"
          shape="round"
          autofocus="true"
          @input=confirmSearch()
        />
      </div>
      <div class="nav-cli" @click="confirmSearch">确定</div>
    </div>
    <!-- 搜索热词部分 -->
    <div class="content">
      <div class="hot">
        <div class="hot-head clearfix">
          <div class="hot-title fl">搜索热词</div>
          <div class="hot-more fr" @click="randomArr">
            <span>换一批</span>
            <span>
              <van-icon name="replay" />
            </span>
          </div>
        </div>
        <ul class="hot-label clearfix">
          <li v-for="(item, index) in hotwords" @click="sHot(item.word)" :key="index">
            {{ item.word }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 删除搜索历史部分 -->
    <div class="history-box">
      <div class="history-head clearfix">
        <div class="history-title fl">搜索历史</div>
        <div class="history-right fr clearfix">
          <div class="fl history-text">删除历史</div>
          <div class="fr history-icon">
            <van-icon name="delete" />
          </div>
        </div>
      </div>
    </div>
    <!-- 小说列表部分 -->
    <ul class="search-list" v-show="iShow">
      <li v-for="(item,index) in searchListData" :key="index" @click="cList(item)">
        <van-icon name="orders-o" />
        {{item.title}}
      </li>
      <!-- <li>
        <van-icon name="orders-o" />
        逆天邪神1
      </li>
      <li>
        <van-icon name="orders-o" />
        逆天邪神2
      </li>
      <li>
        <van-icon name="orders-o" />
        逆天邪神3
      </li>
      <li>
        <van-icon name="orders-o" />
        逆天邪神4
      </li> -->
    </ul>
  </div>
</template>

<script>
import "../../assets/less/search.less";

export default {
  data() {
    return {
      value: "",
      allSearchData: "",
      hotwords: "",
      // 搜索热词的数量
      length: 8,
      searchListData: [],
      iShow: false
    };
  },

  created() {
    this.searchWord();
  },

  methods: {
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
    /* 搜索热词 */
    searchWord() {
      // 
      this.axios({
        method: "GET",
        url: "/search-hotwords",
      })
        .then((result) => {
          // 
          let arrWord = [];
          this.allSearchData = result.data.searchHotWords;
          for (var i = 0; i < this.length; i++) {
            arrWord.push(this.allSearchData[i]);
          }
          this.hotwords = arrWord;
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    /* 换一批 */
    randomArr() {
      this.allSearchData.sort(function () {
        return Math.random() - 0.5;
      });
      let arrWord = [];
      for (var i = 0; i < this.length; i++) {
        arrWord.push(this.allSearchData[i]);
      }
      this.hotwords = arrWord;
    },

    /* 搜索内容 */
    confirmSearch() {
      if((this.value) == ''){
        this.iShow = false;
        return
      }
      this.axios({
        method: "GET",
        url: "/search",
        params: {
          keyword: this.value,
        },
      })
        .then((result) => {
          this.iShow = true;
          
          let length = result.data.books.length>10 ? 10 : result.data.books.length;
          this.searchListData = [];
          for(let i=0; i<length; i++){
            this.searchListData.push(result.data.books[i])
          }
          
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    
    // 点击列表渲染数据
    cList(item){
      
      this.$router.push({name: 'Relevant',query: {title: item.title}})
    },

    sHot(hotWord){
      
      this.value = hotWord;
      this.confirmSearch();
    }

  
  },

  components: {},
};
</script>

<style lang="less" scoped>
.search {
  // 搜索热词部分
  .content {
    .hot-head {
      color: #555;
      .hot-title {
        font-size: 20px;
      }
    }
    .hot-more {
      .van-icon-replay {
        position: relative;
        top: 2px;
        transform: rotate(90deg);
      }
    }
  }
  // 小说列表部分
  .search-list {
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    background: #fff;
    z-index: 2;

    li{
      border-bottom: 1px solid #f3f3f3;
      line-height: 50px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 16px;
    }
    .van-icon-orders-o{
      font-size: 20px;
      top: 4px;
    }
  }
}
</style>