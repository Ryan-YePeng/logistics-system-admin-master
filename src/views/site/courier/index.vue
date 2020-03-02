<template>
  <div id="help">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="搜索"
                  v-model="courierText"
                  style="width: 200px"
                  clearable
                  @keyup.enter.native="getCourier">
        </el-input>
        <el-button type="success" @click="getCourier">搜索</el-button>
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
                  prop="c_co_name"
                  label="姓名">
          </el-table-column>
          <el-table-column
                  prop="c_co_number"
                  label="编号">
          </el-table-column>
          <el-table-column
                  prop="c_co_contact"
                  label="联系方式">
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
                             @click.stop="deleteCourier(scope.row.l_co_id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getCourier"></pagination>
      </div>
    </el-card>
    <add-courier ref="AddCourier" @update="getCourier"></add-courier>
    <edit-courier ref="EditCourier" @update="getCourier"></edit-courier>
  </div>
</template>

<script>
  import {getCourierApi, deleteCourierApi} from '@/api/courier'
  import AddCourier from './add'
  import EditCourier from './edit'
  import pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'Courier',
    components: {EditCourier, AddCourier, pagination},
    data() {
      return {
        formData: [],
        isTableLoading: false,
        isDeleteLoading: false,
        courierText: '',
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
      this.getCourier();
    },
    methods: {
      getCourier() {
        this.isTableLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&u_id=${this.userId}&s=${this.courierText}`;
        getCourierApi(param).then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
        })
      },
      add() {
        this.$refs.AddCourier.dialogTableVisible = true
      },
      edit(obj) {
        let _this = this.$refs.EditCourier;
        objectEvaluate(obj, _this.form);
        _this.dialogTableVisible = true
      },
      deleteCourier(id) {
        this.isDeleteLoading = true;
        deleteCourierApi([id])
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getCourier()
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
          deleteCourierApi(this.deleteList).then(() => {
            this.getCourier()
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
