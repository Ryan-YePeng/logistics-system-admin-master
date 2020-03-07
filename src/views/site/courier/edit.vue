<template>
  <el-dialog
          title="编辑快递员"
          width="800px"
          @close="cancel"
          :close-on-click-modal="false"
          :visible.sync="dialogTableVisible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px" hide-required-asterisk>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名(中)" prop="c_co_name">
            <el-input v-model="form.c_co_name"></el-input>
          </el-form-item>
          <el-form-item label="编号(中)" prop="c_co_number">
            <el-input v-model="form.c_co_number"></el-input>
          </el-form-item>
          <el-form-item label="联系方式(中)" prop="c_co_contact">
            <el-input v-model="form.c_co_contact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名(老挝)" prop="l_co_name">
            <el-input v-model="form.l_co_name"></el-input>
          </el-form-item>
          <el-form-item label="编号(老挝)" prop="l_co_number">
            <el-input v-model="form.l_co_number"></el-input>
          </el-form-item>
          <el-form-item label="联系方式(老挝)" prop="l_co_contact">
            <el-input v-model="form.l_co_contact"></el-input>
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
  import {updateCourierApi} from '@/api/courier'

  export default {
    name: "EditCourier",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          l_co_id: 0,
          c_co_name: '',
          c_co_number: '',
          c_co_contact: '',
          l_co_name: '',
          l_co_number: '',
          l_co_contact: ''
        },
        rules: {
          c_co_name: {required: true, message: '请输入姓名', trigger: 'blur'},
          c_co_number: {required: true, message: '请输入编号', trigger: 'blur'},
          c_co_contact: {required: true, message: '请输入联系方式', trigger: 'blur'},
          l_co_name: {required: true, message: '请输入姓名', trigger: 'blur'},
          l_co_number: {required: true, message: '请输入编号', trigger: 'blur'},
          l_co_contact: {required: true, message: '请输入联系方式', trigger: 'blur'},
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateCourierApi(this.form).then(() => {
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
