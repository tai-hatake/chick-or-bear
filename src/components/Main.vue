<template>
  <div class="main_p">
<!--     <v-btn
      class="mx-0 sample-btn"
      color="primary"
      @click.native="dialog2 = true"
    >
      サンプル画像で試す！
    </v-btn>
 -->    <div>
      <label id="result" for="file_img" class="upload-wrapper">
        +
        <input id="file_img" class="img" @change="selectedFile" type="file" name="file" required>
      </label>
    </div>
    <v-btn class="detect-btn" :loading="dialog" :disabled="dialog" @click.native="dialog = true" type="submit">
      判定
    </v-btn>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        class="loading"
        color="primary"
        dark
      >
        <v-card-text class="loading-text">
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="alert-wrapper">
      <v-alert
        class="chick"
        :value="chick"
        color="success"
        icon="check_circle"
        transition="scale-transition"
      >you are chick.</v-alert>

      <v-alert
        class="bear"
        :value="bear"
        color="info"
        icon="info"
        transition="scale-transition"
      >you are bear.
      </v-alert>
      <v-alert
        class="error"
        :value="error"
        color="error"
        icon="warning"
        transition="scale-transition"
      >
        This is a error alert.
      </v-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default {
  name: 'main_p',
  components: {
  },
  data () {
    return {
      dialog: false,
      dialog2: false,
      chick: false,
      bear: false,
      error: false,
      result: undefined,
      alertMsg: 'ファイルを選択してください！',
      uploadFile: undefined
    }
  },
  watch: {
    async dialog (val) {
      if (!val) return
      this.dialog = await this.upload()
    },
    async dialog2 (val) {
      if (!val) return
      this.dialog = await this.sampleapi()
    }
  },
  methods: {
    valid () {
      if (!this.uploadFile) {
        return true
      }
    },
    async sampleapi () {
      axios
        .get('https://chickorbear.appspot.com/image')
        .then((response) => {
          // response 処理
          this.detect_chick_or_bear(response.data.body)
          console.dir(response)
        })
        .catch(error => {
          this.error = true
          console.dir(error)
        })
    },
    selectedFile (e) {
      // 選択された File の情報を保存しておく
      e.preventDefault()
      let files = e.target.files
      this.uploadFile = files[0]
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
    async upload () {
      this.chick = false
      this.bear = false
      this.error = false
      if (this.valid()) {
        return false
      }
      let formData = new FormData()
      console.dir(this.uploadFile)
      formData.append('img', this.uploadFile)

      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      config.headers['X-HTTP-Method-Override'] = 'PUT'

      await axios
        // .post('http://127.0.0.1:8080/upload', formData, config)
        .post('https://chickorbear.appspot.com/upload', formData, config)
        .then((response) => {
          // response 処理
          console.dir(response)
          this.detect_chick_or_bear(response.data.body)
          return false
        })
        .catch(error => {
          console.dir(error)
          this.error = true
          return false
        })
    },
    detect_chick_or_bear (val) {
      if (val === 'pato') {
        this.chick = true
      } else if (val === 'paddy') {
        this.bear = true
      }
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
.detect-btn {
  margin-top: 12px;
  border-radius: 24px;
  background-color: rgb(164, 84, 30);
  color: white;
  height: 46px;
  width: 224px;
  font-weight: 600;
  font-size: 16px;
}
.loading-text {
  color: white;
}
.loading {
  background-color: #328a19 !important;
  border-color: #328a19 !important;
}
.alert-wrapper {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.chick {
  text-align: left;
  background-color: #ffc107 !important;
}
.bear {
  text-align: left;
  background-color: #2196f3 !important;
}
.error {
  text-align: left;
  background-color: #ff5252 !important;
}

</style>
