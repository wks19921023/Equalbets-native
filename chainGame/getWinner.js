const getWinner = function(arr){
  let maxArr = {
    type:0
  };
  for(let i=0;i<arr.length;i++){
     if(arr[i].type>maxArr.type){
       maxArr = arr[i];
     }else if(arr[i].type===maxArr.type){  //the same cardType;
       const l = arr[i].cards.length;
       for(let j=l-1;j>=0;j--){
         if(arr[i].cards[j].num>maxArr.cards[j].num){
           return maxArr = arr[i];
         }
       }
     }else{      
       maxArr = maxArr;
     }
  }
  return maxArr;
}
module.exports = getWinner;