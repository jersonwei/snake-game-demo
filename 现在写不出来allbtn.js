
//全局组件的创建
// 第一个参数是组件的名字  第二个参数是options
Vue.component('Vbtn', {
template: `
<!-------------插槽 ，内置组件slot 作为承载分发内容的出口-------->

<button class='default' :class='type'>
    <slot>
    按钮
    </slot>
</button>
`,
props:['type']
})
//内容组件
var Vcontent = {
template: `
<div> 
<Vbtn type ='primary'>菜鸡模式</Vbtn>
<Vbtn type ='success'>中不溜模式</Vbtn>
<Vbtn type ='warning'>还有谁!!</Vbtn>
<Vbtn type ='danger'>再给你一条狗命又如何</Vbtn>
</div>
`,
data() {
return {

}
},
methods: {

},
}

//声子
var App = {
template: `
<div>
    <Vcontent/>    
</div>
`,
//挂子
components: {
Vcontent,
}
}
new Vue({
el: '#app',
data() {
return {
}
},
//挂子
components: {
App
},
template: `
<App></App>
`
})
