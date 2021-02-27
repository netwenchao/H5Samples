<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--主界面-->
    <el-card>
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input placeholder="用户名">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="onAddUser">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="usersList"
        style="width: 100%;"
        size="mini"
        border
        stripe
      >
        <el-table-column
          type="index"
          label="#"
          :index="getIndex"
        ></el-table-column>
        <el-table-column prop="date" label="日期" width="180" sortable>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180" sortable>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180" sortable>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="180" sortable>
        </el-table-column>
        <el-table-column prop="address" label="地址" sortable></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="changeUserState(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="onEdit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="onDelete"
              size="mini"
            ></el-button>
            <el-tooltip :enterable="false" content="设置" placement="top">
              <el-button
                type="warning"
                icon="el-icon-setting"
                @click="onSetting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--分页控件-->
      <el-pagination
        @size-change="onPageSizeChange"
        @current-change="onPageChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :page-sizes="[1, 2, 5, 10, 20, 30, 40, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>

      <el-dialog :visible.sync="addDialogVisible" title="添加用户">
        <!--内容区域-->
        <el-form
          :rules="addUserRules"
          :model="addUserForm"
          label-width="80px"
          ref="addUserFormRef"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="name" />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="email" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="mobile" />
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="address" />
          </el-form-item>

          <el-form-item label="日期" prop="date">
            <el-input v-model="date" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="addDialogVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="addDialogVisible = false"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Users",
  data() {
    var email = (rule, val, cb) => {
      if (/^[a-z0-9_-]+@([a-z0-9_-]+)(\.[a-z0-9_-]+)+$/gi.test(val)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };

    var mobile = (rule, val, cb) => {
      if (/^[0-9]{6-11}$/gi.test(val)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };

    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 10,
      },
      usersList: [],
      addUserRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        address: [
          {
            min: 0,
            max: 1000,
            message: "地址应为0到1000个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: email, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: email, trigger: "blur" },
        ],
      },
      total: 4,
      addDialogVisible: false, //是否显示添加对话框
    };
  },
  methods: {
    changeUserState(user) {
      this.$message.success({ message: JSON.stringify(user) });
    },
    getUserList() {
      this.usersList = [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          state: true,
          email: "",
          mobile: "",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          state: false,
          email: "",
          mobile: "",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          state: true,
          email: "",
          mobile: "",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          state: false,
          email: "",
          mobile: "",
        },
      ];
      this.total = this.usersList.length;
    },
    getIndex(i) {
      return i;
    },
    onPageSizeChange(size) {
      this.queryInfo.pageSize = size;
      this.getUserList();
    },
    onPageChange(page) {
      this.queryInfo.pageNum = page;
      this.getUserList();
    },
    onEdit() {},
    onDelete() {},
    onSetting() {},
    onAddUser() {
      this.addDialogVisible = true;
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>
<style scoped></style>
