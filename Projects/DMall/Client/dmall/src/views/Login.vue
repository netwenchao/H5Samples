<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" />
            </div>
            <el-form
                :model="userData"
                label-width="80px"
                class="login-form"
                :rules="loginRules"
                ref="loginFormRef"
            >
                <el-form-item label="用户名" prop="userName">
                    <el-input
                        v-model="userData.userName"
                        prefix-icon="el-icon-search"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="userData.password"
                        prefix-icon="el-icon-search"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button type="info" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        return {
            userData: {
                userName: "",
                password: ""
            },
            loginRules: {
                userName: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在3到10个字符之间",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空!",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.loginFormRef.validate((b, o) => {
                if (b) {
                    if (
                        this.userData.userName == "dwc" &&
                        this.userData.password == "111111"
                    ) {
                        sessionStorage.setItem("token", this.userData.userName)
                        this.$message.success("登录成功")
                        //编程导航
                        this.$router.push("/home")
                    } else {
                        this.$message.error("登录失败!")
                    }
                    //Todo link to home
                    //axios
                }
            })
        },
        onReset() {
            this.$refs.loginFormRef.resetFields()
        }
    }
}
</script>

<style scoped>
.login_container {
    margin: 0px auto;
    background: #2b4b6b;
    height: 100%;
}
.login_box {
    border-radius: 3px;
    width: 480px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.avatar_box {
    width: 140px;
    height: 140px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10 #ddd;
    background-color: #fff;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
}
.avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.login-form {
    position: absolute;
    padding: 0 32px;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
</style>
