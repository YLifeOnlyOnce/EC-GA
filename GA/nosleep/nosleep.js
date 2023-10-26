/*
 * @Author: yaoyaoyu
 * @Date: 2021-10-15 20:33:48
 */


/*
 * @Author: yaoyaoyu
 * @Date: 2021-10-08 14:23:17
 */


let tasks = [
  {
    name:'123',
    id:'15',
    calculated_size : 19000,
    Transform_size : 1024,
    createTime : new Date,
    deadline : new Date() + 10,
    allow:[0,1,2,3]
  },
  {
    name:'123',
    id:'14',
    calculated_size : 19000,
    Transform_size : 1024,
    createTime : new Date,
    deadline : new Date() + 10,
    allow:[0,1,2,3]
  },
  {
    name:'123',
    id:'13',
    calculated_size : 19000,
    Transform_size : 1024,
    createTime : new Date,
    deadline : new Date() + 10,
    allow:[0,1,2,3]
  },
  {
    name:'123',
    id:'12',
    calculated_size : 19000,
    Transform_size : 1024,
    createTime : new Date,
    deadline : new Date() + 10,
    allow:[0,1,2,3]
  },
  {
    name:'123',
    id:'11',
    calculated_size : 19000,
    Transform_size : 1024,
    createTime : new Date,
    deadline : new Date() + 10,
    allow:[0,1,2,3]
  }, 
{
  name:'123',
  id:'1',
  calculated_size : 19000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,1,2,3]
},
{
  name:'123',
  id:'2',
  calculated_size : 14002,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,1,2,3]
},
{
  name:'123',
  id:'3',
  calculated_size : 16000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,2,4,5]
},
{
  name:'123',
  id:'4',
  calculated_size : 11523,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,2,3,4,5]
},
{
  name:'123',
  id:'5',
  calculated_size : 15356,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,2,5]
},
{
  name:'123',
  id:'6',
  calculated_size : 17883,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,2]
},
{
  name:'123',
  id:'7',
  calculated_size : 17700,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,3,4]
},
{
  name:'123',
  id:'8',
  calculated_size : 15000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,1,5]
},
{
  name:'123',
  id:'9',
  calculated_size : 14000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,3,4,5]
},
{
  name:'123',
  id:'10',
  calculated_size : 2000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[1,2,4]
},
{
  name:'123',
  id:'6',
  calculated_size : 17883,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,2]
},
{
  name:'123',
  id:'7',
  calculated_size : 17700,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,3,4]
},
{
  name:'123',
  id:'8',
  calculated_size : 15000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,1,5]
},
{
  name:'123',
  id:'9',
  calculated_size : 14000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[0,3,4,5]
},
{
  name:'123',
  id:'10',
  calculated_size : 2000,
  Transform_size : 1024,
  createTime : new Date,
  deadline : new Date() + 10,
  allow:[1,2,4]
},
]


let edgeNodes = [
  {
    Total_computing_capacity:150000,
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
  {
    Total_computing_capacity:15000,
    computing_capacity:0,
  },
]

const DNA_SIZE = 10
const chromosomeNum = 20
const CROSS_RATE = 0.8 
const MUTATION_TATE = 0.003
const N_Generation = 1000

const TASK_NUM = tasks.length;
let copyrate = 0.2;
const crossoverMutationNum =chromosomeNum - parseInt( chromosomeNum * copyrate);
const LAMDA= 50;
const P_idle = 50;
const P_SLEEP = 10;

let chromosomeMatrix =[];
let selectionProbability = [];
let adaptability = [];





function F(params){
  // 参数 i 和 j 都要能拿到， fij也要
  // F的结果，即能耗总值
  let result = 0;
  let allocation = params.slice(0,TASK_NUM);
  let comres = params.slice(TASK_NUM);
  // 计算最长的任务时间
  let T = 0;

  // 筛选各个服务器的任务。
  let site_task_map = {}
  for(let i = 0; i < TASK_NUM ; i++){
    if(site_task_map[allocation[i]]){
      site_task_map[allocation[i]].push({tasksIndex:i,comres:comres[i],taskcomtime:tasks[i].calculated_size/comres[i]});
      edgeNodes[allocation[i]].computing_capacity += comres[i]; //剩余计算能力控制
      // 计算能力超过则pass
      if(comres[i] < 0){
        edgeNodes[allocation[i]].computing_capacity = 0;
        return 99999
      }
      if(edgeNodes[allocation[i]].computing_capacity >=edgeNodes[allocation[i]].Total_computing_capacity){
        edgeNodes[allocation[i]].computing_capacity = 0;
        return 99999
      }
      T = Math.max(T,tasks[i].calculated_size/comres[i]);
    }else{
      site_task_map[allocation[i]] = [{tasksIndex:i,comres:comres[i],taskcomtime:tasks[i].calculated_size/comres[i]}];
      edgeNodes[allocation[i]].computing_capacity += comres[i]; //剩余计算能力控制
      if(comres[i] < 0){
        edgeNodes[allocation[i]].computing_capacity = 0;
        return 99999
      }
      if(edgeNodes[allocation[i]].computing_capacity >=edgeNodes[allocation[i]].Total_computing_capacity){
        edgeNodes[allocation[i]].computing_capacity = 0;
        return 99999
      }
      T = Math.max(T,tasks[i].calculated_size/comres[i]);
    }
  }
  
  // 遍历每一个有任务的node 求各自的E
  Object.keys(site_task_map).forEach(nodeIndex => {
    // console.log('-------------------'+'节点'+nodeIndex+'开始计算'+'------------------');
    // 当前边缘节点中的任务
    let thisTasks = site_task_map[nodeIndex];
    // 初始化当前节点能耗
    let E = 0;
    // 执行时间列表
    let TaskComTimeList = [];
    // 计算当前时间列表
    for(let i = 0 ; i < thisTasks.length ; i++){
      TaskComTimeList.push(thisTasks[i].taskcomtime);
    }
    T = Math.max(T,...TaskComTimeList);
    // 计算有任务时的能耗
    let maxRunningTime = 0;//记录最大执行时间。
    let passTime = 0;
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
      // 当前节点的负载量
      if(edgeNodes[nodeIndex].computing_capacity!== 0 ){
        // 当有负载时
        if(edgeNodes[nodeIndex].computing_capacity > edgeNodes[nodeIndex].Total_computing_capacity){
          E +=  (t - passTime) * 100;
          edgeNodes[nodeIndex].computing_capacity -= f ;
        }else{
          E +=  (t - passTime) * ( LAMDA* (edgeNodes[nodeIndex].computing_capacity / edgeNodes[nodeIndex].Total_computing_capacity) + P_idle)
          edgeNodes[nodeIndex].computing_capacity -= f ;
        }
     
      }
      passTime = t;
      TaskComTimeList.splice(minIndex,1);
      thisTasks.splice(minIndex,1);
    }
    // 计算没有任务时的能耗
    result += (E + ((T - maxRunningTime) * P_idle))
    // console.log('节点： '+nodeIndex+' 的能耗 :'+(E + ((T-maxRunningTime) * P_SLEEP)))
  })
  //  遍历所有节点，找到有任务的和没任务的
  for(let i = 0 ; i < edgeNodes.length ; i++ ){
    if(allocation.indexOf(i) == -1){
      // 没任务选
      result += T * P_idle;
      // console.log('节点'+i+' 的能耗', T * P_SLEEP);
    }
  }

  //console.log('总能耗 :>> ', result);
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


function initGA(_taskNum, _nodeNum, _iteratorNum, _chromosomeNum, _cp) {
    for(let i = 0 ; i < _chromosomeNum ; i++){
      let allocation = [];
      let comsources = [];

      //计算能力总量控制
      let allcomp = [];
      let nowcomp = [];
      for( let i = 0 ; i < edgeNodes.length; i++){
        allcomp.push(edgeNodes[i].Total_computing_capacity);
        nowcomp.push(edgeNodes[i].computing_capacity);
      }

      for(let j = 0; j < _taskNum ; j++){
        let randomIndex = parseInt(random(0,tasks[j].allow.length - 1))
        let al = tasks[j].allow[randomIndex]
        let coms = random(0,(allcomp[al] - nowcomp[al]))
        nowcomp[al] += coms;
        allocation.push(al);  
        comsources.push(coms);
      }
      chromosomeMatrix.push([...allocation,...comsources]);
    }

    // console.log('chromosomeMatrix :>> ', chromosomeMatrix);
};

//  适应度计算
function calAdaptability(chromosomeMatrix){
  let adaptability = [];
  for(let i = 0 ; i< chromosomeMatrix.length ; i++){
    adaptability.push(1/F(chromosomeMatrix[i]));
  }
  // console.log('adaptability :>> ', adaptability);
  return adaptability;
}

function calConsum(chromosomeMatrix){
  let adaptability = [];
  for(let i = 0 ; i< chromosomeMatrix.length ; i++){
    adaptability.push(F(chromosomeMatrix[i]));
  }
  // console.log('adaptability :>> ', adaptability);
  return adaptability;
}



// 计算自然选择的概率
function calSelectionProbability(adaptability){
    // 计算适应度总和
    let selectionProbability = [];
    let sumAdaptability = 0;
    for (let i=0; i<chromosomeNum; i++) {
        sumAdaptability += adaptability[i];
    }

    // 计算每条染色体的选择概率
    for (let i=0; i<chromosomeNum; i++) {
        selectionProbability.push(adaptability[i] / sumAdaptability);
    }
    return selectionProbability;
}

/**
 * 交叉生成{crossoverMutationNum}条染色体
 * @param chromosomeMatrix 上一代染色体矩阵
 */
 function cross(chromosomeMatrix) {
  let newChromosomeMatrix = [];
  for (let chromosomeIndex=0; chromosomeIndex<crossoverMutationNum; chromosomeIndex++) {
  
      // 采用轮盘赌选择父母染色体
      try {
        let chromosomeBaba = chromosomeMatrix[RWS(selectionProbability)].slice(0);
        let chromosomeMama = chromosomeMatrix[RWS(selectionProbability)].slice(0);
        // 前半部分 交叉
        let crossIndex = random(1, tasks.length*2-1);
        let res = [];
        for(let i = 0; i < chromosomeMama.length; i++ ){
          if(i < tasks.length){
            if(i < crossIndex){
              res.push(chromosomeBaba[i]);
            }else{
              res.push(chromosomeMama[i]);
            }
          }else{
            if(i < tasks.length + crossIndex){
              res.push(chromosomeBaba[i]);
            }else{
              res.push(chromosomeMama[i]);
            }
          }
        }
    
        if( F(res) != 99999){
          newChromosomeMatrix.push(res);
        }else{
          chromosomeIndex--;
        }

      } catch (error) {
        console.log('selectionProbability :>> ', selectionProbability);
      }
     
  }
  return newChromosomeMatrix;
}

/**
 * 变异
 * @param newChromosomeMatrix 新一代染色体矩阵
 * @param al 随机所选的服务器
 */
 function mutation(newChromosomeMatrix) {
  // 随机找一条染色体
  let chromosomeIndex = random(0, crossoverMutationNum-1);

  // 随机找一个任务
  let taskIndex = random(0, tasks.length-1);
  
  // 随机找一个计算量
  let compIndex = random(tasks.length,tasks.length*2-1);

  // 可选计算位置随机
  let randomIndex = parseInt(random(0,tasks[taskIndex].allow.length - 1))
  let al = tasks[taskIndex].allow[randomIndex]
  // 求当前compindex对应的 中所有的计算资源
  let temp_nodeIndex = newChromosomeMatrix[chromosomeIndex][compIndex - TASK_NUM];
  let temp_compsum = 0;
  for(let i = 0 ; i < tasks.length; i++ ){
    if(newChromosomeMatrix[chromosomeIndex][i] == temp_nodeIndex){
      temp_compsum += newChromosomeMatrix[chromosomeIndex][i + TASK_NUM];
    }
  }
  //求al对应的计算资源
  let al_compsum = 0;
  for(let i = 0 ; i < tasks.length; i++ ){
    if(newChromosomeMatrix[chromosomeIndex][i] == al){
      al_compsum += newChromosomeMatrix[chromosomeIndex][i + TASK_NUM];
    }
  }

  newChromosomeMatrix[chromosomeIndex][taskIndex] = al;
  newChromosomeMatrix[chromosomeIndex][taskIndex + TASK_NUM] = random(1,edgeNodes[al].Total_computing_capacity - al_compsum);
  newChromosomeMatrix[chromosomeIndex][compIndex] = random(1,edgeNodes[temp_nodeIndex].Total_computing_capacity - temp_compsum);
  
  // console.log('mutationindex :>> ', chromosomeIndex);
  return newChromosomeMatrix;
}



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
 * 复制(复制上一代中优良的染色体)
 * @param chromosomeMatrix 上一代染色体矩阵
 * @param newChromosomeMatrix 新一代染色体矩阵
 */
 function copy(chromosomeMatrix, newChromosomeMatrix) {
  // 寻找适应度最高的N条染色体的下标(N=染色体数量*复制比例)
  var chromosomeIndexArr = maxN(adaptability, chromosomeNum*copyrate);

  // 复制
  for (var i=0; i<chromosomeIndexArr.length; i++) {
      var chromosome = chromosomeMatrix[chromosomeIndexArr[i]];
      newChromosomeMatrix.push(chromosome);
  }

  return newChromosomeMatrix;
}

/**
 * 从数组中寻找最大的n个元素
 * @param array
 * @param n
 */
 function maxN(array, n) {
  // 将一切数组升级成二维数组，二维数组的每一行都有两个元素构成[原一位数组的下标,值]
  var matrix = [];
  for (var i=0; i<array.length; i++) {
      matrix.push([i, array[i]]);
  }

  // 对二维数组排序
  for (var i=0; i<n; i++) {
      for (var j=1; j<matrix.length; j++) {
          if (matrix[j-1][1] > matrix[j][1]) {
              var temp = matrix[j-1];
              matrix[j-1] = matrix[j];
              matrix[j] = temp;
          }
      }
  }

  // 取最大的n个元素
  var maxIndexArray = [];
  for (var i=matrix.length-1; i>matrix.length-n-1; i--) {
      maxIndexArray.push(matrix[i][0]);
  }

  return maxIndexArray;
}



/**
 * 轮盘赌算法
 * @param selectionProbability 概率数组(下标：元素编号、值：该元素对应的概率)
 * @returns {number} 返回概率数组中某一元素的下标
 */
function RWS(selectionProbability) {
    let sum = 0;
    let rand = Math.random();
    for (var i=0; i<selectionProbability.length; i++) {
        sum += selectionProbability[i];
        if (sum >= rand) {
            return i;
        }
    }
}



// 测试
initGA(TASK_NUM,5,100,chromosomeNum,0.02);
let resultArr = [];
for(let i = 0 ; i < N_Generation; i++){
  adaptability = calAdaptability(chromosomeMatrix);
  // console.log('适应度 :>> ', adaptability);

  selectionProbability = calSelectionProbability(adaptability);
  // console.log('适应度概率 :>> ', selectionProbability);
  // 交叉生成{crossoverMutationNum}条染色体

  let newChromosomeMatrix = cross(chromosomeMatrix);
  // console.log('交叉 :>> ', newChromosomeMatrix);

  // 变异
  newChromosomeMatrix = mutation(newChromosomeMatrix);
  // console.log('变异 :>> ', newChromosomeMatrix);

  newChromosomeMatrix = copy(chromosomeMatrix, newChromosomeMatrix);
  // console.log('合并 :>> ', newChromosomeMatrix);

  chromosomeMatrix = newChromosomeMatrix;

  resultArr.push(Math.min(...calConsum(chromosomeMatrix)));
  // copyrate += 0.001;
}


console.log('lastresult :>> ', resultArr);
console.log('chromosomeMatrix :>> ',chromosomeMatrix );

let xAxis_i = 0;

var chartDom = document.getElementById('chart');
var myChart = echarts.init(chartDom);
var option;

option = {
  xAxis: {
    type: 'category',
    data: xAxis_i++
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: resultArr.filter(item=>{
        if(item >= 99900|| item < 0){
          return false
        }else{
          return true
        }
      }),
      type: 'line'
    }
  ]
};

option && myChart.setOption(option);
