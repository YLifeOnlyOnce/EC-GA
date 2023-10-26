/*
 * @Author: yaoyaoyu
 * @Date: 2021-10-07 11:07:11
 */

let tasks = [{
  name:'123',
  id:'1',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[1,2,3]
},
{
  name:'123',
  id:'2',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[2,3]
},
{
  name:'123',
  id:'3',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[2,5]
},
{
  name:'123',
  id:'4',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[1,4]
},
{
  name:'123',
  id:'5',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[2,5]
},
{
  name:'123',
  id:'6',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,2]
},
{
  name:'123',
  id:'7',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[3,4]
},
{
  name:'123',
  id:'8',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[1,5]
},
{
  name:'123',
  id:'9',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[3,5]
},
{
  name:'123',
  id:'10',
  calculated_size : 1024,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow :[2,4]
},
]

let edgeNodes = [
  {
    Total_computing_capacity:15000,
    computing_capacity:0,
  },
  {
    Total_computing_capacity:15000,
    computing_capacity:0,
  },
  {
    Total_computing_capacity:15000,
    computing_capacity:0,
  },
  {
    Total_computing_capacity:15000,
    computing_capacity:0,
  },
  {
    Total_computing_capacity:15000,
    computing_capacity:0,
  },
  {
    Total_computing_capacity:15000,
    computing_capacity:0,
  },
]

const DNA_SIZE = 10
const POP_SIZE = 100
const CROSS_RATE = 0.8 
const MUTATION_TATE = 0.003
const N_Generation = 200

const TASK_NUM = 10;

const LAMDA= 100;
const P_idle = 50;
const P_SLEEP = 10;


function initDNA(){
  // [1,2,3,...,n,10,20,...,m]

}

/**
 * @name: F
 * @msg: 目标函数计算
 * @param {*} params
 * @return {*}
 */

function F(params){
  // 参数 i 和 j 都要能拿到， fij也要
  // F的结果，即能耗总值
  let result = 0;
  let allocation = params.slice(0,TASK_NUM);
  let comres = params.slice(TASK_NUM);
  
  // 筛选各个服务器的任务。
  let site_task_map = {}
  for(let i = 0; i < TASK_NUM ; i++){
    if(site_task_map[allocation[i]]){
      site_task_map[allocation[i]].push({tasksIndex:i,comres:comres[i],taskcomtime:tasks[i].calculated_size/comres[i]});
      edgeNodes[allocation[i]].computing_capacity += comres[i]; //剩余计算能力控制
    }else{
      site_task_map[allocation[i]] = [{tasksIndex:i,comres:comres[i],taskcomtime:tasks[i].calculated_size/comres[i]}];
      edgeNodes[allocation[i]].computing_capacity += comres[i]; //剩余计算能力控制
    }
  }
  // 计算最长的任务时间
  let T = 50

  //  遍历所有节点，找到有任务的和没任务的
  for(let i = 0 ; i < edgeNodes.length ; i++ ){
    if(allocation.indexOf(i) == -1){
      // 没任务选
      result += T * P_SLEEP;
      console.log('节点'+i+' 的能耗', T * P_SLEEP);
    }
  }
  // 遍历每一个有任务的node 求各自的E
  Object.keys(site_task_map).forEach(nodeIndex => {
    console.log('-------------------'+'节点'+nodeIndex+'开始计算'+'------------------');
    // 当前边缘节点中的任务
    let thisTasks = site_task_map[nodeIndex];
    // 执行时间列表
    let TaskComTimeList = [];
    // 初始化当前节点能耗
    let E = 0;
    for(let i = 0 ; i < thisTasks.length ; i++){
      TaskComTimeList.push(thisTasks[i].taskcomtime);
    }
    console.log('时间开销 :>> ', TaskComTimeList);
    // 计算有任务时的能耗
    let maxRunningTime = 0;//记录最大执行时间。
    while(thisTasks.length!==0 ){
      // 找最小的时间开始计算。
      let minIndex = popminIndex(TaskComTimeList);
      // 当前时间
      let t = TaskComTimeList[minIndex];
      // 更新最大执行时间
      if(t > maxRunningTime){
        maxRunningTime = t;
      }
      // 当前选出来的任务分配的对应的计算资源。
      let f = thisTasks[minIndex].comres
      console.log('f :>> ', f);
      // 当前节点的负载量
      if(edgeNodes[nodeIndex].computing_capacity!== 0 ){
        // 当有负载时
        console.log('当前cpu占用 :>> ', edgeNodes[nodeIndex].computing_capacity );
        console.log('功率： ', (LAMDA * (edgeNodes[nodeIndex].computing_capacity / edgeNodes[nodeIndex].Total_computing_capacity)) );
        E +=  t * ( LAMDA* (edgeNodes[nodeIndex].computing_capacity / edgeNodes[nodeIndex].Total_computing_capacity) + P_idle)
        edgeNodes[nodeIndex].computing_capacity -= f ;
      }

      TaskComTimeList.splice(minIndex,1);
      thisTasks.splice(minIndex,1);
    }
    // 计算没有任务时的能耗
    result += (E + ((T-maxRunningTime) * P_SLEEP))
    console.log('节点： '+nodeIndex+' 的能耗 :'+(E + ((T-maxRunningTime) * P_SLEEP)))
  })

  return result;
}


function popminIndex(arrs){
  let result = 0;
  let rindex = 0;
  arrs.forEach((item,index) => {
    if(item < result){
      result = item
      rindex = index
    }
  })
  return rindex;
}

function getFitness(pred){
  F(pred);
}

/**
 * @name: make_kid
 * @msg: make_kids
 * @param {*}
 * @return {*}
 */
function make_kid(params,N_KID){
  /* 
    因为是两段不同的数据，
    这里在进行translate基因型的时候是不是
    可以一段用二进制，一段用十进制
    二进制段用轮盘赌
  */
  
}

let params = [1,2,3,4,5,2,3,4,2,2,3210,424,522,323,53,535,632,215,31,52];
let res = F(params);
console.log('res :>> ', res);