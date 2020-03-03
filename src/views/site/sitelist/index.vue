<template>
  <div id="help">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="搜索"
                  v-model="siteText"
                  style="width: 200px"
                  clearable
                  @keyup.enter.native="getSite">
        </el-input>
        <el-button type="success" @click="getSite">搜索</el-button>
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
                  prop="c__branchesName"
                  label="网点名称">
          </el-table-column>
          <el-table-column
                  prop="username"
                  label="账号">
          </el-table-column>
          <el-table-column
                  prop="c_br_phone"
                  label="联系方式">
          </el-table-column>
          <el-table-column
                  prop="c_br_address"
                  label="地址">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" class="el-icon-edit" @click="edit(scope.row)" size="mini"></el-button>
              <el-popover
                      :ref="scope.row.l_co_id"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.l_co_id].doClose()">取消</el-button>
                  <el-button :loading="isDeleteLoading" type="primary" size="mini"
                             @click.stop="deleteSite(scope.row.l_co_id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getSite"></pagination>
      </div>
    </el-card>
    <add-site ref="AddSite" @update="getSite"></add-site>
    <edit-site ref="EditSite" @update="getSite"></edit-site>
  </div>
</template>

<script>
  import {getSiteApi, deleteSiteApi} from '@/api/site'
  import AddSite from './add'
  import EditSite from './edit'
  import pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'Site',
    components: {EditSite, AddSite, pagination},
    data() {
      return {
        formData: [],
        isTableLoading: false,
        isDeleteLoading: false,
        siteText: '',
        isDeleteMoreDisabled: true,
        deleteList: []
      }
    },
    computed: {
      userId() {
        return this.$store.getters.userId
      }
    },
    mounted() {
      this.getSite();
    },
    methods: {
      getSite() {
        this.isTableLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&u_id=${this.userId}&s=${this.siteText}`;
        getSiteApi(param).then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
          pagination.total = result.data.status
        })
      },
      add() {
        this.$refs.AddSite.dialogTableVisible = true
      },
      edit(obj) {
        let _this = this.$refs.EditSite;
        obj.password = '';
        objectEvaluate(obj, _this.form);
        _this.dialogTableVisible = true
      },
      deleteSite(id) {
        this.isDeleteLoading = true;
        deleteSiteApi([id])
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getSite()
            })
            .catch(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose()
            });
      },
      getSelected(array) {
        this.deleteList = array.map(item => {
          return item.l_co_id
        });
        this.isDeleteMoreDisabled = array.length === 0;
      },
      deleteMore() {
        this.$msgBox().then(() => {
          deleteSiteApi(this.deleteList).then(() => {
            this.getSite()
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
