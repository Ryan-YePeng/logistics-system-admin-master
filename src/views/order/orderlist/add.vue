<template>
  <el-dialog
          title="新增快递员"
          width="800px"
          @close="cancel"
          fullscreen
          :close-on-click-modal="false"
          :visible.sync="dialogTableVisible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px" hide-required-asterisk>
      <el-form-item label="订单号:">
        <el-input v-model="form.l_o_orderNumber"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="寄件人姓名:">
            <el-input v-model="form.c_o_startName"></el-input>
          </el-form-item>
          <el-form-item label="始发地:">
            <el-input v-model="form.c_o_provenance"></el-input>
          </el-form-item>
          <el-form-item label="单位名称:">
            <el-input v-model="form.c_o_startUnitName"></el-input>
          </el-form-item>
          <el-form-item label="寄件人详细地址:">
            <el-input v-model="form.c_o_startAddress"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input v-model="form.c_o_startPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="form.l_o_startName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_provenance"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_startUnitName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_startAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_startPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="快递种类:">
        <el-input v-model="form.o_kinds"></el-input>
      </el-form-item>
      <el-form-item label="重量:">
        <el-input v-model="form.o_weight"></el-input>
      </el-form-item>
      <el-form-item label="体积:">
        <el-input v-model="form.o_volume"></el-input>
      </el-form-item>
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
      <el-form-item label="内件品数量:">
        <el-input v-model="form.o_itemNumber"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="寄件人证件号:">
            <el-input v-model="form.c_o_sendersId"></el-input>
          </el-form-item>
          <el-form-item label="收件人姓名:">
            <el-input v-model="form.c_o_endName"></el-input>
          </el-form-item>
          <el-form-item label="目的地:">
            <el-input v-model="form.c_o_destination"></el-input>
          </el-form-item>
          <el-form-item label="单位名称:">
            <el-input v-model="form.c_o_endUnitName"></el-input>
          </el-form-item>
          <el-form-item label="收件人详细地址:">
            <el-input v-model="form.c_o_endAddress"></el-input>
          </el-form-item>
          <el-form-item label="收件人联系电话:">
            <el-input v-model="form.c_o_endPhone"></el-input>
          </el-form-item>
          <el-form-item label="收件人证件号:">
            <el-input v-model="form.c_o_recipientId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="form.l_o_sendersId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_endName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_destination"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_endUnitName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_endAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_endPhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.l_o_recipientId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="付款方式:">
        <el-input v-model="form.o_payment"></el-input>
      </el-form-item>
      <el-form-item label="保价金额:">
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addCourierApi} from '@/api/courier'

  export default {
    name: "AddCourier",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          l_o_orderNumber: '',

          c_o_provenance: '',
          c_o_startUnitName: '',
          c_o_startAddress: '',
          c_o_startPhone: '',
          l_co_contact: '',

          l_o_startName: '',
          l_o_provenance: '',
          l_o_startUnitName: '',
          l_o_startAddress: '',
          l_o_startPhone: '',

          o_kinds: '',
          o_weight: '',
          o_volume: '',

          c_o_itemName: '',

          l_o_itemName: '',

          o_itemNumber: '',

          c_o_sendersId: '',
          c_o_endName: '',
          c_o_destination: '',
          c_o_endUnitName: '',
          c_o_endAddress: '',
          c_o_endPhone: '',
          c_o_recipientId: '',

          l_o_sendersId: '',
          l_o_endName: '',
          l_o_destination: '',
          l_o_endUnitName: '',
          l_o_endAddress: '',
          l_o_endPhone: '',
          l_o_recipientId: '',

          o_payment: '',
          o_amount: '',
          o_cod: '',
          o_freight: '',
          o_urgentFee: '',
          o_packing: '',
          o_valuationFee: '',

          c_o_total: '',

          l_o_total: ''
        },
        rules: {
          c_co_name: {required: true, message: '请输入姓名', trigger: 'blur'},
          c_co_number: {required: true, message: '请输入编号', trigger: 'blur'},
          c_co_contact: {required: true, message: '请输入联系方式', trigger: 'blur'},
          l_co_name: {required: true, message: '请输入姓名', trigger: 'blur'},
          l_co_number: {required: true, message: '请输入编号', trigger: 'blur'},
          l_co_contact: {required: true, message: '请输入联系方式', trigger: 'blur'},
        }
      }
    },
    computed: {
      userId() {
        return this.$store.getters.userId
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            data.l_user_id = this.userId;
            addCourierApi(data).then(() => {
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

<style scoped>

</style>
