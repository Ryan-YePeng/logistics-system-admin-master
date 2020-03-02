<template>
  <div id="help">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新闻分类列表</span>
        <el-button style="float: right" type="primary" @click="add">新增</el-button>
      </div>
      <div>
        <el-table
                v-loading="isTableLoading"
                :data="formData">
          <el-table-column
                  prop="c_nC_name"
                  label="名称">
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.l_nC_time | formatDateTime}}</span>
            </template>
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
                             @click.stop="deleteClassification(scope.row.l_nC_id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <add-classification ref="AddClassification" @update="getClassification"></add-classification>
    <edit-classification ref="EditClassification" @update="getClassification"></edit-classification>
  </div>
</template>

<script>
  import {getClassificationApi, deleteClassificationApi} from '@/api/news'
  import AddClassification from './add'
  import EditClassification from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'Classification',
    components: {EditClassification, AddClassification},
    data() {
      return {
        formData: [],
        isTableLoading: false,
        isDeleteLoading: false,
      }
    },
    mounted() {
      this.getClassification();
    },
    methods: {
      getClassification() {
        this.isTableLoading = true;
        getClassificationApi().then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
        })
      },
      add() {
        this.$refs.AddClassification.dialogTableVisible = true
      },
      edit(obj) {
        let _this = this.$refs.EditClassification;
        objectEvaluate(obj, _this.form);
        _this.dialogTableVisible = true
      },
      deleteClassification(id) {
        this.isDeleteLoading = true;
        deleteClassificationApi(id)
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getClassification()
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
