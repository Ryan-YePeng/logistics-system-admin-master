<template>
  <div id="export-order">
    <el-button type="success" @click="exportExcel">导出订单</el-button>
    <el-dialog
            title="导出订单"
            width="500px"
            @close="cancel"
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <el-form label-width="100px" hide-required-asterisk>
        <el-form-item label="日期:" style="width: 315px">
          <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="网点:" v-if="level!=='level2'">
          <el-select
                  v-model="branches"
                  placeholder="请输入网点名称"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  :remote-method="remoteMethod"
                  :loading="searchLoading">
            <template v-for="item in siteNameOptions">
              <el-option
                      :key="item.key"
                      :label="item.label"
                      :value="item.c__branchesName">
                <span style="float: left">{{ item.c__branchesName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.l_branchesName }}</span>
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="state" placeholder="请选择状态" clearable>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button :loading="isLoading" type="primary" @click="submitForm('Form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {exportOrderApi} from '@/api/order'
  import {formatDate, isEmpty} from "@/utils/common";
  import {getMySiteApi} from '@/api/number'

  export default {
    name: 'ExportOrder',
    data() {
      return {
        isLoading: false,
        dialogTableVisible: false,
        option: [
          {c_log_state: '揽收', l_log_state: 'ເກັບ ກຳ'},
          {c_log_state: '发出', l_log_state: 'ສົ່ງອອກ'},
          {c_log_state: '到达', l_log_state: 'ມາຮອດ'},
          {c_log_state: '派送', l_log_state: 'ຈັດສົ່ງ'},
          {c_log_state: '问题件', l_log_state: 'ຊິ້ນບັນຫາ'},
          {c_log_state: '签收', l_log_state: 'ລົງທະບຽນ'},
        ],
        time: '',
        branches: '',
        state: '',
        /* 模糊搜索 */
        searchLoading: false,
        siteNameOptions: [],
        siteObj: {},
        /* 模糊搜索 */
      }
    },
    props: {
      userId: {
        type: Number
      }
    },
    computed: {
      level() {
        return this.$store.getters.user.authorities[0]['authority'];
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
        if (authority === 'level') {
          return -1
        } else {
          return 0
        }
      }
    },
    methods: {
      /* 模糊搜索网点 */
      remoteMethod(query) {
        if (query !== '') {
          this.searchLoading = true;
          let param = `pageNumber=1&pageCount=999999&s=${query}&u_id=${this.userId}&role=${this.role}`;
          getMySiteApi(param).then(result => {
            this.searchLoading = false;
            let siteNameOptionsData = [];
            let response = result.data.message;
            for (let i = 0; i < response.length; i++) {
              siteNameOptionsData.push({
                value: response[i].u_id,
                label: response[i].c__branchesName,
                c__branchesName: response[i].c__branchesName,
                l_branchesName: response[i].l_branchesName,
                role: response[i].authorities[0]['authority'],
                username: response[i].username,
                key: response[i].u_id,
                u_id: response[i].u_id
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

      exportExcel() {
        this.dialogTableVisible = true;
      },
      submitForm() {
        if (this.level === 'level2') this.branches = this.$store.getters.user.c__branchesName;
        let start;
        let end;
        if (isEmpty(this.time)) {
          start = '';
          end = '';
        } else {
          start = formatDate(this.time[0]);
          end = formatDate(this.time[1])
        }
        let param = `u_id=${this.userId}&i=${this.i}&firstime=${start}&endTime=${end}&branches=${this.branches}&state=${this.state}`;
        this.isLoading = true;
        exportOrderApi(param)
            .then(response => {
              this.isLoading = false;
              let blob = new Blob([response.data]);
              let downloadElement = document.createElement('a');
              let href = window.URL.createObjectURL(blob); //创建下载的链接
              downloadElement.href = href;
              downloadElement.download = '订单数据.xls'; //下载后文件名
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载
              document.body.removeChild(downloadElement); //下载完成移除元素
              window.URL.revokeObjectURL(href); //释放掉blob对象
              this.cancel();
            })
            .catch(() => {
              this.isLoading = false;
            })
      },
      cancel() {
        this.dialogTableVisible = false;
        this.time = '';
        this.branches = '';
        this.state = ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
