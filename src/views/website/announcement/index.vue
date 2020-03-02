<template>
  <div id="help">
    <el-card class="box-card" v-show="isShow">
      <div slot="header" class="clearfix">
        <el-input placeholder="搜索"
                  v-model="nameText"
                  style="width: 200px"
                  clearable
                  @keyup.enter.native="getAnnouncement">
        </el-input>
        <el-button type="success" @click="getAnnouncement">搜索</el-button>
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
                  prop="c_an_name"
                  label="标题(中文)">
          </el-table-column>
          <el-table-column
                  prop="l_an_name"
                  label="标题(老挝)">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" class="el-icon-edit" @click="edit(scope.row)" size="mini"></el-button>
              <el-popover
                      :ref="scope.row.l_an_id"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.l_an_id].doClose()">取消</el-button>
                  <el-button :loading="isDeleteLoading" type="primary" size="mini"
                             @click.stop="deleteAnnouncement(scope.row.l_an_id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <announcement-detail
            v-show="!isShow"
            ref="AnnouncementDetail"
            @close="close"
            @update="getAnnouncement">
    </announcement-detail>
  </div>
</template>

<script>
  import {deleteAnnouncementApi, getAnnouncementApi} from '@/api/announcement'
  import AnnouncementDetail from './detail'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'Announcement',
    components: {AnnouncementDetail},
    data() {
      return {
        formData: [],
        classificationList: [],
        isTableLoading: false,
        isDeleteLoading: false,
        nameText: '',
        isDeleteMoreDisabled: true,
        deleteList: [],
        isShow: true,
      }
    },
    mounted() {
      this.getAnnouncement();
    },
    methods: {
      getAnnouncement() {
        this.isTableLoading = true;
        getAnnouncementApi(this.nameText).then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
        })
      },
      add() {
        let _this = this.$refs.AnnouncementDetail;
        _this.title = '新增';
        this.isShow = false
      },
      close() {
        this.isShow = true
      },
      edit(obj) {
        let _this = this.$refs.AnnouncementDetail;
        _this.title = '编辑';
        _this.l_an_id = obj.l_an_id;
        objectEvaluate(obj, _this.form);
        _this.setContent(obj.c_an_content);
        this.isShow = false;
      },
      deleteAnnouncement(id) {
        this.isDeleteLoading = true;
        deleteAnnouncementApi([id])
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getAnnouncement()
            })
            .catch(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose()
            });
      },
      getSelected(array) {
        this.deleteList = array.map(item => {
          return item.l_an_id
        });
        this.isDeleteMoreDisabled = array.length === 0;
      },
      deleteMore() {
        this.$msgBox().then(() => {
          deleteAnnouncementApi(this.deleteList).then(() => {
            this.getAnnouncement()
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
