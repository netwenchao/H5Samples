<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" style="width: 40px;" />
        <span>DMall</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside 
        :width="navWidth"
        style="overflow:hidden;">
        <div class="toggleButton" @click="toggle">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse-transition="false"
          :collapse="isCollapse"
          :default-active="activeMenu"
          router
        >
          <el-submenu :index="''+menu.id" v-for="menu in menus">
            <template slot="title">
              <i :class="iconObj[menu.id]"></i>
              <span>{{menu.authName}}</span>
            </template>

            <!--二级菜单-->
            <el-menu-item :index="'/'+subMenu.path" v-for="subMenu in menu.children" @click="clickMenu('/'+subMenu.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subMenu.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  created(){
    this.getMenuItems();
    this.activeMenu=window.sessionStorage.getItem("activePath");
  },
  data(){
    return {
      menus:[],
      navWidth:"200px",
      isCollapse:false,
      activeMenu:"/users",
      iconObj:{
        101:"el-icon-user",
        102:"el-icon-message",
        103:"el-icon-goods",
        104:"el-icon-position",
        105:"el-icon-bangzhu",
      }
    }
  },
  methods: {
    logout() {
      sessionStorage.setItem("token", null);
      this.$router.push("/login");
    },
    toggle:function(){
      this.isCollapse=!this.isCollapse;
      this.navWidth=this.isCollapse?"64px":"200px";
    },
    clickMenu:function(path){
      window.sessionStorage.setItem("activePath",path)
      this.activeMenu=path;
    },
    getMenuItems(){
      this.menus=[{
        id:101,
        authName:"用户管理",
        path:"users",
        children:[
          {
            id:101001,
            authName:"用户列表",
            path:"users",
            children:[]
          }
        ]
      },
      {
        id:102,
        authName:"权限管理",
        path:"rights",
        children:[
          {
            id:102001,
            authName:"角色列表",
            path:"roleList",
            children:[]
          },
          {
            id:102002,
            authName:"权限列表",
            path:"authList",
            children:[]
          }
        ]
      },
      {
        id:103,
        authName:"商品管理",
        path:"goods",
        children:[
          {
            id:103001,
            authName:"商品列表",
            path:"goodList",
            children:[]
          },
          {
            id:103002,
            authName:"分类参数",
            path:"categoryList",
            children:[]
          },
          {
            id:103003,
            authName:"商品分类",
            path:"googleGategoryList",
            children:[]
          }
        ]
      },
      {
        id:104,
        authName:"订单管理",
        path:"orders",
        children:[
          {
            id:104001,
            authName:"订单列表",
            path:null,
            children:[]
          }
        ]
      },
      {
        id:105,
        authName:"数据统计",
        path:"reports",
        children:[
          {
            id:105001,
            authName:"商品列表",
            path:null,
            children:[]
          }
        ]
      }];
    }
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
}
.el-menu{
  border-right: none;
}
.el-header div {
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 32px;
}
.el-header div span {
  margin-left: 16px;
}
.el-aside {
  background: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.toggleButton{
  background-color: #4a5064;
  text-align: center;
  color: #FFF;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
