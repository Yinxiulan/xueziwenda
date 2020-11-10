<template>
  <div>
    <mt-header title="学前端，到学问">
      <div slot="right" class="shortcut">
        <router-link to="/register">注册</router-link>
        <router-link to="/login">登录</router-link>
      </div>
    </mt-header>

    <mt-navbar v-model="active">
      <mt-tab-item
        v-for="(item, index) of category"
        :key="index"
        :id="item.id.toString()"
      >
        {{ item.category_name }}
      </mt-tab-item>
    </mt-navbar>
    <div class="main">
      <mt-tab-container>
        <mt-tab-container-item>
          <!-- 单一文章信息开始 -->
          <div
            class="articleItem"
            v-for="(article, index) of articles"
            :key="index"
          >
            <!-- 文章标题开始 -->
            <div class="articleItem-header">
              {{ article.subject }}{{ article.id }}
            </div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始  -->
              <div class="articleImg" v-if="article.image != null">
                <img v-lazy="article.image" />
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章简介开始 -->
              <div class="articleDes">
                {{ article.description }}
              </div>
              <!-- 文章简介结束 -->
            </div>
            <!-- 文章图文信息结束 -->
          </div>
          <!-- 单一文章信息结束 -->
        </mt-tab-container-item>
        <!-- <mt-tab-container-item id="2">2</mt-tab-container-item> -->
        <!-- <mt-tab-container-item id="3">3</mt-tab-container-item> -->
        <!-- <mt-tab-container-item id="4">4</mt-tab-container-item> -->
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="index">
        首页
        <img src="" alt="" slot="icon" v-if="selectedTab == 'index'" />
        <img src="" alt="" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="me"
        >我的
        <img src="" alt="" slot="icon" v-if="selectedTab == 'me'" />
        <img src="" alt="" slot="icon" v-else />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style scoped>
.shortcut a {
  color: #fff;
  padding-left: 20px;
}
.main {
  margin-bottom: 55px;
}
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>
<script>
export default {
  data() {
    return {
      active: "1",
      selectedTab: "index",
      category: [],
      articles: [],
    };
  },
  watch: {
    active(value) {
      this.articles=[];
      this.axios.get('/article?cid='+value+'&page=1').then(res=>{
        let data=res.data.results;
        // this.articles=res.data.results;
        data.forEach(item=>{
          if(item.image!=null){
            item.image=require("../assets/images/articles/"+item.image);
          }
          this.articles.push(item);
        })
      })
    },
  },
  mounted() {
    this.axios.get("/category").then((res) => {
      this.category = res.data.results;
    });
    this.axios.get("/article?cid=" + this.active+'&page=1').then((res) => {
      let data = res.data.results;
      data.forEach((item) => {
        if (item.image != null) {
          item.image = require("../assets/images/articles/" + item.image);
        }
        this.articles.push(item);
      });

      // this.articles=res.data.results;
    });
  },
};
</script>
