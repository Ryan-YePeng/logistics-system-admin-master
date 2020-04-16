<template>
  <div id="add-classification">
    <h1 class="title">{{title}}公告</h1>
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px" hide-required-asterisk>
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题(中文)" prop="c_an_name">
            <el-input v-model="form.c_an_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题(老挝)" prop="l_an_name">
            <el-input v-model="form.l_an_name"></el-input>
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
  import {updateAnnouncementApi, addAnnouncementApi} from '@/api/announcement'

  export default {
    name: "AnnouncementDetail",
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
        l_an_id: 0,
        form: {
          c_an_name: '',
          c_an_content: '',
          l_an_name: '',
          l_an_content: ''
        },
        rules: {
          c_an_name: {required: true, message: '请输入名称', trigger: 'blur'},
          l_an_name: {required: true, message: '请输入名称', trigger: 'blur'}
        }
      }
    },

    methods: {
      setContent() {
        this.$refs.MyTinymce.setContent(this.form.c_an_content);
      },
      handleClick() {
        if (this.activeName === 'second') {
          this.form.c_an_content = this.$refs.MyTinymce.getContent();
          this.$refs.MyTinymce.setContent(this.form.l_an_content);
        } else {
          this.form.l_an_content = this.$refs.MyTinymce.getContent();
          this.$refs.MyTinymce.setContent(this.form.c_an_content);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            if (this.activeName === 'first') {
              data.c_an_content = this.$refs.MyTinymce.getContent();
            } else {
              data.l_an_content = this.$refs.MyTinymce.getContent();
            }
            if (this.title === '新增') {
              addAnnouncementApi(data).then(() => {
                this.$emit('update');
                this.goBack()
              });
            } else {
              data.l_an_id = this.l_an_id;
              updateAnnouncementApi(data).then(() => {
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
        this.title = '';
        this.l_an_id = 0;
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
      padding: 10px 10px 10px 0;
    }
  }
</style>
