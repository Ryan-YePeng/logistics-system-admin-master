<template>
  <div id="help">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="搜索客服电话"
                  v-model="nameText"
                  style="width: 200px"
                  clearable
                  @keyup.enter.native="getNews">
        </el-input>
        <el-button type="success" @click="getNews">搜索</el-button>
        <el-button style="float: right" type="primary" @click="add">新增</el-button>
      </div>
      <div>
        <el-table
                v-loading="isTableLoading"
                :data="formData">
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
                      :ref="scope.row.l_nC_id"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.l_nC_id].doClose()">取消</el-button>
                  <el-button :loading="isDeleteLoading" type="primary" size="mini"
                             @click.stop="deleteNews(scope.row.l_nC_id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <add-news ref="AddNews" @update="getNews" :classificationList="classificationList"></add-news>
    <edit-news ref="EditNews" @update="getNews" :classificationList="classificationList"></edit-news>
  </div>
</template>

<script>
  import {getNewsApi, getClassificationApi, deleteNewsApi} from '@/api/news'
  import AddNews from './add'
  import EditNews from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'News',
    components: {EditNews, AddNews},
    data() {
      return {
        formData: [],
        classificationList: [],
        isTableLoading: false,
        isDeleteLoading: false,
        nameText: ''
      }
    },
    mounted() {
      this.getNews();
      getClassificationApi().then(result => {
        this.classificationList = result.data.message;
      })
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
        this.$refs.AddNews.dialogTableVisible = true
      },
      edit(obj) {
        let _this = this.$refs.EditNews;
        objectEvaluate(obj, _this.form);
        _this.dialogTableVisible = true
      },
      deleteNews(id) {
        this.isDeleteLoading = true;
        deleteNewsApi(id)
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getNews()
            })
            .catch(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose()
            });
      }
    }
  }
</script>

<style lang="scss">
  #help {

  }
</style>
