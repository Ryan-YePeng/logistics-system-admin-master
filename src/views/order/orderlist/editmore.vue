<template>
  <div id="edit-order-more">
    <el-dialog
            title="批量更新订单"
            @close="cancel"
            fullscreen
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <!-- 单号 -->
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"
               label-width="140px" size="small">
        <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :prop="'domains.' + index + '.value'"
                :rules="[
                  {required: true, message: '单号不能为空', trigger: 'blur'},
                  {validator: validateOrder, trigger: 'blur'}
                ]"
                :label="'单号' + (index + 1)"
                :key="domain.key">
          <el-row>
            <el-col :span="10">
              <el-input v-model="domain.value"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeDomain(domain)" icon="el-icon-minus" type="danger"></el-button>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="addDomain" icon="el-icon-plus" type="primary"></el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 状态 -->
      <el-form :model="form" :rules="rules" ref="Form" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:" prop="l_log_state">
              <el-select v-model="form.c_log_state" placeholder="请选择状态" @change="selectState">
                <el-option
                        v-for="item in option"
                        :key="item.c_log_state"
                        :label="item.c_log_state"
                        :value="item.c_log_state">
                  <span style="float: left">{{ item.c_log_state }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.l_log_state }}</span>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {editOrderApi, getIdByOrderApi} from '@/api/order'
  import {isEmpty} from "@/utils/common";
  import {searchSiteApi} from "@/api/site";

  export default {
    name: "EditOrderMore",
    data() {
      return {
        dialogTableVisible: false,
        option: [
          // {c_log_state: '揽收', l_log_state: 'ເກັບ ກຳ'},
          {c_log_state: '发出', l_log_state: 'ສົ່ງອອກ'},
          {c_log_state: '到达', l_log_state: 'ມາຮອດ'},
          {c_log_state: '派送', l_log_state: 'ຈັດສົ່ງ'},
          // {c_log_state: '问题件', l_log_state: 'ຊິ້ນບັນຫາ'},
          // {c_log_state: '签收', l_log_state: 'ລົງທະບຽນ'},
        ],
        dynamicValidateForm: {
          domains: [{
            value: ''
          }]
        },
        form: {
          c_log_state: '', // 状态
          l_log_state: '', // 状态

          c_problemtybe: '',
          l_problemtybe: '',

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
          l_log_state: {required: true, message: '请选择状态', trigger: 'change'}
        },

        /* 模糊搜索 */
        searchLoading: false,
        siteNameOptions: [],
        /* 模糊搜索 */
      }
    },
    props: {
      courierList: { // 快递员列表
        type: Array,
        default: () => []
      }
    },
    computed: {
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
    },
    methods: {
      /* 动态添加表单 */
      removeDomain(item) {
        let length = this.dynamicValidateForm.domains.length;
        if (length === 1) {
          this.$warnMsg('至少保留一个单号');
          return
        }
        let index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      validateOrder(rule, value, callback) {
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
            this.dynamicValidateForm.domains.some(item => {
              let temp = item.value.trim();
              if (temp === value) {
                item.o_id = message;
                return true
              }
            });
            callback()
          }
        });
      },
      /* 动态添加表单 */

      // 提交
      submitForm() {
        this.$refs['dynamicValidateForm'].validate((valid) => {
          if (valid) {
            this.lastSubmitForm()
          } else {
            return false
          }
        });
      },
      lastSubmitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            this.$msgBox('确认提交？').then(() => {
              let data = {...this.form};
              let list = [];
              this.dynamicValidateForm.domains.forEach(item => {
                if (item.o_id) {
                  list.push(item.o_id)
                }
              });
              data._oid = list.join(',');
              console.log(data);
              return
              editOrderApi(data).then(() => {
                this.$emit('update');
                this.cancel()
              });
            });
          } else {
            return false;
          }
        });
      },

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
            this.form.c_co_contact = item.c_co_contact;
            this.form.l_co_contact = item.l_co_contact;
            this.form.l_log_member = item.l_co_name;
            return true
          }
        });
      },

      // 关闭
      cancel() {
        this.dialogTableVisible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields();
        this.$refs['dynamicValidateForm'].resetFields();
        Object.assign(this.$data.dynamicValidateForm, this.$options.data().dynamicValidateForm);
      }
    }
  }
</script>

<style lang="scss">
  #edit-order-more {
  }
</style>
