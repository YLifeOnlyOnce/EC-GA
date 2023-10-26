/*
 * @Author: yaoyaoyu
 * @Date: 2021-10-07 16:43:21
 */

/**
 * 获取指定范围内的随机数
 * @param start 起点
 * @param end 终点
 * @returns {number}
 */
 function random(start, end){
  var length = end-start+1;
  return Math.floor(Math.random() * length + start);
}

/**
 * @name: popmin
 * @msg: pop最小值
 * @param {*} arr
 * @return {*}
 */
function popmin(arr){
  let result = 0;
  let rindex = 0;
  arr.forEach((item, index) => {
    if(item <= result){
      result = item
      rindex = index
    }
  });
  arr.splice(index,1);
  return {result,arr};
}
function popminIndex(arr){
  let result = 0;
  let rindex = -1;
  arr.forEach((item, index) => {
    if(item <= result){
      result = item
      rindex = index
    }
  });
  return rindex
}