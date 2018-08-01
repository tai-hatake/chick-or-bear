<template>
  <div class="hello">
    <h2>{{ msg1 }}</h2>
    <h2>{{ msg2 }}</h2>
    <div>
      <label id="result" for="file_img" class="upload-wrapper">
        +
        <input id="file_img" class="img" @change="selectedFile" type="file" name="file">
      </label>
    </div>
    <button @click="upload" type="submit">判定</button>

    <div>
      <rotate-square2  v-if="isShow > 1"></rotate-square2>
    </div>
    <div>あなたは、{{ isShow }}です</div>
    <button @click="showloading" type="submit">表示</button>

  </div>
</template>

<script>
import axios from 'axios'
import { RotateSquare2 } from 'vue-loading-spinner'

export default {
  components: {
    RotateSquare2
  },
  name: 'hello',
  data () {
    return {
      msg1: '正面向きの画像を',
      msg2: 'アップロードしてください！',
      isImg: undefined,
      isShow: 0,
      result: undefined,
      alertMsg: 'ファイルを選択してください！',
      uploadFile: undefined
    }
  },
  methods: {
    showloading: () => {
      if (this.isShow > 0) {
        this.isShow = 0
      } else {
        this.isShow = 1
      }
    },
    selectedFile: (e) => {
      // 選択された File の情報を保存しておく
      e.preventDefault()
      let files = e.target.files
      this.uploadFile = files[0]
      this.isImg = true
      const reader = new FileReader()
      // ファイル読み込みに成功したときの処理
      reader.onload = () => {
        let img = document.createElement('img')
        img.src = reader.result
        let result = document.getElementById('result')
        result.appendChild(img)
      }
      reader.readAsDataURL(this.uploadFile)
    },
    upload: () => {
      this.isShow = true
      if (this.uploadFile === undefined) {
        this.isImg = false
        return
      }
      let formData = new FormData()
      formData.append('img', this.uploadFile)

      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      config.headers['X-HTTP-Method-Override'] = 'PUT'

      axios
        // .post('http://127.0.0.1:8080/upload', formData, config)
        .post('https://chickorbear.appspot.com/upload', formData, config)
        .then((response) => {
          // response 処理
          console.dir(response)
          this.result = response.data.body
          this.isShow = false
        })
        .catch((error) => {
          this.isShow = false
          // error 処理
          alert(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h2 {
  margin: 0;
}
.upload-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
  border: 4px solid #9aa5a7;
  margin: 12px auto;
  height: 240px;
  width: 240px;
  border-radius: 16px;
  font-size: 54px;
  font-weight: bold;
  color: #9aa5a7;
}
img {
  position: absolute;
  object-fit: cover;
  border: 4px solid #9aa5a7;
  height: 240px;
  width: 240px;
  border-radius: 16px;
}
.img {
  display: none;
}
button {
  margin-top: 12px;
  border-radius: 24px;
  background-color: rgb(164, 84, 30);
  border-bottom: 2px solid rgb(103, 77, 17);
  color: white;
  height: 46px;
  width: 224px;
  font-weight: 600;
  font-size: 16px;
}
</style>
