import Vue from 'vue'
import Modal from '../../src/components/Modal/'

describe('Modal', () => {
  let vm = new Vue({
    data () {
      return {
        show: true,
        modalCallback: sinon.spy()
      }
    },
    template: `
      <div>
        <modal title="Zoom Modal" :show.sync="show" effect="zoom" width="400px" :callback="modalCallback">
          <div slot="modal-header"></div>
          <div slot="modal-body" class="modal-body">
            高圆圆，中国女演员，1979年10月5日出生于北京市丰台区云岗一个普通的知识分子家庭。1996年高圆圆被广告公司发掘，随后拍摄了大量广告，成为了广告圈中的模特。1997年高圆圆出演了她的第一部电影《爱情麻辣烫》，从此开始了她的演员生涯。2001年高圆圆参演的电影《十七岁的单车》获得柏林国际电影节最佳影片银熊奖。
          </div>
        </modal>
        <modal title="modal2" :show.sync="show" width="400px" backdrop :callback="modalCallback">
          <div slot="modal-header"></div>
          <div slot="modal-body" class="modal-body">
            This is modal2 body content
          </div>
        </modal>
      </div>
      `,
    components: {Modal}
  }).$mount().$appendTo('body')
  it('Modal组件是否正常显示', () => {
    expect(document.body.querySelectorAll('.atui-modal').length).to.equal(2)
  })

  it('close方法调用', () => {
    vm.$children[0].show = true
    vm.$children[0].close()
    expect(vm.$children[0].show).to.false
  })

  it('clickBack方法调用', () => {
    // For backdrop prop set
    vm.$children[1].show = true
    vm.$children[1].clickBack()
    expect(vm.$children[1].show).to.false

    // For backdrop prop not set
    vm.$children[0].show = true
    vm.$children[0].clickBack()
    expect(vm.$children[0].show).to.true
  })

  it('确定按键点击回调方法', () => {
    let event = new MouseEvent('click')
    let $btn = document.body.querySelectorAll('.btn-default')[0]
    $btn.dispatchEvent(event)
    vm.modalCallback.should.be.calledOn($btn)
  })
})
