<template>
  <div id="order">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="订单号"
                  v-model="orderText"
                  style="width: 150px"
                  clearable
                  @keyup.enter.native="getOrder">
        </el-input>
        <el-input placeholder="姓名"
                  v-model="nameText"
                  style="width: 120px"
                  clearable
                  @keyup.enter.native="getOrder">
        </el-input>
        <el-input placeholder="电话"
                  v-model="phoneText"
                  style="width: 120px"
                  clearable
                  @keyup.enter.native="getOrder">
        </el-input>
        <el-input placeholder="时间"
                  v-model="timeText"
                  style="width: 150px"
                  clearable
                  @keyup.enter.native="getOrder">
        </el-input>
        <el-input placeholder="状态"
                  v-model="statusText"
                  style="width: 120px"
                  clearable
                  @keyup.enter.native="getOrder">
        </el-input>
        <el-button type="success" @click="getOrder">搜索</el-button>
        <el-button type="warning" @click="clearAll">清空</el-button>
        <el-button style="float: right" type="primary" @click="add">新增</el-button>
      </div>
      <el-button :disabled="isDeleteMoreDisabled" type="danger" @click="deleteMore">批量删除</el-button>
      <div>
        <el-table
                v-loading="isTableLoading"
                :highlight-current-row="true"
                @selection-change="getSelected"
                :data="formData">
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand" label-width="200px" size="mini">
                <el-form-item label="订单号:">{{props.row.l_o_orderNumber}}</el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="寄件人姓名:">{{props.row.c_o_startName}}</el-form-item>
                    <el-form-item label="始发地:">{{props.row.c_o_provenance}}</el-form-item>
                    <el-form-item label="单位名称:">{{props.row.c_o_startUnitName}}</el-form-item>
                    <el-form-item label="寄件人详细地址:">{{props.row.c_o_startAddress}}</el-form-item>
                    <el-form-item label="联系电话:">{{props.row.c_o_startPhone}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_startName}}</el-form-item>
                    <el-form-item>{{props.row.l_o_provenance}}</el-form-item>
                    <el-form-item>{{props.row.l_o_startUnitName}}</el-form-item>
                    <el-form-item>{{props.row.l_o_startAddress}}</el-form-item>
                    <el-form-item>{{props.row.l_o_startPhone}}</el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="快递种类:">{{props.row.o_kinds}}</el-form-item>
                <el-form-item label="重量:">{{props.row.o_weight}}</el-form-item>
                <el-form-item label="体积:">{{props.row.o_volume}}</el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="内件品名:">{{props.row.c_o_itemName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_itemName}}</el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="内件品数量:">{{props.row.o_itemNumber}}</el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="寄件人证件号:">{{props.row.c_o_sendersId}}</el-form-item>
                    <el-form-item label="收件人姓名:">{{props.row.c_o_endName}}</el-form-item>
                    <el-form-item label="目的地:">{{props.row.c_o_destination}}</el-form-item>
                    <el-form-item label="单位名称:">{{props.row.c_o_endUnitName}}</el-form-item>
                    <el-form-item label="收件人详细地址:">{{props.row.c_o_endAddress}}</el-form-item>
                    <el-form-item label="收件人联系电话:">{{props.row.c_o_endPhone}}</el-form-item>
                    <el-form-item label="收件人证件号:">{{props.row.c_o_recipientId}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_sendersId}}</el-form-item>
                    <el-form-item>{{props.row.l_o_endName}}</el-form-item>
                    <el-form-item>{{props.row.l_o_destination}}</el-form-item>
                    <el-form-item>{{props.row.l_o_endUnitName}}</el-form-item>
                    <el-form-item>{{props.row.l_o_endAddress}}</el-form-item>
                    <el-form-item>{{props.row.l_o_endPhone}}</el-form-item>
                    <el-form-item>{{props.row.l_o_recipientId}}</el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="付款方式:">{{props.row.o_payment}}</el-form-item>
                <el-form-item label="保价金额:">{{props.row.o_amount}}</el-form-item>
                <el-form-item label="代收贷款:">{{props.row.o_cod}}</el-form-item>
                <el-form-item label="运费:">{{props.row.o_freight}}</el-form-item>
                <el-form-item label="加急费:">{{props.row.o_urgentFee}}</el-form-item>
                <el-form-item label="包装费:">{{props.row.o_packing}}</el-form-item>
                <el-form-item label="保价费:">{{props.row.o_valuationFee}}</el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="总计:">{{props.row.c_o_total}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>{{props.row.l_o_total}}</el-form-item>
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
          <el-table-column prop="o_payment" label="付款方式"></el-table-column>
          <el-table-column prop="c_o_total" label="总计"></el-table-column>
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
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getOrder"></pagination>
      </div>
    </el-card>
    <add-order ref="AddOrder" @update="getOrder"></add-order>
    <edit-order ref="EditOrder" @update="getOrder"></edit-order>
  </div>
</template>

<script>
  import {getOrderApi, deleteOrderApi} from '@/api/order'
  import AddOrder from './add'
  import EditOrder from './edit'
  import pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: 'Order',
    components: {EditOrder, AddOrder, pagination},
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
        statusText: ''
        /*搜索*/
      }
    },
    computed: {
      userId() {
        return this.$store.getters.userId
      }
    },
    mounted() {
      this.getOrder();
    },
    methods: {
      getOrder() {
        this.isTableLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&s1=${this.orderText}&s2=${this.nameText}&s3=${this.phoneText}&s4${this.timeText}&s5${this.statusText}`;
        getOrderApi(param).then(result => {
          this.isTableLoading = false;
          this.formData = result.data.message;
          pagination.total = result.data.status;
        })
      },
      add() {
        this.$refs.AddOrder.dialogTableVisible = true
      },
      edit(obj) {
        let _this = this.$refs.EditOrder;
        objectEvaluate(obj, _this.form);
        _this.dialogTableVisible = true
      },
      deleteOrder(id) {
        this.isDeleteLoading = true;
        deleteOrderApi([id])
            .then(() => {
              this.isDeleteLoading = false;
              this.$refs[id].doClose();
              this.getOrder()
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
        this.$msgBox().then(() => {
          deleteOrderApi(this.deleteList).then(() => {
            this.getOrder()
          })
        })
      },
      clearAll() {
        this.orderText = '';
        this.nameText = '';
        this.phoneText = '';
        this.timeText = '';
        this.statusText = '';
        this.getOrder();
      }
    }
  }
</script>

<style lang="scss">
  #order {
    .el-form-item {
      margin-bottom: 2px !important;
    }
  }
</style>
