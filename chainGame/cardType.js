"use strict";
/*********
***texaspoker cardtype
*********/
const getWinner = require("./getWinner");
function cardType(){
  const a = [].map.call(arguments[0].pokers,function(p){
    return new Poker(p);
  }).sort(function(p1,p2){
    return p1.num - p2.num;
  });
  //console.log(a); 
  return getType(a,arguments[0].owner);
};
//number translate to poker card
const Poker = function(n){  //52cards，begin with 0，end with 51，color：black,red heart,flower,square 
  this.num = (n%13)+2;
  this.ch = this.num>9?("abcdef")[this.num-10]:this.num;  //16进制
  this.show = "0,1,2,3,4,5,6,7,8,9,10,J,Q,K,A".split(",")[this.num];
  this.color = "♠♥♣♦"[n/13|0];  //向下取整
  this.char = n;
  //this.toString = function(){
    //return this.color + this.show;
  //}
};
/******
***type****
*1、hightCard 2、doubleOneCard 3、doubleTwoCard 4、threeCard 5、straightCard
*6、flushCard 7、gourdCard 8、fourCard 9、straightFlush
******/
const removeArr = function(arr,val){
  for(let i = 0;i<arr.length;i++){
    if(arr[i]===val){
      arr.splice(i,1);
      break;
    }
  }
};
//get cardType
const getType = function(arg,owner){
  const a = arg;
  let blackCard = [],redCard = [],flowerCard = [],squareCard = [];
  let colorCard = [blackCard,redCard,flowerCard,squareCard];
  let maxIndex,fourIndex,threeCard,twoCardArr=[];
  let isFlush=false,flushCards=[],isStraight=false,isFourCard=false,isThreeCard=false,isDouble=false;
  let returnData;
  for(let i=0;i<a.length;i++){
    //flush
    switch(a[i].color){
      case "♠♥♣♦"[0]:
        blackCard.push(a[i]);
        break;
      case "♠♥♣♦"[1]:
        redCard.push(a[i]);
        break;
      case "♠♥♣♦"[2]:
        flowerCard.push(a[i]);
        break;
      case "♠♥♣♦"[3]:
        squareCard.push(a[i]);
        break;
      default:
        console.log("arguments传入错误！");
        return false;
        break;
    } 
    //straight
    if(i+4<a.length&&a[i].num+1===a[i+1].num&&a[i].num+2 === a[i+2].num&&a[i].num+3 === a[i+3].num&&a[i].num+4 === a[i+4].num){
      isStraight = true;
      maxIndex = i;
    }
    //fourCard
    if(i+3<a.length&&a[i].num === a[i+3].num){
      isFourCard = true;
      fourIndex = i;
    }
    //threeCard
    if(i+2<a.length&&a[i].num === a[i+2].num){
      isThreeCard=true;
      threeCard = i;
    }
    //double
    if(i+1<a.length&&a[i].num === a[i+1].num){
      isDouble = true;
      twoCardArr.push(i);
    }  
  }
  //get same color cards
  for(let j = 0;j<colorCard.length;j++){
    if(colorCard[j].length > 4){
      isFlush = true;
      flushCards=colorCard[j];
    }
  }
  //get return data
  if(isFlush){
    if(isStraight){ //straightFlush
      returnData = {
        type:9,
        cards:[a[maxIndex],a[maxIndex+1],a[maxIndex+2],a[maxIndex+3],a[maxIndex+4]]
      };
    }else{ //flush
      const l = flushCards.length;
      returnData = {
        type:6,
        cards:[flushCards[l-5],flushCards[l-4],flushCards[l-3],flushCards[l-2],flushCards[l-1]]
      };
    }
  }else{
    if(isFourCard){ //fourCard
      if(fourIndex > 2) return returnData = {
        type:8,
        cards:[a[fourIndex-1],a[fourIndex],a[fourIndex+1],a[fourIndex+2],a[fourIndex+3]]
      };    
      returnData = {
        type:8,
        cards:[a[a.length-1],a[fourIndex],a[fourIndex+1],a[fourIndex+2],a[fourIndex+3]]
      };
    }else if(isStraight){//straight
      returnData = {
        type:5,
        cards:[a[maxIndex],a[maxIndex+1],a[maxIndex+2],a[maxIndex+3],a[maxIndex+4]]
      };
    }else{
      if(isThreeCard){
        if(twoCardArr.length>2){ //gourdCard
          if(a[twoCardArr[twoCardArr.length-1]].num>a[threeCard].num){
            returnData = {
              type:7,
              cards:[a[twoCardArr[twoCardArr.length-1]],a[twoCardArr[twoCardArr.length-1]+1],a[threeCard],a[threeCard+1],a[threeCard+2]],
            };
          }else{
            returnData = {
              type:7,
              cards:[a[twoCardArr[twoCardArr.length-3]],a[twoCardArr[twoCardArr.length-3]+1],a[threeCard],a[threeCard+1],a[threeCard+2]],
            }
          };
        }else{  //threeCard
          const l = a.length;
          switch(threeCard){
            case 4:
              returnData = {
                type:4,
                cards:[a[threeCard-1],a[threeCard-2],a[threeCard],a[threeCard+1],a[threeCard+2]],
              };
              break;
            case 3:
              returnData = {
                type:4,
                cards:[a[threeCard-1],a[l-1],a[threeCard],a[threeCard+1],a[threeCard+2]],
              };
              break;
            default:
              returnData = {
                type:4,
                cards:[a[l-2],a[l-1],a[threeCard],a[threeCard+1],a[threeCard+2]],
              };
              break;
          }
        }
      }else{
        if(isDouble){
          const l = twoCardArr.length;
          if(l>1){ //two double
            const a1=a[twoCardArr[l-2]],a2=a[twoCardArr[l-2]+1],a3=a[twoCardArr[l-1]],a4=a[twoCardArr[l-1]+1];
            removeArr(a,a1);
            removeArr(a,a2);
            removeArr(a,a3);
            removeArr(a,a4);
            const j = a.length;
            returnData={
              type:3,
              cards:[a[j-1],a1,a2,a3,a4]
            }
          }else{ //one double
            switch(twoCardArr[0]){
              case 5:
                returnData={
                  type:2,
                  cards:[a[twoCardArr[0]-3],a[twoCardArr[0]-2],a[twoCardArr[0]-1],a[twoCardArr[0]],a[twoCardArr[0]+1]],
                };
                break;
              case 4:
                returnData={
                  type:2,
                  cards:[a[twoCardArr[0]-2],a[twoCardArr[0]-1],a[twoCardArr[0]],a[twoCardArr[0]+1],a[twoCardArr[0]+2]],
                };
                break;
              case 3:
                returnData={
                  type:2,
                  cards:[a[twoCardArr[0]-1],a[twoCardArr[0]],a[twoCardArr[0]+1],a[twoCardArr[0]+2],a[twoCardArr[0]+3]],
                };
              default:
                returnData={
                  type:2,
                  cards:[a[twoCardArr[0]],a[twoCardArr[0]+1],a[twoCardArr[0]+2],a[twoCardArr[0]+3],a[twoCardArr[0]+4]],
                };
                break;
            }
          }
        }else{ //hightCard
          const l = a.length;
          returnData = {
            type:1,
            cards:[a[l-5],a[l-4],a[l-3],a[l-2],a[l-1]]
          };
        }
      }
    }
  } 
  returnData={
    type:returnData.type,
    cards:returnData.cards,
    owner:owner
  }
  return returnData;
};
module.exports = cardType;
const p1 = {
  pokers:[0,2,4,6,7,8,9],
  owner:"player1"
};
const p2 = {
  pokers:[6,7,8,9,10,11,12],
  owner:"player2"
};
const p3 = {
  pokers:[6,19,32,45,46,47,48],
  owner:"player3"
};
const p4 ={
  pokers:[6,19,32,46,47,48,49],
  owner:"player4"
};
const p5 ={
  pokers:[10,23,36,8,21,34,45],
  owner:"player5"
};
const p6 = {
  pokers:[12,25,38,37,36,7,5],
  owner:"player6"
};
const p7 = {
  pokers:[12,25,11,24,23,5,45],
  owner:"player7"
};
const p8 = {
  pokers:[12,25,11,23,9,30,46],
  owner:"player8"
};
const p9 = {
  pokers:[12,3,11,23,9,30,46],
  owner:"player9"
};
const test = {
  pokers:[10,23,36,3,11,24,25],  //QQQ5KKA   5QQQKKA   QQQKK
  owner:"tester1"
};
//console.log(cardType(p1)); // J 10 9 8 6   flush
//console.log(cardType(p2));//A K Q J 10  straightFlush
//console.log(cardType(p3));//8,8,8,8,J  fourCard
//console.log(cardType(p4));//8 9 10 J Q  straight
//console.log(cardType(p5));  //gourd  Q Q Q 10 10
//console.log(cardType(p6)); //threeCard A A A K Q
//console.log(cardType(p7));   // two double A A  K K Q
//console.log(cardType(p8));  //one double A A K Q J
//console.log(cardType(p9));   //hightCard  9 J Q K A
console.log(cardType(test));
const testArr = [cardType(p1),cardType(p2),cardType(p3),cardType(p4),cardType(p5),cardType(p6),cardType(p7),cardType(p8),cardType(p9)]
const result = getWinner(testArr);
//console.log(result);  //different type
//same type
const t1 = cardType({pokers:[10,23,36,9,22,1,2],owner:"player3"}); //QQQJJ34 KKK101057
const t2 = cardType({pokers:[11,24,37,8,21,3,5],owner:"player4"});
const tArr = [t1,t2];
const rs1 = getWinner(tArr);
//console.log("winner is："+rs1.owner);  //10,10,K,K,K
//console.log(rs1)
