<template>
<div class="login">
  <x-icon type="ios-information-outline"></x-icon>
  <span class='myName'>输入你的名字</span>
  <x-input v-model.trim="yourname" class='nameInput' autofocus  @on-enter='submitName'></x-input>
  <x-button type="primary" action-type="button" @click.native='submitName'>登录</x-button>
</div>
</template>

<script>
//mapActions
import {mapGetters} from 'vuex'
import {
  XButton,
  Cell,
  XInput
} from 'vux'
export default {
  components: {
    XButton,
    Cell,
    XInput
  },
  name: 'login',
  data() {
    return {
      yourname:""
    }
  },
  computed:{
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    // ...mapActions([
    //
    // ]),
    submitName() {
      this.$store.state.name=this.yourname;
      localStorage.setItem('name',this.yourname)
      setTimeout(()=>{
        this.$router.push({
          path:"/chat"
        })
      },30)
    }
  }
}
</script>
<style scoped rel='stylesheet/stylus' lang='stylus'>
.login
  width 100%
  height 100%
  background-color rgba(0,0,0,0.8)
  color #fff
  box-sizing border-box
  padding 1.5rem
  .vux-x-icon
    fill #fff
    width 35px
    height 35px
    margin-right 1rem
    float right
  .nameInput
    border-color #fff
    margin 2rem 0
    color #fff
    border-bottom 1px solid #fff
  .nameInput:before
    border-top 0
  .myName
    font-size 1.2rem
    display block
    margin-top 30vh
    text-align center
  .weui-btn_primary
    background-color #fff
    color #000

</style>
