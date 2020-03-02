<template>
  <div id="add-classification">
    <h1 class="title">{{title}}新闻</h1>
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
        </el-col>
      </el-row>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="内容(中文)" name="first"></el-tab-pane>
      <el-tab-pane label="内容(老挝)" name="second"></el-tab-pane>
    </el-tabs>
    <my-tinymce ref="MyTinymce"></my-tinymce>
    <div class="tinymce-footer">
      <el-button @click='goBack'>取 消</el-button>
      <el-button type="primary" @click="submitForm('Form')">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import MyTinymce from '@/components/tinymce'
  import {updateNewsApi, addNewsApi} from '@/api/news'

  export default {
    name: "NewsDetail",
    components: {MyTinymce},
    props: {
      classificationList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        title: '',
        activeName: 'first',
        l_n_id: 0,
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
      setContent() {
        this.$refs.MyTinymce.setContent(this.form.c_n_content);
      },
      handleClick() {
        if (this.activeName === 'second') {
          this.form.c_n_content = this.$refs.MyTinymce.getContent();
          this.$refs.MyTinymce.setContent(this.form.l_n_content);
        } else {
          this.form.l_n_content = this.$refs.MyTinymce.getContent();
          this.$refs.MyTinymce.setContent(this.form.c_n_content);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            if (this.activeName === 'first') {
              data.c_n_content = this.$refs.MyTinymce.getContent();
            } else {
              data.l_n_content = this.$refs.MyTinymce.getContent();
            }
            if (this.title === '新增') {
              addNewsApi(data).then(() => {
                this.$emit('update');
                this.goBack()
              });
            } else {
              data.l_n_id = this.l_n_id;
              updateNewsApi(data).then(() => {
                this.$emit('update');
                this.goBack()
              });
            }
          } else {
            return false;
          }
        });
      },
      goBack() {
        this.$emit("close");
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields();
        this.activeName = 'first';
        this.l_n_id = 0;
        this.$refs.MyTinymce.setContent('');
      }
    }
  }
</script>

<style lang="scss">
  #add-classification {
    background: white;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

    .title {
      font-size: 24px;
      line-height: 50px;
      margin-left: 20px;
      margin-bottom: 20px;
    }

    .tinymce-footer {
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
