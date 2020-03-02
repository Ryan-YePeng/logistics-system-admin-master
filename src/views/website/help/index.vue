<template>
  <div id="help">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="搜索客服电话"
                  v-model="phoneText"
                  style="width: 200px"
                  clearable
                  @keyup.enter.native="getPhone">
        </el-input>
        <el-button type="success" @click="getPhone">搜索</el-button>
        <el-button style="float: right" type="primary" @click="add">新增</el-button>
      </div>
      <div>
        <el-table
                v-loading="isTableLoading"
                :data="formData">
          <el-table-column
                  prop="c_s_phone"
                  label="中国电话">
          </el-table-column>
          <el-table-column
                  prop="l_s_phone"
                  label="老挝电话">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" class="el-icon-edit" @click="edit(scope.row)" size="mini"></el-button>
              <el-popover
                      :ref="scope.row.l_s_id"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.l_s_id].doClose()">取消</el-button>
                  <el-button :loading="isDeleteLoading" type="primary" size="mini"
                             @click.stop="deletePhone(scope.row.l_s_id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <add-phone ref="AddPhone" @update="getPhone"></add-phone>
    <edit-phone ref="EditPhone" @update="getPhone"></edit-phone>
  </div>
</template>

<script>
  import {getPhoneApi, deletePhoneApi} from '@/api/help'
  import AddPhone from './add'
  import EditPhone from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'Help',
    components: {EditPhone, AddPhone},
    data() {
      return {
        formData: [],
        isTableLoading: false,
        isDeleteLoading: false,
        phoneText: ''
      }
    },
    mounted() {
      this.getPhone();
    },
    methods: {
      getPhone() {
        this.isTableLoading = true;
        getPhoneApi(this.phoneText).then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
        })
      },
      add() {
        this.$refs.AddPhone.dialogTableVisible = true
      },
      edit(obj) {
        let _this = this.$refs.EditPhone;
        objectEvaluate(obj, _this.form);
        _this.dialogTableVisible = true
      },
      deletePhone(id) {
        this.isDeleteLoading = true;
        deletePhoneApi(id)
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getPhone()
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
