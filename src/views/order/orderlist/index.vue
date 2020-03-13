<template>
  <div id="order">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="订单号"
                  v-model="orderText"
                  style="width: 170px"
                  clearable
                  @keyup.enter.native="searchOrder">
        </el-input>
        <el-input placeholder="姓名"
                  v-model="nameText"
                  style="width: 140px"
                  clearable
                  @keyup.enter.native="searchOrder">
        </el-input>
        <el-input placeholder="联系电话"
                  v-model="phoneText"
                  style="width: 130px"
                  clearable
                  @keyup.enter.native="searchOrder">
        </el-input>
        <el-input placeholder="录入时间"
                  v-model="timeText"
                  style="width: 180px"
                  clearable
                  @keyup.enter.native="searchOrder">
        </el-input>
        <el-select
                v-model="statusText"
                style="width:120px"
                placeholder="状态"
                @change="searchOrder"
                clearable>
          <el-option label="揽收" value="揽收"></el-option>
          <el-option label="发出" value="发出"></el-option>
          <el-option label="到达" value="到达"></el-option>
          <el-option label="派送" value="派送"></el-option>
          <el-option label="问题件" value="问题件"></el-option>
          <el-option label="签收" value="签收"></el-option>
        </el-select>
        <el-button type="success" @click="searchOrder">搜索全部</el-button>
        <el-button type="warning" @click="clearAll">复原</el-button>
      </div>
      <el-button v-if="isLevel" :disabled="isDeleteMoreDisabled" type="danger" @click="deleteMore">批量删除</el-button>
      <el-button type="success" @click="exportExcel">导出订单</el-button>
      <el-button type="primary" @click="editMore">批量编辑</el-button>
      <div>
        <el-table
                v-loading="isTableLoading"
                :highlight-current-row="true"
                @selection-change="getSelected"
                :data="formData">
          <el-table-column v-if="isLevel" type="selection" width="45"></el-table-column>

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand" label-width="200px" size="mini">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="订单号:">{{props.row.l_o_orderNumber}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="寄件人姓名:">{{props.row.c_o_startName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_startName}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="始发地:">{{props.row.c_o_provenance}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_provenance}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="单位名称:">{{props.row.c_o_startUnitName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_startUnitName}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="寄件人详细地址:">{{props.row.c_o_startAddress}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_startAddress}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="联系电话:">{{props.row.c_o_startPhone}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_startPhone}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="快递种类:">{{props.row.o_kinds}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="重量:">{{props.row.o_weight}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="体积重量:">{{props.row.o_volume}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="内件品名:">{{props.row.c_o_itemName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_itemName}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="内件品数量:">{{props.row.o_itemNumber}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="寄件人证件号:">{{props.row.c_o_sendersId}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_sendersId}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="收件人姓名:">{{props.row.c_o_endName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_endName}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="目的地:">{{props.row.c_o_destination}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_destination}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="单位名称:">{{props.row.c_o_endUnitName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_endUnitName}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="收件人详细地址:">{{props.row.c_o_endAddress}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_endAddress}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="收件人联系电话:">{{props.row.c_o_endPhone}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_endPhone}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="收件人证件号:">{{props.row.c_o_recipientId}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_recipientId}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="付款方式:">{{props.row.o_payment}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row v-if="props.row.o_payment=='保价'">
                  <el-col :span="24">
                    <el-form-item label="保价金额:">{{props.row.o_amount}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="代收贷款:">{{props.row.o_cod}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="运费:">{{props.row.o_freight}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="加急费:">{{props.row.o_urgentFee}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="包装费:">{{props.row.o_packing}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="保价费:">{{props.row.o_valuationFee}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="总计:">
                      {{props.row.c_o_total}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      {{props.row.l_o_total}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="状态:">
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].c_log_state}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].l_log_state}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="备注:">
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].c_log_note}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].l_log_note}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="快递员:">
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].c_log_member}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].l_log_member}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="快递员联系方式:">
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].c_co_contact}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].l_co_contact}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网点:">
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].c_log_branches}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].l_log_branches}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="发往网点:">
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].c_problem}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      {{props.row.l_logisticsupdate[props.row.l_logisticsupdate.length-1].l_problem}}
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="l_o_orderNumber" label="订单号" width="120"></el-table-column>
          <el-table-column prop="c_o_startName" label="寄件人姓名"></el-table-column>
          <el-table-column prop="c_o_startPhone" label="寄件人联系电话"></el-table-column>
          <el-table-column prop="c_o_endName" label="收件人姓名"></el-table-column>
          <el-table-column prop="c_o_endPhone" label="收件人联系电话"></el-table-column>
          <el-table-column prop="l_o_time" label="录入时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.l_logisticsupdate[scope.row.l_logisticsupdate.length-1].c_log_state}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-button type="primary" class="el-icon-edit" @click="edit(scope.row)" size="mini"></el-button>
              <el-popover
                      :ref="scope.row.o_id"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.o_id].doClose()">取消</el-button>
                  <el-button :loading="isDeleteLoading" type="primary" size="mini"
                             @click.stop="deleteOrder(scope.row.o_id)">确定
                  </el-button>
                </div>
                <el-button v-if="isLevel" slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="searchOrder"></pagination>
      </div>
    </el-card>
    <edit-order ref="EditOrder" @update="searchOrder" :courierList="courierList"></edit-order>
    <edit-order-more ref="EditOrderMore" @update="searchOrder" :courierList="courierList"></edit-order-more>
  </div>
</template>

<script>
  import {deleteOrderApi, searchOrderApi, exportOrderApi} from '@/api/order'
  import {getCourierApi} from '@/api/courier'
  import EditOrder from './edit'
  import EditOrderMore from './editmore'
  import pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'Order',
    components: {EditOrder, pagination, EditOrderMore},
    data() {
      return {
        formData: [],
        isTableLoading: false,
        isDeleteLoading: false,
        isDeleteMoreDisabled: true,
        deleteList: [],
        /*搜索*/
        orderText: '',
        nameText: '',
        phoneText: '',
        timeText: '',
        statusText: '',
        /*搜索*/
        courierList: []
      }
    },
    computed: {
      isLevel() {
        let authority = this.$store.getters.user.authorities[0]['authority'];
        return authority === 'level';
      },
      userId() {
        return this.$store.getters.userId
      },
      i() {
        let authority = this.$store.getters.user.authorities[0]['authority'];
        if (authority === 'level0' || authority === 'level') {
          return 0
        } else if (authority === 'level1') {
          return 1
        } else {
          return 2
        }
      },
      role() {
        let authority = this.$store.getters.user.authorities[0]['authority'];
        if (authority === 'level') {
          return -1
        } else if (authority === 'level0') {
          return 0
        } else if (authority === 'level1') {
          return 1
        } else {
          return 2
        }
      },
      user() {
        return this.$store.getters.user
      }
    },
    mounted() {
      this.searchOrder();
      let param = `u_id=${this.userId}&role=${this.role}&pageNumber=1&pageCount=99999&s=`;
      getCourierApi(param).then(result => {
        this.courierList = result.data.message
      })
    },
    methods: {
      // 搜索全部订单
      searchOrder() {
        this.isTableLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&s1=${this.orderText}&s2=${this.nameText}&s3=${this.phoneText}&s4=${this.timeText}&s5=${this.statusText}`;
        searchOrderApi(param).then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
          pagination.total = result.data.status;
        })
      },
      edit(obj) {
        let _this = this.$refs.EditOrder;
        objectEvaluate(obj, _this.form);
        _this.number = obj.l_o_orderNumber;

        let array = obj.l_logisticsupdate;
        let lastItem = array[array.length - 1];

        _this.form.c_log_state = lastItem.c_log_state;
        _this.form.l_log_state = lastItem.l_log_state;
        _this.form.c_log_note = lastItem.c_log_note;
        _this.form.l_log_note = lastItem.l_log_note;
        _this.form.c_log_member = lastItem.c_log_member;
        _this.form.l_log_member = lastItem.l_log_member;
        _this.form.c_co_contact = lastItem.c_co_contact;
        _this.form.l_co_contact = lastItem.l_co_contact;
        // _this.form.c_log_branches = lastItem.c_log_branches;
        // _this.form.l_log_branches = lastItem.l_log_branches;
        // _this.form.c_problemtybe = lastItem.c_problemtybe;
        // _this.form.l_problemtybe = lastItem.l_problemtybe;
        // _this.form.c_problem = lastItem.c_problem;
        // _this.form.l_problem = lastItem.l_problem;

        _this.form.c_log_branches = this.user.c__branchesName;
        _this.form.l_log_branches = this.user.l_branchesName;

        _this.dialogTableVisible = true
      },
      exportExcel() {
        let param = `u_id=${this.userId}&i=${this.i}`;
        exportOrderApi(param)
      },
      deleteOrder(id) {
        this.isDeleteLoading = true;
        deleteOrderApi([id])
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.searchOrder()
            })
            .catch(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose()
            });
      },
      getSelected(array) {
        this.deleteList = array.map(item => {
          return item.o_id
        });
        this.isDeleteMoreDisabled = array.length === 0;
      },
      deleteMore() {
        if (!this.isLevel) return;
        this.$msgBox().then(() => {
          deleteOrderApi(this.deleteList).then(() => {
            this.searchOrder()
          })
        })
      },
      clearAll() {
        this.orderText = '';
        this.nameText = '';
        this.phoneText = '';
        this.timeText = '';
        this.statusText = '';
        this.searchOrder();
      },
      editMore() {
        let _this = this.$refs.EditOrderMore;
        _this.form.c_log_branches = this.user.c__branchesName;
        _this.form.l_log_branches = this.user.l_branchesName;
        _this.dialogTableVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  #order {
    .el-form-item--mini.el-form-item {
      margin-bottom: 2px !important;
    }

    .el-row {
      padding: 0 3px 0 3px;
    }

    .el-row:nth-child(2n-1) {
      background: rgb(243, 243, 243);
    }
  }
</style>
