export const ChangeRate = (value) => {

    return tmp = (value * Math.pow(10, -18)).toFixed(8);

}
//every 16sec there are a new block
const blockTime = 16;
//need the time of first Block
const firstBlock = Date.now();
export const ChangeTimeToLocal = (time) => {

   // return Math.round(this.getTimDiff(time) / 1000);
      return  time;
}

getTimDiff = (m) => {
    return m.diff(firstBlock) / blockTime;

}
