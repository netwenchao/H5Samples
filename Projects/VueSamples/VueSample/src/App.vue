<template>
  <div id="app">
    <nav class="head">
      <ul class="rec-list">
        <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/Cart">购物车</router-link>
          </li><li>
            <router-link to="/Order">订单</router-link>
          </li><li>
            <router-link to="/Goods">商品</router-link>
          </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{padding:0px;margin: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav.head{background-color: #f2f2f2;margin: 0px;}
.rec-list{list-style-type: none;margin:0px;padding:0px;display: block;text-align: right;}
.rec-list li{padding:0;margin: 0;display: inline-block;padding:4px 8px;}
.rec-list li a:link,.rec-list li a:visited{color: #666;text-decoration: none;}
.rec-list li a:hover,.rec-list li a:active{color: #000;text-decoration: none;}
</style>
