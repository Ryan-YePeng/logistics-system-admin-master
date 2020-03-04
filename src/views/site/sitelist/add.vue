<template>
  <el-dialog
          title="新增网点"
          width="1000px"
          @close="cancel"
          :close-on-click-modal="false"
          :visible.sync="dialogTableVisible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px" hide-required-asterisk>
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
      <el-form-item label="网点账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="网点密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="网点级别" prop="i">
        <el-select v-model="form.i" placeholder="请选择网点级别">
          <el-option label="县级" value="2"></el-option>
          <el-option v-if="role == 'level0'" label="省级" value="1"></el-option>
          <el-option v-if="role == 'level0'" label="总部" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addSiteApi} from '@/api/site'

  export default {
    name: "AddSite",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          c__branchesName: '',
          c_br_phone: '',
          c_br_address: '',
          l_branchesName: '',
          l_br_phone: '',
          l_br_address: '',
          username: '',
          password: '',
          i: '',
          u_id: 0
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
          i: {required: true, message: '请选择网点级别', trigger: 'change'},
        }
      }
    },
    computed: {
      userId() {
        return this.$store.getters.userId
      },
      role() {
        return this.$store.getters.user.authorities[0].authority
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.u_id = this.userId;
            addSiteApi(this.form).then(() => {
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
