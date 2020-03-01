<template>
  <div class="picture-cropper-uploader">
    <el-upload
      ref="uploadDeskTopLogo"
      class="avatar-uploader"
      action="customize"
      accept=".jpg,.png,.gif,.jepg,.jpeg"
      :show-file-list="false"
      :auto-upload="false"
      list-type="picture"
      :on-change="changeUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="picture-cropper"
           :style="'width:'+width+';height:'+height+';border-radius:'+borderRadius">
      <i v-else class="el-icon-plus picture-uploader-icon"
         :style="'width:'+width+';height:'+height+';line-height:'+height+';border-radius:'+borderRadius"></i>
    </el-upload>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="cropperDialogVisible" append-to-body :close-on-click-modal="false"
               @close="closeUpload">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="option.info"
            :full="option.full"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            @realTime="realTime"
            @imgLoad="imgLoad"
          />
        </div>
        <!--预览-->
        <div class="show-preview"
             :style="'width:180px;overflow:hidden;margin:5px;height:'+(180*this.fixedNumber[1]/this.fixedNumber[0])+'px'">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="'width: 180px;height:'+(180*this.fixedNumber[1]/this.fixedNumber[0])+'px'">
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finish" :loading="isLoadingButton">确认</el-button>
        <el-button @click="closeUpload">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {VueCropper} from 'vue-cropper'

  export default {
    components: {VueCropper},
    props: {
      imageUrl: {
        type: String,
        default: () => ''
      },
      fixedNumber: {
        type: Array,
        default: () => [1, 1]
      },
      width: {
        type: String,
        default: () => '120px'
      },
      height: {
        type: String,
        default: () => '120px'
      },
      borderRadius: {
        type: String,
        default: () => '4px'
      }
    },
    data() {
      return {
        isLoadingButton: false,
        fileName: '', // 上传文件名称
        cropperDialogVisible: false, // 是否打开图片裁剪弹窗
        // 裁剪组件的基础配置option
        option: {
          img: '', // 裁剪图片的地址
          info: false, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'png', // 裁剪生成图片的格式 jpeg、png、webp
          canScale: false, // 图片是否允许滚轮缩放
          fixedBox: false, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: this.fixedNumber, // 截图框的宽高比例
          autoCrop: true, // 是否默认生成截图框
          full: false, // 是否输出原图比例的截图
          canMoveBox: true, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: true, // 截图框是否被限制在图片里面
          infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          high: true,
          size: 1
        },
        previews: {} // 剪切实时预览数据
      }
    },
    /*computed: {
      previewHeight: function () {
        //return (180 * this.fixedNumber[1] / this.fixedNumber[0]) + 'px'}
      }
    },*/
    methods: {
      // 上传按钮   限制图片大小
      changeUpload(file) {
        const suffixs = ['.png', '.jpg', '.gif', '.jepg', '.jpeg'];
        const i = file.name.lastIndexOf('.');
        const suffix = file.name.slice(i);
        if (suffixs.indexOf(suffix) === -1) {
          this.$errorMsg('文件格式错误！');
          return false
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$errorMsg('上传文件大小不能超过 5MB！');
          return false
        }
        this.fileName = file.name;
        // 上传成功后将图片地址赋值给裁剪框显示图片
        this.$nextTick(() => {
          this.option.img = file.url;
          this.cropperDialogVisible = true
        })
      },
      // 点击裁剪，这一步是可以拿到处理后的地址
      finish() {
        this.$refs.cropper.getCropBlob((data) => {
          this.isLoadingButton = true;
          this.$emit('getImage', this.fileName, data, this.previews.url);
          // this.closeUpload()
        })
      },
      // 关闭上传及裁剪
      closeUpload() {
        this.isLoadingButton = false;
        this.option.img = '';
        this.previews = {};
        this.cropperDialogVisible = false;
      },
      // 实时预览函数
      realTime(realTimeData) {
        this.$refs.cropper.getCropData((data) => {
          this.previews = realTimeData;
          this.previews.url = data
        })
      },
      // 图片加载情况
      imgLoad(msg) {
        if (msg !== 'success') {
          this.$errorMsg("图片加载失败！")
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .vueCropper {
    text-align: left;
  }

  // 截图
  .cropper-content {
    .cropper {
      width: calc(100% - 200px);
      height: 340px;
      display: inline-block;
    }
  }

  .show-preview {
    float: right;
    width: 140px;
    display: inline-block;
    position: relative;
    bottom: 5px;
  }

  .picture-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    border: 1px solid #DCDFE6;
  }

  .picture-uploader-icon:hover {
    border-color: #bdc4ce;
  }

  .picture-uploader-icon:active {
    border-color: #409EFF;
  }

  .picture-cropper {
    display: block;
    border: 1px solid #DCDFE6;
    padding: 4px;
  }
</style>
