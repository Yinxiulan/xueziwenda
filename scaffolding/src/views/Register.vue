<template>
  <div>
    <mt-header title="学前端，到学问">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>

      <router-link to="/login" slot="right"> 登录 </router-link>
    </mt-header>
    <div>
      <mt-field
        label="用户名"
        placeholder="请输入用户名"
        type="text"
        v-model="username"
        :state="usernameState"
        @blur.native.capture="checkUsername"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        type="password"
        v-model="password"
         @blur.native.capture="checkPassword"
      ></mt-field>
      <mt-field
        label="确认密码"
        placeholder="请再次输入密码"
        type="password"
        v-model="conpassword"
         @blur.native.capture="checkConpassword"
      ></mt-field>
      <mt-button type="primary" size="large" @click="handle"> 免费注册</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      conpassword: "",
      usernameState:""
    };
  },
  methods: {
      handle(){
if(this.checkUsername()&&this.checkPassword()&&this.checkConpassword()){

}
      },
    checkUsername() {
      let username = this.username;
      let usernameReg = /^[0-9a-zA-Z]{6,12}$/;
      if (usernameReg.test(username)) {
        console.log("用户名可以使用");
        this.usernameState='success';
      } else {
        this.$toast({
          message: "用户名或内容错误",
          position: "middle",
          duration: 5000,
        });
        this.usernameState='error';
        return false;
        
      }
    },

    checkPassword() {
        let password=this.password;
      let passwordReg = /^[0-9a-zA-Z]{6,12}$/;
      if (passwordReg.test(password)) {
        console.log("密码正确");
      } else {
        this.$toast({
          message: "密码错误",
          position: "middle",
          duration: 5000,
        });
        return false;
      }
    },
    checkConpassword(){
        let conpassword=this.conpassword;
        let password=this.password;
        if(password==conpassword){
            console.log("两次密码一致");
        }else{
            this.$toast({
                message:"两次密码不一致",
                position:"middle",
                duration:"50000",
            });
            return false;
        }
    }
  },
};
</script>