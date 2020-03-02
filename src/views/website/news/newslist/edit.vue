<template>
  <div id="edit-classification">
    <el-dialog
            title="编辑分类"
            width="900px"
            @close="cancel"
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="100px" hide-required-asterisk>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称(中文)" prop="c_nC_name">
              <el-input v-model="form.c_nC_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称(老挝)" prop="l_nC_name">
              <el-input v-model="form.l_nC_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="描述(中文)">
              <el-input type="textarea" v-model="form.c_nC_content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述(老挝)">
              <el-input type="textarea" v-model="form.l_nC_content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('Form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {updateClassificationApi} from '@/api/news'

  export default {
    name: "EditClassification",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          l_nC_id: 0,
          c_nC_name: '',
          c_nC_content: '',
          l_nC_name: '',
          l_nC_content: ''
        },
        rules: {
          c_nC_name: {required: true, message: '请输入名称', trigger: 'blur'},
          l_nC_name: {required: true, message: '请输入名称', trigger: 'blur'},
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateClassificationApi(this.form).then(() => {
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

<style lang="scss">
  #edit-classification {
    .el-textarea__inner {
      min-height: 150px !important;
    }
  }
</style>
