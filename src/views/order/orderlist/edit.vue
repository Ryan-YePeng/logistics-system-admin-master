<template>
  <div id="edit-order">
    <el-dialog
            title="更新订单"
            @close="cancel"
            fullscreen
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="140px" size="small">

        <el-collapse>
          <el-collapse-item title="订单详情" name="1">
            <el-row>
              <el-col :span="12">
                <el-form-item label="寄件人姓名:" prop="c_o_startName">
                  <el-input v-model="form.c_o_startName"></el-input>
                </el-form-item>
                <el-form-item label="始发地:" prop="c_o_provenance">
                  <el-input v-model="form.c_o_provenance"></el-input>
                </el-form-item>
                <el-form-item label="单位名称:">
                  <el-input v-model="form.c_o_startUnitName"></el-input>
                </el-form-item>
                <el-form-item label="寄件人详细地址:" prop="c_o_startAddress">
                  <el-input v-model="form.c_o_startAddress"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:" prop="c_o_startPhone">
                  <el-input v-model="form.c_o_startPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="l_o_startName">
                  <el-input v-model="form.l_o_startName"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_provenance">
                  <el-input v-model="form.l_o_provenance"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="form.l_o_startUnitName"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_startAddress">
                  <el-input v-model="form.l_o_startAddress"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_startPhone">
                  <el-input v-model="form.l_o_startPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="快递种类:">
              <el-radio-group v-model="form.o_kinds">
                <el-radio label="物品"></el-radio>
                <el-radio label="文件"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="重量:">
                  <el-input v-model="form.o_weight"></el-input>
                </el-form-item>
                <el-form-item label="体积重量:">
                  <el-input v-model="form.o_volume"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="内件品名:">
                  <el-input v-model="form.c_o_itemName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="form.l_o_itemName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="内件品数量:">
                  <el-input v-model="form.o_itemNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="寄件人证件号:" prop="c_o_sendersId">
                  <el-input v-model="form.c_o_sendersId"></el-input>
                </el-form-item>
                <el-form-item label="收件人姓名:" prop="c_o_endName">
                  <el-input v-model="form.c_o_endName"></el-input>
                </el-form-item>
                <el-form-item label="目的地:" prop="c_o_destination">
                  <el-input v-model="form.c_o_destination"></el-input>
                </el-form-item>
                <el-form-item label="单位名称:">
                  <el-input v-model="form.c_o_endUnitName"></el-input>
                </el-form-item>
                <el-form-item label="收件人详细地址:" prop="c_o_endAddress">
                  <el-input v-model="form.c_o_endAddress"></el-input>
                </el-form-item>
                <el-form-item label="收件人联系电话:" prop="c_o_endPhone">
                  <el-input v-model="form.c_o_endPhone"></el-input>
                </el-form-item>
                <el-form-item label="收件人证件号:">
                  <el-input v-model="form.c_o_recipientId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="l_o_sendersId">
                  <el-input v-model="form.l_o_sendersId"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_endName">
                  <el-input v-model="form.l_o_endName"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_destination">
                  <el-input v-model="form.l_o_destination"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="form.l_o_endUnitName"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_endAddress">
                  <el-input v-model="form.l_o_endAddress"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_endPhone">
                  <el-input v-model="form.l_o_endPhone"></el-input>
                </el-form-item>
                <el-form-item prop="l_o_recipientId">
                  <el-input v-model="form.l_o_recipientId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="付款方式:">
                  <el-radio-group v-model="form.o_payment">
                    <el-radio label="现金"></el-radio>
                    <el-radio label="到付"></el-radio>
                    <el-radio label="协议结算"></el-radio>
                    <el-radio label="保价"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="保价金额:" v-if="form.o_payment==='保价'">
                  <el-input v-model="form.o_amount"></el-input>
                </el-form-item>
                <el-form-item label="代收贷款:">
                  <el-input v-model="form.o_cod"></el-input>
                </el-form-item>
                <el-form-item label="运费:">
                  <el-input v-model="form.o_freight"></el-input>
                </el-form-item>
                <el-form-item label="加急费:">
                  <el-input v-model="form.o_urgentFee"></el-input>
                </el-form-item>
                <el-form-item label="包装费:">
                  <el-input v-model="form.o_packing"></el-input>
                </el-form-item>
                <el-form-item label="保价费:">
                  <el-input v-model="form.o_valuationFee"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="总计:">
                  <el-input v-model="form.c_o_total"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="form.l_o_total"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>

        <el-form-item label="定单号:" style="margin-top: 50px">{{number}}</el-form-item>
        <el-form-item label="状态:" prop="l_log_state">
          <el-select v-model="form.c_log_state" placeholder="请选择状态" @change="selectState">
            <el-option
                    v-for="item in option"
                    :label="item.c_log_state"
                    :value="item.c_log_state">
              <span style="float: left">{{ item.c_log_state }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.l_log_state }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注:">
              <el-input v-model="form.c_log_note"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="form.l_log_note"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="快递员:">
              <el-select v-model="form.c_log_member" placeholder="请选择快递员" clearable @change="selectCourier">
                <el-option
                        v-for="item in courierList"
                        :label="item.c_co_name"
                        :value="item.c_co_name">
                  <span style="float: left">{{ item.c_co_name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.l_co_name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="网点:" prop="c_log_branches">
              <el-select v-model="form.c_log_branches" placeholder="请选择网点" clearable @change="selectSite">
                <el-option
                        v-for="item in siteList"
                        :label="item.c__branchesName"
                        :value="item.c__branchesName">
                  <span style="float: left">{{ item.c__branchesName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.l_branchesName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('Form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {editOrderApi} from '@/api/order'
  import {isEmpty} from "@/utils/common";

  export default {
    name: "EditOrder",
    data() {
      return {
        dialogTableVisible: false,
        number: '',
        option: [
          {c_log_state: '揽收', l_log_state: 'ເກັບ ກຳ'},
          {c_log_state: '出库', l_log_state: 'ຂາອອກ'},
          {c_log_state: '到达', l_log_state: 'ມາຮອດ'},
          {c_log_state: '派送', l_log_state: 'ຈັດສົ່ງ'},
          {c_log_state: '签收', l_log_state: 'ລົງທະບຽນ'},
        ],
        form: {
          o_id: 0,

          c_o_startName: '', // 寄件人姓名
          c_o_provenance: '', // 始发地
          c_o_startUnitName: '',
          c_o_startAddress: '', // 寄件人地址
          c_o_startPhone: '', // 联系电话

          l_o_startName: '', // 寄件人姓名
          l_o_provenance: '', // 始发地
          l_o_startUnitName: '',
          l_o_startAddress: '', // 寄件人地址
          l_o_startPhone: '', // 联系电话

          o_kinds: '物品',
          o_weight: '',
          o_volume: '',

          c_o_itemName: '',

          l_o_itemName: '',

          o_itemNumber: '',

          c_o_sendersId: '', // 寄件人证件号
          c_o_endName: '', // 收件人姓名
          c_o_destination: '', // 目的地
          c_o_endUnitName: '',
          c_o_endAddress: '', // 收件人地址
          c_o_endPhone: '', // 收件人电话
          c_o_recipientId: '', // 收件人证件号

          l_o_sendersId: '', // 寄件人证件号
          l_o_endName: '', // 收件人姓名
          l_o_destination: '', // 目的地
          l_o_endUnitName: '',
          l_o_endAddress: '', // 收件人地址
          l_o_endPhone: '', // 收件人电话
          l_o_recipientId: '', // 收件人证件号

          o_payment: '现金',
          o_amount: '',
          o_cod: '',
          o_freight: '',
          o_urgentFee: '',
          o_packing: '',
          o_valuationFee: '',

          c_o_total: '',

          l_o_total: '',

          c_log_state: '揽收', // 状态
          l_log_state: 'ເກັບ ກຳ', // 状态

          c_log_note: '',
          l_log_note: '',

          c_log_member: '',
          l_log_member: '',

          c_log_branches: '',
          l_log_branches: ''
        },
        rules: {
          c_o_startName: {required: true, message: '请输入寄件人姓名', trigger: 'blur'},
          c_o_provenance: {required: true, message: '请输入始发地', trigger: 'blur'},
          c_o_startAddress: {required: true, message: '请输入寄件人地址', trigger: 'blur'},
          c_o_startPhone: {required: true, message: '请输入寄件人联系电话', trigger: 'blur'},

          l_o_startName: {required: true, message: '请输入寄件人姓名', trigger: 'blur'},
          l_o_provenance: {required: true, message: '请输入始发地', trigger: 'blur'},
          l_o_startAddress: {required: true, message: '请输入寄件人地址', trigger: 'blur'},
          l_o_startPhone: {required: true, message: '请输入寄件人联系电话', trigger: 'blur'},

          c_o_sendersId: {required: true, message: '请输入寄件人证件号', trigger: 'blur'},
          c_o_endName: {required: true, message: '请输入收件人姓名', trigger: 'blur'},
          c_o_destination: {required: true, message: '请输入目的地', trigger: 'blur'},
          c_o_endAddress: {required: true, message: '请输入收件人地址', trigger: 'blur'},
          c_o_endPhone: {required: true, message: '请输收件人电话', trigger: 'blur'},

          l_o_sendersId: {required: true, message: '请输入寄件人证件号', trigger: 'blur'},
          l_o_endName: {required: true, message: '请输入收件人姓名', trigger: 'blur'},
          l_o_destination: {required: true, message: '请输入目的地', trigger: 'blur'},
          l_o_endAddress: {required: true, message: '请输入联系方式', trigger: 'blur'},
          l_o_endPhone: {required: true, message: '请输入收件人地址', trigger: 'blur'},
          l_o_recipientId: {required: true, message: '请输收件人电话', trigger: 'blur'},
          l_log_state: {required: true, message: '请选择状态', trigger: 'change'},
        }
      }
    },
    props: {
      siteList: {
        type: Array,
        default: () => []
      },
      courierList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      userId() {
        return this.$store.getters.userId
      }
    },
    methods: {
      // 选择状态
      selectState(name) {
        this.option.some(item => {
          if (item.c_log_state === name) {
            this.form.c_log_state = item.c_log_state;
            this.form.l_log_state = item.l_log_state;
            return true
          }
        })
      },
      // 选择网点
      selectSite(name) {
        if (isEmpty(name)) {
          this.form.l_log_branches = '';
          this.form.c_o_provenance = '';
          this.form.l_o_provenance = '';
          return
        }
        this.siteList.some(item => {
          if (item.c__branchesName === name) {
            this.form.l_log_branches = item.l_branchesName;
            this.form.c_o_provenance = item.c_br_address;
            this.form.l_o_provenance = item.l_br_address;
            return true
          }
        });
      },

      //  选择快递员
      selectCourier(name) {
        if (isEmpty(name)) {
          this.form.l_log_member = '';
          return
        }
        this.courierList.some(item => {
          if (item.c_co_name === name) {
            this.form.l_log_member = item.l_co_name;
            return true
          }
        });
      },

      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            editOrderApi(data).then(() => {
              this.$emit('update');
              this.cancel()
            });
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.dialogTableVisible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields()
      }
    }
  }
</script>

<style lang="scss">
  #edit-order {
  }
</style>
