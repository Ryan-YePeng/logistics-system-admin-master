<template>
  <el-dialog
          title="编辑网点"
          width="1000px"
          @close="cancel"
          :close-on-click-modal="false"
          :visible.sync="dialogTableVisible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px" hide-required-asterisk>
      <el-row>
        <el-col :span="12">
          <el-form-item label="网点账号" prop="username">
            {{form.username}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="网点名称(中)" prop="c__branchesName">
            <el-input v-model="form.c__branchesName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式(中)" prop="c_br_phone">
            <el-input v-model="form.c_br_phone"></el-input>
          </el-form-item>
          <el-form-item label="网点地址(中)" prop="c_br_address">
            <el-input v-model="form.c_br_address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网点名称(老挝)" prop="l_branchesName">
            <el-input v-model="form.l_branchesName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式(老挝)" prop="l_br_phone">
            <el-input v-model="form.l_br_phone"></el-input>
          </el-form-item>
          <el-form-item label="网点地址(老挝)" prop="l_br_address">
            <el-input v-model="form.l_br_address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经理名称(中)">
            <el-input v-model="form.c_jili"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经理名称(老挝)">
            <el-input v-model="form.l_jili"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button style="margin-left: 30px" @click="isChangePassword=!isChangePassword">重置密码</el-button>
      <el-row v-if="isChangePassword">
        <el-col :span="12">
          <el-form-item label="网点密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {updateSiteApi} from '@/api/site'
  import {isEmpty} from "@/utils/common";

  export default {
    name: "EditSite",
    data() {
      return {
        dialogTableVisible: false,
        isChangePassword: false,
        form: {
          c__branchesName: '',
          c_br_phone: '',
          c_br_address: '',
          l_branchesName: '',
          l_br_phone: '',
          l_br_address: '',
          username: '',
          password: '',
          u_id: 0,
          c_jili: '',
          l_jili: ''
        },
        rules: {
          c__branchesName: {required: true, message: '请输入名称', trigger: 'blur'},
          c_br_phone: {required: true, message: '请输入联系方式', trigger: 'blur'},
          c_br_address: {required: true, message: '请输入地址', trigger: 'blur'},
          l_branchesName: {required: true, message: '请输入名称', trigger: 'blur'},
          l_br_phone: {required: true, message: '请输入联系方式', trigger: 'blur'},
          l_br_address: {required: true, message: '请输入地址', trigger: 'blur'},
          username: {required: true, message: '请输入账号', trigger: 'blur'},
          password: {required: true, message: '请输入密码', trigger: 'blur'},
          i: {required: true, message: '请选择网点级别', trigger: 'change'}
        }
      }
    },
    computed: {
      role() {
        return this.$store.getters.user.authorities[0].authority
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            updateSiteApi(data).then(() => {
              this.$emit('update');
              this.cancel()
            });
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.dialogTableVisible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
