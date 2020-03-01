<template>
  <div class="person">
    <el-card class="box-card" style="width: 70%;margin: 0 auto">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div style="text-align: center; margin-bottom: 20px">
        <el-avatar shape="circle" :size="120">
          <img v-if="isAdmin" src="../../assets/admin.jpg" alt="头像"/>
          <img v-else src="../../assets/school.png" alt="头像"/>
        </el-avatar>
      </div>
      <ul class="personInfo">
        <li>
          <span>用户</span>
          <span>{{user.username}}</span>
        </li>
        <li>
          <span>权限</span>
          <span>{{user.roles[0].namezh}}</span>
        </li>
        <li>
          <span>位置</span>
          <span>{{location}}</span>
        </li>
        <li>
          <span>安全设置</span>
          <span>
            <a style="color: #317ef3; cursor: pointer" @click="changePassword">修改密码</a>
          </span>
        </li>
      </ul>
    </el-card>
    <PasswordDialog ref="passwordDialogForm"></PasswordDialog>
  </div>
</template>

<script>
  import PasswordDialog from './passwordDialog'

  export default {
    components: {PasswordDialog},
    name: 'person',
    data() {
      return {
        isLoading: false,
        loading: false,
        logData: []
      }
    },
    computed: {
      'user': function () {
        return this.$store.getters.user
      },
      'location': function () {
        let str = '';
        let data = this.$store.getters.user;
        if (data.province) str = `${data.province}`;
        if (data.city) str = `${data.province}/${data.city}`;
        if (data.area) str = `${data.province}/${data.city}/${data.area}`;
        return str
      },
      'isAdmin': function () {
        let data = this.$store.getters.user;
        return data.authorities[0]['authority'] === "ROLE_ADMIN";
      }
    },
    methods: {
      // 修改密码
      changePassword() {
        const _this = this.$refs.passwordDialogForm;
        _this.passwordDialogVisible = true
      },
    }
  }
</script>

<style lang="scss">
  .person {
    .personInfo li {
      border-bottom: 1px solid #f0f3f4;
      border-top: 1px solid #f0f3f4;
      padding: 11px 0;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }

    .el-avatar > img {
      width: 100%;
    }
  }
</style>
