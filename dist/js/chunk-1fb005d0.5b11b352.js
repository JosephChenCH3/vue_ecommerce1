(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fb005d0"],{"6b6b":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),s("table",{staticClass:"table mt4"},[t._m(0),s("tbody",t._l(t.orderList,(function(e){return s("tr",[s("td",{staticClass:"align-middle text-center"},[s("div",[t._v(t._s(new Date(1e3*e.create_at).toLocaleDateString("zh-TW")))]),s("div",[t._v(t._s(new Date(1e3*e.create_at).toLocaleTimeString("zh-TW")))])]),s("td",{staticClass:"align-middle"},[t._v(t._s(e.user.email))]),s("td",{staticClass:"align-middle"},t._l(e.products,(function(e){return s("div",[t._v(t._s(e.product.title)+" / "+t._s(e.qty)+" 件")])})),0),s("td",{staticClass:"align-middle"},[t._v(t._s(t._f("currency")(e.total))+"元")]),e.is_paid?s("td",{staticClass:"text-success align-middle text-center"},[t._v("已付款")]):s("td",{staticClass:"text-warning align-middle text-center"},[t._v("未付款")]),e.is_process?s("td",{staticClass:"text-success align-middle text-center"},[t._v("已處理寄送")]):s("td",{staticClass:"text-warning align-middle text-center"},[t._v("尚未處理")]),s("td",{staticClass:"align-middle text-center"},[s("button",{staticClass:"btn btn-secondary btn-sm",on:{click:function(s){return t.openOrderListModal(e)}}},["orderListLoading"==t.status.loading?s("i",{staticClass:"fas fa-spinner fa-pulse"}):t._e(),t._v("\n                        \t編輯\n                        ")])])])})),0)]),s("Pagecomponent",{attrs:{content:t.pagenation},on:{getPagenationOut:t.getOrderList}}),s("div",{staticClass:"modal fade",attrs:{id:"orderListModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[s("div",{staticClass:"modal-content border-0"},[t._m(1),s("div",{staticClass:"modal-body"},[s("h6",{staticClass:"text-primary"},[t._v("訂單明細")]),s("div",[t._v("訂單編號："+t._s(t.editOrderList.id)+" ")]),s("div",[t._v("訂單日期："+t._s(new Date(1e3*t.editOrderList.create_at).toLocaleDateString("zh-TW"))+"\n                            "+t._s(new Date(1e3*t.editOrderList.create_at).toLocaleTimeString("zh-TW"))+"\n                        ")]),s("div",[t._v("金　　額："+t._s(t._f("currency")(t.editOrderList.total))+" 元")]),s("div",{staticClass:"row col-12  align-middle"},[s("div",{staticClass:"align-middle",staticStyle:{"line-height":"24px"}},[t._v("處理狀態：")]),s("div",{staticClass:"custom-control custom-switch"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editOrderList.is_process,expression:"editOrderList.is_process"}],staticClass:"custom-control-input align-middle",attrs:{type:"checkbox",id:"is_process","true-value":!0,"false-value":!1},domProps:{checked:Array.isArray(t.editOrderList.is_process)?t._i(t.editOrderList.is_process,null)>-1:t.editOrderList.is_process},on:{change:function(e){var s=t.editOrderList.is_process,i=e.target,a=!!i.checked;if(Array.isArray(s)){var r=null,d=t._i(s,r);i.checked?d<0&&t.$set(t.editOrderList,"is_process",s.concat([r])):d>-1&&t.$set(t.editOrderList,"is_process",s.slice(0,d).concat(s.slice(d+1)))}else t.$set(t.editOrderList,"is_process",a)}}}),s("label",{staticClass:"custom-control-label",attrs:{for:"is_process"}})])]),s("hr"),s("h6",{staticClass:"text-primary"},[t._v("購買明細")]),s("div",{staticClass:"container"},[s("table",{staticClass:"table"},[t._m(2),s("tbody",t._l(t.editOrderList.products,(function(e){return s("tr",[s("td",[t._v(t._s(e.product.title))]),s("td",[t._v(t._s(e.qty)+" / 件")]),s("td")])})),0)])]),s("hr"),s("h6",{staticClass:"text-primary"},[t._v("付款明細")]),t.editOrderList.is_paid?s("div",{staticClass:"text-success"},[t._v("付款狀況：已付款")]):s("div",{staticClass:"text-warning"},[t._v("付款狀況：未付款")]),t.editOrderList.is_paid?s("div",{staticClass:"text-success"},[t._v("\n                            付款日期："+t._s(new Date(1e3*t.editOrderList.paid_date).toLocaleDateString("zh-TW"))+"\n                             "+t._s(new Date(1e3*t.editOrderList.paid_date).toLocaleTimeString("zh-TW"))+"\n                        ")]):t._e(),s("div",{staticClass:"custom-control custom-radio custom-control-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editOrderList.user.payment_method,expression:"editOrderList.user.payment_method"}],staticClass:"custom-control-input",attrs:{type:"radio",id:"radio1",value:"刷卡"},domProps:{checked:t._q(t.editOrderList.user.payment_method,"刷卡")},on:{change:function(e){return t.$set(t.editOrderList.user,"payment_method","刷卡")}}}),s("label",{staticClass:"custom-control-label align-middle",attrs:{for:"radio1"}},[t._v("刷卡")])]),s("div",{staticClass:"custom-control custom-radio custom-control-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editOrderList.user.payment_method,expression:"editOrderList.user.payment_method"}],staticClass:"custom-control-input",attrs:{type:"radio",id:"radio2",value:"超商取貨"},domProps:{checked:t._q(t.editOrderList.user.payment_method,"超商取貨")},on:{change:function(e){return t.$set(t.editOrderList.user,"payment_method","超商取貨")}}}),s("label",{staticClass:"custom-control-label align-middle",attrs:{for:"radio2"}},[t._v("超商取貨")])]),s("div",{staticClass:"custom-control custom-radio custom-control-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editOrderList.user.payment_method,expression:"editOrderList.user.payment_method"}],staticClass:"custom-control-input",attrs:{type:"radio",id:"radio3",value:"貨到付款"},domProps:{checked:t._q(t.editOrderList.user.payment_method,"貨到付款")},on:{change:function(e){return t.$set(t.editOrderList.user,"payment_method","貨到付款")}}}),s("label",{staticClass:"custom-control-label align-middle",attrs:{for:"radio3"}},[t._v("貨到付款")])]),s("div",{staticClass:"row col-12  align-middle"},[s("div",{staticClass:"align-middle",staticStyle:{"line-height":"24px"}},[t._v("變更付款狀態：")]),s("div",{staticClass:"custom-control custom-switch"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editOrderList.is_paid,expression:"editOrderList.is_paid"}],staticClass:"custom-control-input align-middle",attrs:{type:"checkbox",id:"is_paid","true-value":!0,"false-value":!1},domProps:{checked:Array.isArray(t.editOrderList.is_paid)?t._i(t.editOrderList.is_paid,null)>-1:t.editOrderList.is_paid},on:{change:[function(e){var s=t.editOrderList.is_paid,i=e.target,a=!!i.checked;if(Array.isArray(s)){var r=null,d=t._i(s,r);i.checked?d<0&&t.$set(t.editOrderList,"is_paid",s.concat([r])):d>-1&&t.$set(t.editOrderList,"is_paid",s.slice(0,d).concat(s.slice(d+1)))}else t.$set(t.editOrderList,"is_paid",a)},t.changePaid]}}),s("label",{staticClass:"custom-control-label",attrs:{for:"is_paid"}})])]),s("hr"),s("h6",{staticClass:"text-primary"},[t._v("訂購人明細")]),s("div",[t._v(t._s(t.editOrderList.user.address))]),s("div",[t._v(t._s(t.editOrderList.user.email))]),s("div",[t._v(t._s(t.editOrderList.user.name))]),s("div",[t._v(t._s(t.editOrderList.user.tel))])]),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(e){return e.preventDefault(),t.resetPaidStatus(e)}}},[t._v("取消")]),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.updateOrderList(e)}}},[t._v("確認")])])])])])],1)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("td",{staticClass:"text-center",attrs:{width:"130"}},[t._v("時間 / 時間")]),s("td",{staticClass:"text-center",attrs:{width:"250"}},[t._v("訂購帳號")]),s("td",{staticClass:"text-center"},[t._v("品項")]),s("td",{attrs:{width:"100"}},[t._v("總金額")]),s("td",{staticClass:"text-center",attrs:{width:"120"}},[t._v("付款狀態")]),s("td",{staticClass:"text-center",attrs:{width:"160"}},[t._v("處理狀態")]),s("td",{staticClass:"text-center",attrs:{width:"100"}},[t._v("編輯")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal-header bg-dark text-white"},[s("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[s("span",[t._v("訂單資訊")])]),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("td",{attrs:{width:""}},[t._v("產品")]),s("td",{attrs:{width:"80px"}},[t._v("數量")]),s("td",{attrs:{width:"80px"}},[t._v("備註")])])])}],r=s("1157"),d=s.n(r),n=s("ecc6"),c={components:{Pagecomponent:n["a"]},data:function(){return{orderList:[],pagenation:{},isLoading:!1,editOrderList:{create_at:"",is_paid:"",is_process:"",message:"",payment_method:"",paid_date:"",products:[],total:"",user:{address:"",email:"",name:"",tel:""}},status:{loading:""},checkPaidDate:"",paidStatus:!1}},methods:{getOrderList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("joseph_work01","/admin/orders?page=").concat(t),s=this;s.isLoading=!0,this.$http.get(e).then((function(t){console.log(t.data),s.isLoading=!1,s.orderList=t.data.orders,s.pagenation=t.data.pagination}))},openOrderListModal:function(t){this.status.loading="orderListLoading";var e=this.orderList.filter((function(e){if(t.id===e.id)return e}));this.editOrderList=e[0],console.log("openOrderList",this.editOrderList),this.checkPaidDate=this.editOrderList.paid_date,this.status.loading="",d()("#orderListModal").modal("show")},changePaid:function(){this.paidStatus=!this.paidStatus,console.log(this.paidStatus),this.paidStatus?this.editOrderList.is_paid?this.editOrderList.paid_date=Date.parse(new Date)/1e3:this.editOrderList.paid_date="":this.editOrderList.paid_date=this.checkPaidDate},resetPaidStatus:function(){this.paidStatus=!1,this.getOrderList(this.pagenation.current_page)},updateOrderList:function(){var t=this,e=this.editOrderList.id,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("joseph_work01","/admin/order/").concat(e),i=this;this.$http.put(s,{data:i.editOrderList}).then((function(e){console.log("updateOrderList",e.data),d()("#orderListModal").modal("hide"),t.getOrderList(i.pagenation.current_page)}))}},created:function(){this.getOrderList()}},o=c,l=s("2877"),u=Object(l["a"])(o,i,a,!1,null,null,null);e["default"]=u.exports},ecc6:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{attrs:{"aria-label":"Page navigation example"}},[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-item",class:{disabled:!t.content.has_pre},on:{click:function(e){return t.getProducts(1)}}},[t._m(0)]),s("li",{staticClass:"page-item",class:{disabled:!t.content.has_pre},on:{click:function(e){return t.getProducts(t.content.current_page-1)}}},[t._m(1)]),t._l(t.content.total_pages,(function(e){return e<t.content.current_page+3&&e>t.content.current_page-3?s("li",{staticClass:"page-item",class:{active:t.content.current_page==e},on:{click:function(s){return t.getProducts(e)}}},[s("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v(t._s(e))])]):t._e()})),s("li",{staticClass:"page-item",class:{disabled:!t.content.has_next},on:{click:function(e){return t.getProducts(t.content.current_page+1)}}},[t._m(2)]),s("li",{staticClass:"page-item",class:{disabled:!t.content.has_next},on:{click:function(e){return t.getProducts(t.content.total_pages)}}},[t._m(3)])],2)])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"}},[s("i",{staticClass:"fas fa-angle-double-left"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"}},[s("i",{staticClass:"fas fa-angle-left"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"}},[s("i",{staticClass:"fas fa-angle-right"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"}},[s("i",{staticClass:"fas fa-angle-double-right"})])}],r={props:["content"],data:function(){return{}},methods:{getProducts:function(t){this.$emit("getPagenationOut",t)}}},d=r,n=s("2877"),c=Object(n["a"])(d,i,a,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-1fb005d0.5b11b352.js.map