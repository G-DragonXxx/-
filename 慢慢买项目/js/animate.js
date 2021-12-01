function animate(el, target) {

    if (el.timer) {
        clearInterval(el.timer)
    }

    // el 需要进行动画的元素
    //获取初始的leader(获取盒子当前的初始位置)
    let leader = el.scrollTop;
    //设定一个步数,step必须具备正负值,什么时候是正值,什么时候是负值?
    // target = 200
    // leader = 400
    // step = -10
    let step = 50.123123123213;
    step = leader > target ? -step : step
    el.timer = setInterval(function () {
        // console.log(12);
        if (Math.abs(target - leader) > Math.abs(step)) {
            //没有到达目标的时候
            leader += step;
            //将leader的结果设定给盒子的left属性
            el.scrollTop = leader
        } else {
            //如果有小数点,会造成一个结果,盒子停不下来

            //更改判定条件 判断|target-leader|>|step|

            //手动将盒子位置设定到目标位置

            el.scrollTop = target

            //清空定时器
            clearInterval(el.timer)
        }
    }, 15)
}