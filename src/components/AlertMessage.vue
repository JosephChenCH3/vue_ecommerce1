<template>
  <div class="message-alert">
<!--     <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i"> -->
    <div class="alert alert-dismissible shadow-sm"
      :class="[{'alert-success' : item.status == 'success'},{'alert-danger' : item.status == 'danger'},{'alert-warning' : item.status == 'warning'}]"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 3000);
    },
  },
  created() {
    const vm = this;
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
    // vm.$bus.$emit('message:push');
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  min-width: 10%;
/*  top: 56px;*/
  bottom: 10px;
  right: 20px;
  z-index: 1100;
  transition: all 6s cubic-bezier(1, 0.08, 0, 1);
  -webkit-animation: arrowef 12s infinite ease-in-out;
  -moz-animation:arrowef 12s infinite ease-in-out;
  -o-animation: arrowef 12s infinite ease-in-out;
  animation: arrowef 12s infinite ease-in-out;
}

@-webkit-keyframes arrowef {
  0%   {bottom: 10px;}
  100% {bottom: 150px;}
}
@-moz-keyframes arrowef {
  0%   {bottom: 10px;}
  100% {bottom: 150px;}
}
@-o-keyframes arrowef {
  0%   {bottom: 10px;}
  100% {bottom: 150px;}
}
@keyframes arrowef {
  0%   {bottom: 10px;}
  100% {bottom: 150px;}
}

.alert-success {
  color: #444;
/*  background-color: #d4edda;*/
  border-color: #999;
  background: white \9;
  filter: alpha(opacity=65) \9;
  background-color: rgba(239, 235, 230, .65);
/*  opacity: 0.65 !important;*/
}
.alert-danger {
  color: #fff;
  border-color: #dc3545;
  background: white \9;
  filter: alpha(opacity=65) \9;
  background-color: rgba(220, 53, 69, .65);
/*  opacity: 0.65 !important;*/
}
.alert-warning {
  color: #444;
  border-color: #ffc107;
  background: white \9;
  filter: alpha(opacity=65) \9;
  background-color: rgba(255, 193, 7, .65);
/*  opacity: 0.65 !important;*/
}
/*.message-move {
  bottom: 156px;
}*/
</style>