<template>
  <div id="add-classification">
    <el-dialog
            title="新增新闻"
            fullscreen
            :destroy-on-close="true"
            @close="cancel"
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="100px" hide-required-asterisk>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题(中文)" prop="c_n_name">
              <el-input v-model="form.c_n_name"></el-input>
            </el-form-item>
            <el-form-item label="分类(中文)" prop="l_nC_id">
              <el-select v-model="form.l_nC_id" placeholder="请选择分类">
                <el-option v-for="item in classificationList"
                           :label="item.c_nC_name"
                           :value="item.l_nC_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容(中文)">
              <el-input type="textarea" v-model="form.c_n_content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称(老挝)" prop="l_n_name">
              <el-input v-model="form.l_n_name"></el-input>
            </el-form-item>
            <el-form-item label="分类(老挝)" prop="l_nC_id">
              <el-select v-model="form.l_nC_id" placeholder="请选择分类">
                <el-option v-for="item in classificationList"
                           :label="item.l_nC_name"
                           :value="item.l_nC_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容(老挝)">
              <el-input type="textarea" v-model="form.l_n_content"></el-input>
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
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver'

  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/link' //超链接插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/contextmenu'  //右键菜单插件
  import 'tinymce/plugins/wordcount' // 字数统计插件
  import 'tinymce/plugins/colorpicker' //选择颜色插件
  import 'tinymce/plugins/textcolor'  //文本颜色插件
  import 'tinymce/plugins/fullscreen' //全屏
  import 'tinymce/plugins/help' // 帮助
  import 'tinymce/plugins/charmap' // 特殊符号
  import 'tinymce/plugins/paste' // 粘贴图片
  import 'tinymce/plugins/hr' // 水平分割线
  import 'tinymce/plugins/searchreplace' // 全屏
  import 'tinymce/plugins/insertdatetime' // 插入时间
  import 'tinymce/plugins/toc' // 内容列表
  import 'tinymce/plugins/codesample' // 插入代码

  import {addClassificationApi} from '@/api/news'

  export default {
    name: "AddClassification",
    props: {
      classificationList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        dialogTableVisible: false,
        form: {
          c_n_name: '',
          c_n_content: '',
          l_n_name: '',
          l_n_content: '',
          l_nC_id: null
        },
        rules: {
          c_n_name: {required: true, message: '请输入名称', trigger: 'blur'},
          l_n_name: {required: true, message: '请输入名称', trigger: 'blur'},
          l_nC_id: {required: true, message: '请选择分类', trigger: 'change'},
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form)
            return
            addClassificationApi(this.form).then(() => {
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
       // Object.assign(this.$data.form, this.$options.data().form);
       // this.$refs['Form'].resetFields()
      }
    }
  }
</script>

<style lang="scss">
  #add-classification {
    .el-textarea__inner {
      min-height: 150px !important;
    }
  }
</style>
