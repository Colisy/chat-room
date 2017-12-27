<template>
  <div class="chat">
    <header>
      <span class='chat' @click='$router.push({path:"/AI"})'>AI</span>
      <p>多人聊天室</p>
      <span @click='back'>Back</span>
    </header>
    <div class="content">
      <div class="more-infomation" v-for="(item,index) in msgs" :key="index">
          <div v-if='item.self' class="msgLists self">
              <div class="date">{{item.date}}</div>
              <div class="msg-from">
                <span>{{item.name}}</span>
                <span class='img'>{{item.img}}</span>
              </div>
              <div class="msg-content">{{item.content}}</div>
          </div>
          <div v-else class="msgLists other">
              <div class="date">{{item.date}}</div>
              <div class="msg-from">
                <span class='img'>{{item.img}}</span>
                <span>{{item.name}}</span>
              </div>
              <div class="msg-content">{{item.content}}</div>
          </div>
      </div>
    </div>
    <div class="sendmsg">
      <span @click='showEmoj'></span>
      <div class="emojis" v-if='isShowEmo'>
        <span @click='selectEmoji(item)' v-for='(item,index) in emojis' :key="index">{{item}}</span>
      </div>
      <x-input @on-focus='hideEmoji' v-model.trim="content" class='nameInput' autofocus  @on-enter='submitName' placeholder='请输入...'></x-input>
      <x-button type="primary" action-type="button" @click.native='submitName'>发送</x-button>
    </div>
  </div>
</template>

<script>
import {
  XInput,
  XButton
} from 'vux'
export default {
  components:{
    XInput,
    XButton
  },
  data(){
    return {
      msgs:localStorage.getItem('msgs_group')&&JSON.parse(localStorage.getItem('msgs_group'))||[],
      content:"",
      isShowEmo:false,
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '⚽️', '❤️']
    }
  },
  watch:{
    msgs(val){
      localStorage.setItem("msgs_group",JSON.stringify(val))
    }
  },
  beforeRouteEnter(to,from,next){
    if(!localStorage.getItem('name')){
      next('/')
    }else{
      next()
    }
  },
  mounted(){
    this.oContent = document.querySelector('.content');
    this.oContent.scrollTop = this.oContent.scrollHeight;
    // 监听是否有人在发送信息
    socket.on('receiveGroupMsg',data=>{
      console.log(data)
      this.msgs.push(data)
      setTimeout(()=>{
        this.oContent.scrollTop = this.oContent.scrollHeight;
      },0)
    })
    // 上线提醒消息
    socket.emit('online',this.$store.state.name)
    //监听是否有人上线
    socket.on('online',res=>{
      console.log(res)
      let oOnline = document.createElement('div');
      oOnline.className = 'online';
      oOnline.style='text-align:center;color:#808080;'
      oOnline.innerText = res + '上线了哦~';
      this.oContent.appendChild(oOnline);
      this.oContent.scrollTop = this.oContent.scrollHeight;
    })
  },
  methods:{
    back(){
      localStorage.setItem('name','',-1)
      this.$router.push('/')
    },
    submitName(){
      this.isShowEmo=false
      if(this.content===""){
        return;
      }else{
        socket.emit('sendGroupMsg',{
          date:this.moment().format('YYYY-MM-DD HH:mm:ss'),
          name:localStorage.getItem('name'),
          content:this.content,
          self: false,
          img:'😰'
        });
        //将信息保存在本地
        this.msgs.push({
          date:this.moment().format('YYYY-MM-DD HH:mm:ss'),
          name:localStorage.getItem('name'),
          content:this.content,
          self: true,
          img:'😰'
        })
        //清空聊天窗口
        this.content=''
        // 更新聊天窗口
        this.oContent = document.querySelector('.content');
        this.oContent.scrollTop = this.oContent.scrollHeight;
      }
    },
    showEmoj(){
      this.isShowEmo=!this.isShowEmo
    },
    selectEmoji(item){
      this.content=this.content+item
    },
    hideEmoji(){
      this.isShowEmo=false
    }
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
.chat
  .content
    height 84.5vh
    padding-top 0.1px
    padding-bottom 3rem
    background-color #E5E5E5
    .msgLists
      padding 1rem
      .date
        text-align center
        color #808080
      .msg-from
        span
          display inline-block
          vertical-align middle
        .img
          font-size 1.6rem
      .msg-content
        background #fff
        margin-top .3rem
        width 12rem
        padding 0.6rem
        border-radius 10px
        box-sizing border-box
    .self
      .msg-from
        float right
      .msg-content
        margin-top 2.3rem
        margin-left 8.5rem
  header
    box-sizing border-box
    width 100%
    background #2196F3
    padding 1rem 1rem
    color #fff
    p
      display inline-block
      width 80%
      padding 0
      margin 0
      text-align center
  .sendmsg
    background #E5E5E5
    position fixed
    bottom 0
    left 0
    width 100%
    .nameInput
      width 70%
      height 2.3rem
      padding 0
      background-color #fff
      position absolute
      top 0.4rem
      left 11%
    button
      display inline-block
      float right
      width 15%
      height 2.3rem
      padding 0
      margin 0
      position absolute
      right 0.5rem
      top 0.5rem
    .emojis
      width 100%
      overflow scroll
      height 10rem
      span
        display inline-block
        font-size 2rem
        width 2.7rem
        margin-left 0.5rem
        height 2.7rem
        text-align center
    &>span
      background url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkzMTA5MzY4MTg3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUyMjQwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiAyMC43MjQ4N2MtMjcwLjA0NjYwOSAwLTQ4OS43MzkxMyAyMTkuNjkyNTIyLTQ4OS43MzkxMyA0ODkuNzM5MTMgMCAyNzAuMDQ2NjA5IDIxOS42OTI1MjIgNDg5LjczOTEzIDQ4OS43MzkxMyA0ODkuNzM5MTNzNDg5LjczOTEzLTIxOS42OTI1MjIgNDg5LjczOTEzLTQ4OS43MzkxM0MxMDAxLjczOTEzIDI0MC40MTczOTEgNzgyLjA0NjYwOSAyMC43MjQ4NyA1MTIgMjAuNzI0ODd6TTUxMiA5NTUuNjgxMzkxYy0yNDUuNDkyODcgMC00NDUuMjE3MzkxLTE5OS43MjQ1MjItNDQ1LjIxNzM5MS00NDUuMjE3MzkxIDAtMjQ1LjQ5Mjg3IDE5OS43MjQ1MjItNDQ1LjIxNzM5MSA0NDUuMjE3MzkxLTQ0NS4yMTczOTFzNDQ1LjIxNzM5MSAxOTkuNzI0NTIyIDQ0NS4yMTczOTEgNDQ1LjIxNzM5MUM5NTcuMjE3MzkxIDc1NS45NTY4NyA3NTcuNDkyODcgOTU1LjY4MTM5MSA1MTIgOTU1LjY4MTM5MXoiIHAtaWQ9IjUyMjQxIj48L3BhdGg+PHBhdGggZD0iTTcwNi4xMzcwNDMgMzAwLjA5ODc4M2MtNjcuOTg0Njk2IDAtMTIzLjMwMjk1NyA1OS41MDMzMDQtMTIzLjMwMjk1NyAxMzIuNjUyNTIyIDAgMTIuMjg4IDkuOTcyODcgMjIuMjYwODcgMjIuMjYwODcgMjIuMjYwODdzMjIuMjYwODctOS45NzI4NyAyMi4yNjA4Ny0yMi4yNjA4N2MwLTQ4LjU5NTQ3OCAzNS4zMjgtODguMTMwNzgzIDc4Ljc4MTIxNy04OC4xMzA3ODMgNDMuNDc1NDc4IDAgNzguODQ4IDM5LjUzNTMwNCA3OC44NDggODguMTMwNzgzIDAgMTIuMjg4IDkuOTcyODcgMjIuMjYwODcgMjIuMjYwODcgMjIuMjYwODdzMjIuMjYwODctOS45NzI4NyAyMi4yNjA4Ny0yMi4yNjA4N0M4MjkuNTA2NzgzIDM1OS42MDIwODcgNzc0LjE0NCAzMDAuMDk4NzgzIDcwNi4xMzcwNDMgMzAwLjA5ODc4M3oiIHAtaWQ9IjUyMjQyIj48L3BhdGg+PHBhdGggZD0iTTMyMS42MDI3ODMgMzQ0LjYyMDUyMmM0My40MzA5NTcgMCA3OC43NTg5NTcgMzkuNTM1MzA0IDc4Ljc1ODk1NyA4OC4xMzA3ODMgMCAxMi4yODggOS45NzI4NyAyMi4yNjA4NyAyMi4yNjA4NyAyMi4yNjA4N3MyMi4yNjA4Ny05Ljk3Mjg3IDIyLjI2MDg3LTIyLjI2MDg3YzAtNzMuMTQ5MjE3LTU1LjI5Ni0xMzIuNjUyNTIyLTEyMy4yODA2OTYtMTMyLjY1MjUyMi02OC4wMjkyMTcgMC0xMjMuMzY5NzM5IDU5LjUwMzMwNC0xMjMuMzY5NzM5IDEzMi42NTI1MjIgMCAxMi4yODggOS45NzI4NyAyMi4yNjA4NyAyMi4yNjA4NyAyMi4yNjA4N3MyMi4yNjA4Ny05Ljk3Mjg3IDIyLjI2MDg3LTIyLjI2MDg3QzI0Mi43NTQ3ODMgMzg0LjE1NTgyNiAyNzguMTI3MzA0IDM0NC42MjA1MjIgMzIxLjYwMjc4MyAzNDQuNjIwNTIyeiIgcC1pZD0iNTIyNDMiPjwvcGF0aD48cGF0aCBkPSJNNzUwLjMwMjYwOSA2MTYuNDcwMjYxYy0xMS4zNTMwNDMtNC42NzQ3ODMtMjQuMzc1NjUyIDAuODAxMzkxLTI5LjAyODE3NCAxMi4xOTg5NTctMzguNDY2NzgzIDk0LjIzMDI2MS0xMjAuNjA5MzkxIDE1NS4xMTM3MzktMjA5LjI3NDQzNSAxNTUuMTEzNzM5cy0xNzAuODA3NjUyLTYwLjg4MzQ3OC0yMDkuMjc0NDM1LTE1NS4xMTM3MzljLTQuNjMwMjYxLTExLjM3NTMwNC0xNy42NTI4Ny0xNi44OTYtMjkuMDI4MTc0LTEyLjE5ODk1Ny0xMS4zNzUzMDQgNC42MzAyNjEtMTYuODUxNDc4IDE3LjYzMDYwOS0xMi4xOTg5NTcgMjkuMDI4MTc0QzMwNi44MjE1NjUgNzU2LjUzNTY1MiA0MDUuMTQ3ODI2IDgyOC4yODI0MzUgNTEyIDgyOC4yODI0MzVzMjA1LjE3ODQzNS03MS43NDY3ODMgMjUwLjUwMTU2NS0xODIuODA2MjYxQzc2Ny4xNTQwODcgNjM0LjEwMDg3IDc2MS42Nzc5MTMgNjIxLjEwMDUyMiA3NTAuMzAyNjA5IDYxNi40NzAyNjF6IiBwLWlkPSI1MjI0NCI+PC9wYXRoPjwvc3ZnPg==") no-repeat center center
      display inline-block
      width 10%
      height 3rem
      background-size 30px 30px
</style>
