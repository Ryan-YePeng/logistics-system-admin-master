<template>
  <el-dialog
          title="新增电话"
          width="700px"
          @close="cancel"
          :close-on-click-modal="false"
          :visible.sync="dialogTableVisible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px" hide-required-asterisk>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话(中)" prop="c_s_phone">
            <el-input v-model="form.c_s_phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话(老挝)" prop="l_s_phone">
            <el-input v-model="form.l_s_phone"></el-input>
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
  import {addPhoneApi} from '@/api/help'

  export default {
    name: "AddPhone",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          l_s_phone: '',
          c_s_phone: ''
        },
        rules: {
          l_s_phone: {required: true, message: '请输入电话', trigger: 'blur'},
          c_s_phone: {required: true, message: '请输入电话', trigger: 'blur'},
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addPhoneApi(this.form).then(() => {
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
