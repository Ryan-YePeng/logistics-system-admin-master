<template>
  <div id="help">
    <el-card class="box-card" v-show="isShow">
      <div slot="header" class="clearfix">
        <el-input placeholder="搜索"
                  v-model="nameText"
                  style="width: 200px"
                  clearable
                  @keyup.enter.native="getNews">
        </el-input>
        <el-button type="success" @click="getNews">搜索</el-button>
        <el-button style="float: right" type="primary" @click="add">新增</el-button>
      </div>
      <el-button :disabled="isDeleteMoreDisabled" type="danger" @click="deleteMore">批量删除</el-button>
      <div>
        <el-table
                v-loading="isTableLoading"
                @selection-change="getSelected"
                :data="formData">
          <el-table-column
                  type="selection"
                  width="55">
          </el-table-column>
          <el-table-column
                  prop="c_n_name"
                  label="标题(中文)">
          </el-table-column>
          <el-table-column
                  prop="l_n_name"
                  label="标题(老挝)">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" class="el-icon-edit" @click="edit(scope.row)" size="mini"></el-button>
              <el-popover
                      :ref="scope.row.l_n_id"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.l_n_id].doClose()">取消</el-button>
                  <el-button :loading="isDeleteLoading" type="primary" size="mini"
                             @click.stop="deleteNews(scope.row.l_n_id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <news-detail
            v-show="!isShow"
            ref="NewsDetail"
            @close="close"
            @update="getNews"
            :classificationList="classificationList">
    </news-detail>
  </div>
</template>

<script>
  import {getNewsApi, getClassificationApi, deleteNewsApi} from '@/api/news'
  import NewsDetail from './detail'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'News',
    components: {NewsDetail},
    data() {
      return {
        formData: [],
        classificationList: [],
        isTableLoading: false,
        isDeleteLoading: false,
        nameText: '',
        isShow: true,
        isDeleteMoreDisabled: true,
        deleteList: []
      }
    },
    mounted() {
      this.getNews();
      getClassificationApi().then(result => {
        this.classificationList = result.data.message;
      });
    },
    methods: {
      getNews() {
        this.isTableLoading = true;
        getNewsApi(this.nameText).then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
        })
      },
      add() {
        this.isShow = false;
        let _this = this.$refs.NewsDetail;
        _this.title = '新增';
      },
      close() {
        this.isShow = true
      },
      edit(obj) {
        let _this = this.$refs.NewsDetail;
        _this.title = '编辑';
        _this.l_n_id = obj.l_n_id;
        objectEvaluate(obj, _this.form);
        _this.setContent(obj.c_n_content);
        this.isShow = false;
      },
      deleteNews(id) {
        this.isDeleteLoading = true;
        deleteNewsApi([id])
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getNews()
            })
            .catch(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose()
            });
      },
      getSelected(array) {
        this.deleteList = array.map(item => {
          return item.l_n_id
        });
        this.isDeleteMoreDisabled = array.length === 0;
      },
      deleteMore() {
        this.$msgBox().then(() => {
          deleteNewsApi(this.deleteList).then(() => {
            this.getNews()
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  #help {

  }
</style>
