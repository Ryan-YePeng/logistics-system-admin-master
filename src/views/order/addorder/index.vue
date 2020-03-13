<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>新增订单</span>
    </div>
    <div>
      <el-form :model="form" :rules="rules" ref="Form" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单号:" prop="o_id">
              <el-input v-model="form.o_id" length="13"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="寄件人姓名:" prop="c_o_startName">
              <el-input v-model="form.c_o_startName" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="始发地:" prop="c_o_provenance">
              <el-input v-model="form.c_o_provenance" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="单位名称:">
              <el-input v-model="form.c_o_startUnitName" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="寄件人详细地址:" prop="c_o_startAddress">
              <el-input v-model="form.c_o_startAddress" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="c_o_startPhone">
              <el-input v-model="form.c_o_startPhone" placeholder="中文"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="l_o_startName">
              <el-input v-model="form.l_o_startName" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_provenance">
              <el-input v-model="form.l_o_provenance" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.l_o_startUnitName" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_startAddress">
              <el-input v-model="form.l_o_startAddress" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_startPhone">
              <el-input v-model="form.l_o_startPhone" placeholder="老挝语"></el-input>
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
          </el-col>
        </el-row>

        <div style="margin-left: 140px">
          <input type="number" min="0" v-model="length" style="width:100px">长(cm) *
          <input type="number" min="0" v-model="width" style="width:100px">宽(cm) *
          <input type="number" min="0" v-model="height" style="width:100px">高(cm) / 5000
        </div>

        <el-row>
          <el-col :span="12">
            <el-form-item label="体积重量:">
              <el-input v-model="form.o_volume"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="内件品名:">
              <el-input v-model="form.c_o_itemName" placeholder="中文"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="form.l_o_itemName" placeholder="老挝语"></el-input>
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
              <el-input v-model="form.c_o_sendersId" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="收件人姓名:" prop="c_o_endName">
              <el-input v-model="form.c_o_endName" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="目的地:" prop="c_o_destination">
              <el-input v-model="form.c_o_destination" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="单位名称:">
              <el-input v-model="form.c_o_endUnitName" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="收件人详细地址:" prop="c_o_endAddress">
              <el-input v-model="form.c_o_endAddress" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="收件人联系电话:" prop="c_o_endPhone">
              <el-input v-model="form.c_o_endPhone" placeholder="中文"></el-input>
            </el-form-item>
            <el-form-item label="收件人证件号:">
              <el-input v-model="form.c_o_recipientId" placeholder="中文"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="l_o_sendersId">
              <el-input v-model="form.l_o_sendersId" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_endName">
              <el-input v-model="form.l_o_endName" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_destination">
              <el-input v-model="form.l_o_destination" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.l_o_endUnitName" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_endAddress">
              <el-input v-model="form.l_o_endAddress" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_endPhone">
              <el-input v-model="form.l_o_endPhone" placeholder="老挝语"></el-input>
            </el-form-item>
            <el-form-item prop="l_o_recipientId">
              <el-input v-model="form.l_o_recipientId" placeholder="老挝语"></el-input>
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
              <el-input v-model="form.c_o_total" placeholder="中文"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="form.l_o_total" placeholder="老挝语"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:" prop="c_log_state">
              <el-select v-model="form.c_log_state" placeholder="请选择状态">
                <el-option label="揽收" value="揽收">
                  <span style="float: left">揽收</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">ເກັບ ກຳ</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="备注:">
              <el-input v-model="form.c_log_note" placeholder="中文"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="form.l_log_note" placeholder="老挝语"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="快递员:">
              <el-select v-model="form.c_log_member" placeholder="请选择快递员" clearable @change="selectCourier">
                <el-option
                        v-for="item in courierList"
                        :key="item.l_co_id"
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
            <el-form-item label="当前网点:" prop="c_log_branches">
              {{form.c_log_branches}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="l_log_branches">
              {{form.l_log_branches}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发往网点:" prop="c_problem">
              <el-select
                      v-model="form.c_problem"
                      placeholder="请输入网点名称"
                      clearable
                      filterable
                      remote
                      reserve-keyword
                      :remote-method="remoteMethod"
                      :loading="searchLoading"
                      @change="siteNameSelected">
                <el-option
                        v-for="item in siteNameOptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                  <span style="float: left">{{ item.c__branchesName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.l_branchesName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              发往网点编号： {{form.c_log_username}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button :loading="isSubmitLoading" style="float: right;margin-bottom: 10px" type="primary"
                 @click="submitForm('Form')">提 交
      </el-button>
    </div>
  </el-card>
</template>

<script>
  import {editOrderApi, getIdByOrderApi} from '@/api/order'
  import {getCourierApi} from "@/api/courier";
  import {isEmpty} from "@/utils/common";
  import {searchSiteApi} from "@/api/site";

  export default {
    name: "AddOrder",
    data() {
      let validateOrder = (rule, value, callback) => {
        value = value.trim();
        let param = `l_o_orderNumber=${value}&u_id=${this.userId}&role=${this.role}`;
        if (value.length !== 13) {
          callback(new Error('请输入长度为13的单号'));
          return
        }
        getIdByOrderApi(param).then(result => {
          let message = result.data.message;
          if (message === 0) {
            callback(new Error('此订单号不可使用,请更换一个订单号'))
          } else {
            this.orderId = message;
            callback()
          }
        });
      };
      return {
        orderId: null,
        courierList: [],
        isSubmitLoading: false,
        length: 0,
        width: 0,
        height: 0,
        form: {
          o_id: null,

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
          c_co_contact: '',
          l_co_contact: '',

          c_log_branches: '',
          l_log_branches: '',

          c_problem: '',  // 下一网点
          l_problem: '',  // 下一网点
          c_log_username: '', // 下一网点编号
          l_log_username: '', // 下一网点编号
        },
        rules: {
          o_id: [
            {required: true, message: '请输入单号', trigger: 'blur'},
            {validator: validateOrder, trigger: 'blur'}
          ],

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
          c_o_endPhone: {required: true, message: '请输收件人联系电话', trigger: 'blur'},

          l_o_sendersId: {required: true, message: '请输入寄件人证件号', trigger: 'blur'},
          l_o_endName: {required: true, message: '请输入收件人姓名', trigger: 'blur'},
          l_o_destination: {required: true, message: '请输入目的地', trigger: 'blur'},
          l_o_endAddress: {required: true, message: '请输入收件人地址', trigger: 'blur'},
          l_o_endPhone: {required: true, message: '请输收件人联系电话', trigger: 'blur'},

          c_log_state: {required: true, message: '请选择状态', trigger: 'change'},


        },

        /* 模糊搜索 */
        searchLoading: false,
        siteNameOptions: [],
        /* 模糊搜索 */
      }
    },
    watch: {
      length: function () {
        this.calculate()
      },
      width: function () {
        this.calculate()
      },
      height: function () {
        this.calculate()
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
      userId() {
        return this.$store.getters.userId
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
      i() {
        let authority = this.$store.getters.user.authorities[0]['authority'];
        if (authority === 'level' || authority === 'level0') {
          return 0
        } else if (authority === 'level1') {
          return 1
        } else {
          return 2
        }
      }
    },
    mounted() {
      this.form.c_log_branches = this.user.c__branchesName;
      this.form.l_log_branches = this.user.l_branchesName;
      this.form.c_o_provenance = this.user.c_br_address;
      this.form.l_o_provenance = this.user.l_br_address;
      let param = `u_id=${this.userId}&role=${this.role}&pageNumber=1&pageCount=99999&s=`;
      getCourierApi(param).then(result => {
        this.courierList = result.data.message
      });
    },
    methods: {
      /* 模糊搜索网点 */
      siteNameSelected() {
        let name = this.form.c_problem;
        setTimeout(() => {
          if (isEmpty(this.form.c_problem)) {
            this.form.l_problem = '';
            this.form.c_log_username = '';
            this.form.l_log_username = '';
            return
          }
          this.siteNameOptions.some(item => {
            if (item.c__branchesName === name) {
              this.form.l_problem = item.l_branchesName;
              this.form.c_log_username = item.username;
              this.form.l_log_username = item.username;
              return true
            }
          });
        }, 100)
      },
      remoteMethod(query) {
        if (query !== '') {
          this.searchLoading = true;
          searchSiteApi(query).then(result => {
            this.searchLoading = false;
            let siteNameOptionsData = [];
            let response = result.data.message;
            for (let i = 0; i < response.length; i++) {
              siteNameOptionsData.push({
                value: response[i].c__branchesName,
                label: response[i].c__branchesName,
                c__branchesName: response[i].c__branchesName,
                l_branchesName: response[i].l_branchesName,
                c_br_address: response[i].c_br_address,
                l_br_address: response[i].l_br_address,
                username: response[i].username,
                key: response[i].u_id
              })
            }
            this.siteNameOptions = siteNameOptionsData;
          }).catch(() => {
            this.searchLoading = false;
          })
        } else {
          this.siteNameOptions = [];
        }
      },
      /* 模糊搜索网点 */

      // 计算体积重量
      calculate() {
        let length = this.length;
        let width = this.width;
        let height = this.height;
        this.form.o_volume = length * width * height / 5000
      },

      //  选择快递员
      selectCourier(name) {
        if (isEmpty(name)) {
          this.form.l_log_member = '';
          this.form.c_co_contact = '';
          this.form.l_co_contact = '';
          return
        }
        this.courierList.some(item => {
          if (item.c_co_name === name) {
            this.form.l_log_member = item.l_co_name;
            this.form.c_co_contact = item.c_co_contact;
            this.form.l_co_contact = item.l_co_contact;
            return true
          }
        });
      },

      //  提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$msgBox('请确认提交').then(() => {
              let data = {...this.form};
              data.o_id = this.orderId;
              editOrderApi(data).then(() => {
                this.cancel();
              });
            })
          } else {
            return false;
          }
        });
      },
      cancel() {
        Object.assign(this.$data.form, this.$options.data().form);
        this.length = 0;
        this.width = 0;
        this.height = 0;
        this.$refs['Form'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
