<template>
  <div class="boss">
    <header>
      <div class="header">
        <img src="http://localhost:8080/01.png" alt />
      </div>
    </header>
    <section>
      <van-tabs v-model="active" type="line" line-height="0px" title-active-color="purple">
        <van-tab title="登录">
          <div class="search">
            <p>账号</p>
            <van-field v-model="textL" placeholder="请输入账号" />
            <p>密码</p>
            <van-field v-model="passwordL" type="password" placeholder="请输入密码" />
            <button @click="onClickL">登录</button>
          </div>
        </van-tab>
        <van-tab title="注册">
          <div class="search">
            <p>手机号</p>
            <van-field
              v-model="tel"
              type="tel"
              placeholder="注册手机为找回密码的唯一凭证"
              :error-message="message"
              @blur="inpue11"
            />
            <p>登录名</p>
            <van-field
              v-model="text"
              placeholder="中、英文均可, 不超过12个字符"
              :error-message="message1"
              @blur="input22"
            />
            <p>密码</p>
            <van-field
              v-model="password"
              type="password"
              placeholder="3-18位英文、数字、符号, 区分大小写"
              :error-message="message2"
              @input="input3"
            />
            <p>短信验证码</p>
            <van-field v-model="sms" center placeholder="请输入短信验证码" :border="border">
              <template #button>
                <div @click="onClick">
                  <van-button size="small" type="primary">发送验证码</van-button>
                </div>
              </template>
            </van-field>
            <button @click="register">注册</button>
          </div>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script>
import qs from "qs";
// import md5 from "js-md5";
export default {
  data() {
    return {
      textL: "",
      passwordL: "",
      active: 0,
      border: true,
      tel: "",
      text: "",
      digit: "",
      number: "",
      password: "",
      message: "",
      message1: "",
      message2: "",
      sms: "",
      msgText: "",
    };
  },

  methods: {
    onClickL() {
      let params = {
        LoginName: this.textL,
        LoginPassword: this.passwordL,
        isPassing: "yes",
      };
      this.$netClient.phone(qs.stringify(params)).then((res) => {
        console.log(res);
        this.$store.dispatch("LOGIN_TONK", res.data.tnToken.tokenStr);
        if (res.data.code == 404) {
          alert("没有此用户");
          this.textL = "";
          this.passwordL = "";
          return;
        } else {
          setTimeout(() => {
            this.$router.push({ path: "./home" });
          }, 1000);
        }
      });
    },
    register() {
      console.log("aaa");
      if (this.sms == this.msgText) {
        let params = {
          phone: this.tel,
          LoginName: this.text,
          LoginPassword: this.password,
          isPassing:'yes'
        };
        // console.log(params);
        this.$netClient.register(qs.stringify(params)).then((res) => {
          console.log("aaaaa");
        });
      }
    },
    tel1() {
      return this.$netClient.login({
        params: {
          phone: this.tel,
        },
      });
    },
    user() {
      return this.$netClient.name({
        params: {
          LoginName: this.text,
        },
      });
    },
    async onClick() {
      console.log("bbbb");
      let tel = await this.tel1(this.tel);

      let user = await this.user();

      console.log(tel.data.code);
      console.log(user.data.code);

      if (tel.data.code == 200 && user.data.code == 404) {
        this.$netClient
          .code({
            params: {
              phone: this.tel,
            },
          })
          .then((res) => {
            console.log(res.data.msg);
            this.msgText = res.data.msg;
          });
      }
    },
    inpue11() {
      var a = /^1[3|4|5|7|8][0-9]{9}$/;
      if (this.tel === "" || a.test(this.tel)) {
        this.message = "";
      } else {
        this.message = "手机号格式错误";
      }

      this.$netClient
        .login({
          params: {
            phone: this.tel,
          },
        })
        .then((res) => {
          //   console.log(res);
          if (res.data.code == 204) {
            this.message = "手机号已注册";
            this.tel = "";
          }
        });
    },
    input22() {
      this.$netClient
        .name({
          params: {
            LoginName: this.text,
          },
        })
        .then((res) => {
          //   console.log(res.data.code);
          if (res.data.code == 200) {
            this.message1 = "此用户已存在";
            this.text = "";
          }
        });
    },
    input3() {
      this.message2 = "请输入密码";
      if (this.password === "") {
        this.message2 = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.boss {
  width: 100%;
  box-sizing: border-box;
  padding: 0.15rem 0.15rem;
}
header {
  border: 1px solid rgb(243, 240, 240);
  width: 100%;
  height: 8vh;
  .header {
    width: 100%;
    z-index: 999;
    img {
      width: 100%;
    }
  }
}
section {
  border: 1px solid rgb(211, 209, 209);
  width: 100%;
  /deep/ .van-tab {
    border-top: 1px solid rgb(236, 236, 236);
    background: #f5f5f5;
  }
  /deep/ .van-tab--active {
    background: #fff;
  }
  .search {
    width: 80%;
    margin: auto;
    p {
      font-size: 0.35rem;
      margin: 0.7rem 0;
    }
    button {
      color: #fff;
      font-size: 0.5rem;
      width: 100%;
      height: 1rem;
      border-radius: 0.1rem;
      border: 0;
      background: #409eff;
      margin: 0.5rem 0;
    }
    /deep/ .van-cell {
      width: 100%;
      padding: 0;
      .van-field__control {
        height: 1rem;
        border: 1px solid rgb(211, 209, 209);
      }
    }
  }
}
</style>