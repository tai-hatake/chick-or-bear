<template>
  <div id="app">
    <header>
      <span>Chick Or Bear</span>
    </header>
    <main>
      <v-jumbotron>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3">Welcome!</h3>
              <div class="subheading">
                あなたの画像を判定します！（女性向け）
              </div>

              <div class="subheading">
                正面向きの画像をアップロードしてください！
              </div>

              <v-divider class="my-3"></v-divider>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
  }

}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 20px;
  background-color: #328a19;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
.v-jumbotron {
  height: 180px !important;
}
.sample-btn {
  background-color: #1867c0 !important;
  border-color: #1867c0 !important;
}
</style>
