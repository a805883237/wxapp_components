/**
 * 日期格式转换 ：end_date.replace(/-/g, "/")
 ps : 日期中间的连接符必须是 / 。如果是别的 不支持转换
 * 使用方法: 一个页面有两个以上的 倒计时：
 开始使用：
 <text class="countdown"> {{state.other_state.clock}}</text>
 控制样式：
 .countdown{} 输入样式即可
 js:
 引入：
 var countdown = require('../../utils/countdown/countdown.js');
 使用，开始计时：
 countdown.countdowns(this,{
    now_micro_second: new Date("2018/03/28 18:00:00").getTime() - new Date().getTime(),
    format:"DD:HH:mm:ss"
  },"limit_discount_count");
 切记 一定要 清楚
 onUnload(){
    countdown.close(this)
 }
 * 使用： 
   xml :
    引入
      <import src="../../utils/countdown/countdown.wxml" />
    开始使用：
      <template is="countdown" data="{{clock:state.countdownData.clock}}"/>
      控制样式： 
      .countdown{} 输入样式即可
    js:
      引入：
        var countdown = require('../../utils/countdown/countdown.js');
      使用，开始计时：
      countdown.countdown(this,{
        now_micro_second: new Date("2018/03/28 18:00:00").getTime() - new Date().getTime(),
        format:"DD:HH:mm:ss"
      });
 切记 一定要 清除
     onUnload(){
      countdown.close(this)
    }

 */


/**
 * 秒级倒计时
 * @param page , 通常是this
 * @param data ,
     {
     //ios的new Date("2018/03/28 18:00:00")必须是这样的格式，在小程序里面预览正确，如果new Date("2018-03-28 18:00:00")ios预览出现NaN
       now_micro_second: new Date("2018/03/28 18:00:00").getTime() - new Date().getTime(),
       format:"DD:HH:mm:ss"
      }

 * @param state , 要改变的state 名称 ，调用 this.state.other_state[state]
 */
export function countdown(page, data ,state , show_label = false) {
  if(data=== 'stop')return;
  // 如果延时没有设置， 默认设为 1000
  if(!data.interval) data.interval = 1000
  if (data.now_micro_second <= 0) {

    // data.clock = dateformat(data.now_micro_second, data.format , show_label);
    data.clock = dateformat(data.now_micro_second, data.format ,show_label);
    data.isClocking = false;
    // 复原时间
    if(state){
      let other_state ={};
      other_state[state] = data
      page.setState({
        other_state
      });
    }else{
      page.setState({
        countdownData: data
      });
    }
    // timeout则跳出递归
    return;
  } else {
    // 渲染倒计时时钟
    data.clock = dateformat(data.now_micro_second, data.format,show_label);
    data.isClocking = true;
    if(state){
      let other_state ={};
      other_state[state] = data;
      page.setState({
        other_state
      });
    }else{
      page.setState({
        countdownData: data
      });
    }
  }
  if(state){
    page[`Interval_time_${state}`] = setTimeout(() => {
      // 放在最后--
      data.now_micro_second -= data.interval;
      countdown(page, data, state, show_label);
    }, data.interval);
  }else {
    page.Interval_time = setTimeout(() => {
      // 放在最后--
      data.now_micro_second -= data.interval;
      countdown(page, data, state, show_label);
    }, data.interval);
  }
}

/**
 *  一个页面中  含有多个定时器，并且 延迟时间都是一样的就用这个函数
 * @param page  : this
 * @param datas *array : [ {
            now_micro_second: new Date(item["aply_time"]).getTime() - new Date().getTime(),
            format:"DD:HH:mm:ss"
          }]  // 类似这样的多条数据
 * @param state *array : ["aply_time_1"]  将数据存储到 state.other_state["aply_time_1"] , 数量与 datas 相同
 * @param interval *number : 间隔时间 ,一秒=1000
 * @param show_label *boolean : 显示文字还是显示:
 */
export function countdowns(page, datas=[] ,state=[] , interval = 1000 , show_label = false) {
  // console.log("倒计时，",state,datas)
  let results = datas.map((data,i)=>{
    if (data.now_micro_second <= 0) {
      if (data.isClocking == false)return data ; // 如果第二次进入，就不在进行新一轮的赋值，直接返回，保持原有样式
      data.clock = dateformat(data.now_micro_second, data.format ,show_label);
      data.isClocking = false;
      // 复原时间
      let other_state ={};
      other_state[state[i]] = data
      // timeout则跳出递归
      return other_state;
    } else {
      // 渲染倒计时时钟
      data.clock = dateformat(data.now_micro_second, data.format,show_label);
      data.isClocking = true;
      let other_state ={};
      other_state[state[i]] = data;
      return other_state;
    }
  });
  // 设置state
  page.setState({
    other_state: Object.assign({},...results)
  });
  // 渲染新的计时器
  page.Interval_time = setTimeout(() => {
    datas.map((data)=>data.now_micro_second -= interval);
    countdowns(page, datas, state,1000, show_label);
  }, interval);
}

/** 时间格式化输出，如60。每1000ms都会调用一次
 * 
 * @param micro_second   剩余时间
 * @param str_format 输出格式
     DD:HH:mm:ss： 输出内容： 天 时分秒
     H:m:s ms： 输出内容： 时分秒 毫秒
     H:m:s： 输出内容： 时分秒
     m:s ms： 输出内容： 分秒 毫秒
     m:s： 输出内容： 分秒
     s ms： 输出内容： 秒 毫秒
     s： 输出内容： 秒
 * @returns {*}
 */
export function dateformat(micro_second, str_format = "DD:HH:mm:ss" ,show_label) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 10);


  var result;
  switch (str_format) {
    case 'DD:HH:mm:ss':
      // 总秒数
      // 天数
      var day = leadingZeros(Math.floor(second/3600/24));
      // 小时
      var hr = leadingZeros(Math.floor(second/3600%24));
      // 分钟
      var min = leadingZeros(Math.floor(second/60%60));
      // 秒
      var sec = leadingZeros(Math.floor(second%60));
      result = (day || "00") + "天 " + (hr || "00") + " : " + (min || "00") + " : " + (sec || "00");
      if(show_label) result = (day || "00") + "天 " + (hr || "00") + "时" + (min || "00") + "分" + (sec || "00")+ "秒 ";
      break;
    case 'H:m:s ms':
      // 小时位
      var hr = Math.floor(second / 3600);
      // 分钟位
      var min = Math.floor((second - hr * 3600) / 60);
      // 秒位
      var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
      result = (hr || "00") + ':'+ (min || "00") + ':' + (sec || "00") + " " + (micro_sec || "00");
      if(show_label) result = (hr || "00") + '时'+ (min || "00") + '分' + (sec || "00") + "秒" + (micro_sec || "00") + "毫秒 ";
      break;
    case 'H:m:s':
      // 小时位
      var hr = Math.floor(second / 3600);
      // 分钟位
      var min = Math.floor((second - hr * 3600) / 60);
      // 秒位
      var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
      result = (hr || "00") + ':' + (min || "00") + ':' + (sec || "00") ;
      if(show_label) result = (hr || "00") + '时' + (min || "00") + '分' + (sec || "00") + "秒 ";
      break;
    case 'm:s ms':
      // 分钟位
      var min = Math.floor(second  / 60);
      // 秒位
      var sec = (second - min * 60);// equal to => var sec = second % 60;

      result = (min || "00") + ':' + (sec || "00") + " " + (micro_sec || "00");
      if(show_label) result = (min || "00") + '分' + (sec || "00") + "秒 " + (micro_sec || "00") +"毫秒 ";
      break;
    case 'm:s':
      // 分钟位
      var min = Math.floor(second / 60);
      // 秒位
      var sec = (second - min * 60);// equal to => var sec = second % 60;

      result = (min || "00") + ':' + (sec || "00");
      if(show_label) result = (min || "00") + '分' + (sec || "秒");
      break;
    case 's ms':
      result = (second || "00") + ':' + (micro_sec || "00");
      if(show_label) result = (second || "00") + '秒' + (micro_sec || "00") + "毫秒 ";
      break;
    case 's':
      result = (second || "00");
      if(show_label) result = (second || "00") + "秒";
      break;
  }

  return result;
}

export function leadingZeros(num, length = null) {

  let length_ = length;
  let num_ = num;
  if (length_ === null) {
    length_ = 2;
  }
  num_ = String(num_);
  while (num_.length < length_) {
    num_ = '0' + num_;
  }
  if(num<=0)num_ = "00"; // 已经结束的返回 00
  return num_;
}
